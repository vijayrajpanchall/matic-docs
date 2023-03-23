---
id: overview
title: Introduction to Native Supernet Bridging
sidebar_label: Introduction to native Supernet bridging
description: "Learn about the native bridge of Supernets."
keywords:
  - docs
  - polygon
  - fxportal
  - bridge
  - polybft
  - ethereum
---

This document provides an overview of the native cross-chain bridge in Supernets.

:::caution In active development

The bridge is in active development and the content in this section is subject to change.

The bridge should not yet be used in production environments.

:::

---

## Overview

Polygon Supernets incorporate a built-in two-way bridging mechanism that facilitates arbitrary message passing between a Supernet (also referred to as childchain) and another EVM-compatible PoS blockchain (referred to as rootchain). With this feature, messages can consist of any data type (arbitrary bytes), and the bridge operates as an extension of PolyBFT and can be enabled or disabled as needed.

To further visualize the concept of bridging between different blockchain levels, take a look at the following diagram:

<div>
  <img src="/img/supernets/l1-l2-l3.excalidraw.png" alt="bridge" style={{display: 'block', margin: '0 auto', width: '290px', height: 'auto', objectFit: 'contain'}}/>
</div>

This diagram provides a visual representation of how messages can be passed between different blockchain layers, allowing for seamless communication and coordination between various components of the network.

### StateSync: Real-Time Synchronization

Message passing between a `rootchain` and a `childchain` is achieved through continuous state synchronization, known as `StateSync`. This process involves transferring state data between system calls.

Check out the [StateSync document](/docs/supernets/design/bridge/statesync.md) to learn more.

### Checkpoints: Ensuring Liveliness and Reference Points

When passing messages from a `childchain` to a `rootchain`, the validator set commits checkpoints, which are snapshots of the `childchain` state containing only the root of the `Exit` events, excluding all transactions. Checkpoints serve as reference points for clients, and validators periodically checkpoint all transactions occurring on the `childchain` to the `rootchain`. Checkpoints also ensure liveliness and are submitted to the associated `rootchain` asset contract.

Check out the [checkpointing document](/docs/supernets/design/bridge/checkpoint.md) to learn more.

### Bridge States: Tracking Event Progress

The bridge can exist in one of three states:

- **Pending**: Events are waiting to be bundled and sent over.
- **Committed**: Event data has been relayed to the associated chain.
- **Executed**: The event has been committed, and the state executed, resulting in a state change.

### Token Standards: Supporting a Range of Assets

The bridge is compatible with various token standards, including `ERC20`, `ERC721`, and others, enabling a wide range of assets to be transferred between chains.
