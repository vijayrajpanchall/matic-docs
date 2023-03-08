---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: 在 Polygon 上建立下一个区块链应用程序
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dagger 是从以太坊区块链获取实时更新的最佳方式。
它可帮助您的 DApp 和后端系统通过 WebSocket 或 Socket 实时获取交易、代币转账、收据和日志等以太坊区块链事件。

我们维护的基础设施为可靠、可扩展的实时事件提供支持。`@maticnetwork/dagger` 是用 NodeJS 编写的 Dagger 项目的消费库。它使用 Dagger 服务器从以太坊网络获取实时更新。

## 安装 {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## 网络 {#network}

### 以太坊网络 {#ethereum-network}

#### 主网 {#mainnet}

```sh
Websocket: wss://mainnet.dagger.matic.network
Socket: mqtts://mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Kovan {#kovan}

```sh
Websocket: wss://kovan.dagger.matic.network
Socket: mqtts://kovan.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Ropsten {#ropsten}

```sh
Websocket: wss://ropsten.dagger.matic.network
Socket: mqtts://ropsten.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Goerli {#goerli}

```sh
Websocket: wss://goerli.dagger.matic.network
Socket: mqtts://goerli.dagger.matic.network (You can also use `ssl://` protocol)
```

### Matic 网络 {#matic-network}

#### 主网 {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Mumbai 测试网 {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## 示例 {#example}

- 我们先创建一个 _NPM_ 项目。

```bash
npm init -y
touch index.js
```

- 接下来，将以下代码片段放入 `index.js`。

```javascript
const Dagger = require('@maticnetwork/dagger')

// connect to correct dagger server, for receiving network specific events
//
// you can also use socket based connection
const dagger = new Dagger("wss://mainnet.dagger.matic.network")

// get new block as soon as it gets created
dagger.on('latest:block.number', result => {
  console.log(`New block created: ${result}`)
})
```

- 运行 `index.js`，待新区块成功创建后，您即可开始接收区块编号。

```bash
node index.js
```

## API {#api}

### 新 Dagger(url) {#new-dagger-url}

创建 Dagger 对象

- `url` 是 Dagger 服务器的地址。查看[网络章节](#network)，获取所有可用的 url 值。

示例：

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

订阅一个主题

- `event` 是要订阅的 `String` 主题。支持 `event` 通配符（`+`- 用于单级、`#`- 用于多级）
- `fn` - `function (data, removed)`
fn 将在事件发生时执行：
  - 来自事件的 `data` 数据
  - `removed` 标志表示数据是否因重组而从区块链中删除。

示例：

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

与 [on](#daggeronevent-fn) 相同，但只会触发一次。

示例：

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

取消订阅一个主题

- `event` 是要取消订阅的 `String` 主题，来自
- `fn` - `function (data, removed)`

示例：

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

用 Dagger 创造 Room。`room` 必须是两个值之一
  - `latest`
  - `confirmed`

`room` 对象有以下几种方法：
  - `on` 与 Dagger 相同 `on`
  - `once` 与 Dagger 相同 `once`
  - `off` 与 Dagger 相同 `off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

关闭 Dagger，接受以下选项：

- `force`：将其传递给 true 将立即关闭 Dagger。此参数为
选填。

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

创建 Web3 合约包装器以支持 Dagger。

- 首先，创建一个 Web3 合约对象。

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- 现在我们将在其上创建 Dagger 合约包装器。

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- 下面，过滤合约事件

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- 监听合约事件

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- 停止事件监听

```js
// stop watching
filter.stopWatching();
```

## 事件 {#events}

每个事件都有一个 room ∈ {`latest`, `confirmed`}。
  - `latest`：区块入链后立即触发事件。
  - `confirmed`：在 12 次确认后触发事件。

如果您想在 DApp 中显示 UI 更新，请使用 `latest` 事件。这有助于提升 UI/UX 的表现和用户友好度。

对于来自服务器或 UI 中的不可逆任务，请使用 `confirmed` 事件。比如发送电子邮件、通知，或支持用户在一笔交易被确认后通过用户界面执行后续任务。

### 网络事件 {#network-events}

| 以太坊事件 | 何时？ | `removed` 标志 |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| block | 每次新建区块时 | 是 |
| block.number | 每次创建新区块编号时 |                |
| block.hash | 每次创建新区块哈希时 | 是 |
| block/`number` | 当特定区块在未来入链时 | 是 |
| addr/`address`/tx | `address` 每产生一笔新交易时 | 是 |
| addr/`address`/tx/out | `address` 每产生一笔新的转出交易时 | 是 |
| addr/`address`/tx/in | `address` 每产生一笔新的转入交易时 | 是 |
| tx/`txId` | 当特定 `txId` 被放入区块时 | 是 |
| tx/`txId`/success | 当 `txId` 的 tx 状态为成功（被放入区块）时 | 是 |
| tx/`txId`/fail | 当 `txId` 的 tx 失败（被放入区块）时 | 是 |
| tx/`txId`/receipt | 当生成 `txId` 的回执（被放入区块）时 | 是 |
| addr/`contractAddress`/deployed | 当新 `contractAddress` 被放入区块时 | 是 |
| log/`contractAddress` | 当生成 `contractAddress` 的新日志时 | 是 |
| log/`contractAddress`/filter/`topic1`/`topic2` | 当生成带有 `topic1` 和 `topic2` 的 `contractAddress` 新日志时 | 是 |

### Dagger 事件 {#dagger-events}

| Dagger 事件 | 何时？ | 参数 |
| ----------------- | ------------------------------ | -------------- |
| connection.status | 当连接状态改变时 | 值：布尔值 |


每个事件都必须从 room 开始：

#### block {#block}

每产生一个新区块时

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block", result => {
  console.log("Current block : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block", result => {
  console.log("Confirmed block : ", result)
})
```

</TabItem>
</Tabs>


#### block.number {#block-number}

每产生一个新区块编号时

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block.number", result => {
  console.log("Current block number : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block.number", result => {
  console.log("Confirmed block number : ", result)
})
```

</TabItem>
</Tabs>

#### block.hash {#block-hash}

每产生一个新区块哈希时

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block.hash", result => {
  console.log("Current block hash : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block.hash", result => {
  console.log("Confirmed block hash : ", result)
})
```

</TabItem>
</Tabs>

#### block/{number} {#block-number-1}

当特定区块 **X** 在未来入链时

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block/X", result => {
  console.log("Included in chain : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block/X", result => {
  console.log("Included in chain : ", result)
})
```

</TabItem>
</Tabs>

#### addr/{address}/tx {#addr-address-tx}

`address` 每产生一笔新交易时

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/{address}/tx", result => {
  console.log("New Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/{address}/tx", result => {
  console.log("New Transaction : ", result)
})
```

</TabItem>
</Tabs>

#### addr/{address}/tx/{dir} {#addr-address-tx-dir}

`dir` 是交易方向 ∈ {`in`, `out`}。`address` 可省略，以接收有关任意地址的通知。

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

`address` 每产生一笔新的转入交易时

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/{address}/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/{address}/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="out">

`address` 每产生一笔新的转出交易时

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/{address}/tx/out", result => {
  console.log("New Outgoing Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/{address}/tx/out", result => {
  console.log("New Outgoing Transaction : ", result)
})
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="all">

使用通配符代替 `address`，以获取所有转入和转出交易的通知。

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/+/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/+/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

#### tx/{txId}/{status} {#tx-txid-status}

`status` 是 `txId` 的状态 ∈ {`success`, `fail`, `receipt`}。它也可以为空，即 `tx/{txId}`，当 `txId` 被放入区块时触发。

<Tabs
defaultValue="any"
values={[
{ label: 'any', value: 'any', },
{ label: 'success', value: 'success', },
{ label: 'fail', value: 'fail', },
{ label: 'receipt', value: 'receipt', },
]
}>
<TabItem value="any">

当特定 `txId` 被放入区块时

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="success">

当 `txId` 的 tx 状态为成功（被放入区块）时

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}/success", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}/success", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="fail">

当 `txId` 的 tx 失败（被放入区块）时

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}/fail", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}/fail", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="receipt">

当生成 `txId` 的回执（被放入区块）时

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}/receipt", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}/receipt", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

#### log/{contractAddress} {#log-contractaddress}

当 `contractAddress` 的日志生成时

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:log/{contractAddress}", result => {
  console.log("New Log : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:log/{contractAddress}", result => {
  console.log("New Log : ", result)
})
```

</TabItem>
</Tabs>

#### log/{contractAddress}/filter/{topic0}/{topic1}/{topic2} {#log-contractaddress-filter-topic0-topic1-topic2}

当生成带有 `topic0`、`topic1` 和 `topic2` 的 `contractAddress` 新日志时

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> 事件名称区分大小写。`address`、`txId` 和 `topics` 必须小写。

> 注意：事件也支持通配符。通配符分为两类：`+`（用于单级）和 `#`（用于多级）。请谨慎使用，因为它会获取多于您所需的数据，令海量数据涌入您的 DApp。



## 测试 Dagger 服务器 {#test-dagger-server}

该库包含 `woodendagger` 可执行文件，它是位于本地设备上的测试 Dagger 服务器。可供您使用 TestRPC 进行测试。

请勿在生产中使用 `woodendagger`。仅供开发使用。不支持 `removed` 标志。

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## 支持 {#support}

如果您有任何疑问、反馈或功能申请，请随时通过 [Telegram](https://t.me/maticnetwork) 与我们联系

## 许可 {#license}

MIT
