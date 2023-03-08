---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: '发起提取流程。'
---

`withdrawStartMany` 方法可用于发起提取流程，该流程将燃烧 Polygon 链上指定数量的多个代币。

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
