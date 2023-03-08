---
id: account_based_plasma
title: 基于账户的 Plasma
description: 基于账户的 Plasma 实施
keywords:
  - docs
  - matic
  - Account Based Plasma
  - polygon
  - implementation
image: https://matic.network/banners/matic-network-16x9.png
---

# 基于账户的 Plasma {#account-based-plasma}

Polygon Plasma 的模式类似于 [Plasma MoreVP](https://ethresear.ch/t/more-viable-plasma/2160)，但与其他基于 UTXO 的实施相比，它采取的实施方式则是**基于账户的实施**。侧链兼容 EVM。我们采用了 MoreVP 结构，因此也不需要确认签名。

## 权益证明 (PoS) 层和检查点 {#pos-layer-and-checkpoints}

Polygon 网络采用双重策略（检查点层的权益证明以及区块生产者层的区块生产者）来实现更快的出块时间，并通过检查点和欺诈证明在主链上实现最终性。

在 Polygon 网络的检查点层上，对于 Polygon 网络区块层的每隔若干个区块，一个充分绑定的验证者将验证区块层上的所有区块并从上个检查点开始创建区块哈希 Merkle 树，然后在主链上创建一个检查点。

除了在主链上提供最终性之外，检查点还可在提现时发挥作用，因为它们包含用户提现时的代币销毁证明（提现）。用户可以使用 Patricia Merkle 证明和头部区块证明，证明他们在根合约上的剩余代币。请注意，为了证明剩余的代币，头部区块必须通过 PoS （利益相关者）提交至根链。提现处理将照常产生以太坊 gas 费。我们对退出游戏大量使用检查点。

## 类 UTXO 事件日志 {#utxo-like-event-logs}

ERC20/ERC721 转账则通过采用类 UTXO 事件日志的数据结构实现。以下 `LogTransfer` 事件仅供参考。

```jsx
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amountOrTokenId,
    uint256 input1, // previous account balance of the sender
    uint256 input2, // previous account balance of the receiver
    uint256 output1, // new account balance of the sender
    uint256 output2 // new account balance of the receiver
);
```

因此，基本上每次 ERC20/ERC721 转账都会发送该事件，发送者和接受者此前的余额（`input1` 和 `input2`）将作为交易的输入（类 UTXO），而新的余额将作为输出（`output1` 和 `output2`）。转账通过比较分析所有相关的 `LogTransfer` 事件来进行追踪。

## 退出游戏 {#exit-games}

鉴于区块由单一（或极少数）区块生产者生产，因此有一面会公开，可能会遭受欺诈。我们将简要讨论攻击场景，然后探讨 Plasma 保证如何保护用户。

## 攻击向量 {#attack-vectors}

### 恶意操作者 {#malicious-operator}
下面将讨论操作者可能产生恶意并试图欺诈的场景。

1. 不知出处的代币/双重支付/格式错误的收据都在以欺诈的方式增加（操作者控制的账户）/减少（用户）代币余额。
2. 数据不可用 在用户发送交易后，假设操作者已将交易包含于 Plasma 区块，但用户无法获取链数据。在这种情况下，如果用户开始退出旧交易，将通过展示最新交易的方式在链上对用户提出质疑。用户很容易受到打击。
3. 错误的检查点 在最坏的情况下，操作者可执行 A.1 和/或 A.2 并与验证者勾结，从而对根链提交无效的状态转换。
4. 停止侧链 操作者停止生产区块，链将停止。如果未在指定的时间内提交检查点，则可以将侧链标记为在根链上停止。随后无法继续提交检查点。

基于上述或其他原因，若 Plasma 链耍赖，用户则需要开始批量退出。当时机成熟时，我们希望在用户可使用的根链上提供退出结构。

### 恶意用户 {#malicious-user}

1. 用户已开始退出提交的交易，但仍继续在侧链上使用代币。该行为与双重支付类似，但会跨越两条链。

我们根据 [MoreVp 7](https://ethresear.ch/t/more-viable-plasma/2160)构想进行构建。简言之，MoreVP 引入新的退出优先级计算方法，该方法称为 “youngest-input” （最早输入）优先级。moreVP 的退出并非按输出时间排序，而是按最早输入的时间排序。这意味着，凡是源自有效输入的输出，即使在“不知出处”的交易后包含于扣留的区块中，退出都将得到正确处理。我们定义 `getAge`，对包含的交易指定时间。这一点在[最小可变 plasma 1](https://ethresear.ch/t/minimal-viable-plasma/426)中定义。

```jsx
function getAge(receipt) {
  const { headerNumber, plasmaBlockNum, txindex, oindex } = receipt
  return f(headerNumber, plasmaBlockNum, txindex, oindex) // multiplied with their respective weights
}
```

## 退出场景 {#exit-scenarios}

在继续讨论退出场景之前，先采用一些术语：

- **提现者**：希望退出 Plasma 链的用户。
- **提交的交易**：已包含于 Polygon 链区块并在根链上设置检查点的交易。
- **支出交易**：根据用户签名的操作改变用户代币余额的交易（不包括代币的转入）。它可以是用户发起的转账，销毁交易等
- **参考交易**：刚好在特定用户和代币退出交易之前的交易。我们在基于账户余额的 UTXO 方案中规定，参考交易的输出将作为待退出交易的输入。
- **MoreVP 退出优先级**：特定交易最早输入的时间（在参考交易中）。它最常见的用途是计算退出优先级。

### Burn 代币 {#burn-tokens}

用户要退出侧链，会在 Plasma 链上发起 *提现，又称为销毁代币交易* 。这项交易将发出一个 `Withdraw` 事件。

```jsx
event Withdraw(
    address indexed token,
    address indexed from,
    uint256 amountOrTokenId,
    uint256 input1,
    uint256 output1
);
```

其中， `input1` 表示用户先前的代币余额，而 `output1` 表示侧链中剩余的代币数量。该结构与我们基于账户的 *UTXO* 方案一致。用户将出示提现交易收据，用于提取主链上的代币。用户在参考此收据时，还必须提供以下内容：

1. 侧链区块中包含收据的 Merkle 证明 (`receiptsRoot`)
2. 侧链区块中包含交易的 Merkle 证明 (`transactionsRoot`)
3. 根链上的检查点包含侧链区块头的证明

```jsx
startExit(withdrawTx, proofOfInclusion /* of the withdrawTx in the checkpoint */) {
  Verify inclusion of withdrawTx in checkpoint using proofOfInclusion
  Verify msg.sender == ecrecover(withdrawTx)

  uint age = getAge(withdrawTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}
```

每次想要退出 Plasma 链时，用户（或其客户端应用（即钱包）提取）应在侧链上销毁代币，等待通过检查点，然后开始退出检查点控制的提现交易。

### 退出上次 ERC20/721 转账 (MoreVP) {#exit-from-the-last-erc20-721-transfers-morevp}

考虑到这一场景，用户在侧链上进行了 ERC20 转账。操作者在用户转账之前添加“不知出处”的交易，并且与验证者共谋，让该区块通过检查点。在该场景下，一般而言，在上面探讨的攻击向量 A1 至 A3 中，用户可能没有机会在恶意交易纳入之前销毁自己的代币，因此可能需要退出根链上的上次检查点交易。因此，除了销毁退出外，我们还需要支持各种交易的退出，例如 ERC20/721 转账。基于该攻击向量，我们划分了两种场景：

**转出转账：** 我在将某些代币转账给用户时发现，操作者在包含我的转账交易之前将一个恶意交易纳入区块/检查点。我需要开始退出链。我将开始退出转账交易。根据 MoreVP 的规定，我需要提供一个参考交易（*输入 UTXO*）用于确定退出优先级。因此，我将参考在转出转账交易之前刚刚发生的交易，并且该交易已更新我的代币余额。

```jsx
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the user after the input tx was executed >= tokens being transferred in the exitTx
  Verify msg.sender == ecrecover(exitTx)

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

**转入转账：** 我发现操作者在包含我的转入转账交易之前将一个恶意交易纳入区块/检查点。我将在参考交易对手余额的同时退出转入转账交易 — 因为此时 *输入 UTXO* 是交易对手的代币余额。

```
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the counterparty after the input tx was executed >= tokens being transferred in the exitTx
  Verify input.sender == ecrecover(exitTx) && input.receiver == msg.sender

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

### 退出进行中的交易 (MoreVP) {#exit-from-an-in-flight-transaction-morevp}

该场景旨在对抗数据不可用的场景。假设我完成一笔交易，但由于数据不可用，我不清楚该交易是否已包含在内。我可以参考上次检查点控制的交易来退出此次进行中的交易。用户必须保持谨慎，在开始 MoreVP 方式的退出时不要执行任何交易，以免受到质疑。

**注意：** 在退出 MoreVP 结构时，用户可通过提供参考交易的方式发起退出，退出交易然后放置一个小的 `exit bond`。如果任何退出受到质疑，则退出将取消，退出保证金将被没收。

## 限制 {#limitations}

1. 大规模证明：包含交易的 Merkle 证明和包含检查点中的区块（包含该交易）的 Merkle 证明。
2. 批量退出：如果操作者出现恶意，用户需要开始批量退出。

本规范正处于初期阶段。若结构遭到破坏，当收到有助于改进或重新设计的反馈时，我们将不胜感激。实施是我们[合约](https://github.com/maticnetwork/contracts)存储库正在进行中的工作。