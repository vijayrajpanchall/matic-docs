---
id: quicknode
title: 使用QuickNode 部署智能合约
sidebar_label: Using QuickNode
description:  使用 Brownie 和Quicknode在 Polygon 上部署智能合约。
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 概述 {#overview}

Python 是一个最多功能编程语言，从运行测试模型的研究者到在繁重生产环境中使用开发者，它在每个可能的技术领域都使用案例。

在本次教程中，您将通过使用 Polygon 使用 [QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) 测试网点来了解如何使用 [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) 框架来写写和部署智能合约。

:::tip

如需联系 Quicknode 团队，请发送消息或在 Twitter 上推送 [@QuickNode](https://twitter.com/QuickNode)。

:::

## 先决条件 {#prerequisites}

- 已安装的 Python3
- Polygon 节点
- 代码编辑器
- 命令行界面

## 操作内容 {#what-you-will-do}

1. 设置 Brownie
2. 访问 Quicknode 测试节点
3. 编译和部署智能合约
4. 检查已部署的合约数据

## 什么是 Brownie？ {#what-is-brownie}

智能合约开发主要使用 JavaScript-based 库，例如 [web3.js](https://web3js.readthedocs.io/)、[ethers.js](https://docs.ethers.io/)、[Truffle](https://www.trufflesuite.com/docs/truffle/), and [Hardhat](https://hardhat.org/). Python 是一个多功能、高度使用的语言，也可用于智能合约/ Web3 开发；[web3.py](https://web3py.readthedocs.io/en/stable/) 是一个令人信服的 Python 库，满足 Web3 需要的。Brownie 框架建立在上面`web3.py`。

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) 是基于 Python 的智能合约开发和测试框架。Brownie 支持 Solidity 和 Vyper 合约，甚至可以通过 [pytest](https://github.com/pytest-dev/pytest) 提供合约测试。

为了演示使用 Brownie 编写和部署智能合约的过程，我们将使用模板项目 [Brownie-mixes](https://github.com/brownie-mix)。具体而言，我们将 [token mix](https://github.com/brownie-mix/token-mix)，它是一个 ERC-20 实施模板。

## 安装依赖性 {#install-dependencies}

Brownie 建立在 Python3 上面，因此我们需要安装它来与 Brownie 合作。让我们检查在系统上是否安装了 Python3。要这样做，请在命令行工具中键入以下内容：

```bash
python3 -V
```

它将返回已安装的 Python3 版本。如果未安装，请从 [Python 官网](https://www.python.org/downloads/)下载并安装。

我们在安装 Brownie 之前可以先创建一个项目目录，并将其作为当前工作目录：

```bash
mkdir brownieDemo
cd brownieDemo
```

现在系统已安装 Python3，可以开始使用 Python 包管理工具 pip 安装 Brownie。Pip 类似于 JawaScript 的 npm。在命令行中键入以下内容：

```bash
pip3 install eth-brownie
```

:::tip

如果安装失败，您可以使用以下命令：`sudo pip3 install eth-brownie`

:::

要检查是否正确安装布朗尼，请在命令`brownie`行中键入，并应提供以下输出：

![图像](/img/quicknode/brownie-commands.png)

要获取代币混合，请在命令行中键入以下内容：

```
brownie bake token
```

这将创建在我们的目录`token/`中新目录`brownieDemo`。

### 文件结构 {#file-structure}

首先，浏览到目录`token`：

```bash
cd token
```

现在，打开文本编辑器中的`token`目录。在您将要找到的文件`contracts/`夹中，`Token.sol`这是我们的主要合约。您可以写下自己的合约或修改文件`Token.sol`。

在文件夹下`scripts/`，您将找到 `token.py`Python 脚本。该脚本将用于部署合约，需要根据合约进行修改。

![图像](/img/quicknode/token-sol.png)

该合约是 ERC-20 合约。您可以了解更多有关 ERC-20 标准和合约的详情，见本 [ERC-20 代币指南。](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token)

## 启动您的 Polygon 节点 {#booting-your-polygon-node}

QuickNode 拥有一个全球网络，包括 Polygon Mainnet 和 Mumbai 测试网点。他们还运行免费[公共 Polygon RPC](https://docs.polygon.technology/docs/operate/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro)，但如果您获得利率限制，您可以[从QuickNode 上登记免费试用节点。](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide)

![图像](/img/quicknode/http_URL.png)

复制 **HTTP URL**，后期在教程上将有用。

## 网络和账户设置 {#network-and-account-setup}

我们需要使用 Brownie 设置 QuickNode 端点。要这样做，请在命令行中键入以下内容：

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

`YOUR_QUICKNODE_URL`用启动 Polygon 节点时刚收到的 **Mumbai testnet HTTP URL**代替。

在上面的命令中， `Ethereum` 是环境名称，而 `matic_mumbai` 是网络自定义名称；您可以对自定义网络指定任何名称。

我们需要在这里做的下一个事情是使用 Brownie 创建新的钱包，在命令行中键入以下内容：

```
brownie accounts generate testac
```

将要求您为账户设置密码！完成步骤后，这将生成账户，同时使用 mnemonic 短语，保存在线上。该名称`testac`是我们的账户的名称（您可以选择您喜欢的任何名称）。

![图像](/img/quicknode/new-account.png)

:::note

Mnemonic 短语可以用于回收账户或将账户导入到其他[<ins>非保管钱包中。</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode)您在上图中看到的账户根据本指南创建。

:::

复制账户地址，以便我们能够获得一些测试 MATIC，这需要进行部署合约。

## 获取 Testnet MATIC {#getting-testnet-matic}

我们需要一些测试 MATIC 代币来支付天然气费，以部署我们的智能合约。

复制我们在这个教程中生成的账户地址，将它粘贴到 [Polygon faucet](https://faucet.polygon.technology/) 地址区，然后单击**“提交”。**水龙头将向您发送 0.2 个测试 MATIC。

![图像](/img/quicknode/faucet.png)

## 部署您的智能合约 {#deploying-your-smart-contract}

在部署合约之前，您需要使用以下方法来汇编它：

```
brownie compile
```

![图像](/img/quicknode/brownie-compile.png)

现在`scripts/token.py`打开您的文本编辑器，并进行以下更改：

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info 解释

使用上述代码，我们已导入了我们早先创建的`testac`账户，并将其存储在变量中`acct`。另外，在下一行中，我们编辑了`'from':`部分，以接收可变数据`acct`。

:::

最后，我们将部署我们的智能合约：

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`这是我们早些时候创建的自定义网络的名称。提示将问询您，在进行账户时，我们早先设置的**密码**。

我们在运行上述命令后必须获取交易哈希，Brownie 将等待交易确认。一旦交易确认，它将返回部署在 Polygon Mumbai 测试网上的合约地址。

![图像](/img/quicknode/brownie-run.png)

您可以通过将合约地址复制粘贴到 [Polygonscan Mumbai](https://mumbai.polygonscan.com/) 来查看已部署的合约。

![图像](/img/quicknode/polygonscan.png)

## 测试合约 {#testing-the-contract}

Brownie 还可提供测智能合约功能选项。它采用 `pytest` 框架来轻松生成单位测试。有关 Bronwnie 写入测试的更多详情，请参阅[有关文档](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#)。

**以上就是使用 Brownie 和 QuickNode 在 polygon 上部署合约的流程。**

QuickNode 像 Polygon 一样，一直采用教育第一方法，提供开发者[指南、](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide)[博士](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide)、[教程视频](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos)和由渴望相互帮助[的 Web3 开发者组成的社区](https://discord.gg/DkdgEqE)。
