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

This document provides an overview of what Polygon Supernets are through multiple perspectives;
a comprehensive distributed network design to build scalable blockchains.

:::info Edge + Supernets is like Geth + Ethereum

Before diving into the documentation, please keep the following points in mind:

- **Polygon Supernets were officially introduced in v0.7.x of the Polygon Edge client.**
- **The Polygon team will prioritize the latest version of the Edge client and as a result, will no longer provide support for older versions (v0.6.2 and earlier).**

  The repository will remain accessible, and users may fork it and use it as they wish, subject to applicable open-source license terms. It is **highly recommended to upgrade to the latest version**, which includes the most up-to-date features and fixes. However, users who prefer to stay on older versions may continue to do so.

- **Polygon Edge serves as a consensus client implementation for Polygon Supernets, much like how Geth serves as a client implementation for Ethereum.**

Both geth and Edge serve as intermediaries between nodes and their respective blockchains, allowing users to interact with the network and take advantage of its benefits. To draw an analogy, Geth and Edge are to Ethereum and Supernets what web browsers are to the internet, enabling users to access and interact with the network.

:::

---

## Introduction

In simple terms, a **Supernet refers to an application-specific chain that operates on the Polygon Edge consensus client with PolyBFT consensus, in bridge mode (and utilizes the transaction relayer), with stake on the associated rootchain (i.e. PoS mainnet), and employs on-chain governance mechanism**.

The following table offers a comprehensive overview on what Supernets are.

| Supernets are | Description |
|-----------|-------------|
| Application-specific blockchain networks designed for specific use cases. | Appchains are customizable blockchain networks that developers can tailor to meet specific enterprise or application use cases. With appchains, developers can create high-performance blockchain networks that are fast and low-cost. |
| The next phase of Polygon PoS and Ethereum scaling. | Supernets empower projects and enterprises to create highly scalable layer 3 blockchain networks that meet their specific block space requirements while inheriting the security and integrity of the Polygon PoS and Ethereum mainnet. |
| Modular and complex-minimized blockchain development. | Supernets offer a modular framework that simplifies blockchain development, providing developers with the tools necessary to create customizable blockchain networks that are scalable, secure, and interoperable. Developers can use the Supernets stack to create high-performance blockchain networks with advanced capabilities without worrying about complex integrations or intermediaries. |
| Customizable blockchain networks for reliable business logic. | A customizable virtual machine provides full Ethereum Virtual Machine (EVM) support out of the box, enabling developers to tailor the virtual machine to their specific needs and requirements. This feature includes customizing gas limits, adding new opcodes, and integrating with other technologies. |
| The most supported blockchain infrastructure in the web3 space. | The Supernets ecosystem includes the most extensive suite of premium service providers, who offer various node and deployment infrastructure, indexers, explorers, oracles, and many other world-class tools necessary for building and deploying Supernets and their associated applications. |
| Adaptive and compliant blockchain networks that thoroughly reflect their maintainers. | Supernets feature an on-chain governance mechanism that enables community-driven decision making and management of the blockchain. This mechanism supports hybrid governance models and allows for the design of either permissionless networks or permissioned networks with varying degrees of sovereignty based on user and maintainer needs, including the ability to allowlist validators and network admins. |
| Interoperable and multichain driven | A native bridging solution enables the seamless transfer of assets from various EVM-compatible blockchains back to the Polygon ecosystem. This bridging solution allows developers to customize bridge plugins to meet specific requirements, facilitating interoperability between blockchains and different layers. |

:::caution In active development

**Please note that the Supernets documentation hub currently only documents the functionality of the v0.8.0 release, as the code is still in active development and undergoing auditing. As such, it is not recommended for use in production environments.**

At present, the following components are available:

- Smart contract and validator allowlisting.
- Deposits and withdrawals using the native bridge.

Additional components, including on-chain governance and creating a full production instance with MATIC staked, are currently in progress.

If you have any questions or are interested in using Supernets in a production environment, please get in touch with the Polygon team for guidance and support.

:::

## Unstoppable Layer 2 & Layer 3 Networks

Supernets are pioneering unstoppable networks for the internet, where decentralized and secure applications can thrive.

<div align="center">
  <img src="/img/supernets/supernets-together.excalidraw.png" alt="bridge" width="90%" height="40%" />
</div>

The diagram above demonstrates how Supernets are interconnected with the Polygon PoS network, which benefits from the security properties of Ethereum. By leveraging blockchain technology, Supernets provide a strong foundation for building decentralized and blockchain-based solutions that can withstand adversarial conditions, resist censorship, and scale to meet the increasing demand for processing power, data storage, and transaction throughput.

Supernets employ a multi-faceted approach that leverages a combination of complementary scaling solutions to achieve maximum scalability. These solutions include layer-2 scaling techniques, parallelization, and, eventually, ZK technology.

<div align="center">
  <img src="/img/supernets/supernets-interconnected.excalidraw.png" alt="bridge" width="80%" height="40%" />
</div>

By integrating these methods, Supernets can efficiently accommodate the increasing demand for processing power, data storage, and transaction throughput as the number of users and applications on the network grows.

## Supernets Program

### Implementation partners and service providers

To elaborate further, a Supernets program offers a range of service providers that can assist with various aspects of blockchain development, deployment, and maintenance. These include:

- **Node Providers**: These providers offer node infrastructure services that support the operation and maintenance of Supernets-based networks. Node providers can help ensure network stability, security, and scalability by providing reliable and optimized node infrastructure.

- **RPC Providers**: These providers offer remote procedure call (RPC) services that allow developers to interact with Supernet-based networks (childchains) and rootchain networks like the Mumbai PoS testnet and Polygon PoS mainnet. RPC providers can provide easy and reliable access to network data and functionality.

- **Smart Contract Monitoring**: This service enables real-time monitoring of smart contracts deployed on Supernets-based networks. This can help detect and respond to potential issues, vulnerabilities, or attacks on the network.

- **Oracle Services**: These services offer real-time data feeds and external information that can be used to support smart contract execution on Supernets-based networks. Oracles can help enable the development of more complex and advanced decentralized applications that rely on off-chain data and information.

- **Block Explorers**: These tools provide an interface for users to explore and visualize the blockchain's contents, including blocks, transactions, and other network data. Block explorers can help improve network transparency and accessibility and can be used by developers, users, and other stakeholders to gain insights into network activity and performance.

- **KYC Providers**: These providers offer Know Your Customer (KYC) and Anti-Money Laundering (AML) compliance services, which can help ensure that Supernets-based networks comply with regulatory requirements and mitigate risk for network participants.

- **Fiat On-Ramps**: These services bridge fiat currencies and digital assets, enabling users to purchase and use digital assets on Supernets-based networks. Fiat on-ramps can help increase accessibility and adoption of Supernets-based networks.

:::note Services will become available shortly

As partnerships develop and the ecosystem comes to life, new services will be ready for use. These services will become available shortly, and tutorials and other resources will be provided to help users make the most of them. Keep an eye out for updates as the ecosystem continues to grow and evolve.

:::

### Infra-as-a-Service

Supernets offers Infrastructure-as-a-Service (IaaS) capabilities that enable easy and fast deployment of blockchain networks. With one-click deployments and Terraform scripts, developers can quickly and easily set up a childchain.

In addition, Supernets provides options for bootstrapping a chain with proven Polygon validators. This flexibility allows developers and enterprises to focus on their application requirements where they can avoid the complexity and cost of setting up and maintaining their own node infrastructure.

:::note Terraform scripts will be available shortly

:::

### Cloud deployments

Supernets support cloud deployment options that enable developers and enterprises to easily and securely deploy a childchain to the cloud. With cloud deployment options, users can take advantage of the scalability and flexibility of cloud infrastructure, without having to worry about the complexities of managing their own infrastructure.

Supernets supports deployment to various cloud platforms and allow users to choose the cloud platform that best suits their needs and preferences.

Supernets cloud deployment options also come with a range of features and capabilities, such as auto-scaling, load balancing, and disaster recovery, that can help ensure network stability, security, and availability. These features can be especially important for enterprise-level deployments that require high levels of reliability and performance.

:::note Cloud deployment options will be available shortly

:::
