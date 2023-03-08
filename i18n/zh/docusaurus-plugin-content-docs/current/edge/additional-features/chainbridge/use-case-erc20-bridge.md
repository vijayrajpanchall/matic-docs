---
id: use-case-erc20-bridge
title: 案例 - ERC20 桥接
description: 桥接 ERC20 合约的例子
keywords:
  - docs
  - polygon
  - edge
  - Bridge
  - ERC20
---

本节旨在为实际使用案例提供 ERC20 桥接的设置流程。

在本指南中，您将使用孟买 Polygon PoS 测试网和 Polygon Edge 本地链。请确保您拥有 Mumbai 的 JSON-RPC 端点，并已在本地环境中设置 Polygon Edge。有关更多详细信息，请参阅[本地设置](/docs/edge/get-started/set-up-ibft-locally)或[云设置](/docs/edge/get-started/set-up-ibft-on-the-cloud)。

## 假设 {#scenario}

这一情景用于设置 ERC20 代币的桥接，这一代币已用于公有链（Polygon PoS），用于在私有链中方便用户启用花费较低的定期转账。在这种情况下，代币的总供应已经在公有链中定义，只有从公有链转移至私有链的代币数量才必须存在于私有链中。因此，您需要在公有链中使用锁定/发行模式，在私有链中使用销币/铸币模式。

从公共链向私有链中发送代币时，代币将锁定在公链中的 ERC20 Handler 合约中，相同代币数量将被铸造在私有链中。另一方面，如果从私有链转入公有链中，私有链中的代币将被烧毁，相同数量的代币将从公有链中的 ERC20 Handler 合约释放。

## 合约 {#contracts}

用简单的 ERC20 合约而不是通过 ChainBridge 开发的合约来解释。对于销币/铸币模式，ERC20 合约必须有`mint`和`burnFrom`方式，还有类似用于 ERC20 的方式：

```sol
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract SampleToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(BURNER_ROLE, _msgSender());
    }

    function mint(address recipient, uint256 amount)
        external
        onlyRole(MINTER_ROLE)
    {
        _mint(recipient, amount);
    }

    function burnFrom(address owner, uint256 amount)
        external
        onlyRole(BURNER_ROLE)
    {
        _burn(owner, amount);
    }
}
```

所有代码和脚本都在 Github Repo [Trapesys/chainbridge-example](https://github.com/Trapesys/chainbridge-example) 中。

## 步骤1：部署桥接和 ERC20 Handler 合约 {#step1-deploy-bridge-and-erc20-handler-contracts}

首先，您将使用`cb-sol-cli`在两种链中部署桥接和 ERC20Handler 合约。

```bash
# Deploy Bridge and ERC20 contracts in Polygon PoS chain
$ cb-sol-cli deploy --bridge --erc20Handler --chainId 99 \
  --url https://rpc-mumbai.matic.today \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --gasPrice [GAS_PRICE] \
  --relayers [RELAYER_ACCOUNT_ADDRESS] \
  --relayerThreshold 1
```

```bash
# Deploy Bridge and ERC20 contracts in Polygon Edge chain
$ cb-sol-cli deploy --bridge --erc20Handler --chainId 100 \
  --url http://localhost:10002 \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --relayers [RELAYER_ACCOUNT_ADDRESS] \
  --relayerThreshold 1
```

您将获得桥接和 ERC20 Handler 合约地址，如下所示：

```bash
Deploying contracts...
✓ Bridge contract deployed
✓ ERC20Handler contract deployed

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
Erc721 Handler:     Not Deployed
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

## 步骤2：部署您的 ERC20 合约 {#step2-deploy-your-erc20-contract}

您会部署您的 ERC20 合约。本示例使用 hardhat 项目 [Trapesys/chainbridge-example](https://github.com/Trapesys/chainbridge-example) 指导您。

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

接下来，您将在两条链中部署 ERC20 合约。

```bash
$ npx hardhat deploy --contract erc20 --name <ERC20_TOKEN_NAME> --symbol <ERC20_TOKEN_SYMBOL> --network mumbai
```

```bash
$ npx hardhat deploy --contract erc20 --name <ERC20_TOKEN_NAME> --symbol <ERC20_TOKEN_SYMBOL> --network edge
```

部署成功后，您将获得如下合约地址：

```bash
ERC20 contract has been deployed
Address: <ERC20_CONTRACT_ADDRESS>
Name: <ERC20_TOKEN_NAME>
Symbol: <ERC20_TOKEN_SYMBOL>
```

## 步骤3：在桥接中注册资源 ID {#step3-register-resource-id-in-bridge}

您将注册资源 ID，该 ID 将连接到交叉链环境中的资源。您需要在两条链中设置相同的资源 ID。

```bash
$ cb-sol-cli bridge register-resource \
  --url https://rpc-mumbai.matic.today \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --gasPrice [GAS_PRICE] \
  --resourceId "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00" \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --handler "[ERC20_HANDLER_CONTRACT_ADDRESS]" \
  --targetContract "[ERC20_CONTRACT_ADDRESS]"
```

```bash
$ cb-sol-cli bridge register-resource \
  --url http://localhost:10002 \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --resourceId "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00" \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --handler "[ERC20_HANDLER_CONTRACT_ADDRESS]" \
  --targetContract "[ERC20_CONTRACT_ADDRESS]"
```

## 步骤4：在边缘的 ERC20 桥接中设置铸币/销币模式 {#step4-set-mint-burn-mode-in-erc20-bridge-of-the-edge}

桥接预期会在 Polygon Edge 中作为销币/铸币模式运作。您会使用`cb-sol-cli`的销币/铸币模式。

```bash
$ cb-sol-cli bridge set-burn \
  --url http://localhost:10002 \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --handler "[ERC20_HANDLER_CONTRACT_ADDRESS]" \
  --tokenContract "[ERC20_CONTRACT_ADDRESS]"
```

您需要在 ERC20 Handler 合约中设置铸币者和销币者角色。

```bash
$ npx hardhat grant --role mint --contract [ERC20_CONTRACT_ADDRESS] --address [ERC20_HANDLER_CONTRACT_ADDRESS] --network edge
$ npx hardhat grant --role burn --contract [ERC20_CONTRACT_ADDRESS] --address [ERC20_HANDLER_CONTRACT_ADDRESS] --network edge
```

## 步骤5：铸造代币 {#step5-mint-token}

您会在 Mumbai 链上铸造新的 ERC20 代币。

```bash
$ npx hardhat mint --type erc20 --contract [ERC20_CONTRACT_ADDRESS] --address [ACCOUNT_ADDRESS] --amount 100000000000000000000 --network mumbai # 100 Token
```

交易成功后，账户将拥有铸造的代币。

## 步骤6：开始 ERC20 转账 {#step6-start-erc20-transfer}

开始该步骤之前，请确保您已启动了中继器。欲了解更多详情，请查看[设置](/docs/edge/additional-features/chainbridge/setup)。

从 Mumbai 到 Edge 转账期间，ERC20 Handler 在 Mumbai 的合约从您的账户中提取代币。您将在转账之前调用批准。

```bash
$ npx hardhat approve --type erc20 --contract [ERC20_CONTRACT_ADDRESS] --address [ERC20_HANDLER_CONTRACT_ADDRESS] --amount 10000000000000000000 --network mumbai # 10 Token
```

最后，您会使用`cb-sol-cli`开始从 Mumbai 向 Edge 转移代币。

```bash
# Start transfer from Mumbai to Polygon Edge chain
$ cb-sol-cli erc20 deposit \
  --url https://rpc-mumbai.matic.today \
  --privateKey [PRIVATE_KEY] \
  --gasPrice [GAS_PRICE] \
  --amount 10 \
  # ChainID of Polygon Edge chain
  --dest 100 \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --recipient "[RECIPIENT_ADDRESS_IN_POLYGON_EDGE_CHAIN]" \
  --resourceId "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00"
```

存入交易成功后，中继器将获得事件并为协议投票。在所需投票数提交后，执行交易，将代币发送到 Polygon Edge 链中的接收者账户。

```bash
INFO[11-19|08:15:58] Handling fungible deposit event          chain=mumbai dest=100 nonce=1
INFO[11-19|08:15:59] Attempting to resolve message            chain=polygon-edge type=FungibleTransfer src=99 dst=100 nonce=1 rId=000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00
INFO[11-19|08:15:59] Creating erc20 proposal                  chain=polygon-edge src=99 nonce=1
INFO[11-19|08:15:59] Watching for finalization event          chain=polygon-edge src=99 nonce=1
INFO[11-19|08:15:59] Submitted proposal vote                  chain=polygon-edge tx=0x67a97849951cdf0480e24a95f59adc65ae75da23d00b4ab22e917a2ad2fa940d src=99 depositNonce=1 gasPrice=1
INFO[11-19|08:16:24] Submitted proposal execution             chain=polygon-edge tx=0x63615a775a55fcb00676a40e3c9025eeefec94d0c32ee14548891b71f8d1aad1 src=99 dst=100 nonce=1 gasPrice=5
```

执行交易成功后，您将在 Polygon Edge 链中获取代币。
