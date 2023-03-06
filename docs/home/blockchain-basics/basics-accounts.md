---
id: accounts
title: What are Accounts?
sidebar_label: Accounts
description: "EOAs and Contract Accounts."
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-logo.png
---

# What are Accounts?

The global state of Ethereum is comprised of accounts that interact with one another through a message-passing framework. The most basic interaction is that of sending some value - like MATIC tokens, Polygon's native token or $ETH, the native token of the Ethereum blockchain.

Each account is identified by a 20-byte hex identifier which is called an address - which is generated from the public key of the account.

There are two types of accounts: **Externally Owned Account** and **Contract Owned Accounts**.

## Externally Owned Accounts

EOA are accounts controlled by a private key, with the ability of sending tokens and messages.

1. They can send transactions (ether transfer or trigger contract code),
2. are controlled by private keys,
3. and have no associated code.

## Contract Owned Accounts
Contract Owned Account are accounts that have an associated smart contract code with it and their private key is not owned by anyone.

1. They have associated code,
2. their code execution is triggered by transactions or messages (calls) received from other contracts,
3. and when this code is executed - it performs operations of arbitrary complexity (Turing completeness) - manipulates its own persistent storage and can call other contracts.

### Resources

- [Read more about accounts](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
