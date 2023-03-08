---
id: bor-chain
title: Bor 链
description: Polygon 网络区块生产者
keywords:
  - docs
  - polygon
  - matic
  - bor
  - bor chain
  - go ethereum
  - block producer
slug: bor-chain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Bor 节点（即区块生产者实现）基本上是侧链的操作者。

侧链 VM 与 EVM 兼容。目前，Bor 是一个基本的 Geth 实现，并对共识算法进行了自定义更改。

区块生产者从[验证者](/docs/maintain/glossary.md#validator)中选出，使用历史以太坊区块哈希进行重组。

另请参见 [Bor 架构](/docs/pos/bor/overview)。
