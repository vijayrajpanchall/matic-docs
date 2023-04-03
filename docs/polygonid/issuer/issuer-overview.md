---
id: issuer-overview
title: "Issuer Overview"
sidebar_label: Issuer
description: "Definition of an Issuer."
keywords: 
  - docs
  - polygon
  - id
  - issuer
  - claim
image: https://wiki.polygon.technology/img/thumbnail/polygon-id.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

An Issuer is any subject that issues Verifiable Credentials (VC). You can think of a VC as a statement: something an Issuer says about another subject. For example, when a university (Issuer) says that a student (subject) has a degree, this is a VC.

An issuer might be: 

- A DAO that issues “membership claims" to its members.
- A Government that issues ID to its citizens.
- A Face detection Machine Learning application that issues "proof of personhood" claims. 
- An employer that endorses its employees.

[Verifiable Credentials](https://docs.iden3.io/protocol/claims-structure/) are a flexible data format able to express any type of information so that developers can unleash their creativity.

To operate, an Issuer must run an [Issuer Node](https://0xpolygonid.github.io/tutorials/issuer-node/issuer-node-overview/), which is a self-hosted Node that exposes all the functionalities necessary to run an issuer.

<div align= "center">
<img src= {useBaseUrl("img/polygonid/issuer-intro.png")} width="500"/>
</div>

Using Polygon ID an Issuer can issue Credentials to their users.

Alternatively, you can quickly try out the Credential Issuance experience using the [Demo Issuer](https://0xpolygonid.github.io/tutorials/issuer/demo-issuer/).