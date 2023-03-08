---
id: get-all-tokens
title: getAllTokens
keywords:
- 'pos client, erc721, getAllTokens, polygon, sdk'
description: '检索指定用户拥有的所有代币。'
---

`getAllTokens` 方法可返回指定用户拥有的所有代币。

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

您还可以通过在第二个参数中指定限值的方式来限制代币。
