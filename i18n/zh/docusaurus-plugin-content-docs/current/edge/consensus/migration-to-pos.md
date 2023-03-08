---
id: migration-to-pos
title: 从 PoA 转移至 PoS
description: "如何从 PoA 转移到 PoS IBFT 模式，反之亦然。"
keywords:
  - docs
  - polygon
  - edge
  - migrate
  - PoA
  - PoS
---

## 概述 {#overview}

该板块指导您从 PoA 转换到 PoS IBFT 模式，反之亦然，用于运行集群 - 无需重新设置区块链。

## 如何迁移到 PoS {#how-to-migrate-to-pos}

您需要停止所有 NODE，通过 `ibft switch` 指令，将分叉配置添加至 genesis.json，然后重新启动 NODE。

````bash
polygon-edge ibft switch --chain ./genesis.json --type PoS --deployment 100 --from 200
````
:::caution 使用 ECDSA 时切换
使用 ECDSA 时，必须将`--ibft-validator-type`标志添加到交换上，提及使用 ECDSA 。如果未包括，Edge 会自动转换为 BLS。

````bash
polygon-edge ibft switch --chain ./genesis.json --type PoS --ibft-validator-type ecdsa --deployment 100 --from 200
````
:::要转换到 PoS，您需要指定 2 个区块高度`deployment`：而 . 是部署主修合约的高度，`from`也是 PoS `from``deployment`开始的高度。质押合约会在地址`0x0000000000000000000000000000000000001001`和`deployment`部署，和预部署合约类似。

请查看[权益证明](/docs/edge/consensus/pos-concepts)了解更多有关质押合约的内容。

:::warning 验证者需要手动质押

每个验证者都需要在`deployment`部署合约后，在`from`前部署，只有这样才能在权益证明之初成为验证者。每个验证者都需要根据权益证明开始时在质押合约中的设置更新自身的验证者设定。

要了解更多有关搜索的详细信息，请访问“**[设置”和使用“利害关系方证明](/docs/edge/consensus/pos-stake-unstake)**”。
:::
