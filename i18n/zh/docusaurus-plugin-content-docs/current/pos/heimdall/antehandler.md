---
id: antehandler
title: Ante Handler
description: Ante Handler 检查并验证交易
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Ante Handler {#ante-handler}

Ante Handler 检查并验证交易。验证完成后，它检查发送者余额是否足以支付手续费，若交易成功，扣除手续费。

## gas 限额 {#gas-limit}

每个区块和交易都有一定的 gas 使用限额。区块可以包含多个交易，但区块中所有交易使用的气体必须小于区块气体限制，以避免更大的区块。

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

请注意，交易的每次状态操作都耗费 gas，包括交易的签名验证。

### 区块 gas 限额 {#block-gas-limit}

在设置应用程序的共识参数时，批准最大区块 gas 限额以及每区块字节数： [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

```go
maxGasPerBlock   int64 = 10000000 // 10 Million
maxBytesPerBlock int64 = 22020096 // 21 MB

// pass consensus params
ConsensusParams: &abci.ConsensusParams{
	Block: &abci.BlockParams{
		MaxBytes: maxBytesPerBlock,
		MaxGas:   maxGasPerBlock,
	},
	...
},
```

### 交易 gas 限额 {#transaction-gas-limit}

交易 gas 限额在 `auth` 模块的参数中界定。可以通过 Heimdall `gov` 模块来更改。

### 检查点交易天然气限制 {#checkpoint-transaction-gas-limit}

由于区块包含多个交易并且以太坊链上验证该特定交易，因此需要 Merkle 证明。为了避免检查点交易需要额外的 Merkle 证明验证，对于 `MsgCheckpoint` 交易类型，Heimdall 仅允许在区块中交易一次

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## 交易验证和重放保护 {#transaction-verification-and-replay-protection}

Ante Handler 处理并验证传入交易中的签名： [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

每次交易都必须包含 `sequenceNumber`，以避免重放攻击。当每次交易成功包含后，Ante Handler 会增加交易发送者账户的序号，以避免之前交易的重复（重放）。