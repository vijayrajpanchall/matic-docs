---
id: supernets-deploy-bridge
title: How to Emit Cross-Chain Transactions
sidebar_label: Local bridge-mode transactions
description: "An introduction to Polygon Supernets."
keywords:
  - docs
  - Polygon
  - edge
  - supernets
  - childchain
  - network
  - modular
---

This document outlines how use the emit transaction from a rootchain to childchain.

:::info Stay tuned for upcoming deployment guides
Please stay tuned for our upcoming deployment guides on the deployment of Polygon Supernets, including cloud deployment scripts (e.g., AWS and Azure) and Infrastructure-as-a-service (IaaS) using Terraform.

At present, the genesis workflow and deployment of Polygon Supernets are undergoing testing. We will soon be releasing documentation on how to deploy a Supernet in bridge-mode using the Mumbai testnet and not a demo Geth instance, as well as guides for deploying Supernets to the cloud using AWS and using Terraform scripts for infrastructure as a service.

This will also include all available functions for the native bridge, such as deposit and withdraw.

We appreciate your patience and look forward to sharing our deployment guides with you as soon as testing is successful.
:::

## Overview

This tutorial will guide you through the process of transferring tokens between the rootchain and a sidechain using the native PolyBFT cross-chain bridge.
To follow this tutorial, you should already have a working Polygon network with the bridge contracts deployed. You should also have some test tokens on both the rootchain and the sidechain.

:::note Bridge mode

Recall that when a PolyBFT node has configured the rootchain JSON-RPC IP address, it is running in bridge mode. By default, the bridge is in active.

:::

:::info Fast-track guide

**If you're just looking for a quick guide on the essential commands needed to emit transactions using the bridge, here's the fast-track guide.**

<details>
<summary>Emit cross-chain transactions</summary>

1. Send tokens from the rootchain to the sidechain

  ```bash
  polygon-edge rootchain emit --contract <sidechain-bridge-contract> --wallets <wallets> --amounts <amounts>
  ```

</details>

:::

## What you'll learn

- How to send tokens from the rootchain to the sidechain in bridge mode.
- How to send tokens from the sidechain to the rootchain in bridge mode.

### Learning outcomes

By the end of this tutorial, you will be able to:

- Know how to use the Polygon bridge to send tokens from rootchain to sidechain.
- Know how to use the Polygon bridge to send tokens from sidechain to rootchain.

## Prerequisites

Before starting the tutorial, make sure you have the following prerequisites:

- A basic understanding of Ethereum smart contracts and how they work.
- A local instance of the rootchain (i.e. Geth instance) and sidechain network (i.e. local supernet) already set up and running.
- A local instance of the Polygon core contracts deployed on both the rootchain and sidechain network.

## What you'll do

The tutorial will cover the following steps:

1. Send tokens from the rootchain to the sidechain.
2. Send tokens from the sidechain to the rootchain.

## Emitting transactions

When transferring tokens in bridge mode, you need to specify whether you want to use the `stateSender` or `checkpoint` approach, depending on which chain you are transferring the tokens from. From rootchain to sidechain, stateSender approach is used, and from sidechain to rootchain, checkpoint approach is used.

This will be available from the genesis.json file that you created. For example:

```json
"bridge": {
  "stateSenderAddr": "0x6FE03c2768C9d800AF3Dedf1878b5687FE120a27",
  "checkpointAddr": "0x3d46A809D5767B81a8836f0E79145ba615A2Dd61",
  "adminAddress": "0x1FC1411A3Bd09E63d4A306FD1EB838bA457ddA13",
  "jsonRPCEndpoint": "http://127.0.0.1:8545"
},
```

> If you are unfamailar with the cross-chain bridge, check out the system design documentation.

Once you have set up the local testing environment and deployed the core contracts to the rootchain, you can use the `polygon-edge rootchain emit` command to transfer tokens and provide the following arguments:

- `--contract`: The address of the sidechain Bridge contract.
- `--wallets`: A comma-separated list of sidechain wallet addresses that you want to fund.
- `--amounts`: A comma-separated list of amounts that you want to transfer to the corresponding sidechain wallet.

### 1. Send tokens from the rootchain to the sidechain

For example, if you want to send 100 tokens to the wallets with addresses 0x1234567890123456789012345678901234567890 and 0xabcdefabcdefabcdefabcdefabcdefabcdefabcd, and the address of the bridge `stateSenderAddr` is 0x6FE03c2768C9d800AF3Dedf1878b5687FE120a27, you can use the following command:

```bash
polygon-edge rootchain emit --contract 0x6FE03c2768C9d800AF3Dedf1878b5687FE120a27 --wallets 0x1234567890123456789012345678901234567890,0xabcdefabcdefabcdefabcdefabcdefabcdefabcd --amounts 100,100
```

This command will trigger the transfer of tokens from the rootchain to the specified sidechain wallets.

### 2. Send tokens from the sidechain to the rootchain

For example, if you want to transfer 50 tokens from the sidechain wallet with address 0xabcdefabcdefabcdefabcdefabcdefabcdefabcd to the rootchain wallet with address 0x1234567890123456789012345678901234567890, and the address of the bridge `checkpointAddr` is 0x3d46A809D5767B81a8836f0E79145ba615A2Dd61, you can use the following command:

```bash
polygon-edge rootchain emit --contract 0x3d46A809D5767B81a8836f0E79145ba615A2Dd61 --checkpoint --wallet 0xabcdefabcdefabcdefabcdefabcdefabcdefabcd --amount 50, 50
```

This command will trigger the transfer of 50 tokens from the sidechain to the rootchain using the checkpoint approach.

Note that the polygon-edge rootchain emit command only triggers the transfer of tokens from the rootchain to the sidechain. The actual transfer of tokens from the rootchain to the Sidechain Bridge contract is done by sending a transaction to the rootchain using your preferred Ethereum wallet. Once the transaction is confirmed on the rootchain, the tokens will be transferred to the Sidechain Bridge contract and can then be transferred to the specified sidechain wallets using the polygon-edge rootchain emit command.

Also note that in a local testing environment, the tokens being transferred are typically test tokens created at genesis, which have no real-world value and are not intended to be used in a production environment.
