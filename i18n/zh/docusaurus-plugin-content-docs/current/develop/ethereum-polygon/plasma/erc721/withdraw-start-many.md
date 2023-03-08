---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'plasma client, erc721, withdrawStartMany, polygon, sdk'
description: 'Maticjs 快速入门'
---

# withdrawStartMany {#withdrawstartmany}

`withdrawStartMany` 可用于发起在 Polygon 链上燃烧多个代币的提取流程。

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
