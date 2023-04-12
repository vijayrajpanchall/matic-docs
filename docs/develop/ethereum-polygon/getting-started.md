---
id: getting-started
title: Ethereum↔Polygon PoS Bridge
sidebar_label: Overview
description: A two-way transaction channel between Polygon and Ethereum.
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-logo.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon brings you a trustless two-way transaction channel between Polygon PoS and Ethereum by introducing the cross-chain bridge with Plasma and PoS security. With this users can transfer tokens across Polygon PoS without incurring third-party risks and market liquidity limitations. **The Plasma and PoS Bridge is available on both Mumbai Testnet as well as Polygon PoS Mainnet**. You can bridge assets to Polygon PoS using the [Polygon Wallet Suite](https://wallet.polygon.technology/polygon/bridge/deposit).

Polygon also offers the **zkEVM Bridge** which can also be used via the [Polygon Wallet Suite](https://wallet.polygon.technology/polygon/bridge/deposit). Read more about the zkEVM Bridge [here](/zkEVM/protocol/zkevm-bridge.md). This document is more about the Polygon PoS Bridge. 



**Polygon PoS bridge provides a bridging mechanism that is near-instant, low-cost, and quite flexible**. Polygon PoS uses a dual-consensus architecture(Plasma + Proof-of-Stake (PoS) platform)
to optimise for speed and decentralization. We consciously architected the system to support arbitrary state transitions on our sidechains, which are EVM-enabled.

**There is no change to the circulating supply of your token when it crosses the bridge**;

- Tokens that leave the Ethereum network are locked and the same number of tokens are minted on Polygon PoS as a pegged token (1:1).
- To move the tokens back to the Ethereum network, tokens are burned on Polygon PoS network and unlocked on Ethereum network during the process.

## PoS vs Plasma

|                                      | PoS Bridge(Recommended)                                                                  | Plasma Bridge                                                                             |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Short description**                | DApp Developers looking for flexibility and faster withdrawals with POS system security. | DApp Developers looking for increased security guarantees with Plasma exit mechanism\.   |
| **Structure**                        | Highly flexible                                                                          | Rigid, Less Flexible                                                                      |
| **Deposit\(Ethereum → Polygon PoS\)**    | 22-30 mins                                                                                 | 22-30 mins                                                                                  |
| **Withdrawal\(Polygon PoS → Ethereum\)** | 1 checkpoint = ~ 30 mins to 6 hours                                                      | Call to the process-exit procedure on Ethereum's contract                               |
| **Security**                         | Proof\-of\-Stake system, secured by a robust set of external validators\.                | Polygon’s Plasma contracts piggybacks on Ethereum’s security.                             |
| **Support Standards**                | ETH, ERC20, ERC721, ERC1155 and Others                                                   | Only ETH, ERC20, ERC721                                                                   |

:::info

The [**FxPortal**](/develop/l1-l2-communication/fx-portal.md) is another type of bridge that is very similar to the PoS Bridge. They share the same characteristics as mentioned for PoS in the table above. The only difference is that Tokens need not be mapped on the FxPortal Bridge prior to bridging. The mapping happens during the first deposit transaction which is initiated for a given token. Also, anyone can make use of the FxPortal to build their own custom tunnels/bridges on top of the Polygon PoS bridge. It is highly recommended to use the FxPortal for any bridging use case. New token mappings on PoS and Plasma will be discouraged post-Jan 31st, 2023 so that the mapping process is fully decentralized and flexible.

:::

## Additional Resources

- [Introduction to Blockchain Bridges](https://ethereum.org/en/bridges/)
- [What are Cross-Chain Bridges](https://www.alchemy.com/overviews/cross-chain-bridges)
