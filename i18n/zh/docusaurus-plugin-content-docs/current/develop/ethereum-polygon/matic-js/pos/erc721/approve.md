---
id: approve
title: 批准
keywords:
- 'pos client, erc721, approve, polygon, sdk'
description: '批准所需数量的根代币'
---

`approve` 方法可用于批准所需数量的根代币。

```
const erc721RootToken = posClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
