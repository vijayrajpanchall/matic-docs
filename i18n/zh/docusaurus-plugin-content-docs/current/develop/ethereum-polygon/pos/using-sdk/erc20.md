---
id: erc20
title: ERC20 存入和提取指南
sidebar_label: ERC20
description: "在 Polygon 网络上存入和提取 ERC20 代币。"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

查看最新的 [ERC20 Matic.js 文档](https://maticnetwork.github.io/matic.js/docs/pos/erc20/)。

本教程采用映射至 Goerli 网络的 Polygon 测试网 (Mumbai) 来演示两个区块链之间的资产转移。**值得注意的是，**在按本教程操作的同时，您必须始终使用可用的代理地址。例如，必须使用 **RootChainManagerProxy****** 地址进行互动，而不是 RootChainManager 地址。有关 **PoS 合约地址、ABI、测试代币地址**以及 PoS 桥合约的其他部署详情，请查看[此处](/docs/develop/ethereum-polygon/pos/deployment)。

**映射资产**是将 PoS 桥集成在您的应用程序上的必要步骤。您可以在[此处](/docs/develop/ethereum-polygon/submit-mapping-request)提交映射请求。但为了进行此次辅导，我们已经部署了**测试代币**，并在 PoS 桥上映射。您可能需要根据本教程的内容自行尝试。您可以从[水龙头](https://faucet.polygon.technology/)中请求所需的资产。如果在群组上无法使用测试代币，请在[不ord](https://discord.com/invite/0xPolygonn)上送达我们。

在接下来的教程中，每一步骤在详细解释的同时都会提供一些代码片段。然而，您总是可以参照此[资源库](https://github.com/maticnetwork/matic.js/tree/master/examples/pos)，其中包含的所有**示例源代码**都能够帮助您整合并理解 PoS 桥的工作原理。

## 高级流程 {#high-level-flow}

存入 ERC20 —

1. **_批准_** **_ERC20Predicate_** 合约，可用来支付已存入的代币。
2. 调用 **_depositFor_**，该函数来自 **_RootChainManager_**。

提取 ERC20 —

1. 在 Polygon 链上烧毁代币。
2. 调用`exit()`函数`RootChainManager`以提交销毁交易证明。在提交包含燃烧交易的区块检查点后，可以进行此调用。

## 步骤详细信息 {#steps-details}

### 批准 {#approve}

它是一种正常的 ERC20 批准，因此 **_ERC20Predicate_** 可调用 **_transferFrom_** 函数。Polygon PoS 客户端将 **_approve_** 方法用于执行此项调用。

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### 存入 {#deposit}

请注意，需要事先绘制代币并批准转换。Polygon  PoS 客户端揭露了进行此调用`deposit()`的方法。

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
使用**状态同步**机制进行以太机存款到 Polygon 中的存款，需要大约22-30分钟。在等待此次间隔后，建议使用web3.js/matic.js 库检查余额，或使用 Metamask来检查余额。如果子链发生至少一项资产转账，浏览器将只会显示余额。该[<ins>链接</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos)解释了如何跟踪存款事件。
:::

### WithdrawStart 方法可用于燃烧 {#withdrawstart-method-to-burn}

该`withdrawStart()`方法可以用于启动提取过程，这将烧毁在 Polygon 链上指定数量。

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

可存储该调用的交易哈希，然后在生成燃烧证明时使用。

### 退出 {#exit}

在提交包含燃烧交易的区块检查点后，用户应调用`RootChainManager`合同的`exit()`功能，并提交燃烧证明。提交有效证明后，代币将转交用户。Polygon  PoS 客户端揭露了进行此调用`withdrawExit`的方法。此函数仅在主链中包含检查点时方可调用。检查点包含可以通过遵循[此指南](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events)来追踪。

*withdrawExit* 方法可用于通过使用来自 *withdrawStart* 方法的交易哈希退出提取流程。

:::note
必须检查提款启动交易，以退出提款。
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
