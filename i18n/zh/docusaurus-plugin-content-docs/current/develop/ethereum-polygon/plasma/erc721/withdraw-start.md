---
id: withdraw-start
title: withdrawStart
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: 'Maticjs 快速入门'
---

# withdrawStart {#withdrawstart}

`withdrawStart` 方法可用于发起燃烧 Polygon 链上指定代币的提取流程。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
