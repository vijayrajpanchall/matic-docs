---
id: pos-stake-unstake
title: 设置和使用权益证明（POS）
description: "质押、取消质押和其他于质押相关的介绍。"
keywords:
  - docs
  - polygon
  - edge
  - stake
  - unstake
  - validator
  - epoch
---

## 概述 {#overview}

指南详细介绍如何使用 Polygon Edge 权益证明网络，如何质押用于 NODE 的资金成为验证者和如何取消质押资金。

高度**鼓励**它阅读并通过[本地设置](/docs/edge/get-started/set-up-ibft-locally)/ [云设置](/docs/edge/get-started/set-up-ibft-on-the-cloud)节，然后再阅读权益证明 (PoS) 指南。这些节概述了使用 Polygon Edge 开始权威证明（PoA）群集所需的步骤。

目前，可以在质押智能合约上质押资金的验证者数量没有限制。

## 质押智能合约 {#staking-smart-contract}

质押智能合约的库位于[此处](https://github.com/0xPolygon/staking-contracts)。

其中存有必要的测试脚本，ABI 文件和最重要的质押智能合约本身。

## 设置 NODE 集群 {#setting-up-an-n-node-cluster}

设置带有 Polygon Edge 的网络可见[本地设置](/docs/edge/get-started/set-up-ibft-locally)/[云设置](/docs/edge/get-started/set-up-ibft-on-the-cloud)节。

设置 PoS 和 PoA 集群的**唯一区别**就是 genesis 生成部分。

**生成 PoS 集群的 genesis 文件时，需要额外的标志：`--pos`**

```bash
polygon-edge genesis --pos ...
```

## 设置 epoch 的长度 {#setting-the-length-of-an-epoch}

Epochs 的详细介绍见[ Epoch 区块](/docs/edge/consensus/pos-concepts#epoch-blocks)节。

要设置集群中 epoch 的大小（在区块中），在生成 genesis 文件时，额外的标志指定`--epoch-size`：

```bash
polygon-edge genesis --epoch-size 50
```

genesis 文件中指定的值，即 epoch 大小应为`50`区块。

epoch（在区块中）大小的默认值为`100000`。

:::info 减少 epoch 长度

如[ Epoch 区块](/docs/edge/consensus/pos-concepts#epoch-blocks)节中所述，epoch 区块用于更新 NODE 的验证者组。

区块中（`100000`）默认的 epoch 长度可能对于验证者设置更新而言过于漫长。考虑到新的区块增加约 2 秒，验证者组可能要花费约 55.5 小时才有可能更改。

设置更低的 epoch 长度确保验证者组可以更加频繁地更新。
:::

## 使用质押智能合约脚本 {#using-the-staking-smart-contract-scripts}

### 先决条件 {#prerequisites}

质押智能合约库是一个 Hardhat 项目，需要 NPM。

要正确地实现初始化，在主目录中运行：

```bash
npm install
````

### 设置提供的帮助脚本 {#setting-up-the-provided-helper-scripts}

与部署的质押智能合约互动的脚本位于[质押智能合约库](https://github.com/0xPolygon/staking-contracts)。

在智能合约库的位置创建带有以下参数的`.env`文件：

```bash
JSONRPC_URL=http://localhost:10002
PRIVATE_KEYS=0x0454f3ec51e7d6971fc345998bb2ba483a8d9d30d46ad890434e6f88ecb97544
STAKING_CONTRACT_ADDRESS=0x0000000000000000000000000000000000001001
BLS_PUBLIC_KEY=0xa..
```

参数为：

* **JSONRPC_URL** - 运行 NODE 的 JSON-RPC 端点
* **PRIBATE_KEYS** - 质押者地址的密钥。
* **STAKING_CONTRACT_ADDRESS** - 质押智能合约的地址（默认`0x0000000000000000000000000000000000001001`）
* **BLS_PUBLIC_KEY** - 质押者的 BLS 公钥。只有在运行 BLS 的网络中需要

### 质押资金 {#staking-funds}

:::info 质押地址

质押智能合约预先部署的地址`0x0000000000000000000000000000000000001001`。

任何与质押机制的互动都通过在特定地址的质押智能合约进行。

要了解更多有关质押智能合约的内容，请查看**[质押智能合约](/docs/edge/consensus/pos-concepts#contract-pre-deployment)**节。
:::

要成为验证者集的一部分，地址需要质押高于阈值的一定资金。

目前，加入验证者集的默认阈值是`1 ETH`。

质押可以通过调用智能合约的`stake`方式启动，并指定一个值`>= 1 ETH`。

`.env`之后，文件在[之前的节](/docs/edge/consensus/pos-stake-unstake#setting-up-the-provided-helper-scripts)有所提及，当该文件设置完成后，链已经以 PoS 模式开始，质押在质押智能合约库的以下指令中进行：

```bash
npm run stake
```

`stake`Hardhat 脚本质押`1 ETH`的默认数量，可以通过修改`scripts/stake.ts`文件更改。

如果质押的资金为`>= 1 ETH`，则质押智能合约上的验证者组更新，且地址从下一个 epoch 开始成为验证者组的一部分。

:::info 注册 BLS 密钥

如果运行 BLS 模式的网络，为了让 NODE 成为验证者，它们需要在质押后注册 BLS 公钥

可以通过以下指令完成：

```bash
npm run register-blskey
```
:::

### 取消质押资金 {#unstaking-funds}

带有权益地址可以一次性**取消质押所有的资金**。

`.env`之后，文件在[上一节](/docs/edge/consensus/pos-stake-unstake#setting-up-the-provided-helper-scripts)有所提及，当该文件设置完成后，链已经以 PoS 模式启动，取消质押可以通过在质押智能合约库中使用以下指令完成：

```bash
npm run unstake
```

### 获取质押者列表 {#fetching-the-list-of-stakers}

质押资金的所有地址都保存在质押智能合约中。

`.env`之后，文件在[上一节](/docs/edge/consensus/pos-stake-unstake#setting-up-the-provided-helper-scripts)有所提及，文件设置完成后，链已经以 PoS 模式启动，取消质押可以通过在质押智能合约库中使用以下指令完成：

```bash
npm run info
```
