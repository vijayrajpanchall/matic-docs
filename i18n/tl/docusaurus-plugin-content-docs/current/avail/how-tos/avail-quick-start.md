---
id: avail-quick-start
title: Paano gamitin ang Polygon Avail
sidebar_label: Quick Start
description: Pag-aralan kung paano gamitin ang Polygon Avail
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

# Paano gamitin ang Polygon Avail {#how-to-use-polygon-avail}

:::note

Nagsisikap kami sa pagpapabuti ng marami sa kasalukuyang tampok. Pinahahalagahan ka namin gamit ang aming testnet at hinihikayat ang iyong mahalagang feedback sa pamamagitan ng isa sa mga [<ins>channel</ins>](https://polygon.technology/community/) ng aming komunidad.

:::

## Bumuo ng isang Avail Account {#generate-an-avail-account}

Maaari kang bumuo ng account gamit ang isa sa dalawang paraan:
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

Pumunta sa [Avail Explorer](https://testnet.polygonavail.net/).

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

Ang **[Avail Explorer](https://testnet.polygonavail.net/)** ay fork
ng **[Polkadot-JS Apps](https://polkadot.js.org/)**. Ang interface at pag-navigate ay pareho
kung pamilyar ka sa Polkadot-JS Apps.

:::

Mag-navigate sa tab na **Mga Account** at i-click ang sub-tab na **Mga Account**.

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info Format ng Address

Habang ipinapatupad ang Avail gamit ang [Substrate](https://substrate.io/), mga generic na Substrate na address
laging magsimula sa 5 at sundin ang **[format ng SS58 address](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

Sa page ng Mga Account, i-click ang button na **Magdagdag ng account** at sundin ang mga hakbang sa pop-up window.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution Pamamahala ng Key

Ang seed na parirala ay ang iyong account key, na kumokontrol sa iyong account.
Hindi mo dapat itago ang iyong seed na parirala sa device na mayroon o maaaring may access sa
internet connection. Ang seed na parirala ay dapat na isulat at itago sa non-digital
na medium.

Ang pagtatago ng JSON file ng iyong account ay hindi kailangang maging kasing higpit ng pagtatago ng seed na parirala,
basta gumamit ka ng malakas na password para i-encrypt ang file. Maaari mong i-import ang JSON file para
ma-access ang iyong account.

:::

## Tumanggap ng Mga AVL Testnet Token {#receive-avl-testnet-tokens}

Sa Avail Explorer, i-click ang icon sa tabi ng pangalan ng iyong account para
kopyahin ang iyong address. Bilang kahalili, maaari mong kopyahin ang address nang manu-mano.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

Tumungo sa [Polygon faucet](https://faucet.polygon.technology).

Sa faucet page, piliin ang `DA Network` at ang `DA (Test Token)` bilang network at token.
I-paste ang iyong account address at i-click ang **Isumite**. Ang paglipat ay aabot ng isang
minuto para makumpleto.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Sa matagumpay na paglipat, dapat na mayroon na ang iyong account ng hindi zero na balanse. Kung nahaharap ka sa anumang isyu
sa pagkuha ng mga token mula sa faucet, mangyaring ipa-abot sa
[team ng suporta](https://support.polygon.technology/support/home).

## Isumite ang Bagong Transaksyon {#submit-a-new-transaction}

Sa Avail Explorer, mag-navigate sa tab na **Developer** at i-click ang
ng **mga extrinsic** na sub-tab.

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

Piliin ang iyong bagong likhang account.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

Maraming extrinsic ang mapagpipilian; sige lang at pumili
ang `dataAvailability` extrinsic mula sa **extrinsic na dropdown menu**.

:::info Ano ang mga extrinsic?

Ang mga extrinsic ay anyo ng panlabas na impormasyon at maaaring maging likas, nilagdaang mga transaksyon,
o hindi nilagdaan na Mga Transaksyon. Makukuha ang higit pang detalye tungkol sa mga extrinsic sa
[Substrate na dokumentasyon](https://docs.substrate.io/v3/concepts/extrinsics/).

:::

Pagkatapos ay maaari mong gamitin ang dropdown na menu sa kanang bahagi upang gumawa ng application key o
magsumite ng data.

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

Sa halimbawang ito, ginagamit ang `createApplicationKey` upang gumawa ng application key.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

Ilagay ang value na gusto mong isumite bilang bahagi ng transaksyong ito gamit ang `App_ID`, o
nang walang default na value ng key bilang `0`.

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

Bago magpadala ng transaksyon gamit ang `App_ID`, dapat itong gawin gamit ang `createApplicationKey` na field.

:::

Isumite ang transaksyon. Pumunta sa [Avail Explorer](https://testnet.polygonavail.net/#/explorer).
Dapat ilista ng kamakailang listahan ng kaganapan ang iyong transaksyon. Maaari mong i-click ang kaganapan at palawakin ito upang tingnan
ang mga detalye ng transaksyon.

</TabItem>

<TabItem value="data">

Sa halimbawang ito, ang `submitBlockLengthProposal` ay ginagamit upang magsumite ng data.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

Ilagay ang mga value na gusto mong isumite bilang bahagi ng transaksyong ito para sa `row` at `col`.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

Isumite ang transaksyon. Pumunta sa [Avail Explorer](https://testnet.polygonavail.net/#/explorer).
Dapat ilista ng kamakailang listahan ng kaganapan ang iyong transaksyon. Maaari mong i-click ang kaganapan at palawakin ito upang tingnan
ang mga detalye ng transaksyon.

</TabItem>
</Tabs>

:::info Paano makakuha ng mga garantiya na ang data sa likod ng transaksyon ay magagamit?

Nakuha namin ang napakahusay na pag-verify ng data availability at nakapag-host ng light client
para magamit mo. Ang kailangan mo lang gawin ay i-click ang numero ng block laban sa iyong gustong transaksyon at
tingnan ang lahat ng detalye ng block.

Makakakita ka rin ng **confidence factor**. Kung lumalabas ito `0%`, bigyan ito ng ilang oras at tingnan muli sa ibang pagkakataon.
Kung hindi, dapat itong magpakita ng hindi zero na antas ng kumpiyansa na nagsasaad ng posibilidad kung saan ang pinagbabatayan na data
ay available.

:::

</TabItem>
<TabItem value="library">

Bilang kahalili, maaari mong gamitin ang console/typescript upang bumuo ng Avail account
sa pamamagitan ng [`@polkadot/api`](https://polkadot.js.org/docs/). Gumawa ng bagong folder at idagdag ang
JS library gamit ang `yarn add @polkadot/api` o `npm install @polkadot/api`

:::info

Tiyaking idinagdag ang mga dependency ng Typescript para sa pagpapatakbo ng script. Dito,
`@polkadot/api` bersyong `7.9.1` ang ginamit.

Maaari mong gamitin ang `ts-node` upang isagawa ang mga Typescript file sa console. Alinman sa paggamit ng
`yarn add ts-node typescript '@types/node'` o `npm i ts-node typescript '@types/node'`
para i-install ang mga package.

Halimbawa, kung gagawa ka ng script na tinatawag na `account.ts`, maaari mong isagawa ang script
sa command line sa pamamagitan ng pagpapatakbo ng:

```bash

ts-node account.ts

```

Kakailanganin mo ring **[ikonekta ang node](../node/avail-node-management.md)** bago patakbuhin
ang mga script.

:::

Upang bumuo ng account, patakbuhin ang sumusunod na script:

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

Halimbawang Resulta:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info Format ng Address

Habang ipinapatupad ang Avail gamit ang [Substrate](https://substrate.io/), mga generic na Substrate na address
laging magsimula sa 5 at sundin ang **[format ng SS58 address](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

:::info Pag-derive ng key at paglagda sa algoritmo

Ang mga dahilan ng paggamit `sr25519` ay nakabalangkas **[dito](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**.

:::

I-save ang bagong nabuong address at mnemonic na parirala para sa mga susunod na hakbang.

:::caution Pamamahala ng Key

Ang seed na parirala ay ang iyong account key, na kumokontrol sa iyong account.
Hindi mo dapat itago ang iyong seed na parirala sa device na mayroon o maaaring may access sa
internet connection. Ang seed na parirala ay dapat na isulat at itago sa non-digital
na medium.

:::

## Tumanggap ng Mga AVL Testnet Token {#receive-avl-testnet-tokens-1}

Tumungo sa [Polygon faucet](https://faucet.polygon.technology).

Sa faucet page, piliin ang `DA (Test Token)` at ang `DA Network` bilang network at token,
ayon sa pagkakabanggit. I-paste ang iyong account address at i-click ang **Isumite**. Ang paglipat ay tatagal ng hanggang
minuto para makumpleto.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Sa matagumpay na paglipat, dapat na mayroon na ang iyong account ng hindi zero na balanse. Kung nahaharap ka sa anumang isyu sa pagkuha ng mga token mula sa faucet, mangyaring ipa-abot sa [team ng suporta](https://support.polygon.technology/support/home).

### Tingnan ang Balanse sa `@polkadot/api`

Gamitin ang sumusunod na script upang tingnan ang balanse ng account na kakagawa mo lang:

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

Halimbawang Resulta:

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> Dapat kang makakuha ng balanse bilang `0` kung ang account ay bagong likha at hindi mo pa nagamit ang faucet.
> Dapat mo ring makita ang kumpirmasyon ng transaksyon.

:::tip Paggamit Ng Avail Explorer

Para mas madali, maaari mong idagdag ang account na nabuo sa
`@polkadot/api`Avail Explorer UI upang magsagawa ng mga pagkilos ng account.

:::

## Isumite ang Bagong Transaksyon {#submit-a-new-transaction-1}

Maaari mong gamitin ang ibinigay na mga script sa seksyong ito upang lagdaan at isumite ang mga transaksyon.

:::note

Palitan ang `value` at ang `APP_ID` ng mga gusto mong isumite.
Gayundin, palitan ang mnemonic string ng iyo.

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

Ang sumusunod na script ay lumilikha ng application key:

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

Ang sumusunod na script ay nagsusumite ng data:

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

Maaari kang magtungo sa [Avail Explorer](https://testnet.polygonavail.net/#/explorer), at na
dapat ilista ng kamakailang listahan ng kaganapan ang iyong transaksyon. Maaari mong i-click ang kaganapan at palawakin ito upang tingnan
ang mga detalye ng transaksyon.

:::info Paano makakuha ng mga garantiya na ang data sa likod ng transaksyon ay magagamit?

Maaari mong gamitin ang sumusunod na kahilingang curl upang tingnan ang antas ng kumpiyansa. Palitan lang ang block number ng
gusto mong makakuhang mga garantiya sa availability.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
