---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: '使用 matic.js 与 ERC1155 代币交互。'
---

# ERC1155 {#erc1155}

`POSClient` 提供 `erc1155` 方法来帮助您与 ERC1155 代币交互。

 方法返回包含不同方法的 **ERC1155** 类的实例。

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

为 `isRoot` 传递第二个参数是可选的。

## 子代币 {#child-token}

Polygon 上的代币可通过此语法启动。

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## 父代币 {#parent-token}

以太坊上的代币可通过将第二参数值设置为 `true` 的方式发起。

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
