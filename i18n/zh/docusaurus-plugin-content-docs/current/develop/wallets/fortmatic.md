---
id: fortmatic
title: Fortmatic
description: 使用 Formatic SDK 来将您的dApp与 Polygon 结合起来
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic SDK 允许您轻松地将 dApp 集成到以太坊区块链中，无论您已经与 Web3 集成了 dApp 还是从零开始。Fortmatic 向您和您分散的应用用户提供平稳和愉快的经验。

## 安装 {#installation}

使用以下命令安装 Fortmatic 钱包最新版本：

```bash
$ npm i --save fortmatic@latest
```

## 示例 {#example}
以下是使用 Fortmatic 应用的实例：

```js title="example.js"
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.matic.today', // your own node url
    chainId: 80001 // chainId of your own node
}

// Setting network to localhost blockchain
const fm = new Fortmatic('YOUR_TEST_API_KEY', customNodeOptions);
window.web3 = new Web3(fm.getProvider());
```
