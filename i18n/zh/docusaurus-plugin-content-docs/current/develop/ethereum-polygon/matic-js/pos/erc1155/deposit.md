---
id: deposit
title: 存入
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: '使用 matic.js 存入 ERC115 代币'
---

`deposit` 方法可用于将所需数量的代币从以太坊存入 Polygon 链。

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.deposit({
    amount: 1,
    tokenId: '123',
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

提供**数据**是可选的。