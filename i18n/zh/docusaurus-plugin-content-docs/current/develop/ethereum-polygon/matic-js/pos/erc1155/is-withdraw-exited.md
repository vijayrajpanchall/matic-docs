---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: '检查是否已退出提取。'
---

`isWithdrawExited` 方法用来检查是否已退出提取。它将返回布尔值。

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
