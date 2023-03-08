---
id: query-operator-info
title: 查询运算符信息
description: "如何查询运算符信息。"
keywords:
  - docs
  - polygon
  - edge
  - node
  - query
  - operator
---

## 先决条件 {#prerequisites}

此指南假定您已遵循[本地设置](/docs/edge/get-started/set-up-ibft-locally)或[在云上设置 IBFT 集群](/docs/edge/get-started/set-up-ibft-on-the-cloud)的指南。

需要有一个功能 NODE 查询任何类型的运算符信息。

使用 Polygon Edge，NODE 运算符已控制并了解他们运行的 NODE 正在做什么。<br />在任何时候，他们都可以使用构建在 gRPC 之上的 NODE 信息层，并获得有意义的信息 - 无需日志筛选。

:::note

如果 NODE 在`127.0.0.1:8545`上没有运行，您应该添加标志`--grpc-address <address:port>`到此文档中列出的命令。

:::

## 对等体信息 {#peer-information}

### 对等体列表 {#peers-list}

要获取连接对等体列表（包括运行的 NODE 本身），请运行命令：
````bash
polygon-edge peers list
````

这将返回当前运行客户端同行的 libp2 地址列表。

### 对等体状态 {#peer-status}

关于特定同行的状态，运行：
````bash
polygon-edge peers status --peer-id <address>
````
*地址*参数是对等体的 libp2 地址。

## IBFT 信息 {#ibft-info}

运算符可能希望了解 IBFT 共识中运行 NODE 的状态。

幸运的是，Polygon Edge 提供了找到信息的简单方法。

### 快照 {#snapshots}

运行以下命令返回最新快照。
````bash
polygon-edge ibft snapshot
````
要查询特定高度（区块号）的快照，运算符运行：
````bash
polygon-edge ibft snapshot --num <block-number>
````

### 候选人 {#candidates}

要获取候选人的信息，运算符可以运行：
````bash
polygon-edge ibft candidates
````
此命令询问当前组的拟议候选人以及尚未列入的候选人

### 状态 {#status}

以下命令返回运行的 IBFT 客户端的当前验证者密钥：
````bash
polygon-edge ibft status
````

## 交易池 {#transaction-pool}

要找到交易池中当前交易的数量，运算符运行：
````bash
polygon-edge txpool status
````
