---
id: installation
title: 安装
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: 安装 Matic.js 和以太坊库。
---

Maticjs 有两个部分 -

1. 主类库
2. 以太坊库

### 主类库 {#main-library}

主类库具有核心逻辑，并提供不同的 API。用户主要与这个库进行交互。

```
npm i @maticnetwork/maticjs
```

### 以太坊库 {#ethereum-library}

以太坊库支持我们使用所有热门以太币库。它通过插件被注入至 Matic.js。

Matic.js 支持两个热门库 -

1. [Web3.js](https://web3js.readthedocs.io/)
2. [Ethers](https://docs.ethers.io/)

#### Web3.js {#web3-js}

```
npm install @maticnetwork/maticjs-web3
```

#### Ethers {#ethers}

```
npm install @maticnetwork/maticjs-ethers
```
