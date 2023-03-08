---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Maticjs 快速入门'
---

# isApproved {#isapproved}

`isApproved` 方法可用来检查指定 token Id 的代币是否已被批准。它将返回布尔值。

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
