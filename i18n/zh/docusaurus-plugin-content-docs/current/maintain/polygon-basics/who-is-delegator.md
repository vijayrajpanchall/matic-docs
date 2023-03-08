---
id: who-is-delegator
title: 谁是授权者
description: 未运行节点的时机持有人
keywords:
  - docs
  - matic
  - polygon
  - delegator
  - Who is a Delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

授权者是代币持有人，其自己不能或不想运行[验证者](/docs/maintain/glossary.md#validator)节点。相反，他们通过将自己的权益授权给验证者节点来保护网络，并在系统中扮演关键角色，因为其负责选择验证者。他们在以太坊主网下的质押合同中运行委托交易。

MATIC 代币与以太坊主网上提交的下一个[检查点](/docs/maintain/glossary.md#checkpoint-transaction)绑定。授权者还可以随时选择退出系统。与验证者类似，授权者必须等待解约期到来，这段时间约为 9 天，然后才能撤回其质押。

## 费用和奖励 {#fees-and-rewards}

授权者通过将代币委托给验证者来质押，从而获得一定比例的奖励作为交换。因为授权者与验证者共享回报，所以前者也要承担风险。如果验证者行为不端，每个授权者都有可能被按其委托权益的比例部分削减。

验证者设置一个[佣金](/docs/maintain/glossary.md#commission)百分比，以确定他们将获得的奖励的百分比。授权者能够查看每个验证者的佣金率，以了解每个验证者的报酬分配和其权益的相对回报率。

:::caution 100% 佣金率的验证者

这些验证者获得所有奖励，而不在寻找授权，因为他们拥有足够的代币可以自行进行利害关系。

:::

授权者可以选择将代币转交给其他验证者。奖励在每个检查点累积。

:::tip 成为一名积极的授权者

委托不应被视为一种被动活动，因为授权者是维持 Polygon 网络的一个组成部分。每个授权者都有管理其风险的责任，但在这么做的时候，授权者应该选择行为良好的验证者。

:::

## 另见 {#see-also}

* [授权](/docs/maintain/delegate/delegate)
* [验证者常见问题解答](/docs/maintain/validate/faq/validator-faq)
