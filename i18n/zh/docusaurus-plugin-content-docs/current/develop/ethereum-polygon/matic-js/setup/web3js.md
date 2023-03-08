---
id: web3
title: 'Web3js setup'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: '安装和设置web3.js。'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/) 是一个库集合，支持您使用 HTTP、IPC 或 WebSocket 与本地或远程以太坊节点进行交互。

## 设置 web3.js {#setup-web3-js}

web3.js 支持可通过单独的程序包获得，作为 matic.js 的插件。

### 安装 {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### 设置 {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

让我们看一个使用 Web3 创建 `POSClient` 的示例 -

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

## 示例 {#examples}

[Web3 插件库](https://github.com/maticnetwork/maticjs-web3)提供了各类案例的示例。
