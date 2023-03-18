---
id: supernets-pos
title: Delegated Proof of Stake (DPoS)
sidebar_label: Delegated Proof of Stake (DPoS)
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

This document presents an overview of Delegated Proof of Stake (DPoS), the Proof-of-Stake mechanism of Polygon Supernets.

---

## What is Delegated Proof of Stake (DPoS)?

Delegated Proof of Stake (DPoS) is a consensus mechanism used in blockchain networks that employs a voting system to select a fixed number of validators to secure the network. DPoS offers several advantages, including scalability, efficiency, and security.

## DPoS in Supernets

In the context of the Polygon Supernets, each network can have its network sovereignty, enabling a customized DPoS consensus mechanism that caters to the unique requirements of individual Supernets. Customizing the validator set provides greater flexibility to the consensus mechanism while retaining the benefits of scalability, efficiency, and security.

DPoS relies on the election process in which delegators participate by delegating their stake to their preferred validator candidates. Once selected, validators are responsible for verifying transactions and creating new blocks. Validators are incentivized to act in the network's best interest as they receive rewards for block creation and verification activities.

In a trustless and permissionless environment, stakeholders can participate in the network by delegating their stake to the validator of their choice. Validators are selected through a tamper-proof and transparent voting system that prevents collusion and bribery. DPoS ensures the selection of validators based on the stakeholders' preferences who are most likely to act in the network's best interest.

In a permissioned scenario, such as a company where all employees become delegators to delegate their stake for their company's validator set, [PolyBFT](/docs/supernets/design/consensus/polybft/polybft-overview) enables the company to maintain control over the validator set while allowing employees to participate in the network by delegating their stake. This arrangement provides additional security and control for the company while enabling network participation and rewards for all stakeholders.
