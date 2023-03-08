---
id: deposit
title: 存入
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: '从根代币存入所需数量到子代币。'
---

`deposit` 方法可从根代币存入所需数量到子代币。

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Polygon 链上的存入数量可能需要一段时间才能显示。您可以使用 [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) 方法检查状态。
