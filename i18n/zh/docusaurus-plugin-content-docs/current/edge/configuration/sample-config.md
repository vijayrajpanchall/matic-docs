---
id: sample-config
title: 服务器配置文件
description: "使用文件启动 Polygon Edge 服务器。"
keywords:
  - docs
  - polygon
  - edge
  - server
  - configuration
  - yaml
  - jason

---
# 服务器配置文件 {#server-configuration-file}
使用各种配文件启动具有各种配置选项的服务器，而不是使用正当的标志。用于使用配置文件开始服务器的命令：`polygon-edge server --config <config_file_name>`

## 使用默认配置导出配置文件 {#export-config-file-with-default-configuration}
Polygon Edge 服务器的默认设置的配置可以以`yaml`或`json`文件格式导出到配置文件中。文件可用作使用配文件运行服务器的模板。

### YAML {#yaml}
要用 `yaml`格式生成配置文件：
```bash
polygon-edge server export --type yaml
```
或只是
```bash
polygon-edge server export
```
名为`default-config.yaml`的配置文件将在与此命令所运行的相同目录中创建。

文件示例：
```yaml
chain_config: ./genesis.json
secrets_config: ""
data_dir: ""
block_gas_target: "0x0"
grpc_addr: ""
jsonrpc_addr: ""
telemetry:
  prometheus_addr: ""
network:
  no_discover: false
  libp2p_addr: 127.0.0.1:1478
  nat_addr: ""
  dns_addr: ""
  max_peers: -1
  max_outbound_peers: -1
  max_inbound_peers: -1
seal: true
tx_pool:
  price_limit: 0
  max_slots: 4096
log_level: INFO
restore_file: ""
block_time_s: 2
headers:
  access_control_allow_origins:
    - '*'
log_to: ""
```

### JSON {#json}
要用 `json`格式生成配置文件：
```bash
polygon-edge server export --type json
```
名为`default-config.json`的配置文件将在与此命令所运行的相同目录中创建。

文件示例：

```json
{
  "chain_config": "./genesis.json",
  "secrets_config": "",
  "data_dir": "",
  "block_gas_target": "0x0",
  "grpc_addr": "",
  "jsonrpc_addr": "",
  "telemetry": {
    "prometheus_addr": ""
  },
  "network": {
    "no_discover": false,
    "libp2p_addr": "127.0.0.1:1478",
    "nat_addr": "",
    "dns_addr": "",
    "max_peers": -1,
    "max_outbound_peers": -1,
    "max_inbound_peers": -1
  },
  "seal": true,
  "tx_pool": {
    "price_limit": 0,
    "max_slots": 4096
  },
  "log_level": "INFO",
  "restore_file": "",
  "block_time_s": 2,
  "headers": {
    "access_control_allow_origins": [
      "*"
    ]
  },
  "log_to": ""
}
```

请查看 [CLI 命令](/docs/edge/get-started/cli-commands)章节，以获得如何使用这些参数的信息。

### Typescript 模式 {#typescript-schema}

以下是配文件的样本格式。它在 TypeScript 中写入，以表达属性类型（`string`，`number`，`boolean`），您可以根据这些属性类型推导配置。值得提及的是，来自`type-fest`的`PartialDeep`类型用于表示所有属性是可选的。

```typescript
import { PartialDeep } from 'type-fest';

type ServerConfig = PartialDeep<{
  chain_config: string; // <genesis_file_path>
  secrets_config: string; // <secrets_file_path>
  data_dir: string; // <data_directory_path>
  block_gas_target: string; // <block_gas_limit>
  grpc_addr: string; // <grpc_listener_address>
  jsonrpc_addr: string; // <json_rpc_listener_address>
  telemetry: {
    prometheus_addr: string; // <prometheus_listener_address>
  };
  network: {
    no_discover: boolean; // <enable/disable_discovery>,
    libp2p_addr: string; // <libp2p_server_address>,
    nat_addr: string; // <nat_address>,
    dns_addr: string; // <dns_address>,
    max_peers: number; // <maximum_allowded_peers>,
    max_inbound_peers: number; // <maximum_allowded_inbound_peers>,
    max_outbound_peers: number; // <maximum_allowded_outbound_peers>
  };
  seal: boolean; // <enable/disable_block_sealing>
  txpool: {
    price_limit: number; // <minimum_gas_price_limit>
    max_slots: number; // <maximum_txpool_slots>
  };
  log_level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'DPANIC' | 'PANIC' | 'FATAL'; // <log_level>
  restore_file: string; // <restore_file_path>
  block_time_s: number; // <block_time_seconds>
  headers: Record<string, any>;
  log_to: string; // <log_to>
}>
```

