---
id: is-approved
title: isApproved
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: '检查指定 tokenId 的代币是否已被批准。'
---

`isApproved` 方法可用来检查指定 tokenId 的代币是否已被批准。它将返回布尔值。

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
