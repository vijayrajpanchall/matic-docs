---
id: prometheus-metrics
title: Prometheus 衡量标准
description: "如何启用 Polygon Edge 的 Prometheus 衡量标准。"
keywords:
  - docs
  - polygon
  - edge
  - metrics
  - prometheus
---

## 概述 {#overview}

Polygon Edge 可以报告和服务 prometheus 衡量标准，反过来，这些衡量标准也可以使用 prometheus 收集器消费。

默认情况下， Prometheus 计量器将禁用。可以通过使用 Config 文件中的`--prometheus`[标志](/docs/edge/get-started/cli-commands#prometheus)或`Telemetry.prometheus`字段指定听众地址来启用。衡量标准将在特定地址的`/metrics`下提供。

## 可用的衡量标准 {#available-metrics}

可用以下衡量标准：

| **名称** | **类型** | **描述** |
|-------------------------------------------------|----------|---------------------------------------------|
| 代码_txplople_dication_sersicate | 线规 | TxPool 中待处理交易的数量 |
| 代码_共识验证者 | 线规 | 验证者数量 |
| 边缘化_共识_freds | 线规 | 轮数 |
| eddge_consenders_num_txs | 线规 | 最新区块中交易的数量 |
| 代码_conserment_blok_regal | 线规 | 以秒为单位，此区块和最后区块之间的时间 |
| 代码_network_peers | 线规 | 已连接对等体的数量 |
| 代码_network_outbland_connections_counts_counts_counts_counts_countscults_countsc | 线规 | 外界连接的数量 |
| 代码网络_inbland_inbland_connections_counts_counts_countscults_counts_countscults_coun | 线规 | 内部连接的数量 |
| 代码网络_dice_inball_connections_counts_countscults_countscults_countsult | 线规 | 待决外界连接的数量 |
| 代码_network_dice_dice_dice_outball_connections_counts_counts_counts_countscults_ | 线规 | 待决内部连接的数量 |
| 代码_conserence_epoch__nogle | 线规 | 当前 poch 号 |