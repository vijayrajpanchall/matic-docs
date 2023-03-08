---
id: overview
title: 概述
description: "Polygon Edge 测试介绍。"
keywords:
  - docs
  - polygon
  - edge
  - performance
  - tests
  - loadbot
---
:::caution
请注意，用于进行这些测试的`loadbot`我们现在正在折旧。
:::

| 类型 | 价值 | 链接测试 |
| ---- | ----- | ------------ |
| 定期转账 | 1428 tps | [2022 年 7 月 4 日](test-history/test-2022-07-04.md#results-of-eoa-to-eoa-transfers) |
| ERC-20 转账 | 1111 tps | [2022 年 7 月 4 日](test-history/test-2022-07-04.md#results-of-erc20-token-transfers) |
| NFT 铸币 | 714 tps | [2022 年 7 月 4 日](test-history/test-2022-07-04.md#results-of-erc721-token-minting) |

---

我们的目标是打造一套性能高、功能丰富，并容易设置和维护的区块链客户端软件。所有测试都使用 Polygon Edge Loadbot 完成。此章节中您将发现的每份性能报告都已适当标写日期，环境已明确描述，方法也清楚解释。

这些性能测试的目标是显示 Polygon Edge 区块链网络的现实世界性能。任何人都应能够使用我们的 loadbot，在同一环境中获得与此处张贴的相同结果。

所有性能测试都在基于链的 AWS 平台上进行，该链由 EC2 实例节点组成。