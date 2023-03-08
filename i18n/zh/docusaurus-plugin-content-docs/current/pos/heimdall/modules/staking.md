---
id: staking
title: 质押
description: 管理验证者相关交易并状态的模块
keywords:
  - docs
  - matic
  - staking
  - heimdall
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# 质押 {#staking}

质押模块管理 Heimdall 的验证者相关交易和状态。请注意，验证者在以太坊链上质押代币并成为验证者。各验证者使用必要的参数在 Heimdall 上发送交易，以确认以太坊权益变更。如果大多数验证者同意权益变更，该模块就会保存验证者关于 Heimdall 状态的信息。

## 密钥管理 {#key-management}

有关密钥管理的详情，请参阅[验证者密钥管理](/docs/pos/heimdall/validator-key-management)

## 授权 {#delegation}

该模块仅管理在 Heimdall 上质押的验证者。授权仅适用于以太坊链上的智能合约。为了优化智能合约的授权奖励计算，我们使用验证者份额（每个验证者的 ERC20）。

更多详情请参阅：[授权（验证者份额）](/docs/pos/contracts/delegation)

## 奖励 {#rewards}

所有奖励都在以太坊链上分配。验证者和授权者只需在 `StakeManager.sol` 上发送交易，即可领取奖励或重新质押

更多详情请参阅：[奖励](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## 消息 {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

 当新验证者加入系统时，`MsgValidatorJoin` 处理质押。如果验证者在以太坊上调用 `StakingManager.sol` 中的 `stake` 或 `stakeFor`，则会发出新的 `Staked` 事件。

来源： [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

```jsx
/**
 * Staked event - emitted whenever new validator
 *
 * @param signer           Signer address for the validator
 * @param validatorId      Validator id
 * @param activationEpoch  Activation epoch for validator
 * @param amount           Staked amount
 * @param total            Total stake
 * @param signerPubKey     Signer public key (required by Heimdall/Tendermint)
 */
event Staked(
    address indexed signer,
    uint256 indexed validatorId,
    uint256 indexed activationEpoch,
    uint256 amount,
    uint256 total,
    bytes signerPubkey
);
```

`activationEpoch` 是验证者将在 Heimdall 上活跃的检查点计数。

如果槽位不可用，智能合约的权益调用将失败。验证者槽位是限制系统中验证者数量的方法。  槽位由以太坊智能合约管理。

以下是 Heimdall 交易的 `ValidatorJoin` 消息：

```go
type MsgValidatorJoin struct {
	From         hmTypes.HeimdallAddress `json:"from"`
	ID           hmTypes.ValidatorID     `json:"id"`
	SignerPubKey hmTypes.PubKey          `json:"pub_key"`
	TxHash       hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex     uint64                  `json:"log_index"`
}
```

### MsgStakeUpdate {#msgstakeupdate}

 在验证者重新质押或新授权进入时，`MsgStakeUpdate` 处理权益更新。在任一情况下，都会发出新的 `StakeUpdate` 事件。

```jsx
/**
 * Stake update event - emitted whenever stake gets updated
 *
 * @param validatorId      Validator id
 * @param newAmount        New staked amount
 */
event StakeUpdate(
	uint256 indexed validatorId,
	uint256 indexed newAmount
);
```

以下是 Heimdall 交易的 `MsgStakeUpdate` 消息：

```go
// MsgStakeUpdate represents stake update
type MsgStakeUpdate struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgValidatorExit {#msgvalidatorexit}

 验证者在以太坊上发起退出流程后，`MsgValidatorExit` 处理验证者退出流程。它将发出 `SignerUpdate` 事件。

```jsx
/**
 * Unstake init event - emitted whenever validator initiates the exit
 *
 * @param user                Signer
 * @param validatorId         Validator id
 * @param deactivationEpoch   Deactivation epoch for validator
 * @param amount              Unstaked amount
 */
event UnstakeInit(
    address indexed user,
    uint256 indexed validatorId,
    uint256 deactivationEpoch,
    uint256 indexed amount
);
```

以下是 Heimdall 交易的 `MsgValidatorExit` 消息：

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

 验证者更新以太坊上的签名者密钥时，`MsgSignerUpdate` 处理签名者更新。它将发出 `SignerUpdate` 事件。

```jsx
/**
 * Signer change event - emitted whenever signer key changes
 *
 * @param validatorId      Validator id
 * @param oldSigner        Current old signer
 * @param newSigner        New signer
 * @param signerPubkey     New signer public key
 */
event SignerChange(
    uint256 indexed validatorId,
    address indexed oldSigner,
    address indexed newSigner,
    bytes signerPubkey
);
```

以下是 Heimdall 交易的 `MsgSignerUpdate` 消息：

```go
// MsgSignerUpdate signer update struct
type MsgSignerUpdate struct {
	From            hmTypes.HeimdallAddress `json:"from"`
	ID              hmTypes.ValidatorID     `json:"id"`
	NewSignerPubKey hmTypes.PubKey          `json:"pubKey"`
	TxHash          hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex        uint64                  `json:"log_index"`
}
```

## CLI 命令 {#cli-commands}

### 验证者详细信息 {#validator-details}

**按签名者地址**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

该命令会显示以下结果：

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

**按验证者地址**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

该命令会显示以下结果：

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

### 验证者加入 {#validator-join}

该命令将通过 CLI 发送验证者加入命令：

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

`tx-hash` 值必须与发出 `Staked` 事件的以太坊交易哈希相同，而 `log-index` 必须与发出事件所在的索引相同。

## REST API {#rest-apis}

| Name | Method | Endpoint |
|----------------------|------|------------------|
| Get Heimdall validator set | GET | /staking/validator-set |
| Get validator details | GET | /staking/validator/validator-id |


所有查询 API 都将产生以下格式的结果：

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
