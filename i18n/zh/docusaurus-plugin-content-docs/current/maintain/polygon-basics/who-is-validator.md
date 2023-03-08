---
id: who-is-validator
title: 谁是验证者
sidebar_label: Who is a Validator
description: "网络中运行 Heimdall 和 Bor 节点的参与者。"
keywords:
  - docs
  - matic
  - polygon
  - validator
  - Who is a Validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

验证者是网络的参与者，在系统中锁定 MATIC 代币，运行 Heimdall 验证者和 Bor 区块生产者节点，以帮助运行网络。验证者将其 MATIC 代币作为抵押，负责维护网络安全的工作，并用其服务换取奖励。

奖励按每个检查点的权益质押数额成比例发放给所有参与者，但提议者获得额外奖金的情况除外。用户的奖励余额在合约中得到更新，在申请奖励时可以参考。

如果验证者节点提交了双重签名之类的恶意行为（这也会影响到检查点上的链接授权者），那么权益就有被大幅削减的风险。

:::tip

那些有兴趣确保网络但未运行完整节点的人可以作为[授权者](/docs/maintain/glossary.md#delegator)参与。

:::

## 概述 {#overview}

Polygon 网络上的验证者是通过定期进行的链上拍卖过程来选择的。这些选定的验证者作为区块生成者和验证者参与。一旦[检查点](/docs/maintain/glossary.md#checkpoint-transaction)被参与者验证，就会在主链（以太坊主网）上进行更新，根据验证者在网络中的权益发放奖励。

Polygon 依靠一组[验证者](/docs/maintain/glossary.md#validator)来维护网络。验证者的作用是运行一个完整的节点，[生成区块](/docs/maintain/glossary.md#block-producer)，验证并参与共识，并在以太坊主网上提交[检查点](/docs/maintain/glossary.md#checkpoint-transaction)。要成为验证者，需要将其 MATIC 代币与位于以太坊主网上的质押管理合同[进行质押](/docs/maintain/glossary.md#staking)。

## 核心组件 {#core-components}

[Heimdall](/docs/maintain/glossary.md#heimdall) 识别质押合约发出的事件，以选择当前集合的验证者及其更新的权益质押比例，[Bor](/docs/maintain/glossary.md#bor) 在生产区块时也使用了这一比例。

[授权](/docs/maintain/glossary.md#delegator)也被记录在质押合约中，验证者权力或节点[签名人地址](/docs/maintain/glossary.md#signer-address)或解约请求的任何更新都会在下一个检查点被提交时生效。


## Polygon 验证者的端到端流程 {#end-to-end-flow-for-a-polygon-validator}

验证者设置其签名节点，同步数据，然后将其代币押在以太坊主网的质押合约上，以作为当前集合中的验证者接受。如果空位出现，验证者会被立即接受。否则，就需要通过更换机制来获得一个名额。

:::warning

接受新验证者的空间有限。仅当当前活动的验证者解除绑定时，新的验证者才能加入活动集。将推出新的验证者更换拍卖程序。

:::

区块生成器是从验证者集中选择的，其中所选验证者负责为给定[跨度](/docs/maintain/glossary.md#span)生成区块。

Heimdall 的节点验证正在生成的区块，参与协商一致，并以规定的时间间隔在以太网主网上提交检查点。

验证者被选为区块生产者或检查点[提议者](/docs/maintain/glossary.md#proposer)的概率取决于一个人的权益质押比例，包括整个池中的委托。

在扣除支付给检查点提议者的奖金后，验证者在每个检查点根据其权益质押比例获得奖励。

人们可以在任何时候选择退出该系统，一旦解约期结束就可以提取代币。

## 经济体制 {#economics}

参阅[奖励](/docs/maintain/validator/rewards)。

## 设置验证者节点 {#setting-up-a-validator-node}

参阅[验证](/docs/maintain/validate/validator-index)。

## 另见 {#see-also}

* [验证者职责](/docs/maintain/validate/validator-responsibilities)
* [验证](/docs/maintain/validate/validator-index)
* [验证者常见问题解答](/docs/maintain/validate/faq/validator-faq)
