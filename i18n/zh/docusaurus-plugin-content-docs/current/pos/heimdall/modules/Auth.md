---
id: auth
title: Auth
description: 指定基准交易和账户类型的模块
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# Auth 模块 {#auth-module}

本文档描述了 Heimdall `auth`模块。

`auth` 模块负责指定一个应用程序的基本交易和账户类型。它包含 ante handler（执行所有基本的交易有效性检查（签名、随机数、辅助字段）），并公开账户管理者（允许其他模块读取、写入和修改账户）。

## gas 和费用 {#gas-and-fees}

对于网络运营商来说，费用有两个目的。

费用限制了每个完整节点所存储的状态的增长，并能够对经济价值不大的交易执行通用审查。在验证者对网络的使用和用户的身份不感兴趣的情况下，费用最适合充当一种反垃圾邮件机制。

由于 Heimdall 并不支持自定义合约或任何交易代码，因此使用固定成本交易。对于固定成本的交易，验证者可以在以太坊链上给账户充值，并使用 [Topup](Topup.md) 模块在 Heimdall 上获得代币。

## 类型 {#types}

除了存储（在状态中指定）之外，透露的模块的类型包括**：StdSignather，******将可选公用钥匙和加密签名组合为代码数组，**StdTx******，使用 StdSignathersignature实施`sdk.Tx`接口的结构，**StdSignDoc，StdSignDoc，**这是交易发送者必须签署的重放预防结构。

### StdSignature {#stdsignature}

`StdSignature` 是一个字节数组的类型。

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

`StdTx` 是实施 `sdk.Tx` 接口的结构，是通用的，足以满足许多类型交易的目的。

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

`StdSignDoc` 是一个要签名的重放预防结构，确保提交的交易（这只是对一个特定字节字符串的签名）在 Heimdall 上只能执行一次。

```go
// StdSignDoc is replay-prevention structure.
// It includes the result of msg.GetSignBytes(),
// as well as the ChainID (prevent cross chain replay)
// and the Sequence numbers for each signature (prevent
// inchain replay and enforce tx ordering per account).
type StdSignDoc struct {
	ChainID       string          `json:"chain_id" yaml:"chain_id"`
	AccountNumber uint64          `json:"account_number" yaml:"account_number"`
	Sequence      uint64          `json:"sequence" yaml:"sequence"`
	Msg           json.RawMessage `json:"msg" yaml:"msg"`
	Memo          string          `json:"memo" yaml:"memo"`
}
```

### 账户 {#account}

它管理交易的地址、代币和随机数。它还对交易签名和验证。

来源：[https://github.com/maticnetwork/heimdall/blob/master/auth/pyspe/count.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## 参数 {#parameters}

auth 模块包含以下参数：

| 密钥 | 类型 | 默认值 |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | 字符串 | "1000000000000000" |


## CLI 命令 {#cli-commands}

### 显示账户 {#show-account}

将账户相关数据打印到 Heimdall 中；

```bash
heimdalld show-account
```

预期结果：

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### 账户和代币详细信息 {#account-and-coin-details}

显示账户详细信息、硬币、序列和账户编号；

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

预期结果：

```json
address: 0x68243159a498cf20d945cf3e4250918278ba538e
coins:
- denom: matic
    amount:
    i: "1000000000000000000000"
pubkey: ""
accountnumber: 0
sequence: 0
```

### 参数 {#parameters-1}

打印所有参数；

```go
heimdallcli query auth params
```

预期结果：

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## REST API {#rest-apis}

| Name | Endpoint | 描述 |
|----------------------|--------|------------------|
| 账户详细信息 | /auth/accounts/{address} | 返回地址的所有详细信息 |
| 账户序列详细信息 | /auth/accounts/{address}/sequence | 只返回签名所需的详细信息 |
| Auth 参数 | /auth/params | 返回 auth 模块使用的所有参数 |
