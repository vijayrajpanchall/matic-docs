---
id: move-stake
title: 转移质押代币
description: 在 Polygon 网络上移动您的股份
keywords:
  - docs
  - polygon
  - matic
  - stake
  - move stake
  - validator
  - delegator
slug: move-stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## 将质押代币从基金会节点转移至外部节点 {#moving-stake-from-foundation-nodes-to-external-nodes}

<video loop autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/staking/MoveStakeDemo.mp4"></source>
  <source type="video/quicktime" src="/img/staking/MoveStakeDemo.mov"></source>
  <p>您的浏览器不支持此视频元素。</p>
</video>

通过使用质押 UI 上的“转移质押代币”功能，授权者可以立即选择将其质押代币从基金会节点转移到选择的任意外部节点

将质押代币从基金会节点转移至外部节点即为单笔交易。因此，本次活动没有延迟，也没有人解除绑定期限。

请注意，只允许将质押代币从基金会节点转移到外部节点。如果您想将质押代币从一个外部节点转移到另一个外部节点，则您必须先解除绑定，然后在新的外部节点上进行授权。

此外，“转移质押代币”功能是 Polygon 团队开发的一项临时功能，用于确保资金从基金会节点顺利转移到外部节点。并且该功能仅在基金会节点关闭前有效。

## 如何转移质押代币 {#how-to-move-stake}

为了移动点，首先需要使用授权者地址登录到[“收购 UI](https://wallet.polygon.technology/staking)”。

**代表地址**：您已经用于搜索基金会节点的地址。

登录后，您将看到验证者列表。

<img src={useBaseUrl("img/staking/validator-list.png")} />

现在，通过单击左侧的**“显示代表详细信息**”按钮或**“我的代表代表详细信息**”选项来查阅您的“代表简介”。

<img src={useBaseUrl("img/staking/show-delegator-details.png")} />

您将在这里找到一个新的按钮，称为**“移动利害关系方”**。

<img src={useBaseUrl("img/staking/move-stake-button.png")} />

单击该按钮会导航到一个页面，其中包含您可以授权的验证者列表。您可以授权给此列表中的任意验证者。

<img src={useBaseUrl("img/staking/move-stake-validator.png")} />

现在，在选择您想要授权的验证者后，单击“**代表在**这里”按钮。单击该按钮将打开弹出窗口。

<img src={useBaseUrl("img/staking/stake-funds.png")} />

在此，您将看到一个“**金额”**字段，该字段将自动填入所有授权金额。您也可以只将部分金额授权给验证者。

例如，如果您已将 100 个 Matic 代币授权给基金会节点 1，并且现在您想将质押代币从基金会节点转移到外部节点，您可以将部分金额授权给您选择的外部节点，比如说 50 个 Matic 代币。其余 50 个 Matic 代币会留在基金会节点 1 上。然后，您可以选择将其余 50 个代币授权给另一个外部节点或相同的外部节点。

在输入金额后，您可以单击**“收购基金**”按钮。然后，这一步会要求您在 Metamask 上进行确认，从而签署地址。

签署完交易后，您的质押代币就会成功地从基金会节点转移到外部节点。然而，您必须等到 12 个区块确认后，质押 UI 上才会显示出您转移的资金。如果您转移的资金在 12 个区块确认后仍未显示，请尝试刷新一次页面以查看更新后的质押金额。

如有疑问或问题，请在[此处](https://support.polygon.technology/support/home)提交工单。
