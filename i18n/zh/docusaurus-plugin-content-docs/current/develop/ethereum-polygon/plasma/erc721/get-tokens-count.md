---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Maticjs 快速入门'
---

# getTokensCount {#gettokenscount}

`getTokensCount` 方法可为指定用户返回代币计数。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
