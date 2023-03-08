---
id: bor
title: BOR
description: 处理在 Heimdall 上跨越管理的模块
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Bor 模块 {#bor-module}

Bor 模块处理 Heimdall 上的跨度管理。鉴于 Bor 链的当前区块号 `n`、当前跨度 `span`，如果 `span.StartBlock <= n < span.EndBlock`，那么任一验证者可以在 Heimdall 上提议新的跨度。

## 消息 {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`为给定时设置验证者委员会，`span`并将新的跨度存储到 Heimdall 状态。

来源：[https://github.com/maticnetwork/heimdall/blob/develop/dread/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

```go
// MsgProposeSpan creates msg propose span
type MsgProposeSpan struct {
	ID         uint64                  `json:"span_id"`
	Proposer   hmTypes.HeimdallAddress `json:"proposer"`
	StartBlock uint64                  `json:"start_block"`
	EndBlock   uint64                  `json:"end_block"`
	ChainID    string                  `json:"bor_chain_id"`
}
```

下面是该交易在所有验证者中选择生产者的方式：

1. 根据验证者的权力，创建多个槽位。例如：权力为 10 的 A 将有 10 个槽位，权力为 20 的 B 将有 20 个槽位。
2. `shuffle` 使用 `seed` 打乱所有槽位，然后选择头 `producerCount` 个生产者。Heimdall 上的 `bor` 模块使用 ETH2.0 混洗算法，从所有验证者中选择生产者。每个跨度 `n` 把以太坊 (ETH 1.0) 区块 `n` 的区块哈希值当作 `seed`。请注意，基于槽位做出选择，因此根据权力大小选择验证者。验证者权力越大，当选的概率越高。来源：[https://github.com/maticnetwork/heimdall/blob/depert/bor/sell.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

```go
// SelectNextProducers selects producers for the next span by converting power to slots
// spanEligibleVals - all validators eligible for next span
func SelectNextProducers(blkHash common.Hash, spanEligibleVals []hmTypes.Validator, producerCount uint64) (selectedIDs []uint64, err error) {
	if len(spanEligibleVals) <= int(producerCount) {
		for _, val := range spanEligibleVals {
			selectedIDs = append(selectedIDs, uint64(val.ID))
		}
		return
	}

	// extract seed from hash
	seed := helper.ToBytes32(blkHash.Bytes()[:32])
	validatorIndices := convertToSlots(spanEligibleVals)
	selectedIDs, err = ShuffleList(validatorIndices, seed)
	if err != nil {
		return
	}
	return selectedIDs[:producerCount], nil
}

// converts validator power to slots
func convertToSlots(vals []hmTypes.Validator) (validatorIndices []uint64) {
	for _, val := range vals {
		for val.VotingPower >= types.SlotCost {
			validatorIndices = append(validatorIndices, uint64(val.ID))
			val.VotingPower = val.VotingPower - types.SlotCost
		}
	}
	return validatorIndices
}
```

## 类型 {#types}

以下是 Heimdall 使用的跨度详情：

```go
// Span structure
type Span struct {
	ID                uint64       `json:"span_id" yaml:"span_id"`
	StartBlock        uint64       `json:"start_block" yaml:"start_block"`
	EndBlock          uint64       `json:"end_block" yaml:"end_block"`
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}
```

## 参数 {#parameters}

Bor 模块包含以下参数：

| 密钥 | 类型 | 默认值 |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## CLI 命令 {#cli-commands}

### 跨度提议交易 {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### 查询当前跨度 {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

预期输出：

```go
{
  "span_id":2,
  "start_block":6656,
  "end_block":13055,
  "validator_set":{
    "validators":[
      {
        "ID":1,
        "startEpoch":0,
        "endEpoch":0,
        "power":1,
        "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
        "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
        "last_updated":"",
        "accum":0
      }
    ],
    "proposer":{
      "ID":1,
      "startEpoch":0,
      "endEpoch":0,
      "power":1,
      "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
      "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
      "last_updated":"",
      "accum":0
    }
  },
  "selected_producers":[
    {
      "ID":1,
      "startEpoch":0,
      "endEpoch":0,
      "power":1,
      "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
      "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
      "last_updated":"",
      "accum":0
    }
  ],
  "bor_chain_id":"15001"
}
```

### 按 ID 查询跨度 {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

以上面相同的格式打印结果。

### 参数 {#parameters-1}

打印所有参数；

```go
heimdalldcli query bor params
```

预期结果：

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## REST API {#rest-apis}

| Name | Method | Endpoint |
|----------------------|------|------------------|
| 跨度详细信息 | GET | /bor/span/<span-id\> |
| 获取最新跨度 | GET | /bor/latest-span |
| 获取参数 | GET | /bor/params |
