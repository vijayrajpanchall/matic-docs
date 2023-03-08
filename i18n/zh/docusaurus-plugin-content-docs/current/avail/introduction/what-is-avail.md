---
id: what-is-avail
title: Polygon 的可拓展性区块链网络 Avail
sidebar_label: Introduction
description: 了解 Polygon 的数据可用性区块链
keywords:
  - docs
  - polygon
  - avail
  - availability
  - scale
  - rollup
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: what-is-avail
---

# Polygon 阿维尔 {#polygon-avail}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Avail 是一个以激光为重点的区块链，其主要内容是数据可用性：订购和记录区块链交易，并可以证明区块数据在没有下载整个区块的情况下可用。这使得它能够以单石块链无法使用的方式进行缩小。

:::info 稳健的通用可扩展数据可用性层

* 通过利用 Avail 来建立 Validium 以免链数据可用性，使 Layer-2 解决方案能够提供更大的可扩展性流通。

* 允许拥有任意执行环境的独立链或侧面链进行启动验证者安全，而无需通过保证交易数据可用来创建和管理自己的验证者集合。

:::

## 当前可用性和扩展挑战 {#current-availability-and-scaling-challenges}

### 什么是数据可用性问题？ {#what-is-the-data-availability-problem}

区块链网络中的对等点需要找到一种方法，确保新提案区块的所有数据都随时可用。如果数据不可用，则区块可能包含被区块生产者隐藏着的恶意交易。即便被隐藏的是区块中的非恶意交易，也可能会破坏系统的安全性。

### Avail 的数据可用性方法 {#avail-s-approach-to-data-availability}

#### 高度保证 {#high-guarantee}

Avail 提供可用数据的可证明的高水平保证。轻型客户端可以独立核查在不断的查询中可用性，而不下载整个区块。

#### 最低信任 {#minimum-trust}

无需成为验证者或托管完整节点。即使有轻型客户端，也可以获得可核查的可用性。

#### 易于使用 {#easy-to-use}

该解决方案使用修改后的 Substrate 构建，侧重于易用性，无论您是托管应用程序，还是运行链下扩展解决方案。

#### 链下扩展的理想之选 {#perfect-for-off-chain-scaling}

通过将数据留在我们这里并避免 L1 上的数据可用性问题，释放您的链下扩展解决方案的全部扩展潜力。

#### 执行 Agnostic {#execution-agnostic}

使用 Avail 的链条可以实施任何类型的执行环境，而不论应用逻辑如何。支持来自任何环境的交易： EVM、Wasm，甚至尚未建立的新 VM 交易。Avail 适合试验新的执行层。

#### 启用安全性 {#bootstrapping-security}

Avail 允许创建新的链，而无需填写新的验证者集合，并使用 Ploss 的工具。Avail 负责处理交易排序、共识和可用性，以换取简单交易费（gas）。

#### 利用 NPoS 快速证明最终确定性 {#fast-provable-finality-using-npos}

可通过提名权益证明，快速证明最终确定性。由 KZG 承诺和纠删码提供支持。

首先，在使用滚动来缩放以特里尔姆上检查此[博客帖子](https://blog.polygon.technology/polygon-research-ethereum-scaling-with-rollups-8a2c221bf644/)。

## Avail 支持的 Validiums {#avail-powered-validiums}

由于单石区块链的结构（如当前状态中的以太网），操作区块链很昂贵，因此交易费很高。卷宗试图通过在链上运行交易来提取执行负担，然后发布执行结果和[通常压缩]的交易数据。

Validium 下一步是：它不必发布交易数据，而是保留在链中，在链中仅发布证明/证明文件，而仅发布在基层上。这是迄今为止最具成本效益的解决方案，因为执行和数据可用性都保持在链上，同时仍允许在层1链上进行最后验证和解决。

Avail 是针对数据可用性优化的区块链。希望成为 validium的任何卷宗都可以转换为 validium 转换为 vail 交易数据，而不是在 1 层上发布交易数据，并部署验证合约，该合约除了验证正确的执行外，还验证数据可用性。

:::note 验证

Avail 团队将通过建立验证桥梁在以太坊上简便进行数据可用性验证，以便直接将数据可用性验证发布到以太坊上。这将使核查合约的工作变得简单，因为DA 验证已经在链上进行。该桥目前正在设计中，请联系 Avail 团队获取更多信息，或加入我们的早期访问程序。

:::

## 另见 {#see-also}

* [Polygon 推出 Avail — 稳健的通用可扩展数据可用性层](https://polygontech.medium.com/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
* [数据可用性问题](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
