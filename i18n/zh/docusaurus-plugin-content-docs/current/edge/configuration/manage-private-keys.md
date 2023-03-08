---
id: manage-private-keys
title: 管理私钥
description: "如何管理私钥和密钥的类型。"
keywords:
  - docs
  - polygon
  - edge
  - private
  - key
  - keystore
---

## 概述 {#overview}

Polygon Edge 可以直接管理两种类型的私钥：

* **用于共识机制的私钥**
* **libp2p 用于联网的私钥**
* **（可选）用于共识机制，以聚合验证者的签名的 BLS 私钥**

目前，Polygon Edge 不为账户管理提供支持。

基于[备份和恢复指南](/docs/edge/working-with-node/backup-restore)中概述的目录结构，Polygon Edge 将上述密钥文件存储在两个不同的目录中  - **共识**和**钥库**。

## 密钥格式 {#key-format}

私钥以简单的 **Base64 格式**存储，因此它们可以是人类可读和可移动的。

```bash
# Example private key
0802122068a1bdb1c8af5333e58fe586bc0e9fc7aff882da82affb678aef5d9a2b9100c0
```

:::info 密钥类型
Polygon Edge 中生成和使用的所有私钥文件都依赖使用曲线 [secp256k1](https://en.bitcoin.it/wiki/Secp256k1) 的 ECDSA。

由于曲线不是标准的，它无法编码和存储在任何标准的 PEM 格式中。不支持不符合密钥类型的密钥。
:::
## 共识私钥 {#consensus-private-key}

被提及为*共识私钥*的私钥文件也被称为**验证者私钥**。NODE 作为网络中的验证者并需要签名新数据时使用这一私钥。

私钥文件位于`consensus/validator.key`中，并遵循上述[密钥格式](/docs/edge/configuration/manage-private-keys#key-format)。

:::warning
验证者私钥对于每个验证者节点都是唯一的。相同的密钥<b>不会</b>在所有验证者中共享，因为这可能损害链的安全性。
:::

## 网络私钥 {#networking-private-key}

libp2p 使用网络中提及的私钥文件生成相应的 PeerID，并允许 NODE 参与网络。

它位于`keystore/libp2p.key`中，并遵循前面提到的[密钥格式](/docs/edge/configuration/manage-private-keys#key-format)。

## BLS 密钥 {#bls-secret-key}

BLS 密钥文件用于在共识层中聚集实施的封装。BLS 的聚集实施的密封的大小低于序列化实施的 ECDSA 签名。

BLS 特点是可选择，可能选择是否使用 BLS。有关更多详情，请参阅 [BLS](/docs/edge/consensus/bls)。

## 导入/导出 {#import-export}

由于密钥文件存储在磁盘上的简单的 Base64 中，因此可以轻松备份或导入它们。

:::caution 更改密钥文件
对已设置/正在运行的网络上的密钥文件进行的任何类型的更改都可能导致严重的网络/共识中断，由于共识和同行发现机制将从这些密钥中获取的数据存储在 NODE 特定的存储中，并依赖数据启动连接和执行共识逻辑
:::