---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: '发起提取流程。'
---

`withdrawStart` 方法可用于发起提取流程，该流程将燃烧 Polygon 链上指定数量的 tokenId。

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
