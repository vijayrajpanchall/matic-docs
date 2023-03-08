---
id: bandstandarddataset
title: Band 标准数据集
sidebar_label: Standard Dataset
description: Band Stardard Dataset 提供跨越密码资产、外汇和商品的 196 + 符号的实时价格信息
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - standard dataset
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

建立在 Polygon 上开发者现在可以利用 Band 协议的分散式的序列基础设施。在Band协议的序列上，他们现在可以访问各种密钥货币价格数据，以整合到应用程序中。

## 支持的代币 {#supported-tokens}

当前支持的符号列表详见 [data.bandprotocol.com](http://data.bandprotcool.com)。展望未来，此列表将根据开发者的需求和社区反馈继续扩展。

## 价格对 {#price-pairs}

只要数据集支持基础/计价符号，下面的这些方法可使用基础/计价代币对的任意组合。

### 查询价格 {#querying-prices}

目前，开发者有两种方法来查询 Band Protocollege 的价格：通过 Band 上的 Band `StdReference`智能合约和通过他们的 Java[`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)Script 帮助库查询。

### Solidity 智能合约 {#solidity-smart-contract}

为了查询 Band 协议的序列价格，智能合约应参照 Band 协议的合约`StdReference`，特别是方法`getReferenceData`和方法`getReferenceDatabulk`。

`getReferenceData`分别使用两条字符串作为输入点，分别使用两条字符串，即输入点`base`和`quote`符号。然后查询这两个代币的最新汇率 `StdReference` 合约，并返回如下所示的 `ReferenceData` 结构。

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk` 反之则采用两个列表，其中一个是 `base` 代币，另一个是 `quotes`。然后，它开始在每种指数上查询每对基点/报价的价格，并返回一系列结构`ReferenceData`。

例如，在我们调用 `getReferenceDataBulk`，如果使用 `['BTC','BTC','ETH']` 和 `['USD','ETH','BNB']`，返回的 `ReferenceData` 数组将包含有关对的信息：

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## 合约地址 {#contract-addresses}

| 区块链 | 合约地址 |
| -------------------- | :------------------------------------------: |
| polygon（测试） | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

Band 的节点辅助库 [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) 也可以支持类似的 `getReferenceData` 函数。该函数采用一个参数，即代币对列表，以查询结果。然后，返回相应的汇率值列表。


### 示例用法 {#example-usage}

下面的代码显示了函数的实例使用：

```javascript
const { Client } = require('@bandprotocol/bandchain.js');

// BandChain's REST Endpoint
const endpoint = 'https://rpc.bandchain.org';
const client = new Client(endpoint);

// This example demonstrates how to query price data from
// Band's standard dataset
async function exampleGetReferenceData() {
  const rate = await client.getReferenceData(['BTC/ETH','BAND/EUR']);
  return rate;
}

(async () => {
  console.log(await exampleGetReferenceData());
})();

```

相应的结果将类似于：

```bash
$ node index.js
[
    {
        pair: 'BTC/ETH',
        rate: 30.998744363906173,
        updatedAt: { base: 1615866954, quote: 1615866954 },
        requestID: { base: 2206590, quote: 2206590 }
    },
    {
        pair: 'BAND/EUR',
        rate: 10.566138918332376,
        updatedAt: { base: 1615866845, quote: 1615866911 },
        requestID: { base: 2206539, quote: 2206572 }
    }
]
```

每一对都将返回以下信息：

- `pair`： 基础/计价符号对字符串
- `rate`： 给定对的结果汇率
- `updated`： BandChain 上最后一次更新基础和计价符号的时间戳。对于此`USD`，这将为当前时间表。
- `rawRate`： 此对象包含两部分。
  - `value` 是实际汇率的 `BigInt` 值，乘以 `10^decimals`
  - `decimals` 当时是指数，乘以 `rate` 以获取 `rawRate`

## 示例用法 {#example-usage-1}

本[合约](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db)展示如何使用 Band `StdReference` 合约及 `getReferenceData` 函数的示例。