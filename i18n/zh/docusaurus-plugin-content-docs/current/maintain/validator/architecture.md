---
id: architecture
title: 架构
description: Ethereum、Heimdall 和 Bor 层
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon 网络大致分为三层：

* 以太**坊层**——在以太坊主网上的一组合合约。
* **Heimdall** 层——在以太坊主网平行运行的一组验证点，监测部署在以太坊主网上的一组质押合约，并将 Polygon 网络检查点转交到以太坊主网上。Heimdall 基于 Tendermint。
* **Bor** 层——由 Heimdall 节点控制的一组产生区块的 Bor 节点。BOR 节点基于 Go 以太坊。

<img src={useBaseUrl("img/staking/architecture.png")} />

## 以太坊上的质押和 Plasma 智能合同 {#staking-and-plasma-smart-contracts-on-ethereum}

为了在 Polygon 上实现[权益证明 (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) 机制，该系统在以太坊主网上采用了一套[质押](/docs/maintain/glossary.md#staking)管理合同。

质押合约实现以下功能：

* 任何人都可以在以太坊主网上的质押合约上质押 MATIC 代币，并作为[验证者](/docs/maintain/glossary.md#validator)加入系统。
* 验证 Polygon 网络上的状态转换，即可赚取质押奖励。
* 在以太坊主网上保存[检查点](/docs/maintain/glossary.md#checkpoint-transaction)。

权益证明 (PoS) 机制还可以缓解 Polygon 侧链的数据不可用问题。

## Heimdall（验证层） {#heimdall-validation-layer}

Heimdall 层负责将 [Bor](/docs/maintain/glossary.md#bor) 生成的区块聚合到 Merkle 树中，并定期将 Merkle 根发布到根链。Bor 侧链快照的定期发布称为[检查点](/docs/maintain/glossary.md#checkpoint-transaction)。

对于 Bor 上的每几个区块，Heimdall 层上的验证器：

1. 验证自上一个检查点以来的所有区块。
2. 创建区块哈希的 Merkle 树。
3. 将 Merkle 根哈希发布到以太坊主网。

检查点非常重要，原因有二：

1. 在根链上提供最终性。
2. 资产提现时，提供销毁证明。

流程概述：

* 从池中选择一小部分活跃的验证者，当作一个[跨度](/docs/maintain/glossary.md#span)的[区块生产者](/docs/maintain/glossary.md#block-producer)。这些区块生产者负责创建区块并将创建的区块广播至网络。
* 检查点包括在任意给定时间间隔内创建的所有区块的 Merkle 根哈希。所有节点都验证 Merkle 根哈希，并对其附上签名。
* 从验证者集合中选出的[提案者](/docs/maintain/glossary.md#proposer)负责收集某个特定检查点的所有签名，并在以太坊主网上提交该检查点。
* 创建区块和提案检查点的责任取决于验证人在整个池中权益占比。

另请参见 [Heimdall 架构](/docs/pos/heimdall/overview)。

## Bor（区块生产者层） {#bor-block-producer-layer}

Bor 是 Polygon 侧链的区块生产者 — 负责将交易汇总成区块的实体。

BOR 区块生产者是验证者的一个子集，由 [Heimdall](/docs/maintain/glossary.md#heimdall) 验证者定期混洗。

另请参见 [Bor 架构](/docs/pos/bor/overview)。
