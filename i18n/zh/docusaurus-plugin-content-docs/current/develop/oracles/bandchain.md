---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChain 是一个为数据 Oracle 建立的高性能区块链，用于查询传统 Web API 数据
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Band Protocol 支持从传统网络 API 进行数据查询，然后在区块链中使用。开发者可以通过**基于宇宙的区块链进行**查询，以方便搜索和付款，然后通过链接通信使用dApp 数据。只需 3 个简单步骤即可集成预言机数据：

1. **选择预言机脚本**

    预言机脚本是一个哈希值，可唯一标识从 Band-chain 获取的数据类型。这些脚本可参阅[**此处**](https://guanyu-devnet.cosmoscan.io/oracle-scripts)。这些脚本在发出预言机请求时可作为一个参数使用。

2. **请求来自 BandChain 的数据**

可以通过两种方式完成：

    - **使用 BandChain 探索器**

    您可以单击您选择的序列脚本，然后从“**执行”**选项卡中转入参数，然后从 BandChain 中获得回复。响应将包含结果以及 EVM 证明。该证明必须备份，以便于在最后一步使用。使用探索者查询序列的 BandChain 文件中可供使用[**。**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer)

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    鉴于上述，是一个提出搜索请求以获取随机编号值的例子。值 100 转交给 oracle 请求的`max_range`参数。我们将在响应中收到一个哈希。点击哈希显示响应的完整详情。

    - **使用 BandChain-Devnet JS 库**

    您可以使用 BandChain-Devnet 库直接查询 BandChain 链。查询时，它将在响应中给出 **EVM 证明**。该证明可在 BandChain 集成的最后一步使用。使用 BandChain-Devnet JS 库查询序列的 BandChain 文件中可供查询[**。**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library)随机数预言机的请求负载如下所示。确保请求正文以 application/json 格式传递。

3. **使用智能合约中的数据**

  最后一步是部署验证合约并将预言机请求的响应存储到验证合约状态变量中。设置完成后，这些状态变量可去中心化应用程序需要时访问。同样，再次从去中心化应用程序查询预言机脚本，这些状态变量也可以更新为新的数值。下面是一个使用随机数预言机脚本存储随机数值的验证合约。

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

部署时，必须通过 3 个参数。**第一个参数**`codeHash`是  正交脚本的暂时 hash 。**第二个**参数是“oracle 脚本请求参数对象”。该文件必须以字节格式通过。BandChain 提供用于将参数 JSON 对象转换为字节格式的 REST API。API 详情请参阅[**此处**](https://docs.bandchain.org/references/encoding-params)。0x 必须加入从该 API 接收到的响应中。**第三个参数**是已经部署在 Polygon 网络上上的 BandChain 合约地址。Band Protocol 支持 Polygon TestnetV3: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf。

需要注意的另一个问题是，验证合约应导入分别称为“帮助者库”和`BandChainLib.sol`“接口`IBridge.sol`”。它们可以在以下链接中找到： [**Bandlaink**](https://docs.bandchain.org/references/bandchainlib-library) 库和[**IBridge**](https://docs.bandchain.org/references/ibridge-interface) 接口。

  验证合约部署完成后，可通过去中心化应用程序的查询来访问状态变量。 同样，可以为不同的内置的序列脚本创建多个验证合约。IBridge 接口有一个`relayAndVerify()`称为验证合约中每次更新值的方法。验证合约中的`update()`方法具有更新状态变量的逻辑。从查询 序列脚本中获得的 EVM 证明必须转达到方法`update()`。每次更新值时，部署在 Polygon 上的一次 BandChain 合约都会验证数据，然后将数据存储在合约状态变量中。

BandChain 提供一个分散的处理网，可供dApps 使用，以提升他们的智能合约逻辑。[**此处**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library)可查阅 BandChain 文件，内容涉及部署合约、储存价值和更新价值。