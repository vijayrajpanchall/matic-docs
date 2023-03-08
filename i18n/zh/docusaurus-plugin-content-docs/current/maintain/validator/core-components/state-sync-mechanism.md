---
id: state-sync-mechanism
title: 状态同步机制
description: 将初次读取以太坊数据的状态同步机制
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Heimdall](/docs/maintain/glossary.md#heimdall) 层的验证者会接收到 [“StateSynced”](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) 事件并将该事件传递到 [Bor](/docs/maintain/glossary.md#bor) 层。 另请参阅[《Polygon 的架构》](/docs/pos/polygon-architecture)。

**接受者合约**继承了 [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol)，自定义逻辑体现在 [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5) 函数中。

最新版本的 [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) 包含一些增强功能，如：
1. 将状态同步 txs 中的数据大小限制为：
    * **用字节**表示时为**30Kb**
    * 以**字符串**表示时为**60Kb**。
2. 增加不同验证者合约事件间的 **延迟时间**，以确保在事件爆发的情况下，内存池不会很快被填满，这可能会阻碍链的进展。

下面的例子说明了如何限制数据的大小：

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## 对用户的要求 {#requirements-for-the-users}

要使用状态同步，去中心化应用程序/用户需要做到的事情：

1. 调用 [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33) 函数。
2. 该 `syncState` 函数发出一个名为 `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);` 的事件
3. Heimdall 链上的所有验证者均会收到该 `StateSynced` 事件。凡是想获得状态同步交易费的验证者均会将交易发送到 Heimdall。
4. 验证者将 `state-sync` 交易打包到区块内之后，会将其添加到待处理的状态同步列表中。
5. 在 Bor 层每个 sprint 后，Bor 层节点会通过调用 API 来获取待处理的状态同步列表。
6. 接受者合约继承了 `IStateReceiver` 接口，解码数据字节和执行任意操作的自定义逻辑体现在 [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol) 函数中。
