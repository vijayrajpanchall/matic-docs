---
id: erc20
title: ERC20 存入和提取指南
sidebar_label: ERC20
description:  "在 Polygon 网络上存入和提取 ERC20 代币。"
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

请在开始之前查看 [Plasma ERC20 上的最新 Matic.js 文档](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/)，并了解最新方法。

### 高级流程 {#high-level-flow}

#### **ERC20 存入（ 2 步骤流程）**

1. 代币需要首先获得批准可在主链（Ethereum/Goerli）上存入 Polygon 根链合约。
2. 一旦获得批准，将在代币存入 Polygon 合约并可在 Polygon 中使用时调用 **deposit** 函数。

#### **ERC20 转账**

如果您在 polygon 账面上有资金，您可以立即将资金发送给其他人。

#### **ERC20 提取（3 步骤流程）**

1. 资金提现可从 polygon 上发起。设置了 30 分钟的检查点间间隔（用于检验网等待约10分钟），在那里，自上次检查点以来， Polygon 区块层上的所有区块都得到验证。
2. 在将检查点提交到主链 ERC20 合约后，将创建一个具有等值价值的 NFT 退出 (ERC721) 代币。
3. 提取的资金可以通过处理退出程序，从主链合约中恢复到您的 ERC20 指控。

## 设置详情 {#setup-details}

### 配置 Polygon 边缘 {#configuring-polygon-edge}

安装 Matic SDK (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

安装 Maticjs 客户端

```js
// const use = require('@maticnetwork/maticjs').use
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const { PlasmaClient } = require('@maticnetwork/maticjs-plasma')
const { use } = require('@maticnetwork/maticjs')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')

// install web3 plugin
use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const from = config.user1.address

async function getPlasmaClient (network = 'testnet', version = 'mumbai') {
  try {
    const plasmaClient = new PlasmaClient()
    return plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from
        }
      }
    })
  } catch (error) {
    console.error('error unable to initiate plasmaClient', error)
  }
}
```

### process.env {#process-env}

在命名的根目录中创建新的文件`process.env`，内容如下：

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## 存入 {#deposit}

批准**：**这是正常的 ERC20 批准，因此`depositManagerContract`可以调用`transferFrom()`函数。Polygon plasma 客户端揭露了进行此调用`erc20Token.approve()`的方法。

**deposit**： 存入可通过调用 depositManagerContract 合约上的 **_depositERC20ForUser_** 来完成。

注意，代币转账需要事先被映射和批准。

**_erc20Token.deposit_** 方法可用于执行此项调用。


```js
const { getPlasmaClient, plasma, from } = require('../utils')

const amount = '1000000000000000000' // amount in wei
const token = plasma.parent.erc20

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token, true)
  const result = await erc20Token.deposit(amount, from)
  const receipt = await result.getReceipt()
  console.log(receipt)
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

:::note

使用状态同步机制进行以太机存款到 Polygon 时，需要大约5-7分钟。经过这段时间的等待后，建议使用 Web3.js/Matic.js 库或 Metamask 来检查余额。如果子链发生至少一项资产转账，浏览器将只会显示余额。此[链接](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma)可解释如何跟踪存入事件。

:::

## 转账 {#transfer}

```js

const { getPlasmaClient, from, plasma, to } = require('../utils')

const amount = '1000000000' // amount in wei
const token = plasma.child.erc20

async function execute () {
  try {
    const plasmaClient = await getPlasmaClient()
    const erc20Token = plasmaClient.erc20(token)
    const result = await erc20Token.transfer(amount, to, { gasPrice: 1000000000 })
    const txHash = await result.getTransactionHash()
    const receipt = await result.getReceipt()
  } catch (error) {
    console.log(error)
  }
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

## 提取 {#withdraw}

### 1. 燃烧 {#1-burn}

用户可以调`getERC20TokenContract`用子代币合约的`withdraw()`功能。此函数可以燃烧代币。 Polygon plasma 客户端揭露了进行此调用`withdrawStart()`的方法。

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)
  console.log(await result.getReceipt())
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)

```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

用户可调用 **_startExitWithBurntTokens_** 函数，此函数属于 **_erc20Predicate_** 合约。Polygon Plasma 客户端将 **_withdrawConfirm_** 方法用于执行此项调用。此函数仅在主链中包含检查点时方可调用。检查点包含可通过该[指南](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events)进行跟踪。


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. 流程退出 {#3-process-exit}

用户应调用 **_processExits_** 函数并提交销毁证明。调用的函数属于 **_withdrawManager_** 合约。提交有效证明后，代币将转交用户。Polygon Plasma 客户端提供 **_withdrawExit_** 方法用于执行此项调用。

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawExit()
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

检查点是每~30分钟向 ERC20 链上进行的所有交易的表达，它定期提交到主链 ERC20 合约中。

:::