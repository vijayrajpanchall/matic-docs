---
id: general-faq
title: 常见问题解答
description: Polygon 网络上的常见问题。
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 什么是 Polygon 网络？ {#what-is-polygon-network}

Polygon 网络是第 2 层扩展解决方案，通过利用侧链进行链下计算来实现扩展，同时通过权益证明 (PoS) 验证者确保资产安全和去中心化。

另请参阅[什么是 Polygon](/docs/home/polygon-basics/what-is-polygon)。

## 什么权益证明 (PoS)？ {#what-is-proof-of-stake-pos}

权益证明是旨在供区块链网络实现分布式共识的系统。任何拥有足够数量代币的人都可以锁定其加密货币，由此获得的经济激励取决于去中心化网络的共享价值。质押加密货币的个体通过同时投票来验证交易，而当一笔交易或一个区块中的一组交易或一个检查点中的一组区块收到足够的投票时，就会达成共识。投票阈值会计入每一票的权益权重。例如，在 Polygon 中，当至少 ⅔ +1 的总权益投票支持将 Polygon 块的检查点提交到以太坊网络时，就会达成共识。

另请参阅[《什么是权益证明》](/docs/home/polygon-basics/what-is-proof-of-stake)。

## 权益证明在 Polygon 架构中扮演什么角色？ {#what-role-does-proof-of-stake-play-in-the-polygon-architecture}

Polygon 架构中的权益证明层有以下两个用途：

* 作为维持 Plasma 链活跃性的激励层，主要用于解决数据不可用的棘手问题。
* 为 Plasma 未涵盖的状态转换实施权益证明安全保证。

## Polygon PoS 与其他类似系统有何不同？ {#how-is-polygon-pos-different-from-other-similar-systems}

从某种意义上说，它的不同之处在于它具有双重目的——通过 Plasma Predicates 为覆盖状态转换的 Plasma 链提供数据可用性保证，以及对 EVM 中的通用智能合约进行权益证明验证。

Polygon 架构还将区块的生产和验证过程分为 2 个不同的层。验证者作为区块生产者，顾名思义，负责在 Polygon 链上创建区块，以实现更快（< 2 秒）的部分确认；而最终确认则是在主链上定期提交检查点后实现的，间隔时间可能会因以太坊拥塞或 Polygon 交易数等多个因素而有所不同。在理想情况下，应为 15 分钟至 1 小时左右。

检查点基本上是该时间间隔中生成的所有区块的 Merkle 根。验证者扮演着多种角色：在区块生产者层创建区块，通过为所有检查点签名参与共识，并在充当提案者时负责提交检查点。验证者成为区块生产者或提案人的概率取决于其权益在整个池子中所占比率。

## 鼓励提案人纳入所有签名 {#encouraging-the-proposer-to-include-all-signatures}

为了完整地获得提案人奖金，提案人需要将所有签名纳入检查点。由于协议要求达到总权益权重的 ⅔+1，即使只纳入 80% 的选票，检查点也会被接受。但在这种情况下，提案人只能得到计算出的奖金的 80%。

## 我如何提交支持工单或为 Polygon 文档贡献力量？ {#how-can-i-raise-a-support-ticket-or-contribute-to-polygon-documentation}
如果您认为我们的文档有错误需要订正，或者甚至您只是想添加新信息，您可以[在 Github 存储库上提出问题](https://github.com/maticnetwork/matic.js/issues)。存储库上的[自述文件](https://github.com/maticnetwork/matic-docs/blob/master/README.md)也就如何为我们的文档贡献力量提供了一些建议。

如果您仍然需要帮助，可随时联系**我们的支持团队**。
