---
id: eth
title: 以太币存入和提取指南
sidebar_label: ETH
description: "在 Polygon 网络上存入和提取以太币。"
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

查看最新的 [以太币 Matic.js 文档](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/)。

## 快速概览 {#quick-summary}

文档中的本节说明如何在 Polygon 网络上存入和提取 ERC20 代币。文档的以太币、ERC20、ERC721 和 ERC1155 章节中存在通用函数，但为了符合标准，其命名和实施模式不同。文档中的本节使用前提条件是事先映射您的资产，请在[此处](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/)提交您的映射请求。

## 简介 {#introduction}

本指南采用映射至 Goerli 网络的 Polygon 测试网 (Mumbai) 来演示两个区块链之间的资产转移。值得注意的是，在本教程中，您应尽可能使用代理地址。这是因为对合约代码添加更新时，实施合约地址可能会发生改变，但代理地址永远不会改变，它可以将所有传入调用重定向到最新实施。本质上，如果使用代理地址，您在准备好之前无需担心实施合约发生任何变化。

例如，请使用`RootChainManagerProxy`地址进行互动，而不是地址`RootChainManager`。部署详情如 PoS 合约地址、ABI 和测试打印地址，请参见[此处。](/docs/develop/ethereum-polygon/pos/deployment/)

映射资产是在您的应用程序上集成 PoS 桥的必要步骤。如果您未完成映射，请在[此处](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/)提交映射请求。在本教程中，团队可部署测试代币并将其映射至 PoS 桥。请求您希望在[水龙头](https://faucet.polygon.technology/)上使用的资产。如果测试代币不可用，请在 [Discord](https://discord.com/invite/0xPolygon) 上联系团队。我们将保证立即回复您。

在接下来的教程中，每一步骤在详细解释的同时都会提供一些代码片段。然而，您总是可以参照此[资源库](https://github.com/maticnetwork/matic.js/tree/master/examples)，其中包含的所有**示例源代码**都能够帮助您整合并理解 PoS 桥的工作原理。

## 高级流程 {#high-level-flow}

存入以太币 —

1. 调用 **_depositEtherFor_** 函数，该函数来自 **_RootChainManager_**，然后 **发送 **所需的以太币。

提取以太币 —

1. **_燃烧_** Polygon 链上的代币。
2. 调用 **_exit_** 函数，该函数来自 **_RootChainManager_**，可用于提交燃烧交易证明。该调用可在为包含燃烧交易的区块提交**_检查点_**后执行。

## 步骤 {#steps}

### 存入 {#deposit}

以太币可通过调用 **depositEtherFor** 函数来存入 Polygon 链。该函数来自 **RootChainManager** 合约。Polygon PoS 客户端将 **depositEther** 方法用于执行此项调用。

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
使用 S**tate Sync **机制进行以太机存款到 Polygon 中的存款，这需要大约22-30分钟。在等待此次间隔后，建议使用web3.js/matic.js 库检查余额，或使用 Metamask来检查余额。如果子链发生至少一项资产转账，浏览器将只会显示余额。该[<ins>链接</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/)解释了如何跟踪存款事件。
:::

### 燃烧 {#burn}

ETH 作为 ERC20 代币存储在 Polygon 链上。提取遵循与提取 ERC20 代币相同的流程。

要烧毁代币并进行提取过程，请调用 MaticWETH 合约的提取函数。由于以太尔是 Polygon 链上的 ERC20 代币，您需要从 Polygon  PoS 客户端启动 **ERC20** 代币，然后`withdrawStart()`调用方法开始燃烧处理。

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

可存储该调用的交易哈希，然后在生成燃烧证明时使用。

### 退出 {#exit}


在提交包含燃烧交易的区块**检查点**后，用户应调用`RootChainManager`合同**退出**函数，并提交燃烧证明。代币将在提交有效证明后转账给用户。Polygon PoS 客户端`erc20`将 `withdrawExit` 方法用于执行此项调用。此函数仅在主链中包含检查点时方可调用。检查点的包含可通过本[指南](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events)进行跟踪。


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
