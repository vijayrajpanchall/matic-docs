---
id: wallet-bridge-faq
title: 钱<>包桥 FAQ
description: 在 Polygon 上构建您的下一个区块链应用程序。
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## 我可以在哪里使用 Polygon  Web 钱包？ {#where-can-i-use-the-polygon-web-wallet}
以下是 Polygon 钱包套件 URL：https://wallet.polygon.technolygon.technolygon.technolygon/Polygon 钱包套件，是 Polygon 提供的 Web3 应用程序的集合。它由 [Polygon](https://wallet.polygon.technology/polygon/assets)[](https://safe-bridge.polygon.technology/safe) 钱包（分散式钱包）、 [Polygon](https://wallet.polygon.technology/polygon/bridge/deposit) 桥（L1-L2 桥）、 [Polygon](https://staking.polygon.technology/) 质押（用于存储和授权MATIC 代币的环境）和 Polygon 安全桥（多质桥）组成。

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## 目前支持哪些钱包？ {#which-wallets-are-currently-supported}

Metamask、Coinbase、Bitski Wallet、Venly和WalletConnect 都是目前支持的钱包。

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## 我可以用 Polygon 钱包做什么？ {#what-can-i-do-with-my-polygon-wallet}

- 向 Polygon 上的账户发送资金。
- 将资金从以太坊存入 Polygon（通过桥接）。
- 从 Polygon 将资金提取回以太坊（也通过桥接）。

## 我的 MetaMask 钱包没有与 Polygon 钱包连接 {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

发生这种情况的原因有很多。我们建议您**再试一次，****使用另一浏览器**，或者如果其中任何一部分没有帮助，请**[与我们的支持团队联系。](https://support.polygon.technology/support/home)**

## 我如何使用 Polygon 钱包套件将资金从以太坊存入到 Polygon 中。 {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
请观看下面的视频，或遵循[此教程。](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon)

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>您的浏览器不支持此视频元素。</p>
</video>

## 我如何能够使用 Polygon 钱包套件通过 PoS 桥提取资金到以太场所？ {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
请观看下面的视频，或遵循[此教程。](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge)

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>您的浏览器不支持此视频元素。</p>
</video>

## 我如何能够使用 Polygon 钱包套件通过 Plasma 桥提取资金到以太机？ {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
请观看下面的视频，或遵循[此教程。](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge)

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>您的浏览器不支持此视频元素。</p>
</video>

## 如何将新的或自定义代币添加到 Polygon 钱包交易代币列表中？ {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
请遵循[此教程。](/docs/faq/adding-a-custom-token)

## 如何找到代币合约？ {#how-do-i-find-the-token-contract}

当您试图添加新的或自定义代币时，需要代币合约地址。您可以在 Coingecko 或 CoinMarketCap 上搜索代币，您可以查看其地址在以太网链上（用于 ERC20 代币）上以及诸如 Polygon 等其他支持区块链上查看。其他链上的代币地址可能未更新，但使用根合约地址肯定足以满足所有需求。

## 我已经存入了资金，但我不在 Metamask 上看到它。我该怎么办？ {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

您需要手动将自定义代币地址添加到 Metamask 中。

打开 Metamask，向下滚动，点击**导入代币**。

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

然后，添加相关的合约地址、符号和小数点精确度。合同地址（在此情况下，在这个链接上）可找到：[https://docs.polygon.technology/docs/操作/mapped-tokens/。](https://docs.polygon.technology/docs/operate/mapped-tokens/)您需要添加代币子地址才能查看 Polygon 主网上的余额。精确的小数点为18，对于WETH（对于大多数代币，精确的小数点为18）。

## 我如何在 Metakask 上添加 Polygon 主网？ {#how-can-i-add-polygon-mainnet-on-metamask}

检查[此教程。](/docs/develop/metamask/config-polygon-on-metamask)

## 列表中看不到我的代币。我应该联系谁？ {#my-token-is-not-visible-in-the-list-who-should-i-contact}

在 Discord 或 Telegram 上联系 Polygon 团队，将您的代币添加到列表。在此之前，请确保代币已映射。如果未进行映射，请在 [https://mapper.polygon.technology/](https://mapper.polygon.technology/) 上提出请求。

## 检查点到达后，我能取消交易吗？ {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
在 Polygon 主机上启动提取交易后，不幸的是无法取消或恢复。在提取交易中，代币将从 Polygon Mainnet 上烧毁，并在以太阳网上铸造。因此，曾经从 Polygon 链上烧毁的托盘点器无法返回到您的钱包。

## 毒气费过高，我能否取消交易？ {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

遗憾的是，一旦从 Polygon 主机上烧毁，我们就无法取消提款交易。换言之，启动交易后，无法取消。气体收费不受 Polygon 控制。它完全取决于网络拥挤和以太网上特定区块的交易数量。如果您认为您无法支付当前的毒气费，您可以等待并尝试在下侧进行交易时进行交易。您还可以从此监测以太坊主网上的气体收费：https://etherscan.io/gastracker


## 我可以把我的代币从 Polygon 发送到其他钱包/交易所吗？ {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

您无法直接将代币从 Polygon UI 发送到交换/钱包。您必须先从 Polygon 提现到以太坊，然后将其发送到您的交易所地址（除非您的交易所/钱包明确支持该网络）。

## 我犯了将资金直接转账到交易所/钱包的错误。您能帮我吗？ {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

很抱歉，这种情况我们无法提供帮助。请不要直接向只支持以太坊的交易所发送资金，您必须先从 Polygon 提现到以太坊，然后再发送至您的交易所地址。

## 我把资金转到了错误的地址。我该如何取回资金？ {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

不幸的是，什么也做不了。只有该特定地址的私人密钥的所有者才能移动这些资产。确定您发送代币的地址是否正确，总是可取的。

## 我的交易待处理太长，我能做些什么？ {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
交易可能因以下原因而停止：

1. 在提交交易时设置低气体价格。
2. 由于以太坊主网上的拥挤，油价突然上涨。
3. 您将从您的钱包中取消交易，或者以新的交易取代交易。

您可以通过以下方式进行已放弃交易：

1. 如果您的交易被困住超过一个小时，将显示一个**“再次尝试”**按钮。您可以单击“**再次尝试**”按钮，以完成同一交易。您可以参见此视频，以了解如何使用“**尝试再次**”功能的更多信息。
2. 请检查您的 MetaMask 钱包，因为有时交易可能会由于在 Metamask 中排队的交易而被取消。在这种情况下，清理排队的交易，或在同一浏览器中重新安装 MetaMkask。
3. 您可以在备用浏览器中安装 MetaMask，然后尝试使用 Polygon 钱包套件完成交易。
4. 您还可以使用此链接完成待决提款交易。在搜索选项中粘贴交易散布，然后单击**“确认退出”**按钮以完成交易。

## 如果存款已确认，但余额没有更新，我该怎么办? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

完成存款交易需要22-30分钟。请等待一些时间，然后单击**“refresh 余额**”。

## 如果检查点没有出现，我该怎么办？ {#what-should-i-do-if-the-checkpoint-is-not-happening}

根据以太坊上的网络拥挤情况，检查点有时需要超过45分钟到1小时，我们建议等待一段时间才提出票据。

## 我的交易卡住了。 {#my-transaction-is-stuck}

我们列出用户可能面临的一些常见错误。您可以在错误图片下方找到解决方案。如果您看到的是不同的错误，请向我们的团队[提交支持工单](https://support.polygon.technology/support/home)，进行故障排除。

  - ### 常见错误 {#common-errors}
a. 提现卡在初始化阶段。

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

  b. RPC 错误

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/operate/network#matic-mainnet) for more information.

  c.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

  这通常是一个时有时无的错误，会自动解决。如果在重新启动步骤时仍然收到相同的错误报告，请提交一份包含所有相关信息[的支持工单，](https://support.polygon.technology/)以进一步解决此问题。


## 系统向我显示余额不足错误。 {#i-m-shown-an-insufficient-balance-error}

Polygon 网络上的提现和存款都很便宜。需要了解的是，余额不足的错误可以通过在以太坊主网上获得 ETH 余额来清除。这通常可以清晰地解决余额不足的问题。如果这是 Polygon 主机上的交易，我们将要求您拥有足够数量的 MATIC 代币。

## 浏览器上无法看到我的交易。我该怎么办？ {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

这可能是 Polygonscan 的索引问题。请与[支持小组](https://support.polygon.technology/support/home)联系，以了解更多澄清。

## 我在以太坊上发起了一笔存款，但它仍然显示为待处理。我该怎么办？ {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

您提供的燃料可能太少了。如果交易没有被确认，您应该等一会，并重新交易。如果需要其他帮助，请向[支持团队](https://support.polygon.technology/support/home)提供您的钱包地址、交易哈希（如果有）和相关屏幕截图。

## 我没有得到交易哈希，而且我的存款没能完成，发生了什么？ {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

您可能有之前的待处理交易，请先取消该交易或加快其处理。以太坊中的交易只能逐一进行。

## 这意味着 Polygon 不收取任何提现费用，但我们将在交易期间付款。 {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

与 Plasma 桥的提现交易分为 3 个步骤，一个在 Polygon 主网上进行，两个在以太坊主网上完成。在 PoS 桥上，提现交易分两步进行：在 Polygon 网络上烧毁代币；在以太坊网络上提交证明。任何情况下，在 Polygon 主网上烧毁代币的成本都是极小的。以太坊主网上发生的其余步骤必须以以太币支付，具体取决于当前燃料价格（可在[此处](https://ethgasstation.info/)确认）。

## 我试图存款，但交易进行到批准步骤就停止了。 {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

如果交易仍处于**批准**步骤，说明交易尚未完成。要完成交易，您需要支付燃料费，然后应该就可以进入下一步。

## Polygon 钱包显示“用户拒绝交易签名”错误消息。 {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

这通常是因为用户取消或拒绝通过 MetaMask 签署交易而发生的。在 MetaMask 钱包提示时，通过单击“**批准**”而非“**取消**”来进行签署交易。

## 交易成功，但显示待决。 {#the-transaction-is-successful-but-it-shows-pending}

如果完成交易，并收到资金，但交易仍在进行中显示，您可以通过发送相关细节和屏幕图片来筹集支持票。

## Polygon 上的支持交易清单是什么？ {#what-is-the-list-of-supported-exchanges-on-polygon}

MATIC 硬币可以在许多交易中交易。然而，在选择交易时，进行自己的研究总是很重要。有些交易所经常改变其现有可用的代币，并拥有维护期，这并不罕见。

您可以访问 [Coinmarkcap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) 查看您可能在那里找到 MATIC 的交换清单。

## Polygon 支持硬件钱包吗? {#does-polygon-support-hardware-wallets}

是的，我们支持以下硬件钱包：
1. 特雷佐尔
2. 莱德格

用户可以将其硬件钱包选项连接在 MetaMk 上，然后继续进行交易。以下是连接 Metamask 上的硬件钱包的链接：https://metamask.zendesk.com/hc/en-us/articles/4408552261275

## 为什么不支持 PoS 上的 MATIC 代币？ {#why-isn-t-the-matic-token-supported-on-pos}

MATIC 是 Polygon 的原生代币，它在 Polygon 链上有一个合约地址 - 0x0000000000000000000000000000000000001010。它还用于支付 gass。在 PoS 桥上映射 MATIC 代币将导致 MATIC 在 Polygon 链上拥有一个额外的合约地址。这将与现有的合约地址发生冲突，因为这个新的代币地址不能用来支付燃料费，且必须作为普通的 ERC20 代币留在 Polygon 链上。因此，为了避免这种混乱，我们决定只在 Plasma 上保留 MATIC。

## 我该如何映射代币？ {#how-do-i-map-tokens}

请参见[此教程]（/docs/dreading/ethereum-polygon/sublic-mapping-ressublick-ressplate-ressplate-ressplate-ressplate-ressplate-ressplate-ressplate-ressplate-ressplate-ressplate-ressplate-ressplate-ressping-ress），或直接转到 [Token 映射器。](https://mapper.polygon.technology/)

## 如果交易时间过长或燃料价格过高，我该怎么办？ {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

交易时间和天然气价格因网络拥挤而异，并由网络采矿者之间的供求确定。

您可以做什么：
- 耐心点
- 如果 太慢，则增加 gas 收费。
- 在发送交易之前检查收费。以下是 Etherscan gas 追踪器的链接：https://etherscan.io/gastracker

您不应该做的：
- 请不要设置 gas 限制低，或者您的交易可能失败。
- 不要尝试取消交易。预先检查收费。


## 我是否可以更改燃料限制值或燃料价格？ {#can-i-change-the-gas-limit-or-the-gas-price}

气体限制由应用程序根据合同中要求的函数的某些要求进行估算和确定。不应对此进行更改。只有 grass 价格可以更改，以增加或减少交易费用。

## 如何加快交易？ {#how-to-speed-up-the-transactions}
您可以通过提高天然气收费来做到。以下有链接解释如何在 Metamask 上进行操作：https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-or-Cancel-a-Pending-交易。

## MATIC 代币足以支付 gas 费用？ {#how-much-matic-token-is-enough-for-the-gas-fee}
用户需要在 Polygon 主网上拥有至少 0.01 MATIC。

## 我应该在哪里提交支持工单？ {#where-do-i-raise-a-support-ticket}
如果您需要我们的专家帮助，请在 https://suppert.polygon.technology/supert/home 上发送消息。

## 如何跨链桥接资产？ {#how-do-i-bridge-assets-across-chains}

Polygon 提供一座桥梁，将资产从以太坊转到 Polygon 上，反之亦然。您可以在此维基的 [Bridges]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) 部分上了解更多信息。

然而，如果您使用任何非 Polygon 拥有的外部服务，我们建议您联系到他们的客户服务，以要求提供指导和指示。在使用web3 服务时，进行自己的研究也很重要。

## 我在使用 OpenSea 或其他使用 Polygon 桥接应用程序时遇到代币提取问题。 {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

如果您存在问题，要处理提取交易，Polygon 会提供提取桥梁，使用 [https://退出.polygon.技术](https://withdraw.polygon.technology)来帮助您在拥有燃烧的哈希时离开地面。此工具有助于您快速上手，让问题得到解决。涉及您与 OpenSea 和其他dApps 交易的其他问题将由应用小组处理。

## 我被骗了。如何取回我的代币？ {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

不幸的是，我们无法找回损失的代币。我们要求在进行交易之前，您在开始和完成交易之前继续检查和重复检查。请注意， Polygon 网络和我们的官方处理点没有进行任何放弃的帖子或代币加倍的操作，我们将不会代表组织联系您。请无视所有的这类尝试，因为它们很可能是诈骗。我们所有的通信都通过我们的官方处理来进行。

## 我的钱包里有一些未经授权的交易。我的钱包被黑了吗？ {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

不幸的是，网络无法撤销不想要的交易。
小心使用您的私钥，**永远不要与任何人分享，**这一点始终很重要。
如果您仍有一些剩余资金，请立即将它们转移到新钱包中。

## 以特莱尔姆将 Goerli 作为其测试网络。
 Polygon 网络也有一个测试网络吗？ {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

由于以太坊网络将 Goerli 作为测试网络，Polygon Mainnet 拥有孟买。此测试网络上的所有交易都将在 Mumbai 浏览器上编制索引。

## 我如何能将我的代币转换到其他代币？ {#how-can-i-swap-my-tokens-for-other-tokens}
请观看下面的视频，或遵循[此教程。](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap)

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>您的浏览器不支持此视频元素。</p>
</video>

## 时机交换过于缓慢。 {#the-token-swap-is-too-slow}

如果您正尝试交换代币，但花的时间太长，则您可以换一个浏览器尝试交易。如果这还不起作用，并且遇到错误，请将屏幕截图发送给我们的支持团队。

## 哪些代币作为代币交换的毒气费收取？ {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
仅仅是MATIC。

## 我怎么能换取代币来换取 gas? {#how-can-i-swap-my-token-for-gas}
请观看下面的视频，或遵循[此教程。](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas)

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>您的浏览器不支持此视频元素。</p>
</video>

## 哪些代币可以用于交换气体？ {#which-tokens-can-be-used-to-swap-for-gas}
只有这些交易支持“交换 用于加斯”：ETH、USDC、USDC、USDT、DAI、AAVE、LINK、WBTC、UNI、GHST、TEL、EMON和COMBO。

## 如何获取 ETH 代币？ {#how-to-get-eth-tokens}
为了获取 ETH 代币，您可以将它们交换在交易所上，换取另一笔代币或代币，在交易所上购买，或者在交易场上购买它们，或者使用 [Polygon 代币换换功能](https://wallet.polygon.technology/polygon/token-swap)换取其他代币。

## 如何获得 MATIC 代币来支付燃料费？ {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

我们提供[燃料互换](https://wallet.polygon.technology/gas-swap/)服务来帮助您。您选择完成交易所需的 MATIC 金额，即可将其换成其他代币，例如以太币或 USDT。值得注意的是，这是一笔**无需燃料的交易**。

## 我在哪里可以直接获得 MATIC 代币？ {#where-can-i-get-matic-tokens-directly}

因此，可以从任何集中（[Binance](https://www.binance.com/en)、[Coinbase](https://www.coinbase.com/)、等）或权力下放（[Uniswap](https://uniswap.org/)、[QuickSwap](https://quickswap.exchange/#/swap)）交换中购买MATIC 代币。您还可以研究和尝试一些上行道上，如 [Transak](https://transak.com/) 和 [Ramp](https://ramp.network/) 上行道。您购买 MATIC 币的目的也应该决定您从哪里购买以及哪个网络。如果您的意图是保持静态或授权，则最好在以太机主网上设置 MATIC。如果您的意图是在 Polygon 主因网上进行交易，您应该在 Polygon 主因网上与 MATIC 保持并进行交易。





