---
id: transfer
title: 转账
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Maticjs 快速入门'
---

# 转账 {#transfer}

`transfer` 方法将代币从一个用户转账至另一个用户。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
