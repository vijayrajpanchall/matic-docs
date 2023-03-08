---
id: ethereum-to-matic
title: 从以太坊到 Polygon 的转账数据
description: 从以太坊到 Polygon 的合约转账状态或数据
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

“状态同步机制”用于从 Polygon EVM 链本地读取以太坊数据。换言之，该机制将任意数据从以太坊链转移到 Polygon 链。具体的实现流程是：一旦选中某个事件 — `StateSynced`Heimdall 层上的验证者将监听发送者合约中的该事件，在事件中传递的 `data` 被写入接受者合约。请查看[此处](/docs/maintain/validator/core-components/state-sync-mechanism)了解更多详情。

发送者和接受者合约都要求映射到以太坊上 — [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) 需要注意每个发送者和接受者。如果您希望完成映射，请在[此处](https://mapper.polygon.technology/)请求映射。

---

在下面的演示中，我们将在 Goerli （以太坊测试网）上部署发送者合约，在 Mumbai （Polygon 测试网）上部署接受者合约，然后通过节点脚本的 Web3 调用发送来自发送者的数据并读取接受者的数据。

### 1. 部署发送者合约 {#1-deploy-sender-contract}

发送者合约的唯一用途是可以调用 StateSender 合约上的 [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) 函数 — 该合约是 Matic 的状态同步合约 — Heimdall 正在监听的 StateSynced 事件。

部署在：

Goerli 上 `0xEAa852323826C71cd7920C3b4c007184234c3945`

以太坊主网上 `0x28e4F3a7f651294B9564800b2D01f35189A5bFbE`

在调用此函数之前，必须先在我们的合约中包含其接口。

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

接下来，我们编写自定义函数，用于吸收我们希望传递给 polygon 的数据并且调用 syncState

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

在上述函数中， `stateSenderContract` 是您将要部署 `Sender` 的网络上的 StateSender 地址（例如，我们对 Goerli 使用 `0xEAa852323826C71cd7920C3b4c007184234c3945` ），而 `receiver` 是用于接收我们从此处发送数据的合约。

建议使用构造函数来传递变量，但在本演示中，我们只会硬编码这两个地址：

Sender.sol 展示如下：

```jsx
// sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

contract sender {
  address public stateSenderContract = 0xEAa852323826C71cd7920C3b4c007184234c3945;
  address public receiver = 0x83bB46B64b311c89bEF813A534291e155459579e;

  uint public states = 0;

  function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
  }

}
```

我们使用简单的 `states` 计数器来跟踪通过发送者合约发送的状态数。

使用 Remix 部署合约并记下地址和 ABI。

### 2. 部署接受者合约 {#2-deploy-receiver-contract}

接受者合约是在发送 `StateSynced` 事件时验证者调用的合约。验证者调用接受者合约上的 `onStateReceive` 函数来提交数据。在实施时，我们首先导入 [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) 接口并写下自定义逻辑 — 用于解释 onStateReceive 内部传输的数据。

Receiver.sol 展示如下：

```jsx
// receiver.sol

pragma solidity ^0.5.11;

// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}

contract receiver {

  uint public lastStateId;
  bytes public lastChildData;

  function onStateReceive(uint256 stateId, bytes calldata data) external {
    lastStateId = stateId;
    lastChildData = data;
	}

}
```

函数仅向变量分配最后接收的状态 ID 和数据。[StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) 是对转移状态的简单唯一引用（简单计数器）。

在 polygon 测试网上部署您的 Reeciver.sol 并记下地址和 ABI

### 3. 获取已被映射的发送者和接受者 {#3-getting-your-sender-and-receiver-mapped}

您可以使用已部署的发送者和接受者地址（如上文所述），或部署您的自定义合约并在此处请求完成映射： [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. 发送和接收数据 {#4-sending-and-receiving-data}

我们已完成合约和映射，现在将编写一个简单的节点脚本来发送任意十六进制字节，在 Polygon 上接收它们并解释数据！

**4.1 设置您的脚本**

我们将首先初始化 Web3 对象和钱包，以执行交易和合约

```jsx
// test.js

const Web3 = require('web3')
const Network = require("@maticnetwork/meta/network")

const network = new Network ('testnet', 'mumbai')

const main = new Web3(network.Main.RPC)
const matic = new Web3 (network.Matic.RPC)

let privateKey = `0x...` // add or import your private key

matic.eth.accounts.wallet.add(privateKey)
main.eth.accounts.wallet.add(privateKey)

let receiverAddress = `<RECEIVER_CONTRACT_ADDRESS>`
let receiverABI = `` // insert or import ABI
let senderAddress = `<SENDER_CONTRACT_ADDRESS>`
let senderABI = `` // insert of import the ABI

let sender = new main.eth.Contract(JSON.parse(senderABI), senderAddress)
let receiver = new matic.eth.Contract(JSON.parse(receiverABI), receiverAddress)

```

我们为 RPC 使用 @maticnetwork/meta 包，但它并不是运行脚本的必要条件。

`matic` 和 `main` 对象是指分别用 Polygon 和 Ropsten 的 RPC 进行初始化的 Web3 对象。

`sender` 和 `receiver` 对象是指我们在第 1 步和第 2 步中部署的 Sender.sol 和 Receiver.sol 合约对象。

**4.2 发送数据**

接下来，我们设置函数，以创建数据的字节字符串，并通过发送者合约来发送：

```jsx
// data to sync
function getData(string) {
  let data = matic.utils.asciiToHex(string);
  return data
}

// send data via sender
async function sendData (data) {
  let r = await sender.methods
    .sendState (getData(data))
    .send({
      from: main.eth.accounts.wallet[0].address,
      gas: 8000000
    })
  console.log('sent data from root, ', r.transactionHash)
}
```

调用 `getData` 可以将 Ascii 字符串（例如 `Hello World !`）转换为字节字符串（例如 `0x48656c6c6f20576f726c642021`）；而函数 `sendData` 可吸收 `data`（ Ascii 字符串）、调用 `getData` 并向发送者合约传递字节字符串

**4.3 接收数据**

接下来，我们将检查 Receiver.sol 上已接收的数据。

执行状态同步需要大约 7-8 分钟。

添加以下函数来检查：（a）来自发送者的发送状态数量和（b）接受者最后接收的状态。

```jsx
// check `states` variable on sender
async function checkSender () {
  let r = await sender.methods
    .states()
    .call()
  console.log('number of states sent from sender: ', r)
}

// check last received data on receiver
async function checkReceiver () {
  let r = await receiver.methods
    .lastStateId()
    .call()
  let s = await receiver.methods
    .lastChildData()
    .call()
  console.log('last state id: ', r, 'and last data: ', s)
  console.log('interpreted data: ', getString(s))
}
```

函数 `checkReceiver` 只调用我们在合约中定义的变量 — 一旦验证者调用合约上的 `onStateReceive` ，该变量可尽快设置完成。`getString` 函数仅用于解释字节字符串（将其转回 Ascii ）

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

最终，我们将编写执行函数的方法：

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 全部组合在一起！**

这就是我们的测试脚本展示：

```jsx
// test.js

const Web3 = require('web3')
const Network = require("@maticnetwork/meta/network")

const network = new Network ('testnet', 'mumbai')

const main = new Web3(network.Main.RPC)
const matic = new Web3 (network.Matic.RPC)

let privateKey = `0x...`
matic.eth.accounts.wallet.add(privateKey)
main.eth.accounts.wallet.add(privateKey)

let receiverAddress = `<RECEIVER_CONTRACT_ADDRESS>`
let receiverABI = ``
let senderAddress = `<SENDER_CONTRACT_ADDRESS>`
let senderABI = ``

let sender = new main.eth.Contract(JSON.parse(senderABI), senderAddress)
let receiver = new matic.eth.Contract(JSON.parse(receiverABI), receiverAddress)

// data to sync
function getData(string) {
  let data = matic.utils.asciiToHex(string);
  return data
}

function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}

// console.log(getData('Sending a state sync! :) '))

async function sendData (data) {
  let r = await sender.methods
    .sendState (getData(data))
    .send({
      from: main.eth.accounts.wallet[0].address,
      gas: 8000000
    })
  console.log('sent data from root, ', r.transactionHash)
}

async function checkSender () {
  let r = await sender.methods
    .states()
    .call()
  console.log('number of states sent from sender: ', r)
}

async function checkReceiver () {
  let r = await receiver.methods
    .lastStateId()
    .call()
  let s = await receiver.methods
    .lastChildData()
    .call()
  console.log('last state id: ', r, 'and last data: ', s)
  console.log('interpreted data: ', getString(s))
}

async function test() {
	await sendData ('Hello World !')
	await checkSender ()
	// add a timeout here to allow time gap for the state to sync
	await checkReceiver ()
}

test()
```

**4.5 现在运行脚本**

成功执行上述脚本可提供输出：

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
