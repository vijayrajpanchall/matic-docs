---
id: chainmanager
title: 链管理器
description: 提供所有必要的依赖性的模块
keywords:
  - docs
  - matic
  - chain manager
  - module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# 链管理器 {#chain-manager}

本文档指定了 Heimdall 链管理器模块概述。

**链管理器**模块提供所有必要的依赖性`contract-addresses`，如，`bor_chain_id,`和 。`tx_confirmation_time`稍后可添加其他参数。

通过 `gov` 模块更新参数。

## 类型 {#types}

Heimdall 上的链管理器结构具体如下：

```go
type ChainParams struct {
	// BorChainID is valid bor chainId
	BorChainID            string                  `json:"bor_chain_id" yaml:"bor_chain_id"`

	// MaticTokenAddress is valid matic token address
	MaticTokenAddress     hmTypes.HeimdallAddress `json:"matic_token_address" yaml:"matic_token_address"`

	// StakingManagerAddress is valid contract address
	StakingManagerAddress hmTypes.HeimdallAddress `json:"staking_manager_address" yaml:"staking_manager_address"`

	// RootChainAddress is valid contract address
	RootChainAddress      hmTypes.HeimdallAddress `json:"root_chain_address" yaml:"root_chain_address"`

	// StakingInfoAddress is valid contract address
	StakingInfoAddress    hmTypes.HeimdallAddress `json:"staking_info_address" yaml:"staking_info_address"`

	// StateSendedAddress is valid contract address
	StateSenderAddress    hmTypes.HeimdallAddress `json:"state_sender_address" yaml:"state_sender_address"`

	// Bor Chain Contracts
	// StateReceiveAddress is valid contract address
	StateReceiverAddress hmTypes.HeimdallAddress `json:"state_receiver_address" yaml:"state_receiver_address"`

	// ValidatorSetAddress is valid contract address
	ValidatorSetAddress  hmTypes.HeimdallAddress `json:"validator_set_address" yaml:"validator_set_address"`
}
```

## CLI 指令 {#cli-commands}

### 参数 {#parameters}

打印所有参数；

```go
heimdallcli query chainmanager params --trust-node
```

### 预期结果 {#expected-result}

```yaml
tx_confirmation_time: 12s
chain_params:
  bor_chain_id: "15001"
  matic_token_address: "0x0000000000000000000000000000000000000000"
  staking_manager_address: "0x0000000000000000000000000000000000000000"
  root_chain_address: "0x0000000000000000000000000000000000000000"
  staking_info_address: "0x0000000000000000000000000000000000000000"
  state_sender_address: "0x0000000000000000000000000000000000000000"
  state_receiver_address: "0x0000000000000000000000000000000000000000"
  validator_set_address: "0x0000000000000000000000000000000000000000"
```

### REST API {#rest-apis}

| Name | Method | URL |
|----------------------|------|------------------|
| 参数 | GET | chainmanager/params |

所有查询 API 都将以以下格式提供回应：

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
