---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: '检查多个代币的提取是否已被退出。'
---

`isWithdrawExitedMany` 方法可检查多个代币的提取是否已被退出。它将返回布尔值。

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
