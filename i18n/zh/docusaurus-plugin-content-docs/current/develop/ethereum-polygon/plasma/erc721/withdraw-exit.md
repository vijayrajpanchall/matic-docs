---
id: withdraw-exit
title: 提现退出
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Maticjs 快速入门'
---

# withdrawExit {#withdrawexit}

`withdrawExit` 方法可用于在挑战期结束时退出提现流程。

```
const erc20RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
