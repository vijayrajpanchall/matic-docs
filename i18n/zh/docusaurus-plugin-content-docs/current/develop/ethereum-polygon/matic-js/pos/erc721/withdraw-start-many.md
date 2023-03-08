---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc721, withdrawStartMany, polygon, sdk'
description: '发起提取流程。'
---

`withdrawStartMany` 可用于发起在 Polygon 链上燃烧多个代币的提取流程。

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
