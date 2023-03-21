---
id: supernets-performance
title: Performance Benchmarks
sidebar_label: Performance benchmarks
description: "How to install Polygon Supernets."
keywords:
  - docs
  - polygon
  - edge
  - install
  - installation
---

This document presents performance benchmarks and analysis of the Polygon Edge client, comparing versions 0.6.1, 0.7.0-alpha1, and 0.7.3-beta1 and showcasing significant improvements in transaction throughput, scalability, and efficiency in the latest 0.7.x versions utilizing the PolyBFT consensus algorithm.

---

## Test Environment

The performance tests were conducted in a controlled environment to ensure accuracy and consistency in the results. The environment setup includes the following components:

### Network Configuration

- Network: Polygon Edge
- Consensus Algorithm: IBFT (0.6.x versions) and PolyBFT (0.7.x versions)

### Instance Types

The tests utilized three different Amazon Web Services (AWS) instance types to evaluate the impact of varying compute resources on network performance:

- **x2iezn.2xlarge**
- **t2.large**
- **t2.micro**
- **c5.2xlarge**
- **c6a.xlarge**
- **c6a.48xlarge**

### Transaction Types

The tests were performed using three different types of transactions to assess the network's capability to handle various use cases:

- **EOA to EOA**: Representing simple value transfers between user accounts.
- **ERC20**: Token transfers, simulating the exchange of tokens on the network.
- **ERC721**: Non-fungible token (NFT) transfers representing the exchange of unique digital assets.

### Performance Metrics

The following key performance metrics were considered during the tests:

- **Transactions per second (TPS) sent**: The number of transactions submitted to the network per second.
- **Transactions per second (TPS) mined**: The number of transactions successfully processed and included in the blockchain per second.
- **Gas per transaction**: The amount of gas consumed by each transaction, representing the computational cost.
- **Gas per second**: The total amount consumed per second indicates the network's overall computational capacity.

## Performance Observations

Upon analyzing the performance benchmarks, several improvements are evident in the 0.7.x versions compared to 0.6.x versions. These improvements can be attributed to the introduction of Supernets and the transition from the IBFT consensus mechanism to PolyBFT. The key benefits and improvements observed in the 0.7.x versions are as follows:

:::info Comparison of 0.6.x (IBFT) and 0.7.x (PolyBFT) Versions

- **Higher Transactions Per Second (TPS)**: The 0.7.x versions consistently demonstrate higher TPS rates, both sent and mined, than the 0.6.x versions. This improvement indicates that the newer versions can process more transactions in a shorter period.

- **Enhanced Scalability**: The 0.7.x versions significantly increase the block gas limit, suggesting that the network can handle more complex transactions and support larger smart contracts. This increased gas limit contributes to the overall scalability of the network.

:::

The results demonstrate consistent performance improvements in the Polygon Edge network using PolyBFT consensus and the Edge client. The network has achieved higher transaction processing capabilities with the introduction of newer versions, leading to increased TPS and more efficient gas consumption.

For example, in Test 1 (2022-01-21) with version 83771622 on a t2.xlarge instance, the network achieved 344 TPS mined for EOA to EOA transactions. In contrast, Test 32 (2023-03-13) with version v0.7.3-beta1 on an x2iezn.2xlarge instance saw a significant increase in TPS mined for EOA to EOA transactions, reaching 2,078 TPS.

Similarly, in Test 2 (2022-03-02) with version 8a033aa1 on a t2.micro instance, the network achieved 65 TPS mined for ERC20 transactions. This performance improved considerably in Test 33 (2023-03-13) with version v0.7.3-beta1 on an x2iezn.2xlarge instance, reaching 549 TPS mined for ERC20 transactions.

Moreover, the network's gas per transaction and gas per second metrics have also improved. In Test 3 (2022-03-02), the network consumed 2,303,160 gas per second for ERC721 transactions. In comparison, Test 34 (2023-03-13) with version v0.7.3-beta1 on an x2iezn.2xlarge instance consumed only 23,599,455 gas per second for the same type of transaction.

### Table 1: Comparing 0.6.1, 0.7.0-alpha1, and 0.7.3-beta1

| Version       | Consensus | Instance Type  | Block Gas Limit | Transactions | TPS Sent | TPS Mined | Gas per tx | Gas per sec |
|---------------|-----------|----------------|-----------------|--------------|----------|-----------|------------|-------------|
| 0.6.1         | IBFT      | x2iezn.2xlarge | 200,000,000     | 30,000       | 1,900    | 1,666     | 21,000     | 34,986,000  |
| 0.7.0-alpha1  | PolyBFT   | x2iezn.2xlarge | 200,000,000     | 30,000       | 1,900    | 1,666     | 21,000     | 34,986,000  |
| 0.7.3-beta1   | PolyBFT   | x2iezn.2xlarge | 200,000,000     | 476,000      | 2,200    | 2,078     | 21,000     | 43,638,000  |

This table compares the performance of the Polygon Edge for three different versions (0.6.1, 0.7.0-alpha1, and 0.7.3-beta1) using the same instance type (x2iezn.2xlarge) and block gas limit (200,000,000).

- **v0.6.1**, which uses the IBFT consensus algorithm, has identical performance metrics to v0.7.0-alpha1, which uses the PolyBFT consensus algorithm. Both versions processed 30,000 transactions at a rate of 1,900 TPS sent and 1,666 TPS mined. They also had the same gas usage per transaction (21,000) and per second (34,986,000). This indicates that the transition from IBFT to PolyBFT in the alpha release did not significantly impact performance.

- **v0.7.3-beta1** shows improved performance compared to the previous two versions. This version has a substantial increase in the number of transactions processed (476,000) and a higher TPS sent (2,200), and TPS mined (2,078). Despite the increased throughput, the gas usage per transaction remains constant at 21,000. The gas usage per second has also increased to 43,638,000, reflecting the higher transaction throughput.
