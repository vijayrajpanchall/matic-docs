---
id: supernets-runtime-allowlist
title: Smart Contract Allowlist
sidebar_label: Smart contract allowlist
description: "Stake, unstake and other staking-related instructions."
keywords:
  - docs
  - polygon
  - edge
  - stake
  - unstake
  - validator
  - epoch
---

This document provides an overiew on the contract allowlisting capabilities of Supernets.

---

## Overview

An `allowlist` package provides a mechanism to manage and control access to specific Supernet resources, contracts, or functionalities. By creating an allowlist, maintainers can limit access to particular addresses, ensuring a controlled and secure environment for their applications.

The `allowlist` package is implemented as a precompiled contract, offering optimized performance and resource consumption benefits. Although it is not an actual smart contract, it interacts with the external components of the blockchain application, like a smart contract, providing seamless integration.

To interact with the precompiled contract allowlist, users and smart contracts can send transactions to the predefined contract address (`AllowListContractsAddr`). The input data sent to this address should include the function signature and the necessary parameters. The precompiled contract will process the input data and execute the corresponding function, such as adding, modifying, or querying the roles of addresses in the Allowlist.

## Roles

There are currently three defined roles within the system:

- **NoRole**: The address has no access or permissions.
- **EnabledRole**: The address has limited access and can perform specific operations.
- **AdminRole**: The address has full access and can manage the Allowlist.

### Initializing and managing Admins in the Allowlist

To ensure effective management of the Allowlist, at least one address with the AdminRole should be assigned when initializing the Allowlist in your blockchain application. Admins have the authority to modify the roles of other addresses, granting or revoking access to resources or functionalities as needed.

#### When setting up the Allowlist, you should

- Select a trusted address to serve as the admin.
- Assign the `AdminRole` to this address in the Allowlist.

This admin address will manage the Allowlist, including adding new addresses and changing their roles between NoRole, EnabledRole, and AdminRole. Ensure that the admin address is secure and that only authorized users have access to it to maintain the integrity and security of your application.

#### Designating Multiple Admins

You can designate multiple admin addresses for redundancy and better access control management. Having more than one admin can help:

- Prevent single points of failure.
- Distribute the responsibility of managing the Allowlist among multiple trusted entities.

However, assigning multiple admins also increases the potential attack surface. It is essential to strike the right balance between security and flexibility when managing admin addresses or use your best judgment based on the needs and purpose of the network.

## Current limitations

**Limited role definitions**: The current implementation only supports three roles (NoRole, EnabledRole, and AdminRole). You must modify the implementation if your application requires more granular access control or additional roles.

**Gas costs**: The gas costs for the operations (read and write) are hard-coded, which may only be ideal for some scenarios. You may need to adjust these values based on the specific requirements of your application or consider implementing a more dynamic gas cost model.

**Function validation**: The current implementation assumes that the input data is always in the correct format. If an invalid input is passed, it may result in unexpected behavior. Adding input validation checks can improve the robustness and security of the implementation.

**Static call limitation**: Write operations are not allowed in static calls, which might be a constraint in certain scenarios where you would want to perform a write operation within a static call.
