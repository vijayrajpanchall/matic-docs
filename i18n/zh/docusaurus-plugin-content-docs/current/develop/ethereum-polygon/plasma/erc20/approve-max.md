---
id: approve-max
title: approveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Maticjs 入门'
---

# approveMax {#approvemax}

`approveMax` 方法可用于批准根代币的最大数量。

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
