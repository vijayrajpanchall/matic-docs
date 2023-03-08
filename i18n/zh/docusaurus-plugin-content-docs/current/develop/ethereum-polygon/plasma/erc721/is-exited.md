---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Maticjs 快速入门'
---

# isExited {#isexited}

`isExited` 方法用来检查是否已退出提现。它将返回布尔值。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
