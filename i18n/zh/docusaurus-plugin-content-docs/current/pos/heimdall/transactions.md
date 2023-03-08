---
id: transactions
title: 交易
description: 什么是交易，何时使用交易
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# 交易 {#transactions}

交易由在[上下](https://docs.cosmos.network/main/core/context.html)文中持有的元数据和[信息](https://docs.cosmos.network/main/building-modules/messages-and-queries.html)组成，通过模块的 Handler 来触发模块内状态变化。

当用户希望与应用程序交互并实施状态更改（如发送代币）时，他们就会创建交易。在交易广播至网络之前，必须使用与相应账户关联的私钥，对每个交易的 `message` 签名。然后，交易必须包含在一个区块中，经过验证并通过共识过程获得网络的批准。如需了解关于交易生命周期的更多详情，请点击 [此处](https://docs.cosmos.network/main/basics/tx-lifecycle.html)。

## 类型定义 {#type-definition}

交易对象是实施接口的 SDK 类型`Tx`。

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

交易的更多详细信息：[https://docs.cosmos.network/main/core/交易](https://docs.cosmos.network/main/core/transactions.html)
