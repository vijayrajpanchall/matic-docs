---
id: troubleshooting
title: 疑难解答
description: "Polygon Edge 的疑难解答节"
keywords:
  - docs
  - polygon
  - edge
  - troubleshooting

---

# 疑难解答 {#troubleshooting}

## `method=eth_call err="invalid signature"`错误 {#error}

当您使用钱包和 Polygon Edge 进行交易时，请确保钱包的当地网络设置：

1. `chainID`是正确的。Edge 的默认`chainID`是`100`，但是可以通过使用 genisis 标志`--chain-id`定制。

````bash
genesis [--chain-id CHAIN_ID]
````
2. 确保在 RPC URL 字段，您使用了所连节点的 JSON RPC 端口。


## 如何获取 WebSocket URL {#how-to-get-a-websocket-url}

默认情况下，当您运行 polygon Edge 时，它根据链位置暴露 WebSocket 端点。URL 计划`wss://`用于 HTTP 链接，`ws://`用于 HTTP。

本地 WebSocket URL：
````bash
ws://<JSON-RPC URL>:<PORT>/ws
````
请注意端口号取决于所选 NODE 的 JSON-RPC 端口。

Edgenet WebSocket URL：
````bash
wss://rpc-edgenet.polygon.technology/ws
````

## `insufficient funds`尝试部署合约时候出错 {#error-when-trying-to-deploy-a-contract}

如果出现该错误，请确保您在适当的地址上存有足够的资金，且使用的地址是正确的。<br/>要设置与开采余额，您可以使用 genesis 标志，`genesis [--premine ADDRESS:VALUE]`同时会生成 genesis 文件。使用该标志的例子：
````bash
genesis --premine 0x3956E90e632AEbBF34DEB49b71c28A83Bc029862:1000000000000000000000
````
预开采 1000000000000000000000 WEI 至 0x3956E90e632AEbBF34DEB49b71c28A83Bc029862。


## 使用 Chainbridge 时无法释放 ERC20 代币 {#erc20-tokens-not-released-while-using-chainbridge}

如果您尝试在 Polygon POS 和当地的Edge 网络之间交易 ERC20 代币，且您的 ERC20 代币已存入，协议在中继层执行，但是代币没有在Edge 网络释放，请确保 Polygon Edge 链的 ERC20 Handler 有足够的代币用于释放<br/>。目的链的 Handler 合约必须有足够的代币才能在锁定释放模式下释放。如果您在当地的Edge 网络的 ERC20 Handler 没有足够的 ERC20 代币，请铸造新代币并将它们转移至 ERC20 Handler。

## `Incorrect fee supplied`使用 Chainbridge 时出错 {#error-when-using-chainbridge}

尝试在孟买 Polygon POS 链和当地的 Polygon Edge 设置之间转移 ERC20 代币时可能会出现错误。当您使用`--fee`标志在设置部署费用时出错，则您不需要再存款交易中设置相同高的值。您可以使用以下指令更改手续费：
````bash
 $ cb-sol-cli admin set-fee --bridge <BRIDGE_ADDRESS> --fee 0 --url <JSON_RPC_URL> --privateKey <PRIVATE_KEY>
 ````
您可以[在](https://github.com/ChainSafe/chainbridge-deploy/blob/main/cb-sol-cli/docs/deploy.md)此查询有关此标志的更多信息。





