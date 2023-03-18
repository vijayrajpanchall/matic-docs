---
id: statesync
title: Synchronizing Chain State between Rootchain and Supernet
sidebar_label:  Synchronizing chain state between rootchain and Supernet
description: ""
keywords:
  - docs
  - polygon
  - supernet
  - bridge
  - fxportal
  - childchain
  - rootchain
  - statesync
---

This document provides an overview of how StateSyncs work on in Supernets.

## Introduction

State synchronization (StateSync) is a mechanism used to update the state of a contract on the rootchain based on events occurring on a childchain. It is a critical component of blockchain technology as it enables secure and efficient communication between the two chains. State synchronization allows for a more efficient and secure way to update the chain state on the rootchain without needing to process all transactions from the genesis block.

## StateSync in Polygon

:::info Key points

- StateSync enables the efficient and secure transfer of data between a Supernet and rootchain.
- StateSync is initiated on the Supernet through the StateSender contract and executed on the rootchain through the StateReceiver contract.
- The StateSync process is used to update the state of a contract on the rootchain based on events occurring on the Supernet.
:::

### StateSender

The `StateSender` contract is responsible for generating sync state events based on receiver and data. The `syncState` function allows anyone to call this method to emit an event. The receiver on the Polygon chain should add a check based on the sender. The data is sent along with the event and represents the state change that needs to be executed on the rootchain.

### StateReceiver

The `StateReceiver` contract is responsible for executing and relaying the state data on the Supernet. It receives the state change data along with a Merkle proof from the StateSender contract and verifies the proof to ensure the data's integrity. If the proof is valid, the state change is executed on the rootchain.

The `StateReceiver` contract uses a Merkle tree to efficiently prove the membership of an event in the Supernet state. The tree is constructed using the event roots of each checkpoint, and the membership proofs can be verified using the Merkle proofs provided by the users.

The `StateReceiver` contract also implements a BLS signature scheme to verify the signatures submitted by the validators. The validators' signatures are aggregated, and the contract checks whether the required voting power threshold is met to accept the state change.

### L2StateSender

`L2StateSender` is a contract that allows for arbitrary message passing from a Supernet to the rootchain. When an event is emitted by `L2StateSender`, it is indexed by the rootchain validators and submitted as a commitment on the rootchain, allowing for lazy execution. There is no transaction execution on the rootchain, only a commitment of the emitted events are stored.

<details>
<summary>Synchronization and commitments</summary>

The StateSync process involves two main steps: synchronization and commitments.

In the synchronization step, the `StateSender` contract on the Supernet generates sync state events based on receiver and data. The `syncState` function allows anyone to call this method to emit an event. The data is sent along with the event and represents the state change that needs to be executed on the rootchain.

In the commitments step, the `StateReceiver` contract on the rootchain receives the state change data along with a Merkle proof from the `StateSender` contract and verifies the proof to ensure the data's integrity. If the proof is valid, the state change is executed on the rootchain.

To ensure the validity of the state change, the `StateSender` contract generates a unique id for each sync state event. This id is used by the `StateReceiver` contract to prevent replay attacks, which could result in the execution of duplicate state changes.

The `StateReceiver` contract also implements a BLS signature scheme to verify the signatures submitted by the validators. The validators' signatures are aggregated, and the contract checks whether the required voting power threshold is met to accept the state change.

Once the state change is verified and executed on the rootchain, the `StateReceiver` contract emits an event to notify the Supernet of the successful execution.

</details>
