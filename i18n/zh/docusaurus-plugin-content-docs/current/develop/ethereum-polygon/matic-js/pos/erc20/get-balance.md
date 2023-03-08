---
id: get-balance
title: getBalance
keywords:
    - pos client
    - erc20
    - getBalance
    - polygon
    - sdk
description: "获取用户余额。"
---

`getBalance` 方法可用于获取用户余额。它既可用于子代币，也可用于父代币。

```
const erc20Token = posClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
