---
id: txpool
title: TxPool
description: 对 Polygon Edge 的 TxPool 模块的解释。
keywords:
  - docs
  - polygon
  - edge
  - architecture
  - module
  - TxPool
  - transaction
  - pool
---

## 概述 {#overview}

TxPool 模块代表交易池实施，其中交易从系统的不同部分添加。该模块还为节点运算符提供了一些有用的功能，下面将介绍这些功能。

## 运算符命令 {#operator-commands}

````go title="txpool/proto/operator.proto
service TxnPoolOperator {
    // Status returns the current status of the pool
    rpc Status(google.protobuf.Empty) returns (TxnPoolStatusResp);

    // AddTxn adds a local transaction to the pool
    rpc AddTxn(AddTxnReq) returns (google.protobuf.Empty);

    // Subscribe subscribes for new events in the txpool
    rpc Subscribe(google.protobuf.Empty) returns (stream TxPoolEvent);
}

````

节点运算符查询这些 GRPC 端点，如 **[CLI 命令](/docs/edge/get-started/cli-commands#transaction-pool-commands)**部分所述。

## 处理交易 {#processing-transactions}

````go title="txpool/txpool.go"
// AddTx adds a new transaction to the pool
func (t *TxPool) AddTx(tx *types.Transaction) error {
	if err := t.addImpl("addTxn", tx); err != nil {
		return err
	}

	// broadcast the transaction only if network is enabled
	// and we are not in dev mode
	if t.topic != nil && !t.dev {
		txn := &proto.Txn{
			Raw: &any.Any{
				Value: tx.MarshalRLP(),
			},
		}
		if err := t.topic.Publish(txn); err != nil {
			t.logger.Error("failed to topic txn", "err", err)
		}
	}

	if t.NotifyCh != nil {
		select {
		case t.NotifyCh <- struct{}{}:
		default:
		}
	}
	return nil
}

func (t *TxPool) addImpl(ctx string, txns ...*types.Transaction) error {
	if len(txns) == 0 {
		return nil
	}

	from := txns[0].From
	for _, txn := range txns {
		// Since this is a single point of inclusion for new transactions both
		// to the promoted queue and pending queue we use this point to calculate the hash
		txn.ComputeHash()

		err := t.validateTx(txn)
		if err != nil {
			return err
		}

		if txn.From == types.ZeroAddress {
			txn.From, err = t.signer.Sender(txn)
			if err != nil {
				return fmt.Errorf("invalid sender")
			}
			from = txn.From
		} else {
			// only if we are in dev mode we can accept
			// a transaction without validation
			if !t.dev {
				return fmt.Errorf("cannot accept non-encrypted txn")
			}
		}

		t.logger.Debug("add txn", "ctx", ctx, "hash", txn.Hash, "from", from)
	}

	txnsQueue, ok := t.queue[from]
	if !ok {
		stateRoot := t.store.Header().StateRoot

		// initialize the txn queue for the account
		txnsQueue = newTxQueue()
		txnsQueue.nextNonce = t.store.GetNonce(stateRoot, from)
		t.queue[from] = txnsQueue
	}
	for _, txn := range txns {
		txnsQueue.Add(txn)
	}

	for _, promoted := range txnsQueue.Promote() {
		t.sorted.Push(promoted)
	}
	return nil
}
````
***addImpl*** 方法是 **TxPool** 模块的面包和黄油。它是系统中添加交易的中心位置，从 GRPC 服务、JSON RPC 端点调用，以及当客户端通过 **gossip** 协议接收交易时调用。

它以 **ctx** 为参数，这只是表示从中添加交易的背景（GRPC、JSON RPC...）<br />。其他参数是要添加到池中的交易列表。

这里要注意到的关键事情是查看交易中**从**字段：
* 如果**从**字段为**空**，它被视为未加密/未签名交易。这些类型的交易仅在开发模式下被接受
* 如果**从**字段**不为空**，这意味着它是签名交易，因此需要进行签名验证

经过所有这些验证，交易被认为是有效的。

## 数据结构 {#data-structures}

````go title="txpool/txpool.go"
// TxPool is a pool of transactions
type TxPool struct {
	logger hclog.Logger
	signer signer

	store      store
	idlePeriod time.Duration

	queue map[types.Address]*txQueue
	sorted *txPriceHeap

	// network stack
	network *network.Server
	topic   *network.Topic

	sealing  bool
	dev      bool
	NotifyCh chan struct{}

	proto.UnimplementedTxnPoolOperatorServer
}
````

TxPool 对象中可能引起混乱的字段是**队列**和**排序**列表。
* **队列** - 账户交易排序列表的堆实施（按随机数）
* **排序** - 所有当前推广交易（所有可执行交易）的排序。按燃料价格排序

## 燃料限制错误管理 {#gas-limit-error-management}

每当提交交易时，TxPool 都可以以三种方式进行处理。

1. 所有待决交易都可以配置在区块中
2. 一个或多个待决交易不可以配置在区块中
3. 一个或多个待决交易永远不会配置在区块中

在这里，**_fit_** 字符号意味着交易的燃料限制低于 TxPool 中剩余的燃料的燃料限制。

第一种情况不会产生错误。

### 第二种情况 {#second-scenario}

- 将 TxPool 剩余燃料设置为最后一个区块的燃料限制，比方说**5000**
- 第一个交易经过处理，消耗 TxPool 的 **3000** 燃料
  - TxPool 的剩余燃料现在是 **2000**
- 提交第二笔交易，与第一笔交易相同 - 他们都消耗 3000 单位的燃料
- 由于 TxPool 的剩余燃料**低于**交易燃料，因此在当前区块中无法处理
  - 将其重新放回待处理交易队列，以便在下一个区块中处理
- 第一个区块已写入，将该区块称为 **区块 #1**
- 将 TxPool 剩余燃设置为父区块 - **区块#1**的燃料限制
- 被重新放回 TxPool 待处理交易队列的交易现在已处理并写入区块中
  - TxPool 的剩余燃料现在为 **2000**
- 第二个区块是写入
- ...

![TxPool 错误情况 #1](/img/edge/txpool-error-1.png)

### 第三种情况 {#third-scenario}
- 将 TxPool 剩余燃料设置为最后一个区块的燃料限制，比方说**5000**
- 第一个交易经过处理，消耗 TxPool 的 **3000** 燃料
    - TxPool 的剩余燃料现在是 **2000**
- 提交第二笔交易，燃料字段设置为 **6000**
- 由于区块燃料限制低于交易燃料，因此这笔**交易**就会被废弃
    - 它将无法配置在区块中
- 第一个区块已写入
- ...


![TxPool 错误情况 #2](/img/edge/txpool-error-2.png)

> 每当您收到以下错误时，都会发生这种情况：
> ```shell
> 2021-11-04T15:41:07.665+0100 [ERROR] polygon.consensus.dev: failed to write transaction: transaction's gas limit exceeds block gas limit
> ```

## 区块燃料目标 {#block-gas-target}

在某些情况下，节点希望将区块燃料限制保持在运行链上的某个目标以下或某个特定目标。

NODE 运算符可以将燃料限制设置在特定 NODE 上，这将尝试将此限制应用到新创建的区块中。如果大多数其他节点也设置了类似（或相同）的目标燃料限制，则区块燃料限制将始终徘徊在该区块燃料目标周围，随着新区块的创建，缓慢地向它前进（最大`1/1024 * parent block gas limit`）。

### 示例 {#example-scenario}

* NODE 运算符将单个节点的区块燃料限制设置为 `5000`
* 除了被配置为`7000`的单个节点之外，其他节点也被配置为`5000`
* 当将燃料目标设置为`5000`的节点成为提案者时，他们将检查燃料限制是否已达到目标
* 如果燃料限制不在目标处(大于或小于)，则提案者节点将在目标方向上将区块燃料目标设置为最多(1/1024 *父燃料限制)
   1. `parentGasLimit = 4500`示例： `blockGasTarget = 5000`和，提案者将区块的燃料限制计算为  `4504.39453125`(`4500/1024 + 4500`)
   2. `parentGasLimit = 5500`示例： `blockGasTarget = 5000`和，提案者将区块的燃料限制计算为  `5494.62890625`(`5500 - 5500/1024`)
* 这可确保链中的燃料限制将保持在目标上，因为将目标配置为`7000`的单一提案者无法推进限制程度，而且将其设置为`5000`的大多数节点将始终尝试将其保留在那里