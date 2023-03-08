---
id: ethereum-polygon
title: 以太坊↔Polygon
description: 在 Polygon 上建立您的下一个区块链应用程序。
keywords:
  - docs
  - matic
  - polygon
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# 以太坊↔Polygon {#ethereum-polygon}

Plasma 安全解决方案，将您的资产从以太坊转移到 Polygon，反之亦然。
* 使用 [matic.js](https://github.com/maticnetwork/matic.js) 与 Polygon Plasma 合约互动。

## 流程 {#flow}
以下是在 Polygon 上部署合同的流程，以及对 Ethereum↔Polygon 的支持。

1. 用户将 ERC-20 代币部署到以太坊-XToken

2. 现在与 [Polygon](https://t.me/joinchat/HkoSvlDKW0qKs_kK4Ow0hQ) 分享您的合约地址。请求示例如下...

> 大家好，我们是部署在 Polygon 的 AwesomeDApp。寻找一种解决方案，将我的资产从以太坊转移到 Polygon，反之亦然。<br/><br/>在我的 AwesomeDApp 上有一个简短的说明...<br/><br/>Ropsten 上的 Token_Address-> "0x.."<br/>Token_Name-> "XToken"<br/>Token_Symbol-> "X"<br/>Token_Decimals-> "18"<br/><br/>请求您将这些代币映射到 Polygon Testnet 版本。<br/>

我们将在 Polygon 上为您部署一个子合约，该合约可以根据要求灵活调整，并映射到您的代币 Ethereum ↔ Polygon.（在 Polygon 上部署需要它的原生代币 Polygon，它可以从以太坊存入 Polygon，也可以在二级市场购买。）

3. 用户可以对 Xtokens 进行铸币并在以太坊上进行转账。例如，假设 100XToken 是铸币，然后转账到其他账户。

4. 要在 Polygon 链上使用这些代币，请调用存款功能，该功能将要求进行两次交易，首先是批准，然后是存款 ERC20。

5. 现在 100XToken 在 Polygon 链上有相同的地址。

6. 您可以把 50 个 XToken 从 YourAddress 转账到 NewAddress。同样，对于 Polygon 交易，与以太坊类似，Polygon 使用它自己的原生代币。

7. 如果用户想在以太坊链上取回这些 Xtoken，那么就调用 StartWithdraw，将从 childTokenContract 中提取并在 Polygon 链上销毁这些代币。为了避免任何不良参与，将进行一系列的验证。一旦完成，这些代币将在以太坊链上提供。

8. 调用 processExits() 来接收这些代币返回到您的 EOA 或账户地址。

9. 您应该可以在以太坊主网上看到您账户地址的 50 个 XToken。
