---
id: polygon-architecture
title: Polygon PoS 架构
description: 包括 Heimdall 及 Bor 链在内的 Polygon  PoS 架构
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - pos
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Polygon PoS 架构 {#polygon-pos-architecture}

Polygon 网络是一个区块链应用平台，提供混合权益证明和 Plasma 支持的侧链。

在结构上，Polygon 的美丽是其精良设计，它包含一个通用验证层，与不同执行环境分开，如全面爆发的 EVM 侧面链和其它第二层处理方法（如零知识卷宗）。

为了在我们的平台上启用 PoS 机制，以太坊上部署了一组**质押**管理合同，以及一组负责运行 **Heimdall** 和 **Bor** 节点的验证人（以换取激励）。以太坊是 Polygon 支持的第一种基石链，但 Polygon 打算根据社区建议和共识为其他基石链提供支持，以实现可互操作的去中心化 L2 区块链平台。

Polygon PoS 具有三层架构：

1. 以太坊质押智能合约
2. Heimdall（权益证明层）
3. Bor（区块生产者层）

<img src={useBaseUrl("img/matic/Architecture.png")} />

### Polygon 智能合约（以太坊上） {#polygon-smart-contracts-on-ethereum}

Polygon 维护着以太坊上的一组智能合同，可处理以下事项：

- 权益证明层的质押管理
- 授权管理，包括验证者共享
- 侧链状态的检查点/快照

### Heimdall（权益验证验证者层） {#heimdall-proof-of-stake-validator-layer}

**Heimdall** 是 PoS 验证者节点，它与以太坊上的质押合同协同工作，实现 Polygon 上的 PoS 机制。我们已经通过在 Tendermint 共识引擎的基础上对签名方案和各种数据结构进行更改，实施了这一点。它负责区块验证、选择区块生产者委员会、对侧链区块表示进行检查并提交至我们架构中的以太坊，以及各种其他职责。

Heimdall 层负责将 Bor 生成的区块聚合到 Merkle 树中，并定期将 Merkle 根发布到根链。这些定期发布被称为 `checkpoints`。对于 Bor 上的每几个区块，都会由一个 Heimdall 层上的验证者：

1. 验证自上一个检查点以来的所有区块
2. 创建区块哈希的 merkle 树
3. 将 merkle 根发布到主链

检查点非常重要，原因有二：

1. 在根链上提供最终性
2. 提供提现资产时的烧毁证明

从全局来看，这一过程可理解为：

- 从池中选择一个活跃验证人子集作为一个 span 的区块生产者。每个 span 的选择还需经过不少于三分之二的投票人的同意。这些区块制作者负责创建区块，并将区块转播到剩余网络。
- 检查点包含在任何给定时间间隔内创建的所有区块的根。所有节点都对其进行验证，并将签名附加到其上。
- 来自验证者集合的选定提议者负责收集特定检查点的所有签名，并在主链上进行相同的操作。
- 创建区块和提案检查点的责任取决于验证者在整个池中权益占比。

### Bor（区块生产者层） {#bor-block-producer-layer}

Bor 是 Polygon 的区块生产者层 - 负责将交易聚合为区块的实体。

区块生产者经 Heimdall 上的委员会选举产生，并定期进行混洗，在 Poligon 中，这个间隔期被称为`span`。区块是在 **Bor** 节点上生产的，VM 侧链与 EVM 兼容。Bor 上生成的区块也由 Heimdall 节点定期进行验证，并由 Bor 上的一组区块的 merkle 树哈希组成的检查点定期提交到以太坊。

### 进一步阅读 {#further-reading}

- [使用 Polygon 节点提供者进行建设](https://www.alchemy.com/overviews/polygon-node)
- [深度转入 Polygon 结构](https://101blockchains.com/polygon-architecture/)

### 资源 {#resources}

- [BOR 架构](https://forum.polygon.technology/t/matic-system-overview-bor/9123)
- [Heimdall 架构](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
- [检查点机制](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
