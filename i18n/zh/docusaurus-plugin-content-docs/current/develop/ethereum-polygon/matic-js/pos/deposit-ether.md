---
id: deposit-ether
title: 存入以太币
keywords:
- 'pos client, depositEther, polygon, sdk'
description: '将所需数量的以太币从以太坊存入 Polygon。'
---

`depositEther` 方法可用于将所需数量的**以太币**从以太坊存入 Polygon。

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
