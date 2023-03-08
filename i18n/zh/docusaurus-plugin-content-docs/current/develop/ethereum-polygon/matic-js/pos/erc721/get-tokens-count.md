---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: '为指定用户返回代币计数。'
---

`getTokensCount` 方法可为指定用户返回代币计数。

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
