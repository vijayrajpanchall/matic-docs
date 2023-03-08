---
id: types
title: 类型
description: Heimdall 地址、 Pubkey & HeimdallHash 描述
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# 类型 {#types}

## HeimdallAddress {#heimdalladdress}

`HeimdallAddress`代表了 Heimdall 上的地址。地址采用以太坊的通用库。该地址的长度为 20 字节。

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

它代表在 Heimdall 中使用的公钥，`ecdsa`兼容未压缩的公钥。

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

它代表了 Heimdall 中的哈希值。哈希值使用以太坊的哈希值。

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
