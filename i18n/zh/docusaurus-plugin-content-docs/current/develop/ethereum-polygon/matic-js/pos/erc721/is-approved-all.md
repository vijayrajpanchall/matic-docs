---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: '检查是否所有的代币都已被批准。'
---

`isApprovedAll` 方法可用来检查是否所有的代币都已被批准。它将返回一个布尔值。

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
