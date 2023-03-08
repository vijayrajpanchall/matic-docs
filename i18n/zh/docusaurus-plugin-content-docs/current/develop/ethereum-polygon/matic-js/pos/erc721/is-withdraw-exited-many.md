---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: '检查是否已退出多个代币的提取。'
---

`isWithdrawExitedMany` 方法可检查是否已退出多个代币的提取。它将返回布尔值。

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
