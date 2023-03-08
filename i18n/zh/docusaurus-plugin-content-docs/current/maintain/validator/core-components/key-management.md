---
id: key-management
title: 密钥管理
description: 签名者和所有者密钥管理
keywords:
  - docs
  - polygon
  - matic
  - key
  - key management
  - signer
  - owner
slug: key-management
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

每个验证者将使用两种密钥来管理 Polygon 上的验证者相关活动：

* 签名者密钥
* 所有者密钥

## 签名者密钥 {#signer-key}

签名者密钥是用于签署 Heimdall 区块、检查点和其他签名相关活动的地址。

签名者地址的私钥必须位于运行验证者节点的机器上，以便签名。

签名者密钥不能管理质押、奖励或授权。

验证者必须在以太坊主网的签名者地址上保留以太币以发送[检查点](/docs/maintain/glossary.md#checkpoint-transaction)。

## 所有者密钥 {#owner-key}

所有者密钥是用于在以太坊主网上进行质押、重新质押、更改签名者密钥、提取奖励和管理委托相关参数的地址。无论如何，所有者密钥的私钥必须是安全的。

所有通过所有者密钥的交易都在以太坊主网上执行。

签名者的密钥保存在节点上，通常为**热**钱包，而所有者的密钥应该是非常安全的，不经常使用，通常是**冷**钱包。投入的资金由所有者密钥控制。

这种在签名者和所有者密钥之间的责任分离是为了确保安全性和易用性之间的有效权衡。

两个密钥都是以太坊兼容的地址，并且以完全相同的方式工作。

## 签名者更改 {#signer-change}

请参阅[《更改签名者地址》](/docs/maintain/validate/change-signer-address)。
