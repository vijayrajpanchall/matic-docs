---
id: getting-started
title: Matic.js 快速入门
sidebar_label: Instantiating Matic.js
description: "使用 Matic.js 与 Polygon PoS 链互动。"
keywords:
  - docs
  - matic
  - polygon
  - sdk
  - matic.js
  - pos
image: https://matic.network/banners/matic-network-16x9.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

如需入门，请查看最新的 [Matic.js 文档](/docs/develop/ethereum-polygon/matic-js/get-started)。

## 快速概览 {#quick-summary}

Matic.js SDK 集成 Polygon 的所有计算能力，让您触手可及。自定义批准、存入和提取函数，完全不需要大量的灵活应对。我们进行工程设计的理由是，确保您可以从我们的平台上获取即时价值。

## 安装 {#installation}
通过我们的 SDK 使用 Polygon 强大功能的第一步是进行 NPM 安装。请参阅[此处](https://www.npmjs.com/package/@maticnetwork/maticjs)。

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## 使用方法 {#usage}
如需访问 SDK，请将其导入您的应用程序，方法是使用
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

提供者可以是 RPC URL 或基于网络3 的提供者，如 MetaMkask 提供者、 HDWalletProvider 提供者，基于需求。

如需了解更多详情，请参阅[关于 PoS 的 Matic.js 文档](https://maticnetwork.github.io/matic.js/docs/pos/)。

```js
// for mumbai testnet
const getPOSClient = (network = 'testnet', version = 'mumbai') => {
  const posClient = new POSClient();

await posClient.init({
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
