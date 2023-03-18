---
id: polybft-allowlist
title: Allowlisting Validators
sidebar_label: Allowlisting validators
description: "Explanation about PolyBFT, the consensus mechanism for Polygon Edge."
keywords:
  - docs
  - polygon
  - edge
  - consensus
  - polybft
  - pos
---

This documents provides an overview on how allowlisting works in Supernets.

---

The current implementation of the consensus engine only allows for allowlisting of validators.

Allowlisting is a process in Polygon Supernets that allows the contract owner to manage a list of authorized users who can access specific functions or features of the contract. This is done through the [CVSAccessControl module](/docs/supernets/modules/access-control), which allows the owner to add or remove addresses to the allowlist.

Addresses on the allowlist can access certain functions or participate in consensus rounds, which helps to ensure the security and integrity of the blockchain system. The allowlisting mechanism helps to prevent malicious actors from taking control of the network by controlling who can access certain features.
