---
id: index
title: POSClient
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: '`ERC721` 方法可帮助您与 ERC721 代币交互。'
---

# ERC721 {#erc721}

`POSClient` 提供 `erc721` 方法来帮助您与 ERC721 代币交互。

该方法返回拥有不同方法的对象。

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

对于`isRoot` 传递第二个参数是可选的。

## 子代币 {#child-token}

Polygon 上的代币可通过此语法启动。

```
const childERC20Token = posClient.erc721(<child token address>);
```

## 父代币 {#parent-token}

以太坊上的代币可通过将第二参数值设置为 `true` 的方式发起。

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
