---
id: delegation
title: Delegation to Validators
sidebar_label: Delegation to validators
description: "Learn about the delegation module and how to delegate."
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

This document describes the delegation module available on a childchain and how to use it.

## Overview

The **Child Validator Set Delegation** is a module in Polygon Supernets that allows token holders to delegate their tokens to a validator, participate in the consensus, and earn rewards.

:::note Background

Before diving into how the delegation module works, understand the following concepts.

- **Validators** are entities responsible for validating blocks on the network. Validators are chosen based on their reputation, stake, and activity level and are incentivized to maintain the network's health by earning rewards for their participation in consensus.

- **Delegators** are token holders who delegate their tokens to a validator to participate in consensus and earn rewards. Delegators do not have the power to validate blocks themselves but instead rely on validators to do so on their behalf.

- Delegators earn **rewards** based on the amount of tokens they have delegated to a validator and the validator's performance in the network. Validators can distribute rewards to their delegators either by sending them to the delegator's account or by automatically restaking them to earn even more rewards. The validator controls the reward distribution and is done on a per-block basis.

:::

## Delegating Tokens

The delegate function is called on the `CVSDelegation` contract to delegate tokens to a validator. Here's an example of how 1000 tokens would be delegated to the validator at the address `0x123...456`:

```solidity
function delegateTokens(address cvsDelegation, address validator) external {
    IERC20 token = IERC20(<TOKEN_ADDRESS>);
    uint256 amount = 1000 * (10 ** token.decimals());
    token.approve(cvsDelegation, amount);
    ICVSDelegation(cvsDelegation).delegate{value: 0}(validator, false);
}
```

Note that approval is initially required for the `CVSDelegation` contract to spend our tokens on our behalf. A user also needs to specify whether they want to restake their rewards (true, think of this as compounding your rewards) or withdraw them (false).

## Undelegating Tokens

To undelegate tokens from a validator, the `undelegate` function is called on the `CVSDelegation` contract. Here's an example of how 500 tokens are undelegated from the validator at the address
`0x123...456`:

```solidity
function undelegateTokens(address cvsDelegation, address validator) external {
    ICVSDelegation(cvsDelegation).undelegate(validator, 500 * (10 ** 18));
}
```

> Note that an amount of tokens needs to be specified to undelegate.

## Claiming Rewards

The `claimDelegatorReward` function is called on the `CVSDelegation` contract to claim rewards. Here's an example of how rewards are claimed for the validator at the address `0x123...456`:

```solidity
function claimRewards(address cvsDelegation, address validator) external {
    ICVSDelegation(cvsDelegation).claimDelegatorReward(validator, false);
}
```

> The delegator needs to specify whether they want to restake their rewards (true) or withdraw them (false).

## Checking Delegation and Rewards

To check the total delegation of a validator, use the `totalDelegationOf` function:

```solidity
function totalDelegationOf(address validator) external view returns (uint256);
```

For example:

```solidity
uint256 delegation = cvsDelegation.totalDelegationOf(validator);
```

To check the delegation of a specific delegator, use the `delegationOf` function:

```solidity
function delegationOf(address validator, address delegator) external view returns (uint256);
```

For example:

```solidity
uint256 delegation = cvsDelegation.delegationOf(validator, delegator);
```
