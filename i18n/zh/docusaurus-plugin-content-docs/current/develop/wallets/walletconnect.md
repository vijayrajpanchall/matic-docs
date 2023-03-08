---
id: walletconnect
title: WalletConnect
description: 创建去中心化应用程序—钱包通信的开放协议。
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect** 是一个开放协议，而不是一个钱包，用于在 dApps 和钱包之间创建通信链接。支持此协议的钱包和应用程序将通过在任何两个同行之间共享密钥来实现安全链接。连接由显示带有标准 WalletConnect URI 二维码的去中心化应用程序发起，并且在钱包应用程序批准连接请求时建立。钱包应用程序本身将确认有关转账的其他请求。

## 设置 Web3 {#set-up-web3}

为了设置您的dApp，以与用户的 Polygon 钱包连接，您可以使用 WalletConnect 提供者直接连接到 Polygon。在您的去中心化应用程序中安装以下项：

```bash
npm install --save @maticnetwork/walletconnect-provider
```

安装 Polygon `matic.js`集成的集成：

```bash
$ npm install @maticnetwork/maticjs
```

在 dApp 中添加以下代码；

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

其次，通过 WalletConnect 对象设置 Polygon 和 Ropsten 提供者：

```javascript
const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const ropstenProvider = new WalletConnectProvider({
  host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  callbacks: {
    onConnect: console.log('connected'),
    onDisconnect: console.log('disconnected')
  }
})
```

我们创建上述两个提供者对象来实例化我们的 Web3 对象：

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## 安装合约 {#instantiating-contracts}

一旦有了我们的**web3 对象，**则可直接处理合约的步骤与 Metamask 相同。确保您已经具备**合同**的 ABI 并已到位**地址**。

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## 调用函数 {#calling-functions}

:::info

私钥将保留在用户的钱包中，**应用程序不会以任何方式访问。**

:::

我们在以太坊中拥有两种函数，取决于与区块链的互动。我们在读取数据时 `call()`，在写入数据时 `send()`。

### 调用 `call()` 函数 {#functions}

阅读数据不需要签名，因此代码应该是这样：

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### 调用 `send()` 函数 {#functions-1}

由于写入区块链需要签名，所以我们要求在他们的钱包上（支持 WalletConnect）的用户签署交易。

这涉及三个步骤：
1. 构建交易
2. 获取交易签名
3. 发送已签名的交易

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

上述代码创建交易对象，然后发送到用户钱包进行签名：


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`函数促使用户签名，并`sendSignedTransaction()`发送签名交易（在成功时返回交易收据）。
