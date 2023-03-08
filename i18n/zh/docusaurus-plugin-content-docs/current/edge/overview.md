---
id: overview
title: Polygon Edge
sidebar_label: What is Edge
description: "Polygon Edge 的介绍。"
keywords:
  - docs
  - polygon
  - edge
  - network
  - modular

---

Polygon Edge 是建立与以太坊兼容的区块链网络、侧链和一般性扩展解决方案的模块化和扩展框架。

其主要用途是启动新的区块链网络，同时完全与以太坊智能合约和交易兼容。它使用 IBFT（Istanbul Byzantine 容错）共识机制，支持两种类型，即 [POA（权威证明）](/docs/edge/consensus/poa)和[权益证明 (PoS)](/docs/edge/consensus/pos-stake-unstake)。

Polygon Edge 还支持与多个区块链网络的通信，通过使用[中心桥接解决方案](/docs/edge/additional-features/chainbridge/overview)，使 [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20)和 [ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721) 代币都能转让。

行业标准钱包可用于通过 [JSON-R端点](/docs/edge/working-with-node/query-json-rpc)与 Polygon Edge 交互，并且 NODE 运营商可以通过 [gRPC](/docs/edge/working-with-node/query-operator-info) 协议在 NODE 上执行各种行动。

要了解更多关于 polygon 的信息，请访问[官方网站](https://polygon.technology)。

**[GitHub 存储库](https://github.com/0xPolygon/polygon-edge)**

:::caution

这是一项正在进行的工作，因此今后可能发生架构变化。代码尚未被审计但是，如果您希望在生产中使用，请联系 polygon 团队。

:::



要开始在本地运行`polygon-edge`网络，请参阅：[安装](/docs/edge/get-started/installation)和[本地设置](/docs/edge/get-started/set-up-ibft-locally)。
