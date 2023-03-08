---
id: safe-deposit
title: safeDeposit
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'Maticjs 快速入门'
---

# safeDeposit {#safedeposit}

`safeDeposit` 方法可用于将以太坊中的代币存入 Polygon 链。

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
