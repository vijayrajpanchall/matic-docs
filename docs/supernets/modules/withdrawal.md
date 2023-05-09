---
id: withdraw
title: User Withdrawals
sidebar_label: User withdrawals
description: "Learn about the withdrawal module and how to perform withdrawals."
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

This document describes the withdrawal module available on a childchain and how to use it.

## Overview

**Child Validator Set Withdrawal** is a module in Polygon Supernets that allows users to withdraw their rewards from the network.

## Withdrawing Rewards

The `withdraw` function is called on the CVSWithdrawal contract to withdraw rewards. Here's an example of how to withdraw rewards to the address 0x123...456:

```solidity
function withdrawRewards(address cvsWithdrawal) external {
    ICVSWithdrawal(cvsWithdrawal).withdraw{value: 0}(0x123...456);
}
```

## Checking Withdrawal Status

To check the total amount of withdrawable rewards for a user, use the `withdrawable` function:

```solidity
function withdrawable(address account) external view returns (uint256 amount);
```

For example:

```solidity
uint256 withdrawableAmount = cvsWithdrawal.withdrawable(account);
```

To check the total amount of pending withdrawals for a user, use the `pendingWithdrawals` function:

```solidity
function pendingWithdrawals(address account) external view returns (uint256);
```

For example:

```solidity
uint256 pendingWithdrawalAmount = cvsWithdrawal.pendingWithdrawals(account);
```

Note that the withdrawable function returns the immediately withdrawable amount, while the `pendingWithdrawals` function returns the total amount of withdrawals still in progress.
