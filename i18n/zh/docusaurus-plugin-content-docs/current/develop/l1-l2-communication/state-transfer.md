---
id: state-transfer
title: 状态传输
description: 从以太坊转发状态或数据轻松转发到 Polygon。
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon 验证者在以太坊链上不断监测一个称为 `StateSender`。以太坊链上的注册合约每次调用该合约时，它都会发出事件。Polygon 验证者可使用此事件将数据转发到 Polygon 链上的另一个合约。该**状态同步**机制用于将数据从以太坊发送到 Polygon。

此外， Polygon 验证者在 Polygon 链上定期发送每项交易的以太机散发散散发。您可以使用此**检查点**验证在 Polygon 上发生的任何交易。一旦验证交易发生在 Polygon 链上，则可使用以太坊进行适当的操作。

这两个机制可以一起使用，以便在以特里尔和 Polygon 之间进行双向数据（状态）转换。要抽取所有这些互动，您可以直接继承我们的（在以太坊上）和（`FxBaseRootTunnel`在 Polygon `FxBaseChildTunnel`上）合约。

## 根隧道合约 {#root-tunnel-contract}

使用的 `FxBaseRootTunnel` 合约来自[此处](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol)。该合约提供访问以下功能：

- `function _processMessageFromChild(bytes memory data)`：这是一个虚拟函数，需要在合约中实施，继承它以处理发送的数据`ChildTunnel`。
- `_sendMessageToChild(bytes memory message)`：该函数可内部调用，以便于将任何字节数据作为消息发送。此数据将按原样发送至子隧道。
- `receiveMessage(bytes memory inputData)`：需要调用此函数来接收由 发出的消息`ChildTunnel`。交易证明需要作为 calldata 提供。使用 **matic.js** 生成证明的实例脚本如下。

## 子隧道合约 {#child-tunnel-contract}

使用的 `FxBaseChildTunnel` 合约来自[此处](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol)。该合约可访问下列函数：

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`：这是一个虚拟函数，需要实施逻辑来处理从 发送的消息`RootTunnel`。
- `function _sendMessageToRoot(bytes memory message)`：该函数可内部调用，以发送字节消息到根隧道。

## 先决条件 {#prerequisites}

- 您需要在 Ethereum 上继承根合约的`FxBaseRootTunnel`合约。此[合约](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol)可作为示例。同样，在 Polygon 上继承您的子孙中的`FxBaseChildTunnel`合约。此[合约](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol)可作为示例。
- 在部署根合约时
  - **Goerli Testnet** 转递 地址为 0**x2890bA17EfE978480615e30ecB65333b80928e** `_fxRoot`以及 `_checkpointManager`** 0x3d**1d3E34f7fB6D26245E6640E1c50710eFF15bA。

  - **Ethereum Mainnet** `_checkpointManager`是一个 0**x86e4dc95c7fdbdbbdbf52e3d563bdb00823894c287**，`_fxRoot`是 **0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2。**
- 在 **Mumbai testnet** 上部署儿童合约，请通过 **0xCf73231F28B7331BBe3124B907840A94851f9f11** 中`_fxChild`使用。对于 **Polygon 主网，**`_fxChild`将为 0**x8397259c983751DAf4040079063935a11afa28a。**
- `setFxChildTunnel`调用已部署的根隧道，并使用子隧道地址。例如：[0x79cd30ace561a226258918b56ce098a08ce08ce0c707a80bba9197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- `setFxRootTunnel`调用已部署的子隧道，并使用根隧道地址。例如：[0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2fc4b864d2b45a8b7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## 状态传输桥接示例合约 {#example-contracts-of-state-transfer-bridge}

- **合同：**[Fx-Portal Github 存储库](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## 从以太坊 → Polygon 中转账 {#polygon}

- 您需要在根合约中内部`_sendMessageToChild()`调用，然后将数据转交给 Polygon 以作为参数。例如：[0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cf960537644c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- 在您的子合约中实施的 `_processMessageFromRoot()` 虚函数来自 `FxBaseChildTunnel`，用于从以太坊中检索数据。当状态同步时，数据将自动从状态接受者接收。

## 从 Polygon → Ethereum 中转账 {#ethereum}

1. 调用子合约内部的 `_sendMessageToRoot()`，将数据作为拟发送至以太坊的参数。例如：[0x3cc9f7e675b4f6af87e99947bf24c38cbfa0b933d8c981644a2f2b550e66a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

请注意交易散布，因为它将用于在作为检查点列入后生成证据。

2. **完成根链上的退出证明生成：**使用**交易分析**和**信息分析组合_SEVET_EVET_SIG**来生成证明。要生成证明，您可以使用 Polygon 托管的证明生成 API 或者您也可以通过[遵循此处](https://github.com/maticnetwork/proof-generation-api)的指示来填写自己的证明生成 API。

由 Polygon 主持的证明生成端点在此可用[。](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.


 Mainnet 和 Testnet  的证明生成 API 使用例子如下：

→ → [Mumbai 测试网证明生成](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ → [Polygon  Mainnet 证明生成](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. 在您的根合约中实施 `_processMessageFromChild()`。

4. 将生成的证明输入 `receiveMessage()`，以检索从子隧道发送至您的合约的数据。例如：[0x436dcd500659bea715a09d9257295dc21290769daea7f0b666166ef75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515)
