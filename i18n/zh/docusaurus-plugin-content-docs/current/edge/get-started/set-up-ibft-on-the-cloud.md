---
id: set-up-ibft-on-the-cloud
title: 云设置
description: "分步云设置指南。"
keywords:
  - docs
  - polygon
  - edge
  - cloud
  - setup
  - genesis
---

:::info 此指南用于主网或测试网设置

以下指南将指示您如何在云提供者上设置 polygon Edge 网络，以便设置您的测试网或主网。

如果您希望在本地设置 polygon 边缘网络，以便测试`polygon-edge`，然后再使用类似生产的设置，请参阅**[本地设置程序](/docs/edge/get-started/set-up-ibft-locally)**
:::

## 要求 {#requirements}

请参阅[安装](/docs/edge/get-started/installation)部分以安装 Polygon Edge。

### 设置 VM 连接 {#setting-up-the-vm-connectivity}

根据您选择的云提供者，您可以使用防火墙设置 VM 之间的连接和规则，安全性组，或访问控制列表。

由于需要接触其他 VM 的`polygon-edge`的唯一部分是 libp2p 服务器，仅允许默认 libp2p 端口上的所有 VM 之间的通信`1478`已经足够。

## 概述 {#overview}

![云设置](/img/edge/ibft-setup/cloud.svg)

在本指南中，我们的目标是建立一个使用 [IBFT 共识协议](https://github.com/ethereum/EIPs/issues/650)的`polygon-edge`区块链网络。区块链网络将由 4 个 NODE 组成，这 4 个 NODE 都是验证者节点，因此有资格提议区块，并验证来自其他提议者的区块。4 个节点中的每一个节点在其自身的 VM 上运行，因为指南的想法是为您提供功能全面的 Polygon Edge 网络，同时保持验证者的私有性，以确保无信任网络设置。

为了实现这一目标，我们将指导您完成 4 个简单的步骤：

0. 查看上述**要求**列表
1. 生成每个验证者的私钥，并初始化数据目录
2. 准备要放置到共享的`genesis.json`的bootnode 的连接字符串
3. 在本地机器上创建`genesis.json`，并将其发送/传输到每个节点
4. 开始所有节点

:::info 验证者数量

集群中的节点数量没有最少，这意味着只有 1 个验证者节点的集群是可能的。请记住，使用_单一_的 NODE 集群，**没有崩溃公差**，**也没有 BFT 保证**。

实现 BFT 保证的最小建议节点编号是 4 - 因为在 NODE 集群中，可以容许 1 个 NODE 失败，其余的 3 个 NODE 正常运行。

:::

## STEP 1：初始数据文件夹并生成验证者密钥 {#step-1-initialize-data-folders-and-generate-validator-keys}

要启动并运行 Polygon Edge，您需要在每个 NODE 上初始化数据文件夹：


````bash
node-1> polygon-edge secrets init --data-dir data-dir
````

````bash
node-2> polygon-edge secrets init --data-dir data-dir
````

````bash
node-3> polygon-edge secrets init --data-dir data-dir
````

````bash
node-4> polygon-edge secrets init --data-dir data-dir
````

这些命令中的每个命令都将打印验证者密钥、bls 公钥和 [NODE ID](https://docs.libp2p.io/concepts/peer-id/)。您将需要第一个 NODE 的 NODE ID，以供下一步使用。

### 输出机密 {#outputting-secrets}
如果需要，可以再次检索机密输出。

```bash
polygon-edge secrets output --data-dir test-chain-4
```

:::warning 将数据目录保持在自己手上！

上述生成的数据目录，除了初始化持有区块链状态的目录外，还会生成验证者私钥。**密钥应妥善保管，若被盗，将使某人能够模仿您成为网络中的验证者！**
:::

## STEP 2：为 bootnode 准备 multiaddr 连接字符串 {#step-2-prepare-the-multiaddr-connection-string-for-the-bootnode}

成功建立连接的 NODE 必须知道要连接的`bootnode`服务器可获得有关网络上的所有剩余节点的信息。该`bootnode`有时也被称为 p2p jargon 中的`rendezvous`服务器。

`bootnode`不是 Polygon Edge 节点的特殊实例。每一个 Polygon Edge 节点可以作为一个`bootnode`，并且每一个 Polygon Edge 节点都需要一组可联系这些节点的指定的 bootnode，以便提供有关如何与网络中所有剩余节点连接的信息。

创建用于指定 bootnode 的连接字符串，我们需要符合[multiaddr 格式](https://docs.libp2p.io/concepts/addressing/)：
```
/ip4/<ip_address>/tcp/<port>/p2p/<node_id>
```

在本指南中，我们将把第一个和第二个节点作为所有其他节点的 bootnode。此情景中将发生的事情是连接到 `node 1`或 `node 2`的节点将获取有关如何通过相互联系的 bootnode 相互连接的信息。

:::info 您需要指定至少一个 bootnode 来开始 NODE

至少需要**一个** bootnode，以便网络中的其他 NODE 可以相互发现。建议更多 bootnode，如它们在出现停电时提供了网络的复原力。在本指南中，我们将列出两个节点，但这可以随时更改，而不影响`genesis.json`文件的有效性。
:::

由于 multiaddr 连接字符串的第一部分是`<ip_address>`，在这里您需要以其他节点可接收的形式输入地址，这取决于您的设置（可能是私有或公有地址，而不是`127.0.0.1`）。

对于`<port>`，我们将使用`1478`，因为这是默认的 libp2p 端口。

最后，我们需要从以前运行命令`polygon-edge secrets init --data-dir data-dir`命令的输出中获得`<node_id>`（用于生成密钥和`node 1`的数据目录）

装配后，我们将用作 bootnode 的 `node 1` 的 multiaddr 连接字符串将如下所示（只有末尾的 `<node_id>` 应该不同）：
```
/ip4/<public_or_private_ip>/tcp/1478/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW
```
同样，我们为第二个 bootnode 构建 multiaddr，如下所示
```
/ip4/<public_or_private_ip>/tcp/1478/p2p/16Uiu2HAmS9Nq4QAaEiogE4ieJFUYsoH28magT7wSvJPpfUGBj3Hq
```
:::info DNS 主机名称而不是 ips

Polygon Edge 支持使用用于 NODE 配置的 DNS 主机名称。这是基于云的部署的一个非常有用的功能，因为 Node 的 ip 可能因为各种原因而更改。

使用 DNS 主机名称时，连接字符串的 multiaddr 格式如下：`/dns4/sample.hostname.com/tcp/<port>/p2p/nodeid`

:::

## STEP 3：使用 4 个节点生成 genesis 文件作为验证者 {#step-3-generate-the-genesis-file-with-the-4-nodes-as-validators}

本 STEP 可在本地机器上运行，但您需要 4 个验证者中的每一个的公有验证者密钥。

验证者可以安全地将以下所示的`Public key (address)`共享到其`secrets init`命令的输出中，以便您可以使用初始验证者集中的验证者安全生成 genesis.json，这些验证者由公有密钥识别：

```
[SECRETS INIT]
Public key (address) = 0xC12bB5d97A35c6919aC77C709d55F6aa60436900
BLS Public key       = 0x9952735ca14734955e114a62e4c26a90bce42b4627a393418372968fa36e73a0ef8db68bba11ea967ff883e429b3bfdf
Node ID              = 16Uiu2HAmVZnsqvTwuzC9Jd4iycpdnHdyVZJZTpVC8QuRSKmZdUrf
```

鉴于您已收到验证者的所有 4 个公钥，您可以运行以下命令，以生成`genesis.json`

````bash
polygon-edge genesis --consensus ibft --ibft-validator 0xC12bB5d97A35c6919aC77C709d55F6aa60436900:0x9952735ca14734955e114a62e4c26a90bce42b4627a393418372968fa36e73a0ef8db68bba11ea967ff883e429b3bfdf --ibft-validator <2nd validator IBFT public key>:<2nd validator BLS public key> --ibft-validator <3rd validator IBFT public key>:<3rd validator BLS public key> --ibft-validator <4th validator IBFT public key>:<4th validator BLS public key> --bootnode=<first_bootnode_multiaddr_connection_string_from_step_2> --bootnode <second_bootnode_multiaddr_connection_string_from_step_2> --bootnode <optionally_more_bootnodes>
````

此命令的作用：

* 此`--ibft-validator`设置应列入 genesis 区块中的初始验证者的验证者的公钥。可能有许多初始验证者。
* 此`--bootnode`设置 bootnode 的地址，使节点能够相互找到。我们将使用 **STEP 2** 中提到的`node 1`的 multiaddr STRING，尽管您添加了您想要的很多 bootnode，如上所示。

:::info 切换到 ECDSA

BLS 是一个区块头的默认验模式。如果您希望在 ECDSA 模式下运行链，您可以使用标志`—ibft-validator-type`，并使用参数`ecdsa`：

```
genesis --ibft-validator-type ecdsa
```
:::

:::info 预挖掘账户余额

您可能希望设置区块链网络，并附有“预挖掘”余额的地址。

要实现此目的，请通过您希望使用区块链上的某个余额初始化的每个地址的尽可能多的`--premine`标志。

例如，如果我们希望预先排定 1000 个以太币到我们的 genesis 区块中的地址`0x3956E90e632AEbBF34DEB49b71c28A83Bc029862`，那么我们需要提供以下参数：

```
--premine=0x3956E90e632AEbBF34DEB49b71c28A83Bc029862:1000000000000000000000
```

**请注意预挖掘数量以 WEI 为单位，而不是以太币。**

:::

:::info 设置区块燃料限制

每个区块的默认燃料限制是`5242880`。此值已在 genesis 文件中写入，但您可能希望增加/减少它。

要这样做，您可以在所需值后使用标志`--block-gas-limit`，如下所示：

```shell
--block-gas-limit 1000000000
```

:::

:::info 设置系统文件描述者限制

默认文件描述者限制（开放文件的最大数量）可能很低，在Linux上，所有东西都是文件。如果节点的输入量会高，您可以考虑增加此限额。查看您的 linux 磁盘的官方文件，以了解更多详细信息。

#### 检查当前操作系统限制（开放文件） {#check-current-os-limits-open-files}
```shell title="ulimit -n"
1024 # Ubuntu default
```

#### 增加开放文件限制 {#increase-open-files-limit}
- 在前景（shell）`polygon-edge`中运行
  ```shell title="Set FD limit for the current session"
  ulimit -n 65535 # affects only current session, limit won't persist after logging out
  ```

  ```shell title="Edit /etc/security/limits.conf"
  # add the following lines to the end of the file to modify FD limits
  *               soft    nofile          65535 # sets FD soft limit for all users
  *               hard    nofile          65535 # sets FD hard limit for all users

  # End of file
  ```
保存文件，重新启动系统。

- 在背景`polygon-edge`中运行为服务

如果使用工具`polygon-edge`运行为系统服务，使用诸如`systemd`文件描述者限制应使用 `systemd`。
  ```shell title="Edit /etc/systemd/system/polygon-edge.service"
  [Service]
   ...
  LimitNOFILE=65535
  ```

### 疑难解答 {#troubleshooting}
```shell title="Watch FD limits of polygon edge running process"
watch -n 1 "ls /proc/$(pidof polygon-edge)/fd | wc -l"
```

```shell title="Check max FD limits for polygon-edge running process"
cat /proc/$(pidof polygon-edge)/limits
```
:::

指定以下内容后：
1. 将作为验证者集列入 genesis 区块的验证者的公钥中
2. Bootnode multiaddr 连接字符串
3. 预挖掘账户和待列入 genesis 区块的余额

并生成`genesis.json`，您应将其复制到网络中的所有 VM 中。根据您的设置，您可能可以复制/粘贴它，将其发送到 NODE 运算符，或仅仅是 SCP/FTP。

genesis 文件的结构在 [CLI 命令](/docs/edge/get-started/cli-commands)章节中已涵盖。

## STEP 4：运行所有客户端 {#step-4-run-all-the-clients}

:::note 云提供者网络

大多数云提供者不会将 IP 地址（特别是公有地址）作为 VM 上的直接网络接口，而是将其设置为不可见的 NAT 代理。


要允许在此情况下 NODE 相互连接，您需要监听绑定在所有接口上的`0.0.0.0`IP 地址，但您仍需要指定其他 NODE 可使用其连接到实例的 IP 地址或 DNS 地址。此方法要么通过使用`--nat`参数实现，要么使用`--dns`参数实现，您可以在其中分别指定外部 IP 或 DNS 地址。

#### 示例 {#example}

您希望侦听的相关 IP 地址是`192.0.2.1`，但它没有直接绑定到网络接口。

为了允许节点连接，将通过以下参数：

`polygon-edge ... --libp2p 0.0.0.0:10001 --nat 192.0.2.1`

或者，如果您希望指定 DNS 地址`dns/example.io`，请通过以下参数：

`polygon-edge ... --libp2p 0.0.0.0:10001 --dns dns/example.io`

这将使 NODE 侦听所有接口，但也使它意识到客户端正在通过指定的`--nat`或`--dns`地址连接到它。

:::

要运行**第一个**客户端：


````bash
node-1> polygon-edge server --data-dir ./data-dir --chain genesis.json  --libp2p 0.0.0.0:1478 --nat <public_or_private_ip> --seal
````

要运行**第二个**客户端：

````bash
node-2> polygon-edge server --data-dir ./data-dir --chain genesis.json --libp2p 0.0.0.0:1478 --nat <public_or_private_ip> --seal
````

要运行**第三个**客户端：

````bash
node-3> polygon-edge server --data-dir ./data-dir --chain genesis.json --libp2p 0.0.0.0:1478 --nat <public_or_private_ip> --seal
````

要运行**第四个**客户端：

````bash
node-4> polygon-edge server --data-dir ./data-dir --chain genesis.json --libp2p 0.0.0.0:1478 --nat <public_or_private_ip> --seal
````

运行前一个命令后，您已设置了 4 个 NODE Polygon Edge 网络，该网络能够封装区块并从 NODE 故障中恢复。

:::info 使用配置文件开始客户端

客户端不是将所有配置参数指定为 CLI 参数，而是可以通过执行以下命令开始使用配置文件：

````bash
polygon-edge server --config <config_file_path>
````
示例：

````bash
polygon-edge server --config ./test/config-node1.json
````
目前，我们只支持`json`基于配置的文件，**[在](/docs/edge/configuration/sample-config)**此找到样本的配置文件

:::

:::info 运行非验证者节点的步骤

非验证者节点将始终与从验证器节点接收的最新块同步，您可以通过运行以下命令开始非验证者节点。

````bash
polygon-edge server --data-dir <directory_path> --chain <genesis_filename>  --libp2p <IPAddress:PortNo> --nat <public_or_private_ip>
````
例如，您添加**第五个**非验证者客户端，方法是执行以下命令：

````bash
polygon-edge server --data-dir ./data-dir --chain genesis.json --libp2p 0.0.0.0:1478 --nat<public_or_private_ip>
````
:::

:::info 指定价格限制
Polygon Edge NODE 可以通过入口交易的**设定的价格限制**开始。

限制价格的单位是`wei`。

设置燃料价格限制意味着当前 NODE 处理的任何交易需要燃料价格**高于**设定的价格限制，否则它将不会被纳入区块。

大多数节点遵守某一价格限制强制执行网络中交易的规则不能低于某个价格阈值。

价格限制的默认价值是`0`，意味着默认情况下完全没有强制执行。

使用`--price-limit`标志的示例：
````bash
polygon-edge server --price-limit 100000 ...
````

值得注意的是价格限制**仅对非本地交易实行**，意味着价格限制不适用于 NODE 上本地添加的交易。
:::

:::info WebSocket URL
默认情况下，当您运行 Polygon Edge 时，它根据链位置生成 WebSocket URL。URL 计划`wss://`用于 HTTP 链接，并且`ws://`用于 HTTP。

本地 WebSocket URL：
````bash
ws://localhost:10002/ws
````
请注意端口号取决于所选 NODE 的 JSON-RPC 端口。

Edgenet WebSocket URL：
````bash
wss://rpc-edgenet.polygon.technology/ws
````
:::
