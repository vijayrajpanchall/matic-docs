---
id: supernets-faq
title: FAQs
sidebar_label: FAQs
description: "The most common questions and answers about Supernets and the new Edge client."
keywords:
  - docs
  - Polygon
  - edge
  - supernets
  - childchain
  - network
  - modular
---

This document provides frequently asked questions related to Polygon Supernets.

---

## Are Supernets meant to be "Super networks"?

Yes, Supernets are designed as "super networks" that offer a wide range of features and capabilities to developers, enabling them to build and deploy blockchain-based solutions with ease. The name "Supernets" conveys the idea that the network is more powerful, robust, and feature-rich than other blockchain networks, making it an ideal platform for various use cases.

## What is the relation between Supernets and Edge?

Polygon Supernets is a cutting-edge software application built on top of an iteration of the legacy Edge client, designed to enable EVM-compatible, application-specific sovereign blockchains. The Supernets logic was first introduced in the 0.7.0 release of the previous Edge client.

:::caution The state of Polygon Edge

The releases of the Edge client, **starting from version 0.7.x and beyond,
are related explicitly to Supernets, while versions 0.6.x and below are
for the older versions of the Polygon Edge client**.

However, it's important to note that **as of [v0.8.0](https://github.com/0xPolygon/./polygon-edge/releases/tag/v0.8.0), the legacy Edge client will no longer be supported by Polygon Labs**. The **Edge documentation on the Polygon Wiki will also be archived**. Developers are encouraged to build with Polygon Supernets for support.

:::

## What tools are available for Supernets?

Various development and blockchain tools will soon be available.

Polygon Labs has partnered with multiple infrastructure providers, tool providers, and implementation partners to offer an all-inclusive development experience for building and launching blockchains.

The Supernets package will eventually include "native" tooling that covers a wide range of use cases for blockchain development, supplemented by third-party integrations and support. As the ecosystem grows, more resources are expected to become available, making it even easier for developers to build and deploy blockchain solutions on the Supernets network.

## What infrastructure providers support Supernets?

Several infrastructure providers are currently onboarded to support Supernets and more are expected to join in the future. These providers offer a range of services including node hosting, developer tools, and technical support to help developers build and deploy applications on the Supernets network.

In addition to providing infrastructure and technical support, many of these providers also offer their own resources and documentation to aid in the utilization of Supernets. This makes it easier for developers to get started with the platform and to access the resources they need to create powerful and scalable blockchain-based solutions.

As the Supernets ecosystem continues to grow, we expect to see even more infrastructure providers joining the platform, further expanding the resources and support available to developers.

## Do Supernets address the need for large blockspace requirements?

Developers can utilize the capabilities of Supernets to create application-specific blockchains that cater to the need for large blockspace requirements. By designing a dedicated blockchain for their application, developers can optimize it to suit their unique use case and minimize the impact of large blockspace requirements on the overall Polygon Proof-of-Stake (PoS) network.

Supernets are specifically designed to facilitate the development of highly scalable, Ethereum Virtual Machine (EVM)-compatible, application-specific, sovereign blockchains that can be customized according to the needs of the application. The modular design of Supernets empowers developers to configure and customize the network to fulfill their specific
requirements and provide tailored solutions that are optimized for their use case.

Moreover, with the PolyBFT consensus mechanism, which is specifically designed to deliver high throughput, low latency, and instant network finality, Supernets have become the ideal platform for a wide range of use cases on the Polygon PoS network, including those that necessitate large blockspace requirements for specific applications.

In the long run, Supernets will be able to interact with each other to exchange various kinds of data, creating a robust internet of blockchains.

## Can the native bridge be deployed on any chain?

Yes, the bridge can be deployed to connect any EVM-compatible childchain (i.e., Supernet) to any EVM-compatible rootchain (e.g. Polygon PoS). By leveraging the capabilities of the bridge and the modular design of Supernets, developers can create tailored solutions that are customized for their specific needs and can interact with other chains in the Polygon ecosystem as needed.

This makes it possible to create highly scalable, application-specific blockchains that are optimized for their specific use cases, while still benefiting from the security and scalability of the Polygon PoS network as a whole.

## What assets are supported on the bridge?

The bridge currently supports ERC20 and ERC721 tokens on Supernets for transfer. However, support for other asset types will soon be available. It is important to keep in mind that not all tokens on Supernets have the same functionality and capabilities. Users should review the [token overview document](/docs/supernets/design/assets/erc/erc20.md) to understand how to use tokens on Supernets and with the bridge.

As the Supernets ecosystem evolves, the bridge will support additional assets, enhancing interoperability between various blockchain networks and applications.

## When will the Supernets mainnet be live?

The mainnet launch for Supernets is currently **targeted for Q2 2023, subject to the completion of an ongoing audit**. While we are working hard to ensure that the platform is launched as soon as possible, we are also committed to ensuring that the platform is fully tested and secure before release.

In the meantime, the **first stable release is available, [v0.8.0](https://github.com/0xPolygon/./polygon-edge/releases/tag/v0.8.0), for developers and users to test and experiment. The test release serves as a valuable testing ground for developers to build and test their applications on the platform, and for users to get a sense of the functionality and capabilities of the platform.

The ongoing audit is a critical step in the launch process, as it helps to identify any potential vulnerabilities or issues that could impact the security or functionality of the platform. The audit is expected to take several weeks, after which we will have a better idea of the timeline for the mainnet launch.

## What are some use cases for Supernets?

Supernets are a highly flexible and customizable blockchain platform that can be used to create tailored solutions for a wide range of use cases. Some use cases for Supernets include:

- Gaming applications and platforms
- Decentralized finance (DeFi) applications
- Supply chain management solutions
- Identity verification and management systems
- Social networks and content platforms
- Tokenization of assets such as real estate, art, and intellectual property
- Decentralized autonomous organizations (DAOs) and governance systems
- IoT and machine-to-machine communication
- E-commerce platforms and payment systems
- Insurance and risk management solutions

These are just a few examples of the many potential use cases for Supernets. With its flexible and customizable architecture, developers can create powerful and scalable blockchain-based solutions for virtually any industry or application.

It is important to note that this represents a **sincere effort to leverage blockchain technology to address everyday needs at a mass scale while being able to reap the benefits of blockchain technology.**
