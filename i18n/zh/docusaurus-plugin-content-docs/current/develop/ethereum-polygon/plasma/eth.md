---
id: eth
title: 以太币存入和提取指南
sidebar_label: ETH
description: "在 Polygon 网络上存入和提取以太币。"
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - eth
image: https://matic.network/banners/matic-network-16x9.png
---

### 高级流程 {#high-level-flow}

#### **存入以太币（ 1 步骤流程）**

在将代币存入 Polygon 合约时调用 **deposit** 函数，此函数也可以在 Polygon 网络中使用。

#### **以太币转账**

如果您在 Polygon 账面上有资金，您可以立即将资金发送给其他人。

#### **以太币提取（ 3 步骤流程）**

1. 资金提现可从 polygon 上发起。设置了 30 分钟的检查点间隔（用于测试网，等待约 10 分钟），在那里，自上次检查点以来， Polygon 区块层上的所有区块都得到验证。
2. 在将检查点提交到主链 ERC20 合约后，将创建一个具有等值价值的 NFT 退出 (ERC721) 代币。
3. 提取的资金可以通过处理退出程序，从主链合约中恢复到您的 ERC20 指控。

## 设置详情 {#setup-details}

### 配置 Matic SDK {#configuring-matic-sdk}

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

**存款：**可以`depositEther()`调用合约来完成存款`depositManagerContract`。

请注意，需要事先绘制代币并批准转换。

```js
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const result = await client.depositEther(100, from);

  const txHash = await result.getTransactionHash();
  const receipt = await result.getReceipt();

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
```

:::note

以太坊交存到 Polygon 时使用状态同步机制进行，需要大约22-30分钟。经过这段时间的等待后，建议使用 Web3.js/Matic.js 库或 Metamask 来检查余额。如果子链发生至少一项资产转账，浏览器将只会显示余额。此[链接](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma)可解释如何跟踪存入事件。

:::

## 转账 {#transfer}

Polygon 网络上的以太币是 WETH （ERC20 代币）。

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

## 提现 {#withdraw}

### 1. 燃烧 {#1-burn}

用户可以调`getERC20TokenContract`用子代币合约的`withdraw`功能。此函数可以燃烧代币。 Polygon plasma 客户端揭露了进行此调用`withdrawStart`的方法。

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)

  const txHash = await result.getTransactionHash()
  const receipt = await result.getReceipt()

}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

用户可以调用合同的`startExitWithBurntTokens()`函数`erc20Predicate`。Polygon plasma 客户端揭露了进行此调用`withdrawConfirm()`的方法。此函数仅在主链中包含检查点时方可调用。检查点包含可通过该[指南](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma.md#checkpoint-events)进行跟踪。


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. 流程退出 {#3-process-exit}

用户应调用`withdrawManager`合约的`processExits()`功能，并提交烧伤证明。提交有效证明后，代币将转交用户。Polygon plasma 客户端揭露了进行此调用`withdrawExit()`的方法。

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);
  const result = await erc20Token.withdrawExit();

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

检查点是每~5分钟向以太坊链转交在 Polygon 上发生的所有交易的表达，定期提交到主链以太坊合约。

:::