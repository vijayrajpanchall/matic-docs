---
id: supernets-local-deploy
title: Deploy a local blockchain (non-bridge mode)
sidebar_label: Deploy a local blockchain (non-bridge mode)
description: "Learn how to deploy a local blockchain using the new Edge client with PolyBFT consensus."
keywords:
  - docs
  - Polygon
  - edge
  - supernets
  - childchain
  - network
  - modular
---

This document outlines how to deploy a local blockchain with PolyBFT consensus. In other words, a local Supernet is in non-bridge mode.

:::info Fast-track guide

**Here's the fast-track guide if you're just looking for a quick guide on the essential commands needed to set up a local blockchain.**

<details>
<summary>Deploy a local blockchain</summary>

1. Initialize PolyBFT consensus:

```bash
polygon-edge polybft-secrets --insecure --data-dir test-chain- --num 4
```

> Retrieve secrets output: `polygon-edge secrets output --data-dir test-chain-X`

2. Generate manifest file:

    **Option 1:**
    ```bash
    polygon-edge manifest \
    --validators-path ./ \
    --validators-prefix test-chain- \
    --path ./manifest.json \
    --premine-validators 100
    ```

    **Option 2:**
    ```bash
    polygon-edge manifest \
    --validators 16Uiu2HAmTkqGixWVxshMbbgtXhTUP8zLCZZiG1UyCNtxLhCkZJuv:DcBe0024206ec42b0Ef4214Ac7B71aeae1A11af0:1cf134e02c6b2afb2ceda50bf2c9a01da367ac48f7783ee6c55444e1cab418ec0f52837b90a4d8cf944814073fc6f2bd96f35366a3846a8393e3cb0b19197cde23e2b40c6401fa27ff7d0c36779d9d097d1393cab6fc1d332f92fb3df850b78703b2989d567d1344e219f0667a1863f52f7663092276770cf513f9704b5351c4 \
    --validators 16Uiu2HAm1kVEh4uVw41WuhDfreCaVuj3kiWZy44kbnJrZnwnMKDW:2da750eD4AE1D5A7F7c996Faec592F3d44060e90:088d92c25b5f278750534e8a902da604a1aa39b524b4511f5f47c3a386374ca3031b667beb424faef068a01cee3428a1bc8c1c8bab826f30a1ee03fbe90cb5f01abcf4abd7af3bbe83eaed6f82179b9cbdc417aad65d919b802d91c2e1aaefec27ba747158bc18a0556e39bfc9175c099dd77517a85731894bbea3d191a622bc \
    --path ./manifest.json \
    --premine-validators 100
    ```

3. Create a genesis file:

```bash
polygon-edge genesis --consensus polybft --validator-set-size=4 \
--bridge-json-rpc http://127.0.0.1:8545 \
--block-gas-limit 10000000 \
--premine 0x85da99c8a7c2c95964c8efd687e95e632fc533d6:1000000000000000000000 \
--epoch-size 10 \
--bootnode /ip4/127.0.0.1/tcp/30301/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW \
--bootnode /ip4/127.0.0.1/tcp/30302/p2p/16Uiu2HAmS9Nq4QAaEiogE4ieJFUYsoH28magT7wSvJPpfUGBj3Hq \
> genesis.json

```

4. Start the clients:

```bash
# Node 1
polygon-edge server --data-dir ./test-chain-1 \
--chain ./new-genesis/genesis.json \
--grpc-address :10000 \
--libp2p :10001 \
--jsonrpc :10002 \
--seal

# Node 2
polygon-edge server --data-dir ./test-chain-2 \
--chain ./new-genesis/genesis.json \
--grpc-address :20000 \
--libp2p :20001 \
--jsonrpc :20002 \
--seal

# Node 3
polygon-edge server --data-dir ./test-chain-3 \
--chain ./new-genesis/genesis.json \
--grpc-address :30000 \
--libp2p :30001 \
--jsonrpc :30002 \
--seal

# Node 4
polygon-edge server --data-dir ./test-chain-4 \
--chain ./new-genesis/genesis.json \
--grpc-address :40000 \
--libp2p :40001 \
--jsonrpc :40002 \
--seal
```

</details>

:::

---

## Overview

This tutorial will teach you how to set up a local blockchain using PolyBFT. The tutorial will use Polygon's polygon-edge binary to start multiple nodes on your local machine and create a custom blockchain environment with PolyBFT consensus.

## What you'll learn

- How to set up a local blockchain using PolyBFT consensus.
- How to configure a custom blockchain environment with PolyBFT consensus.

### Learning outcomes

By the end of this tutorial, you will be able to:

- Understand the basic configuration of a local blockchain.
- Start a local blockchain environment with PolyBFT consensus.

## Prerequisites

Before starting this tutorial, you should understand the basics of blockchain technology and be familiar with command-line interfaces. It would help if you also had the polygon-edge binary installed on your machine. Check out the [installation guide](/docs/supernets/operate/supernets-install) for more information if you haven't already.

Ensure you have the following system prerequisites:

- Go programming language (version 1.15 or later).
- At least 4 GB of RAM and 2 CPU cores.
- Sufficient disk space to store the childchain data.
- A stable internet connection.
- Firewalls or other network security measures should not block network ports used by Polygon Edge.
- Up-to-date operating system with the latest security patches and updates installed.

## What you'll do

The tutorial will cover the following steps:

1. Initialize PolyBFT consensus.
2. Generate manifest file.
3. Create a genesis file.
4. Start the node servers.

The diagram below illustrates a standard Supernet deployment in bridge mode.

<div align="center">
  <img src="/img/supernets/supernets-setup-non.excalidraw.png" alt="bridge" width="80%" height="40%" />
</div>

## Genesis workflow

### 1. Initialize PolyBFT consensus

PolyBFT is a consensus protocol used in the Polygon network that uses a validator set to achieve consensus.
> If you need to become more familiar with PolyBFT or consensus protocols in general, you can check out the [system design documents](/docs/category/system-design) for more information.

To initialize the PolyBFT consensus, we need to generate the necessary secrets for each node. This is done using the polygon-edge `polybft-secrets` command with the following options:

- `--data-dir`: specifies the data directory for the blockchain network
- `--num`: specifies the number of validator nodes to create

Additionally, we'll use the `--insecure` flag for testing as it skips the confirmation prompt and can potentially cause unintended consequences.

:::warning INSECURE LOCAL SECRETS - SHOULD NOT BE RUN IN PRODUCTION

`--insecure` is not intended for non-production environments.

:::

```bash
polygon-edge polybft-secrets --insecure --data-dir test-chain- --num 4
```

You should see an output for each validator similar to:

```bash
Public key (address) = 0xae3dA71AF168d86bF2A0C64748B56ee49e2105FD
BLS Public key       = 2a4fa1b7aeb6d11b6d24d5c2baa6c2a5da735a66edf37bdadc51b6d59f84859b277bb0c10ff6d2d795283d967eb6bac7aa1b66dfcb4e4234c6332f516e872ae7168fb1df46c2fd8d7c22cc5df4f00aaa3eb779cfc273c9eb947d6f72d4313c5c0fc895cc8de4eff8f5e33b9756c05d4f1bd2f34164bdeba2c1afaa9a7bdbe487
BLS Signature        = 1d65de8e967fe36af83c048619d066593707986deb76326e210035c184c7500020627a44cfe39dfe4669aa2a665d96a20c56a521321ec30efdcc222fb8262ac5
Node ID              = 16Uiu2HAmUjMXX6vTvMEMtywPUpiUtJxuDPWrk1f1zdMHNqZrkKHB
```

Each command will print the validator key, BLS public key, BLS signature, and the node ID. You will need the node ID of the first node for the next step.

Once the secrets have been generated, we can proceed to create the genesis file for the blockchain network. In this case, we are creating 4 validator nodes with the `--num` 4 option. The number of validators in the validator set can be adjusted based on the needs of the network.

The following diagram gives a visual of what a PolyBFT node looks like:

![bridge](/img/supernets/polybft-node.excalidraw.png)

:::note Minimum number of nodes

To create a fully functional PolyBFT cluster, it is recommended to have **at least 4 validator nodes**, as this is the minimum required for the PolyBFT consensus protocol to function properly."

:::

#### Retrieving secrets output

The secrets output can be retrieved again if needed by running the following command:

```bash
polygon-edge secrets output --data-dir test-chain-X
```

> In a production environment, it is recommended to keep the validator secrets secure and only to retrieve them when necessary. The secrets should not be shared or made public as they can be used to compromise the security of the blockchain network.

### Configure bootnodes

To ensure successful connectivity, a node needs to know which bootnode server to connect to to obtain information about all the remaining nodes on the network. The bootnode is also referred to as the rendezvous server in P2P terminology.

This tutorial will designate the first and second nodes as bootnodes for all other nodes. In this scenario, nodes connecting to node 1 or 2 will receive information on how to connect to each other through the mutually contacted bootnode.

To specify the bootnode, we need to conform to the multiaddr format, which is as follows:

```bash
/ip4/<ip_address>/tcp/<port>/p2p/<node_id>
```

Since we are running on localhost, it is safe to assume that the ip_address is 127.0.0.1.

For the port, we will use `30301` for the first node and `30302` for the second node. Since these are the ports, we will configure the libp2p server for node 1 and node 2 to listen on later.

We will use the Node ID of the first node for the first bootnode and the Node ID of the second node for the second bootnode.

After the assembly, the multiaddr connection string to node 1, which we will use as the bootnode will look something like this:

```bash
/ip4/127.0.0.1/tcp/30301/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW
```

Similarly, we construct the multiaddr for the second bootnode as shown below:

```bash
/ip4/127.0.0.1/tcp/30302/p2p/16Uiu2HAmS9Nq4QAaEiogE4ieJFUYsoH28magT7wSvJPpfUGBj3Hq
```

### 2. Generate manifest file

The manifest file contains public validator information as well as bridge configuration. It is an intermediary file later used for genesis specification generation and rootchain contracts deployment.

There are two ways to provide validators information:

Option 1: All the validators' information is present in the local storage of a single host, and therefore the directory is provided using the --validators-path flag and validators' folder prefix names using the --validators-prefix flag.

```bash
polygon-edge manifest \
    --validators-path ./ \
    --validators-prefix test-chain- \
    --path ./manifest.json \
    --premine-validators 100
```

In this example, we assume that the secrets have been generated in the ./test-chain- directories and the validator information can be found in files with the prefix test-chain-. The `--premine-validators` option is used to specify the number of validators to pre-fund on the chain. In this case, we are pre-funding 100 validators.

Option 2: Validator information is scaffolded on multiple hosts, and therefore we supply necessary information using the --validators flag. Validator information needs to be supplied in the strictly following format: "[p2p node id]:[public ECDSA address]:[public BLS key]".

```bash
polygon-edge manifest \
    --validators 16Uiu2HAmTkqGixWVxshMbbgtXhTUP8zLCZZiG1UyCNtxLhCkZJuv:DcBe0024206ec42b0Ef4214Ac7B71aeae1A11af0:1cf134e02c6b2afb2ceda50bf2c9a01da367ac48f7783ee6c55444e1cab418ec0f52837b90a4d8cf944814073fc6f2bd96f35366a3846a8393e3cb0b19197cde23e2b40c6401fa27ff7d0c36779d9d097d1393cab6fc1d332f92fb3df850b78703b2989d567d1344e219f0667a1863f52f7663092276770cf513f9704b5351c4 \
    --validators 16Uiu2HAm1kVEh4uVw41WuhDfreCaVuj3kiWZy44kbnJrZnwnMKDW:2da750eD4AE1D5A7F7c996Faec592F3d44060e90:088d92c25b5f278750534e8a902da604a1aa39b524b4511f5f47c3a386374ca3031b667beb424faef068a01cee3428a1bc8c1c8bab826f30a1ee03fbe90cb5f01abcf4abd7af3bbe83eaed6f82179b9cbdc417aad65d919b802d91c2e1aaefec27ba747158bc18a0556e39bfc9175c099dd77517a85731894bbea3d191a622bc \
    --path ./manifest.json \
    --premine-validators 100
```

In this example, we provide validator information using the --validators flag. We are supplying information for two validators, and each validator is specified using the following format: [p2p node id]:[public ECDSA address]:[public BLS key].

<details>
<summary>manifest.json example </summary>

```json
{
    "validators": [
        {
            "address": "0x0D09C4A285fdde3D6e5aD5DE819E3478554646D3",
            "blsKey": "089e8d5fd888a33aa5d957f4beeec033242f6657d5578de7a6c12e8856880e911033636a88a468d316fa81cb5212c3c30bc01c96c0614daabd7159c9d99c74c90dcf6f63c00644216569c46daab62dd2a7a77d7ae7912f7f360c38a65a3315020a79a59d8e7dc3ecf0720b2a6aea7b422ec8f7c679c2c2e514117007c254cebf",
            "blsSignature": "07c544bdfaaf7e5a3a2b20b2d869658e888a82e82500abff2a5c64fc43dc96de0b9b8c93144f61f7772682f03c5841d4b58236945c9540f5235ba22988a828fb",
            "balance": "0x64",
            "nodeId": "16Uiu2HAmCrcrnZkaEA2h2RskfWzuWEacuY4L5HsKiJxSxizKVJ6c"
        },
        {
            "address": "0x30aC45469E94DE3645Eb4D8Ce102a3092ee76157",
            "blsKey": "303d82a4557afd4619bf1e7c74fb3a08a7589d75761830cb3dcf5ec2f8f989641da0a4008351ebf22cedea99f43f0325c3c3c058bfa77ef0a234fe585635ee7f1ae1a671b1e04b436aa97a57fc46c334e4cb4fe59554b843e0a4fd948c71af940904aa5c68ce6323064ba35ef4ba737f5aedcf02ae6ec0e60bbd378888aa3560",
            "blsSignature": "1409c293b4e70f07808642b62d6844379c0f81a8598dfbb8fff377724f005fc906dec46f37df7de32407304f5242609b7fdf814f9990e2d2e159fb2d65b52954",
            "balance": "0x64",
            "nodeId": "16Uiu2HAm9ciNK5PDSSxLrqm9xMQfV3ExYqJrq4BNppzk6uNzQ5hL"
        },
        {
            "address": "0x9E1bFa593cAcD77BfcF9a8Dda0462da251566ae0",
            "blsKey": "0a1bfabba7180988cbec4615f688f0eb720388ca045f80a9bc8552583161baa50d29e9b4144edc49d1ea6fcaa4e692c11c2382c36ad446badeaf199d89d29f06003bcab24372da79e8e14f573edf600f040ace7fd70ecbce810d1cda17d9067d0cfe6f6d8a64ed2a990f96bb32e863d764486f89fee0110aefb3c4aa58e3682c",
            "blsSignature": "081e18ae366a83a1cb43d3767d22a657cf2839bdeb0c771016f2540689ec53801eca3015dd5f6052826c543f62bb39d6da33a59d5a29099720cc71c67332cda8",
            "balance": "0x64",
            "nodeId": "16Uiu2HAmMUqvhZfcxUZE7SDcsdBWqbKNB73s1Qd5JPk7od6zSQGS"
        },
        {
            "address": "0x82e3D3e4222Cc872C5552363c86287B796312E27",
            "blsKey": "0308999f67b8ba996c572e05f912d9beccd7dc74ed922c13b4b2b763f117028917b5150e69b61caf59f2d2acca260550a6eccc89684de220942a2f6a1a49e2d10d00be34839ad2df58bc062a1b0e4148cc16b07e420dbc37c3e0adfdaa19a38f0f1259bca720ccbf13b2acc5cd941f7fdeaa53e17c9677a13ae85d7fa9e8038a",
            "blsSignature": "14fd4833df57189f1c64e85a2765050704f33fd580c6ca34348a3d6fedf420ab2295ce0205dce801a8549783f8eeb3f6492f7af674bbff7e63d1511266ea86fc",
            "balance": "0x64",
            "nodeId": "16Uiu2HAm3AzRr6mTaLVg1pLVrhhAYs7kwVsUrwf4F6t8KZYJLBN2"
        }
    ],
    "rootchain": null,
    "chainID": 100
}
```

</details>

### 3. Create a genesis file

Once the secrets have been generated, we can create a genesis file with the specified parameters using the command:

```bash
polygon-edge genesis --consensus polybft --validator-set-size=4 \
--bridge-json-rpc http://127.0.0.1:8545 \
--block-gas-limit 10000000 \
--premine 0x85da99c8a7c2c95964c8efd687e95e632fc533d6:1000000000000000000000 \
--epoch-size 10 \
--bootnode /ip4/127.0.0.1/tcp/30301/p2p/16Uiu2HAmJxxH1tScDX2rLGSU9exnuvZKNM9SoK3v315azp68DLPW \
--bootnode /ip4/127.0.0.1/tcp/30302/p2p/16Uiu2HAmS9Nq4QAaEiogE4ieJFUYsoH28magT7wSvJPpfUGBj3Hq \
> genesis.json
```

This command generates a genesis file with the following parameters:

- `--consensus polybft`: specifies that we are using the PolyBFT consensus protocol.
- `--validator-set-size=4`: specifies the size of the validator set.
- `--bridge-json-rpc` <http://127.0.0.1:8545>: specifies the JSON-RPC endpoint of the rootchain bridge contract.
- `--block-gas-limit` 10000000: specifies the block gas limit.
- `--premine` 0x85da99c8a7c2c95964c8efd687e95e632fc533d6:1000000000000000000000: specifies the premine address and amount.
- `--epoch-size` 10: specifies the epoch size.

After executing this command, a **genesis.json** file will be created in the current working directory containing the configuration for the PolyBFT network.

### 4. Start the clients

After creating the genesis file, you need to start the servers for each node to begin running the network.

```bash
# Node 1
polygon-edge server --data-dir ./test-chain-1 \
--chain ./new-genesis/genesis.json \
--grpc-address :10000 \
--libp2p :10001 \
--jsonrpc :10002 \
--seal
```

- `polygon-edge` server: starts the server process.
- `--data-dir`: specifies the data directory for the node.
- `--chain`: specifies the location of the newly created genesis file.
- `--grpc-address`: specifies the address for the gRPC server to listen on.
- `--libp2p`: specifies the address for the libp2p server to listen on.
- `--jsonrpc`: specifies the address for the JSON-RPC server to listen on.
- `--seal`: starts the node in seal mode.

Repeat the above command for each node, replacing the --data-dir and port numbers with the appropriate values.

## Next Steps

Congratulations on successfully deploying a local blockchain with PolyBFT consensus! This is a crucial step towards creating a fully functional Supernet that acts as a sidechain to PoS mainnet.

To continue your Supernet journey, try deploying a [local Supernet in bridge-mode using a demo Geth instance](/docs/supernets/operate/supernets-local-deploy-supernet).
