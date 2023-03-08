---
id: what-is-polygon
title: Polygon是什么？
description: 了解 Polygon 缩放解决方案
keywords:
  - docs
  - matic
  - polygon
  - blockchain
  - ethereum scaling
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Polygon](https://polygon.technology/)是一个Layer 2扩展解决方案，利用进行链下计算的侧链和权益质押（PoS）验证者的去中心化网络实现扩容。

Polygon致力于解决扩容性和可用性的问题，同时保证去中心化，并利用现存的开发者社区和生态系统。它旨在改进现有平台，向dApps和用户功能提供可扩展性和优越用户体验。

它是公有区块链的扩容解决方案。Polygon PoS支持现存以太坊工具，并提供更快速、成本更低的交易。

## 关键功能和亮点 {#key-features-highlights}

- **可 **：Polygon侧链上快速、低成本和安全的交易，在主链上实现最终性，将以太坊作为第一个兼容的Layer 1基础链。
- **高吞吐量**：在内部的测试网上在单条侧链上实现10,000 TPS；多个链可用于横向扩展。
- **用户体验**：顺畅地从主链上将UX和开发者移至Polygon的链；带有WalletConnect支持的原生移动式应用程序和SDK。
- **安全性**：Polygon链的操作者本身就是权益证明 (PoS)系统中的质押者。
- **公有侧链**：Polygon侧链本质上是公有的（vs.单独的去中心化应用程序链）、无需许可、可支持多个协议。

由EVM支持的Polygon系统有意设计成支持Polygon侧链上的任意状态转变。

## 授权者和验证者的角色 {#delegator-and-validator-roles}

您可以作为授权者或验证者参与Polygon网络。请参阅：

* [谁是验证者](/docs/maintain/polygon-basics/who-is-validator)
* [谁是授权者 ](/docs/maintain/polygon-basics/who-is-delegator)

## 架构 {#architecture}

如果您的目标是成为验证者，那么您必须先理解Polygon架构。

查看[Polygon架构](/docs/maintain/validator/architecture)，了解更多信息。

### 组件 {#components}

要深入了解Polygon架构，请查看更多核心构成：

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [合约](/docs/pos/contracts/stakingmanager)

#### Codebase {#codebases}

要深入了解核心组件，请参阅以下Codebase：

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [合约](https://github.com/maticnetwork/contracts)

## 方式 {#how-tos}

### 节点设置 {#node-setup}

如果您想要在 Polygon 主网或 Mumbai 测试网上运行完整节点，您可以跟踪此次测试[运行验证者节点](/maintain/validate/run-validator.md)指南。

### 质押操作 {#staking-operations}

查看验证者和授权者的质押方式：

* [验证者质押操作](docs/maintain/validate/validator-staking-operations)
* [授权](/docs/maintain/delegate/delegate)
