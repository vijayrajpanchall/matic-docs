---
id: hardhat
title: 使用 Hardhat 部署智能合约
sidebar_label: Using Hardhat
description: 使用 Hardhat 进行部署在 Polygon 上智能合约
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 概述 {#overview}

Hardhat 是一种以太坊开发环境，提供方便的方式，用于在当地部署智能合约、运行测试和调试固体代码。

在本教程中，您将学习如何设置 Hardhat，并使用它来建立、测试和部署简单的智能合约。

### 操作内容 {#what-you-will-do}

- 设置 Hardhat
- 创建简单的智能合约
- 编译合约
- 测试合约
- 部署合约

## 设置开发环境 {#setting-up-the-development-environment}

在开始之前必须满足一些技术要求。安装以下工具：

- [Node.js v10+ LTS 和 npm](https://nodejs.org/en/) （自带节点）
- [Git](https://git-scm.com/)

安装完成后，您需要跳转到空文件夹，运行`npm init`并遵循 Hardhat 安装步骤，以此方式来创建 NPM 项目。项目准备好后，您需要运行：

```bash
npm install --save-dev hardhat
```

为了创建您的 Hardhat 项目，请在项目文件夹中运行 `npx hardhat`。
我们创建一个示例项目，通过执行这些步骤来尝试示例任务并编译、测试和部署示例合约。

:::note

此处使用的示例项目来自 [<ins>Hardhat 快速入门指南</ins>](https://hardhat.org/getting-started/#quick-start)以及说明文件。

:::

## 创建项目 {#creating-a-project}

为了创建示例项目，请在项目文件夹中运行 `npx hardhat`。
您可以看到以下提示：

![图像](/img/hardhat/quickstart.png)

选择 JavaScript 项目，通过执行这些步骤来编译、测试和部署示例合约。

### 检查合约 {#checking-the-contract}

`contracts` 文件夹包含 `Lock.sol`，它是一个由简单数字锁组成的示例合约，仅允许用户在规定的时间后提取资金。

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### 设置合约 {#setting-up-the-contract}

- 进入 `hardhat.config.js`
- 使用 matic-network-credentials 更新 `hardhat-config`
- 在根中创建 `.env` 文件，用于存储您的私钥
- 对 `.env` 文件添加 Polygonscan 应用程序接口 (API) 密钥，以验证 Polygonscan 上的合约。 您可以通过[创建账户](https://polygonscan.com/register)来生成应用程序接口 (API) 密钥

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

请注意，上述文件需要 DOTENV 来管理环境变量、以太币和 Etherscan。确保所有软件包都已安装。

欲了解 DOTENV 的具体使用说明，请查看[<ins>此页面</ins>](https://www.npmjs.com/package/dotenv)。

如果您通过 MATIC 更改 Polygon_mumbai 时，您可以部署在 MATIC ( Polygon 主网)上。

:::

### 编译合约 {#compiling-the-contract}

在编译合约之前，您需要先安装 Hardhat 工具箱：

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

然后直接运行编译：

```bash
npx hardhat compile
```

### 测试合约 {#testing-the-contract}

使用 Hardhat 运行测试需要输入以下操作：

```bash
npx hardhat test
```

这是预期输出：

![图像](/img/hardhat/test.png)

### 在 Polygon 网络上部署 {#deploying-on-polygon-network}

在项目目录的根上运行此命令：

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

合约将在 Matic 的 Mumbai 测试网上部署，您可以在此处检查部署状态： https://mumbai.polygonscan.com/

**恭喜！您已成功部署 Greeter 智能合约。现在您可以与智能合约进行交互。**

:::tip 快速验证 Polygonscan 上的合约

运行以下命令，在 Polygonscan 上快速验证您的合约。任何人都可以轻松查看已部署合约的源代码。对于具有复杂参数列表构造函数的合约，请查看[此处](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)。

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
