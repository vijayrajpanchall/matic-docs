---
id: verifier-library-intro
title: Introduction
sidebar_label: Introduction
description: "Polygon ID main concepts."
keywords: 
  - docs
  - polygon
  - id
  - verifier
image: https://wiki.polygon.technology/img/thumbnail/polygon-id.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<div align="center">
<img src= {useBaseUrl("img/polygonid/login.png")} align="center" width="600"/>
<div align="center">
<br></br>
Authenticate with Polygon ID workflow</div>
<br></br>
</div>

At its core, every off-chain interaction between a Verifier and a user's Wallet follows this workflow:

- A web application designs a [request](https://0xpolygonid.github.io/tutorials/verifier/verification-library/request-api-guide/) for the users. This is delivered to the user within a QR code (or via deep-linking; it is up to the implementer). This can either be an [auth request](https://0xpolygonid.github.io/tutorials/verifier/verification-library/request-api-guide/#basic-auth-request) or a [query-based request](https://0xpolygonid.github.io/tutorials/verifier/verification-library/request-api-guide/#query-based-request).
- The user scans the QR code using his/her mobile ID wallet and parses the request.
- The user fetches the revocation status of the requested credential from the Issuer of that credential.
- The user generates a ZK proof on mobile according to the request of the website starting from the credentials held in his/her wallet. This also contains the ZK proof that the credential is not revoked.
- The user sends the proof to the Verifier.
- The Verifier verifies the zk Proof using the [verification API](https://0xpolygonid.github.io/tutorials/verifier/verification-library/verification-api-guide/).
- The Verifier checks that the State of the Issuer of the credential and the State of the user are still valid and have not been revoked (this is still performed using the same [verification API](https://0xpolygonid.github.io/tutorials/verifier/verification-library/verification-api-guide/)).
- If the verification is successful, the Verifier grants access to the user (or activates any customized logic).

Assume that the request is: "Are you over 18 years old?". The Verifier *never gets access to any of the user's credentials*. Instead, the Verifier receives a cryptographic proof which, on verification, provides an answer "yes" or "no" to the previous question. 

This section provides all the elements needed to integrate "Authentication with Polygon ID".

## Libraries

The authentication flow can be implemented either in GoLang or Javascript

- <a href="https://github.com/iden3/go-iden3-auth" target="_blank">Go Iden3 Verification Library</a>

- <a href="https://github.com/iden3/js-iden3-auth" target="_blank">JS Iden3 Verification Library</a>


