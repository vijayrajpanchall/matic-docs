---
id: consensus-mechanism
title: Consensus Mechanism
description: "PoW, PoS, DPoS, PoSpace and PoET."
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-logo.png
---

# Consensus Mechanism

A Consensus mechanism is a fault-tolerant mechanism that is used in computer and blockchain systems to achieve the necessary agreement on a single data value or a single state of the network among distributed processes or multi-agent systems, such as with cryptocurrencies.

## Types of Consensus Mechanism

### Proof of Work
Proof of work describes a system that requires a not-insignificant but feasible amount of effort in order to deter DOS(denial-of-service) attacks and other malicious attacks. It requires to solve a challenging computational puzzle in order to create new blocks in Blockchain.

### Proof of Stake
Proof-of-Stake mechanism achieves consensus by requiring users to stake an amount of their tokens so as to have a chance of being selected to validate blocks of transactions, and get rewarded for doing so. Priority is given to miners who have purchased the most stake in the blockchain system.

### Delegated Proof of Stake
This form of consensus mirrors the election of members in governing bodies. Instead of staking their assets themselves, stakeholders can delegate this activity to third parties, the witness or delegates, who will take part in the consensus process. Witnesses, those who validate transactions, usually present a proposal, ask for votes and are elected by the stakeholders. The rewards gained by those entities are usually shared with the network participants.

### Proof of Space
This kind of consensus mechanism is useful in decentralized file storage applications like in Storj.io, Filecoin, and Crust, where nodes prove they have legitimate capacity in their hardware. However, instead of using heavy computation as in the PoW mechanism, it leverages the storage capacity of each node. Sometimes also referred as PoStorage or PoCapacity.

### Proof of Elapsed Time
A better alternative to PoW, consuming lesser computational resources. Each participating node needs to wait for a random amount of time and the very first node to wake up from sleep gets a chance to create a new block, which is then propagated through the network. It requires Trusted Execution Environments ( TEE ) like Intel SGX, which are an isolated part of memory and can only be accessed using a certain set of instructions.

## **Resources**

- [Byzantine Fault Tolerance](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419) <br></br>
- [Type of Consensus Mechanisms](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms) <br></br>
- [Overview and History of Consensus System Development](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/) <br></br>
- [Understanding Distributed Consensus](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95) <br></br>
- [Byzantine Generals Problem](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)