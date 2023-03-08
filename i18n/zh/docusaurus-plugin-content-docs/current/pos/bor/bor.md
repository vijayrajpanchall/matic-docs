---
id: bor
title: BOR 架构
description: Polygon 架构中的 Bor 角色
keywords:
  - docs
  - matic
  - Bor Architecture
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# BOR 架构 {#bor-architecture}

Polygon 是一个混合 **Plasma + 验证交易（PoS）**平台。我们采用 Polygon 网络上的双共识架构来优化速度和去中心化。我们构建该系统，旨在支持侧链上的任意状态转换，而这些侧链支持 EVM。

## 架构 {#architecture}

<img src={useBaseUrl("img/Bor/matic_structure.png")}/>

区块链是一组彼此交互和协同工作的网络客户端。客户端是一种软件，能够与其他客户端建立 p2p 通信信道、签署和广播交易、部署智能合约并与智能合约交互等等。客户端通常称为节点。

对于 Polygon 来说，节点设计时使用两个层实施的 Heimdall 实施（验证者层）和 Bor(区块生产者层）。

1. Heimdall
    - 权益证明验证
    - 以太坊主链上的检查点区块
    - 验证者与奖励管理
    - 确保与以太坊主链同步
    - 去中心化桥接
2. Bor
    - Polygon 链
    - EVM 兼容 VM
    - 提案者和生产者集合选择
    - 系统调用
    - 手续费模式

## Heimdall (验证者层) {#heimdall-validator-layer}

Heimdall 全保护者（英语：Heimdall）是 Polygon 验收系统中发生的所有交易的发售者，其内容是好或坏。

Heimdall 是 Polygon 的权益证明验证者层，负责将经过检查点验证的 Plasma 区块表示提交到我们架构中的主链上。我们已经通过在 Tendermint 共识引擎的基础上对签名方案和各种数据结构进行更改，实现了这一点。

欲了解更多信息，请访问 [https://blog.matic.network/heimdall-and-BOR-matic-validator-and-block-production-layers/](https://blog.matic.network/heimdall-and-bor-matic-validator-and-block-production-layers/)。

## BOR（区块生产者层） {#bor-block-producer-layer}

BOR 节点实施本质上就是侧链运算符。侧链 VM 与 EVM 兼容。目前，它是一个基本的 Geth 实施，并对共识算法做了自定义更改。不过，它将从头开始打造，以便达到既轻量又专用的目的。

BOR 是我们的区块生产者层，与 Heimdall 同步，选择每个跨度和冲刺的生产者和验证者。Polygon 的用户交互发生在该侧链上，它与 EVM 兼容，以方便利用以太坊开发者工具和应用程序的功能和兼容性。

### Polygon 链 {#polygon-chain}

该链是一个单独的区块链，通过双向锚定连接到以太坊。有了双向锚定，资产可以在以太坊与 Polygon 之间互换。

### EVM 兼容 VM {#evm-compatible-vm}

以太坊虚拟机 (EVM) 是一个强大的沙盒式虚拟堆栈，嵌入每个完整的 Polygon 节点内，负责执行合约字节码。合约通常以更高级别的语言（例如 Solidity）编写，然后编译为 EVM 字节码。

### 提案者和生产者选择 {#proposers-and-producers-selection}

BOR 层的区块生产者是根据生产者的权益从验证者池中选出的委员会，该委员会定期开会并改组。间隔时间由验证者对朝代和网络的治理来决定。

权益质押/质押权比率规定了当选为区块生产者委员会成员的概率。

<img src={useBaseUrl("img/Bor/bor-span.png")} />

#### 选择过程 {#selection-process}

- 假设池中有 3 个验证者，他们分别是 Alice、Bill 和 Clara。
- Alice 质押了 100 个 Matic 代币，而 Bill 和 Clara 各自质押了 40 个 Matic 代币。
- 根据权益质押情况，向验证者分配槽位 (slot)。Alice 质押了 100 个 Matic 代币，所以将获得相应比例的槽位。Alice 将获得共计 5 个槽位。同样，Bill 和 Clara 分别获得 2 个槽位。
- 所有验证者将获得这些槽位 [A, A, A, A, A, B, B, C, C]
- 我们把历史以太坊区块当作种子，打乱该数组。
- 使用种子打乱槽位后，我们得到这个数组 [A, B, A, A, C, B, A, A, C]
- 现在根据生产者数量*（由验证者治理维护）*，我们从顶部选出验证者。例如，如果我们想选择 5 个生产者，我们得到生产者集合 [A, B, A, A, C]
- 因此，下一跨度的生产者集合定义为 [A: 3, B:1, C:1]。
- 我们使用该验证者集合和 Tendermint 的提案者选择算法，为 BOR 上的每个冲刺选择一个生产者。

### 系统调用界面 {#systemcall-interface}

系统调用是 EVM 下的内部操作者地址。它可以帮助维持每个冲刺的区块生产者状态。在冲刺结束时，触发系统调用，并请求新的区块生产者列表。状态更新后，所有验证者都将在 BOR 上生成区块后收到更改。

### 函数 {#functions}

#### propeState {#proposestate}

- 仅允许验证者调用。
- 检查 `stateId` 是否已提议或提交。
- 提议 `stateId` 并将标志更新为 `true`。

#### Clindowste {#commitstate}

- 仅允许系统调用。
- 检查 `stateId` 是否已提议或提交。
- 通知 `StateReceiver` 合约已有新的 `stateId`。
- 将 `state` 标志更新为 `true`，然后 `remove` `proposedState`。

#### proteSpan {#proposespan}

- 仅允许验证者调用。
- 检查跨度提案是否为 `pending`。
- 将跨度提案更新为 `true`

#### propeCommit {#proposecommit}

- 仅允许系统调用。
- 如果当前跨度为零，则设置 `initial validators`。
- 检查冲刺和跨度的 `spanId` 和 `time_period` 的条件。
- 更新新的 `span` 和 `time_period`。
- 设置 `sprint` 的 `validators` 和 `blockProducers`。
- 将 `spanProposal` 的标志更新为 `true`。

### BOR 手续费模式 {#bor-fee-model}

与以太坊交易相似，正常交易将以 Matic 代币收取手续费，然后分配给区块生产者。

与其他区块链类似，Polygon 也有原生代币，名为 Matic (MATIC)。Matic 是一种 ERC20 代币，主要用于支付 Polygon 以及质押的 gas 费（交易费用）。

:::info

需要注意的是，在 Polygon 链上，Matic 代币既可以用作 ERC20 代币，也可以用作原生代币， 即一币兼两用。因此，这意味着用户既可以使用 Matic 支付 gas 费，还可以发送 Matic 到其他账户。

:::

对于基因组合合合约，`gasPrice``gasLimit`与以太坊相同，但在执行期间，它不会从发送者账户中扣除费用。

当前验证者的 Genesis 交易执行时 `gasPrice = 0`。

验证者还必须发送以下类型的交易，如国家提案，如在 Bor 上存款和空间提案。

## 技术洞察 {#technical-insight}

### Genesis 合约 {#genesis-contracts}

[BorValidatorSet(0x1000)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.template) ⇒ 该合约管理每个跨度和冲刺的验证者集合。

[BorStateReceiver(0x1001)](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol) ⇒ 该合约管理任意合约数据从以太坊合约转移到 Polygon 合约

MaticChildERC20(0x1010) ⇒ 主链代币的子合约，可以将资产从以太坊转移到 Polygon。

### [Bor.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/bor.go)

BOR 协议

## 术语表 {#glossary}

- StartEpoch — 验证者激活并参与共识的检查点编号点位。
- EndEpoch — 验证者停用并且不会参与共识的检查点编号点位。
- 冲刺 — 冲刺是单一验证者创建的一组连续区块。
- 跨度 — 跨度是一个大区块集合，具有固定的验证者集合，由各种冲刺组成。例如，长度为 6400 个区块的跨度将由 100 个 64 区块的冲刺组成。
- 朝代：上次拍卖结束与下次拍卖开始之间的时间。

## 资源 {#resources}

- [Bor](https://github.com/maticnetwork/bor)
- [EVM](https://www.bitrates.com/guides/ethereum/what-is-the-unstoppable-world-computer)
- [EVM 如何运作？](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)
- [投标者选择](https://docs.tendermint.com/master/spec/reactors/consensus/proposer-selection.html)
