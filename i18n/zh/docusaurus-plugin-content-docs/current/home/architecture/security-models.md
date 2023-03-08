---
id: security-models
title: 安全性模型
description: PoS、 Plasma 及混合证券
keywords:
  - docs
  - matic
  - polygon
  - security
  - implementation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# 安全性模型 {#security-models}

Polygon 提供三种类型的安全模型，供开发者在以下基础上建立其 dApps：

1. [权益证明安全性](#proof-of-stake-security)
2. [Plasma安全性](#plasma-security)
3. [混合（Plasma + PoS）](#hybrid)

我们已经描述了 Polygon 提供的每种安全模式，以及每个开发者工作流程，其中有一个示例，在下面。

## 权益证明安全性 {#proof-of-stake-security}

搜索（PoS） 安全性证明由基于Tendermint顶部建立的 Heimdall & Bor 层提供。只有⅔的验证者都签署根链才有检查点。

为了在我们的平台上启用PoS机制，以太坊上部署了一组质押管理合同，以及一组负责运行Heimdall和Bor节点的验证者。这实现以下功能：

- 任何人都可以在以太坊智能合约上质押MATIC代币，作为验证者加入系统
- 通过Polygon的验证状态转换获得质押奖励

PoS机制还可以缓解我们的侧链在Plasma的数据不可用问题。

我们有一个快速终结层，通过检查点定期确定侧链状态。快速终结可以帮助我们稳定侧链状态。EVM兼容链的验证则会很少，区块时间更快，吞吐量高。它的扩容性优于更高等级的去中心化。Heimdall确保最终状态无懈可击，并通过大型验证者集传递，从而带来高度的去中心化。

**对于开发者**

作为在 PoS 安全上建立的dApp 开发者，该程序与使用您的智能合约并将其部署在 Polygon  PoS 网络上一样简单。之所以可能，是因为账户的架构可以启动兼容EVM的侧链。

## Plasma安全性 {#plasma-security}

Polygon 提供针对各种攻击场景的“ Plasma 担保”。两大案例：

- 链操作者（或在 Polygon 中，Heimdall 层）腐败，或
- 用户沦陷

在两种情况下，如果用户在等离子链上的资产受到破坏，他们需要开始大规模退出。Polygon在可以利用的根链智能合约上进行搭建。有关此次构建和攻击向量的更多详细信息和技术规格，请参见[此处。](https://ethresear.ch/t/account-based-plasma-morevp/5480)

实际上，Polygon的Plasma提供的安全性与以太坊的安全性息息相关。只有在以太坊崩塌时，用户的资金才会处于风险之中。简单地说，Plasma链和主链的共识机制一样安全。可以推断，以说，plasma 链可以使用非常简单的共识机制，并且仍然安全。

**对于开发者**

作为dApp 开发者，如果您希望在 Polygon 上使用 Plasma 安全保证来建立，则需要为智能合约写出自定义的预测。这基本上意味着编写处理 Polygon 等离子构造所设定的争议条件的外部合约。

## 混合 {#hybrid}

除了在 Polygon 上部署的dApps 中可能的纯粹 Plasma 安全性和纯粹的质证验证之外，开发者还可以遵循的混合方法-这简单地意味着在 dApp 某些特定工作流上既有 Plasma 也有质证验证保证。

使用一个例子来更好地理解该方法。

考虑一个包含一组智能合约的游戏dApp，描述游戏逻辑。游戏使用自己的erc20代币来奖励玩家。现在，定义游戏逻辑的智能合约可以直接部署在Polygon侧链上 - 保证合约的权益证明安全性，而erc20代币的转账可以通过嵌入在Polygon根链合约中的Plasma担保和欺诈证明获得保护。
