---
id: validator-staking-operations
title: 在 Polygon 上进行质押
description: 了解如何在 Polygon 网络上作为验证者进行质疑
keywords:
  - docs
  - matic
  - polygon
  - stake
  - claim
  - unstake
slug: validator-staking-operations
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## 先决条件 {#prerequisites}

### 完整的节点设置 {#full-node-set-up}

您的验证者节点已完全设置并同步。另请参阅：

* [运行验证者节点](run-validator.md)
* [使用Ansible运行验证节点](run-validator-ansible.md)
* [从二进制文件运行验证节点](run-validator-binaries.md)

### 账户设置 {#account-setup}

在验证者节点上，检查是否设置账户。为了检查，**在验证者节点上**运行以下命令：

```sh
    heimdalld show-account
```

输出应该出现在以下格式：

```json
{
    "address": "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
    "pub_key": "0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19"
}
```

这将显示验证者节点的地址和公钥。请注意，**该地址必须与您在 Ethereum 上签名者地址匹配。**

### 显示私钥 {#show-private-key}

此步骤可选。

在验证者节点上，检查私钥是否正确。为了检查，**在验证者节点上**运行以下命令：

```sh
heimdalld show-privatekey
```

应出现以下输出：

```json
{
    "priv_key": "0x********************************************************"
}
```

## 在 Polygon 上进行质押 {#stake-on-polygon}

您可以使用[验证者仪表板](https://staking.polygon.technology/validators/)在 Polygon 上质押。

### 使用质押仪表板进行质押 {#stake-using-the-staking-dashboard}

1. 访问[验证者仪表板](https://staking.polygon.technology/validators/)。
2. 使用钱包登录。MetaMkask 是建议的钱包。您必须确保使用存在于的 MATIC 代币的地址登录。
3. 单击**“变成验证器”。**将要求您设置节点。如果您到现在还没有设置节点，那么您将需要这样做，否则，如果您继续设置节点，那么在尝试进行标记时将会收到一个错误提示。
4. 在下一个屏幕上，添加验证者详细信息、佣金率和质押金额。
5. 点击**立即质押**。

交易完成后，您将成功完成质押，成为验证者。您将被要求三次确认交易。

* 批准交易 — 这将批准您的质押交易。
* 质押 — 这将确认您的质押交易。
* 保存 — 这将保存您的验证者详细信息。

:::note

为了使更改在[质押仪表板](https://staking.polygon.technology/account)上生效，需要至少确认 12 个区块。

:::

### 查看余额 {#check-the-balance}

查看您地址的余额：

```sh
heimdallcli query auth account SIGNER_ADDRESS --chain-id CHAIN_ID
```

位置

* SIGNER_ADDRESS — 您的[签名者地址](/docs/maintain/glossary.md#validator)。
* CHAIN_ID — Polygon 主网链 ID 与客户端前缀：`heimdall-137`。

应出现以下输出：

```json
address: 0x6c468cf8c9879006e22ec4029696e005c2319c9d
coins:
- denom: matic
amount:
    i: "1000000000000000000000"
accountnumber: 0
sequence: 0
```

### 作为验证者申请奖励 {#claim-rewards-as-a-validator}

一旦您通过质押被设定为验证者，您将通过履行验证者职责获得奖励。当您认真履行验证者职责时，您将获得奖励。

要获得奖励，可以转到[验证者仪表板](https://staking.polygon.technology/account)。

您会在个人资料上看到两个按钮：

* 提取奖励
* 重新质押奖励

#### 提取奖励 {#withdraw-reward}

作为验证者，只要正确履行验证者职责，就能获得奖励。

点击**提取奖励**，奖励将回到钱包。

仪表板将在 12 个区块确认后更新。

#### 重新质押奖励 {#restake-reward}

作为验证者，重新质押奖励是增加您权益的一个简单方法。

点击**重新质押奖励**，您将重新质押奖励并增加您的权益。

仪表板将在 12 个区块确认后更新。
