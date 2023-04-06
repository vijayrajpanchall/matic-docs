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

This document provides a quick start guide to help users set up a Supernet with the PolyBFT consensus engine using the Edge consensus client's script.

> Before getting started, ensure you have Go programming language installed on your system (version >= 1.15 and <= 1.19). To install Go, run the following
> command in your terminal (we are using 1.18 in this example): `sudo apt-get install golang-1.18`
> Or, use a package manager like [Snapcraft](https://snapcraft.io/go) for Linux, [Homebrew](https://formulae.brew.sh/formula/go) for Mac, and [Chocolatey](https://community.chocolatey.org/packages/golang) for Windows.

:::caution Supernets are in active development and not recommended for production use

In their current state, these guides are intended for testing purposes only. The software is subject to change and is still undergoing audits. Using Supernets in production may result in unexpected behavior and loss of funds. Please exercise caution and follow best practices when working with Supernets.

Please note that Supernets will be considered production ready upon the release of version 1.0.

:::

---

## 1. Clone and build Polygon Edge

Start by cloning the repository and building the Edge binaries:

  ```bash
  git clone https://github.com/0xPolygon/polygon-edge.git
  cd polygon-edge/
  go build -o polygon-edge
  ```

> Note that the default branch for the source code is `develop`.

## 2. Use the deployment script to start a local network

The script is available under the "scripts" directory of the client.
These are the optional configuration parameters you can pass to the script:

<details>
<summary>Flags</summary>

| Flag | Description | Default Value |
|------|-------------|---------------|
| --validator-set-size | Number of validators in the network. | 4 |
| --bridge-json-rpc | JSON-RPC endpoint for the bridge. | http://127.0.0.1:8545 |
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

To run the Supernets test environment locally, use the following command:

  ```bash
  ./scripts/cluster polybft
  ```

After running the command, the test network will be initialized with PolyBFT consensus engine and the genesis file will be created. Then, the four validators will start running, and their log outputs will be displayed in the terminal.

By default, this will start a Supernets network with PolyBFT consensus engine, four validators, and premine of 1 billion tokens at address `0x85da99c8a7c2c95964c8efd687e95e632fc533d6`.

The nodes will continue to run until stopped manually. To stop the network, open a new session and use the following command, or, simply press CTRL/Command C in the terminal window:

  ```bash
  ./scripts/cluster polybft stop
  ```

If you want to destroy the environment, use the following command:

  ```bash
  ./scripts/cluster polybft destroy
  ```

## 3. (Optional) Explanation of the deployment script

The deployment script is a wrapper script for starting a Supernets test network with PolyBFT consensus engine. It offers the following functionality:

- Initialize the network with either IBFT or PolyBFT consensus engine.
- Create the genesis file for the test network.
- Start the validators on four separate ports.
- Write the logs to separate log files for each validator.
- Stop and destroy the environment when no longer needed.
- The script also allows you to choose between running the environment from a local binary or a Docker container.

For reference, it is included below.

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
    genesis_params="--consensus polybft --validator-set-size=4 --bridge-json-rpc http://127.0.0.1:8545"
    ./polygon-edge polybft-secrets --insecure --data-dir test-chain- --num 4
    ./polygon-edge manifest
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
rm -f manifest.json

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

That's it! You should have successfully been able to start a local Supernet just by running the script.
