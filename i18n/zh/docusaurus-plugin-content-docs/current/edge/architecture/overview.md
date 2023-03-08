---
id: overview
title: 架构概述
sidebar_label: Overview
description: 介绍 Polygon Edge 的架构。
keywords:
  - docs
  - polygon
  - edge
  - architecture
  - modular
  - layer
  - libp2p
  - extensible
---

我们建立软件之初的想法是*模块化*。

这一点出现在 Polygon Edge 几乎所有的部分。您会在下文看到构件架构及其分层的概述。

## Polygon Edge 分层 {#polygon-edge-layering}

![Polygon Edge 架构](/img/edge/Architecture.jpg)

## Libp2p {#libp2p}

所有都从利用 **libp2p** 的基础网络层开始。我们决定使用这种技术，因为它适应 Polygon Edge 的设计哲学。Libp2p 是：

- 模块化
- 可扩展
- 快速

最重要的而是，它为更加高级的功能奠定了扎实的基础，我们之后会进行讨论。


## 同步和共识 {#synchronization-consensus}
同步和共识协议的分离允许了**自定义**同步和共识机制的模块化和实施 - 取决于客户如何运行。

Polygon Edge 的设计提供现成的可插拔共识算法。

支持共识算法的当前列表：

* IBFT PoA
* IBFT 权益证明 (PoS)

## 区块链 {#blockchain}
区块链层是协调 Polygon Edge 系统的中心层。深入涵盖了相应的*模块*节。

## 状态 {#state}
状态的内部层包含状态转换逻辑。它处理了包含新区块时状态的更改。深入涵盖了相应的*模块*节。

## JSON RPC {#json-rpc}
JSON RPC 层是去中心化应用程序开发人员用于和区块链互动的 API 层。深入涵盖了相应的*模块*节。

## TxPool {#txpool}
TxPool 层代表了交易池，可与系统中其他的模块紧密相连，因为交易可从多个入口点添加。

## grpc {#grpc}
gRPC（google Reter程序调用）是Google最初创建的强大的开放源码RPC框架，用于建立可扩展和快速的API。GRPC 层对于运营者交互非常关键。通过它，节点运营者可以轻松地于客户交互，提供合适的 UX。
