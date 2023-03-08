---
id: sealer
title: 封装模块
description: 对 Polygon Edge 封装模块的解释。
keywords:
  - docs
  - polygon
  - edge
  - architecture
  - module
  - sealer
  - sealing
---

## 概述 {#overview}

**封装模块**是收集交易和创建新区块的实体。<br />区块发送至**共识**模块进行封装。

最后的封装逻辑位于**共识**模块中。

## 运行方法 {#run-method}

````go title="sealer/sealer.go"
func (s *Sealer) run(ctx context.Context) {
	sub := s.blockchain.SubscribeEvents()
	eventCh := sub.GetEventCh()

	for {
		if s.config.DevMode {
			// In dev-mode we wait for new transactions to seal blocks
			select {
			case <-s.wakeCh:
			case <-ctx.Done():
				return
			}
		}

		// start sealing
		subCtx, cancel := context.WithCancel(ctx)
		done := s.sealAsync(subCtx)

		// wait for the sealing to be done
		select {
		case <-done:
			// the sealing process has finished
		case <-ctx.Done():
			// the sealing routine has been canceled
		case <-eventCh:
			// there is a new head, reset sealer
		}

		// cancel the sealing process context
		cancel()

		if ctx.Err() != nil {
			return
		}
	}
}
````

:::caution 正在进行

**封装**和**共识**模块在未来会组合成单个的实体。

新模块使用不同的共识机制融合模块化逻辑，需要不同的封装实施：
* **PoS** （权益证明）
* **PoA** （权威证明）

目前，**封装模块**和**共识**模块都使用 PoW (工作证明）。
:::