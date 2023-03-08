---
id: storage
title: 存储
description: 对 Polygon Edge 的存储模块的解释。
keywords:
  - docs
  - polygon
  - edge
  - architecture
  - module
  - storage
  - LevelDB
---

## 概述 {#overview}

Polygon Edge 目前使用 **LevelDB** 数据存储和**内存**数据存储。

通过 Polygon Edge，模块需要和底层的数据存储交互。它们不需要知道正在和哪个 DB 引擎或服务交谈。

DB 层在名为**存储**的模块之间被抽象出来，该模块导出模块查询的接口。


每个 DB 层中，目前只有 **LevelDB** 单独实施这些方法，确保它们与实施的情况相适应。

````go title="blockchain/storage/storage.go"
// Storage is a generic blockchain storage
type Storage interface {
	ReadCanonicalHash(n uint64) (types.Hash, bool)
	WriteCanonicalHash(n uint64, hash types.Hash) error

	ReadHeadHash() (types.Hash, bool)
	ReadHeadNumber() (uint64, bool)
	WriteHeadHash(h types.Hash) error
	WriteHeadNumber(uint64) error

	WriteForks(forks []types.Hash) error
	ReadForks() ([]types.Hash, error)

	WriteDiff(hash types.Hash, diff *big.Int) error
	ReadDiff(hash types.Hash) (*big.Int, bool)

	WriteHeader(h *types.Header) error
	ReadHeader(hash types.Hash) (*types.Header, error)

	WriteCanonicalHeader(h *types.Header, diff *big.Int) error

	WriteBody(hash types.Hash, body *types.Body) error
	ReadBody(hash types.Hash) (*types.Body, error)

	WriteSnapshot(hash types.Hash, blob []byte) error
	ReadSnapshot(hash types.Hash) ([]byte, bool)

	WriteReceipts(hash types.Hash, receipts []*types.Receipt) error
	ReadReceipts(hash types.Hash) ([]*types.Receipt, error)

	WriteTxLookup(hash types.Hash, blockHash types.Hash) error
	ReadTxLookup(hash types.Hash) (types.Hash, bool)

	Close() error
}
````

## LevelDB {#leveldb}

### 前缀 {#prefixes}

为了查询 LevelDB 存储确定性以及避免密钥存储冲击，Polygon Edge 在存储数据时利用前缀和子前缀

````go title="blockchain/storage/keyvalue.go"
// Prefixes for the key-value store
var (
	// DIFFICULTY is the difficulty prefix
	DIFFICULTY = []byte("d")

	// HEADER is the header prefix
	HEADER = []byte("h")

	// HEAD is the chain head prefix
	HEAD = []byte("o")

	// FORK is the entry to store forks
	FORK = []byte("f")

	// CANONICAL is the prefix for the canonical chain numbers
	CANONICAL = []byte("c")

	// BODY is the prefix for bodies
	BODY = []byte("b")

	// RECEIPTS is the prefix for receipts
	RECEIPTS = []byte("r")

	// SNAPSHOTS is the prefix for snapshots
	SNAPSHOTS = []byte("s")

	// TX_LOOKUP_PREFIX is the prefix for transaction lookups
	TX_LOOKUP_PREFIX = []byte("l")
)

// Sub-prefixes
var (
	HASH   = []byte("hash")
	NUMBER = []byte("number")
	EMPTY  = []byte("empty")
)
````

## 未来计划 {#future-plans}

近期的计划包括添加一些最受欢迎的 DB 解决方案，例如：
* PostgreSQL
* MySQL


## 📜 资源 {#resources}
* **[LevelDB](https://github.com/google/leveldb)**