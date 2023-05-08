---
id: erc20
title: ERC-20
sidebar_label: ERC-20
description: "Learn about the predefined ERC-20 token standards for Polygon Supernets."
keywords:
  - docs
  - polygon
  - supernets
  - erc
  - erc20
  - token
  - native
---

This document presents an overview on the ERC-20 standard available in Supernets.

Supernets provide developers with two standards for creating ERC-20 fungible tokens on their networks: `NativeERC20` and `ChildERC20`. These standards are based on the widely-used ERC-20 standard and offer similar functionality, including the ability to transfer tokens between addresses, approve others to spend tokens on your behalf, and check your balance. However, there are significant differences in their deployment and management.

## ChildERC20

The [`ChildERC20`](/docs/supernets/interfaces/erc20/childerc20.md) token standard is used for tokens mapping and enables developers to create tokens on both the Supernet and the associated rootchain. To create a new `ChildERC20` token, developers can use the `ChildERC20` contract as a template and deploy it on their Supernet. The contract requires a name, symbol, and number of decimals to determine the minimum unit of the token.

`ChildERC20` tokens are minted and burned on the Supernet through the corresponding [`ERC20Predicate`](/docs/supernets/interfaces/erc20/childerc20-predicate.md) contract. This ensures that the supply of tokens on the rootchain and the Supernet remains in sync. The `ERC20Predicate` contract also allows for the transfer of tokens between the two networks using the native bridge.

## NativeERC20

The [`NativeERC20`](/docs/supernets/interfaces/erc20/native-erc20.md) token standard represents native tokens on the Supernets and offers fast and inexpensive transactions. It is deployed only on the Supernet and relies on the native transfer precompile to make transfers. The `NativeERC20` tokens can be minted and burned by the associated predicate contract.

In addition, developers can use the `NativeERC20Mintable` contract to create and manage `NativeMintable` tokens, which are fungible tokens that represent assets on the Supernet. These tokens can be managed through the native bridge contract and transferred between a Supernet and rootchain networks.

## Deposits and Withdrawals

The deposit and withdrawal functionality plays a critical role in bridging ERC-20 tokens between a rootchain and a Supernet. 

When a user wants to deposit ERC-20 tokens into a Supernet, they call the `deposit` function. This function maps the root token to a child token and then mints the equivalent amount of child tokens to the user's address on the Supernet. By doing this, the ERC-20 tokens are effectively transferred from the rootchain to the Supernet. The user can then use these tokens on the Supernet or transfer them to other addresses on the network.

On the other hand, when a user wants to withdraw ERC-20 tokens from a Supernet to the rootchain, they call the `withdraw` function. This function burns the equivalent amount of child tokens on the Supernet and then triggers a function on the rootchain that transfers the equivalent amount of root tokens to the user's address on the rootchain. By doing this, the ERC-20 tokens are effectively transferred from the Supernet back to the rootchain.

Both the `deposit` and `withdraw` functions emit events that log the amount and token involved in the transaction. This provides transparency and allows users to track the movement of their tokens between the two networks.

### EIP1559Burn

The `EIP1559Burn` contract is an additional feature that allows users to convert their `NativeERC20` tokens into ERC-20 tokens. This is useful for users who want to move their native tokens to the Polygon PoS network or other networks that support ERC-20 tokens. To use the `EIP1559Burn` contract, users first need to specify the address of the `ChildERC20Predicate` contract on the Supernet and the destination address on the rootchain where the ERC-20 tokens will be sent after burning. Once initialized, users can call the `withdraw` function, which will burn the native tokens and send the equivalent amount of ERC-20 tokens to the specified destination address.
