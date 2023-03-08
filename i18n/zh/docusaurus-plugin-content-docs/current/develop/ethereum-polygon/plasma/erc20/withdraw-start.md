---
id: withdraw-start
title: 提现开始
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Maticjs 快速入门'
---

# withdrawStart {#withdrawstart}

`withdrawStart` 方法可用于发起燃烧特定数量子代币的提现流程。

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

存储将用于挑战提现流程的交易哈希。
