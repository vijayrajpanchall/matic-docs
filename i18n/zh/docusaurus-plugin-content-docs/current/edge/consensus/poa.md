---
id: poa
title: 权威证明（PoA）
description: "有关权威证明的解释和指示。"
keywords:
  - docs
  - polygon
  - edge
  - PoA
  - autorithy
---

## 概述 {#overview}

IBFA PoA 是 Polygon Edge 中默认的共识机制。在 PoA 中，验证者负责创建区块和将它们以系列的形式添加至区块链中。

所有的验证者形成一个动态的验证者组，其中验证者可通过投票机制加入或移除该组。如果大多数（51%）的验证者节点投票投票从组集中添加/移除某个特定的验证者，则验证者可以从验证者集合中移进/移出。通过这种方式，可以从网络中识别和移除恶意的验证者，受信任的新验证者就可以添加至该网络。

所有验证者轮流提议新的区块（轮询调度），对于在区块中验证/输入的区块，超多数（超过2/3）的验证者必须同意所说的区块。

除了验证者，存在不参加区块创建但是参加区块验证流程的非验证者。

## 添加验证者至验证者组 {#adding-a-validator-to-the-validator-set}

该指南介绍了如何将新的验证者节点添加至包含 4 个验证者节点的活跃 IBFT 网络。如果您需要帮助设置网络，请参见“[局部设置](/edge/get-started/set-up-ibft-locally.md)[/云设置程序](/edge/get-started/set-up-ibft-on-the-cloud.md)”部分。

### 步骤1：启动 IBFT 数据文件夹，为新节点生成验证者密钥​ {#step-1-initialize-data-folders-for-ibft-and-generate-validator-keys-for-the-new-node}

为了在新节点中设置和运行 IBFT，您首先需要初始化数据文件夹和生成密钥：

````bash
polygon-edge secrets init --data-dir test-chain-5
````

该指令可打印验证者密钥（地址）和节点 ID。您需要用于下一步的验证者密钥（地址）。

### 步骤2：从其他验证者节点提议新的候选人 {#step-2-propose-a-new-candidate-from-other-validator-nodes}

要使新的节点成为验证者，至少 51% 的验证者提议该验证者。

如何从 grpc 地址：127.0.0.1:10000 在现有的验证者节点提议新的验证者（`0x8B15464F8233F718c8605B16eBADA6fc09181fC2`）：

````bash
polygon-edge ibft propose --grpc-address 127.0.0.1:10000 --addr 0x8B15464F8233F718c8605B16eBADA6fc09181fC2 --bls 0x9952735ca14734955e114a62e4c26a90bce42b4627a393418372968fa36e73a0ef8db68bba11ea967ff883e429b3bfdf --vote auth
````

IBFT 指令的结构涵盖在[ CLI 指令](/docs/edge/get-started/cli-commands)的节。

:::info BLS 公钥

BLS 公钥只有在网络中运行 BLS 时才必须存在，对于不运行 BLS 模式的网络，`--bls`就不是必须的
:::

### 步骤3：运行客户端节点 {#step-3-run-the-client-node}

在这个例子中，我们试图运行的网络中，所有的节点都在相同的机器上，我们需要注意避开端口冲突。

````bash
polygon-edge server --data-dir ./test-chain-5 --chain genesis.json --grpc-address :50000 --libp2p :50001 --jsonrpc :50002 --seal
````

获取所有区块后，在您的控制台中，您会注意到新的节点正在参加验证

````bash
2021-12-01T14:56:48.369+0100 [INFO]  polygon.consensus.ibft.acceptState: Accept state: sequence=4004
2021-12-01T14:56:48.369+0100 [INFO]  polygon.consensus.ibft: current snapshot: validators=5 votes=0
2021-12-01T14:56:48.369+0100 [INFO]  polygon.consensus.ibft: proposer calculated: proposer=0x8B15464F8233F718c8605B16eBADA6fc09181fC2 block=4004
````

:::info 将一个非验证者推给一个验证者

自然而然地，非验证者就会通过投票过程成为一个验证者，但是为了在投票过程后让它成功地进入验证者组，该节点需要以`--seal`标志重启。
:::

## 从验证者组中移除验证者 {#removing-a-validator-from-the-validator-set}

该操作非常简单。要从验证者组中移除验证者节点，该指令需要在大多数验证者节点中执行。

````bash
polygon-edge ibft propose --grpc-address 127.0.0.1:10000 --addr 0x8B15464F8233F718c8605B16eBADA6fc09181fC2 --bls 0x9952735ca14734955e114a62e4c26a90bce42b4627a393418372968fa36e73a0ef8db68bba11ea967ff883e429b3bfdf --vote drop
````

:::info BLS 公钥

BLS 公钥只有在网络中运行 BLS 时才必须存在，对于不运行 BLS 模式的网络，`--bls`就不是必须的
:::

在执行指令后，观察减少的验证者数量（在该日志示例中，从 4 到 3）。

````bash
2021-12-15T19:20:51.014+0100 [INFO]  polygon.consensus.ibft.acceptState: Accept state: sequence=2399 round=1
2021-12-15T19:20:51.014+0100 [INFO]  polygon.consensus.ibft: current snapshot: validators=4 votes=2
2021-12-15T19:20:51.015+0100 [INFO]  polygon.consensus.ibft.acceptState: we are the proposer: block=2399
2021-12-15T19:20:51.015+0100 [INFO]  polygon.consensus.ibft: picked out txns from pool: num=0 remaining=0
2021-12-15T19:20:51.015+0100 [INFO]  polygon.consensus.ibft: build block: number=2399 txns=0
2021-12-15T19:20:53.002+0100 [INFO]  polygon.consensus.ibft: state change: new=ValidateState
2021-12-15T19:20:53.009+0100 [INFO]  polygon.consensus.ibft: state change: new=CommitState
2021-12-15T19:20:53.009+0100 [INFO]  polygon.blockchain: write block: num=2399 parent=0x768b3bdf26cdc770525e0be549b1fddb3e389429e2d302cb52af1722f85f798c
2021-12-15T19:20:53.011+0100 [INFO]  polygon.blockchain: new block: number=2399 hash=0x6538286881d32dc7722dd9f64b71ec85693ee9576e8a2613987c4d0ab9d83590 txns=0 generation_time_in_sec=2
2021-12-15T19:20:53.011+0100 [INFO]  polygon.blockchain: new head: hash=0x6538286881d32dc7722dd9f64b71ec85693ee9576e8a2613987c4d0ab9d83590 number=2399
2021-12-15T19:20:53.011+0100 [INFO]  polygon.consensus.ibft: block committed: sequence=2399 hash=0x6538286881d32dc7722dd9f64b71ec85693ee9576e8a2613987c4d0ab9d83590 validators=4 rounds=1 committed=3
2021-12-15T19:20:53.012+0100 [INFO]  polygon.consensus.ibft: state change: new=AcceptState
2021-12-15T19:20:53.012+0100 [INFO]  polygon.consensus.ibft.acceptState: Accept state: sequence=2400 round=1
2021-12-15T19:20:53.012+0100 [INFO]  polygon.consensus.ibft: current snapshot: validators=3 votes=0
2021-12-15T19:20:53.012+0100 [INFO]  polygon.consensus.ibft: proposer calculated: proposer=0xea21efC826F4f3Cb5cFc0f986A4d69C095c2838b block=2400
````
