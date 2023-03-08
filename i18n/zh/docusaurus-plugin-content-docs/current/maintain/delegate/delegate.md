---
id: delegate
title: 如何授权
description: 了解如何成为 Polygon 网络的授权者。
keywords:
  - docs
  - matic
  - polygon
  - how to delegate
  - validator
  - stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: delegate
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# 如何授权 {#how-to-delegate}

这个分步骤指南可帮助您成为 Polygon 网络的[授权者](/docs/maintain/glossary.md#delegator)。

唯一的先决条件是您在以太坊主网地址上拥有 MATIC 代币和以太币。

## 访问仪表板 {#access-the-dashboard}

1. 在您的钱包中（例如 MetaMask），选择以太坊主网。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. 登录到 [Polygon 搜索。](https://staking.polygon.technology/)
3. 登录后，您将查看一些总体统计数据，同时也查看验证者列表。

![图像](/img/staking/home.png)

:::note

如果您是验证者，请使用不同的未经验证地址以授权者身份登录。

:::

## 授权给验证者 {#delegate-to-a-validator}

1. 点击**“成为授权者”**或向下滚动到一个特定验证者，然后点击**“授权”**。

![图像](/img/staking/home.png)

2. 提供要授权的 MATIC 金额。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. 批准授权交易，然后点击**“授权”**。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

授权交易完成后，您会看到**“授权已完成”**的消息。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## 查看您的授权 {#view-your-delegations}

若要查看授权，请点击[“我的帐户”](https://staking.polygon.technology/account)。

![图像](/img/staking/myAccount.png)

## 提取奖励 {#withdraw-rewards}

1. 点击[“我的帐户”](https://staking.polygon.technology/account)。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. 在授权验证者页面的下方点击**“提取奖励”**。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

这一步会将 MATIC 代币的奖励提取到您的以太坊地址。

## 重新质押奖励 {#restake-rewards}

1. 点击[“我的帐户”](https://staking.polygon.technology/account)。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. 在授权验证者页面的下方点击**“重新质押奖励”**。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

这将重新安排 MATIC 代币奖励给验证者，并增加您的授权点。

## 解除与验证者的绑定 {#unbond-from-a-validator}

1. 点击[“我的帐户”](https://staking.polygon.technology/account)。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. 在授权验证者页面的下方点击**“解除绑定”**。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

这将从验证者中提取奖励，从验证者中提取您的全部股份。

您提取的奖励将立即在您的以太坊账户上显示。

会有 80 个 [检查点](/docs/maintain/glossary.md#checkpoint-transaction)去锁定您所提取的质押资金。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

解绑期间进行资金锁定是为了确保网络上没有恶意行为。

:::

## 将质押代币从一个节点转移至另一个节点 {#move-stake-from-one-node-to-another-node}

将质押代币从一个节点转移至另一个节点即为单笔交易。本次活动期间没有延迟或解除绑定期。

1. 在质押仪表板上登录[我的帐户](https://wallet.polygon.technology/staking/my-account)。
1. 在授权验证者页面的下方点击**“转移质押代币”**。
1. 选择一个外部验证者，然后单击**此处的“质押”**选项。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. 提供质押金额，然后单击**“转移质押代币”**。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

这一步将会转移质押代币。仪表板将在 12 个区块确认后更新。

:::info

在任何节点之间允许移动利害关系。唯一的例外是将利害关系从一个基金会节点移动到另一个不允许的基金会节点。

:::
