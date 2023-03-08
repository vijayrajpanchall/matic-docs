---
id: peppermint
title: Peppermint
description: Peppermint 是一种经过修改的以太机兼容的交易
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Peppermint 是一种改良的 Tendermint。改良的目的是为了使其兼容以太坊地址，并可在以太坊链上验证。

## 概述 {#overview}

1. 签名方案变更
2. 为了使其在以太坊智能合约上可以验证而更改 `vote`
3. `vote`编码方案变更

Peppermint 使用`secp256k1`签名计划来验证在固体智能合约上进行的投机投票。

来源：[https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

它在 `Vote` 和 `Proposal`结构中添加 `Data` 字段，以获取区块中交易的 `hash`。在智能合约上，它检查 `Data` 是否匹配检查点数据哈希值和大部分 (⅔+1) 验证者签名。这个想法是为了验证大多数验证者是否同意合约中的交易。

Peppermint 使用 RLP 来获取 `Vote` 字节，而不是 Amino 编码。以下`Data`是`Txs.Hash()`区块的。

来源：[https://github.com/maticnetwork/tendermint/blob/peppermint/pypepermint/pypepermint/pype/canonical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

```go
// [peppermint] create RLP vote to decode in contract
type CanonicalRLPVote struct {
	ChainID string
	Type    byte
	Height  uint
	Round   uint
	Data    []byte
}
```

并利用 RLP 编码库获取投票签名的字节数据。

来源：[https://github.com/maticnetwork/tendermint/blob/peppermint/pypepermint/teper/ture.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

```go
func (vote *Vote) SignBytes(chainID string) []byte {
	// [peppermint] converted from amino to rlp
	bz, err := rlp.EncodeToBytes(CanonicalizeVote(chainID, vote))
	if err != nil {
		panic(err)
	}
	return bz
}
```

完整来源：[https://github.com/maticnetwork/tendermint](https://github.com/maticnetwork/tendermint)
