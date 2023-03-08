---
id: deposit-many
title: deplasmaitMany
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'Maticjs 快速入门'
---

# deplasmaitMany {#deplasmaitmany}

`deplasmaitMany` 方法可用于将多个代币从以太坊释放到 Polygon 链。

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
