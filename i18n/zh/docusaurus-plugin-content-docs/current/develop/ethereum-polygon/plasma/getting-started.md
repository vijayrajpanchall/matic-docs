---
id: getting-started
title: Plasma 桥
sidebar_label: Introduction
description: Plasma 桥与 Polygon 网络交互。
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

请查看[ Plasma 上的最新 Matic.js 文档](https://maticnetwork.github.io/matic.js/docs/plasma/)，以便于快速入门。

桥接本质上是一组合约，可帮助将资产从根链转移到子链上。主要有两种桥接可用于在以太坊和 Polygon 之间转移资产。第一种是 Plasma 桥，第二种是 **PoS 桥**，也称作**权益证明桥**。**Plasma 桥梁**提供更多的安全保障，原因是 Plasma 退出机制。

但子代币存在特定的限制，Plasma 桥上从 Polygon 到以太坊的所有退出/提取只有 7 天提现期。而 [PoS 桥](/docs/develop/ethereum-polygon/pos/getting-started)则更为灵活，提现速度更快。

该教程将作为分阶段指南，使用 [Matic JS](https://github.com/maticnetwork/matic.js) 来理解和使用 Plasma 桥，这是与 Polygon 网络上的 Plasma 桥互动的最容易方式。

## Plasma 桥中的资产流程 {#assets-flow-in-plasma-bridge}

我们将在本教程中展示 Polygon 上的资产转账流程，以及您如何使用 Matic.js 进行相同的操作：

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. 用户在主链上将 Polygon 合约的密码资产存入到 Polygon 合约上
2. 在主链上确认存入的代币后，相应的代币将反映在 Polygon 链上。
   - 用户现在可将代币即时转账给指定的任何人，费用几乎可以忽略不计。 Polygon 链的区块速度更快（大约 1 秒）。因此，它可以即时完成转账。
3. 用户准备好后，他们可以从主链中提取剩余的代币。资金提现可从 Plasma 侧链上发起。检查点间隔设置为 5 分钟， Polygon 区块层上的所有区块都从检查点开始验证。
4. 一旦将检查点提交到主链链上的以太坊合约，则创建一个 Exit NFT (ERC721) 代币的价值等值。
5. 提取的资金可以通过处理退出程序，从主链合约中退回到您的以太阳馆指控点上。
   - 用户还可通过 0x 或 Dharma 获取快速出口（即将发布！）

### 先决条件： {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Görli 水龙头 {#görli-faucet}

在进行任何交易时，您还需要在测试账户中拥有一些以太币，以便于按教程操作时使用。如果您在 Görli 上没有 ETH 上，您可以使用此处提供的 faucet 链接—— https://goerli-faucet.slock.it/。

### Polygon Faucet {#polygon-faucet}

在本教程中，我们将以 Görli 网络上的 ERC20 代币`TEST`作为示例。它只是测试代币。在去中心化应用程序中，您可以将其替换为任何 ERC20 代币。为了在 Polygon 网络上获取一些测试`TEST`代币，您可以访问 [Polygon 水龙头](https://faucet.polygon.technology/)。

:::note

要使用自己的代币进行存款和提取，您必须获得代币的“mapped”，这基本上意味着在主链上发布合约，并使用自定义代币“知道”。

:::

### Metamask 钱包的基本设置（可选） {#basic-setup-for-the-metamask-wallet-optional}

1. [创建钱包：](/docs/develop/metamask/hello)如果您是新的钱包，请设置 MetaMask 账户。
2. [配置 Polygon 测试网：](/docs/develop/metamask/config-polygon-on-metamask)为了轻松可视地看见 Polygon 上的资金流量，如果您在 Metamask 上配置 Polygon 测试网，则会有启发性。注意，我们在此处仅为了形象说明才使用 Metamask。在使用 Polygon 时完全不需要 Metamask。
3. [创建多个账户](/docs/develop/metamask/multiple-accounts)： 在教程开始之前，先准备好 3 个以太坊测试账户。
4. [在 Polygon 上配置代币](/docs/develop/metamask/custom-tokens)： 为了在 polygon 上使用 Matic.js 轻松配置资金流程，您可以在 Metamask 上配置代币。
以此教程为例，可以在 MetaMkask 中配置`TEST`代币，以便容易视觉地视觉账户余额。再次注意，这是**可选的。**您可以使用[web3.js](https://web3js.readthedocs.io/en/1.0/) 查询代币余额和其他变量
