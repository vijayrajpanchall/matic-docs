---
id: tokens
title: 代币常见问题解答
description: "Polygon Edge 代币常见问题解答"
keywords:
  - docs
  - polygon
  - edge
  - FAQ
  - tokens
---

## Polygon Edge 是否支持 EIP-1559？ {#does-polygon-edge-support-eip-1559}
目前，Polygon Edge 不支持 EIP-1559。

## 如何设置货币（代币）符号？ {#how-to-set-the-currency-token-symbol}

代币符号只涉及 UI，无法在网络中的任意位置进行配置或硬编码。当您将网络添加至 Metamask 之类的钱包时，您就可以进行更改。

## 当链停止时交易会发生什么？ {#what-happens-to-transactions-when-a-chain-halts}

所有尚未处理的交易都在 TxPool 中（已编列或提倡的队列）。如果链式停止（所有区块生产停止），这些交易将永远不会进入区块。<br/>这不仅仅是链中断时的情况。如果节点停止或重新启动，所有尚未执行且仍在 TxPool 中的交易将被默默删除。<br/>在引入突发改变时，交易会发生同样的事情，因为要重新启动节点需要。
