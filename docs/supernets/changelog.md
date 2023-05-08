---
id: supernets-changelog
title: Changelog
sidebar_label: Changelog
description: "The changelog for the Polygon Edge client and Supernets stack."
keywords:
  - docs
  - polygon
  - supernets
  - edge
  - features
  - changelog
  - updates
---

:::caution Changes in v0.9

As of v0.9, there are several important changes to note:

- The release is not backward compatible. Starting a blockchain from scratch is required to use this version, or waiting for future migration scripts that will support migration from previous versions.
- As of v0.9, there is no support for manifest configuration (manifest.json) and it is also no longer part of the genesis process. The genesis file (genesis.json) now includes the necessary app-specific configuration.
- Delegation is no longer supported. This means that nodes can no longer delegate their stake to other nodes in the network. Instead, nodes are required to be allowlisted on the network.

Please take these changes into account before using the v0.9 release.

:::

| Release Version | Release Date   | Commit   | Features and Highlights                                                                                                                                             |
| --------------- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [v0.9.0](https://github.com/0xPolygon/polygon-edge/releases/tag/v0.9.0) | May 5th, 2023  | 25eb3a2 | <ul><li>Expands allowlists to include both transaction and bridge transaction allowlists</li><li>Adds support for transaction blocklist</li><li>Introduces staking support for MATIC on the rootchain</li><li>Separates staking, rewards, and gas tokens so that each can be paid with a different token</li><li>Adds bridge support for ERC-721 and ERC-1155</li><li>Introduces EIP-1559 support</li><li>Improvements to the Genesis workflow</li><li>Removal of Manifest configuration and other deployment optimizations</li></ul> |
| [v0.8.1](https://github.com/0xPolygon/polygon-edge/releases/tag/v0.8.1)          | April 5th, 2023| 7b7ee40  | <ul><li>Introduces native ERC-20, allowing for native token minting.</li><li>EVM-568: Increases MaxBlockBacklog for block tracker to improve network performance.</li><li>EVM-433-TOB-EDGE-35: Addresses lack of domain separation vulnerability.</li><li>Adds support for `--stake` flag in manifest command, enabling easier configuration of validator nodes.</li><li>Fixes limit for TX pool contract creation size, resolving an issue that could cause failed transactions.</li></ul> |
| [v0.8.0](https://github.com/0xPolygon/polygon-edge/releases/tag/v0.8.0)          | March 20th, 2023| f427c11 | <ul><li>Introduces PolyBFT consensus.</li><li>Bumps go-IBFT to latest.</li><li>Enables Smart contract allowlisting.</li><li>Enables Validator allowlisting.</li><li>Adds regenesis migration support.</li><li>Reuses chain ID from manifest when creating genesis configuration.</li><li>Provides validators in the same order when initializing CheckpointManager and genesis.</li><li>Adds gRPC data validation.</li></ul> |
