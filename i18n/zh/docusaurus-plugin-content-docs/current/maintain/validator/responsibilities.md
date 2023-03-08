---
id: responsibilities
title: 责任
description: 在 Polygon 网络上担任验证者的责任
keywords:
  - docs
  - matic
  - polygon
  - validate
  - validator
  - responsibilities
slug: responsibilities
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip 掌握最新信息

通过订阅 [Polygon 通知组](https://polygon.technology/notifications/)，跟上 Polygon 团队和社区的最新节点和验证者更新。

:::

区块链验证者是负责验证区块链内交易的人。在 Polygon 网络上，任何参与者都可以通过运行**验证者节点（Sentry + 验证者）**来获得奖励和收取交易费来获得资格。为确保验证者积极参与，他们将生态系统的质押金额锁定为至少 1 个 MATIC 代币。

:::info

目前，一次性有100个有效验证者。有关验证者所在的详细说明，请参见 [Validator](/maintain/validator/architecture)。

另外，在实施 [<ins>PIP4 治理提案</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956)后，最小的固定金额将增加到 10,000 MATIC。

:::

Polygon 网络上的任意[验证者](/maintain/glossary.md#validator)均有以下职责：

* 技术节点操作（由节点自动完成）
* 操作
  * 保持长时间正常运行
  * 检查与节点有关的服务和处理
  * 运行节点监测
  * 在签名者地址上保持 ETH 平衡（在 0.5 至 1 之间）
* 授权
  * 向授权开放
  * 沟通佣金率
* 沟通
  * 沟通问题
  * 提供反馈和建议
* 为在区块链上验证区块获得质疑奖励

## 技术节点操作 {#technical-node-operations}

以下技术节点**操作由节点自动完成：**

* 区块生产者选择：
  * 为每个[跨度](/docs/maintain/glossary.md#span)的区块生产者集选择一个验证者子集
  * 对于每个跨度，在 [Heimdall](/maintain/glossary.md#heimdall) 上再次选择区块生产者集，并将选择信息定期传送给 [Bor](/maintain/glossary.md#bor)。
* 验证 Bor 区块：
  * 对于一组 Bor 侧链区块，每个验证者独立读取这些区块的区块数据并在 Heimdall 上验证数据。
* 检查点提交：
  * 在每个 Heimdall 区块的验证者中选择一个[提议者](/maintain/glossary.md#proposer)。[检查点](/maintain/glossary.md#checkpoint-transaction)提议者创建 Bor 区块数据的检查点，进行验证，并广播签名交易，供其他验证者同意。
  * 如果超过 2/3 的活跃验证者对检查点达成共识，检查点就会被提交给以太坊主网。
* 同步以太坊上的 Polygon 质押合约变更：
  * 从检查点提交步骤继续，由于这是外部网络调用，以太坊上的检查点交易可能得到确认，也可能不被确认，也可能由于以太坊拥堵问题而挂起。
  * 在这种情况下，需要遵循一个`ack/no-ack`流程，以确保下一个检查点也包含前一个 Bor 数据块的快照。例如，如果检查点 1 用于 Bor 区块 1-256，并且由于某种原因发生故障，则下一个检查点 2 将用于 Bor 区块 1-512。另请参阅 [Heimdall 架构：检查点](/pos/heimdall/checkpoint)。
* 从 Ethereum 主网到 Bor 侧链的状态同步：
  * 合约状态可以在以太坊和 Polygon 之间移动，特别是通过 [Bor](/maintain/glossary.md#bor)：
  * 以太坊上的 DApp 合约在以太坊上的特殊 Polygon 合约上调用函数。
  * 相应的事件被转播给 Heimdall，然后转播给 Bor。
  * 状态同步交易在 Polygon 智能合约上被调用，DApp 可以通过 Bor 本身的函数调用获得 Bor 上的值。
  * 从 Polygon 向以太坊发送状态也有类似的机制。另请参阅[《状态同步机制》](/docs/pos/state-sync/state-sync)。

## 操作 {#operations}

### 保持长时间正常运行 {#maintain-high-uptime}

Polygon 网络上的节点正常运行时间是基于验证者节点签署的[检查点交易](/docs/maintain/glossary.md#checkpoint-transaction)的数量。

大约每 34 分钟就有一个提议者向以太坊主网提交一个检查点交易。检查点交易必须由 Polygon 网络上的每个[验证者](/maintain/glossary.md#validator)签名。**未能签署检查点超越会导致验证者节点性能减少。**

签署检查点交易为自动化过程。为了确保您的验证者节点签署所有有效的检查点交易，必须维护和监控你的节点运行。

### 每日检查节点服务和进程 {#check-node-services-and-processes-daily}

您必须每天检查与 [Heimdall](/maintain/glossary.md#heimdall) and [Bor](/maintain/glossary.md#bor) 有关的服务和流程。此外，还应定期进行节点打开，以减少磁盘使用。

### 运行节点监测 {#run-node-monitoring}

必须运行其中之一：

* Grafana 仪表板由 Polygon 提供。见 GitHub 存储库：[Matic-Jagar 设](https://github.com/vitwit/matic-jagar)置
* 或者，使用您自己的监测工具，用于[验证者](/maintain/glossary.md#validator)和[哨兵](/maintain/glossary.md#sentry)节点
* 应监测在节点上使用的以太机端点，以确保节点在请求限度内

### 保持以太币余额 {#keep-an-eth-balance}

您必须在以太坊主网上验证者[签名者地址](/maintain/glossary.md#signer-address)上保持足够数量的 ETH（应始终围绕阈值，即0.5至1）。

您需要以太币，以：

* 在以太坊主网上签署拟议的[检查点交易](/maintain/glossary.md#checkpoint-transaction)。
* 在以太坊主网上提出并发送检查点交易。

在签名者地址上没有保持足够数量的以太币将导致：

* 延迟检查点提交。请注意，以太坊网络上的交易 gas 价格可能会出现波动和飙升。
* 列入检查点交易的最终结果出现延迟。
* 延迟后续检查点交易。

## 授权 {#delegation}

### 开放授权 {#be-open-for-delegation}

所有验证者必须向社区的授权开放。每个验证者都可以选择设置自己的佣金率。佣金率没有上限。

### 沟通佣金率 {#communicate-commission-rates}

验证者有道德责任向社区通报佣金率和佣金率变动。沟通佣金率的首选平台：

* [Discord](https://discord.com/invite/0xPolygon)
* [论坛](https://forum.polygon.technology/)

## 沟通 {#communication}

### 沟通问题 {#communicate-issues}

尽早传达问题确保社区和 Polygon 团队能够尽快纠正问题。沟通佣金率的首选平台：

* [Discord](https://discord.com/invite/0xPolygon)
* [论坛](https://forum.polygon.technology/)
* [GitHub](https://github.com/maticnetwork)

### 提供反馈和建议 {#provide-feedback-and-suggestions}

在 Polygon 上，我们重视您对验证者生态系统任何方面提出的反馈和建议。[论坛](https://forum.polygon.technology/)是提交反馈和建议的首选平台。
