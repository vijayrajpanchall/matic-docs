---
id: index
title: POSClient
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'POSClient 支持您与 POS 桥接进行交互。'
---

`maticjs` 提供 `POSClient`，从而与 **POS** 桥接进行交互。

```
import { POSClient,use } from "@maticnetwork/maticjs"

const posClient = new POSClient();

await posClient.init({
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

启动 `POSClient` 后，您可以与所有可用的 APIS 交互。
