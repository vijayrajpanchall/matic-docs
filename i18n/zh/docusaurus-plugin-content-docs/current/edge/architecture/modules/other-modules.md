---
id: other-modules
title: 其他模块
description: 对 Polygon Edge 的一些模块的解释。
keywords:
  - docs
  - polygon
  - edge
  - architecture
  - modules
---

## Crypto {#crypto}

**Crypto** 模块包含加密通用功能。

## 链 {#chain}

**链**模块包含链参数（活动分叉、共识引擎等）

* **链** - 预先定义的链配置（主网、goerli、ibft）

## Helper {#helper}

**Helper** 模块包含辅助软件包。

* **dao** - Dao 效用
* **节点** - 节点编码/解码功能
* **十六进制** - 十六进制编码/解码功能
* **ipc** - IPC 连接功能
* **keccak** - Keccak 功能
* **rlputil** - Rlp 编码/解码 helper 功能

## 命令 {#command}

**命令**模块包含 CLI 命令的接口。