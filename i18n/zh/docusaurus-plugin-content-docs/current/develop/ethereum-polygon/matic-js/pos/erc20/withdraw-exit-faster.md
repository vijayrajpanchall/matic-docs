---
id: withdraw-exit-faster
title: 加速提取退出
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: '使用 withdrawStart 中的 txHash 更快地退出提取流程。'
---

`withdrawExitFaster` 方法可使用 `withdrawStart` 方法中的 txHash，更快地退出提取流程。

它在后端生成证明，因此通常速度很快。您需要配置 [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)。

**注意**- withdrawStart 交易必须确认检查点后才能退出提取。

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

一旦交易和检查点完成，数量将存入根链。
