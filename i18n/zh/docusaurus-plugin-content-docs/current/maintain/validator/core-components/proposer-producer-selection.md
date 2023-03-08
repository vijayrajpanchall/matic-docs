---
id: proposers-producers-selection
title: 提议者以及生产者的选择
sidebar_label: Proposers & Producers
description: 在 Polygon 上进行区块生产者选择( 区块)
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

根据验证者的质押金额，委员会定期从验证者池中选取出 BOR 层的区块生产者。这些时间间隔由验证者对 dynasty 和网络的治理而决定。

[质押金额](/docs/maintain/glossary.md#staking)的比例指定了被选为[区块生产者](/docs/maintain/glossary.md#block-producer)委员会成员的概率。

## 选择过程 {#selection-process}

让我们假设池子中有 3 名验证者——Alice、Bill 和 Clara：

* Alice 正在质押 100 个 MATIC 代币。
* Bill 正在质押 40 个 MATIC 代币。
* Clara 正在质押 40 个 MATIC 代币。

验证者根据质押金额来获得名额。

因为 Alice 质押了 100 个 MATIC 代币，在验证者治理维护下，每个名额的成本是 10 个 MATIC 代币，所以 Alice 总共获得 5 个名额。同理，Bill 和 Clara 总共获得 2 个名额。

Alice、Bill 和 Clara，这三名验证者获得以下名额：

* [A, A, A, A, A, B, B, C, C]

然后，Polygon 通过使用以太坊区块哈希值作为种子，对 Alice、Bill 和 Clara 名额的数组进行重组。

重组的结果是以下的名额数组：

* [A, B, A, A, C, B, A, A, C]

现在，根据验证者治理维护的生产者数量，Polygon 从从顶部选出验证者——例如，如果我们想选择 5 个生产者，名额数组是 [A、B、A、A、C]。

下一跨度的生产者集定义为 [A：3，B：1，C：1]。

通过使用生成的验证者集以及 Tendermint [提议者选择的算法](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html)，Polygon 为 Bor 层的每个 sprint 选择出一名生产者。

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**图案：**

* Dynasty：从上次拍卖结束到下次拍卖开始之间的时间。
* Sprint：选择区块生产者委员会的时间间隔。
* 跨度：单个生产者生产出的区块数量。
