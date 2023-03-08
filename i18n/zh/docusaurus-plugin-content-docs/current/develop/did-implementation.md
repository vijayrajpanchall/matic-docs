---
id: did-implementation
title: Polygon DID 实施
sidebar_label: Identity
description: 了解 Polygon 上的 DID 实施
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

此入门指南面向希望使用 Polygon 团队发布的实施程序包的用户，以在 Polygon 账本上生成和发布 Polygon DID。

Polygon DID 方法实施包括 3 个程序包，即 Polygon-did-registrar、Polygon-did-resolver 和 Polygon-did-registry-contract。 用户如果想要合并函数，从而在 Polygon 网络注册或读取 DID，则可使用以下指南。

DID 是一个唯一标识符，无需中央机构即可创建。  可验证凭证背景下的 DID 用于签署文档，从而方便用户在需要时证明文档的所有权。

## Polygon DID 方法 {#polygon-did-method}

Polygon DID 方法定义符合 DID-Core 规范和标准。 DID URI 由冒号分隔的三部分组成，即方案、方法名称和方法特定标识符。 对于 Polygon 来说， URI 看起来像：

```
did:polygon:<Ethereum address>
```

此处`did`，方法名称为`polygon`，方法特定的识别符是以太阳式地址。

## Polygon DID 实施 {#polygon-did-implementation}

Polygon DID 可借助两个程序包实施，用户可以先导入各自的 NPM 库，然后使用它们将 Polygon DID 方法纳入各自的应用。 实施细节可查看下一节。

开始前，首先需要创建一个 DID。 在 Polygon 中，创建实际上是两个步骤的封装，首先用户需要为自己生成一个 DID URI，然后将其注册到 Polygon 账本上。

### 创建 DID {#create-did}

在创建 Polygon  Ded URI 项目中，首先需要安装：

```
npm i @ayanworks/polygon-did-registrar --save
```

完成安装后，用户可以使用如下：

```
import { createDID } from "polygon-did-registrar";
```

该`createdDID`函数帮助用户生成 DDE URI。创建 DID 时，可能存在两种情况。

  1. 用户已经拥有一个钱包，并希望生成一个与该钱包对应的 DID。

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. 如果用户没有现有钱包，并希望生成钱包，用户可以使用：

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

两种情况下的网络参数是指用户是否希望在 Polygon Mumbai 测试网上创建 Dock 或 Polygon  Mainnet 上创建 Dock。

抽样输入：

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

创建 DID 后，您将生成 DID URI 版本。

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### 登记册 {#register-did}

为了登记 Doy URI 及在分类账上相应的Doy Doy 文件，用户首先需要`polygon-did-registrar`使用以下方式：

```js
import { registerDID } from "polygon-did-registrar";
```

作为登记 DID 的一个先决条件，用户需要确保启动 DID 的钱包支持器拥有必要的代币平衡。用户在钱包中拥有代币平衡后，可以向寄存器Dok 功能调用，详见下面：

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

参数`did``privateKey`是强制性的，而输入`url`和  时可选的输入 。`contractAddress`如果用户没有给出最后两个参数，则库会从 DID URI 中选择网络的默认配置。

如果所有参数与规格相匹配，并且所有内容都按正确顺序排列，`registerDID`函数将返回交易中，否则将返回相应的错误。

通过此，您已经成功完成了在 Polygon 网络上登记 Do 的任务。

## 解析 DID {#resolve-did}

要开始，请安装以下库：

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

如需读取在账本上注册的 DID 文档，任何具有 DID Polygon URI 的用户均可先在项目中导入，

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

导入数据包后，可使用以下方法检索DDE 文档：

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

其中，`didResolutionResult`对象如下：

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

请注意，用户在尝试解析 DID 时不会产生任何燃料费用。

## 更新 DID 文档 {#update-did-document}

为了将项目包装起来，具备更新 Dober 文档的能力，用户首先需要`polygon-did-registrar`使用以下方式：

```js
import { updateDidDoc } from "polygon-did-registrar";
```

下一个，调用函数：

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

应当指出，为了更新 Do 文件，只有Do 拥有者可以发送请求。此处的私钥也应持有一些相应的 Matic 代币。

如果用户没有使用 `url` 和 `contractAddress` 提供配置，则库会从 DID URI 中选择网络的默认配置。

## 删除 DID 文档 {#delete-did-document}

随着 Polygon 实施，用户也可以从分类账中撤销其Dock文件。用户首先需要`polygon-did-registrar`使用如下：

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

然后使用，

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

注意，在这些参数中，`contractAddress` 和 `url` 是可选参数，如果用户不提供，函数将根据 DID URI 获取默认配置。

根据 DID 的网络配置，私钥必须持有必要的 Matic 代币，否则交易将失败。

## 贡献到存储库 {#contributing-to-the-repository}

使用标准的 fork、branch 和 pull request 工作流程来提议对存储库的更改。请通过包含问题或错误号码等方式提供信息。

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
