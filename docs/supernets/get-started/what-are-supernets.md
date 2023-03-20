---
id: what-are-supernets
title: What are Supernets?
sidebar_label: What are Supernets
description: "An introduction to Polygon Supernets."
keywords:
  - docs
  - Polygon
  - edge
  - supernets
  - childchain
  - network
  - modular
---

This documents provides an overview on what Polygon Supernets are.

---
:::info Edge + Supernets is like Geth + Ethereum

Before diving into the documentation, please keep the following points in mind:

- **Polygon Supernets were officially introduced in v0.7.x of the Polygon Edge client.**
- **The Polygon team will prioritize the latest version of the Edge client, and as a result, will no longer provide support for older versions (v0.6.2 and earlier).**

  It is **highly recommend to upgrade to the latest version**, which includes the most up-to-date features and fixes. However, for users who prefer to stay on older versions, they may continue to do so. The repository will remain accessible, and users may fork it and use it as they wish, subject to applicable open-source license terms.

- **Polygon Edge serves as a consensus client implementation for Polygon Supernets, much like how Geth serves as a client implementation for Ethereum.**

Geth and Edge are client implementations for Ethereum and Supernet blockchains, respectively. They serve as intermediaries between nodes and their respective blockchains, allowing users to interact with the network and take advantage of its benefits. To draw an analogy, Geth and Edge are to Ethereum and Supernets what web browsers are to the internet, enabling users to access and interact with the network.

:::

## Introduction

Supernets are blockchain infrastructure that provide a modular framework for building fast, scalable, and secure blockchains with advanced features and capabilities. They are designed to be next-generation blockchain networks that can support a wide range of use cases. The Supernet initiative is poised to bring about a mass-scale adoption of blockchain technology by delivering a seamless user experience to the masses. By harnessing the power of web3, Supernets are paving the way for the next generation of decentralized applications that are secure, scalable, and compliant.

The sections below offer different prespectives on how to understand Supernets.

## A comprehensive distributed network design to build blockchains

Supernets offer a comprehensive blockchain design that encompasses all the crucial elements necessary for a functional and robust blockchain. These components include:

- A **high-performance client** implementation that leverages the Polygon Byzantine Fault Tolerance (PolyBFT) consensus protocol, which ensures fast and secure block creation.
- Smart contracts that implement a **staking** solution and **tokenization** for the creation of digital assets.
- A **native bridging solution** that enables the seamless transfer of assets from various blockchains back to the Polygon ecosystem. This bridging solution allows developers to customize bridge plugins to meet specific requirements, thereby facilitating interoperability between different blockchains.
- A **customizable virtual machine** that provides full Ethereum Virtual Machine (EVM) support out of the box, enabling developers to tailor the virtual machine to their specific needs and requirements. This feature includes customizing gas limits, adding new opcodes, and integrating with other technologies.
- A decentralized **on-chain governance** mechanism that enables community-driven decision-making and management of the blockchain.
- The most extensive **premium suite of service providers** that offer various node and deployment infrastructure, indexers, explorers, oracles, and many other world-class tools necessary for building and deploying Supernets and their associated applications.

<div align="center">
  <img src="/img/supernets/supernets-interconnected.excalidraw.png" alt="bridge" width="80%" height="40%" />
</div>

By extending the Polygon PoS mainnet, Supernets enable unlimited transactions, compliance capabilities, the ability to pay gas in a native ERC-20, and more.
Find out why you should consider Supernets [here](/supernets/get-started/why-supernets.md).
