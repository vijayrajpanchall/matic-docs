---
id: withdraw-exit
title: 提取退出
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: '使用 withdrawStart 中的 txHash 退出提取流程。'
---

`withdrawExit` 方法可用于使用`withdrawStart`方法中的 txHash 退出提取流程。

**注意**- withdrawStart 交易必须具有检查点后才能退出提取。

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


此方法执行多次 RPC 调用以生成证明和进程退出。所以推荐使用 withdrawExitFaster 方法。
>

