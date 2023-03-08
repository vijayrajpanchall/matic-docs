---
id: topup
title: 充值
description: 用于在 Heimdall 链上支付费用的金额
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# 充值 {#topup}

Heimdall 充值是一笔用于在 Heimdall 链上支付费用的金额。

有两种方式来填充您的账户：

1. 当新的验证者加入时，他们可以提及一个金额，除了存储金额外，还可以作为补充`topup`金额，将转为在 Heimdall 上支付费用。
2. 用户可以直接调用以特约上固定的智能合约上的补充函数，以增加 Heimdall 上的补充余额。

## 消息 {#messages}

### MsgTopup {#msgtopup}

`MsgTopup` 交易负责根据以太坊链的质押管理者合约 `TopUpEvent`，将余额铸造到 Heimdall 上的一个地址。

该交易的处理程序处理充值，对于给定 `msg.TxHash` 和 `msg.LogIndex`，只增加余额一次。如果多次尝试处理充值，则会出现 `Older invalid tx found` 错误。

以下是充值交易消息的结构：

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee {#msgwithdrawfee}

`MsgWithdrawFee` 交易负责将余额从 Heimdall 提取到以太坊链。验证者可以从 Heimdall 提取任意金额。

处理程序处理提取的方式是从给定的验证者账户中扣除余额，然后准备好状态以发送下一个检查点。下一个可能的检查点将包含特定验证者的提取相关状态。

处理程序根据 `ValidatorAddress` 获取验证者信息，然后处理提取。

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## CLI 命令 {#cli-commands}

### Topup Fee {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### 提取手续费 {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

要检查账户的充值情况，请运行以下命令

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## REST API {#rest-apis}

| Name | Method | URL | Body Params |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Topup Fee | POST | /topup/fee | `id`验证者 ID，`tx_hash` 以太坊链上成功充值事件的交易哈希，`log_index` 以太坊链上发出的充值事件的日志索引 |
| 提取手续费 | POST | /topup/withdraw | `amount`提取金额 |
