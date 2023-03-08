---
id: overview
title: 概述
description: ChainBridge 概述
keywords:
  - docs
  - polygon
  - edge
  - Bridge
---

## 什么是 ChainBridge？ {#what-is-chainbridge}

ChainBridge 是模块化多向区块链桥接，支持由 ChainSafe 创建的与 EVM 和 Substrate 兼容的链。它允许用户在两个不同的链之间传输各种资产或消息。

如需了解有关 ChainBridge 的更多信息，请首先访问开发者提供的[官方文档](https://chainbridge.chainsafe.io/)。

本指南旨在帮助 Chainbridge 与 Polygon Edge 集成。它介绍运行的 polygon PoS（Mumbai 测试网）和本地 Polygon Edge 网络之间的桥接设置。

## 要求 {#requirements}

在本指南中，您将运行 Polygon Edge 节点、ChainBridge 中继器（[此处](/docs/edge/additional-features/chainbridge/definitions)有关它的更多信息）和 cb-sol-cli 工具，这是部署合约、注册资源和更改桥接设置的的 CLI 工具（您也可以查看此[工具](https://chainbridge.chainsafe.io/cli-options/#cli-options)）。在设置之前，需要以下环境：

* Go: >= 1.17
* Node.js >= 16.13.0
* Git


此外，您需要使用版本克隆以下存储库来运行一些应用程序。

* [Polygon Edge](https://github.com/0xPolygon/polygon-edge)：在`develop`分支上
* [ChainBridge](https://github.com/ChainSafe/ChainBridge)：v1.1.5
* [ChainBridge 部署工具](https://github.com/ChainSafe/chainbridge-deploy)： `f2aa093`在`main`分支上


您必须在进入下节之前设置 Polygon Edge 网络。欲了解更多详情，请查看[本地设置](/docs/edge/get-started/set-up-ibft-locally)或[云设置](/docs/edge/get-started/set-up-ibft-on-the-cloud)。