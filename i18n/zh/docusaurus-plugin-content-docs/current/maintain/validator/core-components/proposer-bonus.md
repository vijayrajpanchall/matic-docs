---
id: proposer-bonus
title: 提议者奖励
description: 作为验证者的其他激励
keywords:
  - docs
  - polygon
  - matic
  - validate
  - proposer
  - bonus
  - incentive
slug: proposer-bonus
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# 提议者奖励 {#proposer-bonus}

在 Polygon 中，还有一个额外的因素，即向以太坊主网提交定期[检查点](/docs/maintain/glossary.md#checkpoint-transaction)。这是验证者责任的主要部分，他们受到激励来执行这一活动。这构成了验证者的成本，而验证者是 Layer 2 解决方案（如 Polygon）所特有的。我们努力将这一成本作为奖金支付给负责提交检查点的[提议者](/docs/maintain/glossary.md#proposer)，以适应验证者质押奖励支付机制。奖励减去奖金将由所有质押人、提议者和[签名者](/docs/maintain/glossary.md#signer-address)按比例分享。

为了完全利用奖金，提议者必须将所有签名包含在检查点中。由于协议要求 ⅔+1 权重的总权益，即使有 80% 的选票，检查点也被接受。但是，在这种情况下，提议者只能得到计算奖金的 80%。
