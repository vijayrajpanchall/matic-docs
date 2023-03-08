---
id: get-started
title: 入门
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Matic.js 入门
---

`@matic.js` 是一个 JavaScript 库，可用于与 Matic 网络的各个组件进行交互。

在本入门教程中，我们将了解如何设置 POS 桥并与之交互。

## 安装 {#installation}

**通过 NPM 安装 maticjs 程序包：**

```bash
npm install @maticnetwork/maticjs
```

**安装 web3js 插件**

```bash
npm install @maticnetwork/maticjs-web3
```

## 设置 {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

在上方代码中，我们通过`web3js`启动 maticjs，但您也可使用 [ethers](/docs/develop/ethereum-polygon/matic-js/setup/ethers) 实现类似启动。

## POS 客户端 {#pos-client}

`POSClient` 可帮助我们与 POS 桥进行交互。

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, mainRPC),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, childRPC),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

`POSClient` 启动后，我们需要启动所需的代币类型，如 - `erc20`、`erc721` 等。

让我们启动 `erc20` -

### ERC20 {#erc20}

**创建 ERC20 子代币**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**创建 ERC20 父代币**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

ERC20 启动后，您即可调用各种可用的方法，例如 - `getBalance`、`approve`、`deposit`、`withdraw` 等。

我们来看一些 API 示例 -

#### 获取余额 {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### 批准 {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


如您所见，maticjs 借助简单的 API，可轻松实现与 maticjs 桥的交互。 **让我们开始创建一些了不起的内容**

### 有用链接 {#useful-links}

- [示例](https://github.com/maticnetwork/matic.js/tree/master/examples)
