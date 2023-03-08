---
id: terraform-aws-deployment
title: Terraform AWS 部署
description: "使用 Terraform 把 Polygon Edge 网络部署在 AWS 云提供者上"
keywords:
  - docs
  - polygon
  - edge
  - deployment
  - terraform
  - aws
  - script
---
:::info 生产部署指南
这是官方、已准备好、完全自动化的 AWS 部署指南。

建议手动部署到***[云](set-up-ibft-on-the-cloud)***或***[本地](set-up-ibft-locally)***以便测试和/或如果提供者不是 AWS。
:::

:::info
此部署仅为 POA   。如果需要权益证明 (PoS) 机制，现在只需遵循本***[指南](/docs/edge/consensus/migration-to-pos)***，以从 PoA 切换到权益证明 (PoS) 。
:::

本指南将详细介绍在 AWS 云提供者上部署 Polygon Edge 区块链网络的过程，该网络已准备好生产，因为验证者节点可以跨多个可用性区域。

## 先决条件 {#prerequisites}

### 系统工具 {#system-tools}
* [terraform](https://www.terraform.io/)
* [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
* [aws 访问密钥 ID 和密钥访问密钥](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-prereqs.html#getting-started-prereqs-keys)

### Terraform 变量 {#terraform-variables}
在运行部署之前，必须提供两个变量：

* `alb_ssl_certificate`- ALB 用于 https 协议时使用的 AWS 证书管理器证书的 ARN。   在开始部署之前必须生成证书，而且它必须为**已发行**状态。
* `premine`- 接收预挖掘原生货币的账户。价必须遵循官方 [CLI](/docs/edge/get-started/cli-commands#genesis-flags) 标志规范

## 部署信息 {#deployment-information}
### 已部署的资源 {#deployed-resources}
将部署的资源的高级别的概述：

* 专用 VPC
* 4 个验证者节点（也属于启动节点）
* 4 个 NAT 网关，以允许NODE 外出 Internet 流量的 NOT 网关
* 用于生成第一 (genesis) 区块和启动链的 Lambda 功能
* 专用安全性组和 IAM 角色
* 用于存储 genesis.json 的 S3 桶
* 用于暴露 JSON-RPC 端点的应用程序负载平衡器

### 容错 {#fault-tolerance}

该部署仅需要具有 4 个可用性区域的区域。每个 NODE 都部署在单一 AZ 中。

将每个 NODE 放入单一的 AZ 中，整个区块链集群对单一 Node（AZ）故障具有容错能力，因为 Polygon Edge 实现 IBFT共识，允许单一 Node 在 4 个验证者节点集群中发生故障。

### 命令行访问 {#command-line-access}

验证者节点以任何方式暴露在公共因特网中（仅通过 ALB 访问 JSON-PRC）他们甚至没有附上公有 IP 地址。  节点指令行只能通过 [AWS 系统管理器访问 - 会话管理器](https://aws.amazon.com/systems-manager/features/)。

### Base AMI 升级 {#base-ami-upgrade}

此部署使用 `ubuntu-focal-20.04-amd64-server` AWS AMI。如果 AWS AMI 更新，它**不会**触发 EC2 *重新部署*。

如果出于某种原因，需要基础 AMI 才能更新，可以通过在`terraform apply`之前运行每个实例的`terraform taint`命令来实现。   运行    `terraform taint module.instances[<instance_number>].aws_instance.polygon_edge_instance`命令污染实例。

示例：
```shell
terraform taint module.instances[0].aws_instance.polygon_edge_instance
terraform taint module.instances[1].aws_instance.polygon_edge_instance
terraform taint module.instances[2].aws_instance.polygon_edge_instance
terraform taint module.instances[3].aws_instance.polygon_edge_instance
terraform apply
```

:::info
在生产环境中，`terraform taint`应逐一运行，以便保持区块链网络的功能。
:::

## 部署程序 {#deployment-procedure}

### 预部署步骤 {#pre-deployment-steps}
* 通读 [polygon-technology-edge](https://registry.terraform.io/modules/aws-ia/polygon-technology-edge/aws) terraform 注册表自述文件
* 使用模块自述文件上的*规定指示*将`polygon-technology-edge`模块添加到`main.tf`文件中
* 运行`terraform init`命令安装所有必要的 Terraform 依赖性
* 在 [AWS 证书管理器](https://aws.amazon.com/certificate-manager/)中提供新证书
* 确保所提供的证书处于**已发行**状态，并注意证书的 **ARN**
* 设置输出声明，以便在 cli 中获取模块的输出

#### `main.tf`示例 {#example}
```terraform
module "polygon-edge" {
  source  = "aws-ia/polygon-technology-edge/aws"
  version = ">=0.0.1"

  premine             = var.premine
  alb_ssl_certificate = var.alb_ssl_certificate
}

output "json_rpc_dns_name" {
  value       = module.polygon-edge.jsonrpc_dns_name
  description = "The dns name for the JSON-RPC API"
}

variable "premine" {
  type        = string
  description = "Public account that will receive premined native currency"
}

variable "alb_ssl_certificate" {
  type        = string
  description = "The ARN of SSL certificate that will be placed on JSON-RPC ALB"
}
```

#### `terraform.tfvars`示例 {#example-1}
```terraform
premine             = "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
alb_ssl_certificate = "arn:aws:acm:us-west-2:123456789:certificate/64c7f117-61f5-435e-878b-83186676a8af"
```

### 部署步骤 {#deployment-steps}
* 创建 `terraform.tfvars` 文件
* 在文件中设置所需的 terraform 变量（如上文所述）。:::info
还有其他非强制变量可以完全自定义此部署。您可以通过将自己添加到`terraform.tfvars`文件来取代默认值。

可在模块的 Terraform ***[注册表](https://registry.terraform.io/modules/aws-ia/polygon-technology-edge/aws)***中找到所有可用变量的规格
:::
* 确保您可以通过运行`aws s3 ls`适当设置 aws cli 认证 - 部署基础设施
* 不应该出现错误`terraform apply`

### 部署后步骤 {#post-deployment-steps}
* 部署完成后，请注意 cli 中打印的`json_rpc_dns_name`变量值
* 创建公共 dns cname 记录，将您的域名指向所提供的`json_rpc_dns_name`值。例如：
  ```shell
  # BIND syntax
  # NAME                            TTL       CLASS   TYPE      CANONICAL NAME
  rpc.my-awsome-blockchain.com.               IN      CNAME     jrpc-202208123456879-123456789.us-west-2.elb.amazonaws.com.
  ```
* 一旦 cname 记录传播，可通过调用您的 JSON-CRP 端点来检查链是否正常运作   。从上述示例中：
  ```shell
    curl  https://rpc.my-awsome-blockchain.com -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
  ```

## 销毁程序 {#destroy-procedure}
:::warning
以下程序将永久删除使用这些terraform 脚本部署的整个基础设施。    确保您拥有合适的[区块链数据备份](docs/edge/working-with-node/backup-restore)和/或正在使用测试环境。
:::

如果需要删除整个基础设施，请运行以下命令`terraform destroy`。   此外，您需要手动删除部署所在区域的 AWS [参数存储](https://aws.amazon.com/systems-manager/features/)中存储的密钥。
