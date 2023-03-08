---
id: consensus
title: Bor 共识
description: 获取新生产者工具的 Bor 机制
keywords:
  - docs
  - matic
  - Bor Consensus
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Bor 共识 {#bor-consensus}

Bor 共识受到了Cluce 共识的启发：[https://eips.ethereum.org/EIPS/eip-225](https://eips.ethereum.org/EIPS/eip-225)。Cluce 使用多个预先定义的生产者来进行工作。所有生产者都使用 Clique API 对新的生产者投票。他们轮流创建区块。

Bor 通过跨度和冲刺管理机制获取新的生产者。

## 验证者 {#validators}

Polygon 是一种权益证明系统。任何人都可以将其 Matic 代币质押在以太坊智能合约上，即 “质押合约”，并成为系统的验证者。

```jsx
function stake(
	uint256 amount,
	uint256 heimdallFee,
	address signer,
	bool acceptDelegation
) external;
```

验证者在 Heimdall 上激活后，就会通过 `bor` 模块当选为生产者。

检查 Bor 概述以了解更详细的跨度管理： [Bor](https://www.notion.so/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab) 概述

## 跨度 {#span}

一种逻辑定义的区块集合，从所有可用的验证者中选出一组验证者。Heimdall 通过 span-details API 来提供跨度详情。

```go
// HeimdallSpan represents span from heimdall APIs
type HeimdallSpan struct {
	Span
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}

// Span represents a current bor span
type Span struct {
	ID         uint64 `json:"span_id" yaml:"span_id"`
	StartBlock uint64 `json:"start_block" yaml:"start_block"`
	EndBlock   uint64 `json:"end_block" yaml:"end_block"`
}

// Validator represents a volatile state for each Validator
type Validator struct {
	ID               uint64         `json:"ID"`
	Address          common.Address `json:"signer"`
	VotingPower      int64          `json:"power"`
	ProposerPriority int64          `json:"accum"`
}
```

Geth（在本例中为 Bor）使用区块 `snapshot` 存储每个区块的状态数据，包括共识相关数据。

跨度内的每个验证者都享有投票权。根据投票权，他们当选为区块生产者。 权利越高，成为区块生产者的概率就越高。Bor 使用 Tendermint 算法来实现这一目标。来源：[https://github.com/maticnetwor/bor/blob/master/consuctions/bor/alidator_set.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go)

## 冲刺 {#sprint}


一个跨度内的一组区块，对此只选择一个区块生产者来生产区块。
sprint 大小是跨度大小的因素。Bor 使用 `validatorSet` 获取当前冲刺阶段的当前提案者/生产者。

```go
currentProposerForSprint := snap.ValidatorSet().Proposer
```

除了当前的提案者，Bor 还选择了后备生产者。

## 授权一个区块 {#authorizing-a-block}

Bor 中的生产者也称为签名者，因为要为网络授权一个区块，生产者需要在区块的哈希值上签名，其中包含**除签名本身之外的所有内容**。这意味着哈希值包含了标头的每一个字段，也包含了 `extraData`，但 65 字节的签名后缀除外。

此哈希值使用标准 `secp256k1` 曲线来签名，所产生的 65 字节签名嵌入到 `extraData` 中，当作尾随的 65 字节后缀。

每个签名的区块分配到一个难度上，给区块加权。轮流签名的权重 (`DIFF_INTURN`) 大于不按顺序签名的权重 (`DIFF_NOTURN`)。

### 授权策略 {#authorization-strategies}

只要生产者符合上述规格，他们就可以按他们认为合适的方式授权和分发区块。然而，以下建议的策略将减少网络流量和小分叉，因此建议使用该功能：

- 如果允许生产者在区块上签名（在授权名单上）
    - 计算下一个区块的最佳签名时间（父+`Period`）
    - 如果生产者按顺序，等待确切的时间到达，立即签字并广播
    - 如果生产者不按顺序，则签署延迟 `wiggle`

这个小策略将确保按顺序生产者（区块权重更大）在签名和传播方面比不按顺序生产者有轻微的优势。
此外，该计划允许随着生产者数量的增加而有一定的扩展。

### 不按顺序签名 {#out-of-turn-signing}

当按顺序生产者不生产区块时，Bor 将选择多个区块生产者以作后备。发生这种情况的原因有很多，例如：

- 区块生产者节点关闭
- 区块生产者试图扣留区块
- 区块生产者并非有意生产区块。

当上述情况发生时，Bor 的后备机制就会启动。

在任意时间点，验证者集合存储为一个数组，根据签名者地址来排序。假设验证器集合的顺序是 A、B、C、D，轮到 C 生产一个区块。如果 C 在足够长的时间内没有生产出区块，那么就轮到 D 来生产。如果 D 也没有，那么就轮到 A 和 B。

但是，由于 C 生产和传播区块需要一段时间，所以后备验证者等待一段时间才会开始生产区块。这种时间延迟称为摆动。

### 摆动 {#wiggle}

”摆动“是生产者在开始生产区块之前应该等待的时间。

- 假设最后一个区块 (n-1) 是在 `t` 时间生产。
- 我们通过一个可变参数 `Period` 来强制执行当前区块与下一个区块之间的最小时间延迟。
- 在理想情况下，C 将等待 `Period`，然后生产并传播区块。由于 Polygon 的区块时间设计得相当低 (2-4s)，传播延迟也假定为与 `Period` 相同的值。
- 因此，如果 D 没有在 `2 * Period` 时间看到新区块，D 将立即开始生产区块。具体地说，D 的摆动时间界定为 `2 * Period * (pos(d) - pos(c))`，其中 `pos(d) = 3` 和 `pos(c) = 2` 在验证者集合中。假设 `Period = 1`，D 的摆动为 2 秒。
- 现在，如果 D 也没有生产区块，A 将在 `2 * Period * (pos(a) + len(validatorSet) - pos(c)) = 4s` 的摆动时间过后开始生产区块。
- 相同地，C 的摆动是 `6s`

### 解决分叉问题 {#resolving-forks}

虽然上述机制在一定程度上增加了链的强健性，但分叉也可能随之产生。实际上，C 可能生产一个区块，但是传播过程中出现了超出预期的延迟，因此 D 也生产了一个区块，所以这产生了至少 2 个分叉。

解决办法很简单，选择难度较高的链。但问题是，在我们的设置中，我们如何定义一个区块的难度？

### 难度 {#difficulty}

- 一个区块由一位按顺序签名者（比如 c）生产，其难度定义为最高 = `len(validatorSet)`。
- 由于 D 是下一个生产者，如果出现 D 生产区块的情况，区块的难度就会像摆动那样定义为 `len(validatorSet) - (pos(d) - pos(c))`，即 `len(validatorSet) - 1`
- 由 A 生产的区块在充当后备的同时，难度也变成 `len(validatorSet) - (pos(a) + len(validatorSet) - pos(c))`，即 `2`

现在已经定义了每个区块的难度，一个分叉的难度是该分叉中区块的难度之和。在必须选择分叉的情况下，选择难度较高的分叉，因为这反映了区块是由按顺序区块生产者生产出来的事实。这只是为了给 Bor 上的用户产生最终定局的感受。

## 视图更改 {#view-change}

在每个跨度之后，Bor 都会改变视图。这意味着它会为下一个跨度获取新的生产者。

### 提交跨度 {#commit-span}



在当前跨度即将结束时（特别是在跨度中倒数第二个冲刺结束时），Bor 从 Heimdall 拉出一个新跨度。这是对 Heimdall 节点的简单 HTTP 调用。获取这些数据后，就会通过系统调用，对 BorValidatorSet genesis 合约实施 `commitSpan` 调用。

Bor 还将生产者字节设置到区块的标头。这是快速同步 Bor 所必要的。在快速同步期间，Bor 批量同步标头，并验证区块是否由授权生产者创建。

在每个冲刺开始时，Bor 从前一个标头获取下一个生产者的标头字节，并开始根据 `ValidatorSet` 算法创建区块。

以下是区块标头的样子：

```js
header.Extra = header.Vanity + header.ProducerBytes /* optional */ + header.Seal
```

<img src={useBaseUrl("img/Bor/header-bytes.svg")} />

## 以太坊链的状态同步 {#state-sync-from-ethereum-chain}

Bor 提供了一种机制，以太坊主链上的一些特定事件会转播到 Bor。这也是处理 plasma 合约存款的方式。

1. 以太坊上的合约都可以在 `StateSender.sol` 中调用 [syncState](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L33)。该调用发出 `StateSynced` 事件：https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38

  ```js
  event StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)
  ```

2. Heimdall 听到这些事件并`function proposeState(uint256 stateId)`调用-`StateReceiver.sol`因此作为待决状态更改类的存储器。请注意，只要是由当前验证者集合中的一个验证者做出的 `proposeState` 交易，即使 gas 费为 0，也会得到处理：https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L24

3. 在每个冲刺开始时，Bor 使用 Heimdall 中的状态，拉取待定状态更改的详细信息，并使用系统调用将其提交给 Bor 状态。`commitState`详见：https://github.com/maticnet/genesis-contracts/blob/f85d0409d2a99df53617ad5429101d9937e3fc3/contracts/StateReciver.sol#L41
