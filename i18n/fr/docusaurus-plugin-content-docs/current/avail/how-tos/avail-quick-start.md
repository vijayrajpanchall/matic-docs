---
id: avail-quick-start
title: Comment utiliser Polygon Avail
sidebar_label: Quick Start
description: Apprenez à utiliser Polygon Avail
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

# Comment utiliser Polygon Avail {#how-to-use-polygon-avail}

:::note

Nous travaillons à améliorer nombre des fonctionnalités actuelles. Nous vous remercions d'utiliser notre testnet et d'encourager vos précieux commentaires via l'un de nos [<ins>canaux communautaires</ins>](https://polygon.technology/community/).

:::

## Générer un compte Avail {#generate-an-avail-account}

Vous pouvez générer un compte en utilisant l'une des deux méthodes suivantes :
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

Rendez-vous sur [Avail Explorer](https://testnet.polygonavail.net/).

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Avail Explorer](https://testnet.polygonavail.net/)** est un fork
des **[applications Polkadot-JS](https://polkadot.js.org/)**. L'interface et la navigation sont les mêmes
si vous connaissez les applications Polkadot-JS.

:::

Accédez à l'onglet **Comptes** et cliquez sur le sous-onglet **Comptes**.

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info Format d'adresse

Comme Avail est implémentée à l'aide de [Substrate](https://substrate.io/), les adresses génériques de Substrate
commencent toujours par un 5 et suivent le **[format d'adresse SS58](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

Sur la page Comptes, cliquez sur le bouton **Ajouter un compte** et suivez les étapes dans la fenêtre contextuelle.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution Gestion des clés

La phrase secrète est votre clé de compte, qui contrôle votre compte.
Vous ne devez pas stocker votre phrase secrète sur un appareil qui a ou peut avoir accès à
une connexion Internet. La phrase secrète doit être écrite et stockée sur un support
non numérique.

Le stockage du fichier JSON de votre compte n'a pas besoin d'être aussi rigoureux que le stockage de la phrase secrète,
tant que vous utilisez un mot de passe fort pour chiffrer le fichier. Vous pouvez importer le fichier JSON pour
accéder à votre compte.

:::

## Recevoir des jetons AVL Testnet {#receive-avl-testnet-tokens}

Dans Avail Explorer, cliquez sur l'icône à côté du nom de votre compte pour
copier votre adresse.  Alternativement, vous pouvez copier l'adresse manuellement.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

Rendez-vous sur le [robinet Polygon](https://faucet.polygon.technology).

Sur la page du robinet, sélectionnez `DA Network`  et  `DA (Test Token)` comme réseau et jeton.
Collez l'adresse de votre compte et cliquez sur **Envoyer**. Le transfert peut prendre jusqu'à une
minute.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Une fois le transfert réussi, votre compte doit avoir un solde non nul. Si vous rencontrez des problèmes
lors de l'obtention des jetons du robinet, veuillez contacter
[l'équipe de soutien](https://support.polygon.technology/support/home).

## Envoyer une nouvelle transaction {#submit-a-new-transaction}

Dans Avail Explorer, accédez à l'onglet **Développeur** et cliquez sur
le sous-onglet **Éléments extrinsèques**.

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

Sélectionnez votre compte nouvellement créé.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

Il existe de nombreux éléments extrinsèques parmi lesquels choisir ; allez-y et sélectionnez
l'`dataAvailability`élément  extrinsèque dans le **menu déroulant extrinsèque**.

:::info Que sont les éléments extrinsèques ?

Les éléments extrinsèques sont une forme d'informations externes et peuvent être soit des transactions inhérentes, signées,
ou des transactions non signées. Plus de détails sur les éléments extrinsèques sont disponibles dans la
[Documentation de Substrate](https://docs.substrate.io/v3/concepts/extrinsics/).

:::

Vous pouvez ensuite utiliser le menu déroulant sur le côté droit pour créer une clé d'application ou
envoyer des données.

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

Dans cet exemple, `createApplicationKey` est utilisé pour créer une clé d'application.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

Entrez la valeur que vous souhaitez envoyer dans le cadre de cette transaction à l'aide de `App_ID`, ou
sans valeur de clé par défaut comme `0`.

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

Avant d'envoyer une transaction à l'aide de `App_ID`, il faut la créer à l'aide du champ `createApplicationKey`.

:::

Envoyez la transaction. Rendez-vous sur [Avail Explorer](https://testnet.polygonavail.net/#/explorer).
La liste des événements récents doit répertorier votre transaction. Vous pouvez cliquer sur l'événement et le développer pour vérifier
les détails de la transaction.

</TabItem>

<TabItem value="data">

Dans cet exemple, `submitBlockLengthProposal` est utilisé pour envoyer des données.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

Entrez les valeurs que vous souhaitez envoyer dans le cadre de cette transaction pour `row` et `col`.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

Envoyez la transaction. Rendez-vous sur [Avail Explorer](https://testnet.polygonavail.net/#/explorer).
La liste des événements récents doit répertorier votre transaction. Vous pouvez cliquer sur l'événement et le développer pour vérifier
les détails de la transaction.

</TabItem>
</Tabs>

:::info Comment obtenir des garanties que les données derrière la transaction sont disponibles ?

Nous avons résumé les détails de la vérification de la disponibilité des données et avons hébergé un client léger
pour votre usage. Tout ce que vous avez à faire est de cliquer sur le numéro de bloc en face de la transaction souhaitée et
voir tous les détails du bloc.

Vous verrez également un **facteur de confiance**. S'il affiche `0%`, laissez-lui un peu de temps et revérifiez-le plus tard.
Sinon, il doit afficher un niveau de confiance non nul indiquant la probabilité avec laquelle les données sous-jacentes
sont disponibles.

:::

</TabItem>
<TabItem value="library">

Alternativement, vous pouvez utiliser la console/typescript pour générer un compte Avail
via [`@polkadot/api`](https://polkadot.js.org/docs/). Créez un nouveau dossier et ajoutez le
bibliothèque JS à l'aide de `yarn add @polkadot/api` ou `npm install @polkadot/api`

:::info

Assurez-vous que les dépendances Typescript sont ajoutées pour exécuter le script. Ici,
`@polkadot/api` la version `7.9.1` est utilisée.

Vous pouvez utiliser `ts-node` pour exécuter des fichiers Typescript dans la console. Soit utiliser
`yarn add ts-node typescript '@types/node'` soit `npm i ts-node typescript '@types/node'`
installer les packages.

Par exemple, si vous créez un script appelé `account.ts`, vous pouvez exécuter le script
dans la ligne de commande en exécutant :

```bash

ts-node account.ts

```

Vous devrez également vous **[connecter à un nœud](../node/avail-node-management.md)** avant d'exécuter
les scripts.

:::

Pour générer un compte, exécutez le script suivant :

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

Résultat de l'échantillon :

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info Format d'adresse

Comme Avail est implémentée à l'aide de [Substrate](https://substrate.io/), les adresses génériques de Substrate
commencent toujours par un 5 et suivent le **[format d'adresse SS58](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

:::info Dérivation de clé et algorithme de signature

Les raisons d'utiliser `sr25519` sont décrites **[ici](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**.

:::

Enregistrez l'adresse et la phrase mnémonique nouvellement générées pour les prochaines étapes.

:::caution Gestion des clés

La phrase secrète est votre clé de compte, qui contrôle votre compte.
Vous ne devez pas stocker votre phrase secrète sur un appareil qui a ou peut avoir accès à
une connexion Internet. La phrase secrète doit être écrite et stockée sur un support
non numérique.

:::

## Recevoir des jetons AVL Testnet {#receive-avl-testnet-tokens-1}

Rendez-vous sur le [robinet Polygon](https://faucet.polygon.technology).

Sur la page du robinet, sélectionnez `DA (Test Token)` et `DA Network` comme jeton et réseau,
respectivement. Collez l'adresse de votre compte et cliquez sur **Envoyer**. Le transfert prendra jusqu'à une
minute.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Une fois le transfert réussi, votre compte doit avoir un solde non nul. Si vous rencontrez des problèmes pour obtenir des jetons du robinet, veuillez contacter [l'équipe de soutien](https://support.polygon.technology/support/home).

### Vérification du solde avec `@polkadot/api`

Utilisez le script suivant pour vérifier le solde du compte que vous venez de créer :

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

Résultat de l'échantillon :

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> Vous devriez obtenir le solde comme étant `0` si le compte est nouvellement créé et que vous n'avez pas utilisé le robinet.
> Vous devriez également voir la confirmation de la transaction.

:::tip Utiliser Avail Explorer

Pour plus de commodité, vous pouvez ajouter le compte que vous avez généré avec
`@polkadot/api`sur l'interface utilisateur d'Avail Explorer pour effectuer des actions relatives au compte.

:::

## Envoyer une nouvelle transaction {#submit-a-new-transaction-1}

Vous pouvez utiliser les scripts fournis dans cette section pour signer et envoyer des transactions.

:::note

Remplacez `value` et `APP_ID` par celles que vous souhaitez envoyer.
Remplacez également la chaîne mnémonique par la vôtre.

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

Le script suivant crée une clé d'application :

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

Le script suivant envoie des données :

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

Vous pouvez vous diriger vers [Avail Explorer](https://testnet.polygonavail.net/#/explorer), et la
liste des événements récents doit répertorier votre transaction. Vous pouvez cliquer sur l'événement et le développer pour vérifier
les détails de la transaction.

:::info Comment obtenir des garanties que les données derrière la transaction sont disponibles ?

Vous pouvez utiliser la requête curl suivante pour vérifier le niveau de confiance. Remplacez simplement le numéro de bloc par
celui pour lequel vous souhaitez obtenir des garanties de disponibilité.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
