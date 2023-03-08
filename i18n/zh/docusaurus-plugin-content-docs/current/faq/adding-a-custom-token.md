---
id: adding-a-custom-token
title: 添加自定义代币
sidebar_label: Adding a Custom Token
description: 在 Polygon 上建立您的下一个区块链应用程序。
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

**添加自定义代币**功能可以让您直接添加任意代币并在 Polygon 钱包套件中使用。您只需根据代币的根合约或子合约的地址进行搜索：

* **根合约**是以太坊上的代币合约
* **子合约**是 Polygon 上的合约

### 如何找到代币合约？ {#how-do-i-find-the-token-contract}

按照代币名称在 [Coingecko](http://coingecko.com) 或 [Coinmarkcap](https://coinmarketcap.com/) 上进行搜索，即可看到以太坊链上的地址（ERC 20 代币）和其他受支持的后续链，如 Polygon。其他链上的代币地址可能未更新，但使用根合约地址肯定足以满足所有需求。

选择代币时，您可以通过以下方式搜索：
* 代币符号
* 代币名称
* 合约

操作方法：

1. 通过添加合约地址即可轻松将任意代币作为自定义代币添加至列表（

Polygon 或以太坊上的合约地址我们都支持）：

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. 获取代币信息后，您会看到带有所有代币信息的确认屏幕。然后您即可将其添加为自定义代币，存储在本地系统中。由于存在很多克隆币或欺诈币，我们建议您再次确认代币合约：

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. 现在，选择代币时就会显示您添加的代币：

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

您还可以直接从**管理**屏幕的代币选项卡添加代币：

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>