---
id: withdraw-confirm-faster
title: 快速提现挑战
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'Maticjs 快速入门'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

`withdrawConfirmFaster` 方法是 Plasma 提现流程的第二步。您将在这一步骤中提交燃烧交易证明（首次交易），然后创建等值的 ERC721 代币。

这一流程顺利完成后，挑战期正式开始。当挑战期结束后，用户可将提现额取回到根链上的账户。

主网的挑战期是 7 天。

<div class="highlight mb-20px mt-20px">由于证明在后端生成，因此速度非常快。您需要配置 [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)。</div>

**注意**— 在开始提现挑战之前withdrawStart 交易必须具有检查点。

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

挑战期结束后可调用 `withdrawExit` 以退出提现流程并取回提现额。
