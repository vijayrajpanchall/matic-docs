---
id: avail-quick-start
title: Polygon Avail nasıl kullanılır
sidebar_label: Quick Start
description: Polygon Avail'i nasıl kullanacağınızı öğrenin
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

# Polygon Avail nasıl kullanılır {#how-to-use-polygon-avail}

:::note

Mevcut özelliklerin çoğunu geliştirmek için çalışıyoruz. our kullanmanızı takdir ediyoruz ve [<ins>topluluk</ins>](https://polygon.technology/community/) kanallarımızdan biri aracılığıyla değerli geri bildiriminizi teşvik ediyoruz.

:::

## Avail Hesabı Oluşturma {#generate-an-avail-account}

Aşağıdaki iki yöntemden birini kullanarak hesap oluşturabilirsiniz:
- [Avail Gezgini](https://testnet.polygonavail.net/)
- Console/Typescript

<Tabs
defaultValue="explorer"
values={[
{ label: 'Avail Explorer', value: 'explorer', },
{ label: '@polkadot/api', value: 'library', },
]
}>
<TabItem value="explorer">

[Avail Gezgini](https://testnet.polygonavail.net/)'ne gidin.

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Avail Gezgini](https://testnet.polygonavail.net/)**, Polkadot-JS Uygulamalarının bir çataldır. Avail **[Gezgini, Polkadot-JS Uygulamalarının bir](https://polkadot.js.org/)** çataldır. Polkadot-JS Uygulamalarına aşina iseniz, arabirim ve
gezinti aynıdır.

:::

**Hesaplar** sekmesine gidin ve **Hesaplar** alt sekmesine tıklayın.

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info Adres Biçimi

Avail, [Substrate](https://substrate.io/) kullanılarak uygulandığından, genel Substrate adresleri
her zaman 5 ile başlar ve **[SS58 adres biçimini](https://docs.substrate.io/v3/advanced/ss58/)** takip eder.

:::

Hesaplar sayfasında, **Hesap ekle** düğmesine tıklayın ve açılır penceredeki adımları takip edin.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution Anahtar Yönetimi

Seed phrase, hesabınızı kontrol eden hesap anahtarınızdır.
Seed phrase'inizi internet bağlantısı olan veya erişime sahip olabilecek bir cihazda
saklamamalısınız. Seed phrase, not edilmeli ve dijital olmayan bir ortamda
saklanmalıdır.

Dosyayı şifrelemek için güçlü bir parola kullandığınız sürece, hesabınızın JSON dosyasını
kopyalamak, seed phrase'i saklamak kadar sıkı olmak zorunda değildir. Hesabınıza erişmek için JSON dosyasını
içe aktarabilirsiniz.

:::

## AVL Test Ağı Tokenlarını Alma {#receive-avl-testnet-tokens}

Avail Gezgini'nde, adresini kopyalamak için hesap adınızın yanındaki
simgeye tıklayın.  Alternatif olarak, adresi manuel olarak kopyalayabilirsiniz.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

[Polygon Faucet](https://faucet.polygon.technology)'e gidin.

Faucet sayfasında, ağ ve token olarak `DA (Test Token)` ve `DA Network` seçin.
Hesap adresinizi yapıştırın ve **Gönder**'e tıklayın. Transferin tamamlanması
sürecektir.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Başarılı bir aktarım sonrasında, hesabınızda artık sıfırdan farklı bir bakiye bulunmalıdır. Faucet üzerinden token alma konusunda
herhangi bir sorunla karşılaşırsanız,
lütfen [destek ekibi](https://support.polygon.technology/support/home) ile iletişime geçin.

## Yeni bir İşlem Gönderme {#submit-a-new-transaction}

Avail Gezgini'nde **Developer** (geliştirici) sekmesine gidin
ve **Extrinsics** (dışsallar) alt sekmesine tıklayın.

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

Yeni oluşturduğunuz hesabı seçin.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

Aralarından seçim yapabileceğiniz birçok extrinsic'ler vardır;
devam edin ve **extrinsic açılır menüsünden** `dataAvailability` dışsalını seçin.

:::info Extrinsic'ler (dışsallar) nedir?

Extrinsic'ler bir dış bilgi biçimidir ve ,
imzalı veya imzasız işlemler olabilir. Dış bilgiler (extrinsic'ler) hakkında daha fazla bilgiyi [Substrate belgelerinde](https://docs.substrate.io/v3/concepts/extrinsics/) bulabilirsiniz.

:::

Daha sonra, bir uygulama anahtarı oluşturmak veya veri göndermek için
sağ taraftaki açılır menüyü kullanabilirsiniz.

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

Bu örnekte, bir uygulama anahtarı oluşturmak için `createApplicationKey` kullanılmaktadır.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

Bu işlemin bir parçası olarak göndermek istediğiniz değeri `App_ID`'yi kullanarak veya
varsayılan anahtar değeri olmadan `0` olarak girin.

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

`App_ID`'yi kullanarak işlem göndermeden önce, bu, `createApplicationKey` alanı kullanılarak oluşturulmalıdır.

:::

İşlemi gönderin. [Avail Gezgini](https://testnet.polygonavail.net/#/explorer)'ne gidin. Son olay listesinde işleminiz görünmelidir. Olaya tıklayabilir ve işlem ayrıntılarını kontrol etmek için
genişletebilirsiniz.

</TabItem>

<TabItem value="data">

Bu örnekte, verileri göndermek için `submitBlockLengthProposal` kullanılır.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

Bu işlemin bir parçası olarak göndermek istediğiniz değerleri `row` ve `col` için girin.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

İşlemi gönderin. [Avail Gezgini](https://testnet.polygonavail.net/#/explorer)'ne gidin. Son olay listesinde işleminiz görünmelidir. Olaya tıklayabilir ve işlem ayrıntılarını kontrol etmek için
genişletebilirsiniz.

</TabItem>
</Tabs>

:::info İşlemin arkasındaki verilerin mevcut olduğuna dair garanti nasıl alınır?

Veri kullanılabilirliğini doğrulamanın iç yüzünü özetledik ve kullanımınız için
bir hafif istemci barındırdık. Tek yapmanız gereken, istediğiniz işlemin karşısındaki blok numarası üzerine tıklamak ve
tüm blok detaylarını görmek.

Ayrıca bir **confidence factor** (güven faktörü) göreceksiniz. `0%` görünüyorsa, biraz zaman tanıyın ve daha sonra tekrar kontrol edin.
Aksi takdirde, temel alınan verilerin mevcut olma olasılığını gösteren sıfırdan farklı bir güven düzeyi göstermelidir.

:::

</TabItem>
<TabItem value="library">

Alternatif olarak,
[`@polkadot/api`](https://polkadot.js.org/docs/) aracılığıyla bir Avail hesabı oluşturmak için console/typescript'i kullanabilirsiniz. Yeni bir klasör oluşturun ve
`yarn add @polkadot/api` veya `npm install @polkadot/api` kullanarak JS kitaplığını ekleyin.

:::info

Betiği çalıştırmak için Typescript bağımlılıklarının eklendiğinden emin olun. Burada
`@polkadot/api`sürümü `7.9.1` kullanılmaktadır.

Konsolda Typescript dosyalarını çalıştırmak için `ts-node` kullanabilirsiniz. Paketleri yüklemek için `yarn add ts-node typescript '@types/node'` veya
`npm i ts-node typescript '@types/node'`
kullanın.

Örneğin, `account.ts` adında betik oluşturursanız, betiği
komut satırında aşağıdaki komutu çalıştırarak yürütebilirsiniz:

```bash

ts-node account.ts

```

Ayrıca betikleri çalıştırmadan önce **[bir düğüme bağlanmanız](../node/avail-node-management.md)**
gerekecektir.

:::

Hesap oluşturmak için aşağıdaki betiği çalıştırın:

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

Örnek Sonuç:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info Adres Biçimi

Avail, [Substrate](https://substrate.io/) kullanılarak uygulandığından, genel Substrate adresleri
her zaman 5 ile başlar ve **[SS58 adres biçimini](https://docs.substrate.io/v3/advanced/ss58/)** takip eder.

:::

:::info Anahtar türetme ve imzalama algoritması

`sr25519` kullanma nedenleri **[burada](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)** özetlenmiştir.

:::

Sonraki adımlar için yeni oluşturulan adresi ve hatırlatıcı ifadeyi saklayın.

:::caution Anahtar Yönetimi

Seed phrase, hesabınızı kontrol eden hesap anahtarınızdır.
Seed phrase'inizi internet bağlantısı olan veya erişime sahip olabilecek bir cihazda
saklamamalısınız. Seed phrase, not edilmeli ve dijital olmayan bir ortamda
saklanmalıdır.

:::

## AVL Test Ağı Tokenlarını Alma {#receive-avl-testnet-tokens-1}

[Polygon Faucet](https://faucet.polygon.technology)'e gidin.

Faucet sayfasında, token ve ağ olarak sırasıyla `DA Network` ve `DA (Test Token)`
seçin. Hesap adresinizi yapıştırın ve **Gönder**'e tıklayın. Transferin tamamlanması bir dakika kadar
sürecektir.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Başarılı bir aktarım sonrasında, hesabınızda artık sıfırdan farklı bir bakiye bulunmalıdır. Faucet üzerinden token alma konusunda herhangi bir sorun yaşarsanız, lütfen [destek ekibine](https://support.polygon.technology/support/home) erişin.

### `@polkadot/api` ile Bakiye Kontrolü

Yeni oluşturduğunuz hesabın bakiyesini denetlemek için aşağıdaki betiği kullanın:

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

Örnek Sonuç:

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> Hesap yeni açılmışsa ve fauceti kullanmadıysanız bakiyeyi `0` olarak bakiye almanız gerekir. Ayrıca işlemin onayını da görmeniz gerekir.

:::tip Avail Gezgini Kullanma

Kolaylık sağlamak için, hesap işlemlerini gerçekleştirmek üzere, `@polkadot/api` ile oluşturduğunuz
Avail Gezgini kullanıcı arabirimine ekleyebilirsiniz.

:::

## Yeni bir İşlem Gönderme {#submit-a-new-transaction-1}

İşlemleri imzalamak ve göndermek için bu bölümde sağlanan betikleri kullanabilirsiniz.

:::note

`value` ve `APP_ID`'yi göndermek istediklerinizle değiştirin.
Ayrıca, hatırlatıcı dizeyi kendinizinkiyle değiştirin.

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

Aşağıdaki betik, bir uygulama anahtarı oluşturur:

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

Aşağıdaki betik, veri gönderir:

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

[Avail Gezginine](https://testnet.polygonavail.net/#/explorer) gittiğinizde, son olay listesi,
işleminizi listelemelidir. Olaya tıklayabilir ve işlem ayrıntılarını kontrol etmek için
genişletebilirsiniz.

:::info İşlemin arkasındaki verilerin mevcut olduğuna dair garanti nasıl alınır?

Güven seviyesini denetlemek için aşağıdaki curl isteğini kullanabilirsiniz. Sadece kullanılabilirlik garantisi almak istediğiniz blok numarasını
değiştirmeniz yeterlidir.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
