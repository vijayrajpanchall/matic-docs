---
title: Tellor
description: "将交易机序列整合到 Polygon 合约中的一份指南。"
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor 是一个预言机，可通过简单的加密经济学激励措施来提供抗审查数据。数据可以由任何人提供，所有人检查。Tellor 灵活的结构允许以任何时间间隔提供任何数据，以便于进行实验/创新。

## （软）先决条件 {#soft-prerequisites}

我们假设您在预言机方面的编码技能水平如下。

假设：

- 您可以导航终端
- 您已安装 NPM
- 您知道如何使用 NPM 来管理依赖项

Tellor 是一个实时且开源的预言机，可随时实施。这位初始者指南在这里展示了人们可以与 Tellor 站起来运行和运行轻松的程度，为您的项目提供完全分散和抵抗检查的序列。

## 概述 {#overview}

Tellor 是一个预言机系统。各当事方可在该系统中请求链下数据点（例如 BTC/USD）数值，而且报告者竞相将该数值添加到链上数据库中。所有 polygon 智能合约都可以访问该数据库。数据库的输入由质押报告者网络提供保护。Tellor 采取加密经济学激励机制。报告者诚实提交的数据将通过发行 Tellor 代币获取奖励。任何不良行为者都会通过争议机制迅速受到惩罚并从网络中删除。

在本教程中，我们将讨论：

- 设置启动和运行所需的初始工具包。
- 演示简单的示例。
- 列出您当前可以测试 Tellor 的测试网地址。

## UsingTellor {#usingtellor}

首先，安装将 Tellor 作为预言机使用所需的基本工具。使用[本软件包](https://github.com/tellor-io/usingtellor)安装 Tellor 用户合约：

`npm install usingtellor`

安装完成后，您的合约将可以继承“UsingTellor”合约的函数。

非常好！现在工具已准备就绪，我们通过检索比特币价格来进行简单的练习：

### 比特币/美元示例 {#btc-usd-example}

继承 UsingTellor 合约，将 Tellor 地址作为构建参数传递：

下面是一个示例：

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## 地址： {#addresses}

Tellor Tributes: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Oracle: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### 想先做一些测试？： {#looking-to-do-some-testing-first}

Polygon Mumbai 测试网： [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

测试试点：[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

需要一些测试代币吗？在 [@trbfaucet](https://twitter.com/trbfaucet) 上发送给我们

为了便于使用，UsingTellor repo 使用了版本的 [Tellor  Playgl 合约](https://github.com/tellor-io/TellorPlayground)，以便利集成。有关有用函数列表，请参见[此处](https://github.com/tellor-io/sampleUsingTellor#tellor-playground)。

#### 欲了解 Tellor 预言机稳健实施详情，请参阅[此处](https://github.com/tellor-io/usingtellor/blob/master/README.md)的完整可用函数列表。

#### 还有问题吗？加入社区[！](https://discord.gg/tellor)
