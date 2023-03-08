---
id: fx-portal
title: FxPortal
description: 在不使用 FxPortal 进行映射的情况下，将状态或数据从以太机转换到 Polygon
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

通常的机制使用**状态同步来**读取 Polygon 数据。该机制允许从以太坊转移任意数据到 Polygon。然而，如果不能使用默认接口，该方法还要求映射根合约和子合约。FxPortal 提供了一种替代方案，可在无需映射的情况下，仅使用已部署的基本 FxPortal 合约来部署 ERC 标准代币。

## FxPortal 什么是？ {#what-is-fxportal}

它是一种强大而简单的实施 Polygon [状态同步](../../pos/state-sync/state-sync-mechanism.md)机制。Polygon PoS 桥建立在相同的架构上。[实例](https://github.com/fx-portal/contracts/tree/main/contracts/examples)文件夹中的代码是使用的一些例子。您可以轻松使用这些示例来建立自己的实施或拥有自定义桥梁，允许任何状态同步进行不进行映射。

您可以检查 [GitHub 存储库](https://github.com/fx-portal/contracts)，以了解合约和实例。

## 它的运作方式是什么？ {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) and [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) 是一个主要合约，用于 FxPortal 工作。它调用数据，转交在另一链上使用用户定义的方法，而不使用状态同步机制进行任何映射。如需使用已部署的主合约，您可以在部署的智能合约中实施 FxPortal 的基础合约 — [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) 和 [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol)。基于这些合约，您部署的合约将能够使用数据隧道机制相互通信。

否则，您可以选择使用已经部署的隧道合约来绘制代币图表。
 Polygon Mainnet 及 Mumbai 测试网 默认 FxTunnel 部署详细信息如下：

- [Polygon 主网](https://static.matic.network/network/mainnet/v1/index.json)
- [Mumbai 测试网](https://static.matic.network/network/testnet/mumbai/index.json)

在上面链`FxPortalContracts`接中寻找密钥字，以查找所有默认隧道合约和其他重要的 FxPortal 合约部署。

## 我需要自定义的 FxTunnel 实施吗？ {#do-i-need-a-custom-fxtunnel-implementation}

只有在默认隧道实施与使用案例不一致时，您才必须进行**自定义的 FxTunnel** 实施。当您使用默认的 FxPortal 隧道时，您无法修改子合约代码。子代币合约的代币总是固定，在[默认的 FxTunnel 部署中](https://github.com/fx-portal/contracts/tree/main/contracts/examples)始终保持相同。如果需要自定义的子弹代币，则必须去自定义的 FxTunnel 上场，阅读下一部分将指导您更多部署自定义的 FxTunnels。

高度建议在您读取即将到来的部分之前读取和理解 [FxPortal 状态转账](state-transfer.md)。即将到来的每个部分都将附上隧道合约链接。在建立自定义的 fx 隧道时，可以将这些例子作为参考。

## ERC20 转账 {#erc20-transfer}

[子和根隧道合约](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer)允许在根链上存放代币，并在子链上退出。

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`您可以调用已部署的合约上的函数，以绘制您的 ERC20 代币，并在子链上创建相应的子代币。
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`：使用地址调用`deposit()`方法，使用地址可以提取相应数量（如果需要，连同数据）。您必须先使用标准 ERC20 `approve`函数批准合约后才能支付您的代币。

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`：指定的地址`deposit()`可以使用此函数提取所有子代币数量。他们将收到首次映射时创建的子代币。
- `rootToChildToken`：该公共变量包含子代币映射的根代币。您可以通过查询根代币的地址映射来获取已部署子代币的地址。

### 从以太机 → Polygon 中取出 {#polygon}

1. 在根链上部署您自己的 ERC20 代币。稍后您将会用到该地址。
2. 以根隧道的地址和数量作为参数，通过调用根代币的 `approve()` 函数来批准代币转账。
3. 使用根链上的接受者地址和数量继续调用 `deposit()`，以接收子链上的等效子代币。代币还将自动映射。此外，您可以在存入之前先调用 `mapToken()`。
4. 在进行映射后，您现在应该能够使用隧道的功能`deposit`和`withdraw`功能执行交叉链转账。

:::note

在根链`deposit()`上完成后，状态同步进行需要22-30分钟的时间才能发生。一旦发生状态同步，您将把代币存储在给定的地址上。

:::

### 来自 Polygon → Ethereum {#ethereum}

1. 相应的代币地址和数量作为子合约上的参数来调用 `withdraw()`，以将子代币移回根链上的指定接受者。**请特别注意交易哈希 **，它将用于生成燃烧证明。

2. 您可以找到完成提取的步骤[。](#withdraw-tokens-on-the-root-chain)

## ERC721 转账 {#erc721-transfer}

如果需要举例，请检查此 [ERC721 根点和儿童隧道](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer)指南。

### 从以太机 → Polygon 中取出 {#polygon-1}

1. 在根链上部署您自己的 ERC721 代币。稍后您将会用到该地址。
2. 以根隧道的地址和代币 ID 作为参数，通过调用根代币的 `approve()` 函数来批准代币转账。
3. 根链上的接受者地址和代币 ID 作为参数来调用 `deposit()`，以接收子链上的等效子代币。代币还将自动映射。此外，您可以在存入之前先调用 `mapToken()`。

:::note

在根链`deposit()`上完成后，状态同步进行需要22-30分钟的时间才能发生。一旦发生状态同步，您将把代币存储在给定的地址上。

:::

### 来自 Polygon → Ethereum {#ethereum-1}

1. 相应的代币地址和代币 ID 作为子合约上的参数来调用 `withdraw()`，以将子代币移回根链上的指定接受者。**请注意，将使用交易分析来**生成燃烧证明。

2. 您可以找到完成提取的步骤[。](#withdraw-tokens-on-the-root-chain)

## ERC1155转账 {#erc1155-transfer}

如果需要举例，请检查此 [ERC1155 根点和儿童隧道](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer)指南。

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)`：用于将您的根 ERC1155 代币映射到子链
- `deposit(rootToken, user, id, amount, data)`：该函数用于将根代币存入子链
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)`：用于多个代币 ID 和相应的数量
- `receiveMessage(inputData)`：在使用有效负载生成 `inputData` 燃烧证明后调用

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)`：用于从 Polygon 提取代币到以太坊
- `withdrawBatch(childToken, ids, amounts, data)`：与提现方式相同，但用于提取多个代币 ID

### 从以太机 → Polygon 中取出 {#polygon-2}

1. 在根链上部署您的 ERC1155 代币。稍后您将会用到该地址。
2. 调用带有`FxERC1155RootTunnel`地址的代币，`operator`以便在 Polygon `setApprovalForAll(operator, approved)`上将您的代币`FxERC1155RootTunnel`转换到 Polygon 上`FxERC1155ChildTunnel`。
3. `mapToken()``FxERC1155RootTunnel`调用您部署的代币地址为 。`rootToken`这将发送消息，`FxERC1155ChildTunnel`指示它在 Polygon 上部署和绘制 ERC1155 代币。要查询您的子代币地址，请`rootToChildToken`调用 。`FxERC1155ChildTunnel`
4. `deposit()``FxERC1155RootTunnel`调用以代币上的代币地址，以接受者为`rootToken`，`user`代币代币代币，`id`以数量为单位。`amount`此外，您还可以为多个代币 ID 调用 `depositBatch()`。

:::note

在根链`deposit()`上完成后，状态同步进行需要22-30分钟的时间才能发生。一旦发生状态同步，您将把代币存储在给定的地址上。

:::

### 来自 Polygon → Ethereum {#ethereum-2}

1. `withdraw()``FxERC1155ChildTunnel`调用在 Polygon 上部署的代币地址`childToken`，以代币身份进行调用`id`（可以从映射中查询儿童代币地址）`rootToChildToken`。此外，您还可以为多个代币 ID和相应的数量调用 `withdrawBatch()`。**请注意，将使用交易分析来**生成燃烧证明。

2. 您可以找到完成提取的步骤[。](#withdraw-tokens-on-the-root-chain)

## 在根链上提取时机 {#withdraw-tokens-on-the-root-chain}

:::info

在子链`withdraw()`上完成后，检查点要进行，需要 30-90 分钟的时间才能发生。下一个检查点包含了燃烧交易后，您可以提取根链上的代币。

:::

1. 使用**交易分析**和**信息分析_SET_EVET_EVET_SIG来**生成燃烧证明。要生成证明，您可以使用 Polygon 托管的证明生成 API 或者您也可以通过[遵循此处](https://github.com/maticnetwork/proof-generation-api)的指示来填写自己的证明生成 API。

由 Polygon 主持的证明生成端点在此可用[。](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

  - `burnTxHash`这是您在 Polygon 上启动的`withdraw()`交易的交易散布点。
  - `eventSignature`这是函数发出的事件的事件签名`withdraw()`。消息的事件签名是 `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`。


 Mainnet 和 Testnet  的证明生成 API 使用例子如下：

→ → [Polygon  Mainnet 证明生成](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ → [Mumbai 测试网证明生成](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. 将生成的有效载荷作为参数，在 Goerli 或以太坊上分别的根隧道合约`receiveMessage()`中参数。

## 可铸造 ERC-20 转账 {#mintable-erc-20-transfer}

如果需要举例，请检查[此次 Mintable ERC20 根点和儿童隧道](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer)指南。

:::info

在 Mintable Token FxTunnels 中，儿童代币首先部署，根代币只在完成第一个退出/退出流程后才部署。在部署儿童合约后，可以预先确定根代币合约地址，但绘图技术上只有在完成第一次退出/退出时才存在。

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`：用于将代币从以太坊存入 Polygon
- `receiveMessage(bytes memory inputData)`：燃烧将作为 `inputData` 提供的证明，以接收根链上的代币

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`在 Polygon 网络上部署 ERC20 代币
- `mintToken(address childToken, uint256 amount)`：在 Polygon 上铸造特定数量的代币
- `withdraw(address childToken, uint256 amount)`：用于燃烧子链上的代币，以便于在根链上提取

### 在 Polygon 上打印代币 {#minting-tokens-on-polygon}

1. 调用的 `deployChildToken()` 在 `FxMintableERC20ChildTunnel` 上，然后将必要的代币信息作为参数传递。因此产生的 `TokenMapped` 事件将包含 `rootToken` 和 `childToken` 地址。请注意这些地址。
2. 调用的 `mintToken()` 在 `FxMintableERC20ChildTunnel` 上，可以用来铸造子链上的代币。
3. 调用的 `withdraw()` 在 `FxMintableERC20ChildTunnel` 上，可以用来提取来自 polygon 的代币。请注意交易哈希，因为此操作将可操作，以生成烧伤证明。
4. 您可以找到完成提取的步骤[。](#withdraw-tokens-on-the-root-chain)

### 在以特里尔姆上提取代币 {#withdrawing-tokens-on-ethereum}

已生成的燃烧证明将作为参数提供给 `receiveMessage()`，它在 `FxMintableERC20RootTunnel` 上。然后，代币余额将在根链上反映出。

### 将交易机存入回到 Polygon 上 {#deposit-tokens-back-to-polygon}

1. 在代币转账之前确保您已批准 `FxMintableERC20RootTunnel`。
2. 调用的 `deposit()` 在 `FxMintableERC20RootTunnel` 上，以 `rootToken` 作为根代币地址， `user` 作为接受者。
3. 等待状态同步事件（22-30 ins）。然后，您可以在子链上查询目标接受者的余额。

**ERC721**和 **ERC1155** 小型 FxTunnel 示例如下：

- [FxMintableERC721隧道](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155隧道](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## 部署示例 {#example-deployments}

### Goerli {#goerli}

- 检查点管理者：[0x2890bA17EfE978480615e30ecB65333b80928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- Dummy [ERC20](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3) 代币：0xe9c7873f81c815d64c71c233462cb175e4765b3
- FxERC20RootTunnel：[0x3658c](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)FDE5e9629b0805EB06AaCFc42416850961
- FxMintableERC20RootTunnel：[0xA200766a7D64E54611E2D232AA6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- Dummy ERC721 代币：[0x73594a053cb5dDE5558268d28a774375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721RootTunnel：[0xF9bc4a80464E48369303196645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Dummy ERC1155 时机：[0x1906d395752FE0c930f8d061DFEB785eBE6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnel : [0x48DE785970ca6eD289315036B6d18788cF9Df48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### Mumbai {#mumbai}

- Fx[ERC20：0xDDE69724AeFBdb08413719fE745a](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)B66e3b055C7
- FxERC20ChildTunnel：[0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintableERC20ChildTunnel：[0xA2C7eBef68B444056b4A39C2CEC2384275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
- 子代币虚拟 ERC20: 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- [FxERC721：0xf2720927](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)E04872667C0221ffA41A88528048726
- FxERC721ChildTunnel：[0x3658c](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)FDE5e9629b0805EB06AaCFc42416850961
- FxERC1155：[0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155ChildTunnel：[0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

在此可找到相应的 [Mainnet 部署部署。](https://static.matic.network/network/mainnet/v1/index.json)查找密钥，`FxPortalContracts`以查找所有默认隧道合约和其他重要的 FxPortal 合约部署。您可以使用[`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)包件访问合约地址和 ABI 。

## 合约地址 {#contract-addresses}

### Mumbai 测试网 {#mumbai-testnet}

| 合约 | 已部署地址  |
| :----- | :- |
| [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|

### Polygon 主网 {#polygon-mainnet}


| 合约 | 已部署地址  |
| :----- | :- |
| [FxRoot （以太坊主网）](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2` |
| [FxChild （Polygon 主网）](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
