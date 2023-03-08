---
id: avail-quick-start
title: Polygon Availの使用方法
sidebar_label: Quick Start
description: Polygon Availの使用方法を学びます
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

# Polygon Availの使用方法 {#how-to-use-polygon-avail}

:::note

現在の機能の充実に取り組んでいます。テストネットを使用していただきありがとうございます。[<ins>コミュニティチャネル</ins>](https://polygon.technology/community/)を通じて貴重なフィードバックを奨励します。

:::

## Availアカウントの生成 {#generate-an-avail-account}

次の二つの方法のいずれかを使用してアカウントを生成できます：
- [Availエクスプローラ](https://testnet.polygonavail.net/)
- コンソール／タイプスクリプト

<Tabs
defaultValue="explorer"
values={[
{ label: 'Avail Explorer', value: 'explorer', },
{ label: '@polkadot/api', value: 'library', },
]
}>
<TabItem value="explorer">

[Availエクスプローラ](https://testnet.polygonavail.net/)に移動します。

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Availエクスプローラ](https://testnet.polygonavail.net/)**は**[Polkadot-JSアプリ](https://polkadot.js.org/)**のフォークです。Polkadot-JSアプリに慣れていれば、インターフェースもナビゲーションも同じです。

:::

**Accounts（アカウント）**タブに移動し、**Accounts（アカウント）**サブタブをクリックします。

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info アドレスフォーマット

Availは[Substrate](https://substrate.io/)を使用して実装されるため、汎用Substrateアドレスは常に5からスタートし、**[SS58アドレス形式](https://docs.substrate.io/v3/advanced/ss58/)**に従います。

:::

アカウントページで、**Add Account（アカウントの追加）**ボタンをクリックし、ポップアップウィンドウの手順に従います。

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution 鍵管理

シードフレーズはアカウント鍵であり、アカウントを制御します。シードフレーズは、インターネットに接続しているまたはインターネットにアクセスできるデバイスに保存しないでください。シードフレーズは、デジタルメディア以外のメディアに書き留めて保存する必要があります。

強力なパスワードを使用してファイルを暗号化する限り、アカウントのJSONファイルの保存はシードフレーズの保存ほど厳格である必要はありません。JSONファイルをインポートしてアカウントにアクセスできます。

:::

## AVLテストネットトークンの受信 {#receive-avl-testnet-tokens}

Availエクスプローラで、アカウント名の横にあるアイコンをクリックしてアドレスをコピーします。または、アドレスを手動でコピーすることもできます。

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

[Polygon Faucet](https://faucet.polygon.technology)に移動します。

Faucetのページでネットワークとトークンとして`DA Network`と`DA (Test Token)`を選択します。アカウントアドレスを貼り付け、**Submit（送信）**をクリックします。転送が完了するまで最大1分かかります。

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

正常に転送されると、アカウントの残高はゼロ以外になります。Faucetからトークンを入手する際に問題が発生した場合は、[サポートチーム](https://support.polygon.technology/support/home)に連絡してください。

## 新しいトランザクションの送信 {#submit-a-new-transaction}

Availエクスプローラで、**Developer（開発者）**タブに移動し、**Extrinsics（エクストリンシック）**サブタブをクリックしてください。

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

新しく作成したアカウントを選択してください。

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

選択できる多くのextrinsicがあります。**Extrinsicドロップダウンメニュー**から`dataAvailability`Extrinsicを選択してください。

:::info Extrinsicとは何ですか？

Extrinsicとは外部情報の一形態であり、固有のもの、署名付きトランザクション、または署名なしトランザクションのいずれかになります。Extrinsicに関する詳細は、[Substrateドキュメント](https://docs.substrate.io/v3/concepts/extrinsics/)を参照してください。

:::

その後、右側のドロップダウンメニューを使用してアプリケーション鍵を作成したり、データを送信したりできます。

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

この例では、アプリケーション鍵の作成に`createApplicationKey`を使用しています。

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

`App_ID`を使用するこのトランザクションの一部として送信するか、`0`としてデフォルトの鍵値なしで送信する値を入力します。

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

`App_ID`を使用してトランザクションを送信する前に、`createApplicationKey`フィールドを使用してトランザクションを作成する必要があります。

:::

トランザクションを送信してください。[Availエクスプローラ](https://testnet.polygonavail.net/#/explorer)に移動します。
最近のイベントリストにトランザクションが表示されます。イベントをクリックして拡張し、トランザクションの詳細を確認することができます。

</TabItem>

<TabItem value="data">

この例では、`submitBlockLengthProposal`を使用してデータを送信します。

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

このトランザクションの一部として`row`と`col`に送信する値を入力します。

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

トランザクションを送信します。[Availエクスプローラ](https://testnet.polygonavail.net/#/explorer)に移動します。
最近のイベントリストにトランザクションが表示されます。イベントをクリックして拡張し、トランザクションの詳細を確認することができます。

</TabItem>
</Tabs>

:::info トランザクションの背後にあるデータが利用可能であることを保証するにはどうすればよいですか？

データ可用性の検証の要点を要約し、使用できるようにライトクライアントをホストしました。必要なのは、希望するトランザクションに対し、ブロック番号をクリックして、すべてのブロックの詳細を確認することだけです。

また、**信頼性の要因**も表示されます。`0%`が表示されている場合は、しばらく時間をおいてから再度確認してください。そうでない場合は、基本的なデータを使用することができる確率を示すゼロ以外の信頼度レベルが必要が表示されるはずです。

:::

</TabItem>
<TabItem value="library">

または、コンソール／タイプスクリプトを使用して、[`@polkadot/api`](https://polkadot.js.org/docs/)を介してAvailアカウントを生成することもできます。新しいフォルダを作成し、`yarn add @polkadot/api`または`npm install @polkadot/api`を使用してJSライブラリを追加します。

:::info

スクリプトを実行するためのタイプスクリプトの依存関係が追加されていることを確認します。ここに、
`@polkadot/api`バージョン`7.9.1`が使用されます。

`ts-node`を使用して、コンソールでタイプスクリプトファイルを実行することができます。または`yarn add ts-node typescript '@types/node'`か`npm i ts-node typescript '@types/node'`を使用してパッケージをインストールします。

たとえば、`account.ts`という名前のスクリプトを作成する場合は次を実行してコマンドラインでスクリプトを実行します：

```bash

ts-node account.ts

```

また、スクリプトを実行する前に**[ノードに接続](../node/avail-node-management.md)**する必要があります。

:::

アカウントを生成するには、次のスクリプトを実行します：

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

サンプル結果：

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info アドレスフォーマット

Availは[Substrate](https://substrate.io/)を使用して実装されるため、汎用Substrateアドレスは常に5からスタートし、**[SS58アドレス形式](https://docs.substrate.io/v3/advanced/ss58/)**に従います。

:::

:::info 鍵派生および署名アルゴリズム

`sr25519`を使用する理由を**[ここ](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**に概説します。

:::

新たに生成されたアドレスとニーモニックフレーズを次のステップ用に保存します。

:::caution 鍵管理

シードフレーズはアカウント鍵であり、アカウントを制御します。シードフレーズは、インターネットに接続しているまたはインターネットにアクセスできるデバイスに保存しないでください。シードフレーズは、デジタルメディア以外のメディアに書き留めて保存する必要があります。

:::

## AVLテストネットトークンの受信 {#receive-avl-testnet-tokens-1}

[Polygon Faucet](https://faucet.polygon.technology)に移動します。

Faucetのページでトークンとネットワークとしてそれぞれ`DA (Test Token)`と`DA Network`を選択します。アカウントアドレスを貼り付け、**Submit（送信）**をクリックします。転送が完了するまでに最大1分かかります。

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

正常に転送されると、アカウントの残高はゼロ以外になります。Faucetからトークンを入手する際に問題が発生した場合は、[サポートチーム](https://support.polygon.technology/support/home)に連絡してください。

### `@polkadot/api`を使用した残高チェック

作成したアカウントの残高をチェックするには、次のスクリプトを使用します：

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

サンプル結果：

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> アカウントを新しく作り、Faucetを使わなかった場合は、残高は`0`になるはずです。トランザクションの確認も表示されるはずです。

:::tip Availエクスプローラの使用

便宜上、AvailエクスプローラUIに`@polkadot/api`で生成したアカウントを追加してアカウントの操作を実行することができます。

:::

## 新しいトランザクションの送信 {#submit-a-new-transaction-1}

このセクションで提供されているスクリプトを使用して、トランザクションに署名し、送信することができます。

:::note

`value`と`APP_ID`を提出したいもので置き換えてください。
また、ニーモニック文字列を自分のもので置き換えてください。

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

次のスクリプトは、アプリケーション鍵を作成します：

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

次のスクリプトはデータを送信します：

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

[Availエクスプローラ](https://testnet.polygonavail.net/#/explorer)に移動することができ、最近のイベントリストにトランザクションが表示されます。イベントをクリックして拡張し、トランザクションの詳細を確認することができます。

:::info トランザクションの背後にあるデータが利用可能であることを保証するにはどうすればよいですか？

次のcurlリクエストを使用して、信頼度を調べることができます。ブロック番号を、可用性保証を取得したいブロック番号に置き換えるだけです。

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
