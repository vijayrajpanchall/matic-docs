---
id: optimisticoracle
title: UMA 的 Optimistic Oracle
sidebar_label: UMA
description: UMA 的乐观乐观 Oracle 允许合同迅速请求并接收任何类型的数据
keywords:   
  - wiki
  - polygon
  - oracle
  - UMA
  - Optimistic Oracle
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

UMA的乐观乐观 Oracle 允许合同迅速请求和接收任何类型的数据。UMA的 序列系统由两个核心组件组成：

1. Optimistic Oracle
2. 数据验证机制（DVM）

## Optimistic Oracle {#optimistic-oracle}

UMA的**乐观乐观 Oracle** 允许合约迅速请求和接收价格信息。乐观乐观的 Oracle 是一个在启动价格请求的合约和称为数据核查机制的 UMA争议解决系统之间进行的一般升级游戏。

除非有争议，否则 Optimistic Oracle 建议的价格将不会发送到 DVM。这使合同在预先确定的时间内获得价格信息，而不写上链上资产的价格。

## 数据验证机制（DVM） {#data-verification-mechanism-dvm}

如果出现争议，请求将发送到 DVM。所有基于 UMA 构建的合约都使用 DVM 作为解决争议的机制。发送到 DVM 的争议将在 UMA 代币持有者在给定时间对资产价格进行投票后 48 小时得到解决。除非资产价格必须在 48 小时内提供，否则 UMA 上的合约不需要使用 Optimistic Oracle。

数据验证机制 (DVM) 是基于 UMA 协议构建的合约争议解决服务。DVM 功能非常强大，因为它包含人为判断的元素，可以确保在波动（有时可操纵）的市场发生问题时安全、正确地管理合约。

## Optimistic Oracle 接口 {#optimistic-oracle-interface}

金融合约或任何第三方都可通过 Optimistic Oracle 检索价格。在提出价格请求后，任何人都可以提出对应的价格提案。价格在提出后将经历一个存活期。在此期间，任何人都可以对价格提出争议，将争议价格发送至 UMA DVM 进行解决。

:::info

本部分旨在说明不同的参与者如何与 Optimistic Oracle 交互。如需查最新的 Optimistic Oracle 合约主网、Kovan 或 L2 部署，请参阅[生产地址](https://docs.umaproject.org/dev-ref/addresses)。

:::

Optimistic Oracle 接口有十二种实现方法。
- `requestPrice`
- `proposePrice`
- `disputePrice`
- `settle`
- `hasPrice`
- `getRequest`
- `settleAndGetPrice`
- `setBond`
- `setCustomLiveness`
- `setRefundOnDispute`
- `proposePriceFor`
- `disputePriceFor`

### requestPrice {#requestprice}

请求新价格。该方法必须用于价格标识符。请注意，UMA 系统中注册的大多数金融合约都会自动调用该方法，并且任何人都可以为任何已注册的价格标识符进行调用。例如，当 Expiring Multiparty (EMP) 合约的 `expire` 方法被调用时，它可以调用该方法。

参数：
- `identifier`： 请求价格标识符。
- `timestamp`： 请求价格的时间戳。
- `ancillaryData`：代表与价格请求同时传递的附加参数的辅助数据。
- `currency`： 用于支付奖励和费用的 ERC20 代币。它必须在批准后才能与 DVM 一起使用。
- `reward`： 获胜提案者获取的奖励。它将由调用者支付。注：其数值可以为 0。

### proposePrice {#proposeprice}

为现存价格请求提出价格值。

参数：
- `requester`： 初始价格请求的发送者。
- `identifier`： 标识现存请求的价格标识符。
- `timestamp`： 标识现存请求的时间戳。
- `ancillaryData`： 请求价格的辅助数据。
- `proposedPrice`： 提案价格。

### disputePrice {#disputeprice}

对有效提案现存价格请求的价格值提出争议。

参数：
- `requester`： 初始价格请求的发送者。
- `identifier`： 标识现存请求的价格标识符。
- `timestamp`： 标识现存请求的时间戳。
- `ancillaryData`： 请求价格的辅助数据。

### 解决 {#settle}

尝试解决未完成的价格请求。如果无法解决，将恢复。

参数：
- `requester`： 初始价格请求的发送者。
- `identifier`： 标识现存请求的价格标识符。
- `timestamp`： 标识现存请求的时间戳。
- `ancillaryData`： 请求价格的辅助数据。

### hasPrice {#hasprice}

检查给出的请求是否已解决（即 Optimistic Oracle 中有价格）。

参数：
- `requester`： 初始价格请求的发送者。
- `identifier`： 标识现存请求的价格标识符。
- `timestamp`： 标识现存请求的时间戳。
- `ancillaryData`： 请求价格的辅助数据。

### getRequest {#getrequest}

获取包含所有价格请求信息的最新数据结构。

参数：
- `requester`： 初始价格请求的发送者。
- `identifier`： 标识现存请求的价格标识符。
- `timestamp`： 标识现存请求的时间戳。
- `ancillaryData`： 请求价格的辅助数据。

### settleAndGetPrice {#settleandgetprice}

检索调用者先前请求的价格。如果请求未解决或无法解决，将被退回。注意：该方法不是视图，如果价格请求未解决，该调用可能在实际上解决价格请求。

参数：
- `identifier`： 标识现存请求的价格标识符。
- `timestamp`： 标识现存请求的时间戳。
- `ancillaryData`： 请求价格的辅助数据。

### setBond {#setbond}

设置与价格请求相关的提案保证金。

参数：
- `identifier`： 标识现存请求的价格标识符。
- `timestamp`： 标识现存请求的时间戳。
- `ancillaryData`： 请求价格的辅助数据。
- `bond`： 设置自定义保证金数额。

### setCustomLiveness {#setcustomliveness}

设置请求的自定义存活值。存活期是指提案在自动解决之前必须等待的时间。

参数：
- `identifier`： 标识现存请求的价格标识符。
- `timestamp`： 标识现存请求的时间戳。
- `ancillaryData`： 请求价格的辅助数据。
- `customLiveness`： 新的自定义存活期。

### setRefundOnDispute {#setrefundondispute}

如果提案有争议，设置退还奖励的请求。这样可以在发生争议导致的延迟时“对冲”调用者。注：如发生争议，获胜者仍会收到对方的保证金，因此即使返还奖励，仍有利润可赚。

参数：
- `identifier`： 标识现存请求的价格标识符。
- `timestamp`： 标识现存请求的时间戳。
- `ancillaryData`： 请求价格的辅助数据。

### disputePriceFor {#disputepricefor}

代表其他地址提出有效提案价格请求争议。注意：该地址将收到来自争议的任何奖励。然而，任何保证金都将从调用者处提取。

参数：
- `disputer`： 设置为争议者的地址。
- `requester`： 初始价格请求的发送者。
- `identifier`： 标识现存请求的价格标识符。
- `timestamp`： 标识现存请求的时间戳。
- `ancillaryData`： 请求价格的辅助数据。

### proposePriceFor {#proposepricefor}

代表其他地址提出价格值。注意：该地址将收到来自该提案的任何奖励。然而，任何保证金都将从调用者处提取。

参数：
- `proposer`： 设置为提案者的地址。
- `requester`： 初始价格请求的发送者。
- `identifier`： 标识现存请求的价格标识符。
- `timestamp`： 标识现存请求的时间戳。
- `ancillaryData`： 请求价格的辅助数据。
- `proposedPrice`： 提案价格。

## 集成 Optimistic Oracle {#integrating-the-optimistic-oracle}

本演示将设置托管用户 ERC-20 代币余额的 `OptimisticDepositBox` 合约。

在本地测试网区块链上，用户将 wETH（Wrapped Ether）存入合约并提取以美元计价的 wETH。例如，如果用户希望提取 $10,000 USD of wETH, and the ETH/USD exchange rate is $2,000，他们将提取到 5 个 wETH。

* 用户将 `OptimisticDepositBox` 与 DVM 上启用的一个价格标识符链接。

* 用户将 wETH 存入 `OptimisticDepositBox`，然后使用 `ETH/USD` 价格标识符进行注册。

* 用户现在可以通过智能合约调用从他们的 `DepositBox` 提取以美元计价的 wETH，而 Optimistic Oracle 可实现乐观的链上定价。

在本示例中，如果不参考链下的 `ETH/USD`喂价 (Price Feed)，用户将无法转移以美元计价的 wETH。因此， Optimistic Oracle 允许用户“拉取”参考价格。

与向 DVM 提出的价格请求不同，对 Optimistic Oracle 提出的价格请求可在无争议的情况下，在指定的存货窗口期内得到解决，因此可能比 DVM 投票周期短得多。存活窗口期可配置，但通常设为两个小时，而通过 DVM 解决则需要 2-3 天。

价格请求者目前不需要向 DVM 支付费用。请求者可以为响应价格请求的提案者提供奖励，但在本示例中奖励值设定为 `0`。

价格提案者发布保证金及其价格。如果价格无争议或者争议的解决对提案者有利，保证金将退还。否则，该保证金将用于向 DVM 支付最终手续费，并向获胜争议者支付奖励。

在演示中，请求者不要求价格提案者提供额外的保证金，因此发布的总保证金等于当前 wETH 的最终手续费 0.2 wETH。有关实施详情，请参阅 `proposePriceFor` 函数，该函数来自 `OptimisticOracle` [合约](https://docs-dot-uma-protocol.appspot.com/uma/contracts/OptimisticOracle.html)。

## 运行演示 {#running-the-demo}

1. 确保您已遵循[此处](https://docs.umaproject.org/developers/setup)的所有先决条件设置步骤。
2. 使用 `yarn ganache-cli --port 9545` 运行本地 Ganache 实例（并非 Kovan/Ropsten/Rinkeby/Mainnet）
3. 在其他窗口中，通过运行以下命令来迁移合约：

  ```bash
  yarn truffle migrate --reset --network test
  ```

1. 部署 `OptimisticDepositBox` [合约](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol) 并通过简单的用户流程从资源库的根目录运行以下演示脚本：

```bash
yarn truffle exec ./packages/core/scripts/demo/OptimisticDepositBox.js --network test
```

您应看到以下输出：

```
1. Deploying new OptimisticDepositBox
  - Using wETH as collateral token
  - Pricefeed identifier for ETH/USD is whitelisted
  - Collateral address for wETH is whitelisted
  - Deployed an OptimisticOracle
  - Deployed a new OptimisticDepositBox


2. Minting ERC20 to user and giving OptimisticDepositBox allowance to transfer collateral
  - Converted 10 ETH into wETH
  - User's wETH balance: 10
  - Increased OptimisticDepositBox allowance to spend wETH
  - Contract's wETH allowance: 10


3. Depositing ERC20 into the OptimisticDepositBox
  - Deposited 10 wETH into the OptimisticDepositBox
  - User's deposit balance: 10
  - Total deposit balance: 10
  - User's wETH balance: 0


4. Withdrawing ERC20 from OptimisticDepositBox
  - Submitted a withdrawal request for 10000 USD of wETH
  - Proposed a price of 2000000000000000000000 ETH/USD
  - Fast-forwarded the Optimistic Oracle and Optimistic Deposit Box to after the liveness window so we can settle.
  - New OO time is [fast-forwarded timestamp]
  - New ODB time is [fast-forwarded timestamp]
  - Executed withdrawal. This also settles and gets the resolved price within the withdrawal function.
  - User's deposit balance: 5
  - Total deposit balance: 5
  - User's wETH balance: 5
```

## 解释合约函数 {#explaining-the-contract-functions}

`OptimisticDepositBox`[合约代码](https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/financial-templates/demo/OptimisticDepositBox.sol)显示如何与 Oracle 进行互动。

`constructor` 函数包含 `_finderAddress` 参数，该参数来自 UMA `Finder` 合约，用于维持 `OptimisticOracle` 地址、批准的抵押品和价格标识符白名单，以及其他重要合约地址的注册。

它允许 `constructor` 确认抵押品类型和价格标识符是否有效，还允许 `OptimisticDepositBox`稍后查找`OptimisticOracle`并与之交互。

`requestWithdrawal` 函数包含对 `OptimisticOracle` 的内部调用，以请求 `ETH/USD` 价格。在返回后，用户可调用 `executeWithdrawal` 来完成提现。

在代码评论中，有更多的信息和解释，因此请看看您是否有兴趣了解更多的信息。

## 其他资源 {#additional-resources}

以下是与 UMA DVM 有关的一些其他资源：

- [技术架构](https://docs.umaproject.org/oracle/tech-architecture)
- [经济架构](https://docs.umaproject.org/oracle/econ-architecture)
- 关于 UMA DVM 设计的[博客文章](https://medium.com/uma-project/umas-data-verification-mechanism-3c5342759eb8)
- 关于 UMA DVM 设计的[白皮书](https://github.com/UMAprotocol/whitepaper/blob/master/UMA-DVM-oracle-whitepaper.pdf)
- 最优费用政策[研究资源库](https://github.com/UMAprotocol/research)
- 治理提案[UMIP 资源库](https://github.com/UMAprotocol/UMIPs)
