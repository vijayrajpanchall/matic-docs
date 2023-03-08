---
id: encoder
title: 编码器者 (Pulp)
description: RLP 编码以产生特殊交易，如检查点
keywords:
  - docs
  - matic
  - rlp encoding
  - checkpoint
  - encoder
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---

# 编码器者 (Pulp) {#encoder-pulp}

Heimdall 需要验证以太坊链上的 Heimdall 交易。为此，它使用 RLP 编码来产生特殊交易，如检查点。

这种特殊交易使用 `pulp`（基于 RLP）编码，而不是默认的 amino 编码。

Pulp 使用基于前缀的简单编码机制来解决接口解码。查看 `GetPulpHash` 方法。

来源：[https://github.com/maticnetwork/heimdall/blob/master/auth/pype/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

```go
const (
	// PulpHashLength pulp hash length
	PulpHashLength int = 4
)

// GetPulpHash returns string hash
func GetPulpHash(name string) []byte {
	return crypto.Keccak256([]byte(name))[:PulpHashLength]
}
```

下面返回给定 `msg` 的前缀字节。以下是如何为 Pulp 编码登记对象的例子：

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

编码仅仅是 RLP `GetPulpHash`编码和预先准备的  散列的  中的 ：`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

解码作业如下：

```go
// retrieve type of objet based on prefix
rtype := typeInfos[hex.EncodeToString(incomingData[:PulpHashLength])]

// create new object
newMsg := reflect.New(rtype).Interface()

// decode without prefix and inject into newly created object
if err := rlp.DecodeBytes(incomingData[PulpHashLength:], newMsg); err != nil {
	return nil, err
}

// result => newMsg
```

:::info 有关更多信息

Cosmos SDK 利用两种二进制线编码协议：[Amino](https://github.com/tendermint/go-amino/) 和 [Protocol Buffers](https://developers.google.com/protocol-buffers)，其中 Amino 是一种对象编码规范。
它是 Proto3 的一个子集，有一个接口支持的扩展。
关于 Proto3 的更多信息，请参见 [Proto3 规范](https://developers.google.com/protocol-buffers/docs/proto3)，Amino 与之基本兼容（但与 Proto2 不兼容）。

更多信息：[https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
