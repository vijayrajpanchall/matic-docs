---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc721, withdrawStart, polygon, sdk'
description: '发起提取流程。'
---

`withdrawStart` 方法可用于发起燃烧 Polygon 链上指定代币的提取流程。

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
