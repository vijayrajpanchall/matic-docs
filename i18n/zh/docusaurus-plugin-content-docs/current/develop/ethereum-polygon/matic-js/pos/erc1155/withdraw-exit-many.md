---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: '使用 withdrawStart 中的 txHash 退出提取流程。'
---

`withdrawExitMany` 方法可用于使用`withdrawStartMany`方法中的 txHash 退出提取流程。

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
