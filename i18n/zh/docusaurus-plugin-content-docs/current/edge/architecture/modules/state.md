---
id: state
title: 状态
description: 对 Polygon Edge 的状态模块的解释。
keywords:
  - docs
  - polygon
  - edge
  - architecture
  - module
  - state
  - trie
---

要真正了解**状态**运作方式，您必须了解一些以太坊的基本概念。<br />

我们强烈建议阅读**[以太坊指南中的状态](https://ethereum.github.io/execution-specs/autoapi/ethereum/frontier/state/index.html)**。

## 概述 {#overview}

既然我们熟悉了以太坊的基本概念，接下来的概述应该很容易了。

我们提到，**世界状态试行**有存在的所有以太坊账户<br />。这些账户是 Merkle 试行中的叶子。每片叶子都拥有已编码**账户状态**信息。

这使 Polygon Edge 能在特定时刻获得特定 Merkle 试行。<br />例如，我们可以在区块 10 中获得状态的哈希。

Merkle 试行在任何时间点都被称为***快照***。

我们可以有**状态试行**或**存储试行**的***快照***-它们基本上相同。<br />唯一的区别是叶子代表什么：

* 对于存储试行，叶子包含我们不能处理或不知道里面有什么的任意状态
* 对于状态尝试，叶子代表账户

````go title="state/state.go
type State interface {
    // Gets a snapshot for a specific hash
	NewSnapshotAt(types.Hash) (Snapshot, error)

	// Gets the latest snapshot
	NewSnapshot() Snapshot

	// Gets the codeHash
	GetCode(hash types.Hash) ([]byte, bool)
}
````

**快照**接口定义如下：

````go title="state/state.go
type Snapshot interface {
    // Gets a specific value for a leaf
	Get(k []byte) ([]byte, bool)

	// Commits new information
	Commit(objs []*Object) (Snapshot, []byte)
}
````

*对象结构*定义可以实施的信息：

````go title="state/state.go
// Object is the serialization of the radix object
type Object struct {
	Address  types.Address
	CodeHash types.Hash
	Balance  *big.Int
	Root     types.Hash
	Nonce    uint64
	Deleted  bool

	DirtyCode bool
	Code      []byte

	Storage []*StorageObject
}
````

Merkle 试行的实施在 *state/immutable-trie* 文件夹中<br/>。*state/immutable-trie/state.go* 实现**状态**接口。

*state/immutable-trie/trie.go* 是主 Merkle 试行对象。它代表 Merkle 试行的优化版本，它尽可能重新使用内存。

## 执行者 {#executor}

*state/executor.go* 包括 Polygon Edge 决定区块如何更改当前状态所需的所有信息。*ProcessBlock* 的实施位于此处。

*应用*方法执行状态的实际过渡。执行者调用 EVM。

````go title="state/executor.go"
func (t *Transition) apply(msg *types.Transaction) ([]byte, uint64, bool, error) {
	// check if there is enough gas in the pool
	if err := t.subGasPool(msg.Gas); err != nil {
		return nil, 0, false, err
	}

	txn := t.state
	s := txn.Snapshot()

	gas, err := t.preCheck(msg)
	if err != nil {
		return nil, 0, false, err
	}
	if gas > msg.Gas {
		return nil, 0, false, errorVMOutOfGas
	}

	gasPrice := new(big.Int).SetBytes(msg.GetGasPrice())
	value := new(big.Int).SetBytes(msg.Value)

	// Set the specific transaction fields in the context
	t.ctx.GasPrice = types.BytesToHash(msg.GetGasPrice())
	t.ctx.Origin = msg.From

	var subErr error
	var gasLeft uint64
	var returnValue []byte

	if msg.IsContractCreation() {
		_, gasLeft, subErr = t.Create2(msg.From, msg.Input, value, gas)
	} else {
		txn.IncrNonce(msg.From)
		returnValue, gasLeft, subErr = t.Call2(msg.From, *msg.To, msg.Input, value, gas)
	}

	if subErr != nil {
		if subErr == runtime.ErrNotEnoughFunds {
			txn.RevertToSnapshot(s)
			return nil, 0, false, subErr
		}
	}

	gasUsed := msg.Gas - gasLeft
	refund := gasUsed / 2
	if refund > txn.GetRefund() {
		refund = txn.GetRefund()
	}

	gasLeft += refund
	gasUsed -= refund

	// refund the sender
	remaining := new(big.Int).Mul(new(big.Int).SetUint64(gasLeft), gasPrice)
	txn.AddBalance(msg.From, remaining)

	// pay the coinbase
	coinbaseFee := new(big.Int).Mul(new(big.Int).SetUint64(gasUsed), gasPrice)
	txn.AddBalance(t.ctx.Coinbase, coinbaseFee)

	// return gas to the pool
	t.addGasPool(gasLeft)

	return returnValue, gasUsed, subErr != nil, nil
}
````

## 运行时间 {#runtime}

执行状态过渡时，执行状态过渡主模块是 EVM（位于state/runtime/evm 中)。

**调度表**在 **Opcode** 和指示之间进行匹配。

````go title="state/runtime/evm/dispatch_table.go"
func init() {
	// unsigned arithmetic operations
	register(STOP, handler{opStop, 0, 0})
	register(ADD, handler{opAdd, 2, 3})
	register(SUB, handler{opSub, 2, 3})
	register(MUL, handler{opMul, 2, 5})
	register(DIV, handler{opDiv, 2, 5})
	register(SDIV, handler{opSDiv, 2, 5})
	register(MOD, handler{opMod, 2, 5})
	register(SMOD, handler{opSMod, 2, 5})
	register(EXP, handler{opExp, 2, 10})

	...

	// jumps
	register(JUMP, handler{opJump, 1, 8})
	register(JUMPI, handler{opJumpi, 2, 10})
	register(JUMPDEST, handler{opJumpDest, 0, 1})
}
````

赋予 EVM 权力的核心逻辑是*运行*循环。<br />

这是 EVM 的主入口点。它执行循环并检查当前的 Opcode，获取指示、检查如果可以执行，则消耗燃料并执行指示，直到指示失败或停止。

````go title="state/runtime/evm/state.go"

// Run executes the virtual machine
func (c *state) Run() ([]byte, error) {
	var vmerr error

	codeSize := len(c.code)

	for !c.stop {
		if c.ip >= codeSize {
			c.halt()
			break
		}

		op := OpCode(c.code[c.ip])

		inst := dispatchTable[op]

		if inst.inst == nil {
			c.exit(errOpCodeNotFound)
			break
		}

		// check if the depth of the stack is enough for the instruction
		if c.sp < inst.stack {
			c.exit(errStackUnderflow)
			break
		}

		// consume the gas of the instruction
		if !c.consumeGas(inst.gas) {
			c.exit(errOutOfGas)
			break
		}

		// execute the instruction
		inst.inst(c)

		// check if stack size exceeds the max size
		if c.sp > stackSize {
			c.exit(errStackOverflow)
			break
		}

		c.ip++
	}

	if err := c.err; err != nil {
		vmerr = err
	}

	return c.ret, vmerr
}
````
