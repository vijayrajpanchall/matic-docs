---
id: validator-hosting
title: 验证者托管
description: "Polygon Edge 的托管要求"
keywords:
- docs
- polygon
- edge
- hosting
- cloud
- setup
- validator
---

以下是 Polygon Edge 网络中正确托管验证者节点的相关建议。请仔细注意下面列出的所有项目，以确保您的验证者设置已安全、稳定和高效的配置适当。

## 知识基础 {#knowledge-base}

运行验证者节点之前，请通读此文档。   可能有用的其他文档包括：

- [安装](get-started/installation)
- [云设置](get-started/set-up-ibft-on-the-cloud)
- [CLI 命令](get-started/cli-commands)
- [服务器配置文件](configuration/sample-config)
- [私钥](configuration/manage-private-keys)
- [Prometheus 衡量标准](configuration/prometheus-metrics)
- [密钥管理器](/docs/category/secret-managers)
- [备份/恢复](working-with-node/backup-restore)

## 最低系统要求 {#minimum-system-requirements}

| 类型 | 价值 | 影响因素 |
|------|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| CPU | 2 个核心 | <ul><li>JSON-RPC 查询数量</li><li>区块链状态的大小</li><li>区块燃料限制</li><li>区块时间</li></ul> |
| RAM | 2 GB | <ul><li>JSON-RPC 查询数量</li><li>区块链状态的大小</li><li>区块燃料限制</li></ul> |
| 磁盘 | <ul><li>10 GB 根分区</li><li>使用 LVM 进行磁盘扩展的 30 GB 根分区</li></ul> | <ul><li>区块链状态的大小</li></ul> |


## 服务配置 {#service-configuration}

`polygon-edge`二进制需要在网络连接时自动作为系统服务运行并有开始/阻止/重新启动功能。我们建议使用类似`systemd.`的服务管理器

示例`systemd`系统配置文件：
```
[Unit]
Description=Polygon Edge Server
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=10
User=ubuntu
ExecStart=/usr/local/bin/polygon-edge server --config /home/ubuntu/polygon/config.yaml

[Install]
WantedBy=multi-user.target
```

### 二进制 {#binary}

在生产工作量中，`polygon-edge`二进制只应从预先构建的 GitHub 版本的二进制文件部署，而不是通过手动编译。:::info
通过手动编译 `develop`GitHub 分支，您可以引入您的环境的重大更改。   因此，建议完全从版本部署 Polygon Edge 二进制，因为它将包含有关重大更改和如何克服更改的信息。
:::

有关安装方法的完整概述，请参阅[安装](/docs/edge/get-started/installation)。

### 数据存储 {#data-storage}

包含区块链状态的`data/`文件夹应安装在专用磁盘/卷上，以便自动进行磁盘备份、卷扩展和在出现故障时可选将磁盘/卷安装到另一个实例。


### 日志文件 {#log-files}

日志文件需要每日旋转（使用类似`logrotate`的工具）。:::warning
如果配置无需日志旋转，日志文件可以使用所有可用的磁盘空间，而这些空间可能破坏验证器的正常运行时间。
:::

示例`logrotate`配置：
```
/home/ubuntu/polygon/logs/node.log
{
        rotate 7
        daily
        missingok
        notifempty
        compress
        prerotate
                /usr/bin/systemctl stop polygon-edge.service
        endscript
        postrotate
                /usr/bin/systemctl start polygon-edge.service
        endscript
}
```


有关日志存储的建议，请参阅以下[日志](#logging)章节。

### 附加依赖 {#additional-dependencies}

`polygon-edge`已静态编译，无需附加主机操作系统依赖。

## 维护 {#maintenance}

以下是维持 Polygon Edge 网络的运行的安全验证者节点的最佳做法。

### 备份 {#backup}

Polygon Edge 节点建议两种备份程序。

建议尽可能使用两者，因为 Polygon Edge 备份是总是可用的选项。

* ***卷备份***：    Polygon Edge 节点的`data/`卷，或可能时完整的 VM 卷的日常增量备份。


* ***Polygon Edge 备份***    ：建议执行 Polygon Edge 定期备份并将`.dat`文件移动到场外位置或安全云对象存储的 CRON 日常工作。

Polygon Edge 备份理想情况下不应与上述卷备份重叠。

请参阅[备份/恢复NODE实例](working-with-node/backup-restore)，以了解如何执行 Polygon Edge 备份的指示。

### 日志 {#logging}

Polygon Edge 节点输出的日志应：
- 发送到具有编制索引和搜索功能的外部数据存储器
- 日志时期为 30 天

如果这是您首次设置 Polygon Edge 验证者，我们建议使用`--log-level=DEBUG`选项开始 NODE，以便可以快速调试您可能面临的任何问题。

:::info
`--log-level=DEBUG`将使节点日志的输出尽可能变动。   调试日志将大大增加日志文件的大小，在设置日志旋转解决方案时必须考虑到这一点。
:::
### 操作系统安全性补丁 {#os-security-patches}

管理员需要确保验证者实例操作系统总是使用最新补丁更新，并且至少每月更新一次。

## 指标 {#metrics}

### 系统指标 {#system-metrics}

管理员需要设置某种系统衡量标准监视器，（例如，Telegraf + InfluxDB + Grafana 或第三方 SaaS）。

需要监测的指标，并需要设置警报通知的指标：

| 指标名称 | 警报阈值 |
|-----------------------|-------------------------------|
| CPU 使用率(%) | 超过 5分钟的 > 90% |
| RAM 利用率 (%) | 超过 5分钟的 > 90% |
| 根磁盘利用率 | > 90% |
| 数据磁盘利用率 | > 90% |

### 验证者指标 {#validator-metrics}

管理员需要设置 Polygon Edge 的 Prometheus 应用程序接口 (API) 的衡量指标的收集，以便能够监视区块链性能。

请参阅 [Prometheus 衡量指标](configuration/prometheus-metrics)，了解正在接触的衡量指标，以及设置 Prometheus 衡量指标收集的方法。


需要更多注意以下衡量指标：
- ***区块生产时间*** - 区块生产时间比正常更高，则网络存在潜在问题
- ***共识轮回的数量*** - 如果超过 1 轮，则网络中设置的验证者存在潜在问题
- ***对等体数量*** - 如果对等体数量下降，则网络安全性存在

## 连接问题 {#security}

以下是 Polygon Edge 网络的运行的安全验证者节点的最佳做法。

### 应用程序接口 (API) 服务 {#api-services}

- ***JSON-RPC*** -应用程序接口 (API) 服务只需要向公有曝光（通过负载平衡器或直接方式   。此应用程序接口 (API) 在所有接口上运行，或在特定 IP 地址上运行（例如：`--json-rpc 0.0.0.0:8545`或 `--json-prc 192.168.1.1:8545`）。:::info
由于这正公开面对 API，建议在应用程序接口 (API) 前备有负载平衡器/逆向代理，以提供安全性与速度限制。
:::


- ***LibP2P*** -
这是节点用于对等通信的网络应用程序接口 (API)。它需要在所有接口或特定 IP 地址上运行(`--libp2p 0.0.0.0:1478`或`--libp2p 192.168.1.1:1478`)。应用程序接口 (API) 不应公开曝光，但它应从所有其他节点重新接入。:::info
如果在本地主机 (`--libp2p 127.0.0.1:1478`)上运行，其他节点将无法连接。
:::


- ***GRPC*** -
应用程序接口 (API) 仅用于运行运算符命令并注意其他内容。因此，它应完全在本地主机（`--grpc-address 127.0.0.1:9632`）上运行。

### Polygon Edge 密钥 {#polygon-edge-secrets}

Polygon Edge 密钥（`ibft`和`libp2p`密钥）不应存储在本地文件系统上  。相反，应使用支持的[密钥管理器](configuration/secret-managers/set-up-aws-ssm)   。将密钥存储到本地文件系统只应用于非生产环境。

## 更新 {#update}

以下是验证者节点的所需更新程序，被描述为分步教程。

### 更新程序 {#update-procedure}

- 从官方 GitHub [版本](https://github.com/0xPolygon/polygon-edge/releases)下载 Polygon Edge 二进制文件
- 停止 Polygon Edge 服务（例如：`sudo systemctl stop polygon-edge.service`）
- `polygon-edge`用下载的二进制文件更换现存的二进制文件（示例：`sudo mv polygon-edge /usr/local/bin/`）
- 通过运行`polygon-edge version`来检查`polygon-edge`版本是否正确 -- 它应与发行版本相对应
- 在开始`polygon-edge`服务之前，检查是否需要执行后向兼容步骤来检查发行存证。
- 启动`polygon-edge`服务（例如：`sudo systemctl start polygon-edge.service`）
- 最后，检查`[ERROR]`日志输出，并确保所有东西都在运行，而没有任何`polygon-edge`日志

:::warning
出现突破版本时，该更新程序必须在所有节点上执行，因为当前运行的二进制文件与新版本不兼容。

这意味着链必须在短时间内停止（直到`polygon-edge`二进制文件更换和服务重新启动）所以要相应地进行计划。

您可以使用诸如 **[Ansible](https://www.ansible.com/)** 等工具或某些自定义脚本高效率执行更新和减少链停机时间。
:::

## 启动程序 {#startup-procedure}

以下是 Polygon Edge 验证者的启动程序的所需流。

- 通读[基础知识](#knowledge-base)节中列出的文档
- 在验证者节点上应用最新操作系统补丁
- 从官方 GitHub [版本](https://github.com/0xPolygon/polygon-edge/releases)下载最新`polygon-edge`二进制文件，并将其放置在本地实例`PATH`中
- 使用 `polygon-edge secrets generate`CLI 命令初始化支持的[密钥管理器](/docs/category/secret-managers)之一
- 使用`polygon-edge secrets init` [CLI 命令](/docs/edge/get-started/cli-commands#secrets-init-flags)生成和存储秘钥
- 请注意`NodeID`和`Public key (address)`值
- 使用 [CLI 命令](/docs/edge/get-started/cli-commands#genesis-flags)`polygon-edge genesis`生成[云设置](get-started/set-up-ibft-on-the-cloud#step-3-generate-the-genesis-file-with-the-4-nodes-as-validators)中所述`genesis.json`的文件
- 使用 [CLI 命令](/docs/edge/configuration/sample-config)`polygon-edge server export`生成默认配置文件
- 编辑`default-config.yaml`文件以容纳本地验证者节点环境（文件路径等）
- 创建 Polygon Edge 服务（`systemd`或类似在），其中`polygon-edge`二进制文件从`default-config.yaml`文件运行服务器
- 通过启动服务来启动 Polygon Edge 服务器（例如：`systemctl start polygon-edge`）
- 检查`polygon-edge`日志输出，并确保区块正在生成，而且没有`[ERROR]`日志
- 通过调用类似[`eth_chainId`](/docs/edge/api/json-rpc-eth#eth_chainid)的 JSON-RPC 方法来检查链功能
