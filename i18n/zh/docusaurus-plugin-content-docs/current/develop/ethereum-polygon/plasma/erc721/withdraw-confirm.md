---
id: withdraw-confirm
title: withdrawChallenge
keywords:
- 'plasma client, erc721, withdrawChallenge, polygon, sdk'
description: 'Maticjs 快速入门'
---

# withdrawConfirm {#withdrawconfirm}

`withdrawConfirm` 方法是 Plasma 提现流程的第二步。您将在这一步骤中提交燃烧交易证明（首次交易），然后创建等值的 ERC721 代币。

这一流程顺利完成后，挑战期正式开始。当挑战期结束后，用户可将提现额取回到根链上的账户。

主网的挑战期是 7 天。

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
