---
id: supernets-ibft-to-polybft
title: Regenesis from IBFT to PolyBFT
sidebar_label: Regenesis from IBFT to PolyBFT
description: "Learn how to migrate from a client running IBFT consensus to PolyBFT consensus."
keywords:
  - docs
  - Polygon
  - edge
  - supernets
  - childchain
  - network
  - modular
---

In this guide, you will learn how to transition from an existing IBFT consensus chain to a new chain with PolyBFT consensus.

## What you'll learn

You will be introduced to the following concepts:

- How to migrate from an existing IBFT consensus chain to a new chain with PolyBFT consensus.
- How to generate a trie snapshot, create new validators, and generate manifest and genesis files for a new chain.
- How to start a new PolyBFT chain and copy the new snapshot trie to each validator node.

## Prerequisites

Before beginning the regenesis process, there are some prerequisites that must be fulfilled. These include:

- Setting up a local IBFT consensus cluster for development purposes.

<details>
<summary>Create cluster</summary>

A dedicated script is provided as part of the client to facilitate the cluster setup, encompassing key generation, network configuration, data directory creation, and genesis block generation. To create an IBFT cluster, execute the following command:

  ```bash
  scripts/cluster ibft
  ```

</details>

- Ensuring that the accounts have sufficient funds.

<details>
<summary>Check balance</summary>

Before performing the regenesis, it's essential to ensure that the accounts have sufficient funds. You can check the balance using the following command:

  ```bash
  curl -s -X POST --data '{"jsonrpc":"2.0", "method":"eth_getBalance", "params":["0x85da99c8a7c2c95964c8efd687e95e632fc533d6", "latest"], "id":1}' http://localhost:10002
  ```

</details>

## What you'll do

The regenesis process involves several steps, which are outlined below:

1. Get trie root
2. Create trie snapshot
3. Remove old chain data
4. Create new validators
5. Generate the manifest file
6. Generate the genesis file
7. Start a new PolyBFT chain
8. Copy the snapshot trie to the data directory
9. Re-run the chain
10. Check account balance on v0.7.x+

### 1. Get trie root

First, you need to get the trie root of the existing chain:

  ```bash
  ./polygon-edge regenesis getroot --rpc "http://localhost:10002"
  ```

### 2. Create trie snapshot

Create a snapshot of the trie using the following command:

  ```bash
  ./polygon-edge regenesis \
  --target-path ./trie_new \
  --stateRoot 0xf5ef1a28c82226effb90f4465180ec3469226747818579673f4be929f1cd8663 \
  --source-path ./test-chain-1/trie
  ```

### 3. Remove old chain data

Remove the data of the old chain using the following command:

  ```bash
  rm -rf test-chain-*
  ```

### 4. Create new validators

Create new validators using the following command:

  ```bash
  ./polygon-edge polybft-secrets --insecure --data-dir test-chain- --num 4
  ```

The above command generates four validator keys and saves them in the test-chain- directory. However, it's worth noting that these keys are insecure, and you shouldn't use them in a production environment.

### 5. Generate the genesis file

Generate the genesis file for the new chain using the following command:

  ```bash
  ./polygon-edge genesis --consensus polybft --bridge-json-rpc http://127.0.0.1:8545 \
  --block-gas-limit 10000000 \
  --epoch-size 10 --trieroot 0xf5ef1a28c82226effb90f4465180ec3469226747818579673f4be929f1cd8663
  ```

### 6. Start new a PolyBFT chain

Start the new chain using the following command:

  ```bash
  ./polygon-edge server --data-dir ./test-chain-1 --chain genesis.json --grpc-address :10000 --libp2p :30301 --jsonrpc :10002 --seal --log-level DEBUG &
  ./polygon-edge server --data-dir ./test-chain-2 --chain genesis.json --grpc-address :20000 --libp2p :30302 --jsonrpc :20002 --seal --log-level DEBUG &
  ./polygon-edge server --data-dir ./test-chain-3 --chain genesis.json --grpc-address :30000 --libp2p :30303 --jsonrpc :30002 --seal --log-level DEBUG &
  ./polygon-edge server --data-dir ./test-chain-4 --chain genesis.json --grpc-address :40000 --libp2p :30304 --jsonrpc :40002 --seal --log-level DEBUG &
  ```

### 7. Copy the snapshot trie to the data directory

Once you have created a new snapshot trie, you need to copy it to the data directories of each of your four validator nodes. The following commands will remove the old trie directories and copy the new trie directory to each of the data directories:

  ```bash
  rm -rf ./test-chain-1/trie
  rm -rf ./test-chain-2/trie
  rm -rf ./test-chain-3/trie
  rm -rf ./test-chain-4/trie
  cp -fR ./trie_new/ ./test-chain-1/trie/
  cp -fR ./trie_new/ ./test-chain-2/trie/
  cp -fR ./trie_new/ ./test-chain-3/trie/
  cp -fR ./trie_new/ ./test-chain-4/trie/
  ```

### 8. Re-run chain

Once you have copied the new snapshot trie to each of the data directories, you can restart each of the validator nodes using the following commands:

  ```bash
  ./polygon-edge server --data-dir ./test-chain-1 --chain genesis.json --grpc-address :10000 --libp2p :30301 --jsonrpc :10002 --seal --log-level DEBUG &
  ./polygon-edge server --data-dir ./test-chain-2 --chain genesis.json --grpc-address :20000 --libp2p :30302 --jsonrpc :20002 --seal --log-level DEBUG &
  ./polygon-edge server --data-dir ./test-chain-3 --chain genesis.json --grpc-address :30000 --libp2p :30303 --jsonrpc :30002 --seal --log-level DEBUG &
  ./polygon-edge server --data-dir ./test-chain-4 --chain genesis.json --grpc-address :40000 --libp2p :30304 --jsonrpc :40002 --seal --log-level DEBUG &
  ```

### 9. Check that balance of account on v0.6 is not 0

Finally, you should check that the balance of your account on the v0.6 chain is not 0. This can be done using the following command:

  ```bash
   curl -s -X POST --data '{"jsonrpc":"2.0", "method":"eth_getBalance", "params":["0x85da99c8a7c2c95964c8efd687e95e632fc533d6", "latest"], "id":1}' http://localhost:10002

  {"jsonrpc":"2.0","id":1,"result":"0x3635c9adc5dea00000"}%
  ```

If the balance is not 0, then the snapshot was successfully imported.
