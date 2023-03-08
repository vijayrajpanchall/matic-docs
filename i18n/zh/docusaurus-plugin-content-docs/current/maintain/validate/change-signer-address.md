---
id: change-signer-address
title: 更改您的签名者地址
description: 更改验证者签名者地址
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

有关[签名者地址](/docs/maintain/glossary.md#signer-address)的信息，请参阅
[《密钥管理》](/docs/maintain/validator/core-components/key-management)。

## 先决条件 {#prerequisites}

确保新的验证者节点已完全同步，并且正在使用新的签名者地址运行。

## 更改签名者地址 {#change-the-signer-address}

本指南将您当前的验证者节点称为节点 1，将新的验证者节点称为节点 2。

1. 使用节点 1 的地址登录到[质押仪表板](https://staking.polygon.technology/)。
2. 在您的个人资料上，点击**编辑个人资料**。
3. 在**签名者地址**一栏中，提供节点 2 的地址。
4. 在**签名者公钥**一栏中，提供节点 2 的公钥。

   若要获取公钥，请在验证者节点上运行以下命令：

   ```sh
   heimdalld show-account
   ```

点击**“保存”**会保存节点新的详细信息。实质上，这意味着节点 1 即为您控制质押代币的地址，奖励会发送到该地址，等等。节点 2 会立即执行诸如签署区块、签署检查点等活动。
