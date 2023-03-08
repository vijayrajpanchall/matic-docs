---
id: set-up-aws-ssm
title: 设置 AWS SSM（系统管理器）
description: "为 Polygon Edge 设置 AWS SSM（系统管理器）。"
keywords:
  - docs
  - polygon
  - edge
  - aws
  - ssm
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

本文详细介绍要使用[AWS 系统管理器参数商店](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)启动并运行 Polygon Edge 的必要步骤。

:::info 以前的指南
**强烈建议**在阅读本文之前，请阅读有关[**本地设置**](/docs/edge/get-started/set-up-ibft-locally)和 [**云设置**](/docs/edge/get-started/set-up-ibft-on-the-cloud)的文章。
:::


## 先决条件 {#prerequisites}
### IAM 政策 {#iam-policy}
用户需要创建 IAM 政策，用于允许 AWS 系统管理器参数商店的读/写。成功创建 IAM 政策后，用户需要将其附上到运行 Polygon Edge 服务器的 EC2 实例。IAM 政策举例：
```json
{
  "Version": "2012-10-17",
  "Statement" : [
    {
      "Effect" : "Allow",
      "Action" : [
        "ssm:PutParameter",
        "ssm:DeleteParameter",
        "ssm:GetParameter"
      ],
      "Resource" : [
        "arn:aws:ssm:<aws_region>:<aws_account_id>:parameter<ssm-parameter-path>*"
      ]
    }
  ]
}
```
您可以在 [AWS 文档](https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-instance-profile.html)中找到的 AWS SSM IAM 角色的更多信息。

继续之前所需的信息：
* **区域**（系统管理器和 NODE 所在的区域）
* **参数路径**（例如，放置密钥的任意路径`/polygon-edge/nodes`）

## 步骤1 - 生成密钥管理器配置 {#step-1-generate-the-secrets-manager-configuration}

为了使 Polygon Edge 能够无缝地与 AWS SSM 进行通信，需要解析已生成的配置文件，其中包含 AWS SSM 上密钥存储的所有信息。

要生成配置，运行以下命令：

```bash
polygon-edge secrets generate --type aws-ssm --dir <PATH> --name <NODE_NAME> --extra region=<REGION>,ssm-parameter-path=<SSM_PARAM_PATH>
```

当前的参数：
* `PATH`是应导出配置文件的路径。默认`./secretsManagerConfig.json`
* `NODE_NAME`是当前 NODE 的名字，用于 AWS SSM 配置的设置。它可能是任意值。默认`polygon-edge-node`
* `REGION`是 AWS SSM 所在的区域。这必须与使用 AWS SSM NODE 的区域相同。
* `SSM_PARAM_PATH`是密钥将存储的路径的名称。例如，如果 `--name node1`和`ssm-parameter-path=/polygon-edge/nodes`指定，则密钥将存储为`/polygon-edge/nodes/node1/<secret_name>`

:::caution NODE 名称

指定 NODE 名称时，请注意。

Polygon Edge 使用指定的 NODE 名称来跟踪 AWS SSM 上生成和使用的密钥。指定现有的 NODE 名称可能会产生无法将密钥写入 AWS SSM 的后果。

密钥存储在以下基准路径：`SSM_PARAM_PATH/NODE_NAME`
:::

## STEP 2 - 使用配置初始化密钥 {#step-2-initialize-secret-keys-using-the-configuration}

现在，配置文件已存在，我们可以使用STEP 1 中设置的配置文件初始化所需的密钥，使用`--config`：

```bash
polygon-edge secrets init --config <PATH>
```

`PATH`param 是 STEP 1 中先前生成的密钥管理器的位置。

:::info IAM 政策

如果允许读/写操作的 IAM 政策没有正确配置和/或没有附至运行该指令的 EC2 实例，则该步骤会失败。
:::

## STEP 3 - 生成 genesis 文件 {#step-3-generate-the-genesis-file}

genesis 文件应以类似于[**本地设置**](/docs/edge/get-started/set-up-ibft-locally)和[**云设置**](/docs/edge/get-started/set-up-ibft-on-the-cloud)指南中的方式生成，并有小的更改。

由于 AWS SSM 正在使用，而不是本地文件系统，因此应通过`--ibft-validator`标志添加验证者地址：
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