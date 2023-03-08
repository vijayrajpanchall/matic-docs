---
id: validator-node-system-requirements
title: 系统要求
description: 运行验证者节点的系统要求
keywords:
  - docs
  - matic
  - polygon
  - prerequisites
  - requirements
slug: validator-node-system-requirements
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

本节中列出的系统要求既适用于 [sentry](/docs/maintain/glossary.md#sentry) 节点，也适用于[验证者](/docs/maintain/glossary.md#validator)节点。

**最低**系统要求意味着您可以运行节点，但当前设置不支持之后版本的系统。

**推荐**的系统要求意味着该节点支持之后版本的系统。然而，在节点前瞻性这方面是没有上限的。

您必须始终在不同的机器上运行 sentry 节点和验证者节点。

## 最低系统要求 {#minimum-system-requirements}

* 内存：32 GB
* CPU：8 核
* 储存：2.5 TB SSD

:::info

对于亚马逊网络服务 (AWS) 而言，**m5d.2xlarge** 或 **t3.2xlarge** 就相当于最低要求的实例，它们均选择了无限制的信用卡。

对于存储，请确保2.5 TB SSD 存储可以延伸。

:::

## 推荐的系统要求 {#recommended-system-requirements}

* 内存：64 GB
* CPU：16 核
* 储存：5 TB SSD
* 带宽：1 Gbit/s

:::info

对于亚马逊网络服务 (AWS) 而言，**m5d.4xlarge** 就相当于推荐要求的实例。

对于 OVH 而言，**infra-3** 就相当于推荐要求的实例。

在网络这方面，预计每月传输 3-5 TB 的数据。

:::
