---
id: transfer
title: 转账
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: '从一个地址转账到另一个地址。'
---

`transfer` 方法可用于从一个地址转账到另一个地址。

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
