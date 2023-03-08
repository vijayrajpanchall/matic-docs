---
id: glossary
title: 术语表
description: 密钥 Polygon 术语
keywords:
  - docs
  - matic
  - polygon
  - glossary
  - jargons
slug: glossary
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 区块生产者 {#block-producer}

区块生产者是指那些选出的活跃[验证者](#validator)，他们在某一[跨度](#span)充当区块生产者。

区块生产者负责创建区块并将创建的区块传播到网络。

## Bor {#bor}

Bor 节点是在 Polygon 网络上生产区块的节点。

Bor 节点基于 [Go Ethereum](https://geth.ethereum.org/)。

## 检查点交易 {#checkpoint-transaction}

检查点交易是指包含检查点间隔之间 [Bor](#bor) 层区块默克尔根的交易。

该笔交易由 [Heimdall](#heimdall) 节点提交到以太坊主网的 Polygon 质押合约。

另请参阅：

* [Heimdall 的架构：检查点](/docs/pos/heimdall/checkpoint)
* [检查点机制](/docs/maintain/validator/core-components/checkpoint-mechanism)

## 佣金 {#commission}

授权人将代币质押给[验证者](#validator)，验证者从[授权人](#delegator)那里所获奖励的百分比即为佣金。

另请参阅[《验证者佣金操作》](/docs/maintain/validate/validator-commission-operations)。

## 授权者 {#delegator}

授权人的作用在于质押 MATIC 代币，用现有[验证者](#validator)来保护 Polygon 网络，无需运行节点本身。

另请参阅[《谁是授权者》](/docs/maintain/polygon-basics/who-is-delegator)。

## 全节点 {#full-node}

全节点是指运行 [Heimdall](#heimdall) 和 [Bor](#bor) 时，完全同步的 [Sentry 节点](#sentry)。

另请参阅[《全节点部署》](/docs/operate/full-node-deployment)。

## Heimdall {#heimdall}

Heimdall 节点是与以太坊主网并行运行的节点，用于监控部署在以太坊主网上的一组合约，并将 Polygon 网络的 [检查点](#checkpoint-transaction) 提交给以太坊主网。

Heimdall 基于 [Tendermint](https://tendermint.com/)。

## 所有者地址 {#owner-address}

所有者地址是用于在以太坊主网上进行质押、重新质押、更改签名者地址、提取奖励以及管理授权相关参数的地址。

[签名者的密钥](#signer-address)保存在节点上，通常称之为**热**钱包，而所有者的密钥必须安全保存且不经常使用，通常称之为**冷**钱包。

另请参阅[《密钥管理》](validator/core-components/key-management.md)。

## 提议者 {#proposer}

提议者是由算法选择出的[验证者](#validator)，主要负责提议新区块。

提议者还负责收集特定[检查点](#checkpoint-transaction)的所有签名，并将检查点提交到以太坊主网。

## Sentry {#sentry}

sentry 节点可同时运行 [Heimdall](#heimdall) 节点和 [Bor](#bor) 节点，用于通过网络上的其他节点去下载数据以及在网络上传播[验证者](#validator)数据。

sentry 节点对网络上的所有其他 sentry 节点均开放。

## 跨度 {#span}

一系列逻辑上定义的区块，为其从所有可用的[验证者](#validator)中选出一系列验证者。

每个跨度的选择是由至少 2/3 的验证者并根据其质押能力来决定的。

另请参阅[《Bor 共识：跨度》](/docs/pos/bor/consensus.md#span)。

## 质押 {#staking}

质押是将代币锁定到存款中的过程，从而获得在区块链上进行验证以及生产区块的权利。通常，在网络的本生代号上进行转账——因为MATIC代币被 Polygon 网络的验证者/存储者锁定。其他例子包括以太坊（合并后）中的 ETH，宇宙中的 ATOM，等等。

另请参阅[《什么是权益证明》](polygon-basics/what-is-proof-of-stake.md)。

## 签名者地址 {#signer-address}

签名者地址是 [Heimdall](#heimdall) 验证者节点的以太坊帐户地址。签名者地址的签署并提交[检查点交易](#checkpoint-transaction)。

签名者的密钥保存在节点上，通常称之为热**钱**包，而[所有者的密钥](#owner-address)必须安全保存且不经常使用，通常称之为**冷**钱包。

另请参阅[《密钥管理》](validator/core-components/key-management.md)。

## 验证者 {#validator}

验证者通过部署在以太坊主网上进行质押的合约来[保存他们的 MATIC 代币](/docs/maintain/validate/validator-staking-operations)，并运行 [Heimdall](#heimdall) 节点和 [Bor](#bor) 节点，将网络检查点转入以太坊主网上，并在网络上生产区块。

验证者节点仅对其 [sentry](#sentry) 节点开放，而对网络的其余节点均不开放。

另请参阅[《谁是验证者》](polygon-basics/who-is-validator.md)。
