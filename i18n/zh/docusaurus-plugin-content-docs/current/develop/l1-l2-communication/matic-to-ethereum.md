---
id: matic-to-ethereum
title: 数据从 Polygon 传输到以太坊
description: 从以太坊到 Polygon 的合约转移状态或数据传输
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

数据从 Polygon 传输到以太坊的机制与从以太坊传输到 Polygon 的机制略有不同。验证者在以太坊上创建的**检查点**交易可用于该传输。基本上，交易起初在 Polygon 上创建。在创建此交易时，必须确保**发送事件**，**事件日志包含我们希望**从 Polygon 转交到以太网上数据。

在一段时间内（约为10-30 分钟），该交易由验证者在以太坊链上检查点。检查点完成后，在 Polygon 链上创建的交易的散列可以提交，作为在以太场所链上的 **RootChainManager** 合约上的证明。该合约可检验交易，验证该交易是否包含于检查点，并最终解码来自该交易的事件日志。

此阶段结束后，我们可以使用**已解码的事件日志数据**对以太坊链上部署的根链执行任何更改。我们还需要确保以太坊上的状态更改仅以安全的方式进行。因此，我们将使用 **Predicate** 合约。它是一种特殊类型的合约，只能通过 **RootChainManager** 合约来触发。该结构确保只有在 Polygon 上的交易在以特里拉姆链上通过 **RootChainManager** 合约检查点并验证时才发生状态更改。

# 概述 {#overview}

- 交易通过部署在 Polygon 链上的子合约执行。
- 该交易也会发布事件。此事件的参数**包括必须**从 Polygon 转入以太机组的数据。
-
 Polygon 网络上的验证者在特定时间间隔（可能是 10-30mins）中收集此交易，验证**并将其添加**到以特里厄姆上的检查点。
- 在 **RootChain** 合约上创建检查点交易，可使用此[脚本](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)来确认检查点包含情况
- 在检查点添加完成后，**Matic.js** 库可用于调用 **exit** 函数，该函数来自 **RootChainManager** 合约。**exit** 函数可遵照本[示例](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js)中展示的方式通过 Matic.js 库来调用。

- 运行脚本，验证在以太机链上包含 Polygon 交易哈希的操作，然后调用[预测](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol)合约的**退出交易**函数。
- 这样可确保**根链合约上的状态变化**总是采取一种**安全**的方式，**并且只通过 Predicate 合约**。
- 要注意的是，**核查** Polygon 交易散布并**触发上游合**约在**单一交易**中进行，从而确保在根合约上进行任何状态变化的安全。

# 实施 {#implementation}

这是将数据从 Polygon 传输到以太坊的简单演示。本教程展示跨链传输 uint256 值的示例。您还可以传输某种类型的数据，但数据需要字节编码，然后从子合约发出。它可以在根合约上最终解码。

1. 首先创建根链和子链合约。确保状态更改函数也能发布事件。事件必须将拟传输的数据作为其本身的一个参数。子合约和根合约的格式必须符合以下示例。这是一个非常简单的合约，它的数据变量数值使用 setData 函数设置。调用 setData 函数将会发出数据事件。合约的其余内容将在本教程的后续部分进行解释。

A. 子合约

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. 根合约

将其`0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f`作为根合约构造函数的`_predicate`数值进行传递。

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. 当子合约和根合约分别部署在 Polygon 和以太坊链上后，这些合约必须使用 PoS 桥进行映射。该映射可确保跨链的两个合约之间保持连接。为了进行此映射，可以通过[不ord](https://discord.com/invite/0xPolygon)上联系到 Polygon 团队。

3. 值得注意的是，在根合约上有一个 onlyPredicate 修饰符。建议始终使用此修饰符，因为它可以确保仅允许 Predicate 合约在根合约上进行状态更改。Predicate 合约是一种特殊合约，它只有在 Polygon 链上发生的交易被以太坊链上的 RootChainManager 验证时才会触发根合约。这样可以确保根合约上状态安全更改。

为了测试上述实施，我们可以通过调用子合约的**集数**据函数在 Polygon 链上创建交易。此时我们需要等待检查点完成。该[脚本](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)可用于检查检查点内容。检查完成后，使用 Matic.js SDK 调用 RootChainManager 的 Exit 函数。

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

如上面的镜头所示，**交易**的交易散布在 Polygon 链上部署的儿童合约上。

**logEventSignature** 是数据事件的 keccack-256 哈希值。它与 Predicate 合约包含的哈希相同。本教程中使用的所有合约代码以及退出脚本都可以在[此处](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)找到

退出脚本完成后，以太坊链上的根合约可进行查询，以验证在子合约中设置的变量 **Data** 是否也反映在根合约的 **Data** 变量中。
