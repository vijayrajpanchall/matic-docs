---
id: delegator-faq
title: 授权者常见问题
sidebar_label: Delegator FAQ
description: 与 Polygon 网络上授权有关的问答
keywords:
  - docs
  - polygon
  - how to delegate
  - validator
  - stake
  - faq
  - delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### 质押仪表板的网址是什么？ {#what-is-the-staking-dashboard-url}

固定数据板 URL 是 https://staking.polygon.technology/ 。

### 最低质押金额是多少？ {#what-is-the-minimum-stake-amount}

授权时不限制最低质押金额。然而，您可以总是以 1 个 MATIC 代币开始。

### 如果我进行了授权，我会获得多少奖励？ {#how-many-rewards-will-i-get-if-i-delegate}

请使用[“质押奖励计算器](https://staking.polygon.technology/rewards-calculator)”来确定您的估计。

### 为什么我的交易需要这么长时间？ {#why-does-my-transaction-take-so-long}

出于安全原因，Polygon 的所有质押交易均发生在以太坊上。

完成一笔交易所需的时间取决于您所允许的 gas 费，以及以太坊主网在该时间点的网络拥塞情况。您可以始终使用“快速提升”选项来增加天然气费，以便您的交易能够很快完成。

### 目前支持哪些钱包？ {#which-wallets-are-currently-supported}

目前，仅支持桌面浏览器和 Coinbase 钱包上的 Metamask 扩展。此外，您可以使用支持的移动钱包的 WalletConnect 和 Wallet链接来与桌面/笔记本计算机上的 Ssake UI 数据板进行互动。我们将在不久后逐步增加对其他钱包的支持。

### 是否支持硬件钱包？ {#are-hardware-wallets-supported}

是的，我们支持硬件钱包。您可以使用 Metamask 上的“连接硬件钱包”选项连接您的硬件钱包，然后继续授权流程。

### 为什么我无法直接在币安进行质押？ {#why-can-t-i-stake-directly-from-binance}

目前还不支持通过币安进行质押。如果 Binance 开始支持质押或当其支持时，将会发布公告。

### 我已经完成了授权，我在哪里可以查看详细信息？ {#i-have-completed-my-delegation-where-can-i-check-details}

完成授权后，在以太坊上等待 12 个区块确认（约为 3-5 分钟），然后在 Dashabl上，您可以单击 **My 账户。**

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### 我在哪里可以查看我的奖励？ {#where-can-i-check-my-rewards}

在“数据板”上，您可以单击左侧的“**我的账户**”选项。

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### 我需要用以太币来支付 Gas 费吗？ {#do-i-need-eth-to-pay-for-gas-fees}

是的。为了安全起见，您应该准备大约 0.05-0.1 以太币。

### 我是否需要将 Matic 代币存入 Polygon 主网网络进行质押？ {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

不可以。您的全部资金均需在以太坊主网上。

### 当我尝试进行交易时，我的“确认”按钮被禁用，为什么会这样？ {#when-i-try-to-do-the-transaction-my-confirm-button-is-disabled-why-so}

请检查您是否有足够的以太币来支付 Gas 费。

### 奖励什么时候发放？ {#when-does-reward-get-distributed}

每当提交检查点时，都会发放奖励。

目前，20188年MATIC 代币在每次成功检查点提交上按比例分配，其依据是其在所有验证者和授权者总存储库中持有的权益。此外，分配给每位授权人奖励的百分比会因检查点而异，具体取决于授权人和验证者的相对质押量和质押总量。

（请注意，提交检查点的验证者会获得 10% 的提案者奖金，但随着时间的推移，不同验证者在提交多个检查点时获得额外奖金的效果会无效化。）

每位验证者大约需要 34 分钟才能完成一次检查点的提交。该时间是近似值，或因验证者对 Polygon Heimdall 层的共识而有所不同。所需时间或因以太坊网络而异。若网络拥塞情况较严重，可能会导致检查点延迟。

您可以[在](https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287)此追踪在质押合约上检查点

### 每次提交检查点时，为什么奖励都在不断减少？ {#why-does-reward-keep-getting-decreased-every-checkpoint}

实际获得的奖励将取决于网络中每个检查点实际锁定的供应总量。随着质押合约中更多 MATIC 代币的锁定，预计所获得的奖励也会发生显著变化。

一开始，奖励会随着锁定供应百分比的上升而增加，不过之后会随之而减少。在每个检查点均能获得锁定供应变化的百分比，并据此来计算奖励。

### 如何申领我的奖励？ {#how-can-i-claim-my-rewards}

您可以通过单击**“退出回收”**按钮即时索取奖励。该操作会将您所累积的奖励转移到您在 Metamask 上的授权账户。

<div>
  <img src={useBaseUrl("/img/delegator-faq/withdraw-reward.png")} />
</div>

### 什么是解绑期？ {#what-is-the-unbonding-period}

现在 Polygon 的解绑期约为 9 天。以前是 19 天。该期限适用于原来的授权金额和重新授权金额 - 它不适用于未重新授权的任何奖励。

### 解绑后还能继续领取奖励吗？ {#will-i-keep-receiving-rewards-after-i-unbond}

不，一旦解除保税，您将停止收到奖励。

### 进行授权需要多少笔交易？ {#how-many-transactions-does-the-delegation-require}

授权需要两个交易，一个接一个。一个批准请求，另**一**个批准**存款。**

<div>
  <img src={useBaseUrl("/img/delegator-faq/delegate.png")} />
</div>

### 重新授权奖励意味着什么？ {#what-does-redelegate-rewards-mean}

重新调整奖励只是意味着您想要通过重新调整您积累的奖励来增加股份。

### 我可以质押给任意验证者吗？ {#can-i-stake-to-any-validator}

是的。目前所有验证者均是 Polygon 基金会的节点。

我们正在对 Polygon 主网进行分阶段推广。不久之后，外部验证者将会逐渐加入。欲了解更多详情，请参阅 https://blog.matic.network/mainnet-is-going-live-announcing-the-launch-sequence/。

### 哪些浏览器与质押仪表板兼容？ {#which-browser-is-compatible-with-staking-dashboard}

谷歌、火狐和 Brave 浏览器

### 我的 Metamask 在登录后卡在确认界面，我该怎么办？或者当我尝试登录时没有任何反应？ {#my-metamask-is-stuck-at-confirming-after-login-what-do-i-do-or-nothing-happens-when-i-try-to-login}

检查以下事项：

- 如果您使用 Brave，请关闭设置面板中使用**密钥交易钱包**的选项。
- 检查您是否已登录 Metamask
- 检查您是否使用了 Trezor/Ledger 来登录 Metamask。如果尚未启用，还需要另外打开在 Ledger 设备上调用合约的权限。
- 检查您的系统时间戳。如果系统时间不正确，则需要更正。

### 如何从 Binance 或其他交易所向 Polygon 钱包发送资金？ {#how-do-i-send-funds-from-binance-or-other-exchanges-to-polygon-wallet}

从技术上讲，Polygon 钱包的套件/质押界面只是一个网络应用程序。目前，它支持以下钱包： Metamask、WalletConnect 和 WalletLink。

首先，您必须从 Binance 或任何其他交换中提取资金，转至 Metamask 上的以太阳馆地址。如果您不知道如何使用 Metamask，请用谷歌搜索一下。这里有很多视频和博文可以帮助您熟悉 Metamask 的入门操作。

### 我什么时候可以成为验证者，我有多少代币要做？ {#when-can-i-become-a-validator-and-how-many-tokens-do-i-for-that}

只有满足以下条件，用户才能获得验证者位置：
1. 当验证者决定从网络中撤消利害关系时，或
2. 等待拍卖机制以及替换掉不活跃的验证者时。

最低质押金额取决于一位用户出价高于另一位用户的拍卖过程。

### 如果我在授权时获得了奖励，并且向相同的验证者节点添加了额外的资金，会发生什么? {#if-i-have-earned-rewards-while-delegating-and-if-i-add-additional-funds-to-the-same-validator-node-what-happens}

如果在将额外的资金授权给相同的验证者节点之前，您没有对奖励重新授权，那么系统会自动收回您的奖励。

如果您不希望发生这种情况，请在对额外资金授权之前重新授权您的奖励。

### 我已经通过质押仪表板页面的 Metamask 对我的代币进行了授权。我需要保持我的系统或设备处于开启状态吗？ {#i-have-delegated-my-tokens-via-metamask-on-the-staking-dashboard-do-i-need-to-keep-my-system-or-device-on}

号：一旦确认您的授权交易，您可以看到您的代币反映在**“共享”**和“**新奖励**”部分中，然后完成。无需让您的系统或设备保持开启状态。

### 我已经未保存，要到 Unbund 需要多长时间？ {#i-have-unbonded-how-long-will-it-take-to-unbond}

解绑期目前设置为 82 个检查点。大约需要 9 天。 每个检查点大约需要 34 分钟。然而，由于以太坊的拥塞，一些检查点可能会延迟到 1 小时左右。

### 我已经未键入，现在我看到“索赔选择”按钮，但它已禁用，为什么会这样做？ {#i-have-unbonded-and-i-now-see-the-claim-stake-button-but-it-is-disabled-why-is-that}

只有在您的解绑期结束时，才可启用“申领质押代币”按钮。解绑期目前设置为 82 个检查点。

### 我是否知道何时能启用“申领质押代币”按钮？ {#do-i-know-when-will-the-claim-stake-button-be-enabled}

是的，在“申领质押代币”按钮下，您会看到一条注释，说明了在启用“申领质押代币”按钮前有多少待处理的检查点。每个检查点大约需要 30 分钟。然而，由于以太坊的拥塞，一些检查点可能会延迟到 1 小时左右。

<div>
  <img src={useBaseUrl("/img/delegator-faq/unbond.png")} />
</div>

### 如何将我的授权从基金会节点切换到外部节点？ {#how-do-i-switch-my-delegation-from-foundation-nodes-to-external-nodes}

您可以使用质押 UI 上的**转移质押代币**的选项来切换您的授权。这一步会将您的授权从基金会节点切换到您选择的任意其他外部节点。

<div align="center">
  <img src={useBaseUrl("/img/delegator-faq/move-stake.png")} width="500" />
</div>

您将看到其他验证者列表：

<div>
  <img src={useBaseUrl("/img/delegator-faq/validators.png")} />
</div>

### 当我将授权从基金会节点切换到外部节点时，是否有解绑期？ {#will-there-be-any-ubonding-period-when-i-switch-delegation-from-foundation-nodes-to-external-nodes}

当您将授权从基金会节点切换到外部节点时，不会有解绑期。这将是一次没有延迟的直接切换。但是，如果要从基金会节点或外部节点解除绑定，则会有解绑期。

### 切换授权期间选择外部节点时是否有任何特定要求？ {#are-they-any-specifics-to-choose-an-external-node-during-switch-delegation}

没有。您可以选择任意节点。

### 如果我将授权从基金会节点切换到外部节点，那么累积的奖励会发生什么变化？ {#what-happens-to-my-rewards-that-are-accumalated-if-i-switch-delegation-from-foundation-to-external-node}

如果您在切换授权前尚未申领奖励，则当授权从基金会节点成功切换到外部节点后，之前累积的奖励会转回您的帐户。

### 在外部节点进行授权是否会像在基金会节点上一样正常运作？ {#will-delegation-on-the-external-nodes-work-the-same-as-foundation-nodes}

是的，它将与基金会节点相同。

### 授权给外部节点后，我还能获得奖励吗？ {#will-i-still-get-rewards-after-delegating-to-an-external-node}

是的，奖励还是会和之前在基金会节点时一样正常发放。每次成功提交检查点都将获得奖励。按照目前实施的规定，奖励将按照每个检查点相对于质押代币的比率进行分配和计算。

### 如果我从外部节点解绑，是否会有解绑期？ {#will-there-be-any-unbonding-period-if-i-unbond-from-an-external-node}

是的，解绑期与目前实施的规定相同。82 个检查点。

### 在我将授权从基金会节点切换到外部节点后，是否有锁定期？ {#will-there-be-any-locking-period-after-i-switch-my-delegation-from-foundation-to-external-node}

没有。切换授权后不会有锁定期。

### 我可以将我的授权从基金会节点部分切换到外部节点吗？ {#can-i-partially-switch-my-delegation-from-foundation-to-external-nodes}

是的，您可以选择将您的质押代币从基金会节点部分转移到外部节点。剩余部分的质押代币会保留在基金会节点上。然后，您可以将其转移至您选择的另一个节点或相同节点。

### 我可以将授权从一个外部节点切换至另一个外部节点吗？ {#can-i-switch-delegation-from-an-external-node-to-another-external-node}

不可以，**转移质押代币**的选项仅在基金会节点上可用。如果您想将授权从一个外部节点切换到另一个外部节点，则您必须先解除绑定，然后再授权给另一个外部节点。

### 基金会节点何时关闭？ {#when-will-the-foundations-node-be-turned-off}

基金会节点将于2021年1月底关闭。

### 以后会有基金会节点吗？ {#will-there-be-any-foundation-nodes-in-the-future}

没有，以后不会有基金会节点。

### 转移质押代币时，我需要为多少笔交易支付 Gas 费？ {#how-many-transactions-do-i-need-to-pay-for-gas-when-i-do-a-move-stake}

转移质押代币仅需为一笔交易支付 Gas 费。所有的交易都将在以太坊区块链上进行，所以在进行转移质押代币的交易时，您需要花费一些以太币。
