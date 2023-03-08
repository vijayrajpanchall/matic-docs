---
id: bls
title: BLS
description: "有关 BLS 模式的解释和介绍。"
keywords:
  - docs
  - polygon
  - edge
  - bls
---

## 概述 {#overview}

BLS 也称为 Boneh–Lynn–Shacham (BLS)，是一个密码签名计划，用户可以验证签名者是否真实。这是一种可汇集多个签名的签名计划。在 Polygon Edge 中，默认使用 BLS，以便在 IB 共识模式下提供更强的安全性。BLS 可增加签名至单个字节阵列，减少区块头的大小。每个链都可以选择是否使用 BLS。无论是否启用 BLS 模式，都会使用 ECDSA。

## 视频演示 {#video-presentation}

[![bls - 视频](https://img.youtube.com/vi/HbUmZpALlqo/0.jpg)](https://www.youtube.com/watch?v=HbUmZpALlqo)

## 如何使用 BLS 设置新链 {#how-to-setup-a-new-chain-using-bls}

查看[本地设置](/docs/edge/get-started/set-up-ibft-locally) / [云设置](/docs/edge/get-started/set-up-ibft-on-the-cloud)节获取详细的设置说明。

## 如何从现有的 ECDSA PoA 链迁移至 BLS PoA 链 {#how-to-migrate-from-an-existing-ecdsa-poa-chain-to-bls-poa-chain}

该节描述了如何在已有的 PoA 链中使用 BLS 模式。需要以下步骤才能在 PoA 链中启用 BLS。

1. 停止所有 NODE
2. 为所有验证者生成 BLS 密钥
3. 添加分叉设置至 genesis.json
4. 重新启动所有 NODE

### 1. 停止所有 NODE {#1-stop-all-nodes}

通过按下 Ctrl + C (Control + c) 终止验证者的所有过程。请记住，最新的区块高度（区块日志中最大序列号）。

### 2. 生成的 BLS 密钥 {#2-generate-the-bls-key}

`secrets init`带有`--bls`生成的一个 BLS 密钥。为了保持现有的 ECDSA 和网络密钥，并添加新的 BLS 密钥，需要禁用`--ecdsa`和`--network`。

```bash
polygon-edge secrets init --bls --ecdsa=false --network=false

[SECRETS INIT]
Public key (address) = 0x...
BLS Public key       = 0x...
Node ID              = 16...
```

### 3. 添加分叉设置 {#3-add-fork-setting}

`ibft switch`指令添加分叉设置，可以在已有的链中启用 BLS，将分叉设置添加至`genesis.json`。

对于 PoA 网络，需要在指令中给出验证者。作为`genesis`指令的方式，`--ibft-validators-prefix-path`或`--ibft-validator`标志可用于指明验证者。

使用带有`--from`标志的 BLS 指定链开始的高度。

```bash
polygon-edge ibft switch --chain ./genesis.json --type PoA --ibft-validator-type bls --ibft-validators-prefix-path test-chain- --from 100
```

### 4. 重启所有 NODE {#4-restart-all-nodes}

通过`server`指令重新启动所有 NODE。上一步指明的`from`中的区块创建后，链启用 BLS 并显示如下日志：

```bash
2022-09-02T11:45:24.535+0300 [INFO]  polygon.ibft: IBFT validation type switched: old=ecdsa new=bls
```

日志显示创建区块后用于生成每个区块的验证码。

```
2022-09-02T11:45:28.728+0300 [INFO]  polygon.ibft: block committed: number=101 hash=0x5f33aa8cea4e849807ca5e350cb79f603a0d69a39f792e782f48d3ea57ac46ca validation_type=bls validators=3 committed=3
```

## 如何从现有的 ECDSA PoS 链迁移至 BLS PoS 链 {#how-to-migrate-from-an-existing-ecdsa-pos-chain-to-a-bls-pos-chain}

该节描述了如何在已有的 PoS 链中使用 BLS 模式。需要以下步骤才能在 PoS 链中启用 BLS。

1. 停止所有 NODE
2. 为所有验证者生成 BLS 密钥
3. 添加分叉设置至 genesis.json
4. 调用质押合约注册 BLS 公钥
5. 重新启动所有 NODE

### 1. 停止所有 NODE {#1-stop-all-nodes-1}

通过按下 Ctrl + C (Control + c) 终止验证者的所有过程。请记住，最新的区块高度（区块日志中最大序列号）。

### 2. 生成的 BLS 密钥 {#2-generate-the-bls-key-1}

`secrets init`带有`--bls`标志，生成 BLS 密钥。为了保持现有的 ECDSA 和网络密钥，并添加新的 BLS 密钥，需要禁用`--ecdsa`和`--network`。

```bash
polygon-edge secrets init --bls --ecdsa=false --network=false

[SECRETS INIT]
Public key (address) = 0x...
BLS Public key       = 0x...
Node ID              = 16...
```

### 3. 添加分叉设置 {#3-add-fork-setting-1}

`ibft switch`指令添加一个分叉设置，可从链中启用 BLS，分叉设置添加至`genesis.json`。

使用带有`from`标志的 BLS 模式指定链开始时的高度，使用带有`development`标志指定合约更新的高度。

```bash
polygon-edge ibft switch --chain ./genesis.json --type PoS --ibft-validator-type bls --deployment 50 --from 200
```

### 4. 在质押合约中注册 BLS 公链 {#4-register-bls-public-key-in-staking-contract}

添加分叉且验证者重启后，每个验证者都需要在质押合约中调用`registerBLSPublicKey`，以便注册 BLS 公链。必须在`--deployment`指明的高度之后，必须在`--from`指明的高度之前完成。

注册 BLS 公钥的脚本在[质押智能合约库](https://github.com/0xPolygon/staking-contracts)中定义。

设置`BLS_PUBLIC_KEY`用于注册`.env`文件。通过[pos-质押-取消质押](/docs/edge/consensus/pos-stake-unstake#setting-up-the-provided-helper-scripts)了解更多有关其他参数的信息。

```env
JSONRPC_URL=http://localhost:10002
STAKING_CONTRACT_ADDRESS=0x0000000000000000000000000000000000001001
PRIVATE_KEYS=0x...
BLS_PUBLIC_KEY=0x...
```

以下命令将·`.env`中给出的 BLS 公钥注册到合约中。

```bash
npm run register-blskey
```

:::warning 验证者需要手动注册 BLS 公钥

在 BLS 模式中，验证者必须有自己的地址和 BLS 公钥。当共识从合约中获取验证者信息时，共识层忽视在合约中未注册 BLS 公钥的验证者。
:::

### 5. 重新启动所有 NODE {#5-restart-all-nodes}

通过`server`指令重新启动所有 NODE。在之前的步骤中指明的`from`创建该区块，在这之后该链启用 BLS。
