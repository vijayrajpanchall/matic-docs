---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Maticjs 快速入门'
---

# getTokenIdAtIndexForUser {#gettokenidatindexforuser}

`getTokenIdAtIndexForUser` 方法可为用户返回所提供的索引上的代币 ID。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
