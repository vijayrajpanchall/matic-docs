---
id: transfer
title: 转账
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: '将代币从一个用户转账至另一个用户。'
---

`transfer` 方法可用于将代币从一个用户转账至另一个用户。

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
