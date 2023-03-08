---
id: what-is-proof-of-stake
title: 什么是权益证明？
description: 一种依赖于验证者的共识算法。
keywords:
  - docs
  - matic
  - polygon
  - stake
  - delegate
  - validate
  - pos
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# 质素证明 (PoS) {#proof-of-stake-pos}

权益证明 (POS) 是公有区块链的一种共识算法，其依赖于验证者在网络中的经济[利益](/docs/maintain/glossary#staking)。

在基于工作量证明 (PoW) 的公有区块链中，算法奖励解决加密难题以验证交易和创建新区块的参与者。PoW 区块链实例：Bitcoin，早期的以太阳馆。

在基于 PoS 的公有区块链中，一组验证者轮流提出下一个区块并进行投票。每个验证者投票的权重取决于其存款规模的大小——[权益](/docs/maintain/glossary#staking)。PoS 的显著优势包括安全性、集中化风险降低和能源效率。POS 区块链示例：Eth2、Polygon。

一般来说，PoS 算法如下所示。区块链追踪了一组验证者，任何持有区块链基础加密货币（在以太坊中是以太币）的人都可以通过发送一种特殊类型的交易，将以太币锁定到存款中，从而成为验证者。然后，创建和同意新区块的过程通过当前所有验证者的共识算法来完成。

共识算法有很多种，向参与共识算法的验证者分配奖励的方法也有很多种，因此有很多“风格”的权益证明。从算法的角度来看，主要有两种类型：基于链的 PoS 和 [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance) 风格的 PoS。

在**基于链的权益证明**中，算法在每个时点（例如，每 10 秒的时间段可能是一个时点）伪随机地选择一个验证者，并授予该验证者创建单个区块的权利，该块必须指向之前的某个区块（通常是之前最长链的末端的块），因此随着时间的推移，大多数区块会聚成一个不断增长的单个链。

在 **BFT 风格的权益证明**中，验证者被**随机**分配提议区块的权利，但*就哪个区块是规范的达成一致*是通过多轮过程完成的，其中每个验证者在每轮过程中为某个*特定的*区块进行“投票”，在过程结束时，所有（诚实的和在线的）验证者永久地就任何给定的区块是否为链的一部分达成一致。注意，区块仍然可能*被链接在一起*。关键区别在于，对一个区块的共识可以在一个区块内达成，而不依赖于其之后的链的长度或大小。

更多信息，请访问 [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ)。

另见：

* [授权者](/docs/maintain/glossary#delegator)
* [验证者](/docs/maintain/glossary#validator)
