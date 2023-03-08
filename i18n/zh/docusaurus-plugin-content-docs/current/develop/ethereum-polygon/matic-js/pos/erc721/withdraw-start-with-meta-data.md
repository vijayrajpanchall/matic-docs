---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: '使用元数据启动提取流程。'
---

`withdrawStartWithMetaData` 方法可用于发起燃烧 Polygon 链上指定代币的提取流程。在底层，它在代币合约上调用`withdrawWithMetadata`方法。


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
