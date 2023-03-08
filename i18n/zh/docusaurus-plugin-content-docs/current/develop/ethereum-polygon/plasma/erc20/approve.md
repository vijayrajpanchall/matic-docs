---
id: approve
title: 批准
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Maticjs 快速入门'
---

# 批准 {#approve}

`approve` 方法可用于批准所需数量的根代币。

需要批准才能在 Polygon 链上存入数量。

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
