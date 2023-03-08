---
id: portis
title: Portis
description: 基于网络的钱包非常注重用户使用的便利性。
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis 就是一个重视用户使用便利性的网络钱包。它将 Javascript SDK 集成到去中心化应用程序，并且可为用户提供本地无钱包体验。此外，它处理设置钱包、交易和天然气费。

它与 Metamask 类似，都是非托管型的 — 用户自行控制密钥， Portis 只负责安全存储。但与 Metamask 的不同之处在于，它被集成到应用程序而不是浏览器中。用户自己的密钥与登录 ID 和密码关联。

**类型**：非托管型/HD <br/>
**私钥存储：**加密并存储在 Portis 服务器上<br/>**发送给以太坊的通信：**由开发者定义<br/>**私钥编码**：助记词<br/>

## 设置 Web3 {#set-up-web3}

在您的 dApp 中安装 Portis：

```js
npm install --save @portis/web3
```

现在，请向 Portis 登记您的dApp 以使用 Portis 数据板获取 dApp  ID[。](https://dashboard.portis.io/)

导入`portis`和对象`web3`：

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Portis 建设者将第一个参数作为dApp ID，第二个参数作为您想要连接的网络。它可以是一个字符串或者一个对象。

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## 设置账户 {#set-up-account}

如果 Web3 已成功安装并实例化，接下来将成功返回连接的账户：

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## 安装合约 {#instantiating-contracts}

因此，我们应该如何进行实证：

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## 调用函数 {#calling-functions}

### 调用函`call()`数 {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### 调用函`send()`数 {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
