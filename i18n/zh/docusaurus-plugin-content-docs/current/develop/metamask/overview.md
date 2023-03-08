---
id: overview
title: Metamask 概述
sidebar_label: Overview
description: 如何开始使用 Polygon 上的 MetaMask
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[MetaMask](https://metamask.io/) 是在网络浏览器和移动设备上使用的加密钱包，能够与以太坊区块链进行交互。它允许您直接在浏览器中运行以太坊去中心化应用程序 (Dapp)，而无需运行完整的以太坊节点。

**类型**：非托管型/HD <br/>
**私钥存储**：用户的本地浏览器存储<br/>
**以太坊账本通信**： Infura <br/>
**私钥编码**： Mnemonic <br/>

:::warning
请备份您**的秘密恢复词语。**如果您的设备发生故障、丢失、盗窃或数据腐败，则没有其他方法来恢复它。 秘密回收词语是恢复 MetaMask 账户的唯一方法。检查更**[<ins>基本的安全保障提示，用于 MetaMask 。</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**
:::

## 为 Polygon 设置 MetaMkask的指南 {#guide-to-set-up-metamask-for-polygon}

* [下载和安装 MetaMask](/develop/metamask/tutorial-metamask.md)
* [在 MetaMask 上配置 Polygon](/develop/metamask/config-polygon-on-metamask.md)
* [配置自定义代币](/develop/metamask/custom-tokens.md)
* [创建和导入账户](/develop/metamask/multiple-accounts.md)

### 1. 设置 Web3 {#1-set-up-web3}

#### 步骤 1 {#step-1}

在您的去中心化应用程序中安装以下项：

  ```javascript
  npm install --save web3
  ```

创建一个新文件，命名为 `web3.js` ，在其中插入以下代码：

  ```javascript
  import Web3 from 'web3';

  const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;

      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });


  export default getWeb3;
  ```

上述文件导出的函数是 `getWeb3()` — 目的是通过检测 Metamask 注入的全局对象（`ethereum` 或 `web3`）请求访问 Metamask 账户。

根据 [Metamask API 文档](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes)：

> MetaMask 向用户在窗口上访问的网站注入全球 API。该 API 允许网站请求用户的以太机账户，阅读用户所连接的区块链的数据，并建议用户签名消息和交易。提供者对象的存在表示一个以太坊用户。

简单地说，它基本上意味着在浏览器中安装了 Metamask 扩展/增开，您将有一个定义的全球变量，称为`ethereum`（`web3`旧版版本），使用这个变量，我们将安装我们的web3 对象。

#### 步骤 2 {#step-2}

现在，在客户端代码中，导入上述文件：

```js
  import getWeb3 from '/path/to/web3';
```

然后调用函数：

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2. 账户设置 {#2-set-up-account}

现在，发送交易（特别是改变区块链状态的交易）将需要一个账户来签署这些交易。我们从上面创建的web3 对象中检验我们的合同实例：

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

`getAccounts()` 函数返回用户 Metamask 上的所有账户，`accounts[0]` 是用户当前选中的账户。

### 3. 合约实例化 {#3-instantiate-your-contracts}

一旦我们拥有我们的`web3`对象，我们将下次进行检验，假设您已经拥有合约的 ABI 并已到位地址：

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. 调用函数 {#4-call-functions}

现在，对于您想要从您的合约中调用的任何函数，我们直接与我们已安装的合约对象进行互动（在步骤 2 中`myContractInstance`宣布）。

:::tip 快速审查

改变合约状态的函数称为函数`send()`。不改变合约状态的函数称为`call()`函数。

:::

#### 调用 `call()` 函数 {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### 调用 `send()` 函数 {#functions-1}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .send({
    from: this.account,gasPrice: 0
  })
  .then (
    (receipt) => {
      // returns a transaction receipt}
    )
```
