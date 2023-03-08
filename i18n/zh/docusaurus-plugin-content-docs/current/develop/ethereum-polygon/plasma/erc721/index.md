---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'Maticjs 快速入门'
---

# ERC721 {#erc721}

`plasmaClient` 提供 `erc721` 方法来帮助您与 ERC721 代币交互。

该方法返回拥有不同方法的对象。

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## 子代币 {#child-token}

Polygon 上的代币可通过此语法启动。

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## 父代币 {#parent-token}

以太坊上的代币可通过将第二参数值设置为 `true` 的方式发起。

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
