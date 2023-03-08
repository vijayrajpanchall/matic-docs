---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: '是否所有代币都已被批准。'
---

`isApprovedAll` 方法可检查是否某个用户的所有代币都已被批准。它将返回布尔值。

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
