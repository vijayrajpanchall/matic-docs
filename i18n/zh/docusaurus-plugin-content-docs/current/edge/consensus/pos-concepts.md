---
id: pos-concepts
title: 权益证明
description: "有关权益证明的解释和指示。"
keywords:
  - docs
  - polygon
  - edge
  - PoS
  - stake
---

## 概述 {#overview}

该节旨在更好地概述当前存在于 Polygon Edge 权益证明实施中的一些概念。

Polygon Edge 权益证明（PoS）实施是代替现有的 PoA IBFT 实施的一种方法，节点运营者可以在开启链时轻松选择二者之一。

## PoS 功能 {#pos-features}

权益证明实施背后的核心逻辑位于**[质押智能合约。](https://github.com/0xPolygon/staking-contracts/blob/main/contracts/Staking.sol)**

该合约在所有 PoS 机制的 Polygon Edge 链初始化前都会预先部署，且可在
`0x0000000000000000000000000000000000001001`地址上使用，区块为`0`。

### Epochs {#epochs}

Epochs 的概念是通过权益证明 (PoS) 添加至 Polygon Edge。

Epochs 被认为是特殊的时间框架（在区块中），特定的验证者集可产生区块。它们的长度可以修改，这就意味着节点的运营者可以在 genesis 生成时配置某个 epoch 的长度。

在每个 epoch 的最后，生成一个 _epoch 区块_，在该事件之后，新的 epoch 开始。要了解更多有关epoch 区块，查看 [Epoch 区块](/docs/edge/consensus/pos-concepts#epoch-blocks)节。

验证者组在每个 epoch 的末端更新。在创建 epoch 取款期间，节点从质押智能合约中查询验证者组并保存获取的数据值当地存储。该查询和保存周期在每个 epoch 末端重复。

基本上，它确保了质押智能合约完全控制验证者组中的地址，且使得节点只有 1 个责任 - 在获取最新验证者组信息的 epoch 中查询一次合约。这减轻了个人节点照顾验证者组的责任。

### 质押 {#staking}

地址可以通过调用`stake`方式和在交易中指明质押值在质押智能合约上质押资金：

````js
const StakingContractFactory = await ethers.getContractFactory("Staking");
let stakingContract = await StakingContractFactory.attach(STAKING_CONTRACT_ADDRESS)
as
Staking;
stakingContract = stakingContract.connect(account);

const tx = await stakingContract.stake({value: STAKE_AMOUNT})
````

通过在质押智能合约上质押资金，地址可进入验证者组，从而有机会参与区块生产过程。

:::info 质押的阈值

目前，进入沿着验证者组的最低阈值是质押`1 ETH`
:::

### 取消质押 {#unstaking}

包含质押资金的地址只能**一次性取消质押它们所有质押的资金**。

取消质押可以通过在质押智能合约上调用`unstake`方式产生：

````js
const StakingContractFactory = await ethers.getContractFactory("Staking");
let stakingContract = await StakingContractFactory.attach(STAKING_CONTRACT_ADDRESS)
as
Staking;
stakingContract = stakingContract.connect(account);

const tx = await stakingContract.unstake()
````

取消质押后，在质押智能合约的验证者组上移除地址，且不会在下次epoch中成为候选验证者。

## Epoch 区块 {#epoch-blocks}

**Epoch 区块**是一种介绍 Polygon Edge IBFT PoS 实施的概念。

基本上，epoch 区块是**不包含交易**的特殊区块，且仅仅在 **epoch 末端**出现。例如，如果将 **epoch** 大小设置为区块`50`，则 epoch 区块将被视为区块`50``100``150`，等等。

它们用于执行额外的逻辑，这一逻辑不应该在常规的区块生产之外出现。

最重要的是，它们指示节点**需要从质押智能合约中**获取最新的验证者组信息。

在 epoch 区块中更新验证者组后，验证者组（更改或未更改）用于后续`epochSize - 1`的区块，直至其通过从质押智能合约的内部调取最新的信息质押智能合约之中。

生成 genesis 文件时，Epoch 长度（在区块中）可调节，通过使用特殊的标志`--epoch-size`：

```bash
polygon-edge genesis --epoch-size 50 ...
```

在 Polygon Edge 中 epoch 的默认大小是`100000`区块。

## 合约预部署 {#contract-pre-deployment}

Polygon Edge _预先部署_[质押智能合约](https://github.com/0xPolygon/staking-contracts/blob/main/contracts/Staking.sol)
在** genesis 生成**期间添加至地址`0x0000000000000000000000000000000000001001`。

在没有运行 EVM 的情况下直接修改智能合约的区块链状态，使用配置值至 genesis 指令。
