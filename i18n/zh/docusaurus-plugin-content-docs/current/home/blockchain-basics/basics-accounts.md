---
id: accounts
title: 什么是账户？
sidebar_label: Accounts
description: "EOA和合约账户。"
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# 什么是账户？ {#what-are-accounts}

以太坊的世界状态由许多账户组成，每个账户都通过信息传递框架互动。最基本的互动是发送某些价值（如 MATIC 代币、 Polygon 原生代币或 $ETH，是以太坊区块链的本生代币）。

每个账户都由一个20字节的标识符来确定，该标识符称为地址 - 由账户的公钥生成。

有两种账户：**外部拥有账户**和**合同拥有账户。**

## 外部账户 {#externally-owned-accounts}

EOA 由私人密钥控制的账户，具有发送代币和消息的能力。

1. 他们可以发送交易（以太转换或触发合约代码），
2. 由私人密钥控制，
3. 并且没有相关代码。

## 合约账户 {#contract-owned-accounts}
合同拥有账户是指拥有相关智能合约代码的账户，其私钥并不由任何人拥有。

1. 他们有相关代码，
2. 他们的代码执行是由从其他合约收到的交易或消息（调用）触发的，
3. 当执行代码时，它执行任意复杂的操作（图灵完整性）——操作其自身的持续存储，并调用其他合约。

### 资源 {#resources}

- [了解更多账户信息](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
