---
id: consensys-framework
title: 缩放框架 FAQ
sidebar_label: Scaling Framework FAQ
description: 在 Polygon 上构建您的下一个区块链应用程序。
keywords:
  - docs
  - matic
  - wiki
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

该框架来自康森西斯的[四个问题，以判断任何缩放解决方案。](https://consensys.net/?p=19015&preview=true&_thumbnail_id=19017)

## 谁在运营它？ {#who-operates-it}
以太坊主网上的矿工节点通过解决工作量证明和创建新区块来推进或向前“运营”网络。L2 解决方案网络上也需要存在一个类似的“运营者"角色，他们相当于以太坊主网的矿工，推动 L2 网络的发展。但二者存在一些差异。例如，除了像矿工一样处理和批准交易以外，L2 运营者还可以为用户进入和退出 L2 层本身提供便利。

### - 需要谁或什么来运营 Polygon 权益证明网络? {#who-or-what-is-required-to-operate-the-polygon-proof-of-stake-network}

Polygon PoS 提交链依靠一组验证者来保护网络。验证者的作用是运行完整的节点；生成区块、验证和参与共识，并将检查点提交到以太坊主链。要成为验证者，需要通过位于以太坊主链上的质押管理合约来质押他们的 MATIC 代币。

详情请参见[验证者部分。](/maintain/validate/getting-started.md)

### - 他们如何成为 Polygon PoS 网络中的运营者？他们遵守什么规则？ {#how-do-they-become-operators-in-the-polygon-pos-network-what-rules-do-they-abide-by}

要成为验证者，需要使用固定方式来质疑其 MATIC 代币居住在以太坊主链上的管理合约。

奖励根据参与者在每个检查点的权益质押额占比发放，但提案者除此之外还将获得额外的奖励。用户奖励余额在合约中得到更新，在提及时要求奖励。

如果验证者节点实施一个 时，质疑会被削减恶意行为如双重签名、验证者停机时间，也影响链接的在检查点上，授权者。

有关详细信息，请参见[端到端流向 Polygon 验证者](/maintain/polygon-basics/who-is-validator.md#end-to-end-flow-for-a-polygon-validator)及[验证者责任。](/maintain/validate/validator-responsibilities.md)


### - Polygon PoS 的用户必须对运营者做出哪些信任假设？ {#what-trust-assumptions-must-the-polygon-pos-users-make-about-the-operator}

Polygon PoS 提交链依靠一组验证者来保护网络。验证者的作用是运行完整的节点；生成区块、验证和参与共识，并将检查点提交到以太坊主链。要成为验证者，用户需要通过位于以太坊主链上的质押管理合约来质押他们的 MATIC 代币。
只要验证者的加权权益中有 2/3 是诚实的，该链就会准确进行。

### - 运营者负责什么？他们有什么权力？ {#what-are-the-operators-responsible-for-what-power-do-they-have}

验证者的作用是运行完整的节点；生成区块、验证和参与共识，并将检查点提交到以太坊主链。

假设 2/3 的加权权益验证者不诚实，验证者有权停止链的进程、对区块进行重新排序等。他们无权更改状态、用户资产余额等。

### - 成为 Polygon PoS 运营者的动机是什么？ {#what-are-the-motivations-to-become-an-operator-of-the-polygon-pos}

验证者将其 MATIC 代币作为抵押，负责维护网络安全的工作，并用其服务换取奖励。

请参见[何种激励](/maintain/validator/rewards.md#what-is-the-incentive)来了解更多详细信息。

## 如何处理数据？ {#how-s-the-data}
第 2 层技术的定义决定了它必须是在第 1 层（以太坊主网）基础之上创建增量数据检查点。那么，我们关注的就是那些第 1 层定期检查之间的间隔时间。具体来说，第 2 层的数据在远离第 1 层安全港的情况下，是如何产生、存储和管理的？我们最关心的就是这个问题，因为这是用户距离公共主网的无信任安全性最远的情况。

### - Polygon PoS 的锁仓条件是什么？ {#what-are-the-lock-up-conditions-for-polygon-pos}

在大多数代币设计模式中，代币是在以太坊上铸造的，可以发送到 Polygon PoS。要将这样的代币从以太坊转移到 Polygon PoS，用户需要将资金锁定在以太坊的合约中，然后再在 Polygon PoS 上铸造相应价值的代币。

这种桥接中继机制由 Polygon PoS 验证者运行，他们中的 ⅔ 需要就以太坊上锁定的代币事件达成一致，才能在 Polygon PoS 上铸造相应数量的代币。

将资产划转回以太坊是一个分 2 步的流程。其中资产代币必须首先在 Polygon PoS 提交链上烧毁，然后再将燃烧交易证明提交至以太坊链。


有关详细信息，请参见[使用 PoS 桥的步骤。](/develop/ethereum-polygon/pos/getting-started.md#steps-to-use-the-pos-bridge)

### - 多久后这些资金在 Polygon PoS 上可用？ {#how-soon-are-those-funds-available-on-the-polygon-pos}

约22-30分钟左右。此操作通过一个称为 消息传递机制进行`state sync`。详情请参见[此处。](/pos/state-sync/state-sync-mechamism.md)

Polygon PoS 是否支持用户在未进行 L1 锁仓的情况下进入（即用户直接进入 Polygon 后，又希望退出到以太坊主网）？

是的，您可通过特殊的桥接机制来实现这一点。当用户希望退出至以太坊时，不采取从特殊合约中解锁代币的普通方法，而是通过铸造。

您可以[在](/develop/ethereum-polygon/mintable-assets.md)这里阅读有关它们。

### - 用户如何对无效的 Polygon PoS 交易提出异议？证明有效的 Polygon PoS 交易？ {#how-would-a-user-dispute-an-invalid-polygon-pos-transaction-prove-a-valid-polygon-pos-transaction}

您目前无法在链上对无效的 Polygon PoS 交易提出异议。然而， Polygon poS 链的验证者将定期检查点提交给以特里尔姆-您可以在[此](/pos/heimdall/modules/checkpoint.md)查看更多详细信息。通过创建 Merkle 树证据，并根据 Polygon 交易的以太机上发生的定期检查点进行验证，验证在以太机上进行交易，并收到 Merkle 树根。

### - 一个 Polygon 用户希望退出后，在多久可用于锁定层1 基金（加上或减去任何 L2 收益或损失）上可用的？ {#once-a-polygon-user-wishes-to-exit-how-soon-are-the-locked-up-layer-1-fund-plus-or-minus-any-l2-gains-or-losses-available-back-on-l1}

大约 ~1-3 小时，取决于[检查点](/pos/heimdall/modules/checkpoint.md)的频率。频率主要是验证者愿意花费以太币燃料费来提交检查点的成本的函数。

### - 您是否预计第 1 层的流动性提供者愿意向现有的 Polygon PoS 用户提供立即可赎回的 L1 资金？ {#do-you-anticipate-there-being-liquidity-providers-on-layer-1-willing-to-provide-immediately-redeemable-l1-funds-to-existing-polygon-pos-users}

已经有少数玩家正在或将要提供此服务，例如 [Connext](https://connext.network/) 和 [Biconomy](https://biconomy.io/) 等。还有许多其他服务商很快也将上线。

## 堆栈如何？ {#how-s-the-stack}
堆栈的比较对于强调第 2 层与以太坊主网有无变化非常重要。

### - Polygon PoS 堆栈与以太坊主网堆栈共享程度如何？ {#how-much-does-the-polygon-pos-stack-share-with-the-ethereum-mainnet-stack}

如果您是以太坊开发人员，那么您已经是 Polygon PoS 开发人员。Truffle、Remix、Web3js 等你熟悉的所有工具都可直接应用于 Polygon PoS。

相对于以太坊，Polygon PoS 的 EVM 接口没有重大变化。

### - Polygon PoS 与以太坊主网堆栈有何不同，这会带来哪些风险/回报？ {#where-does-the-polygon-pos-differ-from-ethereum-mainnet-stack-and-what-risks-rewards-does-that-introduce}

没有重大不同。

## 为最坏的情况做准备 {#preparing-for-the-worst}
Polygon PoS 系统对于以下情况的准备如何：

### - 大量用户退出？ {#a-mass-exit-of-users}

只要 ⅔ 的验证者是诚实的，链上的资金就是安全的。如果此前提失效，则在这种情况下，链可能会停止工作或进行重新排序。然后需要达到共识，才能从较早的状态重新启动链 - 要执行此操作，还需要通过检查点提交的 Polygon PoS 此前状态的快照。

### - 试图挑战 Polygon 共识的 Polygon 参与者。比如说，通过形成某种垄断性组织？ {#polygon-participants-attempting-to-game-the-polygon-consensus-for-example-by-forming-a-cartel}

在这种情况下，则需要形成共识，然后通过移除这些验证者从更早的状态重启链，用一组新的验证者进行重启 - 要执行此操作，还需要通过检查点提交的 Polygon PoS 此前状态的快照。


### - 在其系统的关键部分发现错误或漏洞？ {#a-bug-or-exploit-discovered-in-a-critical-part-of-its-system}

我们在构建系统的过程中，已注意重用经过实战检验的组件。但如果系统的关键部分存在漏洞或漏洞，主要的解决途径是通过社会共识将链恢复到更早的状态。
