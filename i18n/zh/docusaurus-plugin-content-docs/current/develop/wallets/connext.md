---
id: connext
title: 使用 Connext 跨链转账
description: 在 polygon 上构建您的下一个区块链应用程序。
keywords:
  - docs
  - matic
  - connext
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Connext 是一个跨链流动性网络，可支持 EVM 兼容链和以太坊 L2 系统之间的快速、完全非托管型交换。

以太坊正在走向多链。随着 EVM 兼容链和 L2 的日益普及，生态系统内的流动性碎片化带来了新的挑战。Connext 通过将每条链上的离散流动性池连接到一个全局网络来解决这一问题，而无需为用户引入新的、重要的信任考虑因素。开发者可利用流动性在 Connext 上构建新型原生隐式区块链去中心化应用程序。

在高层次上，Connext 允许用户通过条件转账的方式将链 A 上的资产 A 交换为链 B 上的资产 B。简单几步即可实现：

Alice 作为 Connext 用户将资产 A 有条件转账给 Bob。Bob 是流动性提供者（又称路由器），向 Alice 发送等量的资产 B。Alice 解锁条件转账以接收资产 B，这样反过来也允许 Bob 做同样的事情。路由器构成网络骨干，对不同的链提供流动性并赚取费用。您可以访问我们的 Protocol Primer 来了解如何无需信用实现这些。

要在浏览器 dApp 中设置从以太坊进行转账转账到 Polygon Mumbai 测试网的交叉链转账，请通过此[指南。](https://docs.connext.network/quickstart-polygon-matic-integration)
