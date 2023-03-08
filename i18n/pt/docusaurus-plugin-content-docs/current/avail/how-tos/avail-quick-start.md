---
id: avail-quick-start
title: Como usar a Polygon Avail
sidebar_label: Quick Start
description: Aprenda a usar a Polygon Avail
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

# Como usar a Polygon Avail {#how-to-use-polygon-avail}

:::note

Estamos trabalhando para melhorar muitos dos recursos atuais. Agradecemos o uso do nosso testnet e incentivamos o seu feedback valioso através de um dos nossos [<ins>canais de comunidade</ins>](https://polygon.technology/community/).

:::

## Gerar uma conta da Avail {#generate-an-avail-account}

Pode gerar uma conta através de um de dois métodos:
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

Vá para o [Avail Explorer](https://testnet.polygonavail.net/).

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

O **[Avail Explorer](https://testnet.polygonavail.net/)** é um fork
das **[aplicações Polkadot-JS](https://polkadot.js.org/)**. A interface e navegação são as mesmas
se estiver familiarizado com as aplicações Polkadot-JS.

:::

Navegue até ao separador **Contas** e clique no subseparador **Contas**.

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info Formato do endereço

Uma vez que a Avail é implementada usando a [Substrate](https://substrate.io/), os endereços genéricos da Substrate
começam sempre com um 5 e seguem o **[formato de endereço SS58](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

Na página Contas, clique no botão **Adicionar conta** e siga as etapas da janela de pop-up.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution Gestão da chave

A seed phrase é a chave que controla a sua conta.
Não deve armazenar a sua seed phrase num dispositivo que tenha ou possa ter acesso a
uma ligação à Internet. A seed phrase deve ser escrita e guardada num suporte
não digital.

O armazenamento do ficheiro JSON da sua conta não tem de ser tão rigoroso quanto o armazenamento da seed phrase,
desde que use uma palavra-passe forte para encriptar o ficheiro. Pode importar o ficheiro JSON para
aceder à sua conta.

:::

## Receber tokens da AVL testnet {#receive-avl-testnet-tokens}

No Avail Explorer, clique no ícone que se encontra ao lado do nome da sua conta para
copiar o seu endereço.  Como alternativa, pode copiar o endereço manualmente.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

Vá para a página [Polygon faucet](https://faucet.polygon.technology).

Na página faucet, selecione `DA Network`  e  `DA (Test Token)` como rede e token.
Cole o endereço da sua conta e clique em **Enviar**. A transferência demora até um
minuto a ficar concluída.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Depois de uma transferência bem-sucedida, a sua conta deve apresentar um saldo diferente de zero. Se deparar com algum problema
ao obter tokens da faucet, contacte a
[equipa de suporte](https://support.polygon.technology/support/home).

## Enviar uma nova transação {#submit-a-new-transaction}

No Avail Explorer, navegue até ao separador **Programador** e clique no
subseparador **Extrínsecos**.

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

Selecione a conta recém-criada.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

Tem muitos extrínsecos à escolha; selecione
o extrínseco `dataAvailability` no **menu pendente Extrínsecos**.

:::info O que são extrínsecos?

Os extrínsecos são uma forma de informação externa e podem ser inerentes, transações assinadas
ou transações não assinadas. Encontra mais detalhes sobre os extrínsecos na
[documentação da Substrate](https://docs.substrate.io/v3/concepts/extrinsics/).

:::

Pode então usar o menu pendente do lado direito para criar uma chave da aplicação ou
enviar dados.

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

Neste exemplo, `createApplicationKey` é usado para criar uma chave da aplicação.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

Introduza o valor que pretende enviar como parte desta transação usando o `App_ID`, ou
sem um valor de chave padrão como `0`.

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

Antes de enviar uma transação usando `App_ID`, este tem de ser criado usando o campo `createApplicationKey`.

:::

Envie a transação. Vá para o [Avail Explorer](https://testnet.polygonavail.net/#/explorer).
A lista de eventos recentes deve apresentar a sua transação. Pode clicar no evento e o expandir para verificar
os detalhes da transação.

</TabItem>

<TabItem value="data">

Neste exemplo, `submitBlockLengthProposal` é usado para enviar dados.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

Introduza os valores que pretende enviar como parte desta transação para `row` e `col`.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

Envie a transação. Vá para o [Avail Explorer](https://testnet.polygonavail.net/#/explorer).
A lista de eventos recentes deve apresentar a sua transação. Pode clicar no evento e o expandir para verificar
os detalhes da transação.

</TabItem>
</Tabs>

:::info Como obter a garantia de que os dados por trás da transação estão disponíveis?

Nós retirámos o essencial da verificação da disponibilidade de dados e hospedámos um light client
para sua utilização. Só precisa de clicar no número do bloco relativo à transação pretendida e
ver todos os pormenores do bloco.

Também verá um **fator de confiança**. Se mostrar `0%`, aguarde algum tempo e verifique mais tarde.
Caso contrário, deve mostrar um nível de confiança diferente de zero, indicativo da probabilidade de disponibilidade
dos dados subjacentes.

:::

</TabItem>
<TabItem value="library">

Como alternativa, pode usar o console/typescript para gerar uma conta na Avail
através de [`@polkadot/api`](https://polkadot.js.org/docs/). Crie uma pasta nova e adicione a
biblioteca JS através da utilização de `yarn add @polkadot/api` ou `npm install @polkadot/api`

:::info

Tenha o cuidado de adicionar dependências de Typescript para executar o script. Aqui, é usada a versão
`@polkadot/api``7.9.1`.

Pode utilizar `ts-node` para executar ficheiros Typescript na consola. Utilize
`yarn add ts-node typescript '@types/node'` ou `npm i ts-node typescript '@types/node'`
para instalar os pacotes.

Por exemplo, se criar um script chamado `account.ts`, pode executar o script
na linha de comandos ao executar:

```bash

ts-node account.ts

```

Também terá de se **[ligar a um nó](../node/avail-node-management.md)** antes de executar
os scripts.

:::

Para gerar uma conta, execute o seguinte script:

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

Exemplo de resultado:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info Formato do endereço

Uma vez que a Avail é implementada usando a [Substrate](https://substrate.io/), os endereços genéricos da Substrate
começam sempre com um 5 e seguem o **[formato de endereço SS58](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

:::info Derivação da chave e algoritmo de assinatura

Os motivos da utilização de `sr25519` são realçados **[aqui](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**.

:::

Guarde o endereço e frase mnemónica recém-gerados para as etapas seguintes.

:::caution Gestão da chave

A seed phrase é a chave que controla a sua conta.
Não deve armazenar a sua seed phrase num dispositivo que tenha ou possa ter acesso a
uma ligação à Internet. A seed phrase deve ser escrita e guardada num suporte
não digital.

:::

## Receber tokens da AVL testnet {#receive-avl-testnet-tokens-1}

Vá para a página [Polygon faucet](https://faucet.polygon.technology).

Na página faucet, selecione `DA (Test Token)` e `DA Network` como token e rede,
respetivamente. Cole o endereço da sua conta e clique em **Enviar**. A transferência demora até um
minuto a ficar concluída.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Depois de uma transferência bem-sucedida, a sua conta deve apresentar um saldo diferente de zero. Se deparar com algum problema ao obter tokens da faucet, contacte a [equipa de suporte](https://support.polygon.technology/support/home).

### Verificação do saldo com `@polkadot/api`

Utilize o script que se segue para verificar o saldo da conta que acabou de criar:

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

Exemplo de resultado:

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> Deve obter o saldo como `0` se a conta for recente e não tiver utilizado a faucet.
> Deve também ver a confirmação da transação.

:::tip Utilizar o Avail Explorer

Para maior conveniência, pode adicionar a conta que gerou com
`@polkadot/api` na UI do Avail Explorer para executar ações na conta.

:::

## Enviar uma nova transação {#submit-a-new-transaction-1}

Pode utilizar os scripts fornecidos nesta seção para assinar e enviar transações.

:::note

Substitua `value` e `APP_ID` pelos que pretende enviar.
Além disso, substitua o string mnemónico por um seu.

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

O script seguinte cria uma chave da aplicação:

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

O script seguinte envia dados:

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

Pode ir para o [Avail Explorer](https://testnet.polygonavail.net/#/explorer), e a
lista de eventos recentes deve apresentar a sua transação. Pode clicar no evento e o expandir para verificar
os detalhes da transação.

:::info Como obter a garantia de que os dados por trás da transação estão disponíveis?

Pode utilizar o seguinte pedido de curl para verificar o nível de confiança. Basta substituir o número do bloco por
um para o qual pretende obter garantias de disponibilidade.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
