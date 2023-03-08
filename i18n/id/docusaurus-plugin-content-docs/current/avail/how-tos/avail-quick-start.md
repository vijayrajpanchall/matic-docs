---
id: avail-quick-start
title: Bagaimana menggunakan Polygon Avail
sidebar_label: Quick Start
description: Pelajari bagaimana menggunakan Polygon Avail
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

# Bagaimana menggunakan Polygon Avail {#how-to-use-polygon-avail}

:::note

Kami sedang mengerjakan peningkatan banyak fitur saat ini. Kami menghargai Anda menggunakan testnet dan mendorong umpan balik berharga melalui salah satu [<ins>saluran komunitas</ins>](https://polygon.technology/community/) kami.

:::

## Membuat Akun Avail {#generate-an-avail-account}

Anda dapat membuat akun menggunakan salah satu dari dua metode:
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

Buka [Avail Explorer](https://testnet.polygonavail.net/).

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Avail Explorer](https://testnet.polygonavail.net/)** adalah percabangan
dari **[Polkadot-JS Apps](https://polkadot.js.org/)**. Antarmuka dan navigasinya sama
jika Anda sudah terbiasa dengan Polkadot-JS Apps.

:::

Arahkan ke tab **Accounts** (Akun) dan klik subtab **Accounts** (Akun).

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info Format Alamat

Karena Avail diimplementasikan menggunakan [Substrate](https://substrate.io/), alamat Substrate generik
selalu dimulai dengan 5 dan mengikuti **[format alamat SS58](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

Di halaman Akun, klik tombol **Add account** (Tambahkan akun) dan ikuti langkah-langkah dalam jendela tongolan.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution Manajemen Kunci

Frasa benih adalah kunci akun, yang mengendalikan akun Anda.
Anda seharusnya tidak menyimpan frasa benih Anda di perangkat yang memiliki atau mungkin memiliki akses ke
koneksi internet. Frasa benih seharusnya dicatat dan disimpan di media
nondigital.

Menyimpan file JSON akun Anda tidak harus seketat menyimpan frasa benih,
asalkan Anda menggunakan kata sandi yang kuat untuk mengenkripsi file tersebut. Anda dapat mengimpor file JSON untuk
mengakses akun Anda.

:::

## Menerima Token Testnet AVL {#receive-avl-testnet-tokens}

Di Avail Explorer, klik ikon di sebelah nama akun Anda untuk
menyalin alamat Anda.  Atau, Anda dapat menyalin alamatnya secara manual.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

Buka [Polygon faucet](https://faucet.polygon.technology).

Di halaman faucet, pilih `DA Network`  dan  `DA (Test Token)` sebagai jaringan dan tokennya.
 Tempelkan alamat akun Anda dan klik **Submit** (kirim). Transfer membutuhkan waktu hingga satu
menit untuk selesai.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Setelah transfer berhasil, akun Anda seharusnya kini memiliki saldo lebih dari nol. Jika ada kendala
memperoleh token dari faucet, hubungi
[tim dukungan](https://support.polygon.technology/support/home).

## Mengirimkan Transaksi Baru {#submit-a-new-transaction}

Di Avail Explorer, arahkan tab **Developer** (Pengembang) dan klik
subtab **Extrinsics** (Ekstrinsik).

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

Pilih akun yang baru Anda buat.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

Ada banyak pilihan ekstrinsik; lanjutkan dan pilih
ekstrinsik `dataAvailability` dari **extrinsic dropdown menu** (menu tarik turun ekstrinsik).

:::info Apa itu ekstrinsik?

Ekstrinsik adalah bentuk informasi eksternal dan dapat berupa bawaannya (inherent), transaksi yang ditandatangani,
atau Transaksi yang tidak ditandatangani. Detail lebih lanjut tentang ekstrinsik tersedia di
[Substrate documentation](https://docs.substrate.io/v3/concepts/extrinsics/) (dokumentasi Substrate).

:::

Kemudian Anda dapat menggunakan menu tarik turun di sisi kanan untuk membuat kunci aplikasi atau
mengirimkan data.

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

Dalam contoh ini, `createApplicationKey` digunakan untuk membuat kunci aplikasi.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

Masukkan nilai yang ingin dikirimkan sebagai bagian dari transaksi ini menggunakan `App_ID`, atau
tanpa nilai kunci default sebagai `0`.

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

Sebelum mengirim transaksi menggunakan `App_ID`, ini harus dibuat menggunakan kolom `createApplicationKey`.

:::

Kirimkan transaksi. Buka [Avail Explorer](https://testnet.polygonavail.net/#/explorer).
Daftar acara terbaru seharusnya mencantumkan transaksi Anda. Anda dapat mengeklik acara ini dan memperluasnya untuk melihat
perincian transaksi.

</TabItem>

<TabItem value="data">

Dalam contoh ini, `submitBlockLengthProposal` digunakan untuk mengirimkan data.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

Masukkan nilai yang ingin dikirimkan sebagai bagian dari transaksi ini untuk `row` dan `col`.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

Kirimkan transaksi. Buka [Avail Explorer](https://testnet.polygonavail.net/#/explorer).
Daftar acara terbaru seharusnya mencantumkan transaksi Anda. Anda dapat mengeklik acara ini dan memperluasnya untuk melihat
perincian transaksi.

</TabItem>
</Tabs>

:::info Bagaimana memperoleh jaminan bahwa data di balik transaksi tersedia?

Kami telah meringkaskan seluk beluk memverifikasi ketersediaan data dan telah menyediakan klien ringan
untuk Anda gunakan. Anda tinggal mengeklik nomor blok pada transaksi yang Anda inginkan dan
melihat semua perincian blok.

Anda juga akan melihat **faktor keyakinan**. Jika faktor ini menunjukkan `0%`, biarkan waktu sebentar dan periksa kembali nanti.
Dalam situasi lain, faktor ini seharusnya menunjukkan tingkat keyakinan lebih dari nol yang mengindikasikan probabilitas dengan data yang mendasari
tersedia.

:::

</TabItem>
<TabItem value="library">

Atau, Anda dapat menggunakan console/typescript untuk membuat akun Avail
melalui [`@polkadot/api`](https://polkadot.js.org/docs/). Buat folder baru dan tambahkan
pustaka JS menggunakan `yarn add @polkadot/api` atau `npm install @polkadot/api`

:::info

Pastikan dependensi Typescript ditambahkan untuk menjalankan skrip ini. Di sini,
`@polkadot/api` versi `7.9.1` digunakan.

Anda dapat menggunakan `ts-node` untuk mengeksekusi file Typescript di console. Bisa gunakan
`yarn add ts-node typescript '@types/node'` atau `npm i ts-node typescript '@types/node'`
untuk menginstal paket.

Misalnya, jika Anda membuat skrip yang disebut `account.ts`, Anda dapat mengeksekusi skrip ini
di baris perintah dengan menjalankan:

```bash

ts-node account.ts

```

Anda juga akan perlu **[terhubung ke node](../node/avail-node-management.md)** sebelum menjalankan
skrip tersebut.

:::

Untuk membuat akun, jalankan skrip berikut:

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

Hasil Sampel:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info Format Alamat

Karena Avail diimplementasikan menggunakan [Substrate](https://substrate.io/), alamat Substrate generik
selalu dimulai dengan 5 dan mengikuti **[format alamat SS58](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

:::info Derivasi kunci dan algoritme tanda tangan

Alasan penggunaan `sr25519` diuraikan **[di sini](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**.

:::

Simpan alamat yang baru dibuat dan frasa mnemonik untuk langkah berikutnya.

:::caution Manajemen Kunci

Frasa benih adalah kunci akun, yang mengendalikan akun Anda.
Anda seharusnya tidak menyimpan frasa benih Anda di perangkat yang memiliki atau mungkin memiliki akses ke
koneksi internet. Frasa benih seharusnya dicatat dan disimpan di media
nondigital.

:::

## Menerima Token Testnet AVL {#receive-avl-testnet-tokens-1}

Buka [Polygon faucet](https://faucet.polygon.technology).

Di halaman faucet, pilih `DA (Test Token)` dan `DA Network` sebagai token dan jaringannya,
secara berurutan. Tempelkan alamat akun Anda dan klik **Submit** (kirim). Transfer akan membutuhkan waktu hingga satu
menit untuk selesai.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Setelah transfer berhasil, akun Anda seharusnya kini memiliki saldo lebih dari nol. Jika ada kendala memperoleh token dari faucet, hubungi [tim dukungan](https://support.polygon.technology/support/home).

### Pemeriksaan Saldo dengan `@polkadot/api`

Gunakan skrip berikut untuk memeriksa saldo akun yang baru Anda buat:

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

Hasil Sampel:

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> Anda seharusnya menerima saldo sebesar `0` jika akun baru dibuat dan Anda belum menggunakan faucet tersebut.
> Anda seharusnya juga melihat konfirmasi transaksi.

:::tip Menggunakan Avail Explorer

Untuk kemudahan, Anda dapat menambahkan akun yang Anda buat dengan
`@polkadot/api`di UI Avail Explorer untuk melakukan tindakan akun.

:::

## Mengirimkan Transaksi Baru {#submit-a-new-transaction-1}

Anda dapat menggunakan skrip yang tersedia pada bagian ini untuk menandatangani dan mengirimkan transaksi.

:::note

Ganti `value` dan `APP_ID` dengan yang ingin dikirimkan.
Ganti juga string mnemoniknya dengan yang milik Anda.


:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

Skrip berikut menghasilkan kunci aplikasi:

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

Skrip berikut mengirimkan data:

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

Anda dapat membuka [Avail Explorer](https://testnet.polygonavail.net/#/explorer) dan
daftar acara terbaru seharusnya mencantumkan transaksi Anda. Anda dapat mengeklik acara ini dan memperluasnya untuk melihat
perincian transaksi.

:::info Bagaimana memperoleh jaminan bahwa data di balik transaksi tersedia?

Anda dapat menggunakan permintaan curl berikut untuk melihat tingkat keyakinan. Ganti saja angka bloknya dengan
angka yang Anda inginkan untuk mendapatkan jaminan ketersediaan.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
