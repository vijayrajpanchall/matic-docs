---
id: api-architecture
title: API 架构
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: 读取和写入 API 以及交易设置。
---

该库始终遵循通用的 API 架构，API 分为两种类型 -

1. 读取 API
2. 写入 API

## 读取 API {#read-api}

读取 API 不会在区块链上发布数据，因此不会消耗燃料。 读取 API 的示例是 - `getBalance`、`isWithdrawExited` 等。

让我们看一个读取 API 的示例 -

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

读取 API 非常简单，且直接返回结果。

## 写入 API {#write-api}

写入 API 会在区块链上发布数据，因此会消耗燃料。 写入 API 的示例是 - `approve`、`deposit` 等。

当您调用写入 API 时 - 您需要来自结果的两个数据。

1. TransactionHash
2. TransactionReceipt

让我们看一个写入 API 和获取 transactionhash 及 TransactionReceipt 的示例 -

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

## 交易选项 {#transaction-option}

有几个适用于所有 API 的可配置选项。 这些配置可以传入参数。

可用配置为 -

- from?: string | number - 付款地址。
- to?: string - 收款地址。
- value?: number | string | BN - 交易转账数量，单位为 wei。
- gasLimit?: number | string - 为交易提供的最高燃料（燃料限制）。
- gasPrice?: number | string | BN - 用于交易的燃料价格，单位为 wei。
- data?: string - 合约的字节码。
- nonce?: number;
- chainId?: number;
- chain?: string;
- hardfork?: string;
- returnTransaction?: boolean - 设为 True，将返回可用于手动发送交易的交易对象。

让我们看一个配置 gasPrice 的示例

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
