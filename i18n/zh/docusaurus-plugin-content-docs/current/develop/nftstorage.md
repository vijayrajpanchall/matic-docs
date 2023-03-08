---
id: nftstorage
title: NFT 铸币
description: 使用 NFT.storage 和 Polygon 进行铸币。
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

本教程将指导您使用 Polygon 区块链 和 IPFS/Filecoin 存储，通过 NFT.Storage 进行 NFT 铸币。Polygon 通常是由开发者选择的以太坊 2 层扩展解决方案，它不仅速度块和交易成本低，而且还与以太坊的 EVM 完全兼容。本教程将向您展示如何创建和部署标准化智能合约，通过 NFT.Storage API 在 IPFS 和 Filecoin 上存储元数据和资产，同时对您在 Polygon 上的钱包铸造 NFT。

## 简介 {#introduction}

在本教程中，我们的铸币过程将致力于达成以下三个特征：

1. *可扩展性*，涉及铸币过程的成本和产出。如果用例旨在快速创建 NFT，则底层技术需要处理所有铸币请求，而且铸币成本不能过高。
2. *持久性*， NFT 作为可长期存在的资产，需要在其整个生命周期内保持可用性。
3. *不变性*， NFT 及其所代表的的资产不可随意更改，须防止恶意者篡改 NFT 所代表的资产。

[Polygon](https://polygon.technology) 的协议和框架可满足*可扩展性*特征的需求。它们还与以太坊及其虚拟机兼容，因此开发者能够在两个区块链之间自由移动代码。同样， [NFT.Storage](https://nft.storage) 可保障*持久性*，但需要底层 [Filecoin](https://filecoin.io) 网络的帮助，同时还可以确保*不变性*，方法是采用 IPFS 的[内容寻址](https://nftschool.dev/concepts/content-addressing/)。

在本教程中，您将了解 NFT 铸造过程，学会如何利用 NFT.Storage 存储数字资产，并使用该数字资产在 Polygon 上铸造您的 NFT。

## 先决条件 {#prerequisites}

有关 NFT 的常识将为您提供背景和语境。[NFT 学校可提供 NFT 基础知识](https://nftschool.dev/concepts/non-fungible-tokens/)、高级主题以及更多的教程。

在测试和运行本教程中的代码之前，您需要安装一个有效 [Node.js ](https://nodejs.org/en/download/package-manager/)。

您还需要在 Mumbai 测试网上提供拥有少量 MATIC 代币的 Polygon 钱包。按照以下说明开始操作：

1. **下载并安装 [Metamask](https://metamask.io/)**。Metamask 是一种加密钱包和区块链应用程序网关。它使用方法简单，简化了许多步骤，如设置 polygon 钱包。
2. **将 Metamask 连接至 Polygon 的 [Mumbai 测试网](https://docs.polygon.technology/docs/develop/metamask/overview)**，然后在下拉菜单中选中。我们将使用免费的 polygon 测试网来铸造 NFT。
3. **将 MATIC 代币**接收到您的钱包，方法是使用[水龙头](https://faucet.polygon.technology/)。选择 Mumbai 测试网并将您的钱包地址从 Metamask 粘贴到表单中。在铸造 NFT 时，我们需要支付少量 MATIC。这是矿工向区块链添加新交易操作收取的费用，例如铸造 NFT 或创建新的智能合约。
4. **从 Metamask 中复制**您的私钥，方法是点击右上角的三个点并选择“账户详情”。在底部，您可以找到私钥导出按钮。点击并按提示输入密码。现在您可以将私钥复制和粘贴到文本文件中。稍后，在本教程中的区块链交互部分将会用到私钥。

最后，您还需要一个文本或代码编辑器。为了方便起见，请选择同时支持 JavaScript 和 Solidity 语言的编辑器。其中一个理想的选项是 [Visual Studio Code](https://code.visualstudio.com)，但需要启用 [Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) 扩展。

## 准备 {#preparation}

### 为 NFT.storage 获取 API 密钥 {#get-an-api-key-for-nft-storage}

您需要 API 密钥才能使用 NFT.storage。首先，[前往 NFT.Storage 使用您的电子邮件地址登录](https://nft.storage/login/)。您将收到一封电子邮件，其中包含允许您登录的申请链接 — 无需输入密码。成功登录后，通过导航栏进入 API 密钥。您将发现一个可以创建**新密钥**的按钮。当提示输入 API 密钥名称时，您可以自由选择一个或同时使用 “polygon + NFT.Storage”。您现在可以复制密钥列的内容，也可以稍后参考教程的 NFT.Storage。

### 设置您的工作区 {#set-up-your-workspace}

创建一个新的空文件夹，并将其用作本教程的工作区。您可自由选择文件系统上的任何名称和位置。打开终端并导航至新建文件夹。

接下来，我们将安装以下 Node.js 依赖项：

- **Hardhat 和 Hardhat-Ethers**是以太坊的开发环境（以及兼容以太坊的区块链，例如 Polygon）。
- **OpenZeppelin**包含一系列具有标准化 NFT 基础合约的智能合约。
- **NFT.Storage**是连接至 NFT.Storage API 的库。
- **Dotenv**是用于处理配置环境文件的库（例如将私钥注入脚本）。

使用以下命令一次安装所有依赖项：

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Hardhat 需要在当前文件夹中初始化。在开始初始化之前请执行：

```bash
npx hardhat
```

提示时，选择**“创建”空的hardhat.confract.js。**您的控制台输出应如下所示：

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

我们将对 Hardhat 配置文件 `hardhat.config.js` 进行一些修改，以便于支持 Polygon Mumbai 测试网。打开在上一步中创建的 `hardhat.config.js` 。请注意，我们正在从环境文件中加载您的 Polygon 钱包私钥，该环境文件必须保证安全。您甚至可以按要求使用其他 RPC [链接](https://docs.polygon.technology/docs/operate/network)。

```js
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    PolygonMumbai : {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

创建一个名`.env`为新文件，将持有您的 API 密钥用于 NFT.streation 以及您的 Polygon 钱包私人密钥。`.env`文件的内容应该看起来像：

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

将占位符替换为您在准备期间创建的 API 密钥以及您的 Polygon 钱包私钥。

为了确保项目井然有序，我们创建了三个新文件夹：

1. `contracts`，用于在 Solidity 中写入的 Polygon 合约。
2. `assets`，包含我们将铸造为 NFT 的数字资产。
3. `scripts`，作为推动准备和铸币流程的帮助文件夹。

执行以下命令：

```bash
mkdir contracts assets scripts
```

最后，我们将添加图像至 `assets`文件夹。该图像将是我们将上传到 NFT.Storage 并在 Polygon 上铸造的图片。我们现在将其命名为 `MyExampleNFT.png`。如果您没有准备一些很好的图片，可[下载简单的图案](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu)。

## 铸造您的 NFT {#minting-your-nft}

### 使用 NFT.Storage 存储资产数据 {#storing-asset-data-with-nft-storage}

我们将使用 NFT.Storage 存储数字资产和元数据。NFT.Storage 可通过自动将您的资产上传到 Filecoin 和 IPFS 来保证不变性和持久性。IPFS 和 Filecoin 对内容标识符 (CID) 上操作，以实现不可变引用。IPFS 将通过其异地备份缓存提供快速检索，而 Filecoin 将通过激励存储提供者来保证持久性。

创建 `store-asset.mjs` 脚本，将其放在 `scripts` 目录下。内容列出如下：

```js
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env

async function storeAsset() {
   const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
   const metadata = await client.store({
       name: 'ExampleNFT',
       description: 'My ExampleNFT is an awesome artwork!',
       image: new File(
           [await fs.promises.readFile('assets/MyExampleNFT.png')],
           'MyExampleNFT.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

脚本的主体部分是 `storeAsset` 函数。它使用您此前创建的 API 密钥创建一个连接到 NFT.Storage 的新客户端。接下来我们引入由名称、描述和图像组成的元数据。请注意，我们直接从 `assets` 目录中的文件系统读取 NFT 资产。在函数结束时，我们将打印元数据 URL，并且稍后在 Polygon 上创建 NFT 时使用。

设置脚本后，您可以通过运行以下内容来执行：

```bash
node scripts/store-asset.mjs
```

您的输出如下所示， `HASH` 是您刚存储的图片 CID。

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### 在 Polygon 上创建您的 NFT {#creating-your-nft-on-polygon}

#### 创建铸造智能合约 {#create-the-smart-contract-for-minting}

首先，我们创建用于铸造 NFT 的智能合约。由于 Polygon 与以太坊兼容，我们将智能合约写入 [Solidity](https://soliditylang.org)。为我们的 NFT 智能合约创建一个新文件 `ExampleNFT.sol`，位于 `contracts` 目录。您可以复制以下代码：

```solidity
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("NFT", "ENFT") {}

   function mintNFT(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();

       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }
}
```

如需成为有效的 NFT，您的智能合约必须实施 [ERC-721 标准](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)的所有方法。我们采用 [OpenZeppelin](https://openzeppelin.com) 库来实施，该库已提供一组基本功能并且符合标准。

在智能合约以上，我们导入三个 OpenZeppelin 智能合约类别：

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol` 包含 ERC-721 标准的基本方法的实施，我们的 NFT 智能合约将继承这些方法。我们使用 `ERC721URIStorage,` 扩展，它不仅可以存储资产，还可以将元数据存储为链下 JSON 文件。与合约类似，该 JSON 文件需要遵守 ERC-721。

2. `\@openzeppelin/contracts/utils/Counters.sol` 提供只能逐一递增或递减的计数器。我们的智能合约使用计数器跟踪铸造的 NFT 总数并对新 NFT 设置唯一 ID。

3. `\@openzeppelin/contracts/access/Ownable.sol` 对智能合约设置访问限制，仅允许智能合约所有者（您）铸造 NFT。

我们的自定义 NFT 智能合约在导入语句之后，包含一个计数器、一个构造函数和一个实际铸造 NFT 的方法。大部分艰苦工作由继承自 OpenZeppelin 的基础合约完成，因为该合约可实施我们创建符合 ERC-721 标准的 NFT 所需的大部分方法。

计数器跟踪已铸造完成的 NFT 总数，它在铸造方法中用作 NFT 的唯一标识符。

在构造函数中，我们为智能合约的名称和符号（在钱包中表示）传递两个字符串参数。您可以随意更改。

最终，我们的方法 `mintNFT` 允许我们实际铸造 NFT。该方法设置为 `onlyOwner`，以确保只能由智能合约的所有者执行。

`address recipient`指定了首次收到 NFT 地址。

`string memory tokenURI` 是一个 URL，可解析为描述 NFT 元数据的 JSON 文档。在本案例中，它已存储在 NFT.Storage 上。我们可在方法执行期间使用返回的 IPFS 链接访问元数据 JSON 文件。

根据该方法，我们可以递增计数器来接收 NFT 新指定的唯一标识符。然后我们从 OpenZeppelin 中调用基础合约提供的方法，采用新创建的标识符和元数据的 URI 设置来联系接收者铸造 NFT。该方法在执行后将返回唯一标识符。

#### 在 Polygon 上部署智能合约 {#deploy-the-smart-contract-to-polygon}

现在将我们的智能合约部署在 Polygon 上。创建一个新文件 `deploy-contract.mjs`，位于 `scripts` 目录。将以下列表内容复制到该文件中并保存。

```js
async function deployContract() {
 const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
 const exampleNFT = await ExampleNFT.deploy()
 await exampleNFT.deployed()
 // This solves the bug in Mumbai network where the contract address is not the real one
 const txHash = exampleNFT.deployTransaction.hash
 const txReceipt = await ethers.provider.waitForTransaction(txHash)
 const contractAddress = txReceipt.contractAddress
 console.log("Contract deployed to address:", contractAddress)
}

deployContract()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
```

使用 Hardhat 库提供的辅助函数来部署合约。首先，我们使用提供的 Factory 来获取在上一步中创建的智能合约。然后，我们调用相应的方法进行部署并等待部署完成。在所述代码下方的几行可用于在测试网环境中获取正确的地址。保存文件`mjs`。

使用以下命令执行脚本：

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

如果一切正确，您将看到以下输出：

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

请注意，您将需要用到在铸币步骤中打印的合约地址。您可以将其复制并粘贴到单独的文本文件中，然后保存以备后用。这一步极为必要，因此铸币脚本可以调用该特定合约的铸币方法。

#### 在 Polygon 上铸造 NFT {#minting-the-nft-on-polygon}

现在铸造 NFT 只需要调用我们已部署到 Polygon 的合约。创建新的文件 `mint-nft.mjs`，将其放在 `scripts` 目录下，然后从下面的列表中复制此代码：

```bash
const CONTRACT_ADDRESS = "0x00"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

编辑前两行，插入您在先前部署中的的 **合约地址**以及使用 NFT.Storage 存储资产时返回的 **元数据 URL**。脚本的其余部分用于设置您作为 NFT 的未来所有者对智能合约的调用以及指向存储在 IPFS 上的元数据的指针。

接下来运行脚本：

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

您可以期待看到以下输出：

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

正在寻找本教程中的示例代码？您可以在 polygon-nft.storage-demo [链接](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) Github 资源库中找到示例代码。

## 结论 {#conclusion}

在本教程中，我们学习如何使用 Polygon 和 NFT.Storage 来端到端地铸造 NFT。该项技术不仅可以实现适当的去中心化，还可以保证*可扩展性*、*持久性*和*不变性*。

我们部署自定义智能合约，根据自身的需求来铸造 NFT。在本教程中，我们使用基于 ERC-721 标准的简单示例。然而，您也可以定义管理 NFT 生命周期的复杂逻辑。对于更复杂的用例，后续标准 [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/) 可帮助您入门。OpenZeppelin 是我们在本教程中使用的库，可提供[合约向导](https://docs.openzeppelin.com/contracts/4.x/wizard)来帮助创建 NFT 合约。

成功的铸币可以看作是 NFT 产生价值的开始。然后 NFT 可用于证明所有权，并转账给其他用户。NFT 转账的理由可能包括成功在 NFT 市场（如[OpenSea](https://opensea.io)）上销售，或其他类型的事件（例如在基于 NFT 的游戏中获得奖品）。接下来，我们将探索 NFT 无限丰富的可能性。

如果您希望帮助使用 NFT. stark 来建立 NFT 项目，我们鼓励您加入 D[iscord ](https://discord.gg/Z4H6tdECb9)[and Slack](https://filecoinproject.slack.com/archives/C021JJRH26B) 上的`#nft-storage`频道。
