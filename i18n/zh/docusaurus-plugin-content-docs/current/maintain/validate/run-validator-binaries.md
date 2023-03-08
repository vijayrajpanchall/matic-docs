---
id: run-validator-binaries
title: 从 Binaries 上运行验证者节点
sidebar_label: Using Binaries
description: 使用 Binaries 设置验证者节点
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
slug: run-validator-binaries
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
本指南中的步骤涉及等待 H**eimdall **及 B**or **服务以充分同步。或者，可以使用维护快照，这将把同步时间减少到几个小时。详细说明请见[<ins>《Heimdall 和 Bor 快照指南》。</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233)

有关快捷下载链接，请参见 [<ins>Polygon 链接链</ins>](https://snapshot.polygon.technology/)接。

:::

本指南将指导如何从二进制文件运行 Polygon 验证者节点。

对于系统要求，请遵[循验证者节点系统要求](validator-node-system-requirements.md)指南。

如果您希望通过 Animitre 开始并运行验证者节点，请参见[使用 Animitre 运行 Validator 节点。](run-validator-ansible.md)

:::caution

接受新验证者的空间有限。新的验证者只有在已经有效验证者解除键时，才可以加入活跃集合。

:::

## 先决条件 {#prerequisites}

* 两台机器 — 1 台 [Sentry](/docs/maintain/glossary.md#sentry)，1 台[验证者](/docs/maintain/glossary.md#validator)。
* `build-essential`Sentry 和验证机器上都安装了这个程序。

  安装：

  ```sh
  sudo apt-get install build-essential
  ```

* Sentry 和验证机上都安装了 Go 1.18。

  安装：

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* RabbitMQ 安装在监护器和验证者机上。

以下是安装 RabbitMQ 的命令：

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

检查[<ins>有关</ins>](https://www.rabbitmq.com/download.html)下载和安装 RabbitMQ 的更多信息。

:::


:::info
请遵循 ploXrounte 指示上的步骤，将节点连接到 [<ins>plo</ins>](/maintain/validate/bloxroute.md)Xroune 网关。
:::

## 概述 {#overview}

要访问正在运行的验证者节点，请按照以下**步骤顺序**执行以下操作：

:::caution

如果不按顺序执行这些步骤，将遇到配置问题。重点是要记住 Sentry 节点必须始终设置在验证者节点之前。

:::

1. 准备两台机器，一台用于 Sentry 节点，另一台用于验证者节点。
2. 在 Sentry 和验证机器上安装 Heimdall 和 Bor 二进制文件。
3. 在 Sentry 和验证机器上设置 Heimdall 和 Bor 服务文件。
4. 在 Sentry 和验证机器上设置 Heimdall 和 Bor 服务。
5. 配置 Sentry 节点。
6. 启动 Sentry 节点。
7. 配置验证者节点。
8. 设置所有者和签名者密钥。
9. 启动验证者节点。
10. 与社区一起检查节点的运行状况。

## 安装二进制文件 {#installing-the-binaries}

在 Sentry 和验证机上均安装二进制文件。

### 安装 Heimdall {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview) 是权益证明验证节点层负责将 Plasma 区块展示检查到以太坊主网。

最新版本的 [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) 包含一些增强功能，如：
1. 将状态同步 txs 中的数据大小限制为：
    * **用字节**表示时为**30Kb**
    * 以**字符串**表示时为**60Kb**。
2. 增加不同验证者合约事件间的 **延迟时间**，以确保在事件爆发的情况下，内存池不会很快被填满，这可能会阻碍链的进展。

下面的例子说明了如何限制数据的大小：

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

克隆 [Heimdall 存储库](https://github.com/maticnetwork/heimdall/)：

```sh
git clone https://github.com/maticnetwork/heimdall
```

导航到正确的[发行版本](https://github.com/maticnetwork/heimdall/releases)：

```sh
git checkout RELEASE_TAG
```

其中`RELEASE_TAG`是安装的发布版本的标签。

例如：

```sh
git checkout v0.3.0
```

一旦找到正确的版本，请安装 Heimdall：

```sh
make install
source ~/.profile
```

检查 Heimdall 安装：

```sh
heimdalld version --long
```

:::note

在继续运行之前，Heimdall 应该安装在 Sentry 和验证机上。

:::

### 安装 Bor {#installing-bor}

[Bor](/docs/pos/bor) 是一个使用区块生产层的侧链操作者，它与 Heimdall 同步来选择区块生产者和验证者，用于每个[跨度](/docs/maintain/glossary.md#span)和[冲刺。](/docs/maintain/glossary.md#sprint)

克隆 [Bor 存储库](https://github.com/maticnetwork/bor)：

```sh
git clone https://github.com/maticnetwork/bor
```

导航到正确的[发行版本](https://github.com/maticnetwork/bor/releases)：

```sh
git checkout RELEASE_TAG
```

其中`RELEASE_TAG`是安装的发布版本的标签。

例如：

```sh
git checkout v0.3.3
```

安装 Bor：

```sh
make bor-all
```

创建 symlinks：

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

检查 Bor 安装：

```sh
bor version
```

:::note

在继续运行之前，Bor 应该安装在 Sentry 和验证机上。

:::

## 设置节点文件 {#setting-up-node-files}

:::note

节点文件需要在 Sentry 和验证机上进行设置。

:::

### 获取启动存储库 {#fetching-the-launch-repository}

克隆[启动存储库](https://github.com/maticnetwork/launch)：

```sh
git clone https://github.com/maticnetwork/launch
```

### 设置启动目录 {#setting-up-the-launch-directory}

#### 在 Sentry 机上 {#on-the-sentry-machine}

创建一个`node`目录：

```sh
mkdir -p node
```

将文件和脚本从这个`node`目录复制到`launch`目录：

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### 在验证机上 {#on-the-validator-machine}

创建一个`node`目录：

```sh
mkdir -p node
```

将文件和脚本从这个`node`目录复制到`launch`目录：

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### 设置网络目录 {#setting-up-the-network-directories}

:::note

在 Sentry 和验证机上都要运行这部分。

:::

#### 设置 Heimdall {#setting-up-heimdall}

更改到`node`目录：

```sh
cd ~/node/heimdall
```

运行设置脚本：

```sh
bash setup.sh
```

#### 设置 Bor {#setting-up-bor}

更改到`node`目录：

```sh
cd ~/node/bor
```

运行设置脚本：

```sh
bash setup.sh
```

## 设置服务 {#setting-up-the-services}

:::note

在 Sentry 和验证机上都要运行这部分。

:::

导航到`node`目录：

```sh
cd ~/node
```

运行设置脚本：

```sh
bash service.sh
```

将服务文件复制到系统目录：

```sh
sudo cp *.service /etc/systemd/system/
```

## 配置 Sentry 节点 {#configuring-the-sentry-node}

首先登录到远程 Sentry 机。

### 配置 Heimdall 服务 {#configuring-the-heimdall-services}

打开 Heimdall 配置文件进行编辑：

```sh
vi ~/.heimdalld/config/config.toml
```

在`config.toml`中，改变以下参数：

* `moniker` — 任何名称。示例：`moniker = "my-sentry-node"`。
* `seeds` — 种子节点地址由一个节点 ID、一个 IP 地址和一个端口组成。

  使用下列值：

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — 设置该值为`true`以启用对等体交换。示例：`pex = true`。
* `private_peer_ids` — 在验证机上设置的 Heimdall 节点 ID。

为了获得验证机上 Heimdall 的节点 ID：

  1. 登录验证机。
  2. 运行：
     ```sh
     heimdalld tendermint show-node-id
     ```

  示例：`private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`。

* `prometheus` — 设置该值为`true`以启用 Prometheus 指标。示例：`prometheus = true`。
* `max_open_connections` — 设置值为`100`。示例：`max_open_connections = 100`。

在`config.toml`中保存更改。

### 配置 Bor 服务 {#configuring-the-bor-service}

打开 Bor 配置文件进行编辑：

```sh
`vi ~/node/bor/start.sh`
```

在`start.sh`中，添加由一个节点 ID、一个 IP 地址和一个端口组成的引导节点地址在文件的末尾添加以下一行：

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

在`start.sh`中保存更改。

### 配置防火墙 {#configuring-a-firewall}

Sentry 机必须向世界开放以下端口`0.0.0.0/0`：

* `26656`-Heimdall 服务将连接节点和其他节点的 Heimdall 服务。

* `30303`-Bor  服务将连接节点和其他节点的 Bor 服务。

* `22`-以便验证者能够从任何位置使用 ssh。

## 启动 Sentry 节点 {#starting-the-sentry-node}

将首先启动 Heimdall 服务。一旦 Heimdall 服务同步，将启动 Bor 服务。

:::note

如前所述，Heimdall 服务需要几天时间才能完全同步。

或者，可以使用维护快照，这将把同步时间减少到几个小时。详细说明请见[<ins>《Heimdall 和 Bor 快照指南》。</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233)

关于快照的下载链接，请参见 [Polygon Chains 快照。](https://snapshot.polygon.technology/)

:::

### 启动 Heimdall 服务 {#starting-the-heimdall-service}

启动 Heimdall 服务：

```sh
sudo service heimdalld start
```

启动 Heimdall REST 服务器：

```sh
sudo service heimdalld-rest-server start
```

查看 Heimdall 服务日志：

```sh
journalctl -u heimdalld.service -f
```

:::note

在日志中，可能看到下列错误：

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

这些日志表示网络上的一个节点拒绝连接到您的节点。等待您的节点在网络上抓取更多的节点；您无需执行任何操作以应对这些错误。

:::

查看 Heimdall REST 服务器日志：

```sh
journalctl -u heimdalld-rest-server.service -f
```

检查 Heimdall 的同步状态：

```sh
curl localhost:26657/status
```

在输出中，该`catching_up`值为：

* `true` — Heimdall 服务正在同步。
* `false` — Heimdall 服务完全同步。

等待 Heimdall 服务完全同步。

### 启动 Bor 服务 {#starting-the-bor-service}

Heimdall 服务同步后，启动 Bor 服务。

启动 Bor 服务：

```sh
sudo service bor start
```

查看 Bor 服务日志：

```sh
journalctl -u bor.service -f
```

## 配置验证者节点 {#configuring-the-validator-node}

:::note

要完成这一部分，您必须准备好完全同步的以太坊主网节点的RPC 端点。

:::

### 配置 Heimdall 服务 {#configuring-the-heimdall-service}

登录到远程验证机。

打开编辑`vi ~/.heimdalld/config/config.toml`。

`config.toml`更改如下：

* `moniker` — 任何名称。示例：`moniker = "my-validator-node"`。
* `pex` — 设置该值为`false`以关闭对等体交换。示例：`pex = false`。
* `private_peer_ids` — 注释出该值以使其失效。如：`# private_peer_ids = ""`。

  为了获得 Heimdall 在 Sentry 机上的节点 ID：

  1. 登录到 Sentry 机。
  1. 运行`heimdalld tendermint show-node-id`。

示例：`persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — 设置该值为`true`以启用 Prometheus 指标。示例：`prometheus = true`。

在`config.toml`中保存更改。

打开编辑`vi ~/.heimdalld/config/heimdall-config.toml`。

`heimdall-config.toml`更改如下：

* `eth_rpc_url` — 一个完全同步的以太坊主网节点的 RPC 端点，如 Infura。`eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

示例：`eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

在`heimdall-config.toml`中保存更改。

### 配置 Bor 服务 {#configuring-the-bor-service-1}

打开编辑`vi ~/.bor/data/bor/static-nodes.json`。

`static-nodes.json`更改如下：

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — 节点 ID 以及Sentry 机上设置的 Bor 的 IP 地址。

  要获得 Sentry 机上 Bor 的节点 ID：

  1. 登录到 Sentry 机。
  2. 运行`bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`。

  示例：`"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`。

在`static-nodes.json`中保存更改。

## 设置所有者和签名者密钥 {#setting-the-owner-and-signer-key}

在 Polygon 上，建议保持所有者和签署者的密钥不同。

* 签名者 — 签署[检查点交易](/docs/maintain/glossary.md#checkpoint-transaction)的地址。该建议是以便在签名者地址上保留至少 1 个以太币。
* 所有者 — 做质押交易的地址。该建议是维护 Matic在所有者地址上的代币。

### 生成 Heimdall 私钥 {#generating-a-heimdall-private-key}

必须只在验证机上生成一个 Heimdall 私钥。不要生成 Heimdall在 Sentry 机上的私钥。

要生成私钥，请运行：

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

位置

* ETHEREUM_PRIVATE_KEY — 以太坊钱包的私钥。

这将生成`priv_validator_key.json`。将生成的 JSON 文件移至 Heimdall 配置目录中：

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### 生成 Bor 钥库文件 {#generating-a-bor-keystore-file}

必须只在验证机上生成一个 Bor 钥库文件。不要生成 Bor 钥库文件在 Sentry 机上。

要生成私钥，请运行：

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

位置

* ETHEREUM_PRIVATE_KEY — 以太坊钱包的私钥。

当出现提示时，请设置一个钥库文件的密码。

这将生成一个`UTC-<time>-<address>`钥库文件。

将生成的钥库文件移到 Bor 配置目录下：

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### 添加 password.txt {#add-password-txt}

请创建一个`password.txt`文件，然后将 Bor 钥库文件的密码直接添加在
`~/.bor/password.txt`文件中。

### 添加以太坊地址 {#add-your-ethereum-address}

打开编辑`vi /etc/matic/metadata`。

在`metadata`中，添加您的以太坊地址。示例：`VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`。

在`metadata`中保存更改。

## 启动验证者节点 {#starting-the-validator-node}

此时，必须具备：

* Sentry 机上的 Heimdall 服务同步并正在运行。
* Sentry 机上的 Bor 服务正在运行。
* 在验证机上配置的 Heimdall 服务和 Bor 服务。
* 所有者和签名者的密钥已配置好。

### 启动 Heimdall 服务 {#starting-the-heimdall-service-1}

现在将在验证机上启动 Heimdall 服务。Heimdall 服务同步后，您就可以在验证器机器上启动 Bor 服务。

启动 Heimdall 服务：

```sh
sudo service heimdalld start
```

启动 Heimdall REST 服务器：

```sh
sudo service heimdalld-rest-server start
```

启动 Heimdall 桥接：

```sh
sudo service heimdalld-bridge start
```

查看 Heimdall 服务日志：

```sh
journalctl -u heimdalld.service -f
```

查看 Heimdall REST 服务器日志：

```sh
journalctl -u heimdalld-rest-server.service -f
```

查看 Heimdall 桥接日志：

```sh
journalctl -u heimdalld-bridge.service -f
```

检查 Heimdall 的同步状态：

```sh
curl localhost:26657/status
```

在输出中，该`catching_up`值为：

* `true` — Heimdall 服务正在同步。
* `false` — Heimdall 服务同步。

等待 Heimdall 服务完全同步。

### 启动 Bor 服务 {#starting-the-bor-service-1}

验证机上的 Heimdall 服务同步了，就启动 Bor 服务在验证机上。

启动 Bor 服务：

```sh
sudo service bor start
```

查看 Bor 服务日志：

```sh
journalctl -u bor.service -f
```

## 与社区进行运行检查 {#health-checks-with-the-community}

现在，Sentry 和验证器节点已经同步运行，请前往[Discord](https://discord.com/invite/0xPolygon)，并要求社区对节点进行运行检查。

:::note

作为验证者，必须始终检查签名者地址。如果ETH 余额达到低于 0.5 ETH，则应予以重新整理。避免此次会推出提交检查点交易的节点。

:::

## 接下来的步骤：质押 {#next-steps-staking}

现在已经对 Sentry 和验证器节点进行了运行检查，接着是[质押](/docs/maintain/validator/core-components/staking.md)指南开始支持网络。
