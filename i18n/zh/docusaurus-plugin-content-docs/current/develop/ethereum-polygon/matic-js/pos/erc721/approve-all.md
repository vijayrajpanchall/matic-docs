---
id: approve-all
title: approveAll
keywords:
- 'pos client, erc721, approveAll, polygon, sdk'
description: '批准所有代币。'
---

`approveAll` 方法可用于批准所有代币。

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
