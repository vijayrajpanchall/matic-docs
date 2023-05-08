---
id: polybft-allowlist
title: Allowlisting Validators
sidebar_label: Allowlisting validators
description: "Learn about how allowlising works for validators."
keywords:
  - docs
  - polygon
  - edge
  - consensus
  - polybft
  - pos
---

This document provides an overview of how validator allowlisting works in Supernets.

Allowlisting is a critical feature in Supernets that allows the contract owner to manage a list of authorized users who can access specific functions or features of the contract. In the context of the consensus mechanism, allowlisting is used to restrict participation in consensus rounds to a select group of validators.

:::note The current implementation of the consensus engine only allows for allowlisting of validators.
:::

---

The allowlisting mechanism is a powerful tool for building compliant-based networks and solutions. By restricting access to certain functions or features, it becomes easier to ensure that only authorized parties can interact with the network in a way that complies with regulatory requirements. For example, a compliant-based network may restrict access to certain functions or features to only authorized entities such as licensed financial institutions.

The allowlisting mechanism can also restrict access to other functions or features of the contract. For example, the contract owner may restrict access to administrative functions or sensitive data to only authorized addresses.

In addition to restricting participation in consensus rounds, allowlisting can prevent malicious actors from taking control of the network. Restricting access to certain functions or features makes it much more difficult for attackers to compromise the network's security.

The Supernet [CVSAccessControl module](/docs/supernets/modules/access-control) allows the owner to add or remove addresses to the allowlist.
