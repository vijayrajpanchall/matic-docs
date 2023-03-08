---
id: set-up-hashicorp-vault
title: 设置 Hashicorp Vault
description: "为 Polygon Edge 设置 Hashicorp Vault。"
keywords:
  - docs
  - polygon
  - edge
  - hashicorp
  - vault
  - secrets
  - manager
---

## 概述 {#overview}

目前，polygon 边缘关注保持 2 个主要运行时密钥：
* 如果 NODE 是一个验证者，则 NODE 使用的**验证者私钥**
* libp2p 用于参与和与其他同行通信的**网络私钥**。

:::warning
验证者私钥对于每个验证者节点都是唯一的。相同的密钥<b>不会</b>在所有验证者中共享，因为这可能损害链的安全性。
:::

有关其他信息，请通读[《私钥管理指南》](/docs/edge/configuration/manage-private-keys)。

Polygon Edge 的模块**不应需要知道如何保存密钥**。最终，模块不应在乎密钥是否存储在 NODE 磁盘上的远端服务器或本地上。

模块需要知道的保密的所有一切是**知道使用密钥**，**知道获取或保存**哪个密钥。这些操作的最精细的实施详细信息被委托给 `SecretsManager`，这当然是一个抽象。

启动 Polygon Edge 的 NODE 运算符现在可以指定他们想要使用的密钥管理器，并且一旦正确的密钥管理器已安装，模块可通过交互/界面/接口处理密钥 -密钥是否存储在磁盘或服务器上，则无需在乎。

本文详细介绍要使用 [Hashicorp Vault](https://www.vaultproject.io/) 服务器启动并运行 Polygon Edge 的必要步骤。

:::info 以前的指南
**强烈建议**在阅读本文之前，请阅读有关[**本地设置**](/docs/edge/get-started/set-up-ibft-locally)和 [**云设置**](/docs/edge/get-started/set-up-ibft-on-the-cloud)的文章。
:::


## 先决条件 {#prerequisites}

本条假定 Hashicorp Vault 服务器的运行实例**已经设置**。

此外，还需要用于 Polygon Edge 的 Hashicorp Vault 服务器应**已启用 KV 存储**。

继续之前所需的信息：
* **服务器 URL**（Hashicorp Vault 服务器的应用程序接口 (API) URL)
* **代币**（用于访问 KV 存储引擎的访问代币）

## STEP 1 - 生成密钥管理器配置 {#step-1-generate-the-secrets-manager-configuration}

为了使 Polygon Edge 能够无缝地与 Vault 服务器进行通信，需要解析已生成的配置文件，其中包含 Vault 上密钥存储的所有信息。

要生成配置，运行以下命令：

```bash
polygon-edge secrets generate --dir <PATH> --token <TOKEN> --server-url <SERVER_URL> --name <NODE_NAME>
```

当前的参数：
* `PATH`是应导出配置文件的路径。默认`./secretsManagerConfig.json`
* `TOKEN`是[上一节](/docs/edge/configuration/secret-managers/set-up-hashicorp-vault#prerequisites)中先前提到的代币
* `SERVER_URL`是 Vault 服务器的应用程序接口 (API) 的 URL，在[上一节](/docs/edge/configuration/secret-managers/set-up-hashicorp-vault#prerequisites)中也提到
* `NODE_NAME`是正在设置 Vault 配置的当前 NODE 的名称。它可能是任意值。默认`polygon-edge-node`

:::caution NODE 名称
指定 NODE 名称时，请仔细。

Polygon Edge 使用指定的 NODE 名称来跟踪 Vault 实例上生成和使用的密钥。指定 NODE 数据名称可能会造成 Vault 服务器上数据被重写的后果。

密钥存储在以下基准路径：`secrets/node_name`
:::

## STEP 2 - 使用配置初始化密钥 {#step-2-initialize-secret-keys-using-the-configuration}

现在，配置文件已存在，我们可以使用STEP 1 中设置的配置文件初始化所需的密钥，使用`--config`：

```bash
polygon-edge secrets init --config <PATH>
```

`PATH`param 是 STEP 1 中先前生成的密钥管理器的位置。

## STEP 3 - 生成 genesis 文件 {#step-3-generate-the-genesis-file}

genesis 文件应以类似于[**本地设置**](/docs/edge/get-started/set-up-ibft-locally)和 [**云设置**](/docs/edge/get-started/set-up-ibft-on-the-cloud)指南中的方式生成，并有小的更改。

由于 Hashicorp Vault 正在使用，而不是本地文件系统，因此应通过`--ibft-validator`标志添加验证者地址：
```bash
polygon-edge genesis --ibft-validator <VALIDATOR_ADDRESS> ...
```

## STEP 4 - 开始 Polygon Edge 客户端 {#step-4-start-the-polygon-edge-client}

现在，密钥已设置，genesis 文件已生成，此过程的最后一步是使用`server`命令启动 Polygon Edge。

`server`命令以与上述指南相同的方式使用，并附有小的附加物，`--secrets-config`标志：
```bash
polygon-edge server --secrets-config <PATH> ...
```

`PATH`param 是 STEP 1 中先前生成的密钥管理器的位置。