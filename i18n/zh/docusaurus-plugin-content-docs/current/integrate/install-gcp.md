---
id: install-gcp
title: 在 Google 云上部署 Polygon 节点
sidebar_label: Google Cloud Deployment
description: 在 Google Cloud 上简单部署 Polygon 节点
keywords:
- docs
- polygon
- deploy
- nodes
- gcp
- google cloud
slug: install-gcp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# 在 Google 云上部署 Polygon 节点 {#deploy-polygon-nodes-on-google-cloud}

在本文件中，我们将介绍如何将 Polygon 节点部署到 Google Cloud 上的 VM 实例中。

### 硬件要求 {#hardware-requirements}

检查 Polygon Wiki 中最小和建议的[硬件要求](/docs/maintain/validate/validator-node-system-requirements)。

### 软件要求 {#software-requirements}

使用任何具有长期支持的现代 Debian 或 Ubuntu Linux 操作系统，即 Debian 11、Ubuntu 20.04。在本手册中，我们将重点介绍 Ubuntu 20.04

## 部署实例（两种方法） {#deploy-instance-2-ways}

您可以使用至少两种方式在谷歌云中创建一个实例：

* gcloud cli，本地或 [Cloud Shell](https://cloud.google.com/shell)
* 网络控制台

我们将在本手册中介绍第一个案例。让我们从使用 CLI 进行部署开始：
1. 按照[“开始之前”一节](https://cloud.google.com/compute/docs/instances/create-start-instance#before-you-begin)安装和配置 gCloud 命令行工具。注意默认的地区和区域，选择离你或你的客户更近的。您可以使用 [gcping.com](https://gcping.com) 来测量延迟，以选择最近的地点。
2. 必要时，在执行前使用您喜欢的编辑器调整以下命令变量
   * `POLYGON_NETWORK` - 选择`mainnet`或运行`mumbai`测试网
   * `POLYGON_NODETYPE` - 选择`archive`，要运行的`fullnode`节点类型
   * `POLYGON_BOOTSTRAP_MODE` - 选择启动模式`snapshot`或`from_scratch`
   * `POLYGON_RPC_PORT` - 选择要监听的 JSON RPC bor 节点端口，默认值为虚拟机实例创建时和防火墙规则中使用的值
   * `EXTRA_VAR` - 选择 Bor 和 Heimdall 分支，使用`network_version=mainnet-v1`以及`mainnet`网络和`network_version=testnet-v4``mumbai`网络
   * `INSTANCE_NAME` - 我们要创建带有 Polygon 虚拟机实例的名称
   * `INSTANCE_TYPE` - GCP[ 机器类型](https://cloud.google.com/compute/docs/machine-types)，建议使用默认值，如果需要，请稍后更改
   * `BOR_EXT_DISK_SIZE` - 与 Bor 一起使用的额外磁盘大小(GB)，建议使用默认值`fullnode`，如果需要，可以稍后扩展。需要 8192GB 以上的`archive`节点
   * `HEIMDALL_EXT_DISK_SIZE` - 用于 Heimdall 的额外磁盘大小 (GB)，推荐使用默认值
   * `DISK_TYPE` - GCP[ 磁盘类型](https://cloud.google.com/compute/docs/disks#disk-types)，强烈建议使用 SSD。您可能需要增加正在旋转节点的区域的总 SSD GB 配额。

3. 使用以下命令来创建一个具有正确硬件和软件要求的实例。在下面的例子中，我们从`snapshot`通过`fullnode`模式部署 Polygon`mainnet`：
```bash
   export POLYGON_NETWORK=mainnet
   export POLYGON_NODETYPE=fullnode
   export POLYGON_BOOTSTRAP_MODE=snapshot
   export POLYGON_RPC_PORT=8747
   export GCP_NETWORK_TAG=polygon
   export EXTRA_VAR=(bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=${POLYGON_NETWORK})
   gcloud compute firewall-rules create "polygon-p2p" --allow=tcp:26656,tcp:30303,udp:30303 --description="polygon p2p" --target-tags=${GCP_NETWORK_TAG}
   gcloud compute firewall-rules create "polygon-rpc" --allow=tcp:${POLYGON_RPC_PORT} --description="polygon rpc" --target-tags=${GCP_NETWORK_TAG}
   export INSTANCE_NAME=polygon-0
   export INSTANCE_TYPE=e2-standard-8
   export BOR_EXT_DISK_SIZE=1024
   export HEIMDALL_EXT_DISK_SIZE=500
   export DISK_TYPE=pd-ssd
   gcloud compute instances create ${INSTANCE_NAME} \
   --image-project=ubuntu-os-cloud \
   --image-family=ubuntu-2004-lts \
   --boot-disk-size=20 \
   --boot-disk-type=${DISK_TYPE} \
   --machine-type=${INSTANCE_TYPE} \
   --create-disk=name=${INSTANCE_NAME}-bor,size=${BOR_EXT_DISK_SIZE},type=${DISK_TYPE},auto-delete=no \
   --create-disk=name=${INSTANCE_NAME}-heimdall,size=${HEIMDALL_EXT_DISK_SIZE},type=${DISK_TYPE},auto-delete=no \
   --tags=${GCP_NETWORK_TAG} \
   --metadata=user-data='
   #cloud-config

   bootcmd:
   - screen -dmS polygon su -l -c bash -c "curl -L https://raw.githubusercontent.com/maticnetwork/node-ansible/master/install-gcp.sh | bash -s -- -n '${POLYGON_NETWORK}' -m '${POLYGON_NODETYPE}' -s '${POLYGON_BOOTSTRAP_MODE}' -p '${POLYGON_RPC_PORT}' -e \"'${EXTRA_VAR}'\"; bash"'
```
实例应在几分钟内创建完毕

## 登录实例（可选） {#login-to-instance-optional}

安装所有需要的软件需要几十分钟，选择后下载快照需要几小时。您可以看到运行中的`bor`和`heimdalld`进程填满了额外的驱动器。您可以运行下面的命令来对其进行检查。
使用 `gcloud`SSH 包装器连接到实例 SSH 服务：
```bash
gcloud compute ssh ${INSTANCE_NAME}
# inside the connected session
sudo su -

ps uax|egrep "bor|heimdalld"
df -l -h
```
您可以使用以下命令来观察安装过程，这对于`snapshot`引导程序来说非常方便
```bash
# inside the connected session
screen -dr
```
使用`Control+a d`组合键断开与进度审查的连接。

您可以使用以下命令来获取 Bor 和 Heimdall 的日志：
```bash
# inside the connected session
journalctl -fu bor
journalctl -fu heimdalld
```
:::note
区块链数据被保存在额外的驱动器上，这些驱动器默认在虚拟机实例移除时保留。如果您不再需要这些数据，你需要手动移除额外的磁盘。
:::

在结尾，您将获得一个实例，如下面的图表所示：<img src={useBaseUrl("img/mainnet/polygon-instance.svg")} />

如果您在本手册中遇到[问题](https://github.com/maticnetwork/matic-docs/issues) - 请随时在 [GitHub](https://github.com/maticnetwork/matic-docs) 上打开一个问题或[创建一个 PR](https://github.com/maticnetwork/matic-docs/pulls)。
