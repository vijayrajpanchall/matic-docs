---
id: derivatives
title: 衍生品
description: 通过验证者共享授权
keywords:
  - docs
  - polygon
  - matic
  - derivatives
  - delegation
  - shares
slug: derivatives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon 支持通过验证者共享[进行授权](/docs/maintain/glossary#delegator)。通过采用这种设计，无需过多计算便可以轻松地在以太坊主网合约上分配奖励和大规模罚款。

授权者通过从验证者那里购买有限资金池中的股份来进行授权。每名验证者均有自己的验证者共享代币。

让我们将验证者 A 的同质化验证者共享代币称为 VATIC。当用户授权给验证者 A 时，用户会根据 MATIC-VATIC 对的汇率而获得 VATIC。随着用户价值的累积，该汇率表明用户持有的每个 VATIC 代币可以兑换到更多的 MATIC。当验证者被罚款时，用户持有的 VATIC 代币所能提取到的 MATIC 也会变少。

请注意，MATIC 是质押代币。授权者需要持有 MATIC 代币才能参与授权。

最初，当汇率为 1 VATIC 可以兑换 1 MATIC 时，授权人 D 会从验证者 A 的特定资金池中购买代币。

当验证者获得更多 MATIC 代币奖励时，池子内也会加入新代币。

假设当前池中有 100 个 MATIC 代币，池中会添加 10 个 MATIC 的奖励。由于VATIC 代币的总供应没有因奖励而改变，汇率变成每0.9 VATIC 1 MATIC。现在，授权者 D 获得相同金额的更大 MATIC 值，如果共享。

## 合约中的流程 {#the-flow-in-the-contract}

`buyVoucher`：当对验证者进行授权时，会赋予此功能。首先将授权`_amount`转让给`stakeManager`，通过`Mint`使用当前`exchangeRate`来确认铸币授权份额。

汇率按以下公式计算：

`ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares`

`sellVoucher`：当授权者从验证者那里取消绑定时，会调用该函数。此函数基本上启动了授权期间销售购买凭证的过程。在授权者`claim`代币之前，需要考虑提现期。

`withdrawRewards`：作为授权者，您可以通过调用该`withdrawRewards`函数来申领您的奖励。

`reStake`：可以通过两种方式来重新质押代币：a) 授权者可以使用 `buyVoucher` 或 `reStake` 奖励来购买更多股份。您可以通过向验证者质押更多代币的方式来重新质押，也可以作为授权者重新质押您所累积的奖励。`reStaking`的目的在于：由于授权者的验证者现在拥有更多有效的质押代币，授权人和验证者都将因此而获得更多奖励。

`unStakeClaimTokens`：提现期结束后，授权者会卖掉他们的份额以申领 MATIC 代币。

`updateCommissionRate`：更新验证者的佣金百分比。另请参阅[《验证者佣金操作》](/docs/maintain/validate/validator-commission-operations)。

`updateRewards`：当验证人因提交[检查点](/docs/maintain/glossary#checkpoint-transaction)而获得奖励时，调用此函数，以便在验证者和授权者之间分配奖励。
