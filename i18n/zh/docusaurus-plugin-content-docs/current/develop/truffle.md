---
id: truffle
title: 使用 Truffle 部署智能合约
sidebar_label: Using Truffle
description:  使用 Truffle 进行部署在 Polygon 上智能合约
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 概述 {#overview}

[Truffle](https://trufflesuite.com/) 是一个区块链开发环境，您可以使用使用以太机组虚拟机来创建和测试智能合约。该指南旨在教学如何使用特鲁弗尔创建智能合约，并在 EVM 兼容的 Polygon 网络上部署。

:::note

该教程是改编版的[<ins>特鲁弗尔快速启动指南</ins>](https://www.trufflesuite.com/docs/truffle/quickstart)条款。

:::

## 操作内容 {#what-you-will-do}

- Truffle 安装和设置
- 在 Polygon 网络上部署合约
- 检查 Polygonscan 上的部署状态

## 先决条件 {#prerequisites}

在开始之前必须满足一些技术要求。安装以下工具：

- [节点.js v8+ LTS 和npm](https://nodejs.org/en/)（用节点包装）
- [Git](https://git-scm.com/)

上述工具安装完成后，我们只需要一个命令即可安装 Truffle：

```
npm install -g truffle
```

要验证是否正确安装了 Truffle，请在终端`truffle version`上键入。如果您看到错误，请确保将npm 模块添加到您的路径上。

## 创建项目 {#creating-a-project}

### MetaCoin 项目 {#metacoin-project}

我们将使用 Truffle 的一个样板文件，详见 [Truffle Boxes](https://trufflesuite.com/boxes/) 页面。[MetaCoin box](https://trufflesuite.com/boxes/metacoin/) 创建一个可在账户之间转移的代币。

1. 首先为 Truffle 项目创建新目录：

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. 下载 MetaCoin Box：

  ```bash
  truffle unbox metacoin
  ```

在最后一步，您创建了一个特鲁弗尔项目编码文件夹，其中包含合约、部署、测试和配置文件。

它是来自 `metacoin.sol` 文件的智能合约数据：

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

请注意， ConvertLib 在 `pragma` 语句后导入。在本项目中，实际上最终将部署两个智能合约：一个是 Metacoin，包含所有发送和余额逻辑；另一个是 ConvertLib，用于转换值的库。

:::

### 测试合约 {#testing-the-contract}

您可以运行 Solidity and Javascript 测试。

1. 在终端中运行 Solidity 测试：

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

您应该查看以下输出：

![图像](/img/truffle/test1.png)

2. 运行 JavaScript 测试：

  ```bash
  truffle test ./test/metacoin.js
  ```

您应该查看以下输出：

![图像](/img/truffle/test2.png)

### 编译合约 {#compiling-the-contract}

使用以下命令汇编智能合约：

```bash
truffle compile
```

您将看到以下输出：

![图像](/img/truffle/compile.png)

### 智能合约配置 {#configuring-the-smart-contract}

在实际部署合约之前，您需要设置 `truffle-config.js` 文件，插入网络和编译器数据。

使用 Polygon Mumbai 网络详细信息来`truffle-config.js`更新文件。

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

请注意，它要求通过 mnemonic 转入来进行`maticProvider`。这是您想要部署的账户的种子短语（或私人密钥）。在根目录中创建一个新的 `.secret` 文件，输入 12 字助记词后即可开始。要从 MetaMask 钱包中获取种子字样，您可以转到 MetaMask 设置，然后从菜单中选择**安全与隐私，**在那里选择显示**种子字**的按钮。

### 在 Polygon 网络上部署 {#deploying-on-polygon-network}

使用 [Polygon  Faucet](https://faucet.polygon.technology/) 将 MATIC 添加到您的钱包中。接下来，在项目目录的根文件夹中运行此命令：

```
truffle compile
truffle deploy --network matic
```

![图像](/img/truffle/deployed-contract.png)

:::note

请记住您的`address`详细信息，`transaction_hash`提供的其他详细信息将不同。以上内容只是提供结构参考。

:::

**恭喜！ 您已使用 Truffle 成功部署了智能合约。**现在，您可以与合约互动，并检查其在 [Polygonscan](https://mumbai.polygonscan.com/) 上部署状态。
