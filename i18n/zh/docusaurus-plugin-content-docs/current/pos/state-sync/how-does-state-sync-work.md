---
id: how-state-sync-works
title: 状态同步的工作原理
description: "将状态从以太坊链发送到 Bor 链。"
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# 状态同步的工作原理 {#how-does-state-sync-work}

状态管理将状态从以太坊链发送到 Bor 链。它被称为**状态-同步。**

通过系统调用来进行国别转账，从以太机转账到 Bor假设，用户将 USDC 存入在Ethereum上的存款管理者。验证者听听这些事件，验证并将其存储在 Heimdall 状态中。Bor 获得最新的状态同步记录，并使用系统调用，更新 Bor 状态（在 Bor 上铸造等量的 USDC）。

## 状态发送者 {#state-sender}

来源：[https://github.com/maticnetwork/contracts/blob/depert/contract/root/stateSyncer/SateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

要同步状态，合约在以太链上调用以下方法**状态发送者合约**。

```jsx
contract StateSender {
	/**
	 * Emits `stateSynced` events to start sync process on Ethereum chain
	 * @param receiver    Target contract on Bor chain
	 * @param data        Data to send
	 */
	function syncState (
		address receiver,
		bytes calldata data
	) external;
}
```

`receiver`合约必须存在于子链上，`data`进程完成后，子链就会收到状态。 在以太坊上 `syncState` 发出 `StateSynced` 事件，内容如下：

```jsx
/**
 * Emits `stateSynced` events to start sync process on Ethereum chain
 * @param id                  State id
 * @param contractAddress     Target contract address on Bor
 * @param data                Data to send to Bor chain for Target contract address
 */
event StateSynced (
	uint256 indexed id,
	address indexed contractAddress,
	bytes data
);
```

以太坊链上，`stateSender` 合约发出 `StateSynced` 事件后，Heimdall 侦听这些事件，并在 2/3 以上的验证者同意后添加到 Heimdall 状态。

在每次冲刺（目前在 Bor 上有 64 个区块）之后，Bor 会获取新的状态同步记录，并使用 `system` 调用来更新状态。以下是相关代码：[https://github.com/maticnetwor/blob/6f08daecaebf4cf18bee558fc3796d41832/consure/genesis_consits_cracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

`commitState` 期间，Bor 在目标合约上执行 `onStateReceive`，以 `stateId` 和 `data` 当作自变量。

## Bor 上的状态接受者接口 {#state-receiver-interface-on-bor}

`receiver`Bor 链上的合约必须实施以下接口。

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

必须允许 `0x0000000000000000000000000000000000001001`-`StateReceiver.sol` 才能在目标合约上调用 `onStateReceive` 函数。

## 系统调用
 {#system-call}

只有系统地址 `2^160-2` 允许系统调用。Bor 在内部调用的系统地址为 `msg.sender`。它改变了合约状态，并为特定区块更新了状态根。灵感来自 [https://github.com/ethereum/EIPs/blob/master/EIPs/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) 和 [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

系统调用有助于在无需做交易的情况下更改合约的状态。

## 状态同步日志以及 Bor 区块收据 {#state-sync-logs-and-bor-block-receipt}

由系统调用发出的事件的处理方式与普通日志不同。以下是代码：[https://github.com/maticnetwork/bor/pull/90](https://github.com/maticnetwork/bor/pull/90)。

Bor 仅为客户端生产新的交易/收据，其中包括所有状态同步交易日志。Tx 哈希来自区块编号和区块哈希（该冲刺的最后一个区块）：

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

这不会改变任何共识逻辑`eth_getBlockByNumber``eth_getTransactionReceipt`，仅改变客户端。它`eth_getLogs`包含有衍生的状态同步日志。注意，区块上的 bloom 过滤器不包含状态同步日志。它也未包含衍生的交易在 `transactionRoot`或 。`receiptRoot`