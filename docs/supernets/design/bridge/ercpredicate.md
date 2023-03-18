---
id: erc20-predicate
title: Bridging ERC20 Tokens Between Supernet and Rootchain
sidebar_label: Bridging ERC20 tokens between Supernet and rootchain
description: ""
keywords:
  - docs
  - polygon
  - edge
  - bridge
  - fxportal
  - checkpoint
---

The `RootERC20Predicate` contract is responsible for bridging ERC20 tokens between a childchain and a rootchain.

A `deposit` function allows users to deposit ERC20 tokens from the rootchain into the childchain. It first maps the root token to a child token and then transfers the specified amount of root tokens from the sender to the contract. Afterward, it sends a message to the child ERC20 predicate with information about the deposit, which results in the minting of the equivalent amount of child tokens to the receiver's address on the childchain.

A `withdraw` function allows users to withdraw ERC20 tokens from the childchain to the rootchain. It first burns the equivalent amount of child tokens on the childchain and then sends a message to the exit helper contract on the rootchain to withdraw the equivalent amount of root tokens to the receiver's address on the rootchain.

A `mapToken` function is used for token mapping when a new ERC20 token is being deposited for the first time. It maps the root token to a child token and emits an event to log the mapping.

All functions emit events that log the amount and token involved in the transaction.
