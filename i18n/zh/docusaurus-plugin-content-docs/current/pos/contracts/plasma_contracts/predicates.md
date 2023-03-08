---
id: predicates
title:  Polygon Plasma 中的 Predicates
description:  Polygon plasma 中预测的实施详细信息
keywords:
  - docs
  - matic
  - polygon
  - plasma
  - predicates
image: https://matic.network/banners/matic-network-16x9.png
---

#  Polygon Plasma 中的 Predicates  {#predicates-in-polygon-plasma}

这篇文章介绍了 predicate 设计的实施详情。我们的 predicate 设计在很大程度上受到了[《理解广义 Plasma 架构](https://medium.com/plasma-group/plapps-and-predicates-understanding-the-generalized-plasma-architecture-fc171b25741)》的启发，感谢 Plasma 小组的帮助。我们最近发布了[基于账户的 MoreVP](https://ethresear.ch/t/account-based-plasma-morevp/5480) 规范。链接的帖子是理解这份文件的前提。

注意：`withdrawManager` 是我们的用词，相当于 Plasma 小组所谓的*承诺合约*。

## ERC20/721 代币转移的 predicate {#predicate-for-erc20-721-token-transfer}

ERC20/721 predicate 中最相关的函数是 `startExit` 和 `verifyDeprecation`。见 [Ipredice.sol5](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/IPredicate.sol)。

当一个退出者想使用 MoreVP 风格退出时，将调用 `startExit` 函数（参考前面的参考交易）。

```solidity
function startExit(bytes calldata data, bytes calldata exitTx) external {
  referenceTxData = decode(data)

  // Verify inclusion of reference tx in checkpoint / commitment// returns priority which is something like that defined in minimum viable plasma (blknum * 1000000000 + txindex * 10000 + logIndex)// Here, logIndex is the index of the log in the tx receipt.
  priority = withdrawManager.verifyInclusion(referenceTxData)

  // validate exitTx - This may be an in-flight tx, so inclusion will not be checked
  exitAmount = processExitTx(exitTx)

  // returns the balance of the party at the end of referenceTx - this is the "youngest input" to the exitTx
  closingBalance = processReferenceTx(referenceTxData)

  // The closing balance of the exitTx should be <= the referenced balancerequire(
    closingBalance >= exitAmount,
    "Exiting with more tokens than referenced"
  );

  withdrawManager.addExitToQueue(msg.sender, token, exitAmount, priority)
}
```

对于具有挑战性的旧状态转换，predicate 公开了 `verifyDeprecation` 函数。

```solidity
function verifyDeprecation(bytes calldata exit, bytes calldata challengeData) external returns (bool) {
  referenceTxData = decode(challengeData)

  Verify the signature on the referenceTxData.rawTx and the fact that rawTx calls some function in the associated contract on plasma chain that deprecates the state

  // Verify inclusion of challenge tx in checkpoint / commitment
  priorityOfChallengeTx = withdrawManager.verifyInclusion(referenceTxData)

  return priorityOfChallengeTx > exit.priority
}
```

最后，`withdrawManager` 中的 `challengeExit` 函数负责调用 `predicate.verifyDeprecation` 函数，如果返回真则取消退出。见 [WithdrawManager.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/withdrawManager/WithdrawManager.sol#L184)。

```solidity
function challengeExit(uint256 exitId, uint256 inputId, bytes calldata challengeData) external {
  PlasmaExit storage exit = exits[exitId];
  Input storage input = exit.inputs[inputId];
  require(
    exit.token != address(0x0) && input.signer != address(0x0),
    "Invalid exit or input id"
  );
  bool isChallengeValid = IPredicate(exit.predicate).verifyDeprecation(
    encodeExit(exit),
    encodeInputUtxo(inputId, input),
    challengeData
  );
  if (isChallengeValid) {
    deleteExit(exitId);
    emit ExitCancelled(exitId);
  }
}
```

虽然这构成了我们 [ERC20Predicate.sol](https://github.com/maticnetwork/contracts/blob/master/contracts/root/predicates/ERC20Predicate.sol) 逻辑的核心，但实际的实施要复杂得多，可以在这个 [pull request 12](https://github.com/maticnetwork/contracts/pull/78) 中找到。我们邀请 plasma 社区来审查，并在此处或在 PR 上留下他们宝贵的反馈。