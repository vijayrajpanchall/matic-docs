---
id: stdtx
title: StdTx
description: 使用收费和签名包装 Msg 的标准方法。
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

Heimdall 的 `StdTx`并没有对每笔交易都使用 `Fee`。我们的交易类型非常有限，由于最终用户不会在 Heimdall 上部署任何类型的合约，因此交易使用固定手续费模式。

在此查看：[https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

来源：[https://github.com/maticnetwork/heimdall/blob/master/auth/pysteps/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)