---
id: avail-quick-start
title: Cómo utilizar Polygon Avail
sidebar_label: Quick Start
description: Conoce cómo utilizar Polygon Avail
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

# Cómo utilizar Polygon Avail {#how-to-use-polygon-avail}

:::note

Estamos trabajando en mejorar muchas de las características actuales. Apreciamos que usted utilice nuestra red de pruebas y animamos sus valiosos comentarios a través de uno de nuestros [<ins>canales de la comunidad</ins>](https://polygon.technology/community/).

:::

## Genera una cuenta de Avail {#generate-an-avail-account}

Puedes generar una cuenta utilizando uno de los dos métodos:
- [Explorador Avail](https://testnet.polygonavail.net/)
- Consola/Typescript

<Tabs
defaultValue="explorer"
values={[
{ label: 'Avail Explorer', value: 'explorer', },
{ label: '@polkadot/api', value: 'library', },
]
}>
<TabItem value="explorer">

Dirígete al [explorador Avail](https://testnet.polygonavail.net/).

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[El explorador avail](https://testnet.polygonavail.net/)** es una bifurcación
de **[las Aplicaciones de Polkadot-JS](https://polkadot.js.org/)**. La interfaz y la navegación son las mismas
si estás familiarizado con las Aplicaciones de Polkadot-JS.

:::

Navega hasta la pestaña de **Cuentas** y haz clic en la subpestaña de **Cuentas**.

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info Formato de dirección

Como Avail se implementa utilizando [Substrate](https://substrate.io/), las direcciones genéricas de Substrate
siempre comienzan con un 5 y siguen el **[formato de dirección SS58](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

En la página de Cuentas, haz clic en el botón **Añadir cuenta** y sigue los pasos de la ventana emergente.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution Gestión de claves

La frase de partida es la clave de tu cuenta, que controla tu cuenta.
No debes almacenar tu frase de partida en un dispositivo que tenga o pueda tener acceso a
una conexión a internet. La frase de partida debe anotarse y almacenarse en un medio
no digital.

El almacenamiento del archivo JSON de tu cuenta no tiene por qué ser tan riguroso como el almacenamiento de la frase de partida,
siempre que utilices una contraseña fuerte para cifrar el archivo. Puedes importar el archivo JSON para
acceder a tu cuenta.

:::

## Recibe tokens de la red de pruebas AVL {#receive-avl-testnet-tokens}

En el explorador Avail, haz clic en el ícono junto al nombre de tu cuenta para
copiar tu dirección.  También puedes copiar la dirección manualmente.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

Dirígete al grifo de [Polygon](https://faucet.polygon.technology).

En la página del grifo, selecciona `DA Network`  y  `DA (Test Token)` como la red y el token. Pega la dirección de tu cuenta y haz clic en **Enviar**. La transferencia tardará hasta un
minuto en completarse.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Una vez realizada la transferencia con éxito, tu cuenta debería tener un saldo distinto de cero. Si tienes algún problema para
obtener tokens del grifo, ponte en contacto con el [equipo de soporte](https://support.polygon.technology/support/home).

## Envía una nueva transacción {#submit-a-new-transaction}

En el explorador Avail, dirígete a la pestaña de **Desarrolladores** y haz clic en
la subpestaña de **Extrínsecos**.

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

Selecciona tu cuenta recién creada.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

Hay muchos extrínsecos para elegir; continúa y selecciona
el `dataAvailability`extrínseco en el **menú desplegable de extrínsecos**.

:::info ¿Qué son los extrínsecos?

Los extrínsecos son una forma de información externa y pueden ser inherentes, transacciones firmadas
o transacciones sin firmar. Para más detalles sobre los extrínsecos, consulta la
[documentación de Substrate](https://docs.substrate.io/v3/concepts/extrinsics/).

:::

A continuación, puedes utilizar el menú desplegable de la derecha para crear una clave de aplicación o
enviar datos.

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

En este ejemplo, `createApplicationKey` se utiliza para crear una clave de aplicación.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

Introduce el valor que deseas enviar como parte de esta transacción utilizando el `App_ID`, o
sin un valor de clave predeterminado como `0`.

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

Antes de enviar una transacción utilizando `App_ID`, debe crearse utilizando el campo `createApplicationKey`.

:::

Envía la transacción. Dirígete al [explorador Avail](https://testnet.polygonavail.net/#/explorer).
En la lista de eventos recientes debería aparecer tu transacción. Puedes hacer clic en el evento y expandirlo para consultar
los detalles de la transacción.

</TabItem>

<TabItem value="data">

En este ejemplo, `submitBlockLengthProposal` se utiliza para enviar datos.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

Introduce los valores que deseas enviar como parte de esta transacción para `row` y `col`.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

Envía la transacción. Dirígete al [explorador Avail](https://testnet.polygonavail.net/#/explorer).
En la lista de eventos recientes debería aparecer tu transacción. Puedes hacer clic en el evento y expandirlo para consultar
los detalles de la transacción.

</TabItem>
</Tabs>

:::info ¿Cómo obtener garantías de que los datos de la transacción están disponibles?

Hemos eliminado la necesidad de verificar la disponibilidad de los datos y hemos alojado un cliente ligero
para tu uso. Todo lo que necesitas es hacer clic sobre el número de bloque de la transacción deseada y
consultar todos los detalles del bloque.

También verás un **factor de confianza**. Si aparece `0%`, dale un poco de tiempo y vuelve a comprobarlo más tarde.
De lo contrario, debería mostrar un nivel de confianza distinto de cero que indique la probabilidad con la que los datos subyacentes
están disponibles.

:::

</TabItem>
<TabItem value="library">

También puedes utilizar la consola/typescript para generar una cuenta Avail
a través de [`@polkadot/api`](https://polkadot.js.org/docs/). Crea una nueva carpeta y añade la
librería JS usando `yarn add @polkadot/api` o `npm install @polkadot/api`

:::info

Asegúrate de que se añaden las dependencias de Typescript para ejecutar la secuencia de comandos. Aquí,
`@polkadot/api` se utiliza la versión `7.9.1`.

Puedes usar `ts-node` para ejecutar los archivos Typescript en la consola. Utiliza
`yarn add ts-node typescript '@types/node'` o `npm i ts-node typescript '@types/node'`
para instalar los paquetes.

Por ejemplo, si creas una secuencia de comandos llamada `account.ts`, puedes ejecutar la secuencia de comandos
en la línea de comandos ejecutando:

```bash

ts-node account.ts

```

También tendrás que **[conectarte a un nodo](../node/avail-node-management.md)** antes de ejecutar
los scripts.

:::

Para generar una cuenta, ejecuta la siguiente secuencia de comandos:

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

Resultado de la muestra:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info Formato de dirección

Como Avail se implementa utilizando [Substrate](https://substrate.io/), las direcciones genéricas de Substrate
siempre comienzan con un 5 y siguen el **[formato de dirección SS58](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

:::info Algoritmo de derivación y firma de claves

Las razones para usar `sr25519` se describen **[aquí](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**.

:::

Guarda la dirección recién generada y la frase mnemónica para realizar los siguientes pasos.

:::caution Gestión de claves

La frase de partida es la clave de tu cuenta, que controla tu cuenta.
No debes almacenar tu frase de partida en un dispositivo que tenga o pueda tener acceso a
una conexión a internet. La frase de partida debe anotarse y almacenarse en un medio
no digital.

:::

## Recibe tokens de la red de pruebas AVL {#receive-avl-testnet-tokens-1}

Dirígete al grifo de [Polygon](https://faucet.polygon.technology).

En la página del grifo, selecciona `DA (Test Token)` y `DA Network` como el token y la red,
respectivamente. Pega la dirección de tu cuenta y haz clic en **Enviar**. La transferencia tardará hasta un
minuto en completarse.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Una vez realizada la transferencia con éxito, tu cuenta debería tener un saldo distinto de cero. Si tienes algún problema para obtener tokens del grifo, ponte en contacto con el [equipo de soporte](https://support.polygon.technology/support/home).

### Comprobación de saldo con `@polkadot/api`

Utiliza la secuencia de comandos para comprobar el saldo de la cuenta que acabas de crear:

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

Resultado de la muestra:

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> Deberías obtener el saldo como `0` si la cuenta es recién creada y no has utilizado el grifo. También deberías ver la confirmación de la transacción.

:::tip Uso del explorador Avail

Para mayor comodidad, puedes añadir la cuenta que generaste con
`@polkadot/api`en la interfaz de usuario del explorador Avail para realizar acciones en la cuenta.

:::

## Envía una nueva transacción {#submit-a-new-transaction-1}

Puedes utilizar los scripts proporcionados en esta sección para firmar y enviar transacciones.

:::note

Sustituye `value` y `APP_ID` por las que desees enviar.
Además, sustituye la cadena mnemónica por la tuya propia.

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

La siguiente secuencia de comandos crea una clave de aplicación:

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

La siguiente secuencia de comandos envía los datos:

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

Puedes dirigirte al [explorador Avail](https://testnet.polygonavail.net/#/explorer), y en la
lista de eventos recientes debería aparecer tu transacción. Puedes hacer clic en el evento y expandirlo para consultar
los detalles de la transacción.

:::info ¿Cómo obtener garantías de que los datos de la transacción están disponibles?

Puedes utilizar el siguiente comando curl para comprobar el nivel de confianza. Solo tienes que sustituir el número de bloque por el
que desees que obtenga garantías de disponibilidad.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
