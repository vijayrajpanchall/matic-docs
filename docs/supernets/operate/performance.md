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

The tests utilized various Amazon Web Services (AWS) instance types to evaluate the impact of varying compute resources on network performance:

- **t2.xlarge**
- **t2.micro**
- **c5.2xlarge**
- **c6a.48xlarge**
- **x2iezn.2xlarge**
- **c6a.xlarge**

<details>
<summary>General instance specifications</summary>

- **t2.xlarge**
  - vCPU: 4
  - Memory: 16 GiB
  - Network Performance: Up to 5 Gigabit
  - EBS-Optimized: Up to 2,750 Mbps
- **t2.micro**
  - vCPU: 1
  - Memory: 1 GiB
  - Network Performance: Low to Moderate
  - EBS-Optimized: Not available
- **c5.2xlarge**
  - vCPU: 8
  - Memory: 16 GiB
  - Network Performance: Up to 10 Gigabit
  - EBS-Optimized: Up to 3,500 Mbps
- **c6a.48xlarge**
  - vCPU: 192
  - Memory: 768 GiB
  - Network Performance: 50 Gigabit
  - EBS-Optimized: 14,000 Mbps
- **x2iezn.2xlarge**
  - vCPU: 8
  - Memory: 64 GiB
  - Network Performance: Up to 25 Gigabit
  - EBS-Optimized: Up to 3,500 Mbps
- **c6a.xlarge**
  - vCPU: 4
  - Memory: 16 GiB
  - Network Performance: Up to 10 Gigabit
  - EBS-Optimized: Up to 4,750 Mbps

</details>

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

<details>
<summary> General comparison of 0.6.x (IBFT) and 0.7.x (PolyBFT) Versions </summary>

- **Higher Transactions Per Second (TPS)**: The 0.7.x versions consistently demonstrate higher TPS rates, both sent and mined, than the 0.6.x versions. This improvement indicates that the newer versions can process more transactions in a shorter period.

- **Enhanced Scalability**: The 0.7.x versions significantly increase the block gas limit, suggesting that the network can handle more complex transactions and support larger smart contracts. This increased gas limit contributes to the overall scalability of the network

</details>

### Summary of test results

- **EOA to EOA transactions:**
  - The highest TPS Sent: 2,600 using x2iezn.2xlarge
  - The highest TPS Mined: 2,525 using x2iezn.2xlarge
  - The highest Gas per Second: 53,025,000 using x2iezn.2xlarge
  - The highest Gas per Transaction: 21,000 using x2iezn.2xlarge

- **ERC20 transactions:**
  - The highest TPS Sent: 1,300 using x2iezn.2xlarge
  - The highest TPS Mined: 714 using x2iezn.2xlarge
  - The highest Gas per Second: 32,385,650 using c6a.48xlarge
  - The highest Gas per Transaction: 29,150 using x2iezn.2xlarge and c6a.48xlarge

- **ERC721 transactions:**
  - The highest TPS Sent: 800 using x2iezn.2xlarge
  - The highest TPS Mined: 574 using x2iezn.2xlarge
  - The highest Gas per Second: 56,081,946 using c5.2xlarge
  - The highest Gas per Transaction: 115,158 in multiple tests using x2iezn.2xlarge and c5.2xlarge

<details>
<summary>EOA to EOA transaction tests</summary>

| Version | Validators | Consensus | Instance Type | Block Time | Block Gas Limit | Tool     | Type        | Transactions | TPS Sent | TPS Mined | Gas per tx | Gas per sec |
| ------- | ---------- | --------- | ------------- | ---------- | -------------- | -------- | ----------- | ------------| -------- | --------- | ---------- | ----------- |
| 83771622| 30         | ibft      | t2.xlarge     | 2          | 5,242,880      | Loadbot  | EOA to EOA | 10,000      | 400      | 344       | 21,000     | 7,224,000   |
| 06e11eac| 4          | ibft      | c5.2xlarge    | 1          | 20,000,000     | Loadbot  | EOA to EOA | 20,000      | 689      | 689       | 21,000     | 14,469,000  |
| v0.4.1  | 4          | ibft      | c6a.48xlarge  | 1          | 70,778,880     | Loadbot  | EOA to EOA | 30,000      | 1,428    | 1,428     | 21,000     | 29,988,000  |
| v0.6.1  | 4          | ibft      | x2iezn.2xlarge| 1          | 200,000,000    | polycli  | EOA to EOA | 30,000      | 1,900    | 1,666     | 21,000     | 34,986,000  |
| v0.7.0-alpha1 | 4    | ibft      | x2iezn.2xlarge| 1          | 200,000,000    | polycli  | EOA to EOA | 30,000      | 1,900    | 1,666     | 21,000     | 34,986,000  |
| v0.7.0-alpha1 | 4    | polybft   | x2iezn.2xlarge| 1         | 200,000,000    | polycli  | EOA to EOA | 30,000      | 1,800    | 1,764     | 21,000      | 37,044,000  |
| v0.7.0-alpha1 | 4    | polybft   | c6a.48xlarge  | 1          | 70,778,880     | Loadbot  | EOA to EOA | 30,000      | 1,428    | 491       | 21,000     | 10,311,000  |
| v0.7.0-alpha1 | 4    | polybft   | c6a.48xlarge   | 1          | 200,000,000    | polycli | EOA to EOA | 30,000       | 1,900    | 1,875     | 21,000    | 39,375,000  |
| e6f620fd| 4          | polybft   | x2iezn.2xlarge| 2          | 200,000,000    | polycli  | EOA to EOA | 100,000     | 2,250    | 2,127     | 21,000     | 44,667,000  |
| v0.7.1-alpha2     | 4    | polybft   | x2iezn.2xlarge | 2          | 200,000,000    | polycli | EOA to EOA | 100,000    | 2,300    | 2,222     | 21,000    | 46,662,000    |
| v0.7.3-beta1      | 4    | polybft   | x2iezn.2xlarge | 2          | 200,000,000    | polycli | EOA to EOA | 476,000    | 2,200    | 2,078      | 21,000    | 43,638,000  |
| v0.7.3-beta1      | 4    | polybft   | c6a.xlarge     | 2          | 200,000,000    | polycli | EOA to EOA | 476,000    | 2,200    | 756        | 21,000  | 15,876,000   |
| v0.7.3-beta1      | 4    | polybft   | c6a.xlarge     | 5          | 50,000,000     | polycli | EOA to EOA | 100,000 | 475            | 400          | 21,000              | 8,400,000      |
| v0.7.3-beta1     | 4     | polybft   | x2iezn.2xlarge| 1       | 200,000,000     | polycli | EOA to EOA | 500,000| 2,600        | 2,525       | 21,000      | 53,025,000      |

</details>

<details>
<summary>ERC20 transaction tests</summary>

| Version         | Validators | Consensus | Instance Type  | Block Time | Block Gas Limit | Tool    | Type  | Transactions | TPS Sent | TPS Mined | Gas per tx | Gas per sec |
| ---------------| ----------| --------- | -------------- | --------- | -------------- | ------- | ------| ------------ | -------- | --------- | ---------- | ----------- |
| ibft            | 6         | ibft      | t2.micro       | 65        | 5,242,880     | Loadbot | ERC20 | 5,000       | 200      | 0.19      | 29,150     | 1,894,750   |
| ibft            | 4         | ibft      | c5.2xlarge     | 500       | 20,000,000    | Loadbot | ERC20 | 20,000      | 500      | 0.16      | 29,150     | 14,575,000  |
| v0.4.1          | 4         | ibft      | c6a.48xlarge   | 1,111     | 47,185,920    | Loadbot | ERC20 | 50,000      | 1,111    | 0.45      | 29,150     | 32,385,650  |
| v0.6.1          | 4         | ibft      | x2iezn.2xlarge | 714       | 80,000,000    | polycli | ERC20 | 50,000      | 700      | 0.12      | 28,258     | 20,176,212  |
| v0.7.0-alpha1   | 4         | ibft      | x2iezn.2xlarge | 704       | 50,000,000    | polycli | ERC20 | 50,000      | 700      | 0.12      | 28,258     | 19,893,632  |
| v0.7.0-alpha1   | 4         | polybft   | x2iezn.2xlarge | 704       | 50,000,000    | polycli | ERC20 | 50,000      | 700      | 0.12      | 28,258     | 19,893,632  |
| v0.7.0-alpha1   | 4         | polybft   | c6a.48xlarge   | 602       | 47,185,920    | Loadbot | ERC20 | 50,000      | 1,111    | 0.14      | 29,150     | 17,548,300  |
| v0.7.0-alpha1   | 4         | polybft   | c6a.48xlarge   | 684       | 200,000,000   | polycli | ERC20 | 50,000      | 700      | 0.07      | 28,258     | 19,328,472  |
| e6f620fd        | 4         | polybft   | x2iezn.2xlarge | 697       | 200,000,000   | polycli | ERC20 | 50,000      | 1,300    | 0.19      | 28,258     | 19,695,826  |
| v0.7.1-alpha2 | 4 | polybft | x2iezn.2xlarge | 667 | 200,000,000 | polycli | ERC20 | 50,000 | 650 | 0.23 | 28,240 | 18,836,080 |
| v0.7.3-beta1 | 4 | polybft | x2iezn.2xlarge | 549 | 200,000,000 | polycli | ERC20 | 50,000 | 600 | 0.21 | 23,446 | 12,871,854 |
| v0.7.3-beta1 | 4 | polybft | c6a.xlarge | 285 | 200,000,000 | polycli | ERC20 | 50,000 | 600 | 0.18 | 23,446 | 6,682,110 |
| v0.7.3-beta1 | 4 | polybft | c6a.xlarge | 194 | 50,000,000 | polycli | ERC20 | 50,000 | 425 | 0.16 | 23,446 | 4,548,524 |
| v0.7.3-beta1 | 4 | polybft | x2iezn.2xlarge | 724 | 45,000,000 | polycli | ERC20 | 100,000 | 750 | 0.27 | 28,317 | 20,501,508 |

</details>

<details>
<summary>ERC721 transaction tests</summary>

| Version | Validators | Consensus | Instance Type | Block Time | Block Gas Limit | Tool     | Type        | Transactions | TPS Sent | TPS Mined | Gas per tx | Gas per sec |
| ------- | ---------- | --------- | ------------- | ---------- | -------------- | -------- | ----------- | ------------| -------- | --------- | ---------- | ----------- |
| 8a033aa1 | 6 | ibft | t2.mirco | 20 | 5,242,880 | Loadbot | ERC721 | 2,000 | 100 | 0.1 | 115,158 | 1,151,580 |
| 06e11eac | 4 | ibft | c5.2xlarge | 157 | 20,000,000 | Loadbot | ERC721 | 20,000 | 126 | 126 | 115,158 | 14,551,794 |
| 06e11eac | 4 | ibft | c5.2xlarge | 487 | 80,000,000 | Loadbot | ERC721 | 20,000 | 41 | 41 | 115,158 | 56,021,546 |
| v0.4.1   | 4          | ibft    | c6a.48xlarge   | 714        | 94,371,840    | Loadbot | ERC721 | 30,000      | 714      | 0.1       | 115,158    | 8,480,457   |
| v0.6.1   | 4          | ibft    | x2iezn.2xlarge | 697        | 100,000,000   | polycli | ERC721 | 30,000      | 700      | 0.2       | 48,113     | 16,746,449  |
| v0.7.0-alpha1 | 4     | ibft    | x2iezn.2xlarge | 697        | 100,000,000   | polycli | ERC721 | 30,000      | 700      | 0.2       | 48,113     | 16,746,449  |
| v0.7.0-alpha1 | 4     | polybft | x2iezn.2xlarge | 681        | 100,000,000   | polycli | ERC721 | 30,000      | 700      | 0.2       | 48,113     | 16,387,603  |
| v0.7.0-alpha1 | 4     | polybft | c6a.48xlarge   | 428        | 94,371,840    | Loadbot | ERC721 | 30,000      | 714      | 0.07      | 115,158    | 4,947,703   |
| v0.7.0-alpha1 | 4     | polybft | c6a.48xlarge   | 526        | 200,000,000   | polycli | ERC721 | 30,000      | 700      | 0.14      | 48,113     | 23,652,693  |
| v0.7.1-alpha2 | 4     | polybft | x2iezn.2xlarge | 675        | 200,000,000   | polycli | ERC721 | 50,000      | 750      | 0.15      | 48,000     | 36,000,000  |
| v0.7.3-beta1   | 4          | polybft   | x2iezn.2xlarge | 471        | 200,000,000     | polycli | ERC721| 50,000      | 600      | 0.13      | 50,105     | 23,599,455  |
| v0.7.3-beta1   | 4          | polybft   | c6a.xlarge     | 257        | 200,000,000     | polycli | ERC721| 50,000      | 600      | 0.23      | 50,105     | 12,876,985  |
| v0.7.3-beta1   | 4          | polybft   | c6a.xlarge     | 145        | 50,000,000      | polycli | ERC721| 50,000      | 200      | 0.03      | 50,105     | 3,878,377   |
| v0.7.3-beta1   | 4          | polybft   | x2iezn.2xlarge | 531        | 45,000,000      | polycli | ERC721| 100,000     | 650      | 1.22      | 50,105     | 26,605,755  |

</details>

Upon analyzing the performance benchmarks, several improvements are evident in the 0.7.x versions compared to 0.6.x versions. These improvements can be attributed to the introduction of Supernets and the transition from the IBFT consensus mechanism to PolyBFT. The key benefits and improvements observed in the 0.7.x versions are as follows.

### Table 1: Comparing 0.6.1, 0.7.0-alpha1, and 0.7.3-beta1

| Version       | Consensus | Instance Type  | Block Gas Limit | Transactions | TPS Sent | TPS Mined | Gas per tx | Gas per sec |
|---------------|-----------|----------------|-----------------|--------------|----------|-----------|------------|-------------|
| 0.6.1         | IBFT      | x2iezn.2xlarge | 200,000,000     | 30,000       | 1,900    | 1,666     | 21,000     | 34,986,000  |
| 0.7.0-alpha2  | PolyBFT   | x2iezn.2xlarge | 200,000,000     | 100,000      | 2,300    | 2,222     | 21,000     | 46,662,000  |
| 0.7.3-beta1   | PolyBFT   | x2iezn.2xlarge | 200,000,000     | 500,000      | 2,600    | 2,525     | 21,000     | 53,025,000  |

Table 1 compares the performance for three different versions (0.6.1, 0.7.0-alpha1, and 0.7.3-beta1) using the same instance type (x2iezn.2xlarge) and block gas limit (200,000,000).

- **v0.6.1**, which uses the IBFT consensus algorithm, has slightly lower performance metrics than v0.7.0-alpha2, which uses the PolyBFT consensus algorithm. v0.6.1 processed 30,000 transactions at a rate of 1,900 TPS sent and 1,666 TPS mined, while v0.7.0-alpha2 processed 100,000 transactions at a rate of 2,300 TPS sent and 2,222 TPS mined. They both had the same gas usage per transaction (21,000) but different gas usage per second (34,986,000 for v0.6.1 and 46,662,000 for v0.7.0-alpha2). This indicates that the transition from IBFT to PolyBFT in the alpha release provided significant improvements in performance.

- **v0.7.3-beta1** shows even more improved performance compared to the previous two versions. This version has a significant increase in the number of transactions processed (500,000) and a higher TPS sent (2,600), and TPS mined (2,525). Despite the significantly increased throughput, the gas usage per transaction remains constant at 21,000. The gas usage per second has also increased to 53,025,000, reflecting the higher transaction throughput. Overall, the beta release shows a significant improvement in performance over the earlier alpha release.
