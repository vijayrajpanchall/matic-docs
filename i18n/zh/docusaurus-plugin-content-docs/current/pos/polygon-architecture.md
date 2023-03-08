---
id: polygon-architecture
title: Polygon 架构
description: Polygon 架构
keywords:
  - architecture
  - layers
  - polygon
  - matic
  - docs
  - research
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Polygon 架构 {#the-architecture-of-polygon}

**Polygon** 是一个区块链应用平台，提供混合验证验收和基于 Plasma 的侧链应用程序。

就架构而言，Polygon 的优秀之处在于其精致的设计，具有通用的验证层，独立于各种执行环境，如 Plasma 支持的链、成熟的 EVM 侧链，以及未来的其他 L2 方法，如乐观汇总。

Polygon PoS 网络拥有三层架构：

* 以太**坊层**——在以太坊主网上的一组合合约。
* **Heimdall** 层——一组与以太坊主网平行运行并行的一组验证点，监测部署在以太坊主网上的一组固定合约，并将 Polygon 网络检查点交给以太坊主网上。Heimdall 基于 Tendermint。
* **Bor** 层——由 Heimdall 节点控制的一组产生区块的 Bor 节点。BOR 基于 Go Ethereum。

<img src={useBaseUrl("img/staking/architecture.png")} />

当前，开发者可将 **Plasma** 用于已写入 Plasma Predicates 的特定状态
转换，如 ERC20、ERC721、资产交换或其他自定义 Predicates。对于任意状态转换，可使用权益证明 (PoS)。或二者皆可！Polygon 的混合结构使其成为可能。

如需在我们的平台上启用 PoS 机制，则必须在以太坊上部署一组**质押**管理
合约，以及一组运行 **Heimdall** 和 **BOR** 节点的激励验证者。以太坊是Polygon 支持的首个基础链，但 Polygon 计划支持其他基础链，以便于在社区建议和共识的基础上启用可互操作的去中心化 L2 区块链平台。

<img src={useBaseUrl("img/matic/Architecture.png")} />

## 质押合约 {#staking-contracts}

为了启用 Polygon 上的[权益证明 (PoS)](docs/home/polygon-basics/what-is-proof-of-stake) 机制，
系统需要在以太坊主网上部署一组[质押](/docs/maintain/glossary#staking)管理合约。

质押合约实施以下功能：

* 人人可以在以太坊主网上的质押合约中质押 Matic 代币，并以[验证者](/docs/maintain/glossary#validator)身份加入系统。
* 验证 Polygon 网络上的状态转换，即可赚取质押奖励。
* 在以太坊主网上保存[检查点](/docs/maintain/glossary#checkpoint-transaction)。

权益证明 (PoS) 机制还可以缓解 Polygon 侧链的数据不可用问题。

## Heimdall {#heimdall}

Heimdall 是权益证明验证层，负责将 [BOR](/docs/maintain/glossary#bor) 产生的区块聚合到 Merkle 树，并定期将 Merkle 根发布到
根链。BOR 侧链快照的定期发布称为[检查点](/docs/maintain/glossary#checkpoint-transaction)。

1. 验证自上一个检查点以来的所有区块。
2. 创建区块哈希的 Merkle 树。
3. 将 Merkle 根哈希发布到以太坊主网。

检查点非常重要，原因有二：

1. 在根链上提供最终性。
2. 资产提现时，提供销毁证明。

流程概述：

* 从池中选择一小部分活跃的验证者，当作一个[跨度](/docs/maintain/glossary#span)的[区块生产者](/docs/maintain/glossary#block-producer)。这些区块生产者负责创建区块并将创建的区块广播至网络。
* 检查点包括在任意给定时间间隔内创建的所有区块的 Merkle 根哈希。所有节点都验证 Merkle 根哈希，并对其附上签名。
* 从验证者集合中选出的[提案者](/docs/maintain/glossary#proposer)负责收集某个特定检查点的所有签名，并在以太坊主网上提交该检查点。
* 创建区块和提出检查点的责任取决于验证者在整个池中的权益占比。

有关 Heimdall 的更多详情，请访问 [Heimdall 架构](/docs/pos/heimdall/overview)指南。

## Bor {#bor}

Bor 是一个 Polygon 侧链链生产者层，负责将交易汇集成区块的实体。目前，它是一个基本的 Geth 实施，并对共识算法做了自定义更改。

区块生产者是验证者的一个子网，通过委员会在 [Heimdall](/docs/maintain/glossary#heimdall) 上选择来定期进行分散，被称为 期内进行选择在 Polygon 中称为 `span`。区块在 **BOR** 节点上产生，并且侧链 VM 兼容 EVM。
BOR 上产生的区块也由 Heimdall 节点定期验证，而且BOR 上一组区块的 Merkle 树哈希组成的检查点将定期提交至以太坊。

有关更多详情，请参见 [BOR 架构](/docs/pos/bor/overview)指南。

## 资源 {#resources}

* [BOR 架构](https://wiki.polygon.technology/docs/pos/bor)
* [Heimdall 架构](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
* [检查点机制](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
