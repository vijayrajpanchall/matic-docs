---
id: ipfs
title: IPFS
description: "IPFS — 用于存储和访问数据的分布式系统。"
keywords:
  - IPFS
  - matic
  - docs
  - polygon
  - storage
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### 背景 {#context}

Polygon 区块链与以太坊主网相比可降低数据存储的交易成本，但在存储大型文件时，也可能迅速增加成本。开发者在链上存储数据时还必须考虑区块大小和交易速度限制。处理所有这些关注的一个解决方案是 IPFS，即行星间文件系统。

#### IPFS 什么是？ {#what-is-ipfs}

IPFS 是用于存储和访问文件、网站、应用程序和数据的分布式系统。IPFS 采用去中心化、内容寻址以及稳健的点对点积极参与者网络，允许用户再次彼此之间存储、请求和转移可验证的数据。

去中心化允许从并非由单一组织管理的多个地点下载文件，因此可提供开箱即用的弹性和避免审查的能力。

内容寻址采用加密技术，根据文件的内容而不是文件所在的位置创建唯一可验证的哈希。生成的内容标识符 (CID) 可确保某一条数据无论存储在何处都能保持相同。

最后，用户社区日益活跃，因此有可能实现内容的点对点共享。开发者上传和插入内容，而Filecoin 或 地壳存储提供者则帮助确保持续存储该内容。


基于 IPFS 的存储允许您直接存储内容的 CID，而不是将整个文件加载到 Polygon 区块链，因此可降低成本、实现更大的文件尺寸和可证明的持久存储。详细信息请参见 [IPFS 文档。](https://docs.ipfs.io/)

### 项目示例 {#example-projects}

1. 以脚手架代码进行教程，显示如何使用 IPFS 来在 Polygon 上铸造 NFT - [链接](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)

2. 使用 Next.js、Polygon、Solidity、图形、IPFS和Hardhat [建立](https://dev.to/dabit3/the-complete-guide-to-full-stack-web3-development-4g74)完整的堆栈 Web 3 应用程序
