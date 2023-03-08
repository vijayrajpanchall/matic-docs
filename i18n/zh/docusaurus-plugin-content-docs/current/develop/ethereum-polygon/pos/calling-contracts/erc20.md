---
id: erc20
title: ERC20 存入和提取指南
sidebar_label: ERC20
description: "ERC20 合约的可用函数。"
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## 高级流程 {#high-level-flow}

存入 ERC20 —

1. **_批准_** **_ERC20Predicate_** 合约，可用来支付已存入的代币。
2. 调用 **_depositFor_** ，该函数来自 **_RootChainManager_**。

提取 ERC20 —

1. **_燃烧_** Polygon 链上的代币。
2. 调用 **_exit_** 函数，该函数来自 **_RootChainManager_**，可用于提交燃烧交易证明。该调用可在为包含燃烧交易的区块提交**_检查点_**后执行。

## 设置详情 {#setup-details}

### 合约实例化 {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### 批准 {#approve}
批准 **_ERC20Predicate_**，以通过调用代币合约的 **_approve_** 函数来支付代币。该函数包含两个参数：支付者和数量。**_支付者_** 是被批准支付用户代币的地址。**_数量_** 是可支付的代币数量。为避免多次批准，一次性批准与存入数量相等或更多的数量。
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### 存入 {#deposit}
请注意，在进行该调用之前代币需要已被映射，而数量则必须已被批准存入。  
调用合同的`depositFor()`函数`RootChainManager`。此函数需要三个参数`userAddress``rootToken`： and . 是接受 Polygon `depositData`链上存款的用户的地址。 它`rootToken`是`depositData`主链上的代币地址。 `userAddress`是 ABI 编码的数量。
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### 燃烧 {#burn}
代币可通过调用子代币合约上的 **_withdraw_** 函数在 Polygon 链上燃烧。 此函数有一个参数 **_数量_**，用于指明待燃烧的代币数量。燃烧证明需要在退出步骤中提交。因此需要存储交易哈希。
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### 退出 {#exit}
必须调用在`RootChainManager`合约上退出函数来解锁，然后从中收回代币。`ERC20Predicate`此函数包含可证明燃烧交易的单一字节参数。等待包含 燃烧交易的检查点，然后调用此函数。证明是由编码以下字段的 RLP 生成的 -

1. headerNumber — 包含燃烧交易的检查点头部区块编号
2. blockProof — 证明（子链中的）区块头部是已提交Merkle 根的叶子
3. blockNumber — 包含子链上的燃烧交易的区块编号
4. blockTime — 燃烧交易区块时间
5. txRoot — 区块的交易根
6. receiptRoot — 区块的回执根
7. receipt — 燃烧交易的回执
8. receiptProof — 燃烧回执的 Merkle 证明
9. branchMask — 代表 Merkle Patricia 树中的回执路径的 32 位
10. receiptLogIndex — 从回执中读取的日志索引

手动生成证明可能会很麻烦，因此建议使用 Polygon 边缘。如果要手动发送交易，您可以在 Options Object 中传递 **_encodeAbi_** 为**_真_**，以获取原始调用数据。

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

将该调用数据发送至 **_RootChainManager_**。
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
