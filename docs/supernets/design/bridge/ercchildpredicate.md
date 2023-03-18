---
id: erc20-child-predicate
title: Managing ERC20 Tokens on Supernets
sidebar_label: Managing ERC20 tokens on Supernets
description: ""
keywords:
  - docs
  - polygon
  - edge
  - bridge
  - fxportal
  - checkpoint
---

A core contract called `ChildERC20Predicate` enables deposits and withdrawals of ERC20 tokens between an arbitrary rootchain and childchain.

A `deposit` function allows users to deposit ERC20 tokens from the rootchain into the childchain. It performs this by mapping the root token to a child token and then minting the equivalent amount of child tokens to the receiver's address on the childchain.

A `withdraw` function allows users to withdraw ERC20 tokens from the childchain to the rootchain. It performs this by burning the equivalent amount of child tokens on the childchain and then calling a function on the rootchain that transfers the equivalent amount of root tokens to the receiver's address on the rootchain.

Both functions emit events that log the amount and token involved in the transaction.
