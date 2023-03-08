---
id: faq
title: 常见问题解答
sidebar_label: FAQ
description: 有关 Polygon Avail 的常见问题
keywords:
  - docs
  - polygon
  - avail
  - availability
  - client
  - consensus
  - faq
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: faq
---

# 经常询问的问题 {#frequently-asked-questions}

:::tip

如果您在这个页面上找不到问题，请在 **[<ins>Polygon 阿维尔 Discord 服务器</ins>](https://discord.gg/jXbK2DDeNt)**上提交问卷。

:::

## 什么是轻量级客户端？ {#what-is-a-light-client}

轻型客户端允许用户与区块链网络互动，而无需同步整个区块链，同时保持权力下放和安全性。一般来说，他们下载区块链标题，但不包括每个区块的内容。Avail (DA) 轻型客户端还通过执行数据可用取样来验证区块内容是否可用，这是下载区块中小随机部分的技术。

## 轻量级客户端的常见用例有哪些？ {#what-is-a-popular-use-case-of-a-light-client}

现在有许多使用案例依赖中间人来维持完整节点，因此区块链的最终用户不会直接与区块链通信，而是通过中间人通信。光客户端直到现在还没有适合替换该架构，因为他们缺乏数据可用担保。Avail 解决了这个问题，从而使更多的应用程序能够在没有中间人的情况下直接参与区块链网络。尽管 Avail 确实支持完整节点，但我们预计大多数应用程序将不需要运行一个，或者需要运行更少。

## 什么是数据可用性采样？ {#what-is-data-availability-sampling}

与其他轻型客户一样，使用轻型客户端只下载区块链的头头。然而，他们额外执行数据可用性取样：一种随机抽样抽样并验证区块数据的小部分正确的技术。当结合去除编码和 Kate 多项式承诺时，Avail 客户端可以提供强有力的（近100%）可用担保，而不依赖欺诈证明，只提供少量经常查询。

## 如何利用纠删码来提高数据可用性保障？ {#how-is-erasure-coding-used-to-increase-data-availability-guarantees}

Erasure 编码是一种编码数据的技术，它将信息散发在多个“shard”上，这样一些流失可以容忍。也就是说，信息可以从其他shard 中重建。用于区块链，这意味着我们有效地增加每个区块的规模，但我们阻止恶意行为者将区块的任何部分隐藏在多余的区块大小上。

由于恶意行为体需要隐藏大量区块，以试图隐藏甚至隐藏一次交易，因此随机抽样更有可能捕捉数据中的巨大空白。实际上，删除编码使数据可用的取样技术更有力。

## 什么是 Kate 承诺？ {#what-are-kate-commitments}

Aniket Kate、Gregory M. Zaverucha和Ian Goldberg在2010年推出Kate 承诺，提供了一个以简洁的方式承诺多项式的方法。最近，多项式承诺已进入最先行，主要用于在类似 PLONK 知识零构建中作为承诺。

我们在构建中使用 Kate 承诺的原因有以下几点：

- 该方案让我们能够以简洁的方式提交数值，并将其保存在区块头中。
- 短时间开放是可能的，这有助于轻客户端验证可用性。
- 密码结合属性通过使它在计算上不可行，帮助我们避免欺诈证明产生错误承诺。

将来，我们也可能会使用其他多项式承诺方案，只要这些方案能够起到加强约束或保障的作用。

## 鉴于 Avail 被多个应用程序使用，这是否意味着这些链必须从其他链上下载交易？ {#since-avail-is-used-by-multiple-applications-does-that-mean-chains-have-to-download-transactions-from-other-chains}

编号： Avail 头部包含一个索引，允许特定应用程序仅确定和下载拥有该应用数据的区块的部分。因此，它们在很大程度上不受同时使用 Avail 或区块大小的其他链接的影响。

唯一的例外是数据可用性采样。为了验证数据是否存在（并由于删除编码的性质），客户端随机抽样抽样区块的小部分，包括包含其他应用数据的部分。
