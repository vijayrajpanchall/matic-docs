---
id: deposit-withdraw-event-plasma
title: 存入和检查点事件跟踪 - Plasma
sidebar_label: Deposit and Checkpoint Event Tracking
description:  "跟踪实时存入和检查点事件。"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

请查看[ Plasma 上的最新 Matic.js 文档](https://maticnetwork.github.io/matic.js/docs/plasma/)，以开始使用。

## 存入事件 {#deposit-events}

代币从以太坊存入 Polygon 时，将触发状态同步机制，并最终为 Polygon 链上的用户铸造代币。该过程需要约22-30分钟才能进行，因此听证存款事件对于创造良好的用户体验非常重要。此示例脚本可用于跟踪实时存入事件。

### 使用 Web Socket 连接来实时跟踪存入事件 {#realtime-deposit-event-tracking-using-a-web-socket-connection}

```jsx
const WebSocket = require("ws");
const _ = require("lodash");

// For Mumbai
const ws = new WebSocket("wss://ws-mumbai.matic.today/");
// For Polygon mainnet: wss://ws-mainnet.matic.network/

async function checkDepositStatus(user, token, childChain) {
  return new Promise((resolve, reject) => {
    ws.on("open", function open() {
      ws.send(
        `{"id": 1, "method": "eth_subscribe", "params": ["newDeposits", {"Contract": "${childChain}"}]}`
      );
      ws.on("message", function incoming(data) {
        var txData = _.get(JSON.parse(data), "params.result.Data", "");
        var userAddress = txData.substring(0, 64).replace(/^0+/, "0x");
        var contractAddress = txData.substring(65, 128).replace(/^0+/, "0x");

        if (
          user &&
          user.toLowerCase() === userAddress.toLowerCase() &&
          token &&
          token.toLowerCase() === contractAddress.toLowerCase()
        ) {
          console.log(data);
          resolve(true); // eslint-disable-line
        }
      });

      ws.on("close", () => {
        reject(false);
      });

      ws.on("error", () => {
        reject(false);
      });
    });
  });
}

// Param1 - user address
// Param2 - contract address on main chain
// Param3 - child chain address (0xD9c7C4ED4B66858301D0cb28Cc88bf655Fe34861 for mainnet)
checkDepositStatus(
  "0xFd71Dc9721d9ddCF0480A582927c3dCd42f3064C",
  "0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae",
  "0x1EDd419627Ef40736ec4f8ceffdE671a30803c5e"
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

### 查询区块链，以检查历史存入完成情况 {#historical-deposit-completion-check-by-querying-the-blockchain}

此脚本可用于检查特定存入是否已在子链上完成。主链和子链在两条链上不断增加全球计量变量的价值。[StateSender](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38) 合约发出一个具有计数器值的事件。子链上的计数器值可从 [StateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L12) 合约中查询。如果在主链上，子链上的计数值大于或等于相同的计数值，则存款可以视为成功完成。

```js
let Web3 = require("web3");

// For mainnet, use Ethereum RPC
const provider = new Web3.providers.HttpProvider(
  "https://goerli.infura.io/v3/API-KEY"
);
const web3 = new Web3(provider);

// For mainnet, use the Polygon mainnet RPC: <Sign up for a dedicated free RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.>
const child_provider = new Web3.providers.HttpProvider(
  "<insert Mumbai testnet RPC URL>" //get a free RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.
);

const child_web3 = new Web3(child_provider);

const contractInstance = new child_web3.eth.Contract(
  [
    {
      constant: true,
      inputs: [],
      name: "lastStateId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ],
  "0x0000000000000000000000000000000000001001"
);

async function depositCompleted(txHash) {
  let tx = await web3.eth.getTransactionReceipt(txHash);
  let child_counter = await contractInstance.methods.lastStateId().call();
  let root_counter = web3.utils.hexToNumberString(tx.logs[3].topics[1]);
  return child_counter >= root_counter;
}

// Param 1 - Deposit transaction hash
depositCompleted(
  "0x29d901174acd42d4651654a502073f3c876ff85b7887b2e2634d00848f6c982e"
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

## 检查点事件 {#checkpoint-events}

### 实时检查点状态跟踪 {#real-time-checkpoint-status-tracking}

在 Polygon 链上发生的所有交易都在验证者经常间隔内检查指向以太坊链。这次，在孟买上大约有10分钟，在 Polygon 主网上有30分钟。检查点出现在部署在以太坊链上的 RootChain 合约上。 以下脚本可用于监听实时检查点包含事件。

```jsx
const Web3 = require("web3");

// Ethereum provider
const provider = new Web3.providers.WebsocketProvider(
  "wss://goerli.infura.io/ws/v3/api-key"
);

const web3 = new Web3(provider);

// Sign up for a free dedicated RPC URL at https://rpc.maticvigil.com/ or other hosted node providers.
const chil_provider = new Web3.providers.HttpProvider(
  "<insert Mumbai testnet RPC URL>"
);
const child_web3 = new Web3(chil_provider);

async function checkInclusion(txHash, rootChainAddress) {
  let txDetails = await child_web3.eth.getTransactionReceipt(txHash);

  block = txDetails.blockNumber;
  return new Promise(async (resolve, reject) => {
    web3.eth.subscribe(
      "logs",
      {
        address: rootChainAddress,
      },
      async (error, result) => {
        if (error) {
          reject(error);
        }

        console.log(result);
        if (result.data) {
          let transaction = web3.eth.abi.decodeParameters(
            ["uint256", "uint256", "bytes32"],
            result.data
          );
          if (block <= transaction["1"]) {
            resolve(result);
          }
        }
      }
    );
  });
}

// Param1 - Burn transaction hash on child chain
// Param2 - RootChainProxy Address on root chain (0x86E4Dc95c7FBdBf52e33D563BbDB00823894C287 for mainnet)
checkInclusion(
  "0x9d1e61d9daaa12fcd00fcf332e1c06fd8253a949b4f2a4741c964454a67ea943",
  "0x2890ba17efe978480615e330ecb65333b880928e"
)
  .then((res) => {
    console.log(res);
    provider.disconnect();
  })
  .catch((err) => {
    console.log(err);
  });
```

### 查询区块链，以完成历史检查点纳入情况 {#historical-checkpoint-inclusion-check-by-querying-the-blockchain}

这可使用以下 API 进行检查。在子链上，必须将烧伤交易的区块编号作为此 GET API 参数来提供。

```
// Testnet
https://apis.matic.network/api/v1/mumbai/block-included/block-number
// Mainnet
https://apis.matic.network/api/v1/matic/block-included/block-number
```
