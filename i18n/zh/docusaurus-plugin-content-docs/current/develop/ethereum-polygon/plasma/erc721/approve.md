---
id: approve
title: 批准
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'Maticjs 快速入门'
---

# 批准 {#approve}

`approve` 方法可用于批准所需数量的根代币。

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
