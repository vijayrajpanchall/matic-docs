---
id: backup-restore
title: 备份/恢复 NODE 实例
description: "如何备份和恢复 Polygon Edge NODE 实例。"
keywords:
  - docs
  - polygon
  - edge
  - instance
  - restore
  - directory
  - node
---

## 概述 {#overview}

此指南详细说明如何备份和恢复 Polygon Edge NODE 实例。它涵盖基础文件夹和包含的内容，以及哪些文件对执行成功备份和恢复至关重要。

## 基础文件夹 {#base-folders}

Polygon Edge 利用LevelDB作为其存储引擎。启动 Polygon Edge NODE 时，在指定的工作目录中创建以下子文件夹：
* **区块链** - 存储区块链数据
* **试行** - 存储 Merkle 试行（世界状态数据）
* **钥库 -** 存储客户端的私钥。其中包括 libp2 私钥和封装/验证器私钥
* **共识** - 存储客户端在工作时可能需要的任何共识信息。目前，它存储 NODE 的*验证者私钥*

保存这些文件夹至关重要，以便 Polygon Edge 实例顺利运行。

## 从运行的 NODE 中创建备份，并恢复新 NODE {#create-backup-from-a-running-node-and-restore-for-new-node}

此章节将指导您在 NODE 中创建区块链的存档数据，并在另一个实例中恢复。

### 备份 {#backup}

`backup`命令通过 gRPC 从运行的 NODE 中获取区块，并生成存档文件。如果命令中未给定`--from`和`--to`，该命令将获取从 genesis 到最新的区块。

```bash
$ polygon-edge backup --grpc-address 127.0.0.1:9632 --out backup.dat [--from 0x0] [--to 0x100]
```

### 恢复 {#restore}

从`--restore`标志开始时，服务器启动时从存档中导入区块。请确保新 NODE 存在密钥。要了解有关导入或生成密钥的更多信息，请参阅[密钥管理器章节](/docs/edge/configuration/secret-managers/set-up-aws-ssm)。

```bash
$ polygon-edge server --restore archive.dat
```

## 备份/恢复所有的数据 {#back-up-restore-whole-data}

本节将指导您备份数据（包括状态数据和密钥）并恢复到新实例。

### STEP 1：阻止运行的客户端 {#step-1-stop-the-running-client}

由于 Polygon Edge 使用 **LevelDB** 存储数据，NODE 在备份期间需要停止，原因是 **LevelDB** 不允许同时访问数据库文件。

此外，Polygon Edge 还会在关闭时执行数据刷新。

第一步是阻止客户端运行（或通过服务管理器或将 SIGINT 信号发送到处理过程的其他机制），因此，它可以在正常关闭时触发 2 个事件：
* 运行数据刷新到磁盘
* LevelDB 锁定的 DB 文件的释放

### STEP 2：备份目录 {#step-2-backup-the-directory}

现在客户端尚未运行，数据目录可以备份到另一媒介。请记住具有`.key`扩展的文件包含私钥数据，可用于模仿当前 NODE，并永远不应与第三方/不明当事方共享。

:::info
请手动备份并恢复生成`genesis`的文件，因此恢复的 NODE 已完全运行。
:::

## 恢复 {#restore-1}

### STEP 1：阻止运行的客户端 {#step-1-stop-the-running-client-1}

如果 Polygon Edge 的实例正在运行，需要停止，STEP 2 才能成功。

### STEP 2：将备份数据目录复制到所需文件夹 {#step-2-copy-the-backed-up-data-directory-to-the-desired-folder}

客户端在运行后，先前备份数据目录可以复制到所需文件夹。此外，还恢复先前复制`genesis`的文件。

### STEP 3：运行 Polygon Edge 客户端，同时指定正确的数据目录 {#step-3-run-the-polygon-edge-client-while-specifying-the-correct-data-directory}

为了使 Polygon Edge 使用恢复的数据目录，在启动时，用户需要指定数据目录的路径。有关`data-dir`标志的信息，请参阅[ CLI 命令](/docs/edge/get-started/cli-commands)章节。
