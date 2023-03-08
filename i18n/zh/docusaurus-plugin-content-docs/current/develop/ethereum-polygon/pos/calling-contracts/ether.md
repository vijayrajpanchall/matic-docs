---
id: ether
title: 以太币存入和提取指南
sidebar_label: Ether
description:  "以太币合约的可用函数。"
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## 高级流程 {#high-level-flow}

存入以太币 —

- 在 **RootChainManager** 上调用 depositEtherFor，然后发送以太币资产。

提取以太币 —

1. **_燃烧_** Polygon 链上的代币。
2. 调用 **_exit_** 函数，该函数来自 **_RootChainManager_**，可用于提交燃烧交易证明。该调用可在为包含燃烧交易的区块提交**_检查点_**后执行。

## 步骤详情 {#step-details}

### 合约实例化 {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### 存入 {#deposit}
调用合同的`depositEtherFor`函数`RootChainManager`。该函数需要 1 个参数 - 这是用户的地址`userAddress`，将接受 Polygon 链上的存款。要存入的醚数量必须作为交易的价值发送。

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### 燃烧 {#burn}
由于以太尔是 Polygon 链上的 ERC20 代币，所以其退出过程与 ERC20 退出过程相同。可以通过在子代币合约上调用`withdraw`函数来烧毁。该函数采用单一参数，`amount`表示要烧毁的代币数量。燃烧证明需要在退出步骤中提交。因此需要存储交易哈希。
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### 退出 {#exit}
必须调用在`RootChainManager`合约上退出函数来解锁，然后从中收回代币。`EtherPredicate`此函数包含可证明燃烧交易的单一字节参数。等待包含 燃烧交易的检查点，然后调用此函数。通过 RLP 编码以下字段生成证明：

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
