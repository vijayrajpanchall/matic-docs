---
id: bor-chain
title: What is BoR-Chain?
sidebar_label: Bor Chain
description: Introduction to Bor Chain or the Sidechain VM for Polygon PoS
keywords:
  - docs
  - matic
  - polygon
  - bor chain
  - sidechain VM
image: https://wiki.polygon.technology/img/polygon-logo.png
---

# Bor Chain

The Bor node, or the block producer implementation, is basically the sidechain operator. The sidechain VM is EVM-compatible. Currently, it is a basic Geth implementation with custom changes done to the consensus algorithm. However, this will be built from the ground up to make it lightweight and focused.

Block producers are chosen from the validator set and are shuffled using historical Ethereum block hashes for the same purpose. However, we are exploring sources of randomness for this selection.