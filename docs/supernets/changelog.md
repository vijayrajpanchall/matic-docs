---
id: supernets-changelog
title: Changelog
sidebar_label: Changelog
description: "The changelog for the Polygon Edge client and Supernets stack."
keywords:
  - docs
  - polygon
  - edge
  - consensus
  - interface
---

## [v0.8.0] - First Stable Release

**Release Date:** March 20th, 2023.
**Commit:** f427c11

This is the first version of full support for Supernets. For more detailed information, please refer to the [official changelog](https://github.com/0xPolygon/polygon-edge/releases/tag/v0.8.0).

### Features

- [Introduce PolyBFT consensus](/docs/supernets/design/consensus/polybft/overview.md)
- [Bump go-IBFT to latest](/docs/supernets/design/consensus/polybft/ibft.md)
- [Smart contract allowlisting](/docs/supernets/design/runtime/allowlist.md)
- [Validator allowlisting](/docs/supernets/design/consensus/validator/allowlisting.md)
- [Regenesis migration support](/docs/supernets/operate/ibft-to-polybft.md)
- [Reuse chain ID from manifest when creating genesis configuration](/docs/supernets/operate/local-supernet.md#4-create-chain-configuration-and-generate-a-genesis-file)
- [Provide validators in the same order when initializing CheckpointManager and genesis](/docs/supernets/operate/local-supernet.md#4-create-chain-configuration-and-generate-a-genesis-file)
- [gRPC data validation](/docs/supernets/design/grpc.md)
