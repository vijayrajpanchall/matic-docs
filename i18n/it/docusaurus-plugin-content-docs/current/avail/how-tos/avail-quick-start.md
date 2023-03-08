---
id: avail-quick-start
title: Come usare Polygon Avail
sidebar_label: Quick Start
description: Scopri come usare Polygon Avail
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

# Come usare Polygon Avail {#how-to-use-polygon-avail}

:::note

Stiamo lavorando a migliorare molte delle attuali funzioni. Apprezziamo che tu utilizzi la nostra testnet e incoraggi i tuoi preziosi feedback attraverso uno dei [<ins>nostri canali comunitari</ins>](https://polygon.technology/community/).

:::

## Creare un account Avail {#generate-an-avail-account}

Puoi creare un account utilizzando uno di questi due metodi:
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

Vai a [Avail Explorer](https://testnet.polygonavail.net/).

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Avail Explorer](https://testnet.polygonavail.net/)** è un fork
di **[Polkadot-JS Apps](https://polkadot.js.org/)**. L'interfaccia e la navigazione sono le stesse se hai dimestichezza con Polkadot-JS Apps.

:::

Passa alla scheda **Account** e clicca sulla sottoscheda **Account**.

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info Formato indirizzo

Poiché Avail viene implementato usando [Substrate](https://substrate.io/), gli indirizzi generici Substrate
iniziano sempre con un 5 e seguono il **[formato indirizzo SS58 ](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

Nella pagina Account, clicca sul pulsante **Aggiungi account** e segui i passaggi nella finestra pop-up.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution Gestione delle chiavi

La frase seed è la chiave del tuo account, che controlla il tuo account. Non dovresti memorizzare la tua frase seed su un dispositivo che ha o potrebbe avere accesso a una connessione Internet. La frase seed dovrebbe essere annotata e memorizzata su un mezzo non digitale.

La memorizzazione del file JSON del tuo account non deve essere così rigorosa come la memorizzazione della frase seed, purché utilizzi una password forte per crittografare il file. Puoi importare il file JSON per accedere al tuo account.

:::

## Ricevere token AVL testnet {#receive-avl-testnet-tokens}

Sull'Explorer di Avail, clicca sull'icona accanto al nome del tuo account per copiare il tuo indirizzo. In alternativa, puoi copiare l'indirizzo manualmente.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

Vai al [faucet di Polygon](https://faucet.polygon.technology).

Nella pagina del faucet, seleziona `DA Network`  e  `DA (Test Token)` come rete e token.
Incolla l'indirizzo del tuo account e clicca su **Invia**. Il trasferimento ci impiegherà fino a un minuto per essere completato.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Dopo che il trasferimento è riuscito, il tuo account dovrebbe ora avere un saldo diverso da zero. Se incontri dei problemi nell'ottenere token dal faucet, contatta il [team di supporto](https://support.polygon.technology/support/home).

## Invia una nuova transazione {#submit-a-new-transaction}

Sull'Explorer di Avail, vai alla scheda **Sviluppatore** e clicca sulla
sottoscheda **Estrinseco**.

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

Seleziona il tuo account appena creato.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

Ci sono molti estrinseci da cui scegliere; vai avanti e seleziona l'`dataAvailability` estrinseco dal **menù a discesa degli estrinseci**.

:::info Cosa sono gli estrinseci?

Gli estrinseci sono una forma di informazione esterna e possono essere intrinseci, transazioni firmate, o transazioni non firmate. Ulteriori dettagli sugli estrinseci sono disponibili nella [documentazione del Substrate](https://docs.substrate.io/v3/concepts/extrinsics/).

:::

Puoi quindi utilizzare il menù a discesa sul lato destro per creare una chiave di applicazione o inviare i dati.

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

In questo esempio, `createApplicationKey` viene usato per creare una chiave di applicazione.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

Inserisci il valore che vuoi inviare come parte di questa transazione utilizzando il `App_ID`, o
senza un valore chiave predefinito come `0`.

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

Prima di inviare una transazione utilizzando `App_ID`, deve essere creata usando il campo `createApplicationKey`.

:::

Invia la transazione. Vai a [Avail Explorer](https://testnet.polygonavail.net/#/explorer).
L'elenco degli eventi recenti dovrebbe elencare la tua transazione. Puoi cliccare sull'evento ed espanderlo per verificare i dettagli della transazione.

</TabItem>

<TabItem value="data">

In questo esempio, `submitBlockLengthProposal` è usato per inviare i dati.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

Inserisci i valori che vuoi inviare come parte di questa transazione per `row` e `col`.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

Invia la transazione. Vai a [Avail Explorer](https://testnet.polygonavail.net/#/explorer).
L'elenco degli eventi recenti dovrebbe elencare la tua transazione. Puoi cliccare sull'evento ed espanderlo per verificare i dettagli della transazione.

</TabItem>
</Tabs>

:::info Come ottenere garanzie che i dati dietro la transazione sono disponibili?

Abbiamo estratto il nocciolo della verifica della disponibilità dei dati e abbiamo ospitato un client leggero per il tuo utilizzo. Tutto quello che devi fare è cliccare sul numero di blocco rispetto alla transazione desiderata e vedere tutti i dettagli del blocco.

Vedrai anche un **fattore di affidabilità**. Se mostra `0%`, dagli un po' di tempo e ricontrollalo più tardi.
In caso contrario, dovrebbe mostrare un livello di affidabilità non zero che indica la probabilità con cui i dati sottostanti sono disponibili.

:::

</TabItem>
<TabItem value="library">

In alternativa, puoi utilizzare la console/onsole/typescript per generare un account Avail tramite [`@polkadot/api`](https://polkadot.js.org/docs/). Crea una nuova cartella e aggiungi la library JS utilizzando `yarn add @polkadot/api` o `npm install @polkadot/api`

:::info

Assicurati che per eseguire lo script siano state aggiunte le dipendenze Typescript, Qui,
`@polkadot/api` è utilizzata la versione `7.9.1`.

Puoi utilizzare `ts-node` per eseguire i file Typescript nella console. O utilizzare
`yarn add ts-node typescript '@types/node'` o `npm i ts-node typescript '@types/node'`
per installare i pacchetti.

Ad esempio, se crei uno script chiamato `account.ts`, puoi eseguire lo script
nella riga di comando eseguendo:

```bash

ts-node account.ts

```

Dovrai anche **[connetterti a un nodo](../node/avail-node-management.md)** prima di eseguire
gli script.

:::

Per generare un account, esegui il seguente script:

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

Risultato del campione:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info Formato indirizzo

Poiché Avail viene implementato usando [Substrate](https://substrate.io/), gli indirizzi generici Substrate
iniziano sempre con un 5 e seguono il **[formato indirizzo SS58 ](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

:::info Derivazione della chiave e algoritmo di firma

I motivi per l'utilizzo di `sr25519` sono illustrati **[qui](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**.

:::

Salva l'indirizzo appena creato e la frase mnemonica per i passaggi successivi.

:::caution Gestione delle chiavi

La frase seed è la chiave del tuo account, che controlla il tuo account. Non dovresti memorizzare la tua frase seed su un dispositivo che ha o potrebbe avere accesso a una connessione Internet. La frase seed dovrebbe essere annotata e memorizzata su un mezzo non digitale.

:::

## Ricevere token AVL testnet {#receive-avl-testnet-tokens-1}

Vai al [faucet di Polygon](https://faucet.polygon.technology).

Nella pagina del faucet, seleziona `DA (Test Token)` e `DA Network` come token e rete,
rispettivamente. Incolla l'indirizzo del tuo account e clicca su **Invia**. Il trasferimento richiederà fino a un minuto per essere completato.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Dopo che il trasferimento è riuscito, il tuo account dovrebbe ora avere un saldo diverso da zero. Se incontri dei problemi nell'ottenere token dal faucet, contatta il [team di supporto](https://support.polygon.technology/support/home).

### Verifica il saldo con `@polkadot/api`

Usa il seguente script per controllare il saldo dell'account che hai appena creato:

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

Risultato del campione:

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> Dovresti ottenere il saldo come `0` se l'account è stato appena creato e non hai utilizzato il faucet. Dovresti anche vedere la conferma della transazione.

:::tip Usare Avail Explorer

Per comodità, puoi aggiungere l'account che hai creato con
`@polkadot/api`nell'interfaccia utente di Avail Explorer per eseguire azioni sull'account.

:::

## Invia una nuova transazione {#submit-a-new-transaction-1}

Puoi utilizzare gli script forniti in questa sezione per firmare e inviare le transazioni.

:::note

Sostituisci `value` e `APP_ID` con quelli che vuoi inviare.
Inoltre, sostituisci la stringa mnemonica con la tua.

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

Il seguente script crea una chiave di applicazione:

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

Il seguente script invia i dati:

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

Puoi andare su [Avail Explorer](https://testnet.polygonavail.net/#/explorer), e
l'elenco degli eventi recenti dovrebbe elencare la tua transazione. Puoi cliccare sull'evento ed espanderlo per verificare i dettagli della transazione.

:::info Come ottenere garanzie che i dati dietro la transazione sono disponibili?

Puoi utilizzare la seguente richiesta curl per controllare il livello di affidabilità. Basta sostituire il numero del blocco con quello per cui vuoi ottenere garanzie di disponibilità.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
