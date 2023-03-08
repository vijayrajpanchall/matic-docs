---
id: json-rpc
title: JSON RPC
description: 对 Polygon Edge 的 JSON RPC 模块的解释。

keywords:
  - docs
  - polygon
  - edge
  - architecture
  - module
  - json-rpc
  - endpoints
---

## 概述 {#overview}

**JSON RPC** 模块使用 **JSON RPC API 层**，去中心化应用程序的开发人员使用该层与区块链交互。

包含对标准 **[json-rpc 端点](https://eth.wiki/json-rpc/API)**和 websocket
端点的支持。

## 区块链界面 {#blockchain-interface}

Polygon Edge 使用***区块链界面***定义 JSON RPC 模型需要使用的所有方式，
从而用于传输其端点。

使用 **[Minimal](/docs/edge/architecture/modules/minimal)** 服务器落实的区块链界面。这是传递至 JSON RPC 层的基础实施。

````go title="jsonrpc/blockchain.go"
type blockchainInterface interface {
	// Header returns the current header of the chain (genesis if empty)
	Header() *types.Header

	// GetReceiptsByHash returns the receipts for a hash
	GetReceiptsByHash(hash types.Hash) ([]*types.Receipt, error)

	// Subscribe subscribes for chain head events
	SubscribeEvents() blockchain.Subscription

	// GetHeaderByNumber returns the header by number
	GetHeaderByNumber(block uint64) (*types.Header, bool)

	// GetAvgGasPrice returns the average gas price
	GetAvgGasPrice() *big.Int

	// AddTx adds a new transaction to the tx pool
	AddTx(tx *types.Transaction) error

	// State returns a reference to the state
	State() state.State

	// BeginTxn starts a transition object
	BeginTxn(parentRoot types.Hash, header *types.Header) (*state.Transition, error)

	// GetBlockByHash gets a block using the provided hash
	GetBlockByHash(hash types.Hash, full bool) (*types.Block, bool)

	// ApplyTxn applies a transaction object to the blockchain
	ApplyTxn(header *types.Header, txn *types.Transaction) ([]byte, bool, error)

	stateHelperInterface
}
````

## 以太币端点 {#eth-endpoints}

所有标准 JSON RPC 端点都落在：

````bash
jsonrpc/eth_endpoint.go
````

## 筛选管理器 {#filter-manager}

**筛选管理器**是一项和 JSON RPC 服务器一起运行的服务。

为区块链上的筛选区块提供支持。<br />具体而言，它包含**日志**和**区块**级别筛选。

筛选管理器重度依赖订阅活动，详见[区块链](blockchain#blockchain-subscriptions)节

````go title="jsonrpc/filter_manager.go"
type Filter struct {
	id string

	// block filter
	block *headElem

	// log cache
	logs []*Log

	// log filter
	logFilter *LogFilter

	// index of the filter in the timer array
	index int

	// next time to timeout
	timestamp time.Time

	// websocket connection
	ws wsConn
}


type FilterManager struct {
	logger hclog.Logger

	store   blockchainInterface
	closeCh chan struct{}

	subscription blockchain.Subscription

	filters map[string]*Filter
	lock    sync.Mutex

	updateCh chan struct{}
	timer    timeHeapImpl
	timeout  time.Duration

	blockStream *blockStream
}

````

筛选管理器活动在*运行*方法中发送：

````go title="jsonrpc/filter_manager.go"
func (f *FilterManager) Run() {

	// watch for new events in the blockchain
	watchCh := make(chan *blockchain.Event)
	go func() {
		for {
			evnt := f.subscription.GetEvent()
			if evnt == nil {
				return
			}
			watchCh <- evnt
		}
	}()

	var timeoutCh <-chan time.Time
	for {
		// check for the next filter to be removed
		filter := f.nextTimeoutFilter()
		if filter == nil {
			timeoutCh = nil
		} else {
			timeoutCh = time.After(filter.timestamp.Sub(time.Now()))
		}

		select {
		case evnt := <-watchCh:
			// new blockchain event
			if err := f.dispatchEvent(evnt); err != nil {
				f.logger.Error("failed to dispatch event", "err", err)
			}

		case <-timeoutCh:
			// timeout for filter
			if !f.Uninstall(filter.id) {
				f.logger.Error("failed to uninstall filter", "id", filter.id)
			}

		case <-f.updateCh:
			// there is a new filter, reset the loop to start the timeout timer

		case <-f.closeCh:
			// stop the filter manager
			return
		}
	}
}
````

## 📜 资源 {#resources}
* **[以太坊 JSON-RPC](https://eth.wiki/json-rpc/API)**
