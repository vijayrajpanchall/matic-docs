---
id: chainstack
title: 使用 Chainstack and Foundry 部署智能合约
sidebar_label: Using Chainstack
description:  使用 Chainstack 和Foundry 来开发 Polygon 上的智能合约
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 概述 {#overview}

本节通过在 Polygon 孟买测试网上部署 [Hello](https://chainstack.com/build-better-with-polygon/) 世界合约来指导[您](https://github.com/gakonst/foundry/)。

Chainstack 提供基于以太坊的应用程序和其他区块链的基础设施。它们保持节点，保证与网络的连接，并提供一个接口，与主网和测试网进行互动。

Foundry 是一个用 Rust 编写的快速工具套件，用于以太坊应用开发。 它提供测试、与 EVM 智能合约的互动、发送交易和区块链数据检索。

:::tip

如果您有任何问题，请在 [<ins>Chainstack 分散</ins>](https://discord.com/invite/Cymtg2f7pX)服务器上联系。

:::

## 学习内容 {#what-you-will-learn}

创建一个 Hello World 合约，使用 Chainstack 部署 Polygon 节点，并使用 Foundry 部署合约。

## 操作内容 {#what-you-will-do}

1. 使用 Chainstack 部署 Polygon 节点
2. 设置 Foundry
3. 创建智能合约
4. 部署智能合约。

## 部署 Polygon Mumbai 节点 {#deploy-a-polygon-mumbai-node}

您需要一个节点，以便在区块链网络上部署智能合约。请遵循以下步骤，以启动节点并运行：

**步骤 1** → 使用 [Chainstack](https://console.chainstack.com/user/account/create) 登录

![图像](/img/chainstack/sign-up.png)

**步骤 2** → 遵循如何[部署 Mumbai](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network) 节点的指示

![图像](/img/chainstack/join-network.png)

**步骤 3** → 获取[已部署节点的 HTTPS 端点](https://docs.chainstack.com/platform/view-node-access-and-credentials)

## 安装 Foundry {#install-foundry}

Foundry 是一个开发工具套件，用于处理智能合约。 在开始使用前，您需要先安装 Rust 编码语言。

1. [安装 Rust](https://www.rust-lang.org/tools/install)。
1. [安装 Foundry](https://github.com/gakonst/foundry/)。

## 使用 Foundry 进行初始化 {#initialize-with-foundry}

如需创建样板项目，请导航到您的工作目录并运行：

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## 为您的账户充值 {#fund-your-account}

您将需要一个钱包账户来部署智能合约。 您可以使用 [Metamask](https://metamask.io/) 来进行此事。您还需要在网络上支付燃料费来部署合约。 只需复制您的钱包地址，然后[通过集成组](https://faucet.polygon.technology/)获得 Mumbai MATIC 代币。

## 创建 Hello World 合约 {#create-the-hello-world-contract}

在 `src/` 中初始化的 Foundry 项目中，创建 `HelloWorld.sol`：

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## 部署合约 {#deploy-the-contract}

到这一步，您已准备就绪，可立即部署您的合约：

* 您在 Polygon Mumbai 网络上有自己的节点，并将通过该节点部署合约。
* 您的 Foundry 已准备就绪，可用于部署合约。
* 您拥有一个已充值的账户，可用于部署合约。

如需部署合约，请运行：

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

在这里，

* CONTRACT_PATH — `HelloWorld.sol` 您的文件的路径。
* PRIVATE_KEY — 您账户的私钥。
* HTTPS_ENDPOINT — [您节点的端点](https://docs.chainstack.com/platform/view-node-access-and-credentials)。

示例：

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

您始终可以使用上一步中新生成的哈希来检查合约在 [<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/) 上的部署。

:::

## 测试合约 {#test-the-contract}

如果您需要检查合约是否正常运作，可使用 `forge test` 命令。 Foundry 提供了许多[选项](https://book.getfoundry.sh/reference/forge/forge-test)（标志），可进行更多特定测试。 如需详细了解编写测试、高级测试和其他功能，请访问 [Foundry 的文档](https://book.getfoundry.sh/forge/tests)。

**恭喜！您已经在 Polygon 上部署了您的 Hello 世界智能合约。**

另请参阅 Chainstack 文档，获取更多与 Polygon 相关的[<ins>教程</ins>](https://docs.chainstack.com/tutorials/polygon/)和[<ins>工具</ins>](https://docs.chainstack.com/operations/polygon/tools)。
