---
id: avail-quick-start
title: Wie man mit Polygon Avail arbeitet
sidebar_label: Quick Start
description: Hier erfahren Sie, wie man mit Polygon Avail arbeitet
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

# Wie man mit Polygon Avail arbeitet {#how-to-use-polygon-avail}

:::note

Wir arbeiten daran, viele der aktuellen Features zu verbessern. Wir freuen uns, dass du unser Testnet verwendest, und dein wertvolles Feedback über einen unserer [<ins>community</ins>](https://polygon.technology/community/) ermutigst.

:::

## Ein Avail-Konto erstellen {#generate-an-avail-account}

Es gibt zwei Möglichkeiten, ein Konto zu erstellen:
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

Gehen Sie zu [Avail Explorer](https://testnet.polygonavail.net/)

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

Bei **[Avail Explorer](https://testnet.polygonavail.net/)** handelt es sich um eine Fork der **[Polkadot-JS App](https://polkadot.js.org/)** Die Benutzeroberfläche und Navigation sind gleich,
wenn Sie mit Polkadot-JS Apps vertraut sind.

:::

Navigieren Sie **zur Registerkarte** **Konten** und klicken am entsprechenden Reiter auf Konten.

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info Adressformat

Da Avail mithilfe von [Substrate ](https://substrate.io/)implementiert wird, beginnen generische Substrate-Adressen immer mit einer 5 und orientieren sich am S**[S58-Adressformat.](https://docs.substrate.io/v3/advanced/ss58/)**

:::

Klicken Sie auf **der** Kontoseite auf Konto hinzufügen und gehen anhand der Anweisungen im Popup-Fenster vor.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution Key-Management

Die Seed-Phrase ist Ihr Account-Key, mit dem Ihr Konto angesteuert wird. Sie sollten Ihre Seed-Phrase nicht auf einem Gerät speichern, das Zugang zu einer Internetverbindung hat oder haben könnte. Die See-Phrase sollten Sie aufschreiben und nicht digital speichern.

Die Speicherung der JSON-Datei Ihres Kontos muss nicht so kompliziert sein wie die Speicherung der Seed-Phrase, solange Sie ein starkes Passwort zur Verschlüsselung der Datei verwenden. Sie können die JSON Datei importieren und damit auf Ihr Konto zugreifen.

:::

## AVL Testnet-Token erhalten {#receive-avl-testnet-tokens}

Klicken Sie im Avail Explorer auf das Symbol neben Ihrem Kontonamen und kopieren Sie Ihre Adresse. Alternativ können Sie die Adresse auch manuell kopieren.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

Gehen Sie zum [Polygon Faucet](https://faucet.polygon.technology)

Wählen Sie auf der Hahnseite `DA Network`und a`DA (Test Token)`ls Netzwerk und Token aus. Fügen Sie Ihre Account-Adresse und ein klicken Sie auf **einreichen**. Die Übertragung wird bis zu eine Minute dauern.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Nach erfolgreicher Übertragung sollte Ihr Konto jetzt einen Saldo ungleich Null aufweisen. Sollten Sie beim Erhalten von Token aus der Hahnseite auf Probleme stoßen, wenden Sie sich bitte an das [Support-Team](https://support.polygon.technology/support/home).

## Eine neue Transaktion einreichen {#submit-a-new-transaction}

Klicken Sie im Avail Explorer auf den Tab E**ntwickler **und klicken Sie auf den Untertab **Extrinsik**.

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

Wählen Sie Ihren neu erstellten Account aus.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

Sie können aus vielen verschiedenen Extrinsics wählen. Wählen Sie das `dataAvailability`Extrinsic aus dem e**xtrinsischen Dropdown-Menü **aus.

:::info Was sind Extrinsics?

Extrinsics sind eine Form von externen Informationen und können entweder inhärente, signierte oder unsignierte Transaktionen sein. Weitere Details über Extrinsics finden Sie in der [Substrate-Dokumentation](https://docs.substrate.io/v3/concepts/extrinsics/).

:::

Sie können dann das Dropdown-Menü auf der rechten Seite verwenden, um einen Anwendungsschlüssel zu erstellen oder Daten zu übermitteln.

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

In diesem Beispiel wird `createApplicationKey`genutzt, um einen Anwendungsschlüssel zu erstellen.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

Geben Sie den Wert ein, den Sie als Teil dieser Transaktion einreichen wollen o`App_ID`der ohne einen Standard Key-Wert als.`0`

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

Bevor Sie eine Transaktion einreichen und dabei `App_ID`nutzen, muss sie über das Fe`createApplicationKey`ld erstellt werden.

:::

Eine Transaktion einreichen. Gehen Sie zum [Avail Explorer](https://testnet.polygonavail.net/#/explorer) In der Liste der letzten Ereignisse sollte Ihre Transaktion aufgeführt sein. Sie können auf das Ereignis klicken und es vergrößern, um sich die Details der Transaktion anzusehen.

</TabItem>

<TabItem value="data">

In diesem Beispiel wurde `submitBlockLengthProposal`genutzt, um Daten zu übermitteln.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

Geben Sie die Werte ein, die Sie als Teil dieser Transaktion für u`row`nd ü`col`bermitteln möchten.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

Eine Transaktion einreichen. Gehen Sie zum [Avail Explorer](https://testnet.polygonavail.net/#/explorer) In der Liste der letzten Ereignisse sollte Ihre Transaktion aufgeführt sein. Sie können auf das Ereignis klicken und es vergrößern, um sich die Details der Transaktion anzusehen.

</TabItem>
</Tabs>

:::info Wie können Sie sicherstellen, dass die zur Transaktion gehörigen Daten verfügbar sind?

Wir haben die Feinheiten der Überprüfung der Datenverfügbarkeit abstrahiert und für Ihre Nutzung einen Light Client gehostet. Sie müssen lediglich auf die Blocknummer der gewünschten Transaktion klicken, um alle Details des Blocks zu sehen.

Sie werden zudem einen **Vertrauens-Faktor** sehen. Wenn dieser `0%`anzeigt, geben Sie dem Vorgang etwas Zeit und versuchen Sie es später erneut. Andernfalls sollte es ein Konfidenzniveau ungleich Null aufweisen, das die Wahrscheinlichkeit angibt, mit der die zugrunde liegenden Daten verfügbar sind.

:::

</TabItem>
<TabItem value="library">

Alternativ können Sie die Konsole/das Typoskript verwenden, um einen Avail-Account zu erstellen via.[`@polkadot/api`](https://polkadot.js.org/docs/) Erstellen Sie einen neuen Ordner und fügen Sie die JS-Bibliothek mit `yarn add @polkadot/api`oder hi`npm install @polkadot/api`nzu.

:::info

Stellen Sie sicher, dass die Typescript-Abhängigkeiten für die Ausführung des Skripts hinzugefügt werden. Hier`@polkadot/api` wurde die Version `7.9.1`genutzt.

Sie können `ts-node`nutzen, um Typescript-Dateien in der Konsole auszuführen. Verwenden Sie entweder `yarn add ts-node typescript '@types/node'` oder `npm i ts-node typescript '@types/node'`
um die Pakete zu installieren.

Wenn Sie zum Beispiel ein Skript namens `account.ts`erstellen möchten, können Sie das Skript in der Kommandozeile ausführen, indem Sie Folgendes ausführen:

```bash

ts-node account.ts

```

Zudem müssen Sie einen K**[noten verbinden,](../node/avail-node-management.md)** bevor Sie die Skripte ausführen können.

:::

Führen Sie das folgende Skript aus, um einen Account zu erstellen:

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

Beispielergebnis:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info Adressformat

Da Avail mithilfe von [Substrate ](https://substrate.io/)implementiert wird, beginnen generische Substrate-Adressen immer mit einer 5 und orientieren sich am S**[S58-Adressformat.](https://docs.substrate.io/v3/advanced/ss58/)**

:::

:::info Key-Ableitung und Signaturalgorithmus

Die Gründe für die Nutzung von `sr25519`werden **[hier](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)** dargestellt.

:::

Speichern Sie die neu generierte Adresse und die mnemonische Phrase für die nächsten Schritte.

:::caution Key-Management

Die Seed-Phrase ist Ihr Account-Key, mit dem Ihr Konto angesteuert wird. Sie sollten Ihre Seed-Phrase nicht auf einem Gerät speichern, das Zugang zu einer Internetverbindung hat oder haben könnte. Die See-Phrase sollten Sie aufschreiben und nicht digital speichern.

:::

## AVL Testnet-Token erhalten {#receive-avl-testnet-tokens-1}

Gehen Sie zum [Polygon Faucet](https://faucet.polygon.technology)

Wählen Sie auf der Hahnseite `DA (Test Token)`und a`DA Network`ls Token bzw. als Netzwerk aus. Fügen Sie Ihre Account-Adresse und ein klicken Sie auf **einreichen**. Die Übertragung wird bis zu eine Minute dauern.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Nach erfolgreicher Übertragung sollte Ihr Konto jetzt einen Saldo ungleich Null aufweisen. Wenn Sie auf irgendwelche Probleme stoßen, wenn Sie Token von der Hahnseite erhalten wollen, kontaktieren Sie bitte das [Support-Team](https://support.polygon.technology/support/home)

### Saldo-Kontrolle mit `@polkadot/api`

Verwenden Sie das folgende Skript, um den Saldo des soeben erstellten Accounts zu überprüfen:

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

Beispielergebnis:

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> Ihr Saldo sollte `0`betragen, wenn Sie einen neuen Account erstellt und den Hahn bisher nicht genutzt haben. Sie sollten auch die Bestätigung der Transaktion sehen können.

:::tip Nutzung des Avail-Explorers

Der Einfachheit halber können Sie den Account, den Sie mit k`@polkadot/api`reiert haben,  zur Avail Explorer-Benutzeroberfläche hinzufügen, um Kontoaktionen durchzuführen.

:::

## Eine neue Transaktion einreichen {#submit-a-new-transaction-1}

Sie können die bereitgestellten Skripte in diesem Abschnitt verwenden, um Transaktionen zu unterzeichnen und einzureichen.

:::note

Ersetzen Sie `value`und m`APP_ID`it den Transaktionen, die Sie einreichen möchten. Ersetzen Sie auch den mnemonic String durch Ihren eigenen.

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

Das folgende Skript erzeugt einen Anwendungs-Key:

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

Das folgende Skript übermittelt Daten:

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

Sie können zum [Avail-Explorer gehen](https://testnet.polygonavail.net/#/explorer), wo in der Liste der jüngsten Ereignisse Ihre Transaktion aufgelistet sein sollte. Sie können auf das Ereignis klicken und es vergrößern, um sich die Details der Transaktion anzusehen.

:::info Wie können Sie sicherstellen, dass die zur Transaktion gehörigen Daten verfügbar sind?

Sie können die folgende Curl-Anfrage nutzen, um das Zuverlässigkeitsniveau zu überprüfen. Ersetzen Sie einfach die Blocknummer mit der, für die Sie eine Verfügbarkeitsgarantie erhalten möchten.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
