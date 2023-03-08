---
id: definitions
title: 通用定义
description: chainBridge 中使用的术语的通用定义
keywords:
  - docs
  - polygon
  - edge
  - Bridge
---


## 中继器 {#relayer}
Chainbridge 是一个中继器桥接。中继器的作用是请求执行投票（例如，要燃烧/释放的多少个代币）。它监测每个链中的事件，以及为从链中接收`Deposit`事件时目的地链的桥接合约中的提议投票。中继器调用桥接合约中的方法，在所需投票数提交后执行建议书。桥接将执行任务授权到 Handler 合约。


## 合约类型 {#types-of-contracts}
在 ChainBridge 中，链上有三种类型的合约，即 Bridge/Handler/Target。

| **类型** | **描述** |
|----------|-------------------------------------------------------------------------------------------------------------------------------|
| 桥接合约 | 管理请求、投票和执行的桥接合约需要部署在每个链中。用户将调用桥接中的`deposit`以开始转账，并且桥接将处理程序授权到与目标合约相符的 Handler 合约。Handler 合约成功调用目标合约后，桥接合约发出通知中继器的`Deposit`事件。 |
| Handler 合约 | 此合约与目标合约交互，以执行存入或提案。它验证用户请求、调用合约和帮助目标合约的某些设置。有某些 Handler 合约可调用每个具有不同接口的目标合约。Handler 合约的间接调用使桥接启用任何类型的资产或数据的转账。目前，由 ChainBridge 执行的 Handler 合约有三种类型：ERC20Handler、ERC721Handler 和 GenericHandler。 |
| 目标合约 | 管理待交换资产或链之间的转换信息的合约。与此合约的互动将从桥接的侧面进行。 |

<div style={{textAlign: 'center'}}>

![ChainBridge 架构](/img/edge/chainbridge/architecture.svg)*ChainBridge 架构*

</div>

<div style={{textAlign: 'center'}}>

![ERC20 代币转账的工作流程](/img/edge/chainbridge/erc20-workflow.svg)*例如，ERC20 代币转账的工作流程*

</div>

## 账户类型 {#types-of-accounts}

请确保账户拥有足够的原生代币以在开始前创建交易。在 Polygon Edge 中，您可以在生成 genesis 区块时指定预挖矿账户的余额。

| **类型** | **描述** |
|----------|-------------------------------------------------------------------------------------------------------------------------------|
| 管理员 | 此账户将默认给予管理员角色。 |
| 用户 | 发送/接收资产的发送者/接收者账户。发送者账户在代币转账和存入桥接合约中以开始转账时支付燃料费。 |

:::info 管理员角色
某些操作只能通过管理员账户执行。默认情况下，桥接合约的部署者具有管理员角色。您将在下面查找将管理员角色授予账户或删除账户的方法。

### 添加管理员角色 {#add-admin-role}

添加管理员

```bash
# Grant admin role
$ cb-sol-cli admin add-admin \
  --url [JSON_RPC_URL] \
  --privateKey [PRIVATE_KEY] \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --admin "[NEW_ACCOUNT_ADDRESS]"
```
### 取消管理员角色 {#revoke-admin-role}

删除管理员

```bash
# Revoke admin role
$ cb-sol-cli admin remove-admin \
  --url [JSON_RPC_URL] \
  --privateKey [PRIVATE_KEY] \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --admin "[NEW_ACCOUNT_ADDRESS]"
```

## `admin`账户允许的操作如下。 {#account-are-as-below}

### 设置资源 {#set-resource}

使用 handler 的合约地址注册资源ID。

```bash
# Register new resource
$ cb-sol-cli bridge register-resource \
  --url [JSON_RPC_URL] \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --resourceId "[RESOURCE_ID]" \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --handler "[HANDLER_CONTRACT_ADDRESS]" \
  --targetContract "[TARGET_CONTRACT_ADDRESS]"
```

### 使合约可燃/可铸造 {#make-contract-burnable-mintable}

在 handler 中将代币合约设置为可铸造/可燃。

```bash
# Let contract burnable/mintable
$ cb-sol-cli bridge set-burn \
  --url [JSON_RPC_URL] \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --handler "[HANDLER_CONTRACT_ADDRESS]" \
  --tokenContract "[TARGET_CONTRACT_ADDRESS]"
```

### 取消提案 {#cancel-proposal}

取消执行提案

```bash
# Cancel ongoing proposal
$ cb-sol-cli bridge cancel-proposal \
  --url [JSON_RPC_URL] \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --resourceId "[RESOURCE_ID]" \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --chainId "[CHAIN_ID_OF_SOURCE_CHAIN]" \
  --depositNonce "[NONCE]"
```

### 暂停/取消暂停 {#pause-unpause}

暂停存入、提案创建、投票和临时存入执行。

```bash
# Pause
$ cb-sol-cli admin pause \
  --url [JSON_RPC_URL] \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]"

# Unpause
$ cb-sol-cli admin unpause \
  --url [JSON_RPC_URL] \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]"
```

### 更改手续费 {#change-fee}

更改将支付给桥接合约的费用

```bash
# Change fee for execution
$ cb-sol-cli admin set-fee \
  --url [JSON_RPC_URL] \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --fee [FEE_IN_WEI]
```

### 添加/删除中继器 {#add-remove-a-relayer}

作为新中继器添加账户或从中继器删除账户

```bash
# Add relayer
$ cb-sol-cli admin add-relayer \
  --url [JSON_RPC_URL] \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --relayer "[NEW_RELAYER_ADDRESS]"

# Remove relayer
$ cb-sol-cli admin remove-relayer \
  --url [JSON_RPC_URL] \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --relayer "[RELAYER_ADDRESS]"
```

### 更改中继器阈值 {#change-relayer-threshold}

更改执行提议所需的投票数

```bash
# Remove relayer
$ cb-sol-cli admin set-threshold \
  --url [JSON_RPC_URL] \
  --privateKey [ADMIN_ACCOUNT_PRIVATE_KEY] \
  --bridge "[BRIDGE_CONTRACT_ADDRESS]" \
  --threshold [THRESHOLD]
```
:::

## 链 ID {#chain-id}

Chainbridge`chainId` 是桥接中用于区分区块链网络的任意值，它必须在 uint8 的范围内。要不与网络的链 ID 混淆，它们不是相同的内容。此值需要是唯一的，但不一定与网络的 ID 相同。

在本示例中，我们在`chainId`中设置`99`，因为 Mumbai 测试网的链 ID 是`80001`，它无法使用 uint8 表示。

## 资源 ID {#resource-id}

资源 ID 是交叉链环境中唯一的 32 个字节的值，与网络之间转账的某些资产（资源）相关。

资源 ID 是任意的，但作为常规，通常最后的字节包含资源链的链 ID（资产来源的网络）。

## Polygon PoS 的 JSON-RPC URL {#json-rpc-url-for-polygon-pos}

对于本指南，我们将使用 https://rpc-mumbai.matic。今天，Polygon 提供的公有 JSON-RPC URL 可能具有流量或速度限制。它将仅用于连接 Polygon Mumbai 测试网。我们建议您使用 Infura 等外部服务获取 JSON-RPC URL，因为部署合约将许多查询/请求发送到 JSON-RPC 中。

## 处理代币转账的方式 {#ways-of-processing-the-transfer-of-tokens}
在链之间进行 ERC20 代币转换时，可以以两个不同的模式处理：

### 锁定/释放模式 {#lock-release-mode}
<b>来源链：</b>您发送的代币将锁定在 Handler 合约中<br/>。<b>目的地链</b>：与您发送的源链中的相同量的代币将被解锁，并从 Handler 合约转入目的地链的接收账户中。

### 燃烧/铸造模式 {#burn-mint-mode}
<b>来源链：</b>您发送的代币将被烧毁。<br/><b>目的地链：</b>您发送和燃烧的相同量的代币将被铸造在源链上，并发送到接收账户中。

您可以在每条链上使用不同的模式。这意味着您可以在转账的主链中铸造代币时锁定代币。例如，如果总供应或铸币表得到控制，锁定/释放代币可能是合理的。如果子链中的合约必须遵循主链中的供应，代币将被铸造/焚毁。

默认模式是锁定/释放模式。如果您希望使代币可铸造/可燃，您需要调用`adminSetBurnable`方法。如果您希望执行时铸造代币，您将需要给予 ERC20 Handler 合约`minter`的角色。


