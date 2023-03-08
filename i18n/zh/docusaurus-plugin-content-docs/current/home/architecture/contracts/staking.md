---
id: staking
title: 选择 Polygon 上
description: 选择 Polygon 上
keywords:
  - docs
  - polygon
  - matic
  - staking
  - unstake
  - restake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# 选择 Polygon 上 {#staking-on-polygon}

对于 Polygon 网络，任何参与者都可以通过运行完整节点来获得资格成为网络验证者。为验证者运行完整节点的主要激励措施是获得奖励和交易费。参与Polygon共识的验证者收到的区块奖励和交易费用会激励他们不断参与。

由于验证者对网络的空间有限，被选为验证者进行选择的过程将参加在链上进行的拍卖，该拍卖在[在](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#a55fbd158b7d4aa89648a4e3b68ac716)这里定义的定期间隔进行。

## 权益 {#stake}

如果空位开放，则拍卖面向感兴趣的验证者启动：

- 他们会给出比空位中最后一次出价更高的价格。
- 拍卖过程概述：
    - 拍卖可以在空位开放后自动启动。
    - 要开始参与拍卖，需联系 `startAuction()`
    - 在堆栈管理中锁定您的资产。
    - 如果另一个潜在验证者所承担的利害关系超过您的利害关系，那么锁定的代币将退回您。
    - 再次，要赢得拍卖，再进行更多股权。
- 在拍卖期结束时，最高出价者赢得并成为 Polygon 网络上的验证者。

:::note

如果您参与拍卖，请保持完整节点运行。

:::

在最高投标者赢得交易时，成为验证者的程序概述如下：

- 联系 `confirmAuction()`确认参与。
- Heimdall 上的桥梁会听到此次事件，并转播到 Heimdall 上。
- 在达成共识后，验证者将添加到 Heimdall 上，但未激活。
- 验证者只在（[在](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#c1c3456813dd4b5caade4ed550f81187)此定义）之后开始验证`startEpoch`。
- 一旦到达`startEpoch`，验证者将加入到共识机制中，`validator-set`并开始参与。

:::info 推荐

为了确保验证者权益的安全性，我们建议验证者提供不同的`signer`地址，处理验证`checkPoint`签名。 这就是要保持在签名密钥与验证者钱包密钥分开，以便在发生节点黑客时保护资金。

:::

### 取消质押 {#unstake}

解除存储允许验证者退出有效验证者库。为了确保**良好参与，**他们的股份在未来21天内锁定。

当验证者希望退出网络并停止验证区块并提交检查点时，他们可以进行检查`unstake`。此行动在现在时刻是。此次操作后，验证者将从有效验证者集合中考虑出来。

### 重新质押 {#restake}

验证者还可以将更多的股份添加到其金额中，以便获得更多的奖励，并具有对验证者点的竞争力，并保持自己的位置。
