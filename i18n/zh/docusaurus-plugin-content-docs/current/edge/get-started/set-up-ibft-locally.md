---
id: set-up-ibft-locally
title: 本地设置
description: "本地设置分步指南。"
keywords:
  - docs
  - polygon
  - edge
  - local
  - setup
  - genesis
---

:::caution 该指南仅用于测试目的

下方指南将指导您如何在本地机器上设置 Polygon Edge 网络，可用于测试和开发的目的。

该流程和设置 Polygon Edge 网络的方式有很大的不同，可用于云提供者：**[云设置](/docs/edge/get-started/set-up-ibft-on-the-cloud)**程序

:::


## 要求 {#requirements}

请参阅[安装](/docs/edge/get-started/installation)部分以安装 Polygon Edge。

## 概述 {#overview}

![本地设置](/img/edge/ibft-setup/local.svg)

在本指南中，我们的目标是建立一个使用 [IBFT 共识协议](https://github.com/ethereum/EIPs/issues/650)的`polygon-edge`区块链网络。区块链网络将由 4 个 NODE 组成，这 4 个 NODE 都是验证者节点，因此有资格提议区块，并验证来自其他提议者的区块。所有 4 个 NODE 都会在相同机器上运行，该指南的想法在最短的时间内为您提供完全可运作的 IBFT 集群。

为了实现这一目标，我们将指导您完成 4 个简单的步骤：

1. 初始化数据目录可以在 4 个 NODE 中生成验证者密钥，初始化空的区块链数据目录。验证者密钥非常重要，我们需要使用这些密钥才能用验证者初始组启动 genesis 区块。
2. 准备 bootnode 的连接串对于我们会运行的每个 NODE 都至关重要，第一次启动时候都需要知道连接的 NODE。
3. 生成`genesis.json`文件需要输入在**STEP 1**中生成的验证者密钥，可用于在 genesis 区块和 **STEP 2**的 bootnode 连接串中设置网络的初始验证者。
4. 运行所有 NODE 是本指南的终极目标，也是我们要做的最后一步，我们会指示 NODE 要使用的数据目录，寻找可以启动初始网络状态的`genesis.json`位置。

四个 NODE 会在 localhost 上运行，在设置处理过程中，预计每个 NODE 的所有数据目录都会在相同的父目录中。

:::info 验证者数量

集群中的节点数量没有最少，这意味着只有 1 个验证者节点的集群是可能的。请记住，使用_单一_的 NODE 集群，**没有崩溃公差**，**也没有 BFT 保证**。

实现 BFT 保证的最小建议节点编号是 4 - 因为在 NODE 集群中，可以容许 1 个 NODE 失败，其余的 3 个节点正常运行。

:::

## STEP 1：为 IBFT 初始化数据文件夹，生成验证者密钥 {#step-1-initialize-data-folders-for-ibft-and-generate-validator-keys}

为了创建和运行 IBFT，您需要初始化数据文件夹，每个节点都有一个：

````bash
polygon-edge secrets init --data-dir test-chain-1
````

````bash
polygon-edge secrets init --data-dir test-chain-2
````

````bash
polygon-edge secrets init --data-dir test-chain-3
````

````bash
polygon-edge secrets init --data-dir test-chain-4
````

这些命令中的每个命令都将打印验证者密钥、bls 公有密钥和[NODE ID](https://docs.libp2p.io/concepts/peer-id/)。您将需要第一个 NODE 的 NODE ID，以供下一步使用。

### 输出机密 {#outputting-secrets}
如果需要，可以再次检索机密输出。

```bash
polygon-edge secrets output --data-dir test-chain-4
```

## STEP 2：为 bootnode 准备 multiaddr 连接字符串 {#step-2-prepare-the-multiaddr-connection-string-for-the-bootnode}

成功建立连接的 NODE 必须知道要连接的`bootnode`服务器才能获得有关网络上的所有剩余节点的信息。该`bootnode`有时也被称为 p2p jargon 中的`rendezvous`服务器。

`bootnode`是 polygon-edge NODE 的特殊实例。每个 polygon-edge NODE 都可用作`bootnode`，但是每个 polygon-edge NODE 需要指定一系列的 bootnodes，它们可用于提供如何和所有剩余节点连接的信息。

创建用于指定 bootnode 的连接字符串，我们需要符合[multiaddr 格式](https://docs.libp2p.io/concepts/addressing/)：
```
/ip4/<ip_address>/tcp/<port>/p2p/<node_id>
```

在本指南中，我们将把第一个和第二个节点作为所有其他节点的 bootnode。此情景中将发生的事情是连接到 `node 1`或 `node 2`的节点将获取有关如何通过相互联系的 bootnode 相互连接的信息。

:::info 您需要指定至少一个 bootnode 来开始 NODE

至少需要**一个** bootnode，以便网络中的其他 NODE 可以相互发现。建议更多 bootnode，如它们在出现停电时提供了网络的复原力。在本指南中，我们将列出两个节点，但这可以随时更改，而不影响`genesis.json`文件的有效性。
:::

我们在 localhost 上运行，因此可以合理地假设`<ip_address>`是`127.0.0.1`。

对于`<port>`，我们使用`10001`，因为我们会为`node 1`配置 libp2p 服务器，方便该端口之后进行侦听。

最后，我们需要从以前运行命令`polygon-edge secrets init --data-dir test-chain-1`命令的输出中获得`<node_id>`（用于生成密钥和`node1`的数据目录）

装配后，我们将用作 bootnode 的 `node 1` 的 multiaddr 连接字符串将如下所示（只有末尾的 `<node_id>` 应该不同）：
```
/ip4/127.0.0.1/tcp/10001/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW
```
同样，我们为第二个 bootnode 构建 multiaddr，如下所示
```
/ip4/127.0.0.1/tcp/20001/p2p/16Uiu2HAmS9Nq4QAaEiogE4ieJFUYsoH28magT7wSvJPpfUGBj3Hq
```

:::info DNS 主机名称而不是 ips

Polygon Edge 支持使用用于 NODE 配置的 DNS 主机名称。这是基于云的部署的一个非常有用的功能，因为 Node 的 ip 可能因为各种原因而更改。

使用 DNS 主机名称时，连接字符串的 multiaddr 格式如下：`/dns4/sample.hostname.com/tcp/<port>/p2p/nodeid`

:::


## STEP 3：使用 4 个 NODE 生成 genesis 文件作为验证者 {#step-3-generate-the-genesis-file-with-the-4-nodes-as-validators}

````bash
polygon-edge genesis --consensus ibft --ibft-validators-prefix-path test-chain- --bootnode /ip4/127.0.0.1/tcp/10001/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW --bootnode /ip4/127.0.0.1/tcp/20001/p2p/16Uiu2HAmS9Nq4QAaEiogE4ieJFUYsoH28magT7wSvJPpfUGBj3Hq
````

此命令的作用：

* `--ibft-validators-prefix-path`设置前缀文件夹路径至 Polygon Edge 中 IBFT 可用的内容。该目录用于存储`consensus/`文件夹，其中保存了验证者的私钥。需要验证者的公钥创建 genesis 文件 - bootstrap NODE 的初始列表。该标志只有在 localhost 设置网络时才有意义，例如在现实场景中我们无法期待所有的NODE 数据目录都会在同一文件系统中，方便我们轻松读取它们的公钥。
* 此`--bootnode`设置 bootnode 的地址，使 NODE 能够相互找到。我们使用在** STEP 2 **中提及的`node 1` multiaddr 串。

该指令的结果是包含新区块链 genesis 区块的 `genesis.json` 文件，带有预开采的验证者集和 NODE 率先接触的配置，从而建立连通性。

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


## STEP 4：运行所有客户端 {#step-4-run-all-the-clients}

因为我们正在尝试在同一个机器上运行包含 4 个 NODE 的 Polygon Edge 网络，我们需要注意避免节点冲突。所有我们使用以下推理来决定 NODE 每个服务器的侦听端口：

- `10000`用于`node 1`的 gRPC 服务器，`20000`用于`node 2`的 GRPC 服务器等。
- `10001`用于`node 1`的 libp2p 服务器，`20001`用于`node 2`的 libp2p 服务器等。
- `10002`用于`node 1`的 JSON-RPC 服务器，`20002`用于`node 2`的 JSON-RPC 服务器等。

要运行**首个**客户端（注意端口`10001`，它和 NODE 1 的 NODE ID 在 **STEP 2 中**被用于 libp2p multiaddr 的一部分）：

````bash
polygon-edge server --data-dir ./test-chain-1 --chain genesis.json --grpc-address :10000 --libp2p :10001 --jsonrpc :10002 --seal
````

要运行**第二个**客户端：

````bash
polygon-edge server --data-dir ./test-chain-2 --chain genesis.json --grpc-address :20000 --libp2p :20001 --jsonrpc :20002 --seal
````

要运行**第三个**客户端：

````bash
polygon-edge server --data-dir ./test-chain-3 --chain genesis.json --grpc-address :30000 --libp2p :30001 --jsonrpc :30002 --seal
````

要运行**第四个**客户端：

````bash
polygon-edge server --data-dir ./test-chain-4 --chain genesis.json --grpc-address :40000 --libp2p :40001 --jsonrpc :40002 --seal
````

简单回顾一下迄今为止的工作：

* 客户端数据的目录被指定为 **./test-chain-\***
* GRPC 服务器已经为每个 NODE 分别在端口 **10000**、**20000**、**30000** 和 **40000** 启动
* libp2p 服务器已经为每个 NODE 分别在端口 **10001**、**20001**、**30001**、**40001** 启动
* JSON-RPC 服务器已经为每个 NODE 分别在端口 **10002**、**20002**、**30002** 和 **40002** 启动
* *封装*标志意味着正在开启的 NODE 正在参与区块封装
* *链*标志指定了应该用于链配置的 genesis 文件

genesis 文件的结构在 [CLI 命令](/docs/edge/get-started/cli-commands)章节中已涵盖。

运行前一个命令后，您已设置了 4 个 NODE polygon Edge 网络，该网络能够封装区块并从 NODE 故障中恢复。

:::info 使用配置文件开始客户端

客户端不是将所有配置参数指定为 CLI 参数，而是可以通过执行以下命令开始使用配置文件：

````bash
polygon-edge server --config <config_file_path>
````
示例：

````bash
polygon-edge server --config ./test/config-node1.json
````
目前，我们支持`yaml`和`json`基于配置的文件，**[在](/docs/edge/configuration/sample-config)**此找到样本的配置文件

:::

:::info 运行非验证者节点的步骤

非验证者节点将始终与从验证器节点接收的最新块同步，您可以通过运行以下命令开始非验证者节点。

````bash
polygon-edge server --data-dir <directory_path> --chain <genesis_filename> --grpc-address <portNo> --libp2p <portNo> --jsonrpc <portNo>
````
例如，您添加**第五个**非验证者客户端，方法是执行以下命令：

````bash
polygon-edge server --data-dir ./test-chain --chain genesis.json --grpc-address :50000 --libp2p :50001 --jsonrpc :50002
````
:::

:::info 指定价格限制
Polygon Edge NODE 可以通过入口交易的**设定的价格限制**开始。

限制价格的单位是`wei`。

设置燃料价格限制意味着当前 NODE 处理的任何交易需要燃料价格**高于**设定的价格限制，否则不会被包含在区块中。

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



## STEP 5：和 Polygon-edge 网络的互动 {#step-5-interact-with-the-polygon-edge-network}

现在您已经设置了至少 1 个运行的客户端，您可以继续使用预开采的账户和区块链互动，也可指定 JSON-RPC URL 至 4 个节点中的任意一个：
- NODE 1：`http://localhost:10002`
- NODE 2：`http://localhost:20002`
- NODE 3：`http://localhost:30002`
- NODE 4：`http://localhost:40002`

遵循该指南向新创建的集群报告运营者的指令：[如何查询运营者信息](/docs/edge/working-with-node/query-operator-info)（我们为每个节点创建的 GRPC 端口分别是`10000`/`20000`/`30000`/`40000`）
