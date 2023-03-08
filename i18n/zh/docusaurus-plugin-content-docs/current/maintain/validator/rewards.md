---
id: rewards
title: 奖励
sidebar_label: Rewards
description: 了解 Polygon 网络质押激励。
keywords:
  - docs
  - matic
  - polygon
  - rewards
  - staking
  - incentives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

有关 Polygon 介绍和质证算法，请参见[什么是质证证据 of 质证](/docs/home/polygon-basics/what-is-proof-of-stake)

在 Polygon，验证者将其 MATIC 代币作为抵押，以维护网络安全，并且作为其服务的交换，获得奖励。

为了利用 Polygon 的经济性，您应该成为一名验证者或授权者。

要成为[验证者](/docs/maintain/glossary.md#validator)，需要**运行一个完整的验证者**节点并且质押 MATIC。参阅[验证](/docs/maintain/validate/validator-index)。

还检查[“验证者责任”](/docs/maintain/validate/validator-responsibilities)页面。

要成为[授权者](/docs/maintain/glossary.md#delegator)，只需要将 **MATIC 委托给一名验证者**。请参见[“授权”](/docs/maintain/delegate/delegate)。

## 什么是激励？ {#what-is-the-incentive}

Polygon 将其 100 亿代币总供应量的 12% 用于资助质押奖励。这是为了确保网络有足够的种子，直到交易费用获得牵引力。这些奖励主要是为了启动网络，而从长远来看，该协议的目的是在交易费的基础上维持自身的可持续性。

**验证者奖励=质押奖励+交易费用**

这种分配方式是为了确保逐步将质押奖励与验证者奖励的主要部分脱钩。

| 年度 | 目标权益（循环供应量的 30%） | 30% 的绑定奖励率 | 奖励池 |
|---|---|---|---|
| 第一 | 1,977,909,431 | 20% | 312,917,369 |
| 第二 | 2,556,580,023 | 12% | 275,625,675 |
| 第三 | 2,890,642,855 | 9% | 246,933,140 |
| 第四 | 2,951,934,048 | 7% | 204,303,976 |
| 第五 | 2,996,518,749 | 5% | 148,615,670+**11,604,170** |

以下是前 5 年预期年回报的快照样本，考虑到按 5% 的间隔分配 5% 至 40% 的质押供应

| 循环质押供应量的百分比 | 5% | 10% | 15% | 20% | 25% | 30% | 35% | 40% |
|---|---|---|---|---|---|---|---|---|
| 年度奖励 |
| 第一 | 120% | 60% | 40% | 30% | 24% | 20% | 17.14% | 15% |
| 第二 | 72% | 36% | 24% | 18% | 14.4% | 12% | 10.29% | 9% |
| 第三 | 54% | 27% | 18% | 13.5% | 10.8% | 9% | 7.71% | 6.75% |
| 第四 | 42% | 21% | 14% | 10.5% | 8.4% | 7% | 6% | 5.25% |
| 第五 | 30% | 15% | 10% | 7.5% | 6% | 5% | 4.29% | 3.75% |

## 谁能得到激励？ {#who-gets-the-incentives}

质押者运行验证者节点，并且将其代币委托给他们信任的验证者。

验证者可以选择对授权者获得的奖励收取佣金。

属于所有质押者的资金被锁定在一个部署在以太坊主网上的合约中。

没有验证者对授权者的代币进行保管。

## 质押奖励 {#staking-rewards}

每年的奖励是必有的 — 无论网络中的总权益或目标绑定率如何，奖励金额都会定期发放给所有签名者作为奖励。

在 Polygon 中，还有一个额外的因素，即向以太坊主网提交定期[检查点](/docs/maintain/glossary.md#checkpoint-transaction)。这是验证者责任的主要部分，他们受到激励来执行这一活动。这构成了验证者的成本，而验证者是 Layer 2 解决方案（如 Polygon）所特有的。我们努力将这一成本作为奖金支付给负责提交检查点的[提议者](/docs/maintain/glossary.md#proposer)，以适应验证者质押奖励支付机制。奖励减去奖金将由所有权益者、提议者和[签名者](/docs/maintain/glossary.md#signer-address)按比例分享。

## 鼓励提议者将所有签名纳入其中 {#encouraging-the-proposer-to-include-all-signatures}

为了完全利用奖金，[提议者](/docs/maintain/glossary.md#proposer)必须将所有签名包含在[检查点](/docs/maintain/glossary.md#checkpoint-transaction)中。由于协议要求 ⅔+1 权重的总权益，即使有 80% 的选票，检查点也被接受。但是，在这种情况下，提议者只能得到计算奖金的 80%。

## 交易费 {#transaction-fees}

每个 [Bor](/docs/maintain/glossary.md#bor) 区块生产者都会得到每个区块中收集的一定比例的交易费用。任意给定跨度生产者的选择也取决于验证者在质押总量中所占的比例。剩余交易费与奖励一样流经同一个漏斗模型，由在 [Heimdall](/docs/maintain/glossary.md#heimdall) 层工作的所有验证者共享。
