---
id: overview
title: "Polygon ID: An Introduction"
sidebar_label: Introduction
description: "Polygon ID main concepts."
keywords: 
  - docs
  - polygon
  - id
  - holder
  - issuer
  - verifier
image: https://wiki.polygon.technology/img/thumbnail/polygon-id.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Based on the principles of Self-Sovereign Identity (SSI) and cryptography, Polygon ID is a decentralised and permissionless identity framework for web2 and web3 applications. The SSI framework lets individuals own and control their identities. 

:::info

For the latest technical documentation and tutorials, please head over to our [<ins>Polygon ID tutorials page</ins>](https://0xpolygonid.github.io/tutorials/).

:::

:::tip Contact

You can ask questions in our [<ins>discord for Polygon ID</ins>](https://discord.com/invite/XvpHAxZ)

Also please refer to our [<ins>Twitter page</ins>](https://twitter.com/0xpolygonid) to stay updated with the latest developments on Polygon ID. 

:::

## Why Polygon ID?

Polygon ID, with the help of zero-knowledge proofs, lets users prove their identity without the need of exposing their private information. This ensures both the **Freedom of Expression** to anyone who intends to use the Polygon ID and **Privacy by Default**, as users' identities are secured by zero-knowledge cryptography.

## Core Concepts of Polygon ID: Verifiable Credentials, Identity Holder, Issuer and Verifier (Triangle of Trust)

Every identity is identified by a unique identifier called [DID (Decentralized Identifier)](https://www.w3.org/TR/did-core/). Every identity-based information is represented via [Verifiable Credentials (VCs)](https://www.w3.org/TR/vc-data-model/). In the simplest terms, a VC represents any type of information related to an individual/enterprise/object. The VC could be as simple as the age of the entity or the highest degree held by it. It could be a membership certificate issued by a DAO.

:::info
The toolset made available by Polygon ID is fully compliant with the W3C standards.
:::

The architecture of the framework is composed of three modules: Identity Holder, Issuer, and Verifier. These three, together, form what we call the `triangle of trust`. Let us see what role each entity plays in Polygon ID. 

1. **Identity Holder**: An entity that holds VCs in its [Wallet](wallet/wallet-overview). A VC, as mentioned above, is issued by an Issuer to the Holder. The Identity holder creates the zero-knowledge proofs of the VCs issued and presents these proofs to the Verifier, that the proof is authentic and matches specific criteria. 

2. [**Issuer**](issuer/issuer-overview): An entity (person, organization, or thing) that issues VCs to the Holders. VCs are cryptographically signed by the Issuer. Every VC comes from an Issuer. 

3. [**Verifier**](./verifier/verifier-overview): A Verifier verifies the proof presented by a Holder. It requests the Holder to send a proof based on the VCs they hold in their wallet. While verifying a proof, the Verifier performs a set of checks, for example, that the VC was signed by the expected Issuer and that the VC matches the criteria requested by the Verifier. The simplest example of a Verifier is a bar that wants to verify if a client is over 18. In the real world, the Identity Holder would need to provide an ID and show all their personal information. With Polygon ID they only need to pass a proof. 

:::note
The verification of a VC can happen either off-chain or on-chain.
:::

<div align= "center">
<img src= {useBaseUrl("img/polygonid/triangle-of-trust-polygonID.png")} width="500"/>
</div>

<br></br>

## Role of a Wallet

A [Wallet](./wallet/wallet-overview.md) plays a crucial role in the seamless exchange of VCs and other related data with the Issuer, on one hand, and with the Verifier, on the other. As stated above, an Identity Holder carries his/her personal data, in the form of a VC, within their wallet. At its core, the wallet stores the private key of a user, fetches VCs from the Issuer, and creates zero-knowledge proofs to be presented to the Verifier. Being the carrier of the sensitive information, the Wallet has been designed to ensure that the identity of its Holder is protected and preserved, and no sensitive data can be revealed to the third party without the consent of the Holder.  

## What can you achieve using Polygon ID?

1. **Privacy using Zero-Knowledge Proofs**: An Identity Holder, using zero-knowledge proofs, can keep his/her/its personal data private. During the process of VC verification, it just needs to show that he is the owner of that VC without letting the Verifier know of the actual VC. For example, an Identity Holder can prove to a Verifier authority that s/he is above 18 years of age by presenting the proof that s/he is above 18 without revealing his/her actual age. This ensures minimum data exposure and hence ensures the safety of any sensitive data. 
Another aspect of privacy comes from the fact that the Issuer would not be able to track an individual's credential once it has been issued. 

2. **Off-Chain and On-Chain Verification**: Verification of proofs can be done either off-chain or on-chain via Smart Contracts. For example, developers can set up a contract that airdrops tokens only to users that meet certain criteria based on their VCs.

3. **Self-Sovereignty**: Polygon ID renders self-sovereignty in the hands of the user. The user is the only custodian of his/her private keys; user-controlled data can be shared with third parties without taking any permission from the Issuer that has issued the VCs to the user.

4. **Transitive Trust**: A transitive trust between the players of an SSI system (Holder, Issuer, and Verifier) means that the trust between two entities in one domain or context can be easily extended to other domains or contexts. For instance, the information generated by an Issuer can be conveniently used by more than one Verifier. Along the similar lines, an Identity Holder can build up his/her trust by collecting multiple credentials from different Issuers in one digital wallet. 

## Polygon ID and Iden3

<a href="https://iden3.io/" target="_blank">Iden3</a> is the open-source protocol at the basis of Polygon ID. The protocol defines on a low-level how the parties listed above communicate and interact with each other. Polygon ID is an abstraction layer to enable developers to build applications leveraging the Iden3 protocol.

## Further Resources On Polygon ID
- [Polygon University - Courses on Polygon ID (free)](https://university.polygon.technology/polygonid/)
- [Identity Layer for Web3 - Paris - July 2022](https://www.youtube.com/watch?v=bmRvQNmxFkM&feature=youtu.be)
- [A Deep Dive Into Polygon ID - November 2022](https://www.youtube.com/watch?v=utpazrLrSbY)

## Further Resources On Verifiable Credentials
- [Verifiable Credentials: The Ultimate Guide](https://www.dock.io/post/verifiable-credentials)
- [Understanding and Using Verifiable Credentials](https://www.youtube.com/watch?v=BxLSSH_EHjo)

<hr></hr>

[**Polygon ID on GitHub**](https://github.com/0xPolygonID)


