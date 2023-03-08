---
id: governance
title: Governance
sidebar_label: Governance
description: 采用 1 代币 - 1 投票基础的系统
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Governance {#governance}

Heimdall 治理与 [`x/gov`Cosmos-sdk 模块](https://docs.cosmos.network/master/modules/gov/)完全相同。

在该系统中，链上原生质押代币的持有者可以在 `1 token = 1 vote` 基础上对提案投票。以下是当前支持的功能列表：

- **提案提交：** 验证者可以提交带有存款的提案。若达到最低存款额，提案将进入投票期。提案遭拒或接受之后，对提案存款的验证者可以收回存款。
- **投票：**验证者可以对送达 Mindepit 时的提案进行投票。

存款期和投票期均为 `gov` 模块中的参数。必须在存款期结束之前完成最低存款，否则将自动拒绝提案。

若在存款期内达到最低存款额，将进入投票期。在投票期内，所有验证者都应对提案作出自己的选择。投票期结束后，`gov/Endblocker.go` 执行 `tally` 函数并基于 `tally_params` — `quorum`、`threshold` 和 `veto`，接受或拒绝提案。

来源： [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

在 Heimdall 中可以实施不同类型的提案。截至目前，它只支持 **Param 更改提案。**

### 参数更改提案 {#param-change-proposal}

使用这种类型的提案，验证者可以更改 Heimdall `params`中的任何`module`一个。

例如：更改 `auth` 模块中交易的最低 `tx_fees`。提案获得接受后，将自动在 Heimdall 状态下更改 `params`。不需要额外的交易。

## CLI 命令 {#cli-commands}

### 查询治理参数 {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

该命令显示治理模块的所有参数。

```go
voting_params:
  voting_period: 48h0m0s
tally_params:
  quorum: "334000000000000000"
  threshold: "500000000000000000"
  veto: "334000000000000000"
deposit_parmas:
  min_deposit:
  - denom: matic
    amount:
      i: "10000000000000000000"
  max_deposit_period: 48h0m0s
```

### 提交提案 {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json` 是一个包含 json 格式提案的文件。

```json
{
  "title": "Auth Param Change",
  "description": "Update max tx gas",
  "changes": [
    {
      "subspace": "auth",
      "key": "MaxTxGas",
      "value": "2000000"
    }
  ],
  "deposit": [
    {
      "denom": "matic",
      "amount": "1000000000000000000"
    }
  ]
}
```

### 查询提案 {#query-proposal}

查询所有提案的要点：

```go
heimdallcli query gov proposals --trust-node
```

查询特定提案的要点：

```go
heimdallcli query gov proposals 1 --trust-node
```

### 对提案投票 {#vote-on-proposal}

对某项特定提案进行表决：

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

提案将在投票期结束后自动计票。

## REST API {#rest-apis}

| Name | Method | Endpoint |
|----------------------|------|------------------|
| 获取所有提案 | GET | /gov/proposals |
| 获取提案详细信息 | GET | /gov/proposals/`proposal-id` |
| 获取提案的所有票数 | GET | /gov/proposals/`proposal-id`/votes |
