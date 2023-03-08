---
id: consensus-mechanism
title:  共识机制
description: "PoW、PoS、DPoS、PoSpace和PoET。"
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

#  共识机制 {#consensus-mechanism}

共识机制是一种容错机制，用于计算机和区块链系统中，从而在分布式进程或多代理系统（例如加密货币）之间就单个数据值或网络的单个状态达成必要的协议。

## 共识机制的类型 {#types-of-consensus-mechanism}

### 工作证明 {#proof-of-work}
工作证明描述的系统需要相当大但可行的力量来阻止dos（拒绝服务）攻击和其他恶意攻击。它需要解决一个具有挑战性的计算谜题，以便在区块链中创建新的区块。

### 权益证明 {#proof-of-stake}
验收机制通过要求用户进行存取存款来达成共识，以便有机会被选中验证交易区块，并通过这样做获得奖励。优先考虑在区块链系统中购买最多权益的矿工。

### 授权的质押证明 {#delegated-proof-of-stake}
这种共识形式反映了管理机构成员的选举。利益相关者不必将资产自己存储，而是可以将此项活动授权给将参加协商一致进程的第三方、证人或代表。证人，即验证交易的人，通常提出提案，要求投票，并由利益相关者选出。这些实体获得的奖励通常与网络参与者共享。

### 空间证明 {#proof-of-space}
这种共识机制在下放的文件存储应用中很有用，例如在 Storj.io、Filecoin 和 Crust 中，在那里，节点证明它们拥有合法的硬件能力。然而，它没有使用 PoW 机制中的重计算，而是利用每个节点的存储能力。有时也称为PoStorage或PoCapacity。

### 早期证明 {#proof-of-elapsed-time}
PoW的更好替代方案，消耗更少的计算资源。每个参与节点都需要等待随机时间，而第一个从睡眠中醒来节点则有机会创建新的区块，然后通过网络传播。它需要可信执行环境（TEE），如Intel SGX，这是存储器中一个独立部分，只能使用特定集合的指示访问。

## **资源**

- [拜占庭过失公差](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419)<br></br>
- [共识机制类型](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms)<br></br>
- [共识系统开发概述和历史](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/)<br></br>
- [理解分布式共识](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95)<br></br>
- [拜占庭将军问题](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)