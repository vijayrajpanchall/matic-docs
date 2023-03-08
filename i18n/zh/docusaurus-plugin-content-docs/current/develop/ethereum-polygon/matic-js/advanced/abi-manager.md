---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "Matic.js 的内部 ABI 管理器。"
---

`matic.js`内部使用，`ABIManager`为您处理 ABI 管理、配置。所有 ABI 和配置均取自[静态库](https://github.com/maticnetwork/static)。

## 更改 ABI {#change-abi}

有时您需要更改 ABI，尤其是在您开发合约时。`ABIManager`您可以通过

**语法**实现此操作。

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

网络名称、合约名称、桥接名称等可以从我们的[官方静态库](https://github.com/maticnetwork/static/tree/master/network)中获取。

**示例**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




