---
id: withdraw-confirm
title: 提现挑战
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Maticjs 入门'
---

# withdrawConfirm {#withdrawconfirm}

`withdrawConfirm` 方法是 Plasma 提现流程中的第二步。您将在这一步骤中提交燃烧交易证明（首次交易），然后创建等值的 ERC 721代币。

这一流程顺利完成后，挑战期正式开始。当挑战期结束后，用户可将提现额取回到根链上的账户。

主网的挑战期是 7 天。

**注意** — 在开始提现挑战之前 withdrawStart 交易必须经过检查 。

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

挑战期结束后可调用 `withdrawExit` 以退出提现流程并取回提现额。
