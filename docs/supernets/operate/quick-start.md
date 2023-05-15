---
id: supernets-quick-start
title: Quick Start
sidebar_label: Quick Start
description: "Spin up a new childchain instance with one-click."
keywords:
  - docs
  - polygon
  - edge
  - supernets
  - quick
  - deploy
  - cluster
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DownloadButton from '@site/src/data/DownloadButton';

This document offers a quick start guide to assist users in setting up a local Supernet test environment using a pre-packaged Edge consensus client script.

:::warning Breaking changes
Supernets are rapidly evolving towards their production-ready state, and, as a result, instructions and concepts in these documents are subject to change. For production releases, we plan to version the documentation.

Test releases include breaking changes and offer no guarantees, including backward compatibility. Use the current test releases for testing and familiarization only.

It is highly recommended that you do not attempt deployments on your own; for support, please reach out to the Supernets team.
:::

Before proceeding, ensure that your system meets the necessary [system requirements](/docs/supernets/operate/system.md).

## Spawn a local Supernet in 2 minutes

<!--
<div class="download-container">
  <div class="download-text">
    <p><b>[EXPERIMENTAL] The download button will automatically provide the appropriate download link according your operating system.</b></p><p>For a list of releases, please visit the official release page <a href="https://github.com/0xPolygon/polygon-edge/releases"><ins>here</ins></a>.</p>
  </div>
  <div class="download-button">
    <DownloadButton
      macDownloadUrl="https://github.com/0xPolygon/polygon-edge/releases/download/v0.8.1/polygon-edge_0.8.1_darwin_amd64.tar.gz"
      macArmDownloadUrl="https://github.com/0xPolygon/polygon-edge/releases/download/v0.8.1/polygon-edge_0.8.1_darwin_arm64.tar.gz"
      linuxDownloadUrl="https://github.com/0xPolygon/polygon-edge/releases/download/v0.8.1/polygon-edge_0.8.1_linux_amd64.tar.gz"
      linuxArmDownloadUrl="https://github.com/0xPolygon/polygon-edge/releases/download/v0.8.1/polygon-edge_0.8.1_linux_arm64.tar.gz"
      buttonText="Download Polygon Supernets"
    />
  </div>
</div>
-->

To access the pre-built releases, visit the [GitHub releases page](https://github.com/0xPolygon/polygon-edge/releases). The client provides cross-compiled AMD64/ARM64 binaries for Darwin and Linux.

<details>
<summary>[REFERENCE] Extract pre-release package ↓</summary>

Extract the downloaded package using your file system's extraction tool or the provided commands below, and navigate to the pre-built release in your preferred interface or text editor.

<Tabs
defaultValue="linux"
values={[
{ label: 'Linux', value: 'linux', },
{ label: 'Mac', value: 'mac', },
{ label: 'Windows', value: 'windows', },
]
}>

<TabItem value="linux">

```bash
# replace <downloaded_package> with the actual package filename

tar -xzf <downloaded_package>
cd <downloaded_package>
```

</TabItem>

<TabItem value="mac">

```bash
# replace <downloaded_package> with the actual package filename

tar -xzf <downloaded_package>
cd <downloaded_package>
```

</TabItem>

<TabItem value="windows">

The tar command is available in PowerShell on Windows 10 (build 17063 or newer).

```bash
# replace <downloaded_package> with the actual package filename

tar -xzf <downloaded_package>
cd <downloaded_package>
```

For older Windows systems or Command Prompt, use third-party tools like 7-Zip or WinRAR, or the PowerShell cmdlet Expand-Archive.

```bash
# replace <downloaded_package> with the actual package filename
# replace <destination_folder> with the desired folder path for extracted files

Expand-Archive -Path <downloaded_package> -DestinationPath <destination_folder>
cd <destination_folder>
```

</TabItem>
</Tabs>

</details>

To run the Supernets test environment locally, run the following command from the project's root:

  ```bash
  ./scripts/cluster polybft
  ```

**That's it! You should have successfully been able to start a local Supernet just by running the script.**

> - Stop the network: "CTRL/Command C" or `./scripts/cluster polybft stop`.
> - Destroy the network: `./scripts/cluster polybft destroy`.

<details>
<summary>Deployment script details ↓</summary>

The script is available under the "scripts" directory of the client.
These are the optional configuration parameters you can pass to the script:

<details>
<summary>Flags ↓</summary>

| Flag | Description | Default Value |
|------|-------------|---------------|
| --block-gas-limit | Maximum gas allowed for a block. | 10000000 |
| --premine | Address and amount of tokens to premine in the genesis block. | 0x85da99c8a7c2c95964c8efd687e95e632fc533d6:1000000000000000000000 |
| --epoch-size | Number of blocks per epoch. | 10 |
| --data-dir | Directory to store chain data. | test-chain- |
| --num | Number of nodes in the network. | 4 |
| --bootnode | Bootstrap node address in multiaddress format. | /ip4/127.0.0.1/tcp/30301/p2p/... |
| --insecure | Disable TLS. | |
| --log-level | Logging level for validators. | INFO |
| --seal | Enable block sealing. | |
| --help | Print usage information. | |

</details>

After running the command, the test network will be initialized with PolyBFT consensus engine and the genesis file will be created. Then, the four validators will start running, and their log outputs will be displayed in the terminal.

By default, this will start a Supernets network with PolyBFT consensus engine, four validators, and premine of 1 billion tokens at address `0x85da99c8a7c2c95964c8efd687e95e632fc533d6`.

The nodes will continue to run until stopped manually. To stop the network, open a new session and use the following command, or, simply press "CTRL/Command C" in the CLI:

  ```bash
  ./scripts/cluster polybft stop
  ```

If you want to destroy the environment, use the following command:

  ```bash
  ./scripts/cluster polybft destroy
  ```

### Explanation of the deployment script

The deployment script is a wrapper script for starting a Supernets test network with PolyBFT consensus engine. It offers the following functionality:

- Initialize the network with either IBFT or PolyBFT consensus engine.
- Create the genesis file for the test network.
- Start the validators on four separate ports.
- Write the logs to separate log files for each validator.
- Stop and destroy the environment when no longer needed.
- The script also allows you to choose between running the environment from a local binary or a Docker container.

For reference, it is referenced below.

<details>
<summary>cluster</summary>

```sh
#!/usr/bin/env bash

function initIbftConsensus() {
    echo "Running with ibft consensus"
    ./polygon-edge secrets init --insecure --data-dir test-chain- --num 4

    node1_id=$(./polygon-edge secrets output --data-dir test-chain-1 | grep Node | head -n 1 | awk -F ' ' '{print $4}')
    node2_id=$(./polygon-edge secrets output --data-dir test-chain-2 | grep Node | head -n 1 | awk -F ' ' '{print $4}')

    genesis_params="--consensus ibft --ibft-validators-prefix-path test-chain- \
    --bootnode /ip4/127.0.0.1/tcp/30301/p2p/$node1_id \
    --bootnode /ip4/127.0.0.1/tcp/30302/p2p/$node2_id"
}

function initPolybftConsensus() {
    echo "Running with polybft consensus"
    genesis_params="--consensus polybft"
    ./polygon-edge polybft-secrets --insecure --data-dir test-chain- --num 4
}

function createGenesis() {
    ./polygon-edge genesis $genesis_params \
      --block-gas-limit 10000000 \
      --premine 0x85da99c8a7c2c95964c8efd687e95e632fc533d6:1000000000000000000000 \
      --epoch-size 10
}

function startServerFromBinary() {
  if [ "$1" == "write-logs" ]; then
    echo "Writing validators logs to the files..."
    ./polygon-edge server --data-dir ./test-chain-1 --chain genesis.json \
      --grpc-address :10000 --libp2p :30301 --jsonrpc :10002 \
      --num-block-confirmations 2 --seal --log-level DEBUG 2>&1 | tee ./validator-1.log &
    ./polygon-edge server --data-dir ./test-chain-2 --chain genesis.json \
      --grpc-address :20000 --libp2p :30302 --jsonrpc :20002 \
      --num-block-confirmations 2 --seal --log-level DEBUG 2>&1 | tee ./validator-2.log &
    ./polygon-edge server --data-dir ./test-chain-3 --chain genesis.json \
      --grpc-address :30000 --libp2p :30303 --jsonrpc :30002 \
      --num-block-confirmations 2 --seal --log-level DEBUG 2>&1 | tee ./validator-3.log &
    ./polygon-edge server --data-dir ./test-chain-4 --chain genesis.json \
      --grpc-address :40000 --libp2p :30304 --jsonrpc :40002 \
      --num-block-confirmations 2 --seal --log-level DEBUG 2>&1 | tee ./validator-4.log &
      wait
  else
    ./polygon-edge server --data-dir ./test-chain-1 --chain genesis.json \
      --grpc-address :10000 --libp2p :30301 --jsonrpc :10002 \
      --num-block-confirmations 2 --seal --log-level DEBUG &
    ./polygon-edge server --data-dir ./test-chain-2 --chain genesis.json \
      --grpc-address :20000 --libp2p :30302 --jsonrpc :20002 \
      --num-block-confirmations 2 --seal --log-level DEBUG &
    ./polygon-edge server --data-dir ./test-chain-3 --chain genesis.json \
      --grpc-address :30000 --libp2p :30303 --jsonrpc :30002 \
      --num-block-confirmations 2 --seal --log-level DEBUG &
    ./polygon-edge server --data-dir ./test-chain-4 --chain genesis.json \
      --grpc-address :40000 --libp2p :30304 --jsonrpc :40002 \
      --num-block-confirmations 2 --seal --log-level DEBUG &
      wait
  fi
}

function startServerFromDockerCompose() {
    case "$1" in
      "ibft")
        docker-compose -f ./docker/local/docker-compose.yml up -d --build
        ;;
      "polybft")
        cd core-contracts && npm install && npm run compile && cd -
        go run ./consensus/polybft/contractsapi/artifacts-gen/main.go
        EDGE_CONSENSUS=polybft docker-compose -f ./docker/local/docker-compose.yml up -d --build
        ;;
    esac
}

function destroyDockerEnvironment() {
    docker-compose -f ./docker/local/docker-compose.yml down -v
}

function stopDockerEnvironment() {
    docker-compose -f ./docker/local/docker-compose.yml stop
}

set -e

# Reset test-dirs
rm -rf test-chain-*
rm -f genesis.json

# Build binary
go build -o polygon-edge .

# If --docker flag is set run docker environment otherwise run from binary
case "$2" in
  "--docker")
    # cluster {consensus} --docker destroy
    if [ "$3" == "destroy" ]; then
      destroyDockerEnvironment
      echo "Docker $1 environment destroyed!"
      exit 0
    # cluster {consensus} --docker stop
    elif [ "$3" == "stop" ]; then
      stopDockerEnvironment
      echo "Docker $1 environment stoped!"
      exit 0;
    fi

    # cluster {consensus} --docker
    echo "Running $1 docker environment..."
    startServerFromDockerCompose $1
    echo "Docker $1 environment deployed."
    exit 0
    ;;
  # cluster {consensus}
  *)
    echo "Running $1 environment from local binary..."
    # Initialize ibft or polybft consensus
    if [ "$1" == "ibft" ]; then
      # Initialize ibft consensus
      initIbftConsensus
      # Create genesis file and start the server from binary
      createGenesis
      startServerFromBinary $2
      exit 0;
    elif [ "$1" == "polybft" ]; then
      # Initialize polybft consensus
      initPolybftConsensus
      # Create genesis file and start the server from binary
      createGenesis
      startServerFromBinary $2
      exit 0;
    else
      echo "Unsupported consensus mode. Supported modes are: ibft and polybft "
      exit 1;
    fi
  ;;
esac
```

</details>
</details>
