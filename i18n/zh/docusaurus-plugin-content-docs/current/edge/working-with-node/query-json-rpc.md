---
id: query-json-rpc
title: 查询 JSON RPC 端点
description: "查询数据和使用预开采账户开启链。"
keywords:
  - docs
  - polygon
  - edge
  - query
  - premine
  - node
---

## 概述 {#overview}

Polygon Edge 的 JSON-RPC 层为开发者提供了通过 HTTP 申请与与区块链互动的功能。

该示例包含使用 **curl** 等工具查询信息以及使用预开采账户开启链，和发送交易。

## 步骤 1：创建带有预开采账户的 genesis 文件 {#step-1-create-a-genesis-file-with-a-premined-account}

要生成 genesis 文件，请运行以下指令：
````bash
polygon-edge genesis --premine 0x1010101010101010101010101010101010101010
````

**预开采**标志设定了一个地址，该地址需要在 **genesis** 文件中实现起始平衡。<br />在这种情况下，地址`0x1010101010101010101010101010101010101010`将拥有开始**默认余额**：`0xD3C21BCECCEDA1000000`（100万种本地货币代币）。

如果我们想要指定某个平衡，我们可以使用`:`分开平衡和地址，例如：
````bash
polygon-edge genesis --premine 0x1010101010101010101010101010101010101010:0x123123
````

平衡可以是 `hex` 或 `uint256` 值。

:::warning 仅预开采您持有私钥的账户！

如果您预开采了账户，但没有访问它们的私钥，您的预开采余额就不可用
:::

## 步骤 2：在开发模式中开启 Polygon Edge  {#step-2-start-the-polygon-edge-in-dev-mode}

要在开发模式中开启 Polygon Edge（详见 [CLI 指令](/docs/edge/get-started/cli-commands) 节），运行以下：
````bash
polygon-edge server --chain genesis.json --dev --log-level debug
````

## 步骤 3：查询账户余额 {#step-3-query-the-account-balance}

现在客户已经设定和运行了开发模式，使用在 **步骤 1** 中的 genesis 文件，我们可以使用类似**curl** 等工具查询账户余额：
````bash
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x1010101010101010101010101010101010101010", "latest"],"id":1}' localhost:8545
````

指令应该返回以下输出：
````bash
{
  "id":1,
  "result":"0x100000000000000000000000000"
}
````

## 步骤 4：发送转账交易 {#step-4-send-a-transfer-transaction}

现在我们确认设定为预开采的账户包含正确的余额，我们可以转账一些以太币：

````js
var Web3 = require("web3");

const web3 = new Web3("<provider's websocket jsonrpc address>"); //example: ws://localhost:10002/ws
web3.eth.accounts
  .signTransaction(
    {
      to: "<recipient address>",
      value: web3.utils.toWei("<value in ETH>"),
      gas: 21000,
    },
    "<private key from premined account>"
  )
  .then((signedTxData) => {
    web3.eth
      .sendSignedTransaction(signedTxData.rawTransaction)
      .on("receipt", console.log);
  });

````
