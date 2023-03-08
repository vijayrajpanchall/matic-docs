---
id: validator-index
title: 验证者索引
description: 在 Polygon 网络上运行和操作验证者节点的指示收集
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip 掌握最新信息

通过订阅 [Polygon 通知](https://polygon.technology/notifications/)，跟上 Polygon 团队和社区的最新节点和验证者更新。

:::

验证者是维护 Polygon 网络的关键角色。验证者运行一个完整的节点，并通过以下方式来确保
网络安全：质押 MATIC 代币以生成区块，进行验证以及参与 PoS 共识。

:::info

接受新验证者的空间有限。仅当当前活动的验证者解除绑定时，新的验证者才能加入活动集。

将推出新的验证者更换拍卖程序。

:::

## 概述 {#overview}

Polygon 由以下三层组成：

* 以太坊层 — 以太坊主网上的一系列合约。
* Heimdall 层 — 一组与以太坊主网平行运行的权益证明 Heimdall 节点，监控部署在以太坊主网上的一组质押合同，并将 Polygon 网络检查点提交给以太坊主网。Heimdall 基于 Tendermint。
* BOR 层 — 由 Heimdall 节点打乱的一组生成区块的 BOR 节点。BOR 节点基于 Go 以太坊。

要想成为 Polygon 网络的验证者，则必须运行：

* Sentry 节点 — 运行 Heimdall 节点和 Bor 节点的单独机器。sentry 节点对 Polygon 网络上的所有节点开放。
* 验证者节点 — 运行 Heimdall 节点和 Bor 节点的单独机器。验证者节点仅对其 sentry 节点开放，而对网络的其余节点均不开放。
* 将 MATIC 代币质押于以太坊主网上所部署的质押合约中。

## 组件 {#components}

### Heimdall {#heimdall}

Heimdall 执行以下操作：

* 监控以太坊主网上的质押合约。
* 验证 Bor 链上的所有状态转换。
* 将 Bor 链状态检查点提交到以太坊主网。

Heimdall 基于 Tendermint。

:::info 另见

* GitHub 存储库：[Heimdall](https://github.com/maticnetwork/heimdall)
* GitHub 存储库：[质押合约](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* 博客帖子：[Heimdall 和 Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

### BOR {#bor}

Bor 执行以下操作：

* 在 Polygon 网络上生成的区块。

Bor 是 Polygon 网络的区块生产者节点和层。它基于Go Ethereum。在 Bor 上生成的区块均由 Heimdall 节点验证。

:::info 另见

* GitHub 存储库：[Bor](https://github.com/maticnetwork/bor)
* 博客帖子：[Heimdall 和 Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

本节将指导您完成以下主题：

* [验证者职责](validator-responsibilities.md)
* 作为验证者加入网络：
  * [用 Ansible 来启动和运行节点](run-validator-ansible.md)
  * [用二进制文件来启动和运行节点](run-validator-binaries.md)
  * [作为验证者去进行质押](validator-staking-operations.md)
* 维护您的验证者节点：
  * [更改签名者地址](change-signer-address.md)
  * [更改佣金](validator-commission-operations.md)

社区帮助：

* [Discord](https://discord.com/invite/0xPolygon)
* [论坛](https://forum.polygon.technology/)
