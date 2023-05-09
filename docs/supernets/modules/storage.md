---
id: storage
title: Childchain Storage
sidebar_label: Childchain storage
description: "Learn about the storage module and how the childchain stores key system components."
keywords:
  - docs
  - polygon
  - edge
  - consensus
  - module
---

:::warning Breaking changes

This module is in active development and subject to change. The current version can be used by calling the functions directly in your smart contract code. However, in the future, the module may have CLI commands that allow you to call these functions directly from the command line.

It's important to note that this module is not yet fully tested and should not be used in production environments without thorough testing.

:::

This document describes the storage module available on a childchain and how to use it.

## Overview

**Child Validator Set Storage** is a module in Polygon Supernets that manages the storage of the Polygon PoS (Proof-of-Stake) consensus protocol.

## Validator Set

The validator set is managed by a `ValidatorTree`, which implements a binary tree. The root of this tree is the current validator set for the current epoch.

The `ValidatorTree` stores the following information for each validator:

- **BLS key**: A BLS public key used for verifying signatures and participating in consensus.
- **Stake**: The total amount of tokens the validator has staked in the network.
- **Total stake**: The total amount of tokens the validator and its delegators staked.
- **Commission**: The percentage of rewards taken by the validator.
- **Withdrawable rewards**: The total rewards the validator has earned but has yet to withdraw.
- **Active**: Whether the validator is active in the network.

## Epochs

The PoS consensus protocol divides time into epochs. A new validator set is selected for the next epoch at the end of each epoch. The CVSStorage contract stores information about the current and past epochs.

For each epoch, the following information is stored:

- **End block**: The block number at which the epoch ends.
- **Reward**: The total amount of tokens distributed to validators and delegators during the epoch.
- **Minimum stake**: The minimum amount of tokens required to become a validator in the epoch.
- **Minimum delegation**: The minimum amount of tokens required to delegate to a validator in the epoch.

## Withdrawals

A `WithdrawalQueue` manages withdrawals for each account. When a withdrawal is requested, the requested amount is added to the queue with the epoch at which the withdrawal can be processed.

The `CVSWithdrawal` module manages withdrawals for delegators, while the CVSValidator module manages withdrawals for validators.

## Allowlist

The `allowlist` is a mapping of addresses allowed to become validators.

## Functions

The CVSStorage contract provides the following functions:

- `getValidator`: Returns information about a validator.
- `verifyValidatorRegistration`: Verifies a validator's registration by validating their BLS signature.
- `message`: Returns the message to sign for a validator registration.

> The `CVSStorage` contract contains other functions, but they are only meant to be called by the other modules in the Polygon PoS consensus protocol and should not be called directly by users.
