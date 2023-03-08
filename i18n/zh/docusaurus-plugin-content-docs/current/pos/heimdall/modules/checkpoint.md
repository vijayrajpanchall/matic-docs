---
id: checkpoint
title: 检查点
description: 管理检查点相关功能的模块
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# 检查点 {#checkpoint}

`checkpoint` 模块管理 Heimdall 的检查点相关功能。在 Heimdall 上提议新的检查点时，该模块需要 BOR 链来检验检查点的根哈希。

所有与检查点数据有关的详细信息在[下文](/docs/pos/heimdall/checkpoint)中加以解释。

## 检查点生命周期 {#checkpoint-life-cycle}

Heimdall 使用与 Tendermint 相同的领先选择算法来选择下一个提议者。在以太坊链上提交检查点时，可能会由于多个原因而失败，例如 gas 限制、以太坊上的流量、高昂的 gas 费。因此，我们需要多阶段检查点流程。

每个检查点都拥有验证者作为建议者。如果以太坊链上的检查点失败或成功`ack`，`no-ack`交易将改变 Heimdall 上的提议者，用于下一个检查点。以下流程图代表检查点的生命周期：

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## 消息 {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint` 处理 Heimdall 上的检查点验证。只有此消息使用 RLP 编码，因为需要在以太坊链上验证。

```go
// MsgCheckpoint represents checkpoint transaction
type MsgCheckpoint struct {
	Proposer        types.HeimdallAddress `json:"proposer"`
	StartBlock      uint64                `json:"startBlock"`
	EndBlock        uint64                `json:"endBlock"`
	RootHash        types.HeimdallHash    `json:"rootHash"`
	AccountRootHash types.HeimdallHash    `json:"accountRootHash"`
}
```

该交易在 Heimdall 上处理完成后，`proposer` 接收来自 Tendermint 关于该交易的 `votes` 和 `sigs`，并在以太坊链上发送检查点。

由于区块包含多个交易并且以太坊链上验证该特定交易，因此需要 Merkle 证明。为了避免以太坊上需要额外的 Merkle 证明验证，对于 `MsgCheckpoint` 交易类型，Heimdall 仅允许在区块中执行一笔交易

为了实现该机制，Heimdall 将 `MsgCheckpoint` 交易设置为高 gas 消耗交易。查看 [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

该交易会将提议的检查点储存在 `checkpointBuffer` 状态上，而并非实际的检查点列表状态。

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck` 处理成功提交的检查点。以下`HeaderBlock`是检查点计量器；

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

对于已提交检查点的有效 `TxHash` 和 `LogIndex` ，该交易可在 `checkpointBuffer` 状态下检验以下事件和和验证检查点： [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

```jsx
event NewHeaderBlock(
    address indexed proposer,
    uint256 indexed headerBlockId,
    uint256 indexed reward,
    uint256 start,
    uint256 end,
    bytes32 root
);
```

在成功的事件验证上，它更新了实际检查点的计算，也称为检查点，`ackCount`并清理了该点。`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck` 处理不成功的检查点或离线提案者。此交易仅在从以下事件传递 `CheckpointBufferTime` 后有效：

- 上次成功的 `ack` 交易
- 上次成功的 `no-ack` 交易

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

本次交易在 Heimdall 为下一个检查点选择新的 `proposer` 之前给定当前提案者发送检查点/ack 的超时时间。

## 参数 {#parameters}

检查点模块包含以下参数：

| 密钥 | 类型 | 默认值 |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * time.Second |


## CLI 命令 {#cli-commands}

### 参数 {#params}

打印所有参数：

```go
heimdallcli query checkpoint params --trust-node
```

预期结果：

```yaml
checkpoint_buffer_time: 16m40s
```

### 发送检查点 {#send-checkpoint}

以下命令在 Heimdall 上发送检查点交易：

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### 发送`ack`

在以太坊上成功进行检查点控制后，以下命令可在 Heimdall 上发送 ack 交易：

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### 发送`no-ack`

以下命令可在 Heimdall 上发送 no-ack 交易：

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## REST API {#rest-apis}

| Name | Method | Endpoint |
|----------------------|------|------------------|
| 获取最新检查点缓冲状态 | GET | /checkpoint/buffer |
| 获取检查点计数 | GET | /checkpoint/count |
| 按区块索引获取检查点详细信息 | GET | /checkpoint/headers/<header-block-index\> |
| 获取最新检查点 | GET | /checkpoint/latest-checkpoint |
| 获取上次 no-ack 详细信息 | GET | /checkpoint/last-no-ack |
| 给定开始和结束区块的检查点详细信息 | GET | /checkpoint/<start\>/<end\> |
| 按数量分列检查点 | GET | /checkpoint/<checkpoint-number\> |
| 所有检查点 | GET | /checkpoint/list |
| 获取 ack 计数、缓冲、验证者集、验证者计数和 last-no-ack 详细信息 | GET | /overview |


所有查询 API 都将以以下格式提供结果：

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
