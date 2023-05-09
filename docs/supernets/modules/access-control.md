---
id: access-control
title: Validators Access Control
sidebar_label: Validators access control
description: "Learn about the access control module and how to allowlist validators."
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

This document describes the access control module available on a childchain and how to use it.

## Overview

`CVSAccessControl` is a module in Polygon Supernets that allows the contract owner to add and remove addresses to the allowlist. The allowlist can grant access to certain functions or features of the contract to specific addresses.

## Adding Addresses to the Allowlist

To add addresses to the allowlist, call the `addToWhitelist` function on the `CVSAccessControl` contract. Here's an example of how to add two addresses to the allowlist:

```solidity
function addAddressesToWhitelist(address cvsAccessControl, address[] memory addressesToAdd) external onlyOwner {
    ICVSAccessControl(cvsAccessControl).addToWhitelist(addressesToAdd);
}
```

## Removing Addresses from the Allowlist

To remove addresses from the allowlist, call the `removeFromWhitelist` function on the `CVSAccessControl` contract. Here's an example of how to remove two addresses from the allowlist:

```solidity
function removeAddressesFromWhitelist(address cvsAccessControl, address[] memory addressesToRemove) external onlyOwner {
    ICVSAccessControl(cvsAccessControl).removeFromWhitelist(addressesToRemove);
}
```

## Checking Whether an Address is Allowlisted

To check whether an address is allowlisted, you can call the allowlist mapping directly. Here's an example:

```solidity
function isWhitelisted(address cvsAccessControl, address account) external view returns (bool) {
    return ICVSAccessControl(cvsAccessControl).whitelist(account);
}
```

## Events

The following events are emitted by the `CVSAccessControl` contract:

```solidity
AddedToWhitelist(address account): emitted when an address is added to the whitelist.
RemovedFromWhitelist(address account): emitted when an address is removed from the whitelist.
```
