---
id: important-contracts
title: 重要合约
description: 国家合成者、存款管理者、Childchinechelline和ChildERC20/721
keywords:
  - docs
  - matic
  - polygon
  - Important contracts
image: https://matic.network/banners/matic-network-16x9.png
---

# 重要合约 {#important-contracts}

## 状态同步器 {#state-syncer}

本合约用于将状态变化从以太坊主链转播至 BOR。Heimdall 监听 `StateSender` 合约上的 `StateSynced` 事件，并使用系统调用将其转播至 BOR。

```jsx
contract StateSender {
	function syncState(address receiver, bytes calldata data)
    external
	{
	    counter = counter.add(1);
	    emit StateSynced(counter, receiver, data);
	}
}
```

## 存款管理器 {#deposit-manager}

用于将资产从主链存入 BOR。本合约充当第三方代管合约，一直持有资产直至提取（通过提取管理器和断言）为止。

```jsx
function depositERC20ForUser(address _token, address _user, uint256 _amount)
		public
{
    require(
        IERC20(_token).transferFrom(msg.sender, address(this), _amount),
        "TOKEN_TRANSFER_FAILED"
    );
    _createDepositBlock(_user, _token, _amount);
}

function _createDepositBlock(
    address _user,
    address _token,
    uint256 _amountOrToken,
    uint256 _depositId
) internal {
    ...
    stateSender.syncState(
        childChain,
        abi.encode(_user, _token, _amountOrToken, _depositId /* sequential ID */)
    );
		...
}
```

## 子链 (BOR) {#childchain-bor}

上述存款会铸造成 BOR 上的 ERC20/721 代币合约。这一点通过[状态接受者合约](https://www.notion.so/maticnetwork/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab#aa94e6a9373943068b93d2c0e7f3d2e6)完成，该合约调用 `ChildChain` 中的 `onStateReceive` 方法。

```jsx
contract ChildChain {
	...
	function onStateReceive(
	  uint256, /* id */
	  bytes calldata data
	) external onlyStateSyncer {
	  (address user, address rootToken, uint256 amountOrTokenId, uint256 depositId)
			= abi.decode(data, (address, address, uint256, uint256));
	  depositTokens(rootToken, user, amountOrTokenId, depositId);
	}

	function depositTokens(
	  address rootToken,
	  address user,
	  uint256 amountOrTokenId,
	  uint256 depositId)
	{
		...
		if (isERC721[rootToken]) {
        obj = ChildERC721(childToken);
    } else {
        obj = ChildERC20(childToken);
    }
    obj.deposit(user, amountOrTokenId);	
	}
}
```

## 子 ERC20/721 {#childerc20-721}

```jsx
contract ChildERC20 is ERC20 {
	function deposit(address user, uint256 amount) public onlyOwner {
	  ...
    _mint(user, amount);
		...
  }

	function withdraw(uint256 amount) public payable {
    ...
    _burn(user, amount);
		...
	}
}
```
