---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "提供与 ERC20 代币交互的方法。"
---

# ERC20 {#erc20}

`POSClient`提供`erc20`方法来帮助您与 **ERC20** 代币交互。

该方法返回一个具有其他各种方法的对象。

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

为 `isRoot` 传递第二个参数是可选的。

## 子代币 {#child-token}

Polygon 上的代币可通过此语法启动。

```
const childERC20Token = posClient.erc20(<child token address>);
```

## 父代币 {#parent-token}

可以通过将第二个参数值设置为 `true` 来启动以太坊上的代币。

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
