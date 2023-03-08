---
id: setup
title: 设置
description: 如何设置 chainBridge
keywords:
  - docs
  - polygon
  - edge
  - Bridge
---

## 合约部署 {#contracts-deployment}

在本节中，您会在 Polygon PoS 和 Polygon Edge 链中使用`cb-sol-cli`部署所需合约。

```bash
# Setup for cb-sol-cli command
$ git clone https://github.com/ChainSafe/chainbridge-deploy.git
$ cd chainbridge-deploy/cb-sol-cli
$ make install
```

首先，我们需要通过`cb-sol-cli deploy`指令在 Polygon Pos 中部署合约。`--all`标志使指令部署所有的合约，包括 Bridge、ERC20 Handler、ERC721 Handler、Generic Handler、ERC20 和 ERC721 合约。此外，设置默认的中继器账户地址和阈值

```bash
# Deploy all required contracts into Polygon PoS chain
$ cb-sol-cli deploy --all --chainId 99 \
  --url https://rpc-mumbai.matic.today \
  --gasPrice [GAS_PRICE] \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --relayers [RELAYER_ACCOUNT_ADDRESS] \
  --relayerThreshold 1
```


在[此处](/docs/edge/additional-features/chainbridge/definitions)了解 chainID 和 JSON-RPC URL

:::caution

`cb-sol-cli`的默认燃料价格是`20000000`（`0.02 Gwei`）。要在交易中设置合适的燃料价格，请使用`--gasPrice`参数设置值。

```bash
$ cb-sol-cli deploy --all --chainId 99 \
  --url https://rpc-mumbai.matic.today \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --relayers [RELAYER_ACCOUNT_ADDRESS] \
  --relayerThreshold 1 \
  # Set gas price to 5 Gwei
  --gasPrice 5000000000
```

:::

:::caution

桥接合约部署时需要大约 0x3f97b8 (4167608) 燃料。请确保生成的区块包含足够的区块燃料限制，可包含合约生成交易。要了解更多有关在 Polygon Edge 中更改区块燃料限制的内容，请查看[本地设置](/docs/edge/get-started/set-up-ibft-locally)

:::

合约部署后，您会获得以下结果：

```bash
Deploying contracts...
✓ Bridge contract deployed
✓ ERC20Handler contract deployed
✓ ERC721Handler contract deployed
✓ GenericHandler contract deployed
✓ ERC20 contract deployed
WARNING: Multiple definitions for safeTransferFrom
✓ ERC721 contract deployed

================================================================
Url:        https://rpc-mumbai.matic.today
Deployer:   <ADMIN_ACCOUNT_ADDRESS>
Gas Limit:   8000000
Gas Price:   20000000
Deploy Cost: 0.00029065308

Options
=======
Chain Id:    <CHAIN_ID>
Threshold:   <RELAYER_THRESHOLD>
Relayers:    <RELAYER_ACCOUNT_ADDRESS>
Bridge Fee:  0
Expiry:      100

Contract Addresses
================================================================
Bridge:             <BRIDGE_CONTRACT_ADDRESS>
----------------------------------------------------------------
Erc20 Handler:      <ERC20_HANDLER_CONTRACT_ADDRESS>
----------------------------------------------------------------
Erc721 Handler:     <ERC721_HANDLER_CONTRACT_ADDRESS>
----------------------------------------------------------------
Generic Handler:    <GENERIC_HANDLER_CONTRACT_ADDRESS>
----------------------------------------------------------------
Erc20:              <ERC20_CONTRACT_ADDRESS>
----------------------------------------------------------------
Erc721:             <ERC721_CONTRACT_ADDRESS>
----------------------------------------------------------------
Centrifuge Asset:   Not Deployed
----------------------------------------------------------------
WETC:               Not Deployed
================================================================
```

现在我们可以将合约部署到 Polygon Edge 链。

```bash
# Deploy all required contracts into Polygon Edge chain
$ cb-sol-cli deploy --all --chainId 100 \
  --url http://localhost:10002 \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --relayers [RELAYER_ACCOUNT_ADDRESS] \
  --relayerThreshold 1
```

已部署的智能合约地址保存终端输出，我们需要这些在下一步中使用它们。

## 中继器设置 {#relayer-setup}

在该节，您需要在 2 条链之间开启中继器交换数据。

首先，我们需要克隆和建立 ChainBridge 存储库。

```bash
$ git clone https://github.com/ChainSafe/ChainBridge.git
$ cd chainBridge && make install
```

然后，您需要创建 `config.json` 和设置每条链的 JSON-RPC URL、中继器地址以及合约地址。

```json
{
  "chains": [
    {
      "name": "mumbai",
      "type": "ethereum",
      "id": "99",
      "endpoint": "https://rpc-mumbai.matic.today",
      "from": "<RELAYER_ACCOUNT_ADDRESS>",
      "opts": {
        "bridge": "<BRIDGE_CONTRACT_ADDRESS>",
        "erc20Handler": "<ERC20_HANDLER_CONTRACT_ADDRESS>",
        "erc721Handler": "<ERC721_HANDLER_CONTRACT_ADDRESS>",
        "genericHandler": "<GENERIC_HANDLER_CONTRACT_ADDRESS>",
        "minGasPrice": "1",
        "http": "true"
      }
    },
    {
      "name": "polygon-edge",
      "type": "ethereum",
      "id": "100",
      "endpoint": "http://localhost:10002",
      "from": "<RELAYER_ACCOUNT_ADDRESS>",
      "opts": {
        "bridge": "<BRIDGE_CONTRACT_ADDRESS>",
        "erc20Handler": "<ERC20_HANDLER_CONTRACT_ADDRESS>",
        "erc721Handler": "<ERC721_HANDLER_CONTRACT_ADDRESS>",
        "genericHandler": "<GENERIC_HANDLER_CONTRACT_ADDRESS>",
        "minGasPrice": "1",
        "http": "true"
      }
    }
  ]
}
```

要开始中继器，您需要导入对应中继器账户地址的私钥。导入私钥时您需要输入密码。导入成功后，密钥会存储在`keys/<ADDRESS>.key`。

```bash
# Import private key and store to local with encryption
$ chainbridge accounts import --privateKey [RELAYER_ACCOUNT_PRIVATE_KEY]

INFO[11-19|07:09:01] Importing key...
Enter password to encrypt keystore file:
> [PASSWORD_TO_ENCRYPT_KEY]
INFO[11-19|07:09:05] private key imported                     address=<RELAYER_ACCOUNT_ADDRESS> file=.../keys/<RELAYER_ACCOUNT_ADDRESS>.key
```

然后，您会开启中继器。您需要输入一开始为存储密钥选择的相同密钥。

```bash
# Start relayer
$ chainbridge --config config.json --latest

INFO[11-19|07:15:19] Starting ChainBridge...
Enter password for key ./keys/<RELAYER_ACCOUNT_ADDRESS>.key:
> [PASSWORD_TO_DECRYPT_KEY]
INFO[11-19|07:15:25] Connecting to ethereum chain...          chain=mumbai url=<JSON_RPC_URL>
Enter password for key ./keys/<RELAYER_ACCOUNT_ADDRESS>.key:
> [PASSWORD_TO_DECRYPT_KEY]
INFO[11-19|07:15:31] Connecting to ethereum chain...          chain=polygon-edge url=<JSON_RPC_URL>
```

开启中继器后，它会开始在每条链上查看新区块。
