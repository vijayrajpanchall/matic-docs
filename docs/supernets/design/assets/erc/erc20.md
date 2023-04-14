---
id: erc20
title: ERC-20
sidebar_label: Native assets
description: "Learn about the predefined token standards on a childchain."
keywords:
  - docs
  - Polygon
  - edge
  - supernets
  - childchain
  - network
  - modular
---

This document presents an overview on the ERC-20 standard available in Supernets.

Polygon Supernets offer two token standards for creating fungible tokens on the network: `NativeERC20` and `ChildERC20`. Both standards are based on the widely-used ERC-20 standard and offer similar functionality. However, there are key differences in their deployment and management.

:::caution Minting and deployment steps will be available shortly

:::

---

## ChildERC20

`ChildERC20` is a token standard that allows developers to create fungible tokens on the childchain. It is based on the ERC-20 standard and offers similar functionality. To create a new ChildERC20 token, developers can use the `ChildERC20` contract as a template and deploy it on the childchain. The contract requires a name, symbol, and number of decimals to determine the minimum unit of the token.

`ChildERC20` tokens are minted and burned on the childchain through the corresponding `ERC20Predicate` contract. This ensures that the supply of tokens on the rootchain and the childchain remains in sync. The ERC20Predicate contract also allows for the transfer of tokens between the two networks.

## NativeERC20

`NativeERC20` is the native token contract used on Polygon Supernets. It is designed for the childchain and offers fast and inexpensive transactions. `NativeERC20` is deployed on the network's rootchain and is managed through the System contract. It can be minted and burned by the Predicate contract.

`NativeERC20Mintable` is the contract used to create and manage `NativeMintable` tokens, which are non-fungible tokens that represent assets on the childchain. These tokens can be managed through the NativeBridge contract and transferred between the Polygon and Ethereum networks. `NativeERC20` offers similar functionality to the ERC-20 standard, including the ability to transfer tokens between addresses, approve others to spend tokens on your behalf, and check your balance.

### EIP1559Burn

The `EIP1559Burn` contract is an additional feature on the Polygon Supernets that allows users to convert their `NativeERC20` tokens into ERC-20 tokens. This contract is useful for users who want to move their native tokens to the Polygon PoS network or other networks that support ERC-20 tokens. To use the `EIP1559Burn` contract, users first need to initialize the contract by specifying the address of the `ChildERC20Predicate` contract on the childchain and the destination address on the rootchain where the ERC-20 tokens will be sent after burning. Once initialized, users can call the `withdraw` function, which will burn the native tokens and send the equivalent amount of ERC-20 tokens to the specified destination address.

## Differences Between ChildERC20 and NativeERC20

The main difference between `ChildERC20` and `NativeERC20` is their deployment and management. `ChildERC20` is deployed on the childchain and is used as a token standard for creating fungible tokens on the childchain. In contrast, `NativeERC20` is deployed on the rootchain and is used as the native token on the network.

`ChildERC20` tokens are managed through the `ERC20Predicate` contract, while NativeERC20 is managed through the System contract. `ChildERC20` tokens can be transferred between the Polygon and Ethereum networks through the ERC20Predicate contract, while `NativeERC20` tokens can be managed through the NativeBridge contract.

Despite these differences, both standards offer similar functionality based on the ERC-20 standard. `ChildERC20` provides a simple and familiar way to create and manage tokens on Polygon's childchain, while `NativeERC20` serves as the network's native token on the rootchain. Both standards allow for the transfer of tokens between addresses, approval for others to spend tokens on your behalf, and the ability to check your balance.

Developers and users can choose between `ChildERC20` and `NativeERC20` based on their specific needs and use cases. `ChildERC20` offers a way to create and manage tokens on the childchain, while `NativeERC20` serves as the native token on the rootchain. Both standards offer similar functionality based on the ERC-20 standard and can be used to create fungible tokens on the childchain.
