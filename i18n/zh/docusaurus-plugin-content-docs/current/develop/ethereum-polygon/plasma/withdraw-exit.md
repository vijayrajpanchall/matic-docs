---
id: withdraw-exit
title: 提现退出
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Maticjs 快速入门'
---

# withdrawExit {#withdrawexit}

在 Plasma 中，任何人都可以通过 `withdrawExit` 方法退出提现流程。 只有在挑战期结束后，退出流程才会生效。

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

您还可以通过在阵列中提供代币列表的方式来退出多个代币。
