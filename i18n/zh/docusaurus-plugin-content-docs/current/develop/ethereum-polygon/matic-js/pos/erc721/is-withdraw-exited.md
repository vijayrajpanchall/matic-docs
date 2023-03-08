---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: '检查是否已退出提取。'
---

`isWithdrawExited` 方法用来检查是否已退出提取。它将返回布尔值。

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
