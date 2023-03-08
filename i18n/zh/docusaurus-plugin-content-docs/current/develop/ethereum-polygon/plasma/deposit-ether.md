---
id: deposit-ether
title: 存入
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Maticjs 入门'
---

# depositEther {#depositether}

`depositEther` 方法可用于将所需数量的**以太币**从以太坊存入 Polygon。

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
