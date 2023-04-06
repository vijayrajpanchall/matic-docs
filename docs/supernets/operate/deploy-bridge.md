---
id: supernets-bridge
title: Use the Native Bridge
sidebar_label: Use the native bridge
description: "Learn how to use the native cross-chain bridge."
keywords:
  - docs
  - Polygon
  - edge
  - supernets
  - childchain
  - network
  - modular
---

:::caution Document is being updated
:::

This document outlines how to use the native bridge to deposit and withdraw ERC20 tokens across childchain and rootchain.

:::info Test version only available

Currently, Supernets are only available as a test release. The production-ready release is targetted for some time in Q2 2023, where the rootchain becomes Polygon PoS.

:::

:::tip Stay tuned for upcoming deployment guides

Deployment guides for Polygon Supernets are forthcoming, with cloud deployment scripts for GCP, AWS, and Azure, and Terraform infrastructure-as-a-service guides to be included. Stay tuned for updates!
:::

---

## Prerequisites

If you haven't already, please follow the [deployment guide](/docs/supernets/operate/local-blockchain.md)
before trying to run the commands to interact with the bridge.

## Deposit

```bash
$ ./polygon-edge bridge deposit-erc20 \
      --data-dir ./rootchain-secrets \
      --amounts 1000000000000000000,1000000000000000000,1000000000000000000,1000000000000000000 \
      --receivers 0x762D91379bb4241d0A7C74A9FF8dc43d56B36375,0x762D91379bb4241d0A7C74A9FF8dc43d56B36375,0x762D91379bb4241d0A7C74A9FF8dc43d56B36375,0x762D91379bb4241d0A7C74A9FF8dc43d56B36375 \
      --root-token 0x1A04Fc0f2C99DDA4Da5B9cEE7c46F2FF8b15D8d7 \
      --root-predicate 0x6551D7E524aC1fFfCb821a543BCb014Dc17b0fEe \
      --json-rpc https://mumbai-rpc.com
```

## Withdraw

```bash
$ ./polygon-edge bridge withdraw-erc20 \
      --data-dir <child chain account data directory> [--config <childchain account config path>] \
      --amounts <amounts to withdraw>
      --receivers <list of receiving accounts addresses on the rootchain> \
      --json-rpc <JSON RPC endpoint of one of the child chain validators> \
      [--child-token <address of child ERC20 token>]
      [--child-predicate <address of child ERC20 predicate>]
```

## Exit

```bash
./polygon-edge bridge exit \
      --data-dir ./rootchain-secrets \
      --exit-helper 0xe9Ddc8039e24BBfb97D023fC883d2D98edd36B04\
      --exit-id <exit event id> \
      --root-json-rpc https://mumbai-rpc.com \
      --child-json-rpc http://childchain-rpc.com
```
