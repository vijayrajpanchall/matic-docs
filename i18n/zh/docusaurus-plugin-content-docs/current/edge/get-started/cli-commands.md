---
id: cli-commands
title: CLI 指令
description: "Polygon Edge 的 CLI 指令和指令标志。"
keywords:
  - docs
  - polygon
  - edge
  - cli
  - commands
  - flags
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


该节详细介绍了 Polygon Edge 中的当前指令、指令标志和使用方式。

:::tip JSON 输出支持

`--json`标志支持某些指令。该标志指示指令以 JSON 格式打印输出。

:::

## 启动指令 {#startup-commands}

| **指令** | **描述** |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 服务器 | 通过启动所有模块，开启区块链客户端的默认指令。 |
| genesis | 生成 *genesis.json* 文件，用于启动客户端前设置预开采的链状态。genesis 文件的的结构描述位于 |
| genesis 预部署 | 为新鲜网络预先部署智能合约 |

### 服务器标志下方 {#server-flags}


| **所有服务器标志** |
|---------------------------------------|---------------------------------------------|
| [data-dir](/docs/edge/get-started/cli-commands#data-dir) | [jsonrpc](/docs/edge/get-started/cli-commands#jsonrpc) |
| [json-rpc-block-range-limit](/docs/edge/get-started/cli-commands#json-rpc-block-range-limit) | [json-rpc-batch-request-limit](/docs/edge/get-started/cli-commands#json-rpc-batch-request-limit) |
| [grpc](/docs/edge/get-started/cli-commands#grpc) | [libp2p](/docs/edge/get-started/cli-commands#libp2p) |
| [prometheus](/docs/edge/get-started/cli-commands#prometheus) | [block-gas-target](/docs/edge/get-started/cli-commands#block-gas-target) |
| [max-peers](/docs/edge/get-started/cli-commands#max-peers) | [max-inbound-peers](/docs/edge/get-started/cli-commands#max-inbound-peers) |
| [max-outbound-peers](/docs/edge/get-started/cli-commands#max-outbound-peers) | [max-enqueued](/docs/edge/get-started/cli-commands#max-enqueued) |
| [日志级别](/docs/edge/get-started/cli-commands#log-level) | [录入](/docs/edge/get-started/cli-commands#log-to) |
| [链](/docs/edge/get-started/cli-commands#chain) | [参加](/docs/edge/get-started/cli-commands#join) |
| [nat](/docs/edge/get-started/cli-commands#nat) | [dns](/docs/edge/get-started/cli-commands#dns) |
| [价格限制](/docs/edge/get-started/cli-commands#price-limit) | [max-slack](/docs/edge/get-started/cli-commands#max-slots) |
| [配置](/docs/edge/get-started/cli-commands#config) | [secrets-config](/docs/edge/get-started/cli-commands#secrets-config) |
| [开发](/docs/edge/get-started/cli-commands#dev) | [dev-interval](/docs/edge/get-started/cli-commands#dev-interval) |
| [no-discover](/docs/edge/get-started/cli-commands#no-discover) | [恢复](/docs/edge/get-started/cli-commands#restore) |
| [block-time](/docs/edge/get-started/cli-commands#block-time) | [access-control-allow-origins](/docs/edge/get-started/cli-commands#access-control-allow-origins) |


#### <h4></h4><i>data-dir</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--data-dir DATA_DIRECTORY]

</TabItem>
  <TabItem value="example" label="Example">

    server --data-dir ./example-dir

</TabItem>
</Tabs>

用于指定存储 Polygon Edge 客户端数据的数据目录。默认：`./test-chain`。

---


#### <h4></h4><i>jsonrpc</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--jsonrpc JSONRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    server --jsonrpc 127.0.0.1:10000

</TabItem>
</Tabs>

设置 JSON-RPC 服务的地址和端口`address:port`。   如果仅定义了端口，`:10001`则它将与所有界面结合。`0.0.0.0:10001`   如果省略，则服务会与默认`address:port`结合。   默认地址：`0.0.0.0:8545`。

---

#### <h4></h4><i>json-rpc-block-range-limit</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--json-rpc-block-range-limit BLOCK_RANGE]

</TabItem>
  <TabItem value="example" label="Example">

    server --json-rpc-block-range-limit 1500

</TabItem>
</Tabs>

设置在执行 json-rpc 请求时要考虑的最大区块范围，其中包括来自 Block/toBlock 值（例如，eth_getLogs）的 json-rpc 请求。  通过将值设置为  来完全禁用此限制`0`。默认：`1000`。

---

#### <h4></h4><i>json-rpc-batch-request-limit</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--json-rpc-batch-request-limit MAX_LENGTH]

</TabItem>
  <TabItem value="example" label="Example">

    server --json-rpc-batch-request-limit 50

</TabItem>
</Tabs>

设置在处理 json-rpc 批量请求时要考虑的最大长度。通过将值设置为  来完全禁用此限制`0`。默认：`20`。

---

#### <h4></h4><i>grpc</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    server --grpc-address 127.0.0.1:10001

</TabItem>
</Tabs>

设置 gRPC 服务的地址和端口`address:port`。默认地址：`127.0.0.1:9632`。

---

#### <h4></h4><i>libp2p</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--libp2p LIBP2P_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    server --libp2p 127.0.0.1:10002

</TabItem>
</Tabs>

设置 libp2p 服务的地址和端口`address:port`。默认地址：`127.0.0.1:1478`。

---

#### <h4></h4><i>prometheus</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--prometheus PROMETHEUS_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    server --prometheus 127.0.0.1:10004

</TabItem>
</Tabs>

设置 prometheus 服务器的地址和端口`address:port`。   如果只定义了端口`:5001`，则服务会和所有的界面结合`0.0.0.0:5001`。   如果遗漏，则该服务不会开始。

---

#### <h4></h4><i>block-gas-target</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--block-gas-target BLOCK_GAS_TARGET]

</TabItem>
  <TabItem value="example" label="Example">

    server --block-gas-target 10000000

</TabItem>
</Tabs>

设置链的目标区块燃料限制。默认（未执行）：`0`。

有关区块燃料目标更加详细的解释，请参见 [TxPool 节](/docs/edge/architecture/modules/txpool#block-gas-target)。

---

#### <h4></h4><i>max-peers</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--max-peers PEER_COUNT]

</TabItem>
  <TabItem value="example" label="Example">

    server --max-peers 40

</TabItem>
</Tabs>

设置客户端的最大对等体数量。默认：`40`。

对等体限制需要通过使用`max-peers`或`max-inbound/outbound-peers`标志指定。

---

#### <h4></h4><i>max-inbound-peers</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--max-inbound-peers PEER_COUNT]

</TabItem>
  <TabItem value="example" label="Example">

    server --max-inbound-peers 32

</TabItem>
</Tabs>

设置客户端的最大进入对等体数量。如果设置了`max-peers`，则使用以下方式计算最大内部连接的对等体限制。

`max-inbound-peer = InboundRatio * max-peers`，其中`InboundRatio`是`0.8`。

---

#### <h4></h4><i>max-outbound-peers</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--max-outbound-peers PEER_COUNT]

</TabItem>
  <TabItem value="example" label="Example">

    server --max-outbound-peers 8

</TabItem>
</Tabs>

设置客户的最大外部连接的对等体数量。如果设置了`max-peers`，则通过以下方式计算最大外部连接的对等体数量。

`max-outbound-peer = OutboundRatio * max-peers`，其中`OutboundRatio`是`0.2`。

---

#### <h4></h4><i>max-enqueued</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--max-enqueued ENQUEUED_TRANSACTIONS]

</TabItem>
  <TabItem value="example" label="Example">

    server --max-enqueued 210

</TabItem>
</Tabs>

设置每个账户的最大排队交易数。默认：`128`。

---

#### <h4></h4><i>日志级别</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--log-level LOG_LEVEL]

</TabItem>
  <TabItem value="example" label="Example">

    server --log-level DEBUG

</TabItem>
</Tabs>

设置控制器输出的日志级别。默认：`INFO`。

---

#### <h4></h4><i>录入</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--log-to LOG_FILE]

</TabItem>
  <TabItem value="example" label="Example">

    server --log-to node.log

</TabItem>
</Tabs>

定义日志文件名，用于保留服务器命令的所有日志输出。默认情况下，所有服务器日志都输出到控制器上（stdout），但是如果设置了标志，则运行服务器指令时控制器没有输出。

---

#### <h4></h4><i>链</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--chain GENESIS_FILE]

</TabItem>
  <TabItem value="example" label="Example">

    server --chain /home/ubuntu/genesis.json

</TabItem>
</Tabs>

指定用于开始链的 genesis 文件。默认：`./genesis.json`。

---

#### <h4></h4><i>参加</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--join JOIN_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    server --join /ip4/127.0.0.1/tcp/10001/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW

</TabItem>
</Tabs>

明确应该加入的对等体地址。

---

#### <h4></h4><i>nat</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--nat NAT_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    server --nat 192.0.2.1

</TabItem>
</Tabs>

在没有端口的情况下设置外部 IP 地址，因为对等体可以看到。

---

#### <h4></h4><i>dns</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--dns DNS_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    server --dns dns4/example.io

</TabItem>
</Tabs>

设置主机 DNS 地址。可以用于广告外部 DNS。支持`dns`、`dns4`、`dns6`。

---

#### <h4></h4><i>价格限制</i>


<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--price-limit PRICE_LIMIT]

</TabItem>
  <TabItem value="example" label="Example">

    server --price-limit 10000

</TabItem>
</Tabs>

设置最低的燃料价格限制，用于接受进入池子。默认：`1`。

---

#### <h4></h4><i>max-slack</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--max-slots MAX_SLOTS]

</TabItem>
  <TabItem value="example" label="Example">

    server --max-slots 1024

</TabItem>
</Tabs>

设置池子中的最大插口。默认：`4096`。

---

#### <h4></h4><i>配置</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--config CLI_CONFIG_PATH]

</TabItem>
  <TabItem value="example" label="Example">

    server --config ./myConfig.json

</TabItem>
</Tabs>

明确进入 CLI 配置的路径。支持 `.json`。

---

#### <h4></h4><i>secrets-config</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--secrets-config SECRETS_CONFIG]

</TabItem>
  <TabItem value="example" label="Example">

    server --secrets-config ./secretsManagerConfig.json

</TabItem>
</Tabs>

设置密钥管理器配置文件的路径。用于 Hashicorp Vault、AWS SSM 和 GCP 密钥管理器。如果省略，则使用本地的 FS 密钥管理器。

---

#### <h4></h4><i>开发</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--dev DEV_MODE]

</TabItem>
  <TabItem value="example" label="Example">

    server --dev

</TabItem>
</Tabs>

设置客户端为开发模式。默认`false`：在 dev 模式下，默认情况下，同行发现将禁用。

---

#### <h4></h4><i>dev-interval</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--dev-interval DEV_INTERVAL]

</TabItem>
  <TabItem value="example" label="Example">

    server --dev-interval 20

</TabItem>
</Tabs>

轻松设置客户端的开发提醒间隔。默认：`0`。

---

#### <h4></h4><i>no-discover</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--no-discover NO_DISCOVER]

</TabItem>
  <TabItem value="example" label="Example">

    server --no-discover

</TabItem>
</Tabs>

防止客户端发现其他对等体。默认：`false`。

---

#### <h4></h4><i>恢复</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--restore RESTORE]

</TabItem>
  <TabItem value="example" label="Example">

    server --restore backup.dat

</TabItem>
</Tabs>

从指定的存档文件中恢复区块

---

#### <h4></h4><i>block-time</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--block-time BLOCK_TIME]

</TabItem>
  <TabItem value="example" label="Example">

    server --block-time 1000

</TabItem>
</Tabs>

立即设置区块生产时间。默认：`2`

---

#### <h4></h4><i>access-control-allow-origins</i>
<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    server [--access-control-allow-origins ACCESS_CONTROL_ALLOW_ORIGINS]

</TabItem>
  <TabItem value="example" label="Example">

    server --access-control-allow-origins "https://edge-docs.polygon.technology"

</TabItem>
</Tabs>

设置授权的域，分享 JSON-RPC 请求的响应。   添加多个标志，`--access-control-allow-origins "https://example1.com" --access-control-allow-origins "https://example2.com"`用于授权多个域。   如果省略，Access-Control-Allow-Origins 头部就会设置为`*`，所有的域都会授权。

---

### genesis 标志 {#genesis-flags}
| **所有基因标志** |
|---------------------------------------|---------------------------------------------|
| [dir](/docs/edge/get-started/cli-commands#dir) | [名称](/docs/edge/get-started/cli-commands#name) |
| [pos](/docs/edge/get-started/cli-commands#pos) | [epoch-size](/docs/edge/get-started/cli-commands#epoch-size) |
| [预开采](/docs/edge/get-started/cli-commands#premine) | [chainid](/docs/edge/get-started/cli-commands#chainid) |
| [ibft-validator-type](/docs/edge/get-started/cli-commands#ibft-validator-type) | [ibft-validators-prefix-path](/docs/edge/get-started/cli-commands#ibft-validators-prefix-path) |
| [ibft-validator](/docs/edge/get-started/cli-commands#ibft-validator) | [block-gas-limit](/docs/edge/get-started/cli-commands#block-gas-limit) |
| [共识](/docs/edge/get-started/cli-commands#consensus) | [bootnode](/docs/edge/get-started/cli-commands#bootnode) |
| [max-validator-count](/docs/edge/get-started/cli-commands#max-validator-count) | [min-validator-count](/docs/edge/get-started/cli-commands#min-validator-count) |


#### <h4></h4><i>dir</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--dir DIRECTORY]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --dir ./genesis.json

</TabItem>
</Tabs>

设置用于 Polygon Edge genesis 数据的目录。默认：`./genesis.json`。

---

#### <h4></h4><i>名称</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--name NAME]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --name test-chain

</TabItem>
</Tabs>

设置链的名称。默认：`polygon-edge`。

---

#### <h4></h4><i>pos</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--pos IS_POS]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --pos

</TabItem>
</Tabs>

设置表明客户端需要使用权益证明 IBFT 的标志。如果没有提供标志或`false`，则默认权威证明。

---

#### <h4></h4><i>epoch-size</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--epoch-size EPOCH_SIZE]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --epoch-size 50

</TabItem>
</Tabs>

设置链的 epoch 大小。默认`100000`。

---

#### <h4></h4><i>预开采</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--premine ADDRESS:VALUE]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --premine 0x3956E90e632AEbBF34DEB49b71c28A83Bc029862:1000000000000000000000

</TabItem>
</Tabs>

以`address:amount`形式设置预开采账户和余额。
金额可以是十进制或十六进制。
默认预留余额：（`0xD3C21BCECCEDA1000000`100万种本地货币代币代币）。

---

#### <h4></h4><i>chainid</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--chain-id CHAIN_ID]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --chain-id 200

</TabItem>
</Tabs>

设置链的 ID。默认：`100`。

---

#### <h4></h4><i>ibft-validator-type</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--ibft-validator-type IBFT_VALIDATOR_TYPE]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --ibft-validator-type ecdsa

</TabItem>
</Tabs>

指定区块头的验证模式。可能的值：`[ecdsa, bls]`。默认：`bls`。

---

#### <h4></h4><i>ibft-validators-prefix-path</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--ibft-validators-prefix-path IBFT_VALIDATORS_PREFIX_PATH]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --ibft-validators-prefix-path test-chain-

</TabItem>
</Tabs>

验证者文件夹目录的前缀路径。如果省略标志`ibft-validator`，则需要呈现。

---

#### <h4></h4><i>ibft-validator</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--ibft-validator IBFT_VALIDATOR_LIST]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --ibft-validator 0xC12bB5d97A35c6919aC77C709d55F6aa60436900

</TabItem>
</Tabs>

将传递的地址设置为 IBFT 验证者。如果省略标志`ibft-validators-prefix-path`，则需要呈现。
1. 如果网络正在运行 ECDSA，则格式是`--ibft-validator [ADDRESS]`。
2. 如果网络正在运行 BLS，则格式是`--ibft-validator [ADDRESS]:[BLS_PUBLIC_KEY]`。

---

#### <h4></h4><i>block-gas-limit</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--block-gas-limit BLOCK_GAS_LIMIT]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --block-gas-limit 5000000

</TabItem>
</Tabs>

指的是区块内所有操作使用的最大燃料数量。默认：`5242880`。

---

#### <h4></h4><i>共识</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--consensus CONSENSUS_PROTOCOL]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --consensus ibft

</TabItem>
</Tabs>

设置共识协议。默认：`pow`。

---

#### <h4></h4><i>bootnode</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--bootnode BOOTNODE_URL]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --bootnode /ip4/127.0.0.1/tcp/10001/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW

</TabItem>
</Tabs>

p2p 发现 bootstrap 的 Multiaddr URL。该标志可以多次使用。可提供 bootnode 的 DNS 地址，而不是 IP 地址。

---

#### <h4></h4><i>max-validator-count</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--max-validator-count MAX_VALIDATOR_COUNT]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --max-validator-count 42

</TabItem>
</Tabs>

PoS 共识中可加入验证者集的最大质押者数量。该数量不能超过 MAX_SAFE_INTEGER  (2^53 - 2) 的值。

---

#### <h4></h4><i>min-validator-count</i>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis [--min-validator-count MIN_VALIDATOR_COUNT]

</TabItem>
  <TabItem value="example" label="Example">

    genesis --min-validator-count 4

</TabItem>
</Tabs>

在权益证明 (PoS) 共识中加入验证者集的最小质押者数。该数量不得超过最大验证者数的值。默认为 1。

---

### genesis 预先部署标志 {#genesis-predeploy-flags}

<h4><i>工艺品路径</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis predeploy [--artifacts-path PATH_TO_ARTIFACTS]

</TabItem>
  <TabItem value="example" label="Example">

    genesis predeploy --artifacts-path ./ArtifactsData.json

</TabItem>
</Tabs>

设置包含 合约文物的路径`abi`，`bytecode`并设置包含 。`deployedBytecode`

---

<h4><i>链</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis predeploy [--chain PATH_TO_GENESIS]

</TabItem>
  <TabItem value="example" label="Example">

    genesis predeploy --chain ./genesis.json

</TabItem>
</Tabs>

设置应更新文件的路径`genesis.json`。默认`./genesis.json`。

---

<h4><i>建设者-args</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis predeploy [--constructor-args CONSTRUCTOR_ARGUMENT]

</TabItem>
  <TabItem value="example" label="Example">

    genesis predeploy --constructor-args 123

</TabItem>
</Tabs>

设置智能合同建设者参数（如果有的话）。有关这些论点的详细指南，请参见[部署前文章。](/docs/edge/additional-features/predeployment)

---

<h4><i>预部署地址</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    genesis predeploy [--predeploy-address PREDEPLOY_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    genesis predeploy --predeploy-address 0x5555

</TabItem>
</Tabs>

设置要预先部署到的地址。默认`0x0000000000000000000000000000000000001100`。

---


## 运算符命令 {#operator-commands}

### 对等体指令 {#peer-commands}

| **指令** | **描述** |
|------------------------|-------------------------------------------------------------------------------------|
| 对等体添加 | 使用 libp2p 地址添加新的对等体 |
| 对等体列表 | 列出客户端通过 libp2p 连接的所有对等体 |
| 对等体状态 | 使用 libp2p 地址，从对等体列表中返回特定对等体状态 |

<h3>对等体添加标志</h3>

<h4><i>addr</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    peers add --addr PEER_ADDRESS

</TabItem>
  <TabItem value="example" label="Example">

    peers add --addr /ip4/127.0.0.1/tcp/10001/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW

</TabItem>
</Tabs>

multiaddr 格式的对等体 libp2p 地址。

---

<h4><i>grpc-address</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    peers add [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    peers add --grpc-address 127.0.0.1:10003

</TabItem>
</Tabs>

gRPC API 的地址。默认：`127.0.0.1:9632`。

<h3>对等体列表标志</h3>

<h4><i>grpc-address</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    peers list [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    peers list --grpc-address 127.0.0.1:10003

</TabItem>
</Tabs>

gRPC API 的地址。默认：`127.0.0.1:9632`。

<h3>对等体状态标志</h3>

<h4><i>peer-id</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    peers status --peer-id PEER_ID

</TabItem>
  <TabItem value="example" label="Example">

    peers status --peer-id 16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW

</TabItem>
</Tabs>

p2p 网络中特定对等体的 Libp2p 节点 ID。

---

<h4><i>grpc-address</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    peers status [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    peers status --grpc-address 127.0.0.1:10003

</TabItem>
</Tabs>

gRPC API 的地址。默认：`127.0.0.1:9632`。

### IBFT 指令 {#ibft-commands}

| **指令** | **描述** |
|------------------------|-------------------------------------------------------------------------------------|
| ibft 快照 | 返回 IBFT 快照 |
| ibft 候选人 | 查询当前的拟议候选人集以及尚未列入的候选人 |
| ibft 提议 | 提议新候选人从验证者集中添加/删除 |
| ibft 状态 | 返回 IBFT 客户端的所有状态 |
| ibft 切换 | 添加分叉配置至 genesis.json 文件，以切换 IBFT 类型 |
| ibft 法定人数 | 指定区块数，然后将使用最佳法定人数规模方法达成共识 |


<h3>ibft 快照标志</h3>

<h4><i>数量</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft snapshot [--number BLOCK_NUMBER]

</TabItem>
  <TabItem value="example" label="Example">

    ibft snapshot --number 100

</TabItem>
</Tabs>

快照的区块高度（数量）。

---

<h4><i>grpc-address</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft snapshot [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    ibft snapshot --grpc-address 127.0.0.1:10003

</TabItem>
</Tabs>

gRPC API 的地址。默认：`127.0.0.1:9632`。

<h3>ibft 候选人标志</h3>

<h4><i>grpc-address</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft candidates [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    ibft candidates --grpc-address 127.0.0.1:10003

</TabItem>
</Tabs>

gRPC API 的地址。默认：`127.0.0.1:9632`。

<h3>ibft 协议标志</h3>

<h4><i>投票</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft propose --vote VOTE

</TabItem>
  <TabItem value="example" label="Example">

    ibft propose --vote auth

</TabItem>
</Tabs>

提议更改验证者集。可能值：`[auth, drop]`。

---

<h4><i>addr</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft propose --addr ETH_ADDRESS

</TabItem>
  <TabItem value="example" label="Example">

    ibft propose --addr 0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7

</TabItem>
</Tabs>

有待投票表决的账户地址。

---

<h4><i>bls</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft propose --bls BLS_PUBLIC_KEY

</TabItem>
  <TabItem value="example" label="Example">

    ibft propose --bls 0x9952735ca14734955e114a62e4c26a90bce42b4627a393418372968fa36e73a0ef8db68bba11ea967ff883e429b3bfdf

</TabItem>
</Tabs>

投票的账户 BLS 公钥，仅限 BLS 模式。

---

<h4><i>grpc-address</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft candidates [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    ibft candidates --grpc-address 127.0.0.1:10003

</TabItem>
</Tabs>

gRPC API 的地址。默认：`127.0.0.1:9632`。

<h3>ibft 状态的标志</h3>

<h4><i>grpc-address</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft status [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    ibft status --grpc-address 127.0.0.1:10003

</TabItem>
</Tabs>

gRPC API 的地址。默认：`127.0.0.1:9632`。

<h3>ibft 切换标志</h3>

<h4><i>链</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft switch [--chain GENESIS_FILE]

</TabItem>
  <TabItem value="example" label="Example">

    ibft switch --chain genesis.json

</TabItem>
</Tabs>

指定要更新的 genesis 文件。默认：`./genesis.json`。

---

<h4><i>类型</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft switch [--type TYPE]

</TabItem>
  <TabItem value="example" label="Example">

    ibft switch --type PoS

</TabItem>
</Tabs>

指定用于切换的 IBFT 类型。可能的值：`[PoA, PoS]`。

---

<h4><i>部署</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft switch [--deployment DEPLOYMENT]

</TabItem>
  <TabItem value="example" label="Example">

    ibft switch --deployment 100

</TabItem>
</Tabs>

指定合约部署的高度。仅在权益证明 (PoS) 的情况下才可用。

---

<h4><i>来自</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft switch [--from FROM]

</TabItem>
  <TabItem value="example" label="Example">

    ibft switch --from 200

</TabItem>
</Tabs>

---

<h4><i>ibft-validator-type</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

     ibft switch [--ibft-validator-type IBFT_VALIDATOR_TYPE]

</TabItem>
  <TabItem value="example" label="Example">

     ibft switch --ibft-validator-type ecdsa

</TabItem>
</Tabs>

指定区块头的验证模式。可能的值：`[ecdsa, bls]`。默认：`bls`。

---

<h4><i>ibft-validators-prefix-path</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

     ibft switch [--ibft-validators-prefix-path IBFT_VALIDATORS_PREFIX_PATH]

</TabItem>
  <TabItem value="example" label="Example">

     ibft switch --ibft-validators-prefix-path test-chain-

</TabItem>
</Tabs>

新验证者目录的前缀路径。如果省略标志`ibft-validator`，则需要呈现。只有当 IBFT 模式是 PoA 时才可使用（`--pos`标志省略）。

---

<h4><i>ibft-validator</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

     ibft switch [--ibft-validator IBFT_VALIDATOR_LIST]

</TabItem>
  <TabItem value="example" label="Example">

     ibft switch --ibft-validator 0xC12bB5d97A35c6919aC77C709d55F6aa60436900

</TabItem>
</Tabs>

将传入地址设置为分叉后使用的 IBFT 验证者。如果省略标志`ibft-validators-prefix-path`，则需要呈现。仅在 PoA 模式中可用。
1. 如果网络正在运行 ECDSA，则格式是`--ibft-validator [ADDRESS]`。
2. 如果网络正在运行 BLS，则格式是`--ibft-validator [ADDRESS][BLS_PUBLIC_KEY]`。

---

<h4><i>max-validator-count</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft switch [--max-validator-count MAX_VALIDATOR_COUNT]

</TabItem>
  <TabItem value="example" label="Example">

    ibft switch --max-validator-count 42

</TabItem>
</Tabs>

PoS 共识中可加入验证者集的最大质押者数量。该数量不能超过 MAX_SAFE_INTEGER  (2^53 - 2) 的值。

---

<h4><i>min-validator-count</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft switch [--min-validator-count MIN_VALIDATOR_COUNT]

</TabItem>
  <TabItem value="example" label="Example">

    ibft switch --min-validator-count 4

</TabItem>
</Tabs>

在权益证明 (PoS) 共识中加入验证者集的最小质押者数。该数量不得超过最大验证者数的值。默认为 1。

指定分叉的开始高度。

---

<h3>ibft 法定人数标志</h3>

<h4><i>来自</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft quorum [--from your_quorum_switch_block_num]

</TabItem>
  <TabItem value="example" label="Example">

    ibft quorum --from 350

</TabItem>
</Tabs>

从法定人数计算切换到 QuorumOptimal 的高度，使用了`(2/3 * N)`，`N`是验证者节点的数量。请注意，这是用于反向兼容，也就是说，只有使用法定人数计算的链才能升级至特定的区块高度。

---

<h4><i>链</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    ibft quorum [--chain GENESIS_FILE]

</TabItem>
  <TabItem value="example" label="Example">

    ibft quorum --chain genesis.json

</TabItem>
</Tabs>

指定要更新的 genesis 文件。默认：`./genesis.json`。

### 交易池指令 {#transaction-pool-commands}

| **指令** | **描述** |
|------------------------|--------------------------------------------------------------------------------------|
| txpool 状态 | 返回池中的交易数量 |
| txpool 订阅 | 在交易池中订阅事件。 |

<h3>txpool 状态标志</h3>

<h4><i>grpc-address</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    txpool status [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    txpool status --grpc-address 127.0.0.1:10003

</TabItem>
</Tabs>

gRPC API 的地址。默认：`127.0.0.1:9632`。

<h3>txpool 订阅标志</h3>

<h4><i>grpc-address</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    txpool subscribe [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    txpool subscribe --grpc-address 127.0.0.1:10003

</TabItem>
</Tabs>

gRPC API 的地址。默认：`127.0.0.1:9632`。

---

<h4><i>推广</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    txpool subscribe [--promoted LISTEN_PROMOTED]

</TabItem>
  <TabItem value="example" label="Example">

    txpool subscribe --promoted

</TabItem>
</Tabs>

订阅了解在 TxPool 中推广的 tx 事件。

---

<h4><i>落下</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    txpool subscribe [--dropped LISTEN_DROPPED]

</TabItem>
  <TabItem value="example" label="Example">

    txpool subscribe --dropped

</TabItem>
</Tabs>

订阅在 TxPool 中落下的 tx 事件。

---

<h4><i>降级</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    txpool subscribe [--demoted LISTEN_DEMOTED]

</TabItem>
  <TabItem value="example" label="Example">

    txpool subscribe --demoted

</TabItem>
</Tabs>

订阅 TxPool 中的降级 tx 事件。

---

<h4><i>已添加</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    txpool subscribe [--added LISTEN_ADDED]

</TabItem>
  <TabItem value="example" label="Example">

    txpool subscribe --added

</TabItem>
</Tabs>

订阅添加 tx 事件至 TxPool。

---

<h4><i>排队</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    txpool subscribe [--enqueued LISTEN_ENQUEUED]

</TabItem>
  <TabItem value="example" label="Example">

    txpool subscribe --enqueued

</TabItem>
</Tabs>

订阅了解在账户队列中排队的 tx 事件。

---

### 区块链指令 {#blockchain-commands}

| **指令** | **描述** |
|------------------------|-------------------------------------------------------------------------------------|
| 状态 | 返回客户端的状态。详细回应可在监控下查看 |
| 找到 | 订阅区块链活动流。详细回应可在监控下查看 |
| 版本 | 返回客户端的当前版本。 |

<h3>状态标志</h3>

<h4><i>grpc-address</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    status [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    status --grpc-address 127.0.0.1:10003

</TabItem>
</Tabs>

gRPC API 的地址。默认：`127.0.0.1:9632`。

<h3>监控标志</h3>

<h4><i>grpc-address</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    monitor [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    monitor --grpc-address 127.0.0.1:10003

</TabItem>
</Tabs>

gRPC API 的地址。默认：`127.0.0.1:9632`。

---
<h3>版本命令</h3>


<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    version

</TabItem>
</Tabs>

显示发布版本、git 分支、进行哈希和建设时间。

## 密钥指令 {#secrets-commands}

| **指令** | **描述** |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| 密钥初始化 | 初始化私钥至相应的密钥管理器 |
| 密钥生成 | 生成密钥管理器配置文件，文件可通过 Polygon Edge 解析 |
| 秘密输出 | 打印 BLS 公共密钥地址、验证者公共密钥地址和节点id 以供参考 |

### 密钥初始化标志 {#secrets-init-flags}

<h4><i>配置</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets init [--config SECRETS_CONFIG]

</TabItem>
  <TabItem value="example" label="Example">

    secrets init --config ./secretsManagerConfig.json

</TabItem>
</Tabs>

设置密钥管理器配置文件的路径。用于 Hashicorp Vault。如果省略，则使用本地的 FS 密钥管理器。

---

<h4><i>data-dir</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets init [--data-dir DATA_DIRECTORY]

</TabItem>
  <TabItem value="example" label="Example">

    secrets init --data-dir ./example-dir

</TabItem>
</Tabs>

如果使用本地 FS，则设置 Polygon Edge 数据的目录。

---

<h4><i>ecdsa</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets init [--ecdsa FLAG]

</TabItem>
  <TabItem value="example" label="Example">

    secrets init --ecdsa=false

</TabItem>
</Tabs>

设置显示是否生成 ECDSA 密钥的标志。默认：`true`。

---

<h4><i>网络</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets init [--network FLAG]

</TabItem>
  <TabItem value="example" label="Example">

    secrets init --network=false

</TabItem>
</Tabs>

设置显示是否生成 Libp2p 网络密钥的标志。默认：`true`。

---

<h4><i>bls</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets init [--bls FLAG]

</TabItem>
  <TabItem value="example" label="Example">

    secrets init --bls

</TabItem>
</Tabs>

设置显示是否生成 BLS 密钥的标志。默认：`true`。

### 密钥生成标志 {#secrets-generate-flags}

<h4><i>dir</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets generate [--dir DATA_DIRECTORY]

</TabItem>
  <TabItem value="example" label="Example">

    secrets generate --dir ./example-dir

</TabItem>
</Tabs>

设置用于密钥管理器配置文件的默认目录：`./secretsManagerConfig.json`

---

<h4><i>类型</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets generate [--type TYPE]

</TabItem>
  <TabItem value="example" label="Example">

    secrets generate --type hashicorp-vault

</TabItem>
</Tabs>

指定密钥管理器的类型[`hashicorp-vault`]。默认：`hashicorp-vault`

---

<h4><i>代币</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets generate [--token TOKEN]

</TabItem>
  <TabItem value="example" label="Example">

    secrets generate --token s.zNrXa9zF9mgrdnClM7PZ19cu

</TabItem>
</Tabs>

指定该服务的访问代币

---

<h4><i>server-url</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets generate [--server-url SERVER_URL]

</TabItem>
  <TabItem value="example" label="Example">

    secrets generate --server-url http://127.0.0.1:8200

</TabItem>
</Tabs>

指定服务的服务器 URL

---

<h4><i>名称</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets generate [--name NODE_NAME]

</TabItem>
  <TabItem value="example" label="Example">

    secrets generate --name node-1

</TabItem>
</Tabs>

在服务记录中指定 NODE 的名字。默认：`polygon-edge-node`

---

<h4><i>namespace</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets generate [--namespace NAMESPACE]

</TabItem>
  <TabItem value="example" label="Example">

    secrets generate --namespace my-namespace

</TabItem>
</Tabs>

指定用于 Hashicorp Vault 密钥管理器的 namespace。默认：`admin`

### 保密输出标志 {#secrets-output-flags}

<h4><i>bls</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets output [--bls FLAG]

</TabItem>
  <TabItem value="example" label="Example">

    secrets output --bls

</TabItem>
</Tabs>

设置标志，表示是否只输出 BLS 公钥。默认：`true`

---

<h4><i>配置</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets output [--config SECRETS_CONFIG]

</TabItem>
  <TabItem value="example" label="Example">

    secrets output --config ./secretsManagerConfig.json

</TabItem>
</Tabs>

设置密钥管理器配置文件的路径。如果省略，则使用本地的 FS 密钥管理器。

---

<h4><i>data-dir</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets output [--data-dir DATA_DIRECTORY]

</TabItem>
  <TabItem value="example" label="Example">

    secrets output --data-dir ./example-dir

</TabItem>
</Tabs>

如果使用本地 FS，则设置 Polygon Edge 数据的目录。

---

<h4><i>节点-id</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets output [--node-id FLAG]

</TabItem>
  <TabItem value="example" label="Example">

    secrets output --node-id

</TabItem>
</Tabs>

设置标志，表示是否只输出网络节点 ID。默认：`true`

---

<h4><i>验证者</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    secrets output [--validator FLAG]

</TabItem>
  <TabItem value="example" label="Example">

    secrets output --validator

</TabItem>
</Tabs>

设置标志，表明是否只输出验证者地址。默认：`true`

---

## 响应 {#responses}

### 状态响应 {#status-response}

响应对象使用协议缓冲定义。
````go title="minimal/proto/system.proto"
message ServerStatus {
    int64 network = 1;

    string genesis = 2;

    Block current = 3;

    string p2pAddr = 4;

    message Block {
        int64 number = 1;
        string hash = 2;
    }
}
````

### 监控响应 {#monitor-response}
````go title="minimal/proto/system.proto"
message BlockchainEvent {
    // The "repeated" keyword indicates an array
    repeated Header added = 1;
    repeated Header removed = 2;

    message Header {
        int64 number = 1;
        string hash = 2;
    }
}
````

## 实用程序 {#utilities}

### 白名单指令 {#whitelist-commands}

| **指令** | **描述** |
|------------------------|-------------------------------------------------------------------------------------|
| 白名单显示 | 显示白名单信息 |
| 白名单部署 | 更新智能合约部署白名单 |

<h3>白名单显示</h3>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    whitelist show

</TabItem>
</Tabs>

显示白名单信息。

---

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    whitelist show [--chain GENESIS_FILE]

</TabItem>
  <TabItem value="example" label="Example">

    whitelist show --chain genesis.json

</TabItem>
</Tabs>

指定要更新的 genesis 文件。默认：`./genesis.json`。

---

<h3>白名单部署</h3>

<h4><i>链</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    whitelist deployment [--chain GENESIS_FILE]

</TabItem>
  <TabItem value="example" label="Example">

    whitelist deployment --chain genesis.json

</TabItem>
</Tabs>

指定要更新的 genesis 文件。默认：`./genesis.json`。

---

<h4><i>添加</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    whitelist deployment [--add ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    whitelist deployment --add 0x5383Cb489FaCa92365Bb6f9f1FB40bD032E6365d

</TabItem>
</Tabs>

将新地址添加到合约部署白名单中。只有在合约部署白名单中的地址才能部署合约。如果为空，任意地址都可执行合约部署

---

<h4><i>移除</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    whitelist deployment [--remove ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    whitelist deployment --remove 0x5383Cb489FaCa92365Bb6f9f1FB40bD032E6365d

</TabItem>
</Tabs>

从合约部署白名单中移除某个地址。只有在合约部署白名单中的地址才能部署合约。如果为空，任意地址都可执行合约部署

---

### 备份标志 {#backup-flags}

<h4><i>grpc-address</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    backup [--grpc-address GRPC_ADDRESS]

</TabItem>
  <TabItem value="example" label="Example">

    backup --grpc-address 127.0.0.1:9632

</TabItem>
</Tabs>

gRPC API 的地址。默认：`127.0.0.1:9632`。

---

<h4><i>出</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    backup [--out OUT]

</TabItem>
  <TabItem value="example" label="Example">

    backup --out backup.dat

</TabItem>
</Tabs>

存档文件保存的路径。

---

<h4><i>来自</i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    from [--from FROM]

</TabItem>
  <TabItem value="example" label="Example">

    backup --from 0x0

</TabItem>
</Tabs>

存档中的起始区块高度。默认：0。

---

<h4><i> 至 </i></h4>

<Tabs>
  <TabItem value="syntax" label="Syntax" default>

    to [--to TO]

</TabItem>
  <TabItem value="example" label="Example">

    backup --to 0x2710

</TabItem>
</Tabs>

存档中区块的终端高度。

---

## Genesis 模板 {#genesis-template}
genesis 文件应用于设置区块链的初始状态（例，如果某些账户需要有起始余额）。

生成以下 *./genesis.json* 文件：
````json
{
    "name": "example",
    "genesis": {
        "nonce": "0x0000000000000000",
        "gasLimit": "0x0000000000001388",
        "difficulty": "0x0000000000000001",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "coinbase": "0x0000000000000000000000000000000000000000",
        "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    "params": {
        "forks": {},
        "chainID": 100,
        "engine": {
            "pow": {}
        }
    },
    "bootnodes": []
}
````

### 数据目录 {#data-directory}

执行 *data-dir* 标志，生成**测试链**文件夹。文件夹的结构包括以下子文件夹：
* **区块链** - 为区块链对象存储 LevelDB
* **尝试** - 存储用于 Merkle 尝试的 LevelDB
* **钥库** - 存储客户端的私有密钥。其中包括 libp2 私钥和封装/验证者私钥
* **共识** - 存储客户端在工作时可能需要的任何共识信息。

## 资源 {#resources}
* **[协议缓冲器](https://developers.google.com/protocol-buffers)**
