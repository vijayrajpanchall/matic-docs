---
id: supernets-faqs
title: Technical FAQs
sidebar_label: Technical FAQs
description: "Learn about the most common FAQs for Supernets."
keywords:
  - docs
  - polygon
  - edge
  - install
  - installation
---

This document outlines common technical queries related to Supernets.

---

## Can I migrate from Edge to Supernets?

Yes, it is possible to migrate from a blockchain running on an older Edge version with IBFT 1.0 consensus to a new blockchain running on Supernets with PolyBFT consensus using IBFT 2.0. However, the migration process will involve a hard fork, as IBFT 2.0 is not fully backward compatible with IBFT 1.0.

To upgrade to a new blockchain with PolyBFT consensus using IBFT 2.0, you would need to:

- Create a new genesis block for the new blockchain with PolyBFT consensus using IBFT 2.0.
- Migrate the data and state from the old blockchain to the new blockchain.

## What is the recommended RPC endpoint for the rootchain?

Choosing a reliable and publicly available RPC endpoint for the rootchain is essential to ensure correct handling of checkpoint information. It is recommended to connect directly to a node endpoint rather than a load balancer to guarantee validators can facilitate specific requests.

## Can a Supernet use a custom token standard instead of the default token contracts?

While using the standard ERC20 and ERC721 contracts is highly preferred, it is not mandatory. If a Supernet employs a custom standard, it must adhere to the chain configuration, as the bridge allows for arbitrary messages and data sharing between chains and can interpret any form of data. Additionally, a custom standard would need to follow the same steps as generating a Native ERC-20 using the default core contracts, which includes deploying, mapping, and bridging.

## Is using the native bridge integration mandatory?

Using the native bridge integration is highly recommended, but not mandatory.

A "full Supernet" utilizes the Edge client with PolyBFT consensus, native bridge, on-chain governance or allowlisting as needed, and an ecosystem of premium tooling.

The native Supernet bridge logic consists of the `ChildERC20Predicate` core contract on the childchain for deposits and withdrawals, the `RootERC20Predicate` core contract on the rootchain for bridging tokens, a `relayer` to execute calls and transactions (one of the validators at genesis would be declared as the relayer), and a `JSON-RPC endpoint` to the rootchain.

Other contracts work in conjunction with these components. If a custom bridge is used, it would need to work seamlessly with these contracts to ensure that deposits, withdrawals, and token bridging are handled correctly. In such cases, it's crucial to test the bridge rigorously and ensure that all necessary dependencies are available and properly configured.

## Can existing rootchain contracts be used instead of needing to deploy new ones?

In theory, existing rootchain contracts can be used, but it is not practical with the current contract configuration.

Manually updating the childchain manifest to point to existing rootchain contract addresses may disrupt or challenge checkpoints and chain state, leading to problems if there is a fork on the childchain. Furthermore, updating the checkpoint manager's address could trigger an exit with the wrong checkpoint manager, leading to incorrect state transitions and potential loss of funds. Deploying new contracts on the rootchain ensures all necessary dependencies are available and properly configured, avoiding compatibility issues or other unforeseen problems.

## Is it necessary to deploy new instances of rootchain contracts for each childchain instance when running multiple childchains?

Yes, new instances of rootchain contracts must be deployed for each childchain instance. Each childchain instance is independent and requires its own set of contracts to function properly. Deploying and managing multiple instances of contracts can be complex and requires careful consideration of factors such as cost, security, and scalability. It is essential to plan and test thoroughly before implementing a solution with multiple childchains.

## Is the identity of a childchain instance linked to the rootchain contract address on the rootchain?

Yes, the identity of a childchain instance is linked to the rootchain contract address on the rootchain. Each childchain instance is associated with a specific set of rootchain contracts, and its identity is determined by the address of those contracts on the rootchain.

<!--
## Is Edge the only consensus client for Supernets?

## How can you verify that checkpoints were successful?

## How does the Supernet handle state transitions in case of a fork on the childchain?

## What are the recovery options in case of a validator node failure on a Supernet?

## How do Supernets manage the interchain communication latency and its impact on the overall performance?
-->
