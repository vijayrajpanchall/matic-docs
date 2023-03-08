---
id: what-is-proof-of-stake
title: 什么是权益证明？
description: 了解什么是质疑交易共识机制的证明
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

# 什么是权益证明？ {#what-is-proof-of-stake}

权益证明 (POS) 是公有区块链的一种共识算法，其依赖于验证者在网络中的经济[利益](/docs/maintain/glossary.md#staking)。

在基于工作量证明 (PoW) 的公有区块链中，算法奖励解决加密难题以验证交易和创建新区块的参与者。PoW 区块链示例： Bitcoin, Ethereum (合并前)。

在基于 PoS 的公有区块链中，一组验证者轮流提出下一个区块并进行投票。每个验证者投票的权重取决于其存款规模的大小——[权益](/docs/maintain/glossary.md#staking)。PoS 的显著优势包括安全性、集中化风险降低和能源效率。PoS 区块链示例：以特里尔 2.0， Polygon

一般来说，PoS 算法如下所示。区块链负责跟踪一组验证者，持有区块链的基层密钥货币（在以太坊（ETH）的情况下）的任何人都可以通过发送特殊类型交易来成为验证者，将 ETH 锁上存款。然后，创建和同意新区块的过程通过当前所有验证者的共识算法来完成。

共识算法有很多种，向参与共识算法的验证者分配奖励的方法也有很多种，因此有很多“风格”的权益证明。从算法角度来看，有两种主要类型：基于链式的 PoS 和 [BFT 式 PoS 。](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance)

在**基于链的权益证明**中，算法在每个时点（例如，每 10 秒的时间段可能是一个时点）伪随机地选择一个验证者，并授予该验证者创建单个区块的权利，该块必须指向之前的某个区块（通常是之前最长链的末端的块），因此随着时间的推移，大多数区块会聚成一个不断增长的单个链。

在 **BFT 样式利害关系方证明**中，验证者被**随机**分配提出区块的**权利**。在多轮流程中，每个验证者在每个回合中发送给特定区块**的投票**，在处理结束时，所有（诚实和网上）验证者都永久同意任何区块是否属**于**链条的一部分。请注意，区块可能仍然**被连接在**一起。关键区别在于，在一个区块上达成共识可以发生在一个区块内，而不取决于链的长度或规模。

详情请参见 [https://github.com/ethereum/wiki/wiki/Proof-of-利害关系方-Fack Q。](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ)

## 另见 {#see-also}

* [授权者](/docs/maintain/glossary.md#delegator)
* [验证者](/docs/maintain/glossary.md#validator)
