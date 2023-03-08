---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Maticjs 入门'
---

# isExitedMany {#isexitedmany}

`isExitedMany` 方法可用来检查是否已退出提现。它将返回布尔值。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
