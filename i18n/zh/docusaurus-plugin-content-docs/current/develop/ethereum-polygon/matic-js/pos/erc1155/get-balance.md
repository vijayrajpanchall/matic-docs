---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: '使用 matic.js 获取 ERC1155 代币的余额。'
---

`getBalance` 方法可用于获取用户的代币余额。它既可用于子代币，也可用于父代币。

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
