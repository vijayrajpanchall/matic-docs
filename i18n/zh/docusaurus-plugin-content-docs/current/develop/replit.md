---
id: replit
title: 使用复制来部署智能合约
sidebar_label: Using Replit
description: 使用 Polygon 上的 ReplikitIde 进行智能合约部署
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## 概述 {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) 是一个编码平台，允许您编写代码和托管应用程序。Replit 支持 [Solidity 编程语言](https://replit.com/@replit/Solidity-starter-beta?v=1)，因此它可为 Web3 开发者提供创建和部署智能合约所需的一切特性和功能。

本文指导您使用[复制 IDE](https://replit.com/signup) [和复制 IDE 发展模板（Solidity 启动器选项卡）](https://replit.com/@replit/Solidity-starter-beta?v=1)在 Polygon 上建立和部署固体智能合约。

## 操作内容 {#what-you-will-do}

- 创建 Replit 账户
- 创建 Replit 环境
- 在 Polygon 孟买网络上部署一个样本项目
- 合约验证
- 将您的项目发布到个人 Replit 配置文件。

:::tip

关于“固体”和“复制”的更多实例，您可以从<ins>**[“复制”开始](https://blog.replit.com/solidity)**</ins>阅读文章，或者检查“复制” <ins>**[Solidity 文档和“代替”合约教程。](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins>
:::

## 先决条件 {#prerequisites}

您不需要任何本地环境设置，以便使用 Replity Replity Replity Committ在 Polygon 上部署您的固体智能合约。

您需要一个基于浏览器的 Web3 钱包来与 Polygon Mumbai 测试网以及部署的合约交互。如果您已经在使用 MetaMask，建议您创建一个新账户来测试 Replit。您可以从账户菜单中执行此操作，该菜单在您点击 MetaMask 界面右上角的账户头像时出现。

您必须设置以下所有先决条件才能在 polygon 上部署您的 Solidity 智能智能合约：

1. [创建 Replit 账户](https://replit.com/signup)
2. [下载 Metamask 钱包](/docs/develop/metamask/hello)
3. [在 MetaMask 上配置 Polygon](/docs/develop/metamask/config-polygon-on-metamask)
4. [获取测试网代币](https://faucet.polygon.technology)

## 使用 Repl {#working-with-a-repl}

您创建的每个 Repl 都是一个功能齐全的开发和生产环境。按照以下步骤创建 Solidity starter Replit：

1. [登录](https://replit.com/login)或[创建账户](https://replit.com/signup)。创建[复制账户](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide)后，主屏幕将包含一个数据交换板，可以查看、创建项目和管理账户。

![图像](/img/replit/dashboard.png)

2. 登录后，创建“固体启动器”复制，然后选择**“ + 创建” 进行检查**，然后在屏幕右上角选择“ + 创建”，或者“ **+** ”。

![图像](/img/replit/solidity.png)

3. 选择[**“ Solidity 启动器”（beta）**](https://replit.com/@replit/Solidity-starter-beta?v=1)模板，然后给项目标题。

4. 单击 **+** 创建 Repl 以创建项目。

:::note

Solidity 启动程序包含一个方便浏览器的接口，使用 <ins>**[Web3 Ethereum JavaScript API](https://web3js.readthedocs.io/en/v1.5.2/)**</ins>建立，您可以使用该接口部署和与我们的合约互动。我们将部署到Replit 的测试网上，这是一种自定义版本的以太机区块链，由Replit 管理并优化于测试。

:::

## 在 Polygon 上部署 {#deploy-on-polygon}

确保您遵循上面的**先决条件**列表，以便您准备部署并与智能合约进行互动。

1. 单击“**运行**”（在上面）来安装所有相关包件，然后开始实施合约部署 UI。

2. 将您的 MetaMask 钱包连接到 Web 界面，然后转换到 [Mumbai 测试网上。](docs/develop/metamask/config-polygon-on-metamask)

![图像](/img/replit/connect.png)

3. 单击“连接**”钱包，**选择您的账户，然后选择**“连接**”。

![图像](/img/replit/deploy-list.png)

4. 从下拉列表中选择要部署的合约。单击**“部署”。**

5. 您将收到一个 MetaMask 弹出窗口，要求确认。通过您的钱包批准交易，以部署您的合约。

## 验证和测试合约 {#verifying-and-testing-your-contract}

在部署合约时，[导航至 Polyganscan](https://mumbai.polygonscan.com/) 来搜索您的账户，查看您已部署的合约，然后备份您的账户地址。

在部署了合约后，它将显示为可扩展的方框，下拉框下方。展开并查看所有可用的不同功能。您现在可以使用提供的用户界面或界面上显示的可共享 URL 与您的合约进行交互。

## 发布到 Replit​ {#publish-to-replit}

Replit 允许您将项目发布到个人配置文件。项目发布后将显示在您的 Spotlight 页面上，以供其他人探讨、交互、复制和协作。

遵循以下步骤发布您的项目以回复：

1. 在屏幕上方选择项目标题。
2. 完成项目名称和描述，然后单击**“发布”。**
