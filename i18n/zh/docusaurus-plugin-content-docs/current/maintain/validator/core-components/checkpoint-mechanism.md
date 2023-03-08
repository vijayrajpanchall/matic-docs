---
id: checkpoint-mechanism
title: 检查点机制
sidebar_label: Checkpoints
description: 检查将系统状态指向以太坊主网
keywords:
  - docs
  - matic
  - polygon
  - checkpoint
  - ethereum
  - mainnet
slug: checkpoint-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::info Polygon 不是 Layer 1 平台

Polygon 依赖于以太机网作为其层1 结算层的处理层。所有质押机制都需要与以太坊主网上的合约同步。

:::

检查点的[提案](/docs/maintain/glossary.md#proposer)者最初通过 [Tendermint 加权圆圈规则](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html)选定。基于检查点提交成功，实施进一步的自定义检查。这使得 Polygon 系统与 Tendermint 提议者的选择脱钩，并为 Polygon 提供了以下功能：如只在以太坊主网上的检查点交易成功时选择提议者，或为属于以前失败的检查点的区块提交检查点交易。

在 Tendermint 上成功提交检查点是一个分两个阶段的提交过程：

* 通过轮循算法选择的提议者发送一个检查点，其中包含提议者的地址和提议者字段中的 Merkle 散列。
* 所有其他提议者在其状态中添加 Merkle 哈希之前验证提议者字段中的数据。

然后下一个提议者发送一个确认交易，以证明前一个[检查点交易](/docs/maintain/glossary.md#checkpoint-transaction)在以太坊主网上成功。每一个验证者集的变化都由验证者节点转发到 Heimdall 上，而 [Heimdall](/docs/maintain/glossary.md#heimdall) 则被嵌入到验证者节点上。这使得 Heimdall 在任何时候都能与以太坊主网上的 Polygon 合约状态保持同步。

部署在以太坊主网上的 Polygon 合约被认为是真理的最终来源，因此所有验证都是通过查询以太坊主网合约完成的。
