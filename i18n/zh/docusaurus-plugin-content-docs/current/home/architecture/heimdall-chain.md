---
id: heimdall-chain
title: Heimdall 链是什么？
sidebar_label: Heimdall Chain
description: 在 Polygon 上构建您的下一个区块链应用程序。
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - checkpoint
  - pos
  - verifier
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Heimdall 链 {#heimdall-chain}

Heimdall 是 Polygon 的权益证明验证节点层，它负责将经过检查点验证的 Plasma 区块表示提交到我们架构中的主链上。我们已经通过在 Tendermint 共识引擎的基础上对签名方案和各种数据结构进行更改，实现了这一点。

主链质收主管理者合约与 Heimdall 节点共同运作，作为 PoS 引擎的无信任股权管理机制，包括选择验证者集合、更新验证者等。由于质押实际上是在以太坊智能合约上完成，我们不仅依赖验证者诚实，而且继承此关键部分的以太场所链链安全性。

Heimdall 层负责将 Bor 生成的区块聚合到 Merkle 树中，并定期将 Merkle 根发布到根链。该定期发布称为**“检查点”。**对于 Bor 上的每几个区块，都会由一个 Heimdall 层上的验证者：

1. 验证自上一个检查点以来的所有区块
2. 创建区块哈希的 merkle 树
3. 将 merkle 根发布到主链

检查点非常重要，原因有二：

1. 在根链上提供最终性
2. 提供提现资产时的烧毁证明

从全局来看，这一过程可理解为：

- 从池中选择一个活跃验证人子集作为一个 span 的区块生产者。每个 span 的选择还需经过不少于三分之二的投票人的同意。这些区块制作者负责创建区块，并将它们转播到剩余网络。
- 检查点包含在任何给定时间间隔内创建的所有区块的根。所有节点都验证了相同的验证，并附上其签名。
- 来自验证者集合的选定提议者负责收集特定检查点的所有签名，并在主链上进行相同的操作。
- 创建区块和提案检查点的责任取决于验证者在整个池中权益占比。