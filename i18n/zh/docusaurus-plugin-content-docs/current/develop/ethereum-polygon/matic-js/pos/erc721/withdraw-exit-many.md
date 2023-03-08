---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: '使用 `withdrawStartMany` 中的 txHash 退出提取流程'
---

`withdrawExitMany` 方法可用于使用  `withdrawStartMany`方法中的 txHash 退出提取流程。

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
