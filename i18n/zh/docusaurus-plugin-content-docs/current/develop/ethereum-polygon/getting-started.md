---
id: getting-started
title: 以太坊↔Polygon 桥
sidebar_label: Overview
description: Polygon 和以太坊之间的双向交易通道。
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon 推出了具有 Plasma 和 PoS 安全性的跨链桥，从而为您提供 Polygon 和 Ethereum 之间的双向不可信交易通道。 借此，用户可以跨 Polygon 转移代币，而不会产生第三方风险和市场流动性限制。 **Plasma和PoS Bridge在Mumbai Testnet和 Polygon Mainnet上都可获得。**

**Polygon 桥梁提供了一个接近即时、低成本和相当灵活的过渡机制。**Polygon 采用双共识架构（Plasma + Proof-of-Stake (PoS) 平台）
优化速度和权力下放。我们构建该系统，旨在支持侧链上的任意状态转换，而这些侧链支持 EVM。

**过桥时，您代币的流通供应量不会发生变化**；

- 离开以太坊网络的代币被锁定，在 Polygon 上将相同数量的代币作为一个串联代码（1:1）在上面进行排雷。
- 要将代币移回以太坊网络，则 Polygon 网络上的代币将被烧毁，同时以太坊网络上的代币将被解锁。

## PoS 与 Plasma 的对比 {#pos-vs-plasma}

|                                      | PoS 桥（推荐） | Plasma 桥 |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **简短介绍** | DApp 开发者寻求灵活性和更快提取 POS 系统安全性的提取。 | 去中心化应用的开发者希望通过 Plasma 退出机制增强安全性保障\。 |
| **结构** | 高度灵活 | 严格死板，不太灵活 |
| **存入\（以太坊 → Polygon\）** | 22-30 分钟 | 22-30 分钟 |
| **提取\（Polygon → 以太坊\）** | 1 检查点 = ~ 30 分钟至 6 小时 | 调用以特约姆的合约上的流程退出程序 |
| **安全性** | Proof\-of\-Stake 系统，由一组强大的外部验证程序提供保护\。 | Polygon 的 Plasma 合约搭载了以太坊的安全性。 |
| **支持标准** | ETH、ERC20、ERC721、ERC1155 等 | 仅 ETH、ERC20、ERC721 |

:::info

[**FxPortal**](/develop/l1-l2-communication/fx-portal.md) 是与 PoS 桥非常相似的另一类桥梁。它们拥有上表中提到的 PoS 特性。唯一的区别是，在进行桥接之前，不需要在 FxPortal 桥上映射。映射发生在为给定代币启动的第一次存款交易中。此外，任何人都可以使用 FxPortal 来在 Polygon 桥上建立自己的自定义隧道/桥梁。高度建议使用 FxPortal 来进行任何过渡使用。在2023年1月31日后，将阻止在 PoS and Plasma 上发布新的代币映射，以便映射过程完全分散和灵活。

:::

## 其他资源 {#additional-resources}

- [区块链桥介绍](https://ethereum.org/en/bridges/)
- [什么是跨链桥](https://www.alchemy.com/overviews/cross-chain-bridges)
