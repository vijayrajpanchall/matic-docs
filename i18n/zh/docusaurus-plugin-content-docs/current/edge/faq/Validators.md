---
id: validators
title: 验证者常见问题解答
description: "Polygon Edge 验证者常见问题解答"
keywords:
  - docs
  - polygon
  - edge
  - FAQ
  - validators

---

## 如何添加/删除验证者？ {#how-to-add-remove-a-validator}

### POA {#poa}
添加/删除验证者可通过投票完成。您可以在[这里](/docs/edge/consensus/poa)找到完整的指南。

### PoS {#pos}
您可以在[这里](/docs/edge/consensus/pos-stake-unstake)找到如何质押资金，以便 NODE 成为验证者的指南，以及如何取消质押（删除验证者）的指南。

请注意：
- 您可以使用基因标志 `--max-validator-count`来设置可加入验证者集的最大数量的质押者。
- 您可以使用基因标志`--min-validator-count `来设置加入验证者集所需的最低数量的质押者（`1`默认情况下）。
- 当达到最大验证者编号时，您无法添加另一个验证者，直到您从集合中删除现存的验证者（如果新集的质押量更高，则无关紧要）。如果您删除验证者，剩余的验证者数量不能低于`--min-validator-count`。
- 有成为验证者原生网络(燃料)货币的`1`单位的默认阈值。



## 为验证者建议多少磁盘空间？ {#how-much-disk-space-is-recommended-for-a-validator}

我们建议从 100G 开始作为保守估计的运行道，并确保之后可以扩展磁盘。


## 验证者数量是否有限制？ {#is-there-a-limit-to-the-number-of-validators}

如果我们谈论技术限制，Polygon Edge 没有明确地表示对网络中可以拥有的节点数量有上限。您可以根据每个节点设置连接上限（内部/外界连接数）。

如果我们谈论实际限制，您可以看到有 100 个 NODE 集群的性能比有 10 个 NOD E集群的性能更退化。通过增加集群中的节点数量，您可以增加通信复杂性，这仅仅是一般的网络间接费用。所有这一切都取决于您正在运行的网络，以及您拥有的网络拓扑类型。

## 如何从 POA 切换到权益证明 (PoS)？ {#how-to-switch-from-poa-to-pos}

POA 是默认共识机制。对于新集群，要切换到权益证明 (PoS)，生成基因文件时您需要添加`--pos`标志。如果您有运行集群，您可以在[这里](/docs/edge/consensus/migration-to-pos)找到如何切换的方法。您需要的所有有关共识机制和设置的信息都可以在我们的[共识章节](/docs/edge/consensus/poa)中找到。

## 当有更改时，我如何更新我的 NODE？ {#how-do-i-update-my-nodes-when-there-s-a-breaking-change}

您可以在[这里](/docs/edge/validator-hosting#update)找到如何完成此程序的指南。

## 权益证明 (PoS) 边缘的最小质押量是否可配置？ {#is-the-minimum-staking-amount-configurable-for-pos-edge}

默认最小质押量是`1 ETH`，而且不能配置。

## 为什么 JSON RPC 命令`eth_getBlockByNumber`和`eth_getBlockByHash`无法返回矿工的地址？ {#not-return-the-miner-s-address}

Polygon Edge 目前使用的共识是IBFT 2.0，而它又建立在 Clique PoA 中解释的投票机制基础上：[ethereum/EIPs#225](https://github.com/ethereum/EIPs/issues/225)。

查看 EIP-225 (Clique POA)，这是解释    `miner`(aka`beneficiary`) 用于何种内容的相关部分：

<blockquote>我们重新定位了核心算法字段，如下所示：<ul>
<li><b>受益者/矿工： </b>提议更改授权签名者列表的地址。</li>
<ul>
<li>应正常填充零点，只在投票时才修改。</li>
<li>然而，任意值（甚至无意义的值，例如投票淘汰非签字者）仍然可以使用，以避免围绕投票机制实施中的额外复杂性。</li>
<li>必须填充检查点（即 epoch 过渡）区块上的零点。</li>
</ul>

</ul>

</blockquote>

因此， `miner`字段用于提议某地址的投票，而不是显示区块的提案者。

可通过从区块标题中 RLP 编码的 Istanbul 额外数据段的密封字段中回收公钥来找到区块提案者的信息。

## 可以安全修改 Genesis 哪些部分和值？ {#which-parts-and-values-of-genesis-can-safely-be-modified}

:::caution

请确保在试图编辑之前创建现有基因组件副本。此外，在编辑基因组件.json 文件之前，必须停止整个链条。在修改genesis 文件后，其更新的版本必须分配到所有非验证者节点和流失者节点。

:::

**只有基因文件的启动节点部分才能安全修改，**您可以在此上添加或删除启动节点，从列表中删除。