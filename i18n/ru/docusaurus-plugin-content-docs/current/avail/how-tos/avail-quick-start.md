---
id: avail-quick-start
title: Как использовать Polygon Avail
sidebar_label: Quick Start
description: Узнайте, как использовать Polygon Avail
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

# Как использовать Polygon Avail {#how-to-use-polygon-avail}

:::note

Мы работаем над улучшением многих текущих функций. Мы ценим вас с помощью нашей testnet и поощряем ваши ценные отзывы через один из наших [<ins>каналов сообщества</ins>](https://polygon.technology/community/).

:::

## Создание аккаунта Avail {#generate-an-avail-account}

Вы можете создать аккаунт, воспользовавшись одним из двух методов:
- [Обозреватель Avail](https://testnet.polygonavail.net/)
- Консоль/Typescript

<Tabs
defaultValue="explorer"
values={[
{ label: 'Avail Explorer', value: 'explorer', },
{ label: '@polkadot/api', value: 'library', },
]
}>
<TabItem value="explorer">

Перейдите в раздел [Обозреватель Avail](https://testnet.polygonavail.net/).

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Обозреватель Avail](https://testnet.polygonavail.net/)** — это форк
**[Polkadot-JS Apps](https://polkadot.js.org/)**. Интерфейс и навигация такие же,
если вы знакомы с Polkadot-JS Apps.

:::

Перейдите на вкладку **Accounts** (Аккаунты) и откройте подвкладку **Аккаунты**.

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info Формат адреса

Поскольку Avail реализован с помощью [Substrate](https://substrate.io/), общие адреса Substrate

всегда начинаются с цифры 5 имеют **[формат адреса SS58](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

На странице Accounts (Аккаунты) нажмите кнопку **Add account** (Добавить аккаунт) и выполните шаги, указанные во всплывающем окне.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution Управление ключами

Сид-фраза является вашим ключом к аккаунту, который контролирует ваш аккаунт.
Вам не следует хранить свою сид-фразу на устройстве, которое имеет или может иметь доступ к
интернет-соединению. Сид-фразу следует записать и хранить на нецифровом
носителе.

Хранение файла JSON вашего аккаунта не требует таких же мер предосторожности, как хранение сид-фразы,
при условии, что вы используете надежный пароль для шифрования этого файла. Вы можете импортировать файл JSON для обеспечения
доступа к вашему аккаунту.

:::

## Получение токенов тестовой сети AVL {#receive-avl-testnet-tokens}

В обозревателе Avail щелкните кнопкой мыши значок рядом с именем аккаунта,
чтобы скопировать адрес.  Вместо этого вы можете скопировать адрес вручную.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

Перейдите в раздел [Polygon faucet](https://faucet.polygon.technology).

На странице faucet выберите `DA Network` и `DA (Test Token)` в качестве сети и токена.
Вставьте адрес аккаунта и нажмите **Submit** (Отправить). Выполнение трансфера займет до одной
минуты.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

После успешного трансфера остаток на вашем аккаунте должен стать ненулевым. Если у вас возникнут проблемы
при получении токенов из faucet, обратитесь в
[службу поддержки](https://support.polygon.technology/support/home).

## Отправка новой транзакции {#submit-a-new-transaction}

В обозревателе Avail перейдите на вкладку **Developer** (Разработчик) и откройте
подвкладку **Extrinsics** (Внешние параметры).

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

Выберите вновь созданный аккаунт.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

Существует большой набор внешних данных; выберите
внешний параметр `dataAvailability` из **раскрывающегося меню внешних параметров**.

:::info Что такое внешние параметры?

Внешние параметры — это вид внешней информации, которая может представлять собой изначальные данные, подписанные транзакции
или не подписанные транзакции. Более подробные сведения о внешних параметрах содержатся в
[документации по Substrate](https://docs.substrate.io/v3/concepts/extrinsics/).

:::

Вы можете затем использовать раскрывающееся меню с правой стороны для создания ключа приложения или
для отправки данных.

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

В этом примере `createApplicationKey` используется для создания ключа приложения.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

Введите значение, которое вы хотите отправить как часть этой транзакции, используя `App_ID`, или
без значения ключа по умолчанию в виде `0`.

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

Прежде чем отправить транзакцию с помощью `App_ID`, он должен быть создан с помощью поля `createApplicationKey`.

:::

Отправьте транзакцию. Перейдите в раздел [Обозреватель Avail](https://testnet.polygonavail.net/#/explorer).
В списке недавних событий должна быть указана ваша транзакция. Вы можете щелкнуть кнопкой мыши на событии и раскрыть его, чтобы проверить
детали транзакции.

</TabItem>

<TabItem value="data">

В этом примере `submitBlockLengthProposal` используется для отправки данных.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

Введите значения, которые вы хотите отправить как часть этой транзакции, для `row` и `col`.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

Отправьте транзакцию. Перейдите в раздел [Обозреватель Avail](https://testnet.polygonavail.net/#/explorer).
В списке недавних событий должна быть указана ваша транзакция. Вы можете щелкнуть кнопкой мыши на событии и раскрыть его, чтобы проверить
детали транзакции.

</TabItem>
</Tabs>

:::info Как получить гарантии того, что данные, лежащие в основе транзакции, доступны?

Мы обобщили основные детали проверки доступности данных и разместили тонкий клиент,
который вы можете использовать. От вас требуется только щелкнуть кнопкой мыши номер блока для требуемой транзакции и
посмотреть все сведения о блоке.

Вы также увидите **коэффициент достоверности**. Если он показывает `0%`, подождите немного и проверьте его снова позже.
В противном случае он должен показывать ненулевой уровень достоверности, указывающий вероятную степень
доступности базовых данных.

:::

</TabItem>
<TabItem value="library">

Вместо этого вы можете использовать консоль/typescript для создания аккаунта Avail
через [`@polkadot/api`](https://polkadot.js.org/docs/). Создайте новую папку и добавьте
библиотеку JS с помощью `yarn add @polkadot/api` или `npm install @polkadot/api`

:::info

Убедитесь, что добавлены зависимости Typescript для запуска скрипта. Здесь используется
`@polkadot/api` версии `7.9.1`.

Вы можете использовать `ts-node` для исполнения файлов Typescript в консоли. Используйте
`yarn add ts-node typescript '@types/node'` или `npm i ts-node typescript '@types/node'`
для установки пакетов.

Например, если вы создадите скрипт с именем `account.ts`, вы можете исполнить этот скрипт
в командной строке, запустив:

```bash

ts-node account.ts

```

Вам также нужно будет **[подключиться к ноду](../node/avail-node-management.md)** перед запуском
скриптов.

:::

Для создания аккаунта запустите следующий скрипт:

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

Пример результата:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info Формат адреса

Поскольку Avail реализован с помощью [Substrate](https://substrate.io/), общие адреса Substrate

всегда начинаются с цифры 5 имеют **[формат адреса SS58](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

:::info Алгоритм создания ключа и подписи

Причины использования `sr25519` описываются **[здесь](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**.

:::

Сохраните вновь сгенерированный адрес и мнемоническую фразу для использования на следующих шагах.

:::caution Управление ключами

Сид-фраза является вашим ключом к аккаунту, который контролирует ваш аккаунт.
Вам не следует хранить свою сид-фразу на устройстве, которое имеет или может иметь доступ к
интернет-соединению. Сид-фразу следует записать и хранить на нецифровом
носителе.

:::

## Получение токенов тестовой сети AVL {#receive-avl-testnet-tokens-1}

Перейдите в раздел [Polygon faucet](https://faucet.polygon.technology).

На странице faucet выберите `DA (Test Token)` и `DA Network` в качестве токена и сети
соответственно. Вставьте адрес аккаунта и нажмите **Submit** (Отправить). Выполнение трансфера займет до одной
минуты.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

После успешного трансфера остаток на вашем аккаунте должен стать ненулевым. Если у вас возникнут проблемы с получением токенов из faucet, обратитесь в [службу поддержки](https://support.polygon.technology/support/home).

### Проверка остатка с помощью `@polkadot/api`

Используйте следующий скрипт для проверки остатка на только что созданном вами аккаунте:

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

Пример результата:

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> Вы должны получить остаток в виде `0`, если аккаунт был только что создан и вы не использовали faucet.
> Кроме того, вы должны увидеть подтверждение транзакции.

:::tip Использование обозревателя Avail

Для удобства вы можете добавить аккаунт, созданный вами с помощью
`@polkadot/api` в пользовательском интерфейсе обозревателя Avail для выполнения действий с аккаунтом.

:::

## Отправка новой транзакции {#submit-a-new-transaction-1}

Вы можете использовать предоставленные скрипты в этом разделе для подписания и отправки транзакций.

:::note

Замените `value` и `APP_ID` теми значениями, которые вы хотите отправить.
Кроме того, замените мнемоническую строку своей собственной.

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

Следующий скрипт создает ключ приложения:

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

Следующий скрипт отправляет данные:

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

Вы можете перейти в [Обозреватель Avail](https://testnet.polygonavail.net/#/explorer), при этом
в списке недавних событий должна быть указана ваша транзакция. Вы можете щелкнуть кнопкой мыши на событии и раскрыть его, чтобы проверить
детали транзакции.

:::info Как получить гарантии того, что данные, лежащие в основе транзакции, доступны?

Вы можете использовать следующий curl-запрос для проверки уровня достоверности. Просто замените номер блока на тот
номер, для которого вы хотите получить гарантии доступности.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
