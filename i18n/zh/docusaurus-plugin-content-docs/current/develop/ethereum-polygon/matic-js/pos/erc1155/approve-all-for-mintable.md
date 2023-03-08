---
id: approve-all-for-mintable
title: approveAllForMintable
keywords:
- 'pos client, erc115, approve, polygon, sdk'
description: '批准 ERC1155 可铸造代币。'
---

# approveAllForMintable {#approveallformintable}

`approveAllForMintable` 方法可用于批准根代币上的所有可铸造代币。

```
const erc115RootToken = posClient.erc115(<root token address>,true);

const approveResult = await erc115RootToken.approveAllForMintable();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
