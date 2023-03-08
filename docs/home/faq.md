---
id: faq
title: FAQ
description: FAQs related to Polygon
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-logo.png
---

# Frequently Asked Questions

## What is Polygon?

Polygon is a scaling solution for public blockchains, specifically Ethereum. Polygon provides scalability while ensuring a superior user experience in a secured and decentralized manner. It has a working implementation for Ethereum on Kovan Testnet. Polygon intends to support other blockchains in the future which will enable us to provide interoperability features alongside offering scalability to existing public blockchain networks.

## How is Polygon different from other implementations of Plasma?

Polygon's implementation of Plasma is built on state-based sidechains which run on EVM, while the other implementations of Plasma primarily use UTXOs which restricts them to being payment specific. Having state-based sidechains allows Polygon to provide scalability for generic smart contracts as well.

Secondly, Polygon uses a public checkpointing layer which publishes checkpoints after periodic intervals (unlike checkpoints after every block in Plasma Cash) allowing the sidechains to operate at high speeds while publishing the checkpoints in batches. These checkpoints along with the fraud proofs ensure that Polygon's sidechains operate in a secure manner.

## Your project provides scalability for Ethereum using plasma chains, is it a protocol or a native blockchain in itself?

Polygon network is a **"sidechain"** solution where Ethereum main chain assets, i.e. all dApps / Tokens / Protocols of the main chain can be moved / migrated to Polygon sidechain(s) and when needed, one can withdraw assets back to main chain.

## What are the competitive advantages of Polygon over its competitors?

### L2 scaling solutions

Polygon is committed to achieving scale with decentralization. Polygon uses periodic checkpoints and fraud proofs. When users want to withdraw their assets, they use the checkpoints to prove their assets on sidechain, while fraud proofs are needed to challenge fraud or any bad behavior and slash stakers.

Other projects are also offering L2 scaling solutions but there are two key elements that we differ on:

1. Firstly, Polygon is focusing on not just financial transactions but games and other utility dApps as well. We also have plans for full-blown financial services like lending / trading dApps (token swaps, margin trades and much more).

2. Secondly, while Polygon uses checkpoints for 1-second block times (with PoS layer), many other solutions might have block times greater than the Ethereum block times as you need to push every block of the sidechain to the main chain.

### L1 scaling solutions

Apart from that, amongst other scaling projects, Polygon stands out due to its ability to achieve scale while maintaining a great degree of decentralization.

More importantly, these scalability projects have a "reinventing the wheel" problem. They are creating new blockchains where the developer community, product ecosystem, technical documentation, and businesses need to be built from **"scratch"**. Polygon, on the other hand, is an EVM-enabled chain and has all the dApps / assets built on Ethereum main chain with scalability available at the click of a button.

### Payments

We believe that Polygon has an edge in terms of usability because, in other solutions, both sender and receiver have to create their payment channels. This is very cumbersome for users. While with Polygon's underlying technology there is no requirement of payment channels for users and they only need to have a valid Ethereum address to receive tokens. This is also in line with our long-term vision of improving the user experience for decentralized applications.

### Trading and Finance

Polygon intends to enable DEX's (eg. 0x), Liquidity pools (eg. Kyber Network) and other kinds of financial protocols like Lending protocols (Dharma Protocol) on its platform, which will allow Polygon users to access varied financial serivce applications like DEXs, lending dApps, LPs and many others.

## How does Polygon compare with other sidechain solutions?

On Polygon, all side transactions are secured by multiple mechanisms on the sidechain as well as main chain. On sidechain, any transactions done by the Block producer layer are verified and checkpointed to the main chain by a highly decentralized checkpointing layer.

If any fraudulent transaction happens on sidechain, it can be detected and handled by the checkpointing layer. Even in extreme and highly unlikely scenario wherein the block producer layer as well as the checkpointing layer both collude, even then the main chain has fraud proofs on which anyone from the public can come and challenge any transaction that they deem fraudulent on the sidechain.

If the challenge is successful, there is a huge economic disincentive / financial punishment to the colluding parties as their stakes are slashed. Also, the public challenger is rewarded with the slashed stakes of the fraudulent sidechain actors.

This makes Polygon an economically incentivized sidechain network which has a high degree of decentralization and security of the sidechain transactions.

Also the capacity and TPS of Polygon sidechains are much higher than other solutions. Especially when Polygon can have thousands of transactions while others are single sidechains which have a higher limit of a few thousand transactions.

## Via what principles will new sidechains be added? Will there be any special requirements for private companies' local sidechains?

Relative to state channels, Plasma represents a superior alternative to scaling frameworks, chiefly due to the security guarantees provided by the framework - which basically say that users will never lose funds in any eventuality. Sure, there could be delays in getting back the money, but a Byzantine Plasma operator cannot create money out of thin air, or double spend a transaction.

Polygon will strive to be a completely open and public blockchain infra in the future wherein the economic incentives/disincentives will primarily drive the security and stability of the system. So anyone should be able to join the system and participate in the consensus. In the network seeding stage however, initially Polygon will have to play a larger role to enable sidechains.

Also, Polygon sidechains would be primarily public sidechains i.e sidechains available for anyone to use just like other public blockchains. However, Enterprise Polygon chains will intend to provide dedicated sidechains (non-privacy enabled) for particular organizations. The security and decentralization of such chains would still be kept intact using the checkpointing layer and fraud proofs on the main chain.

## Will sidechains also be synced with the main chain (Ethereum)?

Absolutely. The public checkpointing layer will validate all the transactions happening on the sidechains and publish the proofs to the main chain. To ensure foolproof security of sidechain transactions, the main chain Plasma contract contains various kinds of Fraud Proofs where any sidechain transactions can be challenged for any fraudulent activity. If a challenger succeeds, the stakes of the sidechain actors involved in the fraud are slashed and are transferred to the challenger. This is equivalent to an ever running high stake bug bounty. A good diagram for understanding is as below:.

![Screenshot](/img/matic/Architecture.png)

## At the end of the White Paper, there is a list of "Potential Use Cases" - will all of that be implemented? In what order?

The basic logic is - if there is a dApp / Protocol which is working on Ethereum, but is limited by low transaction throughput and high transaction fees - then we will be able to add support for these dApps / Protocols on the Polygon network.

## Why will it be difficult to replicate Polygon's plasma implementation?

Although it is more about the network effect in terms of which network is able to scale / grow the ecosystem better than others, blockchain solutions must be open source because they involve the actual assets being used by them.

It is the case with all the open source projects. It is equally applicable to us as well as the other rival implementations as we are going to have our GPL licence which mandates anyone using our implementation to mandatorily open source their code. But again, the point being that copying of code is applicable even to Bitcoin, Ethereum and any other projects, it is more about the network effect that one project can achieve.

## What’s special about Polygon Network’s Plasma implementation?

Polygon Plasma uses an account-based model system rather than the UTXO system. This provides us with a huge advantage of using an EVM on the Polygon chain which enables us to utilize the entire Ethereum ecosystem, developer tools, integration libraries, etc. for the Polygon network.

The Polygon network can be used by dApps without requiring any changes to their ERC20 tokens. Furthermore, our checkpointing layer allows us to be orders of magnitudes faster than other Plasma implementations because we batch the proofs of individual blocks in the checkpoints, whereas other Plasma implementations must submit each block proof to the main chain.

## How are you going to solve the issues with centralization?

Here is a diagram to give you some context:

![Screenshot](/img/matic/Merkle.png)

So firstly, the PoA nodes are going to be Delegates (with Proof of Solvency i.e they have to deposit a high amount of stake) and KYC basically selected by the PoS layer just like an EOS style Delegated Proof of Stake (DPoS) or Delegated Byzantine Fault Tolerance (DBFT) nodes.

Secondly, let’s assume all of the Delegates (or 2/3rd of them) turn bad actors and produce faulty blocks, then you have PoS layer stakers who are going to validate all the blocks and if any frauds are committed, the stakes of Delegates are slashed and the checkpointing is stopped for the corrective actions.

Thirdly, let's say even the Staker PoS layer (which would be a large number of nodes) also turns bad and collude to produce faulty checkpoints i.e all the PoA are corrupt and PoS are corrupt. Even then, following the Plasma philosophy, we are writing one of the coveted things of sidechain scaling, **Fraud proofs** which is being watched by many big projects (the watchers can be seen as our repository watchers on GitHub). This fraud proof mechanism enables anyone in public to challenge any transaction on the main chain, Ethereum.

## Why is MATIC Token required?

The following reasons reinforce the need of having MATIC token:

### Polygon intends to be a general purpose scaling solution for public blockchains

We are starting out on Ethereum as our first basechain, but in the future Polygon can be deployed on multiple basechains. There will be other basechains added soon, so it won’t make sense to have one currency (ether) to be used for paying fees on the sidechains. If there's an existential concern over any basechains future, having that basechains’ currency as a native asset for Polygon will cripple the scaling network. Therefore it is important to build the Staker ecosystem on Polygon's own network token.

### Appcoin security model

Polygon intends to enable dApps to pay Polygon fees in dApp-coins by abstracting a token swap mechanism using a liquidity pool like Kyber. The user simply uses her dApp-coins to pay fees, in the background the dApp-coin is swapped for MATIC tokens. Hence the dApp developers who want to provide a seamless user experience will help maintain a Polygon liquidity pool.

### Seeding the network in nascent stages

It’s practically impossible to seed the system when there are little to no txns in the network at the start, as we cannot distribute Eth to the highly decentralized Validator layer and the block producers. Whilst with Matic tokens, we have provisioned a large percentage of tokens to be distributed for seeding block producer, checkpointer stakes and subsequently offer block rewards. This provision ensures that the stakers receive rewards even if the network takes some time to assume network effects. It is akin to why Block Mining rewards were kept for Bitcoin, stakers and block producers can be incentivized in this way to keep the network secure.

If your concern is about Devs, one of the pillars of our strategy is to keep the entry barrier for devs very low. We have made sure that all the Ethereum dev tools work out of the box on Polygon. In terms of the tokens needed for paying fees on testnet, it is no different for a developer building on Ethereum. The dev gets free tokens for the testnet from a Polygon faucet, just like it is on Ethereum. You need MATIC tokens only when you want to deploy on Polygon Mainnet, where the gas fee is much lower than Ethereum, around 1/100th of a transaction fee you would pay on Ethereum.

## What drives the use and demand for MATIC tokens?

There are two primary uses of the token:

1. The token is used to pay for the transaction fees in the network.
2. The token is used for staking to participate in the Proof of Stake consensus mechanism for checkpointing layer and block production layer.

### Some of the secondary reasons for token demand

* Polygon Network intends to enable dApps to pay Polygon fees in dApp-coins by abstracting a token swap mechanism using a liquidity pool like Kyber. The user simply uses her dApp-coins to pay fees, in the background the dApp-coin is swapped for MATIC tokens. Hence the dApp developers who want to provide a seamless user experience will help maintain a Polygon liquidity pool.

* To enable faster exits we are implementing a lending mechanism using Dharma Protocol wherein an underwriter / lender can receive the exit-token and disburse the exit amount with a small fee as interest. The lender then claims the tokens after one week by using exit-token. The user thus gets near immediate withdrawals while the lenders can earn interest for the service they provide.

### Protocol Level burning of tokens

We intend to burn a percentage of the transaction fee in every block. This makes the tokens deflationary in nature and provide it with a constant support in terms of its value at the protocol level.

### Low entry barrier (and hence higher chances of quick adoption)

We will heavily lean on DApps to bring in end-user adoption. One of the key features is that we maintain an architecture which is fully compatible to Ethereum development ecosystem i.e all smart contracts, wallets, IDEs, DevOps tools etc are directly compatible with Polygon.

Any Ethereum dApp can be ported to Polygon without almost no significant changes. So the entry barriers for existing Ethereum developers to transition to Polygon are negligible which can jumpstart a viral dApp adoption. This has the potential to bring in a lot of organic demand due to network effects that build around the Polygon network.

## Is token type ERC20?

Yes. And the same token will be applicable to Polygon Chain too i.e. no need to move to a native token in future.

## What is the expected TPS you'll be able to bring to the Ethereum network? What are you running at now on testnet?

A single sidechain has the capacity of 7,000+ transactions per second. Polygon has the capability to add multiple sidechains, but currently, our focus would be on stabilizing the network with one sidechain.
