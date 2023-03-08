---
id: run-validator-ansible
title: 使用可传染性运行验证者节点
sidebar_label: Using Ansible
description: 使用 Andive 来在 Polygon 上设置验证者节点
keywords:
  - docs
  - matic
  - polygon
  - ansible
  - node
  - validator
  - sentry
slug: run-validator-ansible
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
本指南中的步骤包括等待 **Heimdall** 和 **Bor** 服务完全同步。这个过程需要几天时间才能完成。或者，可以使用维护快照，这将把同步时间减少到几个小时。详细说明请见[<ins>《Heimdall 和 Bor 快照指南》。</ins>](/docs/operate/snapshot-instructions-heimdall-bor)

有关快捷下载链接，请参见 [<ins>Polygon 链接链</ins>](https://snapshot.polygon.technology/)接。
:::

本节将指导您通过 Ansible playbook 启动和运行验证者节点。

有关系统要求，请参阅 [验证节点系统要求](validator-node-system-requirements.md)。

如果您想通过二进制文件启动和运行验证者节点，请参阅 [《通过二进制文件运行验证者节点》](run-validator-binaries.md)。

:::caution

接受新验证者的空间有限。新的验证者只有在已经有效验证者解除键时，才可以加入活跃集合。

:::

## 先决条件 {#prerequisites}

* 三台机器 — 一台本地机器，您将在其上运行 Ansible playbook；两台远程计算机 — 一台 [sentry](/docs/maintain/glossary.md#sentry)和一台[验证者](/docs/maintain/glossary.md#validator)。
* 在本地计算机上安装了 [Ansible](https://www.ansible.com/)。
* 在本地机器上，安装了 [Python 3.x](https://www.python.org/downloads/)。
* 在远程机器上，确保*没有*安装 Go。
* 在远程计算机上，本地计算机的 SSH 公钥位于远程计算机上，以便 Ansible 连接到它们。
* 我们有 Bloxroute 作为中继网络。如果您需要添加网关，作为您的可信同伴，请联系 [Polygon Discord](https://discord.com/invite/0xPolygon) > POS VALIDCER 中的**@validator-支持团队**。

:::info

请遵循 ploXrounte 指示上的步骤，将节点连接到 [<ins>plo</ins>](/maintain/validate/bloxroute.md)Xroune 网关。

:::

## 概述 {#overview}

:::caution

您必须遵循**精确概述的操作序列，**否则您将进入问题。例如，**在验证者节点之前，必须始终设置点节点。**

:::

要访问正在运行的验证者节点，请执行以下操作：

1. 准备好三台机器。
1. 通过 Ansible 设置 sentry 节点。
1. 通过 Ansible 设置验证者节点。
1. 配置 Sentry 节点。
1. 启动 Sentry 节点。
1. 配置验证者节点。
1. 设置所有者和签名者密钥。
1. 启动验证者节点。
1. 与社区一起检查节点的运行状况。

## 设置 sentry 节点 {#set-up-the-sentry-node}

在您的本地机器上，克隆 [node-ansible 存储库](https://github.com/maticnetwork/node-ansible)：

```sh
git clone https://github.com/maticnetwork/node-ansible
```

更改为克隆的存储库：

```sh
cd node-ansible
```

将远程机器的 IP 地址添加到`inventory.yml`文件中，这些远程机器将成为 sentry 和验证者节点。

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for sentry node
        xxx.xxx.xx.xx: # <----- Add IP for second sentry node (optional)
    validator:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for validator node
```

示例：

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        188.166.216.25:
    validator:
      hosts:
        134.209.100.175:
```

检查远程 sentry 机器是否可访问。在本地计算机上，运行：

```sh
$ ansible sentry -m ping
```

您应该将其作为输出：

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

对 sentry 节点设置进行测试运行：

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

这是输出结果：

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

以 sudo 权限运行 sentry 节点设置：

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

一旦设置完成，你将在终端上看到一条完成信息。

:::note

如果你遇到了问题，想要重新开始，请执行以下命令：

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## 设置验证者节点 {#set-up-the-validator-node}

此时，您已经设置了 sentry 节点。

在本地机器上，您还设置了 Ansible playbook 以运行验证者节点设置。

检查远程验证者机器是否可访问。在本地机器上，运行 `ansible validator -m ping`。

您应该将其作为输出：

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

对验证者节点设置进行测试运行：

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

您应该将其作为输出：

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

使用 sudo 权限运行验证者节点设置：

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

一旦设置完成，你将在终端上看到一条完成信息。

:::note

如果你遇到了问题，想要重新开始，请执行以下命令：

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## 配置 sentry 节点 {#configure-the-sentry-node}

登录远程 sentry 机器。

### 配置 Heimdall 服务 {#configure-the-heimdall-service}

打开`config.toml`编辑`vi ~/.heimdalld/config/config.toml`。

更改以下内容：

* `moniker` — 任何名称。示例：`moniker = "my-full-node"`。
* `seeds` — 种子节点地址由一个节点 ID、一个 IP 地址和一个端口组成。

  使用下列值：

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — 设置该值为`true`以启用对等体交换。示例：`pex = true`。
* `private_peer_ids` — 在验证机上设置的 Heimdall 节点 ID。

  为了获得验证机上 Heimdall 的节点 ID：

  1. 登录到验证者机器。
  1. 运行`heimdalld tendermint show-node-id`。

  示例：`private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`

* `prometheus` — 设置该值为`true`以启用 Prometheus 指标。示例：`prometheus = true`。
* `max_open_connections` — 设置值为`100`。示例：`max_open_connections = 100`。

在`config.toml`中保存更改。

### 配置 Bor 服务 {#configure-the-bor-service}

打开编辑 `vi ~/node/bor/start.sh`。

在 `start.sh` 中，添加由节点 ID、IP 地址和端口组成的引导节点地址，在末尾添加如下行：

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

在`start.sh`中保存更改。

打开编辑`vi ~/.bor/data/bor/static-nodes.json`。

`static-nodes.json`更改如下：

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"`— 在验证者机器上设置的 Bor 的节点 ID 和 IP 地址。

  在验证者机器上获取 Bor 的节点 ID：

  1. 登录到验证者机器。
  1. 运行`bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`。

  示例：`"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`。

在`static-nodes.json`中保存更改。

### 配置防火墙 {#configure-firewall}

Sentry 机必须向世界开放以下端口`0.0.0.0/0`：

* 26656-您的 Heimdall 服务将使用 Heimdall 服务将您的节点连接到其他节点。

* 30303-您的 Bor 服务将使用 Bor 服务将您的节点连接到其他节点。

* 22- 让验证者能够从他/她所在的任何地方进行 ssh。

:::note

但是，如果他们使用 VPN 连接，则只能允许来自 VPN IP 地址的传入 ssh 连接。

:::

## 启动 Sentry 节点 {#start-the-sentry-node}

将首先启动 Heimdall 服务。一旦 Heimdall 服务同步，将启动 Bor 服务。

:::note

Heimdall 服务从头开始完全同步需要几天时间。

或者，可以使用维护快照，这将把同步时间减少到几个小时。详细说明请见[<ins>《Heimdall 和 BOR 快照指南》</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233)。

关于快照的下载链接，请参见 [《Polygon Chains 快照》](https://snapshot.polygon.technology/)。

:::

### 启动 Heimdall 服务 {#start-the-heimdall-service}

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

这些日志表示网络上的一个节点拒绝连接到您的节点。您无需对这些错误执行任何操作。等待您的节点在网络上抓取更多的节点。

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

### 启动 Bor 服务 {#start-the-bor-service}

Heimdall 服务完全同步后，启动 Bor 服务。

启动 Bor 服务：

```sh
sudo service bor start
```

查看 Bor 服务日志：

```sh
journalctl -u bor.service -f
```

## 配置验证者节点 {#configure-the-validator-node}

:::note

要完成这一部分，必须准备好完全同步的以太坊主网的 RPC 端点。

:::

### 配置 Heimdall 服务 {#configure-the-heimdall-service-1}

登录到远程验证者机器。

打开`config.toml`编辑`vi ~/.heimdalld/config/config.toml`。

更改以下内容：

* `moniker` — 任何名称。示例：`moniker = "my-validator-node"`。
* `pex` — 设置该值为`false`以关闭对等体交换。示例：`pex = false`。
* `private_peer_ids` — 注释出该值以使其失效。如：`# private_peer_ids = ""`。


  为了获得 Heimdall 在 Sentry 机上的节点 ID：

  1. 登录到 Sentry 机器。
  1. 运行`heimdalld tendermint show-node-id`。

  示例：`persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — 设置该值为`true`以启用 Prometheus 指标。示例：`prometheus = true`。

在`config.toml`中保存更改。

打开编辑`vi ~/.heimdalld/config/heimdall-config.toml`。

`heimdall-config.toml`更改如下：

* `eth_rpc_url` — 一个完全同步的以太坊主网节点的 RPC 端点，即 Infura。`eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

示例：`eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


在`heimdall-config.toml`中保存更改。

### 配置 Bor 服务 {#configure-the-bor-service-1}

打开编辑 `vi ~/.bor/data/bor/static-nodes.json`。

`static-nodes.json`更改如下：

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"`— 在 sentry 机器上设置的 Bor 的节点 ID 和 IP 地址。

  要获得 Sentry 机上 Bor 的节点 ID：

  1. 登录到 Sentry 机器。
  1. 运行`bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`。

  示例：`"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`。

在`static-nodes.json`中保存更改。

## 设置所有者和签名者密钥 {#set-the-owner-and-signer-key}

在 Polygon 上，你应该保持所有者和签名者的密钥不同。

* 签名者 — 签署[检查点交易](../glossary#checkpoint-transaction)的地址。建议在签名者地址上至少保留一个以太币。
* 所有者 — 做质押交易的地址。建议将 MATIC 代币保留在所有者地址上。

### 生成 Heimdall 私钥 {#generate-a-heimdall-private-key}

必须只在验证机上生成一个 Heimdall 私钥。**不要在 Sentry 机上生成 Heimdall 私钥。**

要生成私钥，请运行：

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

EhereUM_Previtate_Key –您的以太坊钱包的私钥

:::

这将生成`priv_validator_key.json`。将生成的 JSON 文件移动到 Heimdall 配置目录：

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### 生成 Bor 密钥库文件 {#generate-a-bor-keystore-file}

必须只在验证机上生成一个 Bor 钥库文件。**不要在 sentry 机上生成 Bor 密钥库文件。**

要生成私钥，请运行：

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — 以太坊钱包的私钥。

:::

当出现提示时，请设置一个钥库文件的密码。

这将生成一个`UTC-<time>-<address>`钥库文件。

将生成的钥库文件移到 Bor 配置目录下：

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### 添加`password.txt`

确保创建一个`password.txt`文件，然后在`~/.bor/password.txt`文件中添加 Bor 密钥库文件密码。

### 添加以太坊地址 {#add-your-ethereum-address}

打开编辑`vi /etc/matic/metadata`。

在`metadata`中，添加您的以太坊地址。示例：`VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`。

在`metadata`中保存更改。

## 启动验证者节点 {#start-the-validator-node}

此时，必须具备：

* Sentry 机上的 Heimdall 服务完全同步并运行。
* Sentry 机上的 Bor 服务正在运行。
* 在验证机上配置的 Heimdall 服务和 Bor 服务。
* 所有者和签名者的密钥已配置好。

### 启动 Heimdall 服务 {#start-the-heimdall-service-1}

现在将在验证机上启动 Heimdall 服务。一旦 Heimdall 服务同步，您开始在验证机上启动 BOR 服务。

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
* `false` — Heimdall 服务完全同步。

等待 Heimdall 服务完全同步。

### 启动 Bor 服务 {#start-the-bor-service-1}

一旦验证机上的 Heimdall 服务完全同步开始，就在验证机上启动 BOR 服务。

启动 Bor 服务：

```sh
sudo service bor start
```

查看 Bor 服务日志：

```sh
journalctl -u bor.service -f
```

## 与社区一起检查节点的运行状况。 {#check-node-health-with-the-community}

现在，您的 sentry 和验证者节点已经同步并运行，请前往 [Discord](https://discord.com/invite/0xPolygon)，让社区对您的节点进行运行检查。

:::note

作为验证者，必须始终检查签名者地址。如果ETH 余额达到低于 0.5 ETH，则应予以重新整理。避免此次会推出提交检查点交易的节点。

:::

## 进行质押 {#proceed-to-staking}

现在您已经检查了 sentry 和验证者节点的运行状况，请继续进行[质押](/docs/maintain/validator/core-components/staking)。
