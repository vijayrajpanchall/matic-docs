---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Maticjs 快速入门'
---

# isApprovedAll {#isapprovedall}

`isApprovedAll` 方法可用来检查是否所有的代币都已被批准。它将返回一个布尔值。

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
