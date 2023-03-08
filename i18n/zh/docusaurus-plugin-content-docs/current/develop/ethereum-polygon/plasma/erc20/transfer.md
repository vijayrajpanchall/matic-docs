---
id: transfer
title: 转账
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'ERC20 Plasma 代币转账'
---

# 转账 {#transfer}

`transfer` 方法可用于从一个地址转账到另一个地址。

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## Matic 代币转账 {#transfer-matic-token}

Matic 是 Polygon 上的原生代币。 因此我们支持 Matic 代币转账，不需要任何代币地址。

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
