---
id: transfer
title: 转账
keywords:
- 'pos client, erc1155, transfer, polygon, sdk'
description: '将代币从一个用户转账至另一个用户。'
---

`transfer` 方法可用于将代币从一个用户转账至另一个用户。

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.transfer({
    tokenId: <tokenId>,
    amount: <amount>,
    from : <from address>,
    to : <to address>,
    data : <data to sent>, // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
