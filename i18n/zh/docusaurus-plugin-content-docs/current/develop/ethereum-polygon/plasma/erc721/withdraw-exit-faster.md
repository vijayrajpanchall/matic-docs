---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Maticjs 快速入门'
---

# withdrawExitFaster {#withdrawexitfaster}

`withdrawExitFaster` 方法可用于批准所有代币。

由于证明在后端生成，因此速度非常快。通过私有专用的远程过程调用 (RPC)可配置后端。

**注意** — withdrawStart 必须在设立检查后才能退出提取。

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
