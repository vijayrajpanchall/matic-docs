---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: 链链链（Chainlink）是建立在以太机上的一个分散区块链序列网络。
keywords:
  - wiki
  - polygon
  - chainlink
  - oracle
  - decentralized
  - data
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**Chainlink** 使您的合约能够通过分散的序列网络**访问任何外部数据来源**。无论您的合约需要体育比赛结果、最新天气情况还是任何其他公开可用的数据，Chainlink 都可提供所需的工具。

## 去中心化数据 {#decentralized-data}

链链接最强大的功能之一已经分散、汇总和准备在链上消化数据，用于大多数流行密钥货币。这些被称为[**链链接数据种。**](https://docs.chain.link/docs/using-chainlink-reference-contracts)

以下是一个合约的有效示例，它可以拉取 Mumbai 测试网上以美元计价的 Matic 最新价格。

您所需要做的只是用您想要[的数据输入的任何地址](https://docs.chain.link/docs/matic-addresses#config)交换地址，您可以开始消化价格信息。

```
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai Testnet
     * Aggregator: MATIC/USD
     * Address: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

## 请求和接收周期 {#request-and-receive-cycle}

Chainlink 的请求和接收周期允许您的智能合约向任何外部 API 发出请求并使用响应。在实施之前，您的合约需要定义两个函数：

1. 一个**要求数据**的，以及
2. 另一个**接受回复的。**

为了请求数据，您的合约创建了一个`request`对象，它提供给一个序列。在预言机到达 API 并解析响应数据后，它会尝试使用您的智能合约中定义的回调函数，将数据回传至您的合约。

## 使用 {#uses}

1. **链链链接数据种**

这些是分散式数据参考点，已经在链上汇总，以及从现实世界中获取数据的最快、最简单和最便宜的方式。目前已支持一些最流行的加密货币和法定货币对。

对于使用数据种子，使用来自查因链接文件的 [**Polygon**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) 数据种子。

2. **链接可核查的随机函数**

获得可证明的随机号码，其中随机号码可以进行密码保证为随机编码。

对于使用 Chainlink VRF 时，使用来自 [Chaininlink 文件](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number)的 [**Polygon**](https://docs.chain.link/vrf/v2/subscription/supported-networks)  VRF 地址。

3. **链链接 API 调用**

如何配置您的智能合约，以与传统 API 合作，并自定义以获取任何数据，在互联网上发送任何请求，等等。

## 代码示例 {#code-example}

为了与外部 API 交互，您的智能合约应继承自 [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol)，该合约旨在简化处理请求。它的公开的结构是 `Chainlink.Request`，您的合约可将其用于构建 API 请求。

请求应定义序列地址、作业id、收费、适配器参数和调回函数签名。在本示例中，请求在 `requestEthereumPrice` 函数中构建。

`fulfill` 被定义为回调函数。

```
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {

    uint256 public price;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /**
     * Network: Polygon Mumbai Testnet
     * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
     * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */
    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9;
        jobId = "da20aae0e4c843f6949e5cb3f7cfe8c4";
        fee = 10 ** 16; // 0.01 LINK
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function requestBTCCNYPrice() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        // NOTE: If this oracle gets more than 5 requests from this job at a time, it will not return.
        request.add("get", "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=demo");

       // Set the path to find the desired data in the API response, where the response format is:
       // {
       //     "Realtime Currency Exchange Rate": {
       //       "1. From_Currency Code": "BTC",
       //       "2. From_Currency Name": "Bitcoin",
       //       "3. To_Currency Code": "CNY",
       //       "4. To_Currency Name": "Chinese Yuan",
       //       "5. Exchange Rate": "207838.88814500",
       //       "6. Last Refreshed": "2021-01-26 11:11:07",
       //       "7. Time Zone": "UTC",
       //      "8. Bid Price": "207838.82343000",
       //       "9. Ask Price": "207838.88814500"
       //     }
       //     }
        string[] memory path = new string[](2);
        path[0] = "Realtime Currency Exchange Rate";
        path[1] = "5. Exchange Rate";
        request.addStringArray("path", path);

        // Multiply the result by 10000000000 to remove decimals
        request.addInt("times", 10000000000);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        price = _price;
    }
}
```

## 主网 Polygon LINK 代币 {#mainnet-polygon-link-token}

要从以太机网上获取主网 Polygon 链接代币，您必须遵循两步处理。

1. 使用 Plasma 或 [PoS 桥](https://wallet.polygon.technology/bridge)来桥接您的 LINK。
2. 通过 Chainlink 部署的 [Pegswap 将 LINK 用于交换 ERC677](https://pegswap.chain.link/)。

Polygon 桥可带来 ERC20 版本的 LINK，而 LINK 是 ERC677，因此我们通过该交换进行更新。

## 地址 {#addresses}

目前，Polygon Mumbai 测试网上只有若干可操作的 Chainlink 预言机。您也可以自己运行一个，并在 Chainlink Marketplace 上发布。

* Oracle: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LINK: [`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

要在 Mumbai 检验网上获取 Link，请前往此处的 [Polygon faucet。](https://faucet.polygon.technology/)

## 支持的 API {#supported-apis}

Chainlink 请求和接收周期足够灵活，可调用任何公共 API，只要请求参数正确且响应格式已知。例如，我们希望获取响应对象的 URL 格式如下： `{"USD":243.33}`，路径非常简单： `"USD"`。


如果 API 使用复杂的 JSON 对象来回应，那么**路径**参数将需要指定在哪里检索所希望的数据，使用点点点划定的字符串来检索。例如，考虑以下回应：

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

它可能需要以下路径： `"Prices.USD"`。如果在字串中存在空间，或者字符串长得很长，我们可以使用上面示例中显示的语法，在那里我们将所有字符串转换为字符串阵列。

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## 任务 ID 有什么用？ {#what-are-job-ids-for}

您可能注意到，我们的[例子](#code-example)在创建请求时使用`jobId`参数。任务由预言机配置运行的一系列指令组成。在上述[代码示例](#code-example)中，合约使用以下任务 ID 向预言机发出请求： `da20aae0e4c843f6949e5cb3f7cfe8c4`。该特定任务配置用于完成以下事项：

* 发出 GET 请求
* 解析 JSON 响应
* 将数值乘以 *x*
* 将数值转换为 `uint`
* 提交到链上

因此，我们的合约会使用 `request.add` 语句添加 URL、在 JSON 响应中找到所需数据的路径以及请求次数。预言机中的 Adapters 可方便发出这些指令。

**对预言机提出的每一次请求都必须包含一个特定的任务 ID。**

以下是 Polygon 预言机配置运行的任务列表。

| 名称 | 返回类型 | ID | Adapters |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

完整的 Chainlink API 参考可在[此处](https://docs.chain.link/any-api/api-reference)找到。
