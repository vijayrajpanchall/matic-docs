---
id: consensus
title: 共识
description: 解释 Polygon Edge 的共识模块。
keywords:
  - docs
  - polygon
  - edge
  - architecture
  - module
  - consensus
  - ibft
---

## 概述 {#overview}

**共识**模块提供共识机制的界面。

目前，有以下共识引擎可用：
* **IBFT PoA**
* **IBFT PoS**

Polygon Edge 想要维持模块性和可插入性的状态。<br />
所以核心的共识逻辑是抽象的，新的共识机制可建立在上方，且无需在使用性和便利性上妥协。

## 共识界面 {#consensus-interface}

````go title="consensus/consensus.go"
// Consensus is the interface for consensus
type Consensus interface {
	// VerifyHeader verifies the header is correct
	VerifyHeader(parent, header *types.Header) error

	// Start starts the consensus
	Start() error

	// Close closes the connection
	Close() error
}
````

***共识***界面是所述抽象内容的核心<br />。
* **VerifyHeader** 方式代表了帮助功能，其中共识层暴露给**区块链**层用于处理头部验证
* **开始**方式启动共识流程和与之相关的一切。包含同步、封装等所有需要进行的操作
* **关闭**方式关闭共识连接

## 共识配置 {#consensus-configuration}

````go title="consensus/consensus.go"
// Config is the configuration for the consensus
type Config struct {
	// Logger to be used by the backend
	Logger *log.Logger

	// Params are the params of the chain and the consensus
	Params *chain.Params

	// Specific configuration parameters for the backend
	Config map[string]interface{}

	// Path for the consensus protocol to store information
	Path string
}
````

有时，您可能希望将自定义地址用于共识协议存储数据，或者可能您想要共识机制使用自定义密钥值地图。可以通过***配置***结构实现，当新的共识实例创建就会可读。

## IBFT {#ibft}

### ExtraData {#extradata}

除了其他的字段，区块链头部对象有一个字段是 **ExtraData**。

IBFT 使用额外的字段存储区块相关的操作信息，回答类似问题：
* “谁签署了这个区块？”
* “谁是该区块的验证者？”

IBFT 的额外字段定义如下：
````go title="consensus/ibft/extra.go"
type IstanbulExtra struct {
	Validators    []types.Address
	Seal          []byte
	CommittedSeal [][]byte
}
````

### 签署数据 {#signing-data}

为了 NODE 能在 IBFT 中签署名字，需要利用 *signHash* 方法：
````go title="consensus/ibft/sign.go"
func signHash(h *types.Header) ([]byte, error) {
	//hash := istambulHeaderHash(h)
	//return hash.Bytes(), nil

	h = h.Copy() // make a copy since we update the extra field

	arena := fastrlp.DefaultArenaPool.Get()
	defer fastrlp.DefaultArenaPool.Put(arena)

	// when hashign the block for signing we have to remove from
	// the extra field the seal and commitedseal items
	extra, err := getIbftExtra(h)
	if err != nil {
		return nil, err
	}
	putIbftExtraValidators(h, extra.Validators)

	vv := arena.NewArray()
	vv.Set(arena.NewBytes(h.ParentHash.Bytes()))
	vv.Set(arena.NewBytes(h.Sha3Uncles.Bytes()))
	vv.Set(arena.NewBytes(h.Miner.Bytes()))
	vv.Set(arena.NewBytes(h.StateRoot.Bytes()))
	vv.Set(arena.NewBytes(h.TxRoot.Bytes()))
	vv.Set(arena.NewBytes(h.ReceiptsRoot.Bytes()))
	vv.Set(arena.NewBytes(h.LogsBloom[:]))
	vv.Set(arena.NewUint(h.Difficulty))
	vv.Set(arena.NewUint(h.Number))
	vv.Set(arena.NewUint(h.GasLimit))
	vv.Set(arena.NewUint(h.GasUsed))
	vv.Set(arena.NewUint(h.Timestamp))
	vv.Set(arena.NewCopyBytes(h.ExtraData))

	buf := keccak.Keccak256Rlp(nil, vv)
	return buf, nil
}
````
另外一种比较常见的方法是 *VerifyCommittedFields* 方法，可验证封装由可靠的验证者操作：
````go title="consensus/ibft/sign.go
func verifyCommitedFields(snap *Snapshot, header *types.Header) error {
	extra, err := getIbftExtra(header)
	if err != nil {
		return err
	}
	if len(extra.CommittedSeal) == 0 {
		return fmt.Errorf("empty committed seals")
	}

	// get the message that needs to be signed
	signMsg, err := signHash(header)
	if err != nil {
		return err
	}
	signMsg = commitMsg(signMsg)

	visited := map[types.Address]struct{}{}
	for _, seal := range extra.CommittedSeal {
		addr, err := ecrecoverImpl(seal, signMsg)
		if err != nil {
			return err
		}

		if _, ok := visited[addr]; ok {
			return fmt.Errorf("repeated seal")
		} else {
			if !snap.Set.Includes(addr) {
				return fmt.Errorf("signed by non validator")
			}
			visited[addr] = struct{}{}
		}
	}

	validSeals := len(visited)
	if validSeals <= 2*snap.Set.MinFaultyNodes() {
		return fmt.Errorf("not enough seals to seal block")
	}
	return nil
}
````

### 快照 {#snapshots}

顾名思义，*快照*是提供在任意区块高度时系统的*快照*或状态。

快照包含一组是验证者的 NODE，以及投票信息（验证者可投票支持其他验证者）。验证者包含在**矿工**头部的文件中的投票信息，且更改** nonce** 的值：
* 如果 NODE 想要移除一个验证者，则 Nonce **都是 1 秒**
* 如果 NODE 想要添加一个验证者，则 Nonce **都是 0 秒**

快照使用 ***processHeaders*** 方法计算：

````go title="consensus/ibft/snapshot.go"
func (i *Ibft) processHeaders(headers []*types.Header) error {
	if len(headers) == 0 {
		return nil
	}

	parentSnap, err := i.getSnapshot(headers[0].Number - 1)
	if err != nil {
		return err
	}
	snap := parentSnap.Copy()

	saveSnap := func(h *types.Header) error {
		if snap.Equal(parentSnap) {
			return nil
		}

		snap.Number = h.Number
		snap.Hash = h.Hash.String()

		i.store.add(snap)

		parentSnap = snap
		snap = parentSnap.Copy()
		return nil
	}

	for _, h := range headers {
		number := h.Number

		validator, err := ecrecoverFromHeader(h)
		if err != nil {
			return err
		}
		if !snap.Set.Includes(validator) {
			return fmt.Errorf("unauthroized validator")
		}

		if number%i.epochSize == 0 {
			// during a checkpoint block, we reset the voles
			// and there cannot be any proposals
			snap.Votes = nil
			if err := saveSnap(h); err != nil {
				return err
			}

			// remove in-memory snaphots from two epochs before this one
			epoch := int(number/i.epochSize) - 2
			if epoch > 0 {
				purgeBlock := uint64(epoch) * i.epochSize
				i.store.deleteLower(purgeBlock)
			}
			continue
		}

		// if we have a miner address, this might be a vote
		if h.Miner == types.ZeroAddress {
			continue
		}

		// the nonce selects the action
		var authorize bool
		if h.Nonce == nonceAuthVote {
			authorize = true
		} else if h.Nonce == nonceDropVote {
			authorize = false
		} else {
			return fmt.Errorf("incorrect vote nonce")
		}

		// validate the vote
		if authorize {
			// we can only authorize if they are not on the validators list
			if snap.Set.Includes(h.Miner) {
				continue
			}
		} else {
			// we can only remove if they are part of the validators list
			if !snap.Set.Includes(h.Miner) {
				continue
			}
		}

		count := snap.Count(func(v *Vote) bool {
			return v.Validator == validator && v.Address == h.Miner
		})
		if count > 1 {
			// there can only be one vote per validator per address
			return fmt.Errorf("more than one proposal per validator per address found")
		}
		if count == 0 {
			// cast the new vote since there is no one yet
			snap.Votes = append(snap.Votes, &Vote{
				Validator: validator,
				Address:   h.Miner,
				Authorize: authorize,
			})
		}

		// check the tally for the proposed validator
		tally := snap.Count(func(v *Vote) bool {
			return v.Address == h.Miner
		})

		if tally > snap.Set.Len()/2 {
			if authorize {
				// add the proposal to the validator list
				snap.Set.Add(h.Miner)
			} else {
				// remove the proposal from the validators list
				snap.Set.Del(h.Miner)

				// remove any votes casted by the removed validator
				snap.RemoveVotes(func(v *Vote) bool {
					return v.Validator == h.Miner
				})
			}

			// remove all the votes that promoted this validator
			snap.RemoveVotes(func(v *Vote) bool {
				return v.Address == h.Miner
			})
		}

		if err := saveSnap(h); err != nil {
			return nil
		}
	}

	// update the metadata
	i.store.updateLastBlock(headers[len(headers)-1].Number)
	return nil
}
````

该方法通常调用 1 个头，但是即使是多个头，流程也是相同的<br />。每个通过的头部，IBFT 都需要验证提案者是验证者。可以轻松地通过获取最新快照和查看 NODE 是否处于验证者组。

下一步，检查 nonce。投票被包括在内并被统计 - 如果有足够的投票，则从验证者组
添加/删除 NODE，之后保存新快照。

#### 快照商店 {#snapshot-store}

快照服务管理更新一个叫做**快照商店**的实体，其中存储了所有可用快照的列表。使用时，该服务可以快速寻找到和区块高度相关的快照。
````go title="consensus/ibft/snapshot.go"
type snapshotStore struct {
	lastNumber uint64
	lock       sync.Mutex
	list       snapshotSortedList
}
````

### IBFT 启动 {#ibft-startup}

要开始 IBFT，Polygon Edge 首先需要设置 IBFT 传输：
````go title="consensus/ibft/ibft.go"
func (i *Ibft) setupTransport() error {
	// use a gossip protocol
	topic, err := i.network.NewTopic(ibftProto, &proto.MessageReq{})
	if err != nil {
		return err
	}

	err = topic.Subscribe(func(obj interface{}) {
		msg := obj.(*proto.MessageReq)

		if !i.isSealing() {
			// if we are not sealing we do not care about the messages
			// but we need to subscribe to propagate the messages
			return
		}

		// decode sender
		if err := validateMsg(msg); err != nil {
			i.logger.Error("failed to validate msg", "err", err)
			return
		}

		if msg.From == i.validatorKeyAddr.String() {
			// we are the sender, skip this message since we already
			// relay our own messages internally.
			return
		}
		i.pushMessage(msg)
	})
	if err != nil {
		return err
	}

	i.transport = &gossipTransport{topic: topic}
	return nil
}
````

基本上就是使用 IBFT 原型创建一个新的主题，使用新的原型 buff 消息。<br />该消息由验证者使用。Polygon Edge 可以订阅该主题并处理相应的消息。

#### MessageReq {#messagereq}

该消息由验证者交换：
````go title="consensus/ibft/proto/ibft.proto"
message MessageReq {
    // type is the type of the message
    Type type = 1;

    // from is the address of the sender
    string from = 2;

    // seal is the committed seal if message is commit
    string seal = 3;

    // signature is the crypto signature of the message
    string signature = 4;

    // view is the view assigned to the message
    View view = 5;

    // hash of the locked block
    string digest = 6;

    // proposal is the rlp encoded block in preprepare messages
    google.protobuf.Any proposal = 7;

    enum Type {
        Preprepare = 0;
        Prepare = 1;
        Commit = 2;
        RoundChange = 3;
    }
}

message View {
    uint64 round = 1;
    uint64 sequence = 2;
}
````

在 **MessageReq** 中的**查看**字段代表了链中当前 NODE 位置。有一个*圆形*和一个*序列*属性。
* **圆形**代表了高度的提案者回合
* **序列**则代表了区块链的高度

在 IBFT 实施中的 *msgQueue* 可存储消息申请。订购消息的方式是*查看*（先查看序列、然后看圆形）。IBFT 实施也代表了系统中不同状态的不同队列。

### IBFT 状态 {#ibft-states}

使用**开始**方法创建共识机制后，就会运行至无线的循环中，模拟状态机器：
````go title="consensus/ibft/ibft.go"
func (i *Ibft) start() {
	// consensus always starts in SyncState mode in case it needs
	// to sync with other nodes.
	i.setState(SyncState)

	header := i.blockchain.Header()
	i.logger.Debug("current sequence", "sequence", header.Number+1)

	for {
		select {
		case <-i.closeCh:
			return
		default:
		}

		i.runCycle()
	}
}

func (i *Ibft) runCycle() {
	if i.state.view != nil {
		i.logger.Debug(
		    "cycle",
		    "state",
		    i.getState(),
		    "sequence",
		    i.state.view.Sequence,
		    "round",
		    i.state.view.Round,
	    )
	}

	switch i.getState() {
	case AcceptState:
		i.runAcceptState()

	case ValidateState:
		i.runValidateState()

	case RoundChangeState:
		i.runRoundChangeState()

	case SyncState:
		i.runSyncState()
	}
}
````

#### SyncState {#syncstate}

所有 NODE 初始时都是**同步**状态。

因为刷新数据需要从区块链才能获取。客户需要查看它是否是验证者，查看当前快照。该状态解决所有待决区块。

同步完成后，客户端认可它确实是验证者，然后就需要转至 **AcceptState**。如果客户**不是**验证者，则会持续同步，并保持在 **SyncState**

#### AcceptState {#acceptstate}

**接受**状态通常查看快照验证者组。如果当前 NODE 不包含在验证者组中，则移回**同步**状态。

另一方面，如果 NODE** 是**验证者，则计算提案者。如果当前 NODE 是提案者，则建立一个区块，发送预先预备的信息，然后发送预备消息。

* 预先预备的信息 - 提案者发送给验证者的消息，让他们知道提案
* 预备信息 - 验证者同意提案的消息。所有节点获得所有预备消息
* 执行信息 - 包含用于提案的执行消息

<br />如果当前节点**不是**验证者，它就会使用 *getNextMessage* 方式阅读之前队伍中的消息。等待预备消息。等确认所有消息后，NODE 移动至**验证**状态。

#### 验证状态 {#validatestate}

**验证**状态非常简单 - 所有在该状态中的 NODE 都阅读消息并将它们添加至本地快照状态。
