---
id: blockchain
title: 区块链
description: Polygon Edge 的区块链和状态模块解释。
keywords:
  - docs
  - polygon
  - edge
  - architecture
  - module
  - blockchain
  - state
---

## 概述 {#overview}

Polygon Edge 的主模块之一是**区块链**和**状态**。<br />

**区块链**是解决区块重组的动力。这就意味当新区块包括在区块链中时，它可以解决处理所有出现的逻辑。

**状态**代表了*状态转移*对象。它处理了包含新区块时状态的更改。<br />除此之外，**状态**还会处理：
* 执行交易
* 执行 EVM
* 更改 Merkle 尝试次数
* 更多内容详见相应的**状态**节 🙂

关键是这两部分紧密相关，它们紧密合作，以便客户使用各项功能。<br />例如，当**区块链**层收到新区块（未出现重组），**状态**就需要进行状态转换。

**区块链**也处理某些和共识相关的部分（例如，*ethHash 是否正确？*、*PoW 是否正确？*）。<br />总而言之，**它是包含所有区块的主要逻辑核心**


## *WriteBlocks*

与**区块链**层相关的最重要的部分之一是* WriteBlocks *方法：

````go title="blockchain/blockchain.go"
// WriteBlocks writes a batch of blocks
func (b *Blockchain) WriteBlocks(blocks []*types.Block) error {
	if len(blocks) == 0 {
		return fmt.Errorf("no headers found to insert")
	}

	parent, ok := b.readHeader(blocks[0].ParentHash())
	if !ok {
		return fmt.Errorf("parent of %s (%d) not found: %s", blocks[0].Hash().String(), blocks[0].Number(), blocks[0].ParentHash())
	}

	// validate chain
	for i := 0; i < len(blocks); i++ {
		block := blocks[i]

		if block.Number()-1 != parent.Number {
			return fmt.Errorf("number sequence not correct at %d, %d and %d", i, block.Number(), parent.Number)
		}
		if block.ParentHash() != parent.Hash {
			return fmt.Errorf("parent hash not correct")
		}
		if err := b.consensus.VerifyHeader(parent, block.Header, false, true); err != nil {
			return fmt.Errorf("failed to verify the header: %v", err)
		}

		// verify body data
		if hash := buildroot.CalculateUncleRoot(block.Uncles); hash != block.Header.Sha3Uncles {
			return fmt.Errorf("uncle root hash mismatch: have %s, want %s", hash, block.Header.Sha3Uncles)
		}
		
		if hash := buildroot.CalculateTransactionsRoot(block.Transactions); hash != block.Header.TxRoot {
			return fmt.Errorf("transaction root hash mismatch: have %s, want %s", hash, block.Header.TxRoot)
		}
		parent = block.Header
	}

	// Write chain
	for indx, block := range blocks {
		header := block.Header

		body := block.Body()
		if err := b.db.WriteBody(header.Hash, block.Body()); err != nil {
			return err
		}
		b.bodiesCache.Add(header.Hash, body)

		// Verify uncles. It requires to have the bodies on memory
		if err := b.VerifyUncles(block); err != nil {
			return err
		}
		// Process and validate the block
		if err := b.processBlock(blocks[indx]); err != nil {
			return err
		}

		// Write the header to the chain
		evnt := &Event{}
		if err := b.writeHeaderImpl(evnt, header); err != nil {
			return err
		}
		b.dispatchEvent(evnt)

		// Update the average gas price
		b.UpdateGasPriceAvg(new(big.Int).SetUint64(header.GasUsed))
	}

	return nil
}
````
*WriteBlocks *方法是将区块写入区块链的切入点。作为参数，它需要一系列的区块。<br />首先，区块已验证。之后，它们会写入链。

实际的*状态转换*是通过在 *WriteBlocks* 中调用 *processBlock* 方式执行。

值得一提的是，由于它是区块写入区块链的切入点，其他模块（例如**封装模块**）会利用该方法。

## 区块链订阅 {#blockchain-subscriptions}

需要有监控区块链相关更改的方式。<br />所以才会有**订阅**。

订阅是一种利用区块链事件流并立即接收有效数据的方式。

````go title="blockchain/subscription.go"
type Subscription interface {
    // Returns a Blockchain Event channel
	GetEventCh() chan *Event
	
	// Returns the latest event (blocking)
	GetEvent() *Event
	
	// Closes the subscription
	Close()
}
````

**区块链事件**包含与实际链相关更改的信息。这包括重组和新区块。

````go title="blockchain/subscription.go"
type Event struct {
	// Old chain removed if there was a reorg
	OldChain []*types.Header

	// New part of the chain (or a fork)
	NewChain []*types.Header

	// Difficulty is the new difficulty created with this event
	Difficulty *big.Int

	// Type is the type of event
	Type EventType

	// Source is the source that generated the blocks for the event
	// right now it can be either the Sealer or the Syncer. TODO
	Source string
}
````

:::tip 更新者
您是否记得在[ CLI 指令](/docs/edge/get-started/cli-commands)中我们提及了***监控***指令？

区块链事件是 Polygon Edge 中发生的初始事件，它们之后会被已映射为协议缓冲消息格式，以便交易。
:::