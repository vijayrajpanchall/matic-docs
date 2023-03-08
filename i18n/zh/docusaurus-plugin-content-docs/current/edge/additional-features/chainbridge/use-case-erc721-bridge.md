---
id: use-case-erc721-bridge
title: 使用案例 - ERC721 桥接
description: 桥接 ERC721 合约的示例
keywords:
  - docs
  - polygon
  - edge
  - Bridge
  - ERC721
---

本节旨在为实际使用案例提供 ERC721 桥接的设置流。

在本指南中，您将使用 Mumbai Polygon PoS 测试网和 Polygon Edge 本地链。请确保您拥有 Mumbai 的 JSON-RPC 端点，并已在本地环境中设置 Polygon Edge。有关更多详细信息，请参阅[本地设置](/docs/edge/get-started/set-up-ibft-locally)或[云设置](/docs/edge/get-started/set-up-ibft-on-the-cloud)。

## 假设 {#scenario}

本假设是为已经部署在公有链 (Polygon PoS) 中的 ERC721 NFT 设置桥接，以便在常规情况下为用户在私有链 (Polygon Edge) 中启用低成本转账。在这种情况下，原始元数据已在公有链中定义，公有链中转入的唯一 NFT 可以存在于私有链中。因此，您需要在公有链中使用锁定/释放模式，在私有链中使用燃烧/铸造模式。

从公共链向私有链中发送 NFT 时，NFT 将锁定在公链中的 ERC721 Handler 合约中，同一个 NFT 将被铸造在私有链中。另一方面，如果从私有链转入公有链中，私有链中的 NFT 将被烧毁，同一个 NFT 将公有链中的 ERC721 Handler 合约释放。

## 合约 {#contracts}

用简单的 ERC721 合约而不是通过 ChainBridge 开发的合约来解释。对于燃烧/铸造模式，ERC721 合约除了拥有 ERC721 中定义的方法外，还必须拥有`mint`和`burn`方法，如下所示：

```sol
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SampleNFT is ERC721, ERC721Burnable, ERC721URIStorage, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    string public baseURI;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) ERC721(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(BURNER_ROLE, _msgSender());

        _setBaseURI(baseURI);
    }

    function mint(
        address recipient,
        uint256 tokenID,
        string memory data
    ) public onlyRole(MINTER_ROLE) {
        _mint(recipient, tokenID);
        _setTokenURI(tokenID, data);
    }

    function burn(uint256 tokenID)
        public
        override(ERC721Burnable)
        onlyRole(BURNER_ROLE)
    {
        _burn(tokenID);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId)
        internal
        virtual
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function _setBaseURI(string memory baseURI_) internal {
        baseURI = baseURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
}
```

所有代码和脚本都在 Github Repo [Trapesys/chainbridge-example](https://github.com/Trapesys/chainbridge-example) 中。

## Step1：部署桥接和 ERC721 Handler 合约 {#step1-deploy-bridge-and-erc721-handler-contracts}

首先，您将使用两种链中的`cb-sol-cli`部署桥接和 ERC721Handler 合约。

```bash
# Deploy Bridge and ERC721 contracts in Polygon PoS chain
$ cb-sol-cli deploy --bridge --erc721Handler --chainId 99 \
  --url https://rpc-mumbai.matic.today \
  --gasPrice [GAS_PRICE] \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --relayers [RELAYER_ACCOUNT_ADDRESS] \
  --relayerThreshold 1
```

```bash
# Deploy Bridge and ERC721 contracts in Polygon Edge chain
$ cb-sol-cli deploy --bridge --erc721Handler --chainId 100 \
  --url http://localhost:10002 \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --relayers [RELAYER_ACCOUNT_ADDRESS] \
  --relayerThreshold 1
```

您将获得桥接和 ERC721Handler 合约地址，如下所示：

```bash
Deploying contracts...
✓ Bridge contract deployed
✓ ERC721Handler contract deployed

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
Erc20 Handler:      Not Deployed
----------------------------------------------------------------
Erc721 Handler:     <ERC721_HANDLER_CONTRACT_ADDRESS>
----------------------------------------------------------------
Generic Handler:    Not Deployed
----------------------------------------------------------------
Erc20:              Not Deployed
----------------------------------------------------------------
Erc721:             Not Deployed
----------------------------------------------------------------
Centrifuge Asset:   Not Deployed
----------------------------------------------------------------
WETC:               Not Deployed
================================================================
```

## Step2：部署 ERC721 合约 {#step2-deploy-your-erc721-contract}

您将部署 ERC721 合约。本示例使用 hardhat 项目 [Trapesys/chainbridge-example](https://github.com/Trapesys/chainbridge-example) 指导您。

```bash
$ git clone https://github.com/Trapesys/chainbridge-example.git
$ cd chainbridge-example
$ npm i
```

请创建`.env`文件并设置以下值。

```.env
PRIVATE_KEYS=0x...
MUMBAI_JSONRPC_URL=https://rpc-mumbai.matic.today
EDGE_JSONRPC_URL=http://localhost:10002
```

接下来，您将在两条链中部署 ERC721 合约。

```bash
$ npx hardhat deploy --contract erc721 --name <ERC721_TOKEN_NAME> --symbol <ERC721_TOKEN_SYMBOL> --uri <BASE_URI> --network mumbai
```

```bash
$ npx hardhat deploy --contract erc721 --name <ERC721_TOKEN_NAME> --symbol <ERC721_TOKEN_SYMBOL> --uri <BASE_URI> --network edge
```

部署成功后，您将获得如下合约地址：

```bash
ERC721 contract has been deployed
Address: <ERC721_CONTRACT_ADDRESS>
Name: <ERC721_TOKEN_NAME>
Symbol: <ERC721_TOKEN_SYMBOL>
Base URI: <ERC721_BASE_URI>
```

## Step3：在桥接中注册资源 ID。 {#step3-register-resource-id-in-bridge}

您将注册资源 ID，该 ID 将连接到交叉链环境中的资源。

```bash
$ cb-sol-cli bridge register-resource \
  --url https://rpc-mumbai.matic.today \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --gasPrice [GAS_PRICE] \
  # Set Resource ID for ERC721
  --resourceId "0x000000000000000000000000000000e389d61c11e5fe32ec1735b3cd38c69501" \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --handler "[ERC721_HANDLER_CONTRACT_ADDRESS]" \
  --targetContract "[ERC721_CONTRACT_ADDRESS]"
```

```bash
$ cb-sol-cli bridge register-resource \
  --url http://localhost:10002 \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  # Set Resource ID for ERC721
  --resourceId "0x000000000000000000000000000000e389d61c11e5fe32ec1735b3cd38c69501" \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --handler "[ERC721_HANDLER_CONTRACT_ADDRESS]" \
  --targetContract "[ERC721_CONTRACT_ADDRESS]"
```

## Step4：在边缘的 ERC721 桥接中设置铸造/燃烧模式 {#step4-set-mint-burn-mode-in-erc721-bridge-of-the-edge}

桥接预计在边缘中以燃烧/铸造模式运作。您将设置燃烧/铸造模式。

```bash
$ cb-sol-cli bridge set-burn \
  --url http://localhost:10002 \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --handler "[ERC721_HANDLER_CONTRACT_ADDRESS]" \
  --tokenContract "[ERC721_CONTRACT_ADDRESS]"
```

您需要给予 ERC721 Handler 合约铸造和燃烧角色。

```bash
$ npx hardhat grant --role mint --contract [ERC721_CONTRACT_ADDRESS] --address [ERC721_HANDLER_CONTRACT_ADDRESS] --network edge
$ npx hardhat grant --role burn --contract [ERC721_CONTRACT_ADDRESS] --address [ERC721_HANDLER_CONTRACT_ADDRESS] --network edge
```

## Step5：铸币 NFT {#step5-mint-nft}

您在 Mumbai 链中铸造新的 ERC721 NFT。

```bash
$ npx hardhat mint --type erc721 --contract [ERC721_CONTRACT_ADDRESS] --address [ACCOUNT_ADDRESS] --id 0x50 --data hello.json --network mumbai
```

交易成功后，账户将拥有铸造的 NFT。

## Step6：开始 ERC72 转账 {#step6-start-erc721-transfer}

在开始此步骤之前，请确保您已启动中继器。欲了解更多详情，请查看[设置](/docs/edge/additional-features/chainbridge/setup)。

在 NFT 从 Mumbai 转账到边缘期间，Mumbai 的 ERC721 Handler 合约将从您的账户中提取NFT。您将在转账之前调用批准。

```bash
$ npx hardhat approve --type erc721 --contract [ERC721_CONTRACT_ADDRESS] --address [ERC721_HANDLER_CONTRACT_ADDRESS] --id 0x50 --network mumbai
```

最后，您将开始从 Mumbai 到边缘的 NFT 转账。

```bash
# Start transfer from Mumbai to Polygon Edge chain
$ cb-sol-cli erc721 deposit \
  --url https://rpc-mumbai.matic.today \
  --privateKey [PRIVATE_KEY] \
  --gasPrice [GAS_PRICE] \
  --id 0x50 \
  # ChainID for Polygon Edge chain
  --dest 100 \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --recipient "[RECIPIENT_ADDRESS_IN_POLYGON_EDGE_CHAIN]" \
  --resourceId "0x000000000000000000000000000000e389d61c11e5fe32ec1735b3cd38c69501"
```

存入交易成功后，中继器将获得事件并为提案投票。  在所需投票数提交后，执行发送 NFT 到 Polygon Edge 链中的接收者账户的交易。

```bash
INFO[11-19|09:07:50] Handling nonfungible deposit event       chain=mumbai
INFO[11-19|09:07:50] Attempting to resolve message            chain=polygon-edge type=NonFungibleTransfer src=99 dst=100 nonce=2 rId=000000000000000000000000000000e389d61c11e5fe32ec1735b3cd38c69501
INFO[11-19|09:07:50] Creating erc721 proposal                 chain=polygon-edge src=99 nonce=2
INFO[11-19|09:07:50] Watching for finalization event          chain=polygon-edge src=99 nonce=2
INFO[11-19|09:07:50] Submitted proposal vote                  chain=polygon-edge tx=0x58a22d84a08269ad2e8d52d8dc038621f1a21109d11c7b6e0d32d5bf21ea8505 src=99 depositNonce=2 gasPrice=1
INFO[11-19|09:08:15] Submitted proposal execution             chain=polygon-edge tx=0x57419844881a07531e31667c609421662d94d21d0709e64fb728138309267e68 src=99 dst=100 nonce=2 gasPrice=3
```

执行交易成功后，您将在 Polygon Edge 链中获取 NFT。
