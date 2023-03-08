---
id: types
title: 类型
description: 对 Polygon Edge 类型模块的解释。
keywords:
  - docs
  - polygon
  - edge
  - architecture
  - module
  - types
  - marshaling
---

## 概述 {#overview}

**类型**模块实现核心对象类型，例如：

* **地址**
* **哈希**
* **头部**
* 大量 Helper 功能

## RLP 编码/解码 {#rlp-encoding-decoding}

与 GETH 等客户端不同，Polygon Edge 编码时不使用反射<br />。首选是不使用反射，因为它引入了新问题，例如性能、退化，在扩容上也更难。

**类型**模块使用 Fast RLP 包，在 RLP 列集和散集时提供简单易用的界面。

通过 *MarshalRLPWith* 和 *MarshalRLPTo* 方式完成列集。散集也存在类似方法。

通过手动定义这些方式，Polygon Edge 不需要使用反射。在 *rlp_marshal.go* 中，您可以找到列集方式：

* **主体**
* **区块**
* **头部**
* **回执**
* **日志**
* **交易**