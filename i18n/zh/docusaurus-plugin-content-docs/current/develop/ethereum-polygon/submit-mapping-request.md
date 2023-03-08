---
id: submit-mapping-request
title: 映射标记
description:  使用 PoS 桥梁在以太坊和 Polygon 链之间进行映射的指南
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

需要进行映射，以便将您的资产转交到和从以太坊和 Polygon  PoS 上。我们提供两种类型的桥接用于完成映射。有关桥梁的更多详细信息可在[此](/develop/ethereum-polygon/getting-started.md)了解。

:::tip

Polygon PoS 桥上可供 Polygon 主网和 Mumbai 测试网使用。

:::

## 提交映射请求的步骤 {#steps-to-submit-a-mapping-request}

为了在以太坊和 Polygon  PoS 之间映射代币，您可以使用 [Polygon 时机映射器。](https://mapper.polygon.technology/)打开链接，单击右上角的**“ Map 新代码**”按钮，以启动新的映射请求。

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**步骤 1** → 选择您想要映射代币的网络。您可以选择选择进行测试的 **Goerli-Mumbai**，选择选择选择进行选择的 Minnet，选择选择使用**以太机-Polygon  PoS**。

**步骤 2** → 选择您正在进行映射的代币类型 - **ERC20**、 **ERC721** 或 **ERC1155**。

步骤 **3** → 输入您的以**太机/Goerli** 代币地址，在**以太机时机**地址字段中输入。确保在 **Ethereum/Goerli** 区块链探索者上验证您的代币合同代码。

**步骤 4** → 添加**了以太机代码地址**后，相应的字段即： **时机名称、时机代码和时机代码**将自动填写合约详细信息。

**步骤 5** → 现在，单击“**开始映射”**按钮，以启动映射流程。由于这涉及到以太坊交易，您需要连接您的钱包来进行。

**步骤 6** → 您将得到一种审查模式，其中包含代币信息和估计的气体费用，以完成映射。通过选择**“ Paygas Fee 以进行地图**按钮来验证详细信息并启动映射交易。

在通过钱包确认交易后，您必须等待交易在 Ethereum 上完成。交易完成后，您将向您展示在 Polygon  PoS 网络上使用您的子代币地址的成功模式。您可以通过检查 [Polygonscan](https://polygonscan.com/) 上生成的子代币地址来继续验证映射。

对于成功的 Mainnet 映射，您可以[在](https://github.com/maticnetwork/polygon-token-list/issues/new/choose)此提供您的代币详细信息，以添加到 [**Polygon 时机列表**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json)上。

:::tip

如果发生[<ins>自定义代币映射，</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-)您可以访问我们的 [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) 文档，并使用提供的信息来建立自定义的 FX 实施，以进行映射代币。

:::

## 视频指南 {#video-guide}

以下是关于如何在**以太坊 goerli  & 之间**映射代币的快速视频教导：

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>您的浏览器不支持此视频元素。</p>
</video>
