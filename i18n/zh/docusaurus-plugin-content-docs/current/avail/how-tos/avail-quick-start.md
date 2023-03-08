---
id: avail-quick-start
title: 如何使用 Polygon Avail
sidebar_label: Quick Start
description: 了解如何使用 Polygon Avail
keywords:
  - docs
  - polygon
  - avail
  - data
  - availability
  - how-to
  - extrinsic
  - explorer
  - use
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: avail-quick-start
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

# 如何使用 Polygon Avail {#how-to-use-polygon-avail}

:::note

我们正在改进许多当前功能。我们赞赏您使用我们的测试网，并通过我们的社区渠道鼓励您的宝贵反馈[<ins>。</ins>](https://polygon.technology/community/)

:::

## 生成 Avail 账户 {#generate-an-avail-account}

您可以使用以下两种方法之一生成账户：
- [Avail 浏览器](https://testnet.polygonavail.net/)
- 控制台/Typescript

<Tabs
defaultValue="explorer"
values={[
{ label: 'Avail Explorer', value: 'explorer', },
{ label: '@polkadot/api', value: 'library', },
]
}>
<TabItem value="explorer">

转到 [Avail 浏览器](https://testnet.polygonavail.net/)。

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Avail 浏览器](https://testnet.polygonavail.net/)** 是 **[Polkadot-JS 应用](https://polkadot.js.org/)**的分支。如果您熟悉 Polkadot-JS 应用的话，Avail 浏览器的交互和导航与之相同。

:::

导航到**账户 (Account)** 选项卡并点击**账户**子选项卡。

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info 地址格式

因为 Avail 是使用 [Substrate](https://substrate.io/) 实现的，通用 Substrate 地址始终以 5 开头并遵循 **[SS58 地址格式](https://docs.substrate.io/v3/advanced/ss58/)**。

:::

在账户页面上，点击**添加账户**按钮并按照弹出窗口中的步骤操作。

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution 密钥管理

助记词就是用于控制您账户的账户密钥。您不应将助记词保存在已经联网或者可能联网的设备上。您应将助记词写来下并保存在非数字介质上。

存储您账户的 JSON 文件不必像存储助记词那样严格，您只需使用强密码来加密文件即可。您可以导入 JSON 文件来访问您的账户。

:::

## 接收 AVL 测试网代币 {#receive-avl-testnet-tokens}

在 Avail 浏览器上，点击账号旁边的图标来复制您的地址。或者，您可以手动复制地址。

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

前往 [Polygon 水龙头](https://faucet.polygon.technology)。

在水龙头页面，选择 `DA Network` 和 `DA (Test Token)` 作为网络和代币。粘贴您的账户地址并点击**提交**。转账最多 1 分钟即可完成。

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

转账成功后，您的账户余额就不是零了。如果您在从水龙头获取代币方面遇到任何问题，请联系[支持团队](https://support.polygon.technology/support/home)请求帮助。

## 提交新交易 {#submit-a-new-transaction}

在 Avail 浏览器 上，导航到**开发者 (Developer)** 选项卡并点击**外部信息 (Extrinsics)** 子选项卡。

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

选择您新创建的账户。

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

有许多外部信息可供选择；继续并从**外部信息下拉菜单**中选择 `dataAvailability` 外部信息。

:::info 什么是外部信息？

外部信息是一类外在的信息，包括固有信息、签名交易或未签名交易。更多有关外部信息的详细信息可在[Substrate 文档](https://docs.substrate.io/v3/concepts/extrinsics/)中查看。

:::

然后，您可以使用右手边的下拉菜单创建应用程序密钥或提交数据。

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

在本例中，我们使用 `createApplicationKey` 来创建应用程序密钥。

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

使用 `App_ID` 输入您希望作为此交易的一部分提交的值，在没有默认密钥值的情况下为 `0`。

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

在使用 `App_ID` 发送交易之前，必须使用 `createApplicationKey` 字段创建交易。

:::

提交交易。前往 [Avail 浏览器](https://testnet.polygonavail.net/#/explorer)。近期事件列表应会列出您的交易。您可以点击事件，将其展开，以查看交易细节。

</TabItem>

<TabItem value="data">

在此示例中，`submitBlockLengthProposal` 用于提交数据。

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

输入您希望作为此交易一部分提交的 `row` 和 `col` 的值。

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

提交交易。前往 [Avail 浏览器](https://testnet.polygonavail.net/#/explorer)。近期事件列表应会列出您的交易。您可以点击事件，将其展开，以查看交易细节。

</TabItem>
</Tabs>

:::info 如何保证交易背后的数据可用？

我们已经提取验证数据可用性的细节，并托管了一个轻量级客户端供您使用。您只需点击要查询的交易区块编号，即可查看区块的所有详细信息。

您还将看到一个**信任因子**。如果它显示的是 `0%`，则请等待一段时间，稍后再查看。正常情况下，它应该显示一个非零信任等级，表示的是底层数据的可用概率。

:::

</TabItem>
<TabItem value="library">

此外，您还可以使用控制台/Typescript 通过 [`@polkadot/api`](https://polkadot.js.org/docs/) 生成 Avail 账户。创建新文件夹并使用 `yarn add @polkadot/api` 或 `npm install @polkadot/api` 添加 JS 库。

:::info

确保已添加 Typescript 依赖项以运行脚本。这里使用的是 `@polkadot/api` 版本 `7.9.1`。

您可以使用 `ts-node` 在控制台执行 Typescript 文件。或者使用 `yarn add ts-node typescript '@types/node'` 或 `npm i ts-node typescript '@types/node'` 来安装软件包。

例如，如果您创建一个名为 `account.ts` 的脚本，您可以在命令行通过运行以下命令执行脚本：

```bash

ts-node account.ts

```

您还需要先**[连接一个节点](../node/avail-node-management.md)**，然后再运行脚本。

:::

要生成账户，请运行以下脚本：

```typescript

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const {mnemonicGenerate, cryptoWaitReady } = require('@polkadot/util-crypto');

const keyring = new Keyring({ type: 'sr25519' });

async function createApi() {

  // Create the API and wait until ready
  return ApiPromise.create({
    types: {
        AccountInfo: 'AccountInfoWithRefCount',
    },
  });
}

async function main () {
  // Create the API and wait until ready
  const api = await createApi();

  const keyring = new Keyring({ type: 'sr25519'});
  const mnemonic = mnemonicGenerate();

  const pair = keyring.createFromUri(mnemonic, { name: 'test_pair' },'sr25519');
  console.log(pair.meta.name, 'has address', pair.address, 'and the mnemonic is', mnemonic);
  process.exit(0);

}
main().catch(console.error)

```

示例结果：

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info 地址格式

因为 Avail 是使用 [Substrate](https://substrate.io/) 实现的，通用 Substrate 地址始终以 5 开头并遵循 **[SS58 地址格式](https://docs.substrate.io/v3/advanced/ss58/)**。

:::

:::info 密钥衍生和签名算法

使用 `sr25519` 的理由详见**[此处](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**。

:::

请保存新生成的地址和助记词，以待在后续步骤中使用。

:::caution 密钥管理

助记词就是用于控制您账户的账户密钥。您不应将助记词保存在已经联网或者可能联网的设备上。您应将助记词写来下并保存在非数字介质上。

:::

## 接收 AVL 测试网代币 {#receive-avl-testnet-tokens-1}

前往 [Polygon 水龙头](https://faucet.polygon.technology)。

在水龙头页面，选择 `DA (Test Token)` 和 `DA Network` 分别作为代币和网络。粘贴您的账户地址并点击**提交**。转账将需要一分钟完成。

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

转账成功后，您的账户余额就不是零了。如果您在从水龙头获取代币时遇到任何问题，请联系[支持团队](https://support.polygon.technology/support/home)。

### 使用 `@polkadot/api` 查看余额

使用以下脚本查看您刚刚创建的账户的余额：

```typescript

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const {mnemonicGenerate, cryptoWaitReady } = require('@polkadot/util-crypto');

import type { ISubmittableResult} from '@polkadot/types/types';

const keyring = new Keyring({ type: 'sr25519' });

async function createApi() {
  // Initialise the provider to connect to the local node
  const provider = new WsProvider('wss://testnet.polygonavail.net/ws');

  // Create the API and wait until ready
  return ApiPromise.create({
    provider,
    types: {
        DataLookup: {
          size: 'u32',
          index: 'Vec<(u32,u32)>'
        },
        KateExtrinsicRoot: {
          hash: 'Hash',
          commitment: 'Vec<u8>',
          rows: 'u16',
          cols: 'u16'
        },
        KateHeader: {
          parentHash: 'Hash',
          number: 'Compact<BlockNumber>',
          stateRoot: 'Hash',
          extrinsicsRoot: 'KateExtrinsicRoot',
          digest: 'Digest',
          app_data_lookup: 'DataLookup'
        },
        Header: 'KateHeader',
        AppId: 'u32',
        CheckAppId: {
            extra: {
                appId: 'u32',
            },
            types: {}
        }
    },
    signedExtensions: {
      CheckAppId: {
        extrinsic: {
          appId: 'u32'
        },
        payload: {}
      },
    },
  });
}

async function main () {
  // Create the API and wait until ready
  const api = await createApi();

  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

    //address which is generated from previous step👇
    let ADDRESS = '_ADDRESS_';
    console.log(ADDRESS);
    try{
      let { data: { free:balance}} = await api.query.system.account(ADDRESS)
      console.log(`${ADDRESS} has balance of ${balance}`)
    }catch (e){
      console.log(e)
    }finally{
      process.exit(0)
    }
}
main().catch(console.error)

```

示例结果：

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> 如果账户是新创建的，而且您还没有使用过水龙头，则您应看到余额为 `0`。您应该还会看到交易的确认信息。

:::tip 使用 Avail 浏览器

方便起见，您可以添加此前使用 `@polkadot/api` 在 Avail 浏览器用户界面上生成的账户来执行账户操作。

:::

## 提交新交易 {#submit-a-new-transaction-1}

您可以使用此节提供的脚本来签名并提交交易。

:::note

请用您希望提交的值来替换 `APP_ID` 和 `value`。此外，用您自己的值来替换助记字符串。

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

使用以下脚本可创建应用程序密钥：

```typescript

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const {mnemonicGenerate, cryptoWaitReady } = require('@polkadot/util-crypto');

import type { ISubmittableResult} from '@polkadot/types/types';

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

const keyring = new Keyring({ type: 'sr25519' });

async function createApi() {
  // Initialise the provider to connect to the local node
  const provider = new WsProvider('ws://127.0.0.1:9944');

  // Create the API and wait until ready
  return ApiPromise.create({
    provider,
    types: {
        DataLookup: {
          size: 'u32',
          index: 'Vec<(u32,u32)>'
        },
        KateExtrinsicRoot: {
          hash: 'Hash',
          commitment: 'Vec<u8>',
          rows: 'u16',
          cols: 'u16'
        },
        KateHeader: {
          parentHash: 'Hash',
          number: 'Compact<BlockNumber>',
          stateRoot: 'Hash',
          extrinsicsRoot: 'KateExtrinsicRoot',
          digest: 'Digest',
          app_data_lookup: 'DataLookup'
        },
        Header: 'KateHeader',
        AppId: 'u32',
        CheckAppId: {
            extra: {
                appId: 'u32',
            },
            types: {}
        }
    },
    signedExtensions: {
      CheckAppId: {
        extrinsic: {
          appId: 'u32'
        },
        payload: {}
      },
    },
  });
}

async function main () {
  // Create the API and wait until ready
  const api = await createApi();

  //enter your mnemonic generated from the previous step and replace below.
  const pair = keyring.addFromUri( 'put your mnemonic', { name: 'test pair' }, 'sr25519');
  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);
  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
    try{
        let KEY = 1;
        let createId = api.tx.dataAvailability.createApplicationKey(KEY);
        const unsub = await createId
            .signAndSend(
            pair,
            { app_id: 0},
            ( result: ISubmittableResult ) => {
                console.log(`Tx status: ${result.status}`);

                if (result.status.isInBlock) {
                    console.log(`Tx included at block hash ${result.status.asInBlock}`);
                } else if (result.status.isFinalized) {
                    console.log(`Tx included at blockHash ${result.status.asFinalized}`);

                    result.events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                    });
                    unsub
                    process.exit(0);
                }
            });
    }catch(e){
        console.error(e);
    }
}
main().catch(console.error)

```

</TabItem>
<TabItem value="data-script">

以下脚本可提交数据：

```typescript

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const {mnemonicGenerate, cryptoWaitReady } = require('@polkadot/util-crypto');

import type { EventRecord, ExtrinsicStatus, H256, SignedBlock } from '@polkadot/types/interfaces';
import type { ISubmittableResult} from '@polkadot/types/types';

const keyring = new Keyring({ type: 'sr25519' });

async function createApi() {
  // Initialise the provider to connect to the local node
  const provider = new WsProvider('wss://testnet.polygonavail.net/ws');

  // Create the API and wait until ready
  return ApiPromise.create({
    provider,
    types: {
        DataLookup: {
          size: 'u32',
          index: 'Vec<(u32,u32)>'
        },
        KateExtrinsicRoot: {
          hash: 'Hash',
          commitment: 'Vec<u8>',
          rows: 'u16',
          cols: 'u16'
        },
        KateHeader: {
          parentHash: 'Hash',
          number: 'Compact<BlockNumber>',
          stateRoot: 'Hash',
          extrinsicsRoot: 'KateExtrinsicRoot',
          digest: 'Digest',
          app_data_lookup: 'DataLookup'
        },
        Header: 'KateHeader',
        AppId: 'u32',
        CheckAppId: {
            extra: {
                appId: 'u32',
            },
            types: {}
        }
    },
    signedExtensions: {
      CheckAppId: {
        extrinsic: {
          appId: 'u32'
        },
        payload: {}
      },
    },
  });
}

async function main () {
  // Create the API and wait until ready
  const api = await createApi();

  //enter your mnemonic generated from the previous step and replace below 👇.
  const pair = keyring.addFromUri( 'enter mnemonic here', { name: 'test pair' }, 'sr25519');
  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

    try{
        let APP_ID = 1;
        let VALUE = `iucakcbak`;
        let transfer = api.tx.dataAvailability.submitData(VALUE);
        const unsub = await transfer
            .signAndSend(
            pair,
            { app_id: APP_ID},
            ( result: ISubmittableResult ) => {
                console.log(`Tx status: ${result.status}`);

                if (result.status.isInBlock) {
                    console.log(`Tx included at block hash ${result.status.asInBlock}`);
                } else if (result.status.isFinalized) {
                    console.log(`Tx included at blockHash ${result.status.asFinalized}`);

                    result.events.forEach(({ phase, event: { data, method, section } }) => {
                        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
                    });

                    process.exit(0);
                }
            });
    }catch(e){
        console.error(e);
    }
}
main().catch(console.error)

```

</TabItem>
</Tabs>

您可前往 [Avail 浏览器](https://testnet.polygonavail.net/#/explorer)，近期事件列表应会列出您的交易。您可以点击事件，将其展开，以查看交易细节。

:::info 如何保证交易背后的数据可用？

您可以使用以下 curl 请求来查看信任等级，只需将区块编号替换为您希望获得可用性保证的区块编号。

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
