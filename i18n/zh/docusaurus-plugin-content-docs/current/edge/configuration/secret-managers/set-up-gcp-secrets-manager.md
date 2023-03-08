---
id: set-up-gcp-secrets-manager
title: 设置 GCP 密钥管理器
description: "为 Polygon Edge 设置 GCP 密钥管理器。"
keywords:
  - docs
  - polygon
  - edge
  - gcp
  - secrets
  - manager
---

## 概述 {#overview}

目前，polygon 边缘关注保持 2 个主要运行时密钥：
* 如果 NODE 是一个验证者，则 NODE 使用的**验证者私钥**
* libp2p 用于参与和与其他同行通信的**网络私钥**。

有关其他信息，请通读[《私钥管理指南》](/docs/edge/configuration/manage-private-keys)。

Polygon Edge 的模块**不应需要知道如何保存密钥**。最终，模块不应在乎密钥是否存储在 NODE 磁盘上的远端服务器或本地上。

模块需要知道的保密的所有一切是**知道使用密钥**，**知道获取或保存**哪个密钥。这些操作的最精细的实施详细信息被委托给 `SecretsManager`，这当然是一个抽象。

启动 Polygon Edge 的 NODE 运算符现在可以指定他们想要使用的密钥管理器，并且一旦正确的密钥管理器已安装，模块可通过交互/界面/接口处理密钥 -密钥是否存储在磁盘或服务器上，则无需在乎。

本文详细介绍要使用 [GCP 密钥管理器](https://cloud.google.com/secret-manager)启动并运行 Polygon Edge 的必要步骤。

:::info 以前的指南
**强烈建议**在阅读本文之前，请阅读有关[**本地设置**](/docs/edge/get-started/set-up-ibft-locally)和 [**云设置**](/docs/edge/get-started/set-up-ibft-on-the-cloud)的文章。
:::


## 先决条件 {#prerequisites}
### GCP 开票账户 {#gcp-billing-account}
要使用 GCP 密钥管理器，用户必须有 GCP 门户上的[开票账户](https://console.cloud.google.com/)。GCP 平台上的新的 Google 账户已被提供一些资金，可用于免费试用。更多信息，请查看 [GCP 文档](https://cloud.google.com/free)

### 密钥管理器 API {#secrets-manager-api}
用户在使用它之前需要启用 GCP 密钥管理应用程序接口 (API)。
这可以通过[密钥管理应用程序接口 (API) 门户](https://console.cloud.google.com/apis/library/secretmanager.googleapis.com)完成。
更多信息：[配置密钥管理器](https://cloud.google.com/secret-manager/docs/configuring-secret-manager)

### GCP 全权证书 {#gcp-credentials}
最后，用户需要生成将用于验证的新的全权证书。这可通过遵循[此处](https://cloud.google.com/secret-manager/docs/reference/libraries)发布的指示来完成。   包含全权证书的生成的 json 文件，应转换到需要使用 GCP 密钥管理器的每个 NODE。

继续之前所需的信息：
* **项目 ID** (GCP 平台上定义的项目 ID)
* **全权证书文件位置**（包含全权证书的 json 文件的路径）

## STEP 1 - 生成密钥管理器配置 {#step-1-generate-the-secrets-manager-configuration}

为了使 Polygon Edge 能够无缝地与 GCP SM 进行通信，需要解析已生成的配置文件，其中包含 GCP SM 上密钥存储的所有信息。

要生成配置，运行以下命令：

```bash
polygon-edge secrets generate --type gcp-ssm --dir <PATH> --name <NODE_NAME> --extra project-id=<PROJECT_ID>,gcp-ssm-cred=<GCP_CREDS_FILE>
```

当前的参数：
* `PATH`是应导出配置文件的路径。默认 `./secretsManagerConfig.json`
* `NODE_NAME`是 GCP SM 配置正在设置当前 NODE 的名称。它可能是任意值。默认 `polygon-edge-node`
* `PROJECT_ID`是账户设置期间和密钥管理器应用程序接口 (API) 激活时用户在 GCP 控制台中定义的项目 ID。
* `GCP_CREDS_FILE`是包含允许读取/写入访问密钥管理器的全权证书的 json 文件的路径。

:::caution NODE 名称
指定 NODE 名称时，请仔细。

Polygon Edge 使用指定的 NODE 名称来跟踪 GCP SM 上生成和使用的密钥。指定现存 NODE 名称可能会因未能将密钥写入 GCP SM 而产生后果。

密钥存储在以下基准路径：`projects/PROJECT_ID/NODE_NAME`
:::

## STEP 2 - 使用配置初始化密钥 {#step-2-initialize-secret-keys-using-the-configuration}

现在，配置文件已存在，我们可以使用STEP 1 中设置的配置文件初始化所需的密钥，使用`--config`：

```bash
polygon-edge secrets init --config <PATH>
```

`PATH`param 是 STEP 1 中先前生成的密钥管理器的位置。

## STEP 3 - 生成 genesis 文件 {#step-3-generate-the-genesis-file}

genesis 文件应以类似于[**本地设置**](/docs/edge/get-started/set-up-ibft-locally)和 [**云设置**](/docs/edge/get-started/set-up-ibft-on-the-cloud)指南中的方式生成，并有小的更改。

由于 GCP SM 正在使用，而不是本地文件系统，因此应通过`--ibft-validator`标志添加验证者地址：
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