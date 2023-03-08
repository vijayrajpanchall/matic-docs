---
id: bank
title: 银行
description: Heimdall 模块处理账户余额转账
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# 银行模块 {#bank-module}

`bank` 模块处理 Heimdall 的账户余额转账。该模块对应 cosmos-sdk 的 `bank` 模块。

## 消息 {#messages}

### MsgSend {#msgsend}

`MsgSend` 处理 Heimdall 账户之间的转账。以下是交易消息结构：

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend` 处理 Heimdall 账户之间的多笔转账。

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## 参数 {#parameters}

银行模块包含以下参数：

| 密钥 | 类型 | 默认值 |
|----------------------|--------|------------------|
| `sendenabled` | 布尔 | 真 |

## CLI 指令 {#cli-commands}

### 发送余额 {#send-balance}

以下命令将发送 1000 个元代币，以发送到提及的代币`address`；

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
