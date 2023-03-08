---
id: faq
title: 常见问题解答
description: 与 Polygon 有关的 FAQ 相关
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# 经常询问的问题 {#frequently-asked-questions}

## Polygon是什么？ {#what-is-polygon}

Polygon 是一个用于公共区块链的缩放解决方案，特别是以太阳能。Polygon 提供可扩展性，同时确保以安全和分散的方式获得优越用户体验。它在 Kovan 测试网上拥有一个有效实施的以太机器实施。Polygon 打算在未来支持其他区块链，这将使我们能够提供互操作性功能，同时为现有的公共区块链网络提供可扩展性。

## Polygon 与 Plasma 的其他实施有何不同？ {#how-is-polygon-different-from-other-implementations-of-plasma}

Polygon 实施 Plasma 建立在运行 EVM 上的基于状态的侧链链中，而其他 Plasma 实施的主要使用 UTXO 来限制它们为特定付款。基于国家的一面链式的使用也允许 Polygon 提供通用智能合约的可扩展性。

其次，Polygon 使用公共检查层，在定期间隔后发布检查点（不同于 Plasma 现金中每个区块后检查点），允许侧面检查者在以批次形式发布检查点时以高速操作。这些检查点以及欺诈证明确保 Polygon 侧面链的操作安全。

## 您的项目使用 Plasma 链为以太坊提供可扩展性，Plasma 是一种协议还是原生区块链？ {#your-project-provides-scalability-for-ethereum-using-plasma-chains-is-it-a-protocol-or-a-native-blockchain-in-itself}

Polygon 网络是一个**“sidechain”**解决方案，其中以太坊主链链上资产，即所有dApps/ Tokens/主链协议可以移动/转移到 Polygon 侧链上，在需要时可以将资产提回到主链上。

## Polygon 相对于竞争者具有哪些竞争优势？ {#what-are-the-competitive-advantages-of-polygon-over-its-competitors}

### L2 扩展解决方案 {#l2-scaling-solutions}

Polygon 致力于实施去中心化的扩展。Polygon 使用定期检查点和欺诈证据。用户想要提取资产时，使用检查点来证明其资产在侧面上，而需要欺诈证据来质疑欺诈或任何坏行为和削减存储者。

其他项目也提供 L2 缩放解决方案，但有两个关键元素我们不同：

1. 首先，Polygon 不仅侧重于金融交易，而且还侧重于游戏和其他实用数据应用程序。我们还制定了全面爆发金融服务的计划，如借贷/交易代币（代币交换、利润交易等）。

2. 第二，虽然 Polygon 使用检查点进行 1 秒钟（带有 PoS 层），但许多其他解决方案可能在将侧链的每个区块推向主链时要大于以太网区块时间。

### L1 扩展解决方案 {#l1-scaling-solutions}

除此之外，Polygon 除了其它规模项目外，由于其在保持高度权力下放的同时实现规模的能力而显现出色。

更重要的是，这些可扩展性项目有一个“重新发明轮盘”问题。它们正在创建新的区块链，开发者社区、产品生态系统、技术文件和企业需要从**“抓点”**中建立。另一方面，Polygon 是一个由 EVM 启用链，拥有在以太网主链上建立的所有dApps/ 资产，可扩展性可在点击按钮时使用。

### 支付 {#payments}

我们认为，Polygon 拥有可用的优势，因为在其他解决方案中，发送者和接受者都必须创建其付款渠道。对用户来说，这非常麻烦。而在 Polygon 的底层技术中，用户不需要支付渠道，只需拥有有效以太坊地址即可接收代币。这也符合我们长期以来致力于改善用户的去中心化应用程序体验的愿景。

### 交易和金融 {#trading-and-finance}

Polygon 打算在平台上启用DEX（例如 0x）、流动性池（例如，Kyber Network）和其他类型的金融协议，如借贷协议（Dharma协议），这将允许 Polygon 用户访问各种金融化解应用程序，如DEXs、出借dApps、LP 等。

##
 Polygon 如何与其他侧链链处理方案进行比较？ {#how-does-polygon-compare-with-other-sidechain-solutions}

在 Polygon 上，所有侧面交易都由侧链上的多个机制来担保。在侧面上，由区块生产者层进行的任何交易都经过核实，并通过高度分散的检查点层指向主链。

如果在侧面链上发生任何欺诈交易，则可由检查点层检测和处理。即使在极端和极其可能的场景中，区块生产者层和检查点层两者共处，即使在当时主链上，主链也有欺诈证据，公众可以据此来质疑他们认为在侧面上欺诈交易。

如果质疑成功，则在质疑中将受到巨大的经济抑制/财政处罚，因为串联党的股份被削减。公众质疑者还得到欺诈性侧链演员的削减利润的奖励。

这使得 Polygon 成为经济上激励的侧链网络，具有高度的权力下放和侧链交易安全性。

Polygon 侧链的容量和TPS 也远远高于其他解决方案。特别是当 Polygon 可以拥有数千个交易时，而其他则是单边链接，其上限较高，上限为数千个交易。

## 通过将添加哪些原则？是否对私营公司本地侧面经营者有任何特殊要求？ {#via-what-principles-will-new-sidechains-be-added-will-there-be-any-special-requirements-for-private-companies-local-sidechains}

相对状态通道而言，Plasma 是比扩容框架更好的替代性方案，主要得益于 Plasma 框架提供的安全性保证 - 简言之，无论发生任何情况，用户都不会蒙受资金损失。当然，提款过程可能会发生延误，但 Plasma 网络中的操作者既不能凭空造钱，也不能进行“双花”交易。

未来，Polygon 将致力成为完全开放和公有的区块链基础设施，主要通过经济激励/投票抑制来驱动系统的安全性和稳定性机制。任何人都应该能够加入这个系统，并参与共识。但在网络种子阶段，最初 Polygon 必须发挥更大的作用，以启用侧链链。

此外，Polygon 侧链将主要用于公共侧链，即可供任何人使用，与其他公共区块链一样。然而，企业 Polygon 链将打算为特定组织提供专用侧面链（启用的不隐私）。使用主链上的检查点层和欺诈证明，将保持此类链的安全和权力下放的完整。

## 侧链也会与主链 (以太机链) 同步吗？ {#will-sidechains-also-be-synced-with-the-main-chain-ethereum}

一点儿没错。公共检查点层将验证在侧面链上发生的所有交易，并将证明发布到主链上。为了确保侧链交易的无端安全，主链 Plasma 合约包含各种欺诈证明，在其中，任何侧链交易都可以质疑任何欺诈活动。如果挑战者成功，参与欺诈的侧链链行为者将被削减，转交给挑战者。这等价于运行高利害关系虫奖励。了解的良好图表如下：

![屏幕截图](../../static/img/matic/Architecture.png)

## 在本白皮书结束之处，列出了一系列“潜在用例” - 所有这些用例都会得到实施吗？按照什么顺序？ {#at-the-end-of-the-white-paper-there-is-a-list-of-potential-use-cases-will-all-of-that-be-implemented-in-what-order}

基本逻辑是 -- -- 如果存在正在使用以太机的dApp/协议，但受低交易流量和高交易费限制 -- -- 那么我们将能够在 Polygon 网络上增加对这些dApps/协议的支持。

## 为什么复制 Polygon 的 Plasma 实施存在困难？ {#why-will-it-be-difficult-to-replicate-polygon-s-plasma-implementation}

虽然它更多地涉及网络效应，其内容是网络能够比其他网络更大地扩展/种植生态系统，但区块链解决方案必须是开放源码的，因为它们涉及到他们使用的实际资产。

所有开放源项目都属于这样。这对于我们以及其他竞争对手的实施都同样适用，因为我们将取得 GPL 许可。在该许可的要求下，任何使用我们的实施的人必须开放他们的代码。但再次，重点是复制代码甚至适用于 Bitcoin、Ethereum 和其他任何项目，更详细地介绍一个项目可以实现的网络效果。

## Polygon Network 的 Plasma 实施有什么特别之处？ {#what-s-special-about-polygon-network-s-plasma-implementation}

Polygon plasma 使用基于账户的模型系统，而不是使用 UTXO 系统。这为我们提供了在 Polygon 链上使用 EVM 的一个巨大优势，使我们能够使用 Polygon 网络的整个以太阳系生态系统、开发者工具、集成库等。

dApps 可以使用 Polygon 网络，而无需更改其 ERC20 代币。此外，我们的检查点点层允许我们比其他 Plasma 实施的速度快，因为我们批发检查点中单个区块的证明，而其他 Plasma 实施必须将每个区块证明提交到主链。

## 如何解决中心化的问题？ {#how-are-you-going-to-solve-the-issues-with-centralization}

下面的图表可以为您提供一些背景信息：

![屏幕截图](../../static/img/matic/Merkle.png)

因此，首先，PoA 节点将为代表（带有解决能力证明，即必须存储大量的质疑），而KYC 基本上由 PoS 层选择，就像 EOS 样式授权分析证据（DPOS）或授权的拜占庭过失公差（DBFT）节点一样。

第二，假设所有代表（或其2/3）转向坏行为者并产生有故障的区块，然后您拥有 PoS 层存档者，负责验证所有区块，如果发生欺诈，代表资产将被削减，检查点将停止进行纠正行动。

第三，可以说，即使是Staker PoS 层（将为大量节点）也会发生坏事，串通产生错误检查点，即所有 PoA 都腐败， PoS 腐败。即使在那时，我们遵循 Plasma 哲学，也在编写令人厌倦的sidechain 缩放标量的东西之一，这些**证据**正在受到许多大项目监视（观众可以看作是我们的存储点监视者）。该欺诈证明机制使公众能够质疑主链上的交易，以太阳能。

## 为什么需要 Matic 代币？ {#why-is-matic-token-required}

以下原因加强了使用 MATIC 代币的必要性：

### Polygon 打算成为公共区块链的通用缩放解决方案 {#polygon-intends-to-be-a-general-purpose-scaling-solution-for-public-blockchains}

我们正在以太机组开始，作为我们的第一条基本链接，但在未来的 Polygon 上可以部署在多个基链上。我们很快会增加其他基石链，因此，用某一种货币（以太币）来支付侧链费用是不合理的。如果存在对任何基本链接的未来存在关注，那么将基链的货币作为 Polygon 的本生资产将削弱缩放网络。因此，将权益持有人生态系统建立在 Polygon 自己的网络代币之上很重要。

### Appcoin 安全模型 {#appcoin-security-model}

Polygon 打算利用 Kyber 这样的流动性资金池制造代币互换机制，通过该机制，Dapp 就可以用 Dapp-coin 来支付 Polygon 费用。用户只需使用其dApp-硬币支付费用，在背景下，将dApp-硬币换成 MATIC 代币。因此，希望提供无缝用户体验的 DApp 开发人员将帮助维护 Polygon 的流动性资金池。

### 在新生阶段播种网络 {#seeding-the-network-in-nascent-stages}

一开始，当网络几乎没有任何交易时，实际上不可能对系统进行播种，因为我们无法将以太币分配给高度去中心化的验证者层和区块生成者。不过，有了 Matic 代币，我们已经计提了很大比例的代币，用于向种子区块生产者、检查点权益持有人分发，并用于随后提供区块奖励。这部分拨备确保了即便 Polygon 网络需要花上一些时间来体现网络效果，权益持有人也能获得奖励。这类似于比特币对挖矿奖励的保留，因为权益持有人和区块生产者可以通过这种方式获得激励，以确保网络安全。

如果您的担心在于开发者，我们的战略支柱之一就是将开发者的进入门槛维持在非常低的水平。我们已经确保 Polygon 上的所有以太坊开发工具均开箱即用。在支付测试网上费用所需的代币上，对以太机上开发者大楼来说，它没有区别。Dev 可以从 Polygon 流出中获得免费的代币，就像在以太阳上一样。只有在您想在 Polygon 主因网上部署时，您才需要 MATIC 代币，而在那里， gas 费用远远低于以太机组，约为您在以太机组上支付交易费的 1/100 分之一。

## 是什么驱动 Matic 代币的使用和需求？ {#what-drives-the-use-and-demand-for-matic-tokens}

Matic 代币有两种主要用途：

1. 代币用于支付网络中的交易费。
2. 代币用于进行转换，参与检查点层和区块生产层的质疑认同机制。

### 代币需求的某些次要原因 {#some-of-the-secondary-reasons-for-token-demand}

* Polygon 网络打算利用 Kyber 这样的流动性资金池制造代币互换机制，通过该机制，Dapp 就可以用 Dapp-coin 来支付 Polygon 费用。用户只需使用其dApp-硬币支付费用，在背景下，将dApp-硬币换成 MATIC 代币。因此，希望提供无缝用户体验的 DApp 开发人员将帮助维护 Polygon 的流动性资金池。

* 为了加快退出，我们正在使用 Dharma 协议实施借贷机制，经营者/放款者可以接受退出代币，并以少量收取利息来发放退出金额。一周后，出借人即可使用退出代币领取代币。借此，用户可实现近乎即时的提现，而出借人则可以通过提供的服务赚取利息。

### 在协议级烧毁代币 {#protocol-level-burning-of-tokens}

我们打算在每个区块中烧毁交易费的百分比。这使得代币通缩性质，并从协议层面上为它提供持续支持。

### 准入门槛低（从而提高快速采用的几率） {#low-entry-barrier-and-hence-higher-chances-of-quick-adoption}

我们将在很大程度上依靠 DApp 来吸引最终用户的采用。关键特征之一是，我们维持一个完全兼容于以太坊开发生态系统的结构，即所有智能合约、钱包、IDE、DevOps 工具等与 Polygon 直接兼容。

任何以太坊 Dapp 都可以移植到 Polygon，几乎无需进行任何重大更改。因此，现有以太坊开发者向 Polygon 过渡的进入障碍微不足道，可以启动病毒性的dApp 采用。由于围绕 Polygon 网络形成的网络效应，这有可能带来大量有机需求。

## 代币是否属于 ERC20？ {#is-token-type-erc20}

是的。同样的代币也将适用于 Polygon 链，即今后无需移动到本生代代币。

## 据您预计，您会为以太坊网络带来怎样的 TPS？您现在在测试网上运行什么？ {#what-is-the-expected-tps-you-ll-be-able-to-bring-to-the-ethereum-network-what-are-you-running-at-now-on-testnet}

单一的侧链交易的容量为每秒7000+。Polygon 具备添加多个侧链的能力，但目前，我们的重点将放在通过单边链接稳定网络上。
