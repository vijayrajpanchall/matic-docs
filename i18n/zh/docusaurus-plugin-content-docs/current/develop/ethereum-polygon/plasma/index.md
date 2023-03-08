---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClient 支持您与 PoS 桥交互。'
---

# Plasma 桥 {#plasma-bridge}

Plasma 桥接功能可在[单独的资源库](https://github.com/maticnetwork/maticjs-plasma)中使用。 为了使用`plasma`桥接功能，您需要安装单独的程序包。

## 安装 {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## 设置 {#setup}

`PlasmaClient` 可用于与 **Plasma** 桥交互。

```
import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

启动 `plasmaClient` 后，您可以与所有可用的 APIS 交互。
