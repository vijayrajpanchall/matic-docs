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

| Release Version | Release Date   | Commit   | Features and Highlights                                                                                                                                             |
| --------------- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [v0.8.1](https://github.com/0xPolygon/polygon-edge/releases/tag/v0.8.1)          | April 5th, 2023| 7b7ee40  | <ul><li>Introduces NativeERC20Mintable token contract, allowing for native token minting.</li><li>EVM-568: Increases MaxBlockBacklog for block tracker to improve network performance.</li><li>EVM-433-TOB-EDGE-35: Addresses lack of domain separation vulnerability.</li><li>Adds support for `--stake` flag in manifest command, enabling easier configuration of validator nodes.</li><li>Fixes limit for TX pool contract creation size, resolving an issue that could cause failed transactions.</li></ul> |
| [v0.8.0](https://github.com/0xPolygon/polygon-edge/releases/tag/v0.8.0)          | March 20th, 2023| f427c11 | <ul><li>Introduces PolyBFT consensus.</li><li>Bumps go-IBFT to latest.</li><li>Enables Smart contract allowlisting.</li><li>Enables Validator allowlisting.</li><li>Adds regenesis migration support.</li><li>Reuses chain ID from manifest when creating genesis configuration.</li><li>Provides validators in the same order when initializing CheckpointManager and genesis.</li><li>Adds gRPC data validation.</li></ul> |
