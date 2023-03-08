---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'Maticjs 快速入门'
---

# ERC20 {#erc20}

`plasmaClient` 提供 `erc20` 方法来帮助您与 ERC20 代币交互。

## 子代币 {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## 根代币 {#root-token}

根代币可通过将第二参数值设置为 `true` 的方式发起。

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
