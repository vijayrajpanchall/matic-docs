---
id: avail-quick-start
title: Polygon Avail 사용 방법
sidebar_label: Quick Start
description: Polygon Avail 사용 방법을 알아봅니다
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

# Polygon Avail 사용 방법 {#how-to-use-polygon-avail}

:::note

현재 기능을 많이 개선하기 위해 노력하고 있습니다. 테스트넷을 사용하여 소중한 피드백을 [<ins>권장합니다. 커뮤니티 채널</ins>](https://polygon.technology/community/) 중 하나를 통해 말이죠.

:::

## Avail 계정 생성하기 {#generate-an-avail-account}

다음 두 가지 방법 중 하나를 사용해 계정을 생성할 수 있습니다.
- [Avail Explorer](https://testnet.polygonavail.net/)
- Console/Typescript

<Tabs
defaultValue="explorer"
values={[
{ label: 'Avail Explorer', value: 'explorer', },
{ label: '@polkadot/api', value: 'library', },
]
}>
<TabItem value="explorer">

[Avail Explorer](https://testnet.polygonavail.net/)로 이동하세요.

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Avail Explorer](https://testnet.polygonavail.net/)**는
**[Polkadot-JS Apps](https://polkadot.js.org/)**의 포크입니다 Polkadot-JS 앱에 익숙하다면
인터페이스 및 탐색은 이와 동일합니다.

:::

**계정** 탭으로 가서 **계정** 하위 탭을 클릭하세요.

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info 주소 형식

Avail은 [Substrate](https://substrate.io/)를 사용해 구현되며, 일반 Substrate 주소는
항상 5로 시작하고 그 후 **[SS58 주소 형식](https://docs.substrate.io/v3/advanced/ss58/)**을 따릅니다.

:::

계정 페이지에서 **계정 추가** 버튼을 클릭하고 팝업 창에서 후속 단계를 따릅니다.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution 키 관리

시드 문구는 계정을 제어하는 계정 키입니다. 시드 문구를 인터넷에 접속되거나 혹은 접속할 가능성이 있는 디바이스에 저장해서는
안됩니다. 시드 문구는 적어 두고, 디지털이 아닌 수단으로 저장해야
합니다.

계정의 JSON 파일을 저장하는 것은 파일을 암호화하기 위한 강력한 패스워드가 있다면
시드 문구를 저장하는 것과 같이 엄격할 필요는 없습니다. 계정에 접근하기 위해 JSON 파일을
가져올 수 있습니다.

:::

## AVL 테스트넷 토큰 받기 {#receive-avl-testnet-tokens}

Avail Explorer에서 계정 이름 옆의 아이콘을 클릭해
주소를 복사합니다.  또는 주소를 수동으로 복사할 수 있습니다.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

[Polygon Faucet](https://faucet.polygon.technology)으로 이동하세요.

Faucet 페이지에서 `DA Network` 와 `DA (Test Token)`를 네트워크와 토큰으로 선택하세요.
계정 주소를 붙여넣고 **제출**을 클릭합니다. 이전은 완료까지 최대
1분이 걸립니다.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

성공적으로 이전되면 계정은 이제 0이 아닌 잔액을 가져야 합니다. Faucet으로 부터 토큰을 획득하는데
문제가 있으면 다음으로 연락 주세요.
[지원팀](https://support.polygon.technology/support/home)

## 새로운 트랜잭션 제출하기 {#submit-a-new-transaction}

Avail Explorer에서 **개발자** 탭으로 이동하여
**외인성(Extrinsics)** 하위 탭을 클릭합니다.

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

새롭게 생성된 계정을 선택하세요.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

선택할 수 있는 많은 외인성(extrinsics)이 있습니다. **외인성(extrinsics) 드롭 다운 메뉴**에서 `dataAvailability`외인성(extrinsics)을 선택하세요.

:::info 외인성(extrinsics)은 무엇입니까?

외인성(extrinsics)은 외부 정보의 한 형태이며 내재되어 있거나, 서명된 트랜잭션이거나, 또는 서명되지 않은
트랜잭션일 수 있습니다. 외인성(extrinsics)에 대한 자세한 정보는 다음을 참조하세요.
[Substrate 설명서](https://docs.substrate.io/v3/concepts/extrinsics/)

:::

오른쪽의 드롭 다운 메뉴를 사용해 애플리케이션 키를 생성하거나 또는 데이터를
제출할 수 있습니다.

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

다음 예에서 `createApplicationKey`를 사용해 애플리케이션 키를 생성합니다.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

`App_ID`을 사용해 트랜잭션의 일부로서 제출하고자 하는 값을 입력하거나 또는
디폴트 키 값 없이 `0`을 사용합니다.

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

`App_ID`를 사용해 트랜잭션을 보내기 전에 `createApplicationKey` 필드를 사용해 반드시 생성되어야 합니다.

:::

트랜잭션을 제출하세요. [Avail Explorer](https://testnet.polygonavail.net/#/explorer)로 이동하세요.
최근 이벤트 목록에 트랜잭션이 열거되어 있습니다. 이벤트를 클릭할 수 있고 확장한 후 트랜잭션 세부사항을
확인할 수 있습니다.

</TabItem>

<TabItem value="data">

이 예에서 `submitBlockLengthProposal`를 사용해 데이터를 제출합니다.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

`row`과 `col`를 위해 이 트랜잭션의 일부로 제출하기를 원하는 값을 입력하세요.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

트랜잭션을 제출하세요. [Avail Explorer](https://testnet.polygonavail.net/#/explorer)로 이동하세요.
최근 이벤트 목록에 트랜잭션이 열거되어 있습니다. 이벤트를 클릭할 수 있고 확장한 후 트랜잭션 세부사항을
확인할 수 있습니다.

</TabItem>
</Tabs>

:::info 트랜잭션 이면의 데이터가 사용 가능한지 어떻게 보장하나요?

Polygon은 데이터 가용성을 검증하기 위한 핵심을 추상화했고 라이트 클라이언트를 호스팅해
사용할 수 있도록 했습니다. 원하는 트랜잭션의 블록 번호를 클릭하기만 하면
블록 세부 사항을 모두 볼 수 있습니다.

**신뢰 계수** 또한 볼 수 있습니다. 만약 `0%`이 나타나면, 잠시 기다린 후 다시 확안하세요.
그러면 근본적인 데이터가 사용 가능한지 확률을 보여주는 0이 아닌 신뢰 수준이
표시됩니다.

:::

</TabItem>
<TabItem value="library">

또는 console/typescript을 사용하여,
[`@polkadot/api`](https://polkadot.js.org/docs/)를 통해 Avail계정을 생성할 수 있습니다. 새로운 폴더를 생성하고
`yarn add @polkadot/api` 또는 `npm install @polkadot/api`을 사용해 JS 라이브러리를 추가하세요.

:::info

스크립트 실행을 위한 Typescript 종속 항목을 추가하세요. 여기서,
`@polkadot/api` 버전 `7.9.1`이 사용됩니다.

`ts-node`를 사용해 Typescript 파일을 콘솔에서 실행시킬 수 있습니다. `yarn add ts-node typescript '@types/node'` 또는
`npm i ts-node typescript '@types/node'`을 사용해
패키지를 설치 하세요.

예를 들어, `account.ts`라고 불리는 스크립트를 생성하면 다음을 실행하여 명령 라인에서
스크립트를 실행할 수 있습니다.

```bash

ts-node account.ts

```

스크립트를 실행하기 전에 **[노드에 연결하기](../node/avail-node-management.md)**도
필요합니다.

:::

계정을 생성하려면, 다음 스크립트를 실행하세요.

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

샘플 결과:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info 주소 형식

Avail은 [Substrate](https://substrate.io/)를 사용해 구현되며, 일반 Substrate 주소는
항상 5로 시작하고 그 후 **[SS58 주소 형식](https://docs.substrate.io/v3/advanced/ss58/)**을 따릅니다.

:::

:::info 키 파생 및 서명 알고리즘

`sr25519`를 사용하는 이유는 **[여기](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**에 요약되어 있습니다.

:::

다음 단계를 위해 새로 생성된 주소와 니모닉 문구를 저장하세요.

:::caution 키 관리

시드 문구는 계정을 제어하는 계정 키입니다. 시드 문구를 인터넷에 접속되거나 혹은 접속할 가능성이 있는 디바이스에 저장해서는
안됩니다. 시드 문구는 적어 두고, 디지털이 아닌 수단으로 저장해야
합니다.

:::

## AVL 테스트넷 토큰 받기 {#receive-avl-testnet-tokens-1}

[Polygon Faucet](https://faucet.polygon.technology)으로 이동하세요.

Faucet 페이지에서 `DA (Test Token)` 및 `DA Network`를 토큰과 네트워크로 각각
선택하세요. 계정 주소를 붙여넣고 **제출**을 클릭합니다. 이전을 완료하는 데 최대
1분이 걸립니다.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

성공적으로 이전되면 계정은 이제 0이 아닌 잔액을 가져야 합니다. Faucet으로 부터 토큰을 얻는데 문제가 있다면 [지원팀](https://support.polygon.technology/support/home)으로 연락하세요.

### `@polkadot/api`로 잔액 확인하기

다음의 스크립트를 사용해 방금 생성한 계정에 잔액을 확인합니다.

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

샘플 결과:

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> 계정이 새롭게 생성되었고 Faucet을 사용한 적이 없다면 잔액은 `0`이어야 합니다.
> 트랜잭션의 확인도 볼 수 있어야 합니다.

:::tip Avail Explorer 사용하기

편의를 위해 `@polkadot/api`를 사용해 생성한 계정을 Avail Explorer UI에 추가해
계정 동작을 수행할 수 있습니다.

:::

## 새로운 트랜잭션 제출하기 {#submit-a-new-transaction-1}

본 섹션에 제공된 스크립트를 사용해 트랜잭션을 서명하고 제출할 수 있습니다.

:::note

`value` 그리고 `APP_ID`를 제출하고자 하는 것으로 대체하세요.
또한 니모닉 스트링을 여러분의 것으로 대체하세요.

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

다음 스크립트는 애플리케이션 키를 생성합니다.

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

다음 스크립트는 데이터를 제출합니다.

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

[Avail Explorer](https://testnet.polygonavail.net/#/explorer)로 이동할 수 있고 최신 이벤트 목록에
트랜잭션이 열거되어 있습니다. 이벤트를 클릭할 수 있고 확장한 후 트랜잭션 세부사항을
확인할 수 있습니다.

:::info 트랜잭션 이면의 데이터가 사용 가능한지 어떻게 보장하나요?

다음의 컬 요청을 사용해 신뢰 수준을 확인할 수 있습니다. 블록 번호를 가용성 보증을 원하는 블록의 번호로
대체하여 확인하세요.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
