---
id: withdraw-start
title: 提取开始
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: '发起提取流程。'
---

`withdrawStart` 方法可用于发起燃烧 Polygon 链上指定数量的提取流程。

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

收到的交易哈希将用于退出提取流程。所以我们推荐保存它。

