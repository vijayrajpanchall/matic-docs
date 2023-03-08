---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
description: '使用 `withdrawStartMany` 中的 txHash 退出提取流程。'
---

`withdrawExitFasterMany` 方法可用于使用 `withdrawStartMany`方法中的 txHash 退出提取流程。


由于证明在后端生成，因此速度非常快。您需要配置 [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)。

**注意**- withdrawStart 交易必须具有检查点后才能退出提取。

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
