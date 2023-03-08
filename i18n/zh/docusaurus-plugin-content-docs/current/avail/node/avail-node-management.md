---
id: avail-node-management
title: 运行 Avail 节点
sidebar_label: Run an Avail node
description: "了解如何运行 Avail 节点。"
keywords:
  - docs
  - polygon
  - avail
  - node
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: avail-node-management
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip 常见做法

用户通常在云服务器上运行节点。您可以考虑使用 VPS 提供商来运行您的节点。

:::

## 先决条件 {#prerequisites}

我们建议您的环境应具备以下标准硬件列表中的硬件规格。

最低硬件规格：

* 4 GB RAM
* 双核 CPU
* 20-40 GB 的固态硬盘

:::caution 如果您计划运行验证者

在基于 Substrate 的链上运行验证者节点的硬件建议：

* CPU - 英特尔(R) 酷睿(TM) i7-7700K CPU @ 4.20 GHz
* 存储容量 - 约 256 GB 的 NVMe 固态硬盘。应具备合理的大小，以应对区块链的增长。
* 内存 - 64 GB ECC

:::

### 节点先决条件：安装 Rust 和依赖项 {#node-prerequisites-install-rust-dependencies}

:::info Substrate 的安装步骤

Avail 是一条基于 Substrate 的区块链，所需配置与运行 Substrate 链相同。

其他安装文档可以在 Substrate 的**[入门文档](https://docs.substrate.io/v3/getting-started/installation/)**中找到。

:::

选择好运行节点的环境后，请确保已安装 Rust。如果您已经安装了 Rust，请运行以下命令，以确保您使用的是最新版本。

```sh
rustup update
```

如果您安装的不是最新版本，请先运行以下命令，获取最新版本的 Rust：

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

要配置 shell，请运行：

```sh
source $HOME/.cargo/env
```

通过以下方式来验证您是否已安装成功：

```sh
rustc --version
```

## 在本地运行 Avail {#run-avail-locally}

克隆 [Avail 的源代码](https://github.com/maticnetwork/avail)：

```sh
git clone git@github.com:maticnetwork/avail.git
```

编译源代码：

```sh
cargo build --release
```

:::caution 这一过程通常需要时间

:::

使用临时数据存储在本地运行 dev 节点：

```sh
./target/release/data-avail --dev --tmp
```
