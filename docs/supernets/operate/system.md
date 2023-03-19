---
id: supernets-requirements
title: System Requirements
sidebar_label: System requirements
description: "How to install Polygon Supernets."
keywords:
  - docs
  - polygon
  - edge
  - install
  - installation
---

This document provides guidance on the minimum hardware requirements to run and maintain a childchain.

---

## Minimum Hardware Configuration

This is the minimum hardware configuration required to set up a childchain:

- **Processor**: At least a 4-core CPU
- **Memory**: 8 GB RAM minimum (16 GB recommended)
- **Storage**: Minimum 200 GB SSD storage (increasing storage capacity is recommended as the network grows)
- **Network**: High-speed internet connection with low latency

:::tip
The minimum storage requirements will change over time as the network grows. It is recommended to use more than the minimum requirements to run a robust full node.
:::

While we do not favor any operating system, more secure and stable Linux server distributions (like CentOS) should be preferred over desktop operating systems (like Mac OS and Windows).

> Note that these minimum requirements are based on the x2iezn.2xlarge instance type used in the performance tests, which demonstrated satisfactory performance. However, for better performance and higher transaction throughput, consider using more powerful hardware configurations, such as those equivalent to x2iezn.4xlarge or x2iezn.8xlarge instance types.
