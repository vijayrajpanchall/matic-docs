---
id: bor-chain
title: BoR 链是什么？
sidebar_label: Bor Chain
description: Polygon  PoS 流入点或 Sidechain  VM 导言
keywords:
  - docs
  - matic
  - polygon
  - bor chain
  - sidechain VM
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bor 链 {#bor-chain}

Bor 节点（或称区块生产者实施）基本上是侧链链操作者。侧链 VM 与 EVM 兼容。目前，它是一个基本的 Geth 实施，并对共识算法做了自定义更改。不过，它将从头开始打造，以便达到既轻量又专用的目的。

出于同样的目的，从验证者集合中选出区块生产者，然后使用历史以太坊区块哈希打乱生产者。不过，我们正在探索如何在这一挑选过程中产生随机性。