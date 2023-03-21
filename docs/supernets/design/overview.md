---
id: overview
title: Architecture Overview
sidebar_label: Supernets overview
description: "Introduction to the architecture of Supernets."
keywords:
  - docs
  - polygon
  - edge
  - architecture
  - modular
  - layer
  - libp2p
  - extensible
---

This document provides an architectural overview of Polygon Supernets.

:::caution In active development

**This Hub documents the functionality of the upcoming v0.8.0 release.**

**The code is being audited and should not be used in production environments.**
Please get in touch with the Polygon team if you want to use it in production or have any questions.

:::

---

The following diagram offers an architectural overview of Polygon Supernets.

![bridge](/img/supernets/supernets-overview.excalidraw.png)

## libp2p

The networking layer for Supernets is provided by **[libp2p](https://libp2p.io/)**, designed for peer-to-peer network architectures and is modular, extensible, and fast, making it a fitting choice for Supernets.

Check out the [network overview document](/docs/supernets/design/libp2p.md) to learn more.

## Bridge

Supernets incorporate an in-built bridging mechanism, enabled by PolyBFT, that allows arbitrary message passing between a Supernet and another Proof-of-Stake blockchain without mapping. StateSync is used to continuously sync the state of the rootchain with the childchain, while the validator set commits checkpoints for passing messages from a childchain to a rootchain.

Check out the [bridge documents](/docs/supernets/design/bridge/overview.md) to learn more.

## Message Pool

The Message Pool enables multiple validators to aggregate their signatures to create a single, aggregated signature representing all validators in the pool. This feature is used to obtain asynchronous agreement for some data for the `StateSyncs`. The pool is implemented using a variant of the `BLS` signature scheme.

Check out the [mempool overview document](/docs/supernets/design/mempool.md) to learn more.

## Consensus

PolyBFT serves as the consensus mechanism of Polygon Supernets and consists of a consensus engine, IBFT 2.0, and a consensus protocol that includes the bridge, staking, and other utilities.

Check out the [consensus documents](/docs/category/polybft-consensus) to learn more.

## Blockchain

The Blockchain layer in Polygon Supernets coordinates everything in the system, curates state transitions, and is responsible for state changes when a new block is added to the chain.

Check out the [blockchain overview document](/docs/supernets/design/blockchain.md) to learn more.

## Runtime (EVM)

Supernets use the EVM as their runtime environment for executing smart contracts.
The runtime environment is designed to be highly scalable and fast, with the ability
to process transactions and execute smart contracts at significantly faster speeds than those of the Ethereum mainnet.

Check out the [runtime overview document](/docs/supernets/design/runtime/overview.md) to learn more.

## TxPool

The TxPool layer represents the transaction pool, and it is closely linked with other modules
in the system, as transactions can be added from multiple entry points.

Check out the [txpool overview document](/docs/supernets/design/txpool.md) to learn more.

## JSON-RPC

The JSON-RPC layer is a crucial API layer that facilitates interaction between dApp developers and the blockchain. It allows developers to issue JSON-RPC requests to a Supernet node and receive responses, enabling them to build custom applications that interact with the blockchain.

Check out the [JSON-RPC overview document](/docs/supernets/design/jsonrpc.md) to learn more.

## gRPC

The gRPC layer is essential for operator interactions, as it allows node operators to interact with the client easily and provides a seamless user experience.

Check out the [gRPC overview document](/docs/supernets/design/grpc.md) to learn more.
