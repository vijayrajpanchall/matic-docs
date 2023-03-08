---
id: deposit
title: 存入
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: '将以太坊中的代币存入 Polygon 链。'
---

`deposit` 方法可用于将以太坊中的代币存入 Polygon 链。

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
