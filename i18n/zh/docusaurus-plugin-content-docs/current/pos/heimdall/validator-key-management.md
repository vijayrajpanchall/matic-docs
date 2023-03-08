---
id: validator-key-management
title: 验证者密钥管理
description: 签名者和拥有者密钥验证者管理
keywords:
  - docs
  - matic
  - polygon
  - Validator Key Management
  - signer
  - owner
image: https://matic.network/banners/matic-network-16x9.png
---

# 验证者密钥管理 {#validator-key-management}

每个验证者都使用两项密钥来管理 Polygon 上的验证者相关活动。签名者密钥保存在节点上，通常视为 `hot` 钱包，而所有者密钥则应妥善保管，不常使用，通常视为 `cold` 钱包。投入的资金由所有者密钥控制。

完成了这种责任分离，以确保在安全性和易于使用之间进行有效的权衡。两种密钥都为以太坊兼容地址，并以完全相同的方式运作。是的，拥有相同的拥有者键和签名者键的可能性。

## 签名者密钥 {#signer-key}

签名者密钥是用于签名 Heimdall 区块、检查点和其他签名相关活动的地址。出于签名目的，该密钥的私钥将存放在验证者节点上。但它无法管理权益、奖励或授权。

验证者必须在该地址上保留两种余额：

- Heimdall 上的 Matic 代币（通过 Topup 交易），用于履行验证者在 Heimdall 上的责任
- 以太坊链上的以太币，用于在以太坊上发送检查点

## 所有者密钥 {#owner-key}

所有者密钥是用于存储、重新盘点、更改签名者密钥、提取奖励和管理以太坊链上授权相关参数的地址。该密钥的私钥必须全力保护。

通过此密钥的所有交易都将在以太坊链上执行。

## 签名者更改 {#signer-change}

以太坊链上若发生签名者更改，则会在 `StakingInfo.sol` 上生成以下事件： [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)

```go
// Signer change
event SignerChange(
  uint256 indexed validatorId,
  address indexed oldSigner,
  address indexed newSigner,
  bytes signerPubkey
);
```

Heimdall 桥接处理上述事件并在 Heimdall 上发送交易，以便根据事件来更改状态。