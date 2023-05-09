---
id: staking
title: Validator Staking
sidebar_label: Validator staking
description: "Learn about about the staking module and how to stake."
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

This document describes the validator staking module available on a childchain and how to use it.

## Overview

The staking module in Polygon Supernets manages the staking process, where token holders can delegate their tokens to validators and participate in the consensus mechanism. The staking module defines a set of functions that validators can use to register, stake, unstake, and claim rewards.

The staking module is implemented as an abstract contract, meaning it cannot be deployed independently. Instead, other contracts can inherit from it and implement their staking logic using the functions defined in the module.

## Functions

Here's a brief overview of the functions defined in the staking module:

### `register`

This function allows a validator to register by providing their BLS public key and signature. The function verifies the registration by calling the `verifyValidatorRegistration` function and then adds the validator to the list of registered validators. Here's the function signature:

```solidity
function register(uint256[2] calldata signature, uint256[4] calldata pubkey) external;
```

### `stake`

This function allows a validator to stake tokens. The validator must be registered before they can stake. The function adds the staked tokens to the validator's stake and emits a `Staked` event. Here's the function signature:

```solidity
function stake() external payable onlyValidator;
```

### `unstake`

This function allows a validator to withdraw their staked tokens. The validator must be registered and have enough tokens staked to cover the withdrawal. The function subtracts the withdrawn tokens from the validator's stake and emits an `Unstaked` event. Here's the function signature:

```solidity
function unstake(uint256 amount) external;
```

### `setCommission`

This function allows a validator to set their commission rate. The commission rate is a percentage of the rewards earned by the validator that is kept by the validator. Here's the function signature:

```solidity
function setCommission(uint256 newCommission) external onlyValidator;
```

### `claimValidatorReward`

This function allows a validator to claim their earned rewards. The rewards are added to the validator's withdrawable rewards balance and emitted in a `ValidatorRewardClaimed` event. Here's the function signature:

```solidity
function claimValidatorReward() public;
```

### `sortedValidators`

This function returns a list of the top validators sorted by stake. The number of validators returned is specified by the `n` parameter. Here's the function signature:

```solidity
function sortedValidators(uint256 n) public view returns (address[] memory);
```

### `getValidatorReward`

This function returns the number of withdrawable rewards earned by a validator. Here's the function signature:

```solidity
function getValidatorReward(address validator) external view returns (uint256);
```

### `totalStake`

This function returns the total amount of tokens staked across all validators. Here's the function signature:

```solidity
function totalStake() external view returns (uint256);
```

### `totalStakeOf`

This function returns the total amount of tokens staked by a particular validator. Here's the function signature:

```solidity
function totalStakeOf(address validator) external view returns (uint256);
```
