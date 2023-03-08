---
id: liquid-delegation
title: 流动性授权
sidebar_label: Liquid Delegation
description: Polygon 如何利用流动性授权来进行网络维护。
keywords:
  - docs
  - polygon
  - matic
  - delegation
  - liquid delegation
slug: liquid-delegation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

在传统的质素证明机制中，区块链负责跟踪一组验证者。任何人都可以通过发送特定的交易来加入该级别或权威，来验证交易，该交易将质疑其硬币存储在上面（在以太坊的案例中，ETH）。随后，创建和同意新区块的过程将通过所有有效验证者的一致算法完成。

他们将部分股份锁定在一定时间上（如担保存款），换取他们获得与股份成比例的机会，选择下一个区块。

提取奖励将发放给参与者，以此作为激励。

## 授权 {#delegation}

搜集可能昂贵，提高进入屏障，有利于富人变得更富裕。每个人都应参与网络安全，并接受感激的代币。唯一的选择是加入一个与采矿池类似的固定池，验证者必须信任。我们认为，坚持协议是新授权者最好的行动方式。由于资本和奖励已经打开，并受到协议中机制的保护。

授权者可以参与验证，即使他们没有主机存储整个节点。然而，通过与验证者进行静止，他们可以通过向他们选择的验证者支付微小的佣金收费（视验证者而定）来提高网络的实力并获得奖励。

## 传统代表和验证者限制 {#limitation-of-traditional-delegator-and-validator}

由于权益证明协议的设计，验证者和授权者的资本锁定成本都很高。

仍然，我们可以带来更多的流动性查看机制，如验证者NFT，在那里，任何希望成为验证者的新当事方都可以从验证者那里购买验证者NFT，因为它出于某种原因希望退出系统。

如果对于授权者，锁定金额假定是小块块，所以我们希望保持流动性，以便参与更积极（即如果有些代表认为现在在 DeFi 中拥有很好的机会，但他们的资本被锁定在固定池中，即使提取，他们仍需要等待21天）。

另外，将 X ETH 锁定在押金中并不是免费的；它需要为 ETH 持有人牺牲可选权。现在，如果您拥有 1000  ETH，您可以随意使用。如果您将它锁定在押金中，则它将被困在那里几个[**月**](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)，以防止发生攻击，并因参与不良而惩罚验证者。

## 在协议中使用层 {#in-protocol-vs-application-layer}

应用级的转账清算存在信任问题。协议级的转账清算受到更大的赞赏，因为任何新的行为者都可以信任它（这吸引更多的资本，甚至来自较小的行为者/授权者）。

## Polygon 的授权解决方案 {#polygon-s-solution-for-delegation}

在探索授权时，我们意识到授权需要在协议中进行，以便获得授权者的更多信任。

我们面临着类似的问题，并考虑将其变成一种可以转账的 NFT，并探讨类似的想法，例如如何使它更具流动性，以及sikka-chorus。人们注意到，一个人的[精彩设计](https://blog.chorus.one/delegation-vouchers/)。

考虑到验证池共享是一个很好的想法，因为 Polygon 质押是在以太坊智能合约上实现的，这为我们提供了更多的选择，比如使其与 ERC20 兼容，以便可以在 defi 协议中使用。

截至现在，每个验证者都有自己的 VMatic 公司（即对于验证者Ashish 会有 AMatic 代币），因为每个验证者都有不同的性能（奖励和佣金率）。授权者可以购买多个验证者共享，并对特定验证者表现不佳进行防范。

## 优势 {#advantages}

- 由于我们的设计遵循类似于授权执行中的接口，因此DeFi 应用程序可以轻松在它的顶部上建立。
- 授权代币可用于借贷协议。
- 授权者可以通过像 Auger 这样的预测市场来对冲风险。

未来范围：

- 目前，ERC20 无法与其他验证者 ERC20 交换机交换，但我们认为，今后许多新的DeFi 应用程序可以借鉴它，为它提供一些市场，甚至一些更好的产品。
- 通过[chorus.1](http://chorus.one)开始的研究，我们还正在探讨一些问题，例如使用验证者转换自己的代币和其他问题（可以通过验证者锁定自己的股份等方式避免缩短问题）。
- 代表投票权，以便参与治理决定。
- 在进行授权清算时，我们还希望确保网络安全。因此，在发生欺诈活动时，以某种形式锁定可转换资本。

鉴于上述协议内可用的设计，验证者始终可以实现自己的类似机制并通过合约进行质押，这在 Polygon 质押 UI 中不可用。

## 未来目标 {#future-goals}

通过 Cosmos 中心和 Everett B 收获设计，进行交叉链/交叉链。

## 资源 {#resources}

- [Vitalik 权益证明 (PoS) 设计](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [质押衍生品入门](https://medium.com/lemniscap/an-intro-to-staking-derivatives-i-a43054efd51c)
- [质押池](https://slideslive.com/38920085/ethereum-20-trustless-staking-pools)
- [权益证明通胀](https://medium.com/figment-networks/mis-understanding-yield-and-inflation-in-proof-of-stake-networks-6fea7e7c0e41)
