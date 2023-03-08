---
id: approve-all
title: approveAll
keywords:
- 'pos client, erc1155, approve, polygon, sdk'
description: '批准 ERC1155 代币。'
---

# approveAll {#approveall}

`approveAll` 方法可用于批准根代币上的所有代币。

```
const erc1155RootToken = posClient.erc1155(<root token address>,true);

const approveResult = await erc1155RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
