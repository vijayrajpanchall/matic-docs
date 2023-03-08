---
id: delegation
title: 通过验证者共享授权
sidebar_label: Delegation
description: 通过验证者共享授权
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon 支持通过验证者共享进行授权。通过采用这种设计，无需过多计算便可以在以太坊主网合约上轻松分配奖励和削减规模（数以千计的授权者）。

授权者向验证者购买一个有限资金池中的股份，以实现授权。每名验证者都将拥有自己的验证者份额代币。对于验证者 `A`，我们把这些可替换的代币称为 `VATIC`。用户授权给验证者 `A` 后，根据 `MATIC/VATIC` 的汇率，他们将获得 `VATIC`。随着用户积累价值，汇率表明，每 `VATIC`，可以提取更多 `MATIC`，当用户大幅削减时，每 `VATIC`，可以提取的 `MATIC` 就会减少。

请注意，`MATIC` 是一种质押代币。授权者需要有 `MATIC` 代币才能参与授权。

最初，当 `1 MATIC per 1 VATIC` 时，一个授权者 `D` 向验证者 `A` 的特定资金池中购买代币。

当验证者获得更多的 `MATIC` 代币奖励时，新的代币会添加到池中。让我们以当前的代币池来说`100 MATIC`，`10 MATIC`奖励将增加到池中。但由于 `VATIC` 代币的总供应量并没有因为奖励而改变，所以汇率变成 `1 MATIC per 0.9 VATIC`。现在，授权者`D`获得更多`MATIC`相同股份。

`VATIC`：验证者特定的铸币验证者份额代币（ERC20 代币）

## 技术规格 {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

汇率的计算方法如下：

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## 方法和变量 {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- 转账 `_amount` 给 stakeManager ，并更新有效权益的时间线数据结构。
- `updateValidatorState` 用于更新时间线数据结构。
- 对于 `_amount`，使用当前 `exchangeRate`，`Mint` 授权份额。
- `amountStaked` 用于跟踪每个授权者的有效权益，以计算流动性奖励。

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- 使用当前`exchangeRate`和份数来计算总量（有效利害关系+回报）。
- `unBond`验证者发放的积极利害关系，并将奖励转交给授权者（如果有的话）。
- 必须使用 stakeManager 中的 `updateValidatorState`，从时间线上删除有效权益。
- `delegators` 映射用于跟踪提现期的权益。

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- 对于授权者，计算奖励和转账，并根据`exchangeRate`燃烧股票计算。
- 例如：如果授权者拥有100份股票，汇率为200，因此奖励为100个代币，则将100个代币转交给授权者。剩余的股权为100，因此使用汇率200，现在价值50股。因此，烧毁 50 股票。代表现在拥有价值100个代币的50份股票（最初存档/授权）。

### 重新质押 {#restake}

重新收购可以通过两种方式运作：授权者可以使用`buyVoucher`或回收回收购买更多的股份。

```js
function reStake() public;
```

上述函数用于回收收奖励。份额数量不受影响，因为 `exchangeRate` 不变；所以奖励只是转移到验证者份额合约和 stakeManager 时间线的有效权益中。

`getLiquidRewards`用于计算累积奖励，即授权者拥有100份股票，汇率为200，因此奖励为100个代币。将 100 代币移动到有效利害攸关，因为汇率仍然保持相同的份额也保持不变。只有区别在于，现在有200个代币被考虑在有效利害关系中，无法立即提取（不是液体奖励的一部分）。

重新提取的目的是，由于授权者验证者现在拥有更积极的利害关系，他们将为此获得更多的奖励。

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

提取期结束后，出售股票的授权者可以要求其 MATIC 代币。必须将代币转移给用户。

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- 更新验证者的佣金比例。

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

当验证者因提交检查点获得奖励时，该函数要求在验证者与授权者之间支付奖励。
