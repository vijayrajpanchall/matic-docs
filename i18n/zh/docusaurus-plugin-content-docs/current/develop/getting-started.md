---
id: getting-started
title: Polygon PoS 介绍
sidebar_label: Quick Start
description: 在 Polygon 上建立您的下一个区块链应用程序。
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution 更新开发文档

文档正在更新、增强和改进。但可能发生更改。如有任何疑问或建议，请随时提出问题或提交请求。

:::

欢迎来到 **Polygon （此前称为 Matic 网络）**! 最具创新性和令人激动的区块链应用程序开发平台。区块链技术有望彻底改变数字世界管理数据和开展业务的方式。您可以通过在 Polygon 上进行去中心化应用程序 (dApp) 开发来抢占先机，加入这场革命。

本指南将向您介绍 Polygon 生态系统。您可以找到宝贵的资源和网站链接，它们不仅可以加快您在 polygon 上的构建速度，还有利于您进行一般区块链应用程序开发。

:::tip 掌握最新信息

从 Polygon 团队和社区，了解构建者更新信息，方式是订阅[<ins>Polygon 通知组。</ins>](https://polygon.technology/notifications/)

:::

## Polygon 的重要特性 {#key-features-of-polygon}

- **速度：**Polygon 网络使用高流通量区块链，由利益攸关方在每个检查点选定的区块生产者组合提供共识。权益证明层用于验证区块，并定期将区块生产者的证明发布到以太坊主网。这样可以实现约 2 秒的快速区块确认，同时保持高度的去中心化，从而为网络带来出色的吞吐量。
- **可扩展性：**Polygon 网络在单一侧面链上实现的交易速度少于2秒。使用多个侧链可帮助网络每秒处理数百万笔交易。该机制（已经在首个 Matic 侧链中得到证明）允许 Polygon 网络轻松扩展。
- **安全：**Polygon 的智能合约依赖于以太坊的安保。为了保障网络安全，它采用了三个重要的安全性模型。它使用以太坊的**质押管理合约**以及一组运行 **Heimdall** 和 **BOR** 节点的激励验证者。开发者也可在去中心化应用程序中同时实施两个模型（混合模式）。

## 建立在 Polygon 上 {#building-on-polygon}

以太坊开发者已经是 Polygon 开发者。直接切换至 [Polygon RPC](https://polygon-rpc.com/) 即可开始。Polygon 默认支持以太坊区块链上你所熟悉的所有工具，例如 Truffle、Remix 和 Web3js。

您可以将去中心化应用程序部署在 Polygon Mumbai 测试网或主网上。Polygon Mumbai 测试网连接以太坊 Goërli 测试网，将其作为父链。欲了解网络详情，请参阅 [网络文档](https://github.com/maticnetwork/matic-docs/blob/master/docs/operate/network.md)。

### 钱包 {#wallets}

为了与 Polygon 网络交互，您必须拥有一个以太坊钱包，因为 Polygon 运行在以太坊虚拟机 (EVM) 上 。您可以选择设置一个 [Metamask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md) 或 [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md) 钱包。更多信息在与钱包相关的信息上，以及您需要一个的信息，请参见我们的[钱包文档。](https://docs.polygon.technology/docs/develop/wallets/getting-started)

### 智能合约 {#smart-contracts}

Polygon 支持许多服务，您可以使用这些服务在 Polygon 网络上测试、编译、调试和部署去中心化应用程序。包括使用 [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md)、 [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md)、 [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md)、 [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md)、 [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md)、 [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md)和 [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md) 等进行部署。

### 连接至 polygon {#connecting-to-polygon}

您可以将 Polygon 添加至 Metamask 或直接使用 Arkane，它允许您使用  [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/) 连接至 Polygon。

为了与 Polygon 网络连接，阅读区块链信息，我们建议使用 Alchemy  SDK。

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### 在 polygon 上建立新的去中心化应用程序？ {#building-a-new-dapp-on-polygon}

去中心化应用程序 (dApp) 可充当用户与区块链上的数据隐私之间的桥梁。越来越多的去中心化应用程序 (dApp) 已证明其自身在区块链生态系统中的价值，允许在两个参与者之间执行交易，而不需要通过智能合约进行中心化授权。

假设您先前没有过创建去中心化应用程序 (dApp) 的经历。在这种情况下，您可以通过以下资源提前了解一下在 Polygon 网络上建立、调试和部署去中心化应用程序所需的工具。

- [全栈去中心化应用程序：教程系列](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [Metamask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [使用 Fauna、 Polygon 和 React 开发去中心化应用程序](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### 已经拥有去中心化应用程序？ {#already-have-a-dapp}

如果您已经拥有去中心化应用程序 (dApp) 并且正在寻找一个平台来帮助您有效扩展， Polygon 是最适合的平台，它允许您：

1. **从基于以太坊虚拟机的 (EVM) 链上轻松迁移**： Polygon 是以太坊的最终第 2 层扩展解决方案。只要您的去中心化应用程序与 EVM 兼容，在移动或部署到 Polygon 网络时，您不必为底层架构感到困扰。
2. **将 Polygon 用作快速交易层**：将您去中心化应用程序部署到 Polygon 主网后，您可以将 Polygon 用作快速交易层。此外，您还可以获取我们已映射的代币。您可以加入我们在 Telegram 上的 [技术讨论小组](http://bit.ly/matic-technical-group)，以了解更多信息。

## 旁注 {#side-note}

如果您感到困惑，这也是正常的！您可直接操作，从安全性开始。在深入了解资源、资源库和文档之前，请先了解这些注意事项：

1. **注意前沿技术的成本：**与典型的利基编程相似，去中心化应用程序和区块链开发发展迅猛。在研究过程中，您可能会发现复杂的代码资源库、文档站点上的 404，甚至没发现任何文档。您可以借此机会通过任何社交媒体渠道与我们联系。
2. **学习曲线可能会让人退缩，但进入门槛非常低**：社区非常开放和热情！项目欢迎来自外部的拉取请求并且愿意积极解决任何障碍。我们正在努力创造一个更美好世界，我们也欢迎任何形式的贡献。我们将感谢您加入这一 Web3 生态系统。

:::info 随时更新

去中心化应用程序开发鼓励网络去中心化。请关注我们的社交媒体，了解更多关于 Polygon生态系统的洞察和更新。您可以在[此处](https://polygon.technology/community/)找到关于所有 Polygon 社区的链接。

:::
