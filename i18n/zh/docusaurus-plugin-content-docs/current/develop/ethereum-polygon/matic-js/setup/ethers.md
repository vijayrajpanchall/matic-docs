---
id: ethers
title: 'Ethers 设置'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: '安装和设置 ethers.js'
---

# ethers.js {#ether-js}

[ethers.js](https://docs.ethers.io/) 库旨在成为一个完整而紧凑的库，用于与以太坊区块链及其生态系统进行交互。

## 设置 ether.js {#setup-ether-js}

ether.js 支持可通过单独的程序包获得，作为 matic.js 的插件。

### 安装 {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### 设置 {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

让我们看一个使用 ethers 创建 `POSClient` 的示例 -

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'
import { providers, Wallet } from "ethers";


// install web3 plugin
use(Web3ClientPlugin);

const parentProvider = new providers.JsonRpcProvider(rpc.parent);
const childProvider = new providers.JsonRpcProvider(rpc.child);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new Wallet(privateKey, parentProvider),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new Wallet(privateKey, childProvider),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

## 示例 {#examples}

[ethers 插件库](https://github.com/maticnetwork/maticjs-ethers)提供了各类案例的示例。
