---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: '批准根代币的最大数量。'
---

`approveMax` 方法可用于批准根代币的最大数量。

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

获得批准的地址被称为 `spenderAddress`。它是第三方用户或智能合约，可代表您进行代币转账。

默认情况下，spenderAddress 值为 ERC20 谓词地址。

您可以手动指定 spenderAddress 值。

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
