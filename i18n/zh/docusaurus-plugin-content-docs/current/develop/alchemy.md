---
id: alchemy
title: 使用 Alchemy 部署智能合约
sidebar_label: Using Alchemy
description: 使用 Alchemy 部署智能合约指南
keywords:
  - docs
  - matic
  - polygon
  - alchemy
  - create smart contract
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 概述 {#overview}

本教程面向不太熟悉以太坊区块链开发，或想要了解智能合约部署和交互基础知识的开发者。 它将通过在 Polygon 孟买测试网络上创建和部署智能合约，使用密钥货币钱包（[Metamask](https://metamask.io)）、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org)和[Alchemy](https://alchemy.com/?a=polygon-docs)来走向您。

:::tip

如果您有问题或关切，请通过其[<ins>官方 Discord</ins>](https://discord.gg/gWuC7zB) 服务器与 Alchemy 团队联系。

:::

## 学习内容 {#what-you-will-learn}

在本教程中，为了创建智能合约，您将学习如何使用 Alchemy 的平台来执行以下操作：
- 创建智能合约应用程序
- 检查钱包的余额
- 在区块链探索器中验证合约调用

## 操作内容 {#what-you-will-do}

本教程将逐步指导您完成以下操作：
1. 开始在 Alchemy 上创建应用程序
2. 使用 Metamask 创建钱包地址
3. 在钱包中添加余额（使用测试代币）
4. 使用 Hardhat 和 Ethers.js 编译和部署项目
5. 检查 Alchemy 平台上的合约状态

## 创建和部署您的智能合约 {#create-and-deploy-your-smart-contract}

### 连接到 Polygon 网络 {#connect-to-the-polygon-network}

有几种方法可以向 Polygon PoS 链发出请求。 您无需运行自己的节点，而可使用 Alchemy 开发者平台上的免费账户，并与 Alchemy Polygon PoS API 交互，从而与 Polygon PoS 链进行通信。 平台由一整套开发者工具组成，其中包括监测请求的能力、显示在智能合约部署时出现的标记数据分析、增强的 API （交易、NFTs等）和ethers.js SDK。

如果您尚未拥有过单元化账户，请开始登记此处的免费账户[。](https://www.alchemy.com/polygon/?a=polygon-docs)创建账户后，您可选择在访问仪表板之前立即创建您的第一个应用。

![图像](/img/alchemy/alchemy-dashboard.png)

### 创建您的应用程序（和 API 密钥） {#create-your-app-and-api-key}

成功创建了 Alchemy 账户后，您需要创建应用程序来生成 API 密钥。这验证了向 Polygon 孟买 测试网提出的请求。如果您不熟悉测试网，请查看[测试网指南](https://docs.alchemyapi.io/guides/choosing-a-network)。

要生成新的 API 键，请在 Alchemy 数据板 导航栏上浏览 **Apps** 选项卡，然后选择“**创建**应用”子选项卡。

![图像](/img/alchemy/create-app.png)

命名您的新应用程序 **Hello 世界，**提供简短描述，选择链**的** **Polygon** 来选择 Polygon 来选择 Polygon 孟买来进行网络。

最后，单击“**创建**”应用程序。您的新应用程序应显示在下表中。

### 创建一个钱包地址 {#create-a-wallet-address}

Polygon poS 是以特里尔姆的第二层缩放解决方案。因此，我们需要一个以太坊钱包，并添加自定义的 Polygon URL，以发送和接受 Polygon 孟买测试网上的交易。对于此次教程，我们将使用 MetaMask 作为一个可用于管理您的钱包地址的浏览器兼容密钥查询金库。如果您想详细了解以太坊交易的运作方式，请查看以太坊基金会发布的[交易指南](https://ethereum.org/en/developers/docs/transactions/)。

要从 Alchemy 中获取自定义的 Polygon  RPC URL，请在 Alchemy 数据板上进入 **Hello** 世界应用程序，然后在右上角点击查**看密钥**。然后复制您的 Alchemy HTTP API 密钥。

![图像](/img/alchemy/view-key.png)

您可以[在此处](https://metamask.io/download.html)免费下载和创建 Metamask 账户。 一旦创建了账户，请遵循这些步骤，在您的钱包上设置 Polygon  PoS 网络。

1. 在 MetaMask 钱包的右上角，选择下拉菜单的**设置**。
2. 从菜单上**选择**网络到左侧。
3. 使用以下参数将您的钱包连接到 Mumbai 测试网：

**网络名称：** Polygon Mumbai 测试网

**新的 RPC URL** : https://polygon-mumbai.g.alchemy.com/v2/your-api-key

**链接：**8001

**符号：**MATIC

**区块探索者 UR**L：https://mumbai.polygonscan.com/


### 添加 Polygon 孟买测试 MATIC {#add-polygon-mumbai-test-matic}

您需要几个测试网代币来将智能合约部署到 Mumbai 测试网上。要获取测试网代币，请转到 [Polygon Mumbai faucet 上，](https://faucet.polygon.technology/)选择 **Mumbai** 选择 **MATIC 时机，**然后输入您的 Polygon 钱包地址，然后单击**“提交”。**由于网络流量，可能需要一些时间才能收到您的测试网代币。

您还可以使用 Alchemy 免费的 [Mumbai faucet。](https://mumbaifaucet.com/?a=polygon-docs)

![图像](/img/alchemy/faucet.png)

您可稍后在 MetaMask 账户中查看测试网代币。

### 检查您的钱包余额 {#check-your-wallet-balance}

为了复核余额是否正常，让我们使用[ Alchemy 的 composer 工具](https://composer.alchemyapi.io/)发出一个 [eth\_getBalance](https://docs.alchemy.com/reference/eth-getbalance-polygon) 请求。 选择 Polygon 作为链，**将 Polygon** 孟买 作为网络，`eth_getBalance`作**为**方法，然后输入您的地址。这将返回我们钱包中的 MATIC 数量。 查看[此视频](https://youtu.be/r6sjRxBZJuU)，获取 composer 工具使用方式说明。

![图像](/img/alchemy/get-balance.png)

输入您的 MetaMkask 账户地址并单击**“发送请求”后，**您应看到这样反应：

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

:::info

返回结果的单位是 Wei，而非 ETH。 魏特是以太太最小的命名。Wei 到 Ether 的转换方式是：1 Ether = 10^18 Wei。 因此，如果我们将“0xde0b6b3a7640000”转换为十进制，就可得到 1\*10^18，即 1 ETH。 这可以根据面额映射到 1 MATIC。

:::

### 初始化您的项目 {#initialize-your-project}

首先，我们需要为项目创建一个文件夹。 导航到[命令行](https://www.computerhope.com/jargon/c/commandi.htm)并输入：

```bash
mkdir hello-world
cd hello-world
```

现在我们已进入项目文件夹，我们将使用 `npm init` 来初始化项目。 如果您尚未安装 NPM，请按照[本说明](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)进行操作（我们还需要 Node.js，也请进行下载！）。

```bash
npm init # (or npm init --yes)
```

不论您如何安装，以下是我们的做法，谨供您参考：

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

批准 package.json，我们就准备就绪了！

### 下载 [Hardhat](https://hardhat.org/getting-started/#overview)

Hardhat 是用于编译、部署、测试和调试以太坊软件的开发环境。 它可以帮助开发者在部署到实时链之前在本地构建智能合约和去中心化应用。

在我们的项目中`hello-world`，运行：

```bash
npm install --save-dev hardhat
```

查看此页面，获取有关[安装说明](https://hardhat.org/getting-started/#overview)的更多详情。

### 创建 Hardhat 项目 {#create-hardhat-project}

在我们的 `hello-world` 项目文件夹中，运行：

```bash
npx hardhat
```

您应该看到可欢迎的信息和选项，以选择您想要做的事宜。选择**创建空的hardhat.confract.js：**

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

这将为我们生成一个`hardhat.config.js`文件，我们将在这里指定为项目设置的所有设置。

### 添加项目文件夹 {#add-project-folders}

为了保持项目安排，我们将创建两个新的文件夹。在命令行中导航到您的 `hello-world` 项目的根目录并输入：

```bash
mkdir contracts
mkdir scripts
```

* `contracts/` 用于保存 hello world 智能合约代码文件
* `scripts/` 用于保留脚本，以部署合约并与合约交互

### 写出合约 {#write-the-contract}

在您最喜欢的编辑器中打开 **Hello**-world 项目，如 [VSCode](https://code.visualstudio.com)。智能合约以一种称为 Solidity 的语言写成，这就是我们将使用的方法来写下智`HelloWorld.sol`能合约。

1. 浏览到文件夹，创建一个名为新文件`contracts`夹`HelloWorld.sol`
2. 下方是我们将在本教程中使用的[以太坊基金会](https://ethereum.org/en/) Hello World 智能合约示例。 将以下内容复制并粘贴到您的 `HelloWorld.sol` 文件中，并务必阅读注释以了解此合约的作用：

```solidity
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

这是一个非常简单的智能合约，它在创建时存储一条信息，并且可通过调用 `update` 函数来更新。

### 与 MetaMask & Alchemy 连接 {#connect-with-metamask-alchemy}

我们已经创建了 Metamask 钱包、Alchemy 账户，并编写了智能合约，现在是时候连接这三者了。

从您的虚拟钱包发送的每笔交易都需要使用您的唯一私钥进行签名。为了向程序提供此权限，我们可以将私钥（和 Alchemy API 密钥）安全地存储在一个环境文件中。

首先，在您的项目目录中安装 dotenv 程序包：

```bash
npm install dotenv --save
```

然后，在我们项目的根目录中创建一个 `.env` 文件，并将您的 Metamask 私钥和 HTTP Alchemy API URL 添加到其中。

:::warning 警告

必须命名您的环境文件，`.env`否则将不会被认定为环境文件。请勿命名为 `process.env`、`.env-custom` 或其他名称。

此外，如果您使用版本控制系统（如git）来管理您的项目，请**不要**跟踪文件`.env`。将文件添加`.env``.gitignore`到，以避免发布秘密数据。

:::

* 按照[此说明](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)导出您的私钥
* 要获取您的 Alchemy HTTP  API 密钥（RPC URL），在您的账户数据板上浏览到您**的 Hello** 世界应用程序，然后在右上角点击查**看密钥**。

您的 `.env` 应该像这样：

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

为了实际连接到`hardhat.config.js`我们的代码，我们将在此教程中稍后文件中参考这些变量。

### 安装 Ethers.js {#install-ethers-js}

Ethers.js 库采用对用户更友好的方法包装[标准 JSON-RPC 方法](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc)，以便用户更容易与以太坊进行交互和向以太坊发出请求。

Hardhat 可以轻松集成[插件](https://hardhat.org/plugins/)，以提供额外的工具和扩展功能。 我们将利用 [Ethers 插件](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html)进行合约部署。 [Ethers.js](https://github.com/ethers-io/ethers.js/) 拥有实用的合约部署方法。

在您的项目目录中，键入：

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

在下一步中，我们还将在 `hardhat.config.js` 中需要以太币。

### 更新hardhat.confract.js {#update-hardhat-config-js}

迄今为止，我们已经增加了多个依赖性和插件。现在，我们需要更新，`hardhat.config.js`以便我们的项目确认这些依赖性。

更新您的 `hardhat.config.js`，就像这样：

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### 编辑我们的智能合约 {#compile-our-smart-contract}

为了确保到目前为止一切正常，让我们编译合约。 `compile` 任务是内置安全帽任务之一。

从命令行运行：

```bash
npx hardhat compile
```

您可能会收到警告`SPDX license identifier not provided in source file`，但应用程序可能仍然有效。如果不是，您可以随时在 [Alchemy discord](https://discord.gg/u72VCg3) 中留言。

### 写入我们的部署脚本 {#write-our-deploy-script}

现在合约已编写完毕，配置文件也已就绪，是时候编写合约部署脚本了。

导航到 `scripts/` 文件夹并创建一个名为 `deploy.js` 的新文件，向其中添加以下内容：

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

在这里，我们引用了 Hardhat 团队在其[合约教程](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)中对每行代码作用的解释。

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js 中的 `ContractFactory` 是用于部署新智能合约的抽象概念，因此这里的 `HelloWorld` 是我们的 hello world 合约实例的[工厂](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\))。 使用 `ContractFactory` 插件 `hardhat-ethers` 和 `Contract` 时，实例默认连接到第一个签名者（所有者）。

```javascript
const hello_world = await HelloWorld.deploy();
```

调用 `ContractFactory` 上的 `deploy()` 将启动部署，并返回解析为 `Contract` 对象的 `Promise`。 这是为我们的智能合约的每个函数提供方法的对象。

### 部署我们的智能合约 {#deploy-our-smart-contract}

导航到命令行并运行：

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

您应该看到类似的东西：

```bash
Contract deployed to address: 0x3d94af870ED272Cd5370e4135F9B2Bd0e311d65D
```

如果我们[去到 Polygon Mumbai 探险者](https://mumbai.polygonscan.com/)，搜索我们的合约地址，我们就应该能够看到它已经成功部署。

`From`地址应与您的 MetaMask 账户地址相匹配，`To`地址将称作**“ Contract reating”。**但如果我们点击交易，我们将查看在`To`场段中的合约地址。

![图像](/img/alchemy/polygon-scan.png)

### 合约验证 {#verify-the-contract}

Alchemy 提供一个[探索者](https://dashboard.alchemyapi.io/explorer)，您可以查找与智能合约一起部署的方法的信息，例如回应时间、 HTTP 状态、错误代码等。这是一个出色的环境，可验证您的合约，并检查交易是否通过。

![图像](/img/alchemy/calls.png)

**恭喜！您刚刚在 Polygon Mumbai 网络上部署了智能合约。**

## 其他资源 {#additional-resources}

- [如何开发 NFT 智能合约](https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy) - 阿尔切米有一个书面教程，其中包含一个关于这个主题的Youtube视频。这是其自由的10**周路 到 Web3** 代办系列的第一周
- [Polygon API Quickstart](https://docs.alchemy.com/reference/polygon-api-quickstart) – 阿尔切米开发者文件夹指南，用于与 Polygon 站起来运行
