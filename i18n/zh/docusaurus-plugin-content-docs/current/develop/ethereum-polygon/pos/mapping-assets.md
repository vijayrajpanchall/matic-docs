---
id: mapping-assets
title: 使用权益证明 (PoS) 来映射资产
description: "从 Polygon 映射资产到以太坊"
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### 简介 {#introduction}

为了在以太坊和 Polygon 之间来回转移您的资产，必须进行映射。

- **根链** :: 是指 Goerli 或以太坊主网
- **子链** :: 是指 Polygon Mumbai 或 Polygon 主网

如果您已在根链上部署了代币合约并希望将其移动到子链，则需要遵守本流程；然而，如果您计划在 Polygon 主网上部署您的合约，先在子链上铸造代币，随后把它们移回到根链，则应遵守本[指南](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets)。

## 标准子代币 {#standard-child-token}

如果只需要标准的 ERC20/ERC721/ERC1155 合约，您可以在 https://mapper.polygon.technology/ 上提交映射请求，我们将为您自动部署标准子代币合约。

标准子代币合约类似于：
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

请访问此[链接](/docs/develop/ethereum-polygon/submit-mapping-request)，了解如何创建新的映射请求。

## 自定义子代币 {#custom-child-token}

如果需要相对于标准函数而言添加额外函数的自定义子代币合约，**您必须在子链上部署您的代币合约，**然后在[此处](https://mapper.polygon.technology/)提交映射请求，同时将您部署的子代币合约地址也包含在内。下面我们提供一个创建自定义子代币合约的示例。

**您的自定义子合约部署到子链之前应遵守特定的准则。**

`deposit` 方法应出现在您的自定义子合约中。每当从根链上发起存入时，`ChildChainManagerProxy` 合约都会调用此函数。存入函数在子链上内部铸造代币。

`withdraw` 方法应出现在您的自定义子合约中。您可以通过调用该方法来燃烧子链上的代币。燃烧是提现流程中的第一步。该提现函数将内部燃烧子链上的代币。

需要遵循这些规则，以维持两种链之间的资产平衡。

:::note

在儿童代币合约的构造者中，没有进行代币操作。

:::

#### 实施 {#implementation}

既然已介绍_为何_需要在子代币合约中采取 `deposit` & `withdraw` 方法，现在我们开始实施。

```js title="ChildERC20.sol"
pragma solidity 0.6.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChildERC20 is ERC20,
{
    using SafeMath for uint256;

    constructor(string memory name, string memory symbol, uint8 decimals) public ERC20(name, symbol) {

        _setupDecimals(decimals);
        // can't mint here, because minting in child chain smart contract's constructor not allowed
        // _mint(msg.sender, 10 ** 27);

    }

    function deposit(address user, bytes calldata depositData) external {
        uint256 amount = abi.decode(depositData, (uint256));

        // `amount` token getting minted here & equal amount got locked in RootChainManager
        _totalSupply = _totalSupply.add(amount);
        _balances[user] = _balances[user].add(amount);

        emit Transfer(address(0), user, amount);
    }

    function withdraw(uint256 amount) external {
        _balances[msg.sender] = _balances[msg.sender].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);

        emit Transfer(msg.sender, address(0), amount);
    }

}
```

在上述代码样本中，您可能已经注意到任何人都可以调用 `deposit` 函数，这是不允许的。为了防止发生这种情形，我们将限制为仅允许 `ChildChainManagerProxy` 调用。（ChildChainManagerProxy - 在 [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions) 上，在 [Polygon 主网](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/)上）

```js title="ChildERC20.sol"
pragma solidity 0.6.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChildERC20 is ERC20,
{
    using SafeMath for uint256;
    // keeping it for checking, whether deposit being called by valid address or not
    address public childChainManagerProxy;
    address deployer;

    constructor(string memory name, string memory symbol, uint8 decimals, address _childChainManagerProxy) public ERC20(name, symbol) {

        _setupDecimals(decimals);
        childChainManagerProxy = _childChainManagerProxy;
        deployer = msg.sender;

        // Can't mint here, because minting in child chain smart contract's constructor not allowed
        //
        // In case of mintable tokens it can be done, there can be external mintable function too
        // which can be called by some trusted parties
        // _mint(msg.sender, 10 ** 27);

    }

    // being proxified smart contract, most probably childChainManagerProxy contract's address
    // is not going to change ever, but still, lets keep it
    function updateChildChainManager(address newChildChainManagerProxy) external {
        require(newChildChainManagerProxy != address(0), "Bad ChildChainManagerProxy address");
        require(msg.sender == deployer, "You're not allowed");

        childChainManagerProxy = newChildChainManagerProxy;
    }

    function deposit(address user, bytes calldata depositData) external {
        require(msg.sender == childChainManagerProxy, "You're not allowed to deposit");

        uint256 amount = abi.decode(depositData, (uint256));

        // `amount` token getting minted here & equal amount got locked in RootChainManager
        _totalSupply = _totalSupply.add(amount);
        _balances[user] = _balances[user].add(amount);

        emit Transfer(address(0), user, amount);
    }

    function withdraw(uint256 amount) external {
        _balances[msg.sender] = _balances[msg.sender].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);

        emit Transfer(msg.sender, address(0), amount);
    }

}
```

该实施更新可用于映射。

步骤：

1. 在根链上部署根代币，即 {Goerli、以太坊主网}
2. 确保您的子代币拥有 `deposit` & `withdraw` 函数。
3. 在子链上部署子代币，即 {Polygon Mumbai、 Polygon 主网}
4. 提交的映射请求将由团队负责解决。

### 提交请求 {#request-submission}

请使用[此链接](/docs/develop/ethereum-polygon/submit-mapping-request)提交映射请求。
