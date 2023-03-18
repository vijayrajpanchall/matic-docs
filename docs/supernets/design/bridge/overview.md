---
id: overview
title: Introduction to Native Supernet Bridging
sidebar_label: Introduction to native Supernet bridging
description: "Learn about the bridge for Supernets"
keywords:
  - docs
  - polygon
  - fxportal
  - bridge
  - polybft
  - ethereum
---

This document provides an overview of the native cross-chain bridge in Polygon Supernets.

## Overview

Polygon Supernets incorporates a built-in two-way bridging mechanism that facilitates arbitrary message passing between a Supernet (also referred to as `childchain`) and another proof-of-stake blockchain (referred to as `rootchain`). This transfer process can occur without the need for mapping.

> Messages can consist of any data type (arbitrary bytes).
> The bridge operates as an extension of PolyBFT and can be enabled or disabled as needed.

### StateSync: Real-Time Synchronization

Message passing between a `rootchain` and a `childchain` is achieved through continuous state synchronization, known as `StateSync`. This process involves transferring state data between system calls.

Check out the [StateSync doucment](/docs/supernets/design/bridge/statesync) to learn more.

### Checkpoints: Ensuring Liveliness and Reference Points

When passing messages from a `childchain` to a `rootchain`, the validator set commits checkpoints, which are snapshots of the `childchain` state containing only the root of the `Exit` events, excluding all transactions. Checkpoints serve as reference points for clients, and validators periodically checkpoint all transactions occurring on the `childchain` to the `rootchain`. Checkpoints also ensure liveliness and are submitted to the associated `rootchain` asset contract.

Check out the [checkpointing doucment](/docs/supernets/design/bridge/checkpoint) to learn more.

### Bridge States: Tracking Event Progress

The bridge can exist in one of three states:

- **Pending**: Events are waiting to be bundled and sent over.
- **Committed**: Event data has been relayed to the associated chain.
- **Executed**: The event has been committed, and the state executed, resulting in a state change.

### Token Standards: Supporting a Range of Assets

The bridge is compatible with various token standards, including `ERC20`, `ERC721`, and others, enabling a wide range of assets to be transferred between chains.
