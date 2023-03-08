---
id: networking
title: 网络
description: 对 Polygon Edge 的网络模块的解释。
keywords:
  - docs
  - polygon
  - edge
  - architecture
  - module
  - networking
  - libp2p
  - GRPC
---

## 概述 {#overview}

NODE 必须与网络上的其他节点进行通信，以便交换有用的信息。<br />为了完成此任务，Polygon Edge 利用了经过实战检验的 **libp2p** 框架。

使用 **libp2p** 的选择主要侧重：
* **速度** - libp2p 比 devp2p（在 GETH 和其他客户端中使用）具有显著的性能改进
* **可扩展性** - 它是系统其他功能的重要基础
* **模块化** - libp2p 本质上是模块化的，就像 Polygon Edge 一样。这使 Polygon Edge 的部分需要可交换时更具有灵活性

## GRPC {#grpc}

Polygon Edge 在 **libp2p** 上方使用 **GRPC** 协议。<br />从技术上来说，Polygon Edge 使用多个 GRPC 协议，稍后将对其进行介绍。

GRPC 层帮助抽象化所有请求/回复协议，并简化 Polygon Edge 正常运行所需的流协议。

GRPC 依赖**协议缓冲器**来定义*服务*和*消息结构*。<br />服务和结构是在 *.proto* 文件中定义的，这些文件是经过编译的，与语言无关。

先前，我们提到 Polygon Edge 利用了若干 GRPC 协议。<br />这样做是为了提高 NODE 运算符的总体 UX，而 GETH 和 Pality 等客户端往往滞后。

NODE 运算符通过调用 GRPC 服务更好地概述系统正在发生的事情，而不是通过日志筛选以找到他们所寻找的信息。

### NODE 运算符的 GRPC {#grpc-for-node-operators}

下节似乎很熟悉，因为 [CLI 命令](/docs/edge/get-started/cli-commands)节中已简短地介绍。

打算由 **Node 运算符**使用的 GRPC 服务定义如下：
````go title="minimal/proto/system.proto"
service System {
    // GetInfo returns info about the client
    rpc GetStatus(google.protobuf.Empty) returns (ServerStatus);

    // PeersAdd adds a new peer
    rpc PeersAdd(PeersAddRequest) returns (google.protobuf.Empty);

    // PeersList returns the list of peers
    rpc PeersList(google.protobuf.Empty) returns (PeersListResponse);

    // PeersInfo returns the info of a peer
    rpc PeersStatus(PeersStatusRequest) returns (Peer);

    // Subscribe subscribes to blockchain events
    rpc Subscribe(google.protobuf.Empty) returns (stream BlockchainEvent);
}
````
:::tip
CLI 命令实际上可以调用这些服务方法的实施。

这些方法可在 ***minimal/system_service.go*** 中实施。
:::

### 用于其他节点的 GRPC {#grpc-for-other-nodes}

Polygon Edge 还实施网络上的其他节点使用的若干服务方法<br />。上述服务在**[协议](docs/edge/architecture/modules/consensus)**章节中进行了描述。

## 📜 资源 {#resources}
* **[协议缓冲器](https://developers.google.com/protocol-buffers)**
* **[libp2p](https://libp2p.io/)**
* **[gRPC](https://grpc.io/)**
