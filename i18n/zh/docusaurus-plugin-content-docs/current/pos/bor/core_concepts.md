---
id: core_concepts
title: 核心概念
description: Bor 是在 Polygon 架构中，状态链
keywords:
  - docs
  - matic
  - Core Concepts
  - polygon
  - state chain
  - architecture
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# 核心概念 {#core-concepts}

Bor 是 Polygon 架构中的状态链。它是 Geth [https://github.com/ethereum/go-ethereum](https://github.com/ethereum/go-ethereum) 的一个分支，具有新的共识，称为 Bor。

来源：[https://github.com/maticnetwor/bor](https://github.com/maticnetwork/bor)

## 共识 {#consensus}

Bor 使用经过改进的新共识，激发于 [Cluce 共识](https://eips.ethereum.org/EIPS/eip-225)

关于共识和规格的更多详细信息：[Bor](https://www.notion.so/Bor-Consensus-5e52461f01ef4291bc1caad9ab8419c5) 共识

## genesis {#genesis}

创世区块包含网络配置的所有基本信息。基本上是 Bor 链的配置文件。要启动 Bor 链，用户需要将文件的位置当作参数传入。

Bor 把 `genesis.json` 当作创世区块和参数。 以下是 Bor 基因的例子`config`：

```json
"config": {
    "chainId": 15001,
    "homesteadBlock": 1,
    "eip150Block": 0,
    "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "bor": {
      "period": 1,
      "producerDelay": 4,
      "sprint": 64,
      "validatorContract": "0x0000000000000000000000000000000000001000",
      "stateReceiverContract": "0x0000000000000000000000000000000000001001"
    }
  }
```

[配置](https://www.notion.so/15ab7eb6e8124142a3641939762d6d67)

[共识具体配置](https://www.notion.so/17a8a10c3bd44b8caf34432c057e401c)

## EVM/Solidity 当作虚拟机 {#evm-solidity-as-vm}

Bor 把未经修改的 EVM 当作交易的虚拟机。开发人员可以使用相同的以太坊工具和编译器（如 `solc`），部署任意合约，而无需更改。

## Matic 当作原生代币（gas 代币） {#matic-as-native-token-gas-token}

Bor 的原生代币是 Matic 代币，类似于以太坊的以太币。通常称为 gas 代币。此代币工作正常，如同以太坊链上的以太币一样。

除此之外，Bor 为原生代币提供了一个内置的包装 ERC20 代币（类似于 WETH 代币），这意味着应用程序可以使用包装的 MATIC ERC20 代币，而无需创建自己包装 ERC20 版本的 Matic 原生代币。

包装的 ERC20 代币当作 `[MRC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MRC20.sol)` 部署在 BOR 的 `0000000000000000000000000000000000001010` 上，成为其中一个创世合约。

### 费用 {#fees}

在 Bor 上发送交易时，使用原生代币付费。这可以阻止 Bor 上的垃圾邮件，并为区块生产者提供激励，使其在更长的时间内运行链，并阻止不良行为。

一个交易发送者定义每项交易的 `GasLimit` 和 `GasPrice`，并在 Bor 上广播。每个生产者在启动 Bor 节点时，可以使用 `--gas-price` 定义他们可以接受的最低 gas 价格。如果交易中用户定义的 `GasPrice` 与生产者定义的 gas 价格相同或更高，生产者将接受该交易并将其纳入下一个可用区块。这使得每个生产者都能满足自己的最低 gas 价格要求。

交易费用将以原生代币的形式从发送者的账户中扣除。

交易费用的计算公式如下：

```go
Tx.Fee = Tx.GasUsed * Tx.GasPrice
```

一个区块内所有交易收取的费用均通过 coinbase 转账，转移至生产者账户。质押权越多，成为生产者的概率就越高，因而质押权高的验证者能够相应领取更多奖励（以费用的形式）。

### 转账收据日志记录 {#transfer-receipt-logs}

Bor 上每个 Plasma 兼容的 ERC20 代币都增加了一个特殊的转账收据日志记录。Matic 代币也不例外。

`LogTransfer` 是一个特殊日志记录，添加到所有与 plasma 兼容的 ERC20/721 代币中。 它可以看做是一个用于转账的 2 进 2 出 UTXO。 在此处，`output1 = input1 - amount` 和 `output2 = input2 + amount` 允许以太坊链上的 plasma 防欺诈合约验证 Matic ERC20 代币（此处是原生代币）的转账。

```jsx
/**
 * @param token    ERC20 token address
 * @param from     Sender address
 * @param to       Recipient address
 * @param amount   Transferred amount
 * @param input1   Sender's amount before the transfer is executed
 * @param input2   Recipient's amount before the transfer is executed
 * @param output1  Sender's amount after the transfer is executed
 * @param output2  Recipient's amount after the transfer is executed
 */
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amount,
    uint256 input1,
    uint256 input2,
    uint256 output1,
    uint256 output2
);
```

由于MATIC 代币是原生代代币，没有原生 ERC20 代币，因此Bor 使用遵循 Golang 代码为本地代币的每次转账增加收据日志。来源：[https://github.com/maticnet/bor/blob/depert/core/state_truction.go#L241-L252](https://github.com/maticnetwork/bor/blob/develop/core/state_transition.go#L241-L252)

```go
// addTransferLog adds transfer log into state
func addTransferLog(
	state vm.StateDB,
	eventSig common.Hash,

	sender,
	recipient common.Address,

	amount,
	input1,
	input2,
	output1,
	output2 *big.Int,
) {
	// ignore if amount is 0
	if amount.Cmp(bigZero) <= 0 {
		return
	}

	dataInputs := []*big.Int{
		amount,
		input1,
		input2,
		output1,
		output2,
	}

	var data []byte
	for _, v := range dataInputs {
		data = append(data, common.LeftPadBytes(v.Bytes(), 32)...)
	}

	// add transfer log
	state.AddLog(&types.Log{
		Address: feeAddress,
		Topics: []common.Hash{
			eventSig,
			feeAddress.Hash(),
			sender.Hash(),
			recipient.Hash(),
		},
		Data: data,
	})
}
```

### 存入原生代币 {#deposit-native-token}

用户在以太坊主链将 Matic 代币存入`DepositManager`合约（部署在以太坊链上），便可获得原生代币。来源：[https://github.com/maticnet/contracts/blob/depert/contracts/root/depitManager/SepitManager.sol#L68](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/depositManager/DepositManager.sol#L68)

```jsx
/**
 * Moves ERC20 tokens from Ethereum chain to Bor.
 * Allowance for the `_amount` tokens to DepositManager is needed before calling this function.
 * @param _token   Ethereum ERC20 token address which needs to be deposited
 * @param _amount  Transferred amount
 */
function depositERC20(address _token, uint256 _amount) external;
```

用户可以使用 `depositERC20` 代币，将 Matic ERC20 代币（原生代币）或其他 ERC20 代币从以太坊链转移到 Bor 链。

### 提取原生代币 {#withdraw-native-token}

从 Bor 链提取到以太坊链的方式与其他 ERC20 代币完全相同。用户可以调用 Bor 上 ERC20 合约 (`0000000000000000000000000000000000001010`) 的 `withdraw` 功能，启动提取过程。来源：[https://github.com/maticnet/contract/blob/depert/contract/child/MaticChildERC20.sol#L47-L61](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol#L47-L61)

```jsx
/**
 * Withdraw tokens from Bor chain to Ethereum chain
 * @param amount     Withdraw amount
 */
function withdraw(uint256 amount) public payable;
```

## 内置合约（创世合约） {#in-built-contracts-genesis-contracts}

Bor 从三个内置合约开始，这三个合约通常称为创世合约。这些合约位于区块 0。来源：[https://github.com/maticnetwork/genesis-contracts](https://github.com/maticnetwork/genesis-contracts)

这些合约使用 `solc --bin-runtime` 来编译。例如，以下命令发出了 `contract.sol` 的编译代码。

```bash
solc --bin-runtime contract.sol
```

创世合约定义见于 `genesis.json`。当 Bor 从区块 0 开始运行时，它使用所述代码和余额加载所有合约。

```json
"0x0000000000000000000000000000000000001010": {
	"balance": "0x0",
	"code" : "0x..."
}
```

以下是每个基因组合合约的详细信息。

### Bor 验证者集合 {#bor-validator-set}

来源：[https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/BorValidatorSet.sol)

部署于：`0x0000000000000000000000000000000000001000`

`BorValidatorSet.sol` 合约管理跨度的验证者集合。将当前验证者集合和跨度信息放入合约中，让其他合约可以使用该信息。由于 Bor 使用来自 Heimdall（外部来源）的生产者，因此使用系统调用来改变合约状态。

对于首个冲刺，所有生产者都直接在 `BorValidatorSet.sol` 中定义。

在设置第二个跨度时调用 `setInitialValidators`。由于 Bor 不支持创世合约的构造函数，所以需要将第一个验证者集合设置为 `spans` 映射。

首个跨度详情如下：

```jsx
firstSpan = {
  number: 0,
	startBlock: 0,
	endBlock: 255
}
```

Solidity 合约定义：

```jsx
contract BorValidatorSet {
  // Current sprint value
  uint256 public sprint = 64;

  // Validator details
  struct Validator {
    uint256 id;
    uint256 power;
    address signer;
  }

  // Span details
  struct Span {
    uint256 number;
    uint256 startBlock;
    uint256 endBlock;
  }

  // set of all validators
  mapping(uint256 => Validator[]) public validators;

  // set of all producers
  mapping(uint256 => Validator[]) public producers;

  mapping (uint256 => Span) public spans; // span number => span
  uint256[] public spanNumbers; // recent span numbers

	/// Initializes initial validators to spans mapping since there is no way to initialize through constructor for genesis contract
	function setInitialValidators() internal

	/// Get current validator set (last enacted or initial if no changes ever made) with a current stake.
	function getInitialValidators() public view returns (address[] memory, uint256[] memory;

  /// Returns bor validator set at given block number
  function getBorValidators(uint256 number) public view returns (address[] memory, uint256[] memory);

  /// Proposes new span in case of force-ful span change
  function proposeSpan() external;

  /// Commits span (called through system call)
  function commitSpan(
    uint256 newSpan,
    uint256 startBlock,
    uint256 endBlock,
    bytes calldata validatorBytes,
    bytes calldata producerBytes
  ) external onlySystem;

  /// Returns current span number based on current block number
  function currentSpanNumber() public view returns (uint256);
}
```

任一有效验证者都可以免费调用 `proposeSpan`。Bor 允许 `proposeSpan` 交易为免费交易，因为它是系统的一部分。

正在通过[系统调用](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9)调用 `commitSpan`。

### 状态接受者 {#state-receiver}

来源：[https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReciver.sol](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol)

部署于：`0x0000000000000000000000000000000000001001`

状态接受者合约管理传入的状态同步记录。`state-sync` 机制基本上是一种将状态数据从以太坊链转移到 Bor 的方式。

```jsx
contract StateReceiver {
  // proposed states
  IterableMapping.Map private proposedStates;

  // states and proposed states
  mapping(uint256 => bool) public states;

   /**
	 * Proposes new state from Ethereum chain
	 * @param stateId  State-id for new state
	 */
  function proposeState(
    uint256 stateId
  ) external;

	/**
	 * Commits new state through the system call
	 * @param recordBytes   RLP encoded record: {stateId, contractAddress, data}
	 */
  function commitState(
    bytes calldata recordBytes
  ) external onlySystem;

  // Get pending state ids
  function getPendingStates() public view returns (uint256[] memory);
}
```

任一有效验证者都可以免费调用 `proposeState`。Bor 允许 `proposeState` 交易为免费交易，因为它是系统的一部分。

正在通过[系统调用](https://www.notion.so/maticnetwork/Overview-c8bdb110cd4d4090a7e1589ac1006bab#bba582b9e9c441d983aeec851b9421f9)调用 `commitState`。

### Matic ERC20 代币 {#matic-erc20-token}

来源：[https://github.com/maticnetwork/contracts/blob/depert/contract/child/MaticChildERC20.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/child/MaticChildERC20.sol)

部署于：`0x0000000000000000000000000000000000001010`

这是一种特殊合约，它包装本生硬币（如以太阳会中的 $ETH），提供 ERC20 代币接口。例如：`transfer`在这个合约上，使用者在 ERC20 代币中转换本生代币。`withdraw`方法允许用户将代币从 Bor 转到以太机链。

注意：此合约不支持 `allowance`。每个兼容的 Plasma ERC20 代币合约都相同。

```jsx
contract MaticChildERC20 is BaseERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);

  uint256 public currentSupply;
  uint8 private constant DECIMALS = 18;

  constructor() public {}

  // Initializes state since genesis contract doesn't support constructor
  function initialize(address _childChain, address _token) public;

  /**
   * Deposit tokens to the user account
   * This deposit is only made through state receiver address
   * @param user   Deposit address
   * @param amount Withdraw amount
   */
  function deposit(address user, uint256 amount) public onlyOwner;

  /**
   * Withdraw amount to Ethereum chain
   * @param amount Withdraw amount
   */
  function withdraw(uint256 amount) public payable;

  function name() public pure returns (string memory) {
      return "Matic Token";
  }

  function symbol() public pure returns (string memory) {
      return "MATIC";
  }

  function decimals() public pure returns (uint8) {
      return DECIMALS;
  }

  /**
   * Total supply for the token.
   * This is 10b tokens, same as total Matic supply on Ethereum chain
   */
  function totalSupply() public view returns (uint256) {
      return 10000000000 * 10**uint256(DECIMALS);
  }

  /**
   * Balance of particular account
   * @param account Target address
   */
  function balanceOf(address account) public view returns (uint256) {
      return account.balance;
  }

  /**
   *  Function that is called when a user or another contract wants to transfer funds
   *  @param to Address of token receiver
   *  @param value Number of tokens to transfer
   *  @return Returns success of function call
   */
  function transfer(address to, uint256 value) public payable returns (bool) {
    if (msg.value != value) {
		  return false;
    }
    return _transferFrom(msg.sender, to, value);
  }

  /**
   * This enables to transfer native token between users
   * while keeping the interface the same as that of an ERC20 Token
   * @param _transfer is invoked by _transferFrom method that is inherited from BaseERC20
   */
  function _transfer(address sender, address recipient, uint256 amount) internal {
    address(uint160(recipient)).transfer(amount);
    emit Transfer(sender, recipient, amount);
  }
}
```

## 系统调用
 {#system-call}

只有系统地址 `2^160-2` 允许执行系统调用。Bor 在内部利用系统地址 `msg.sender` 来调用。它改变了合约状态，并更新了特定区块的状态根。灵感来自 [https://github.com/ethereum/EIPs/blob/master/EIPs/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) 和 [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

系统调用有助于在无需做交易的情况下更改合约状态。

局限：目前，由系统调用发出的事件不可观察，也不包含在交易或区块中。

## 跨度管理 {#span-management}

跨度是一个逻辑上定义的区块集合，对于该集合，从所有可用的验证者中选择一组验证者。Heimdall 将从所有验证者中选择生产者委员会。根据系统中验证者的数量，生产者将包括一个验证者子集合。

<img src={useBaseUrl("img/Bor/span-management.svg")} />

### 提议空间交易 {#propose-span-transaction}

类型：**Heimdall 交易**

来源：[https://github.com/maticnetwork/heimdall/blob/develop/dread/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

在交易成功纳入的情况下，`spanProposeTx` 为给定 `span` 设置验证者委员会。每个跨度一笔交易必须包括在 Heimdall 中。在 Heimdall 上称为 `spanProposeTx`。如果频繁发送该交易或在当前委员会内发生不少于 33% 的权益变化（对于给定 `span`），则必须恢复 `spanProposeTx`。

Heimdall 上的 `bor` 模块处理跨度管理。Bor 如何从所有验证者中选择生产者，如下所示：

1. Bor 根据验证者的权力，创建多个槽位。例如：权力为 10 的 A 将有 10 个槽位，权力为 20 的 B 将有 20 个槽位。
2. `shuffle` 使用 `seed` 打乱所有槽位，然后选择头 `producerCount` 个生产者。Heimdall 上的 `bor` 模块使用 ETH2.0 混洗算法，从所有验证者中选择生产者。每个跨度 `n` 把以太坊 (ETH 1.0) 区块 `n` 的区块哈希值当作 `seed`。请注意，基于槽位做出选择，因此根据权力大小选择验证者。验证者权力越大，当选的概率越高。来源：[https://github.com/maticnetwork/heimdall/blob/depert/bor/sell.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

```go
// SelectNextProducers selects producers for the next span by converting power to slots
// spanEligibleVals - all validators eligible for next span
func SelectNextProducers(blkHash common.Hash, spanEligibleVals []hmTypes.Validator, producerCount uint64) (selectedIDs []uint64, err error) {
	if len(spanEligibleVals) <= int(producerCount) {
		for _, val := range spanEligibleVals {
			selectedIDs = append(selectedIDs, uint64(val.ID))
		}
		return
	}

	// extract seed from hash
	seed := helper.ToBytes32(blkHash.Bytes()[:32])
	validatorIndices := convertToSlots(spanEligibleVals)
	selectedIDs, err = ShuffleList(validatorIndices, seed)
	if err != nil {
		return
	}
	return selectedIDs[:producerCount], nil
}

// converts validator power to slots
func convertToSlots(vals []hmTypes.Validator) (validatorIndices []uint64) {
	for _, val := range vals {
		for val.VotingPower >= types.SlotCost {
			validatorIndices = append(validatorIndices, uint64(val.ID))
			val.VotingPower = val.VotingPower - types.SlotCost
		}
	}
	return validatorIndices
}
```

### 提交跨度交易 {#commit-span-tx}

类型：**Bor 交易**

在 Bor 中，提交跨度有两种方式。

1. **自动跨度更改**

在当前跨度结束时，在最后一个冲刺的最后一个区块，Bor 从 Heimdall 查询下一个跨度，并使用系统调用设置下一个跨度的验证者和生产者。

    ```jsx
    function commitSpan(
        bytes newSpan,
        address proposer,
        uint256 startBlock,
        uint256 endBlock,
        bytes validatorBytes,
        bytes producerBytes
     ) public onlySystem;
    ```

Bor 将新的生产者当作下一个区块的生产者。

2. **强制提交**

在 Heimdall 上提议了 `span` 后，如果在当前跨度结束之前需要改变跨度，验证者可以强制推动跨度。提议 `span` 的交易必须由任一验证者提交给 Bor。然后在当前冲刺结束时，Bor 使用系统调用更新并提交拟议的跨度。


## 状态管理（状态同步） {#state-management-state-sync}

状态管理将状态从以太坊链发送到 Bor 链。即称为 `state-sync`。这是一种将数据从以太坊链转移到 Bor 链的方式。

<img src={useBaseUrl("img/Bor/state-managment.svg")} />

### 状态发送者 {#state-sender}

来源：[https://github.com/maticnetwork/contracts/blob/depert/contract/root/stateSyncer/SateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

若要同步状态，请在以太链上调用以下方法**状态发送者合约**。`state-sync` 机制基本上是一种将状态数据从以太坊链转移到 Bor 的方式。

用户想从以太坊链上的合约转移 `data` 到 Bor 链上，可以调用 `StateSender.sol` 中的 `syncSate` 方法

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

`receiver` 合约必须存在于子链上，流程完成后，便会收到状态 `data`。在以太坊上 `syncState` 发出 `StateSynced` 事件，内容如下：

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

以太坊链上的 `stateSender` 合约发出 `StateSynced` 事件后，验证者都会在 Heimdall 上发送 `MsgEventRecord` 交易。

在 Heimdall 上确认交易后，验证者在 Bor 上用简单交易提议 `proposeState`，在冲刺结束时，Bor 使用 `system` 调用，调用 `commitState` 来提交并完成 `state-sync`。

`commitState` 期间，Bor 在目标合约上执行 `onStateReceive`，以 `stateId` 和 `data` 当作自变量。

### 状态接受者接口 {#state-receiver-interface}

`receiver`Bor 链上的合约必须实施以下接口。

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

必须允许 `0x0000000000000000000000000000000000001001`-`StateReceiver.sol` 才能在目标合约上调用 `onStateReceive` 函数。

## 交易速度 {#transaction-speed}

目前，Bor 按预期运作，在 100 个验证者和 4 个区块生产者的情况下，区块时间约为 2 至 4 秒。经过对大量交易开展的多次压力测试后，将确定准确的区块时间。

在基于冲刺的架构下，Bor 可以在当前冲刺期间更快创建批量区块，而无需更换生产者。两次冲刺之间有延迟，因而其他生产者能够收到广播的区块，通常称为 `producerDelay`。

请注意，两次冲刺之间的时间高于正常区块，这样的目的是实现缓冲，以减少多个生产者之间的延迟问题。

## 攻击 {#attacks}

### 审查 {#censorship}

Bor 使用一小组生产者来更快创建区块。这意味着它比 Heimdall 更容易受到更多审查攻击。为了解决这个问题，将开展多次测试，找出系统中可接受的区块时间的最大生产者数量。

除此以外，攻击可能不多：

1. 一个生产者正在审查交易

在这种情况下，交易发送者可以等待下一个生产者的冲刺，然后尝试再次发送交易。

2. 所有验证者共谋并审查特定的交易

在这种情况下，Polygon 系统将提供一种方法，在以太坊链上提交交易，并要求验证者将交易纳入下一个 `x` 检查点。如果验证者在该时间窗口内未能纳入该交易，用户可以削减验证者。请注意，这一点目前尚未实施。

### 欺诈 {#fraud}

生产者可以在各自轮班期间包含无效交易。可以在多个层面上实现：

1. 一个生产者存在欺诈行为

如果一个生产者在任意高度都包含无效交易，其他生产者可以创建一个分叉并排除该交易，因为他们的有效节点会忽略无效区块。

2. 跨度生产者存在欺诈行为

如果其他生产者不创建分叉，其他正在验证区块的验证者可以自行创建分叉，强行更改跨度。这一点目前尚未实施，因为需要 Geth 的内部工作方式。然而，这一点已在我们未来的路线图中。

3. 所有验证者都存在欺诈行为

假设 ⅔+1 个验证人必须诚实，才能正确运作此系统。
