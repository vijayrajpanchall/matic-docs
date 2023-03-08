---
id: permission-contract-deployment
title: 权限智能合约部署
description: 如何添加权限智能合约部署。
keywords:
  - docs
  - polygon
  - edge
  - smart contract
  - permission
  - deployment
---

## 概述 {#overview}

本指南详细说明了将部署智能合约的地址列入白名单的方法。网络运营商有时希望阻止用户部署与网络目的无关的智能合约。网络运营者可以：

1. 智能合约部署的白名单地址
2. 从智能合约部署的白名单中删除地址

## 视频演示 {#video-presentation}

[![许可合约部署 - 视频](https://img.youtube.com/vi/yPOkINpf7hg/0.jpg)](https://www.youtube.com/watch?v=yPOkINpf7hg)

## 如何使用它？ {#how-to-use-it}


您可以在 [CLI 命令](/docs/edge/get-started/cli-commands#whitelist-commands)页面中找到与部署白名单相关的所有 cli 命令。

* `whitelist show`：显示白名单信息
* `whitelist deployment --add`：将新地址添加到合约部署白名单中
* `whitelist deployment --remove`：从合约部署白名单中删除新地址

#### 在部署白名单中显示所有地址 {#show-all-addresses-in-the-deployment-whitelist}

有两种方法可以从部署白名单中找到地址。
1. 查看保存白名单的位置`genesis.json`。
2. 执行`whitelist show`，它打印由 Polygon Edge 支持的所有白名单的信息

```bash

./polygon-edge whitelist show

[WHITELISTS]

Contract deployment whitelist : [0x5383Cb489FaCa92365Bb6f9f1FB40bD032E6365d],


```

#### 将地址添加到部署白名单中。 {#add-an-address-to-the-deployment-whitelist}

要将新地址添加到部署白名单中，请执行 `whitelist deployment --add [ADDRESS]`CLI 命令。白名单中存在的地址数量没有限制。只有合约部署白名单中存在的地址可以部署合约。如果白名单是空的，则任何地址都可以执行部署。

```bash

./polygon-edge whitelist deployment --add 0x5383Cb489FaCa92365Bb6f9f1FB40bD032E6365d --add 0x30ea4435167Ee91f9f874b5a894F3282A956C3FF


[CONTRACT DEPLOYMENT WHITELIST]

Added addresses: [0x5383Cb489FaCa92365Bb6f9f1FB40bD032E6365d 0x30ea4435167Ee91f9f874b5a894F3282A956C3FF],
Contract deployment whitelist : [0x5383Cb489FaCa92365Bb6f9f1FB40bD032E6365d 0x30ea4435167Ee91f9f874b5a894F3282A956C3FF],



```

#### 从部署白名单中删除地址。 {#remove-an-address-from-the-deployment-whitelist}

要删除部署白名单中的地址，请执行 `whitelist deployment --remove [ADDRESS]`CLI 命令。只有合约部署白名单中存在的地址可以部署合约。如果白名单是空的，则任何地址都可以执行部署。

```bash

./polygon-edge whitelist deployment --remove 0x5383Cb489FaCa92365Bb6f9f1FB40bD032E6365d --remove 0x30ea4435167Ee91f9f874b5a894F3282A956C3FF


[CONTRACT DEPLOYMENT WHITELIST]

Removed addresses: [0x5383Cb489FaCa92365Bb6f9f1FB40bD032E6365d 0x30ea4435167Ee91f9f874b5a894F3282A956C3FF],
Contract deployment whitelist : [],



```
