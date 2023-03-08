---
id: stakingmanager
title: 质押管理者
description: 质押管理器是处理 Polygon 网络上验证者相关活动的主要合约。
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

对于 Polygon 基于安全的证明，所有交易验证和处理堆积的验证都会在以太坊智能合约上执行奖励。整个设计遵循这种在主网合约上减少操作的理念。它进行信息验证，并将所有重计算操作推向 L2（阅读有关 [Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview) 时）。

**质押者**分为**验证者、****授权****者和观察者**（用于欺诈报告）。

[**利益相关管理**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol)者是处理验证者相关活动的主要合约，如`checkPoint`签名验证、奖励分配和股份管理。由于合约使用 **NFT 身份证**作为所有权来源，因此更改所有权和签名者不会影响系统中的任何内容。

:::tip

从一个以太机地址来看，**Staker只能是验证者或授权者**（这只是设计选择，没有硬性理由）。

:::

## 验证者接受/更换 {#validator-admissions-replacement}

### 接受 {#admissions}
目前，在 Polygon  PoS 上没有开放验证者位置。还有一个等待列表要成为验证者。在将来，如果有位点，验证者可以申请考虑并从等待列表中删除。


### 替换 {#replacement}
PIP4 引入了为社区可见性而展示验证者性能的概念。如果验证者在 PIP4 中概述的长时间内处于不健康状态，则将从网络上不受封闭。验证者堆栈然后提供给从 Weath 列表中退出的人。

:::info

目前，正在实施 [<ins>PIP4 中Part C 第二阶段</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24)。这就是社区决定验证者前景评估标准的地方。在时间上，该练习将产生应用程序和接纳处理。

:::

## 方法和变量 {#methods-and-variables}

:::caution 削弱实施

`jail``unJail`目前，未将`slash`函数用作削减实施的一部分。

:::

### 验证者Threshold {#validatorthreshold}

它存储系统接受的最大验证者数量，也称为“抽点”。

### AccountStateRoot {#accountstateroot}

- 对于在 Heimdall 上为验证者和授权者进行的各种会计，在提交时会提交账户根`checkpoint`。
- 使用 accRoot 时使用`claimRewards`。`unStakeClaim`

### 股份/ 质疑点 {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- 允许任何金额（在 MATIC 代币中）大于（`currentValidatorSetSize`如果当时少于）`minDeposit`的人。`validatorThreshold`
- 必须转账`amount+heimdallFee`，将验证者放入拍卖期（更多在拍卖部分中）。
- `updateTimeLine`更新特殊时间轴数据结构，它对给定时段/检查点计数进行追踪，并保持有效验证者及有效利害关系。
- 在每次新调用`stake`上`NFT`都会设置一个独特的处理，可以转交给任何人`stakeFor`，但可以拥有 1:1 以太机地址。
- `acceptDelegation`如果验证者希望接受授权，则设置为真实`ValidatorShare`，将部署到验证者中。

### 取消质押 {#unstake}

- 在下一个流时，从验证者集合中删除验证者（仅对当前检查点有效，一次称为“查验点`unstake`”）
- 从时间线数据结构中删除验证者质押，更新验证者退出时段的计数。
- 如果验证者有授权，则收集所有奖励，并为新的授权锁定授权合约。

### unstakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- 在结束后`unstaking`，验证者被处置于提取期中，以便在发生过欺诈后发现的任何欺诈`unstaking`时，可以对过去的欺诈进行削减。
- 在服务期到`WITHDRAWAL_DELAY`期后，验证者可以调用此函数，并使用解决方案（`stakeManager`获得奖励，将存储的代币退回，烧毁 NFT 等）。

### 重新质押 {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- 让验证者投入新的金额或奖励或这两者，以增加他们的权益。
- 必须更新有效利害关系的时间表（金额）。

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

该方法允许验证者提取累积奖励，如果验证者接受授权，则必须考虑从授权合约中获得奖励。

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

该方法允许验证者更新签名者地址（用于验证 Polygon 区块链上的区块和检查点签名上）`stakeManager`。

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

验证者可以使用此方法来补充其对 Heimdall 收费的余额。

### claimFee {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

该方法用于提取 Heimdall 收取费用。在每个检查点上更新，以便验证者能够提供包含在 Heimdall `accountStateRoot`上账户的证明，并提取费用。

注意，`accountStateRoot`重新写入，以防止在多个检查点上退出（用于旧根点，保存核算）。目前未使用，必要时将用于在 `stakeManager``accumSlashedAmount`Heimdall 上削减。

### StakingNFT {#stakingnft}

标准 ERC721 合约中使用少量限制，例如每个用户一个代币，并以顺序方式进行处理。

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

为了开始进行竞标或在已经进行的拍卖中更高的出价，使用此函数。拍卖期按周期进行，`(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`因此**必须检查正确的拍卖期。**

`perceivedStakeFactor`用于计算精确系数*旧利害关系（注意目前，选择函数是默认的 1 WIP）。**如果仍在进行，必须检查上次拍卖期**的拍卖（可以选择不调用，`confirmAuction`以便在下次拍卖中获得资本）。通常持续的英格兰拍卖在一个 中进行`auctionPeriod`。

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **必须检查这不是拍卖期。**
- 如果最后出价者是所有者`validatorId`，行为应与retake类似。
- 在第二种情况下，取消质押 `validatorId` 并从下一个检查点开始添加新用户当作验证者，新用户的行为应该类似于 stake/stakeFor。

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- 在提交检查点时，写入只适用于 RootChain 合约
- `voteHash`，所有验证者都在上面签名（BFT ⅔+1 协议）
- 这个函数只验证唯一签名，并检查 ⅔+1 权力已在检查点根签名（所有数据纳入 RootChain 合约的 `voteHash` 验证中）`currentValidatorSetTotalStake` 提供当前有效质押。
- 奖励按比例分配给验证者点点。更多关于奖励[分配](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2)的奖励。

### isValidator {#isvalidator}

检查给定验证者是否为当前时段的有效验证者。

## 时间线数据结构 {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

验证者和授权事件的集中日志合约包含很少只读函数。您可以检查 GitHub 上的 [Staking Info.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) 合约的源代码。

## ValidatorShareFactory {#validatorsharefactory}

为每个选择参与授权的验证者部署`ValidatorShare`合约的工厂合约。您可以检查 GitHub 上的 [ValidatorShareFactory.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) 合约的源代码。
