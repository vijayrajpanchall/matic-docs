---
id: deposit
title: 存入
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'Maticjs 快速入门'
---

# 存入 {#deposit}

`deposit` 方法可从根代币存入所需数量到子代币。

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
