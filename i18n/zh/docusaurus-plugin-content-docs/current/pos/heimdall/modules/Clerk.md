---
id: clerk
title: Clerk
description: 管理从以太机到 Bor 通用状态同步的模块
keywords:
  - docs
  - matic
  - module
  - state sync
  - clerk
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Clerk {#clerk}

Clerk 管理从以太坊链到 Bor 链的通用状态同步。Heimdall 同意使用Clerk模块在以太坊链上启动的状态同步。

更多详细信息可参见[状态同步机](/docs/pos/bor/core_concepts.md#state-management-state-sync)制

## 消息 {#messages}

### MsgEventRecord {#msgeventrecord}

`MsgEventRecord` 交易负责验证来自 `StateSender.sol` 的事件，并将状态存储在 Heimdall 上供 Bor 使用。

该交易的处理程序验证给定的 `msg.TxHash` 和 `msg.LogIndex`。如果多次尝试处理交易，则会出现 `Older invalid tx found` 错误。

以下是交易消息的结构：

```go
// MsgEventRecord - state msg
type MsgEventRecord struct {
	From     types.HeimdallAddress `json:"from"`
	TxHash   types.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                `json:"log_index"`
	ID       uint64                `json:"id"`
	ChainID  string                `json:"bor_chain_id"`
}
```

## CLI 命令 {#cli-commands}

### 发送状态记录交易 {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### 查询已验证的状态事件记录 {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## REST API {#rest-apis}

| Name | Method | Endpoint |
|----------------------|------|------------------|
| 事件记录详细信息 | GET | /clerk/event-record/<record-id\> |
| 所有事件记录 | GET | /clerk/event-record/list |
