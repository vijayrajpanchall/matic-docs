---
id: getting-started
title: PoS 桥
sidebar_label: Introduction
description: Polygon PoS 灵活性更强，提现速度更快。
keywords:
  - docs
  - matic
  - pos bridge
  - deposit
  - withdraw
  - mapping
  - state sync
image: https://matic.network/banners/matic-network-16x9.png
---

请查看 [PoS 上的最新 Matic.js 文档](../matic-js/get-started.md)，以便快速入门。

桥接本质上是一组合约，可帮助将资产从根链转移到子链。主要有两种桥接可用于在以太坊和 Polygon 之间转移资产。第一个是 Plasma 桥，第二个是称为 **PoS** 桥或**质素证明。****Plasma 桥** 可通过 Plasma 退出机制提供增强的安全保障。

但子代币存在特定的限制，Plasma 桥从 Polygon 到以太坊的所有退出/提取只有 7 天提现期。

这对于需要某种**灵活性**以及**更快提取速度**的去中心化应用程序/用户而言相当痛苦，他们需要 Polygon PoS 桥通过一组稳健的外部验证者来作出一定程度的安全保障。

基于权益证明  (PoS) 的资产可以通过一个检查点间隔来提供 PoS 安全性以及更快的退出。

## PoS 桥使用步骤 {#steps-to-use-the-pos-bridge}

在进入文件的这[一](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/)节之前，它可以帮助了解您在尝试使用桥梁时将与他们互动的某些术语[。](https://docs.polygon.technology/docs/pos/state-sync/state-sync/)

然后，使用 PoS 桥的第一步是绘制**根点和****儿童点上标记。**这意味着，根链上的代币合约和子链上的代币合约必须保持连接（称为制图），以便在它们之间转账。如果您有兴趣提交映射请求，请使用[此指南](/docs/develop/ethereum-polygon/submit-mapping-request/)进行此操作。

在较低级别上，更详细的，会发生以下情况：

### 存入 {#deposit}

  1. 资产 **(ERC20/ERC721/ERC1155)** 代币的拥有者必须批准 PoS 桥上的特定合约才能完成拟转账代币数量的支付。该特定合约被称作是 **Predicate 合约**（部署在以太坊网络上），它实际上可以**锁定拟存入的代币数量**。
  2. 批准完成后，接下来的步骤是**存入资产**。必须对`RootChainManager`合约进行函数调用，从而在 Polygon 链上触发合`ChildChainManager`约。
  3. 这一步骤可通过状态同步机制实现，具体详情请查看[此处](/docs/pos/state-sync/state-sync/)。
  4. `ChildChainManager`内部调用子代币合约的`deposit`功能，并将相应数量的资产代币**转入用户账户。**必须注意，只有用户`ChildChainManager`才能访问在子代币合约上使用`deposit`函数。
  5. 用户在取得代币后**可在 Polygon 链上即时转账，产生的费用可忽略不计**。

### 提现 {#withdrawals}

  1. 将资产提回到以太坊（Ethereum）是一个分两步过程，在这个过程中，资产代币必须**首先在 Polygon 链上烧毁**，然后在以太坊链上**提交此燃烧交易证明**。
  2. 从燃烧交易到以太坊链上设立检查点大约需要耗费 20 分钟到 3 小时。该操作由权益证明验证者完成。
  3. 一旦交易添加到检查点，可通过调用函数在以特勒姆的`RootChainManager`合约上提交销毁交易证明`exit`。
  4. 该函数调用**可验证检查点内容**，然后触发在初次存入资产时已锁定资产代币的 Predicate 合约。nr
  5. 作为最后步骤，**上游合约释放锁定的代币**，并将它们退回以太机上的用户账户。

:::tip

在映射完成后，您可以使用 **Matic.js SDK** 与合约互动，或者不使用 SDK 也可以实现相同的操作。然而，Matic.js SDK 的设计理念是用户友好，因此资产转移机制可方便地与任何应用程序集成。

:::