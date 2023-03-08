---
id: covalent
title: 使用 Covalent
sidebar_label: Covalent
description: 了解如何使用 Covalent 面向数据的统一 API
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## 简介 {#introduction}

Polygon 为以太坊带来了巨大规模，它使用带有 PoS 侧链的
Plasma 改编版，为实现更快和
极低成本的交易提供了解决方案，并最终确定了主链。Polygon 网络
使用推送到以太坊主链的 PoS 检查点来确保活力。
这使得单条 Polygon 侧链理论上可以实现每个区块 `2^16` 笔交易，
未来可能在多个链上实现数百万笔交易。

### 事实速览 {#quick-facts}

<TableWrap>

| 资产 | 价值 |
|---|---|
| Polygon 主网 chainId | `137` |
| Polygon Mumbai 测试网 chainId | `80001` |
| Polygon Blockchain Explorer | https://polygonscan.com/ |
| 区块时间 | ~3 秒 |
| 数据刷新延迟 | ~6 秒 或 2 个区块 |

</TableWrap>

:::tip 快速入门

查看**[<ins>本介绍视频</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)**
以开始使用。

:::

## 支持的端点 {#supported-endpoints}

Matic 主网和 Mumbai 测试网支持所有 [__Class A__](https://www.covalenthq.com/docs/api/#tag--Class-A) 端点。您可以通过统一 API 查询任一网络，方法是更改 `chainId`。

:::info 端点

您可以使用 Covalent 在 Polygon 网络上执行的所有请求的完整列表
在[<ins>Covalent API 文档</ins>](https://www.covalenthq.com/docs/api/)中可以获得。

:::

---

## 附录 {#appendix}

### Matic 燃料代币 {#matic-gas-token}

要与 Matic 网络交互，需要支付 MATIC 代币作为燃料费。 Covalent 的
响应会自动返回 MATIC 单位中的 `gas_*` 字段。

### 代币映射 {#token-mapping}

Covalent 可在以太坊主网和 Matic 链之间维护代币地址的链上实时映射。 这些地址用于在 Matic 上反向查询价格，并返回正确的代币徽标 URL。

已映射代币的一些示例：

| 代币 | 以太坊主网 | Matic 主网 |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### 代币价格 {#token-prices}

对于映射回以太坊主网的代币，Covalent 能够返回已映射的价格。
