---
id: set-proof-api
title: 设置 ProofApi
keywords:
    - setProofApi
    - polygon
    - sdk
description: 配置证明 API。
---

matic.js 中的一些函数被更快地用术语窒息。如名称所示，与非快捷的对应者相比，它们生成结果更快。他们通过使用 Provol 新代 API 作为支持端来实现，任何人都可以托管。

[https://apis/matic.network](https://apis/matic.network) 是公开提供的 Proof 生成 API，由 Polygon 主导。

该`setProofApi`方法有助于将 Proform 发成 API URL 设置为 matic.js 实例。

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

使用自主主主机的 Profonge API 服务将提供比公开主机更好的性能。

请遵循在 https://github.com/maticnetwork/contract-sage-api  中提供的安装指示，以自主主主机服务。

例如 - 如果您已经部署了证明 API 并且基本 URL 是 - `https://abc.com/`，那么您需要在`setProofApi`中设置基本 URL

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
我们建议使用更快的 API 方法，因为某些 API 公司（特别是在生成证据时）会产生大量 RPC 调用，而在公共 RPC 中可能非常缓慢。
:::
