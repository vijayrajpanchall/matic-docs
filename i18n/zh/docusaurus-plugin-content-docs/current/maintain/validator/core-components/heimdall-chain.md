---
id: heimdall-chain
title: Heimdall 链
description: Polygon 网络上进行质疑验证的层
keywords:
  - docs
  - polygon
  - matic
  - heimdall
  - chain
  - verifier
  - layer
  - proof of stake
slug: heimdall-chain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Heimdall 是一个验证权益层，负责[检查](/docs/maintain/glossary.md#checkpoint-transaction) Plasma 区块的表示到以太网上。Heimdall 基于 [Tendermint](https://tendermint.com/)。

以太坊主网上的质押合约与 Heimdall 节点一起工作，作为权益证明 (PoS) 引擎的无信任权益管理机制，包括选择[验证者](/docs/maintain/glossary.md#validator)集，更新验证者等。由于质押是在以太坊主网上的合约中完成的，所以 Polygon 并不只依赖验证者的诚信，而是继承了以太坊主网的安全性。

Heimdall 层负责将 [Bor](/docs/maintain/glossary.md#bor) 生成的区块聚合到 Merkle 树中，并定期将 Merkle 根发布到以太坊主网。这种定期发布被称为*检查点*。

对于 Bor 上的每几个区块，都会由一个 Heimdall 层上的验证者：

1. 验证自上一个检查点以来的所有区块。
2. 创建区块哈希的 Merkle 树。
3. 将 Merkle 根哈希发布到以太坊主网。

检查点非常重要，原因有二：

1. 在根链上提供最终性。
2. 资产提现时，提供销毁证明。

流程概述：

* 从池中选择一部分活跃的验证者作为一个[跨度](/docs/maintain/glossary.md#block-producer)的[区块生产者](/docs/maintain/glossary.md#span)。区块生产者负责创建区块并将创建的区块传播到网络。
* 检查点包括在任何给定时间间隔内创建的所有区块的 Merkle 根哈希。所有节点都验证 Merkle 根哈希，并对其附上签名。
* 从验证者集合中选出的[提案者](/docs/maintain/glossary.md#proposer)负责收集某个特定检查点的所有签名，并在以太坊主网上提交该检查点。
* 创建区块和提案检查点的责任取决于验证人在整个池中权益占比。

另请参见 [Heimdall 架构](/docs/pos/heimdall/overview)。
