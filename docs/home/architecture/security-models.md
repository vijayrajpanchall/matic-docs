---
id: security-models
title: Security Models
description: PoS, Plasma and Hybrid securities
keywords:
  - docs
  - matic
  - polygon
  - security
  - implementation
image: https://wiki.polygon.technology/img/polygon-logo.png
---

# Security Models

Polygon provides three types of security models for a developer to build their dApps upon:

1. [Proof of Stake security](#proof-of-stake-security)
2. [Plasma security](#plasma-security)
3. [Hybrid (Plasma + PoS)](#hybrid)

We have described each of these security models offered by Polygon and the developer workflow for each with an example dApp below.

## Proof of Stake Security

Proof of Stake (PoS) security is provided by the Heimdall & Bor layer which is built on top of Tendermint. A checkpoint is committed to the root chain only when ⅔ of the validators have signed on it.

To enable the PoS mechanism on our platform, we employ a set of staking management contracts on Ethereum, as well as a set of incentivized validators running Heimdall and Bor nodes. This implements the following features:

- The ability for anyone to stake MATIC tokens on the Ethereum smart contract and join the system as a Validator
- Earn staking rewards for validating state transitions on Polygon

The PoS mechanism also acts as a mitigation to the data unavailability problem for our sidechains in terms of Plasma.

We have a fast finality layer that finalizes the sidechain state periodically via checkpoints. The fast finality helps us cement sidechain state. The EVM compatible chain has few validators and faster block time with high throughput. It chooses scalability over high degrees of decentralization. Heimdall ensures that the final state commit is bulletproof and passes via a large validator set and hence high decentralization.

**For developers**

As a dApp developer building on PoS security, the procedure is as simple as taking your smart contract and deploying it on the Polygon PoS network. This is possible because of the account based architecture enabling an EVM-compatible sidechain.

## Plasma Security

Polygon provides "Plasma Guarantees" with respect to various attack scenarios. Two main cases considered are:

- Chain operator (or in Polygon, the Heimdall layer) is corrupt, or
- The user is corrupt

In either case, if a user’s assets on the plasma chain have been compromised, they need to start mass exiting. Polygon provides constructions on the rootchain smart contract that can be leveraged. For more details and technical specifications regarding this construction and attack vectors considered, read [here](https://ethresear.ch/t/account-based-plasma-morevp/5480).

Effectively, security offered by Polygon's Plasma contracts piggybacks on Ethereum’s security. Users’ funds are only ever at risk if Ethereum fails. Put simply, a plasma chain is as secure as the main chain consensus mechanism. This can be extrapolated to say that the plasma chain can use really simple consensus mechanisms and still be safe.

**For developers**

As a dApp developer, if you would like to build on Polygon with Plasma security guarantee, you are required to write custom predicates for your smart contracts. This basically means writing the external contracts that handle the dispute conditions set in place by the Polygon plasma constructs.

## Hybrid

Apart from pure Plasma security and pure Proof of Stake security which is possible in dApps deployed on Polygon, there is also a Hybrid approach that developers can follow - which simply means having both Plasma and Proof of Stake guarantees on some particular workflows of the dApp.

This approach is better understood with an example.

Consider a gaming dApp with a set of smart contracts that describe the game’s logic. Let’s say the game uses its own ERC20 token to reward players. Now, the smart contracts defining the game logic can be deployed on Polygon sidechain directly - guaranteeing Proof of Stake security to the contracts while the ERC20 token transfer can be secured with Plasma guarantees and fraud proof embedded in Polygon's root chain contracts.
