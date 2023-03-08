---
id: avail-quick-start
title: วิธี การใช้ Polygon avail
sidebar_label: Quick Start
description: เรียนรู้ วิธี การใช้ Polygon avail
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

# วิธี การใช้ Polygon avail {#how-to-use-polygon-avail}

:::note

เรากำลังทำงานในการปรับปรุงคุณสมบัติปัจจุบันหลายอย่างเราขอขอบคุณคุณที่ใช้เช็คเน็ตของเรา และสนับสนุนข้อเสนอแนะที่มีค่าของคุณผ่านหนึ่งใน[<ins>ช่องทางของชุมชน</ins>](https://polygon.technology/community/)ของเรา

:::

## สร้าง บัญชี avail {#generate-an-avail-account}

คุณ สามารถ สร้าง บัญชี โดย ใช้ วิธี หนึ่ง ใน สอง วิธี ดังนี้
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

ไปยัง [avail explorer](https://testnet.polygonavail.net/)

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Avail Explorer](https://testnet.polygonavail.net/)** คือส้อม**[ของ แอพ ของ Polkadot-JS](https://polkadot.js.org/)**อินเตอร์เฟซ และ ระบบนำทาง เป็น อันเดียวกัน
หาก คุณ มีความรู้ กับ แอป Polkadot-JS

:::

ไปยัง แท็บ **บัญชี** และ คลิก แท็บ ย่อย **บัญชี**

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info รูปแบบ ที่อยู่

ตามที่ avail ถูกสร้าง โดย ใช้ [Substrate](https://substrate.io/) ที่อยู่ Substrate ทั่วไป
เริ่ม ด้วย 5 อย่างสม่ำเสมอ และ ติดตาม **[รูปแบบ ที่อยู่ SS58](https://docs.substrate.io/v3/advanced/ss58/)**

:::

บนหน้า บัญชี ให้ คลิก ปุ่ม **เพิ่ม บัญชี** และ ดำเนินการ ตามขั้นตอน ซึ่งระบุไว้ ใน หน้าต่าง pop-up

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution การจัดการ คีย์

วลี Seed คือ คีย์ ของ บัญชี คุณ ซึ่ง ควบคุม บัญชี ของคุณ
คุณ ไม่ควร เก็บ วลี Seed ของคุณ บน อุปกรณ์ ซึ่ง สามารถ หรือ อาจจะ สามารถ เข้าถึง
การเชื่อมต่อ กับ อินเทอร์เน็ต วลี Seed ควร ถูกบันทึกไว้ และ ถูกเก็บไว้ ใน พื้นที่
ซึ่งไม่ใช่ พื้นที่ ดิจิทัล

ในการ เก็บไว้ ไฟล์ JSON ของ บัญชี ของคุณ คุณ ไม่ต้อง ดำเนินการ เข้มงวด เท่ากับ การเก็บไว้ ซึ่ง วลี Seed
ต่อเมื่อ คุณ ใช้ รหัสผ่าน ที่ แข็งแรง เพื่อ เข้ารหัส ไฟล์ คุณสามารถ นำเข้า ไฟล์ JSON เพื่อ
เข้าถึง บัญชี ของคุณ

:::

## รับ โทเค็น AVL Testnet {#receive-avl-testnet-tokens}

ในระบบ avail explorer คลิก ไอคอน ซึ่งตั้งอยู่ ใกล้ ชื่อ บัญชี ของคุณ เพื่อ
คัดลอก ที่อยู่ ของคุณ  หรือ คุณ สามารถ คัดลอก ที่อยู่ ด้วยตนเอง

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

ไปยัง [Polygon faucet](https://faucet.polygon.technology)

บนหน้า faucet เลือก `DA Network` และ `DA (Test Token)` เป็น เครือข่าย และ โทเค็น
วาง ที่อยู่ บัญชี ของคุณ และ คลิก **ส่ง** การ โอน จะดำเนินการ ภายใน ไม่เกิน หนึ่ง
นาที ให้แล้วเสร็จ

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

เมื่อ การโอน ประสบความสำเร็จ แล้ว บัญชี ของคุณ ควร แสดง ยอดคงเหลือ ซึ่งไม่เท่ากับ ศูนย์ หาก คุณ ประสบ ปัญหาใดๆ
เกี่ยวกับ การับ โทเค็น จาก faucet โปรด ติดต่อ
[ทีมสนับสนุน](https://support.polygon.technology/support/home)

## ส่ง ธุรกรรม ใหม่ {#submit-a-new-transaction}

ใน ระบบ avail explorer ไปยัง แท็บ **นักพัฒนา** และ คลิก
แท็บ ย่อย **ภายนอก**

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

เลือก บัญชี ที่ คุณ พึ่ง สร้างมา

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

มี ข้อมูล ภายนอก มากมาย ซึ่ง คุณ สามารถ เลือก ได้ จึง เลือก
 `dataAvailability` ข้อมูลภายนอก จาก **เมนู เลื่อนลง ของ ข้อมูลภายนอก**

:::info ข้อมูลภายนอก คือ อะไร

ข้อมูลภายนอก เป็น รูปแบบ ข้อมูล ภายนอก และ สามารถ เป็น ธุรกรรม ซึ่งลงนาม โดยทั่วไป
หรือ ธุรกรรม ที่ ไม่ได้ ลงนาม รายละเอียด เพิ่มเติม เกี่ยวกับ ข้อมูลภายนอก สามารถ ดู ได้ ที่
[เอกสาร Substrate](https://docs.substrate.io/v3/concepts/extrinsics/)

:::

หลังจากนั้น คุณ สามารถใช้ เมนู เลื่อนลง ด้านข้าง ขวา เพื่อ สร้าง คีย์ แอปพลิเคชัน หรือ
ส่ง ข้อมูล

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

ตัวอย่าง นี้ `createApplicationKey` ใช้ เพื่อ สร้าง คีย์ แอปพลิเคชัน

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

ใส่ ค่า ที่ คุณ ต้องการ ส่ง เพื่อ เป็น ส่วน หนึ่ง ของ ธุรกรรม นี้ โดย ใช้ `App_ID` หรือ
โดย ไม่ มี ค่า คีย์ เริ่มต้น เช่น `0`

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

ก่อนส่ง ธุรกรรม โดย ใช้ `App_ID` ต้อง สร้าง มัน โดย ใช้ ช่อง `createApplicationKey`

:::

ส่ง ธุรกรรม ไปยัง [avail explorer](https://testnet.polygonavail.net/#/explorer)
รายการ อีเวนต์ ล่าสุด ต้อง ระบุ ธุรกรรม ของคุณ คุณ สามารถ คลิก แท็บ อีเวนต์ และ ขยาย มัน เพื่อ ตรวจสอบ
รายละเอียด ธุรกรรม

</TabItem>

<TabItem value="data">

ตัวอย่าง นี้ `submitBlockLengthProposal` ใช้ เพื่อ ส่ง ข้อมูล

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

ใส่ ค่า ที่ คุณ ต้องการ ส่ง เพื่อ เป็น ส่วน หนึ่ง ของ ธุรกรรม สำหรับ `row` และ `col`

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

ส่ง ธุรกรรม ไปยัง [avail explorer](https://testnet.polygonavail.net/#/explorer)
รายการ อีเวนต์ ล่าสุด ต้อง ระบุ ธุรกรรม ของคุณ คุณ สามารถ คลิก แท็บ อีเวนต์ และ ขยาย มัน เพื่อ ตรวจสอบ
รายละเอียด ธุรกรรม

</TabItem>
</Tabs>

:::info วิธีการ ได้รับ การรับประกัน ว่า ข้อมูล เบื้องหลัง ธุรกรรม พร้อมใช้งาน

เรา ไม่ได้นึกถึง ประเด็นสำคัญ ของ การตรวจสอบ ความพร้อม ของ ข้อมูล และ โฮสต์ ระบบ ลูกค้าน้ำหนักเบา
เพื่อ ให้ คุณ ใช้ คุณ เพียงแต่ ต้องการ คลิก หมายเลขบล็อก ซึ่ง ติด ธุรกรรม ที่ คุณ ต้องการ และ
ดู รายละเอียด ทั้งหมด ของ บล็อก

นอกจากนั้น คุณ จะ เห็น **ปัจจัย ความเชื่อถือ** หาก แสดง ข้อความ `0%` รอ ช่วงระยะเวลาหนึ่ง และ ตรวจสอบใหม่ ในภายหลัง
มิฉะนั้น มัน ต้อง แสดง ระดับ ความเชื่อถือ ที่ ไม่ ได้เป็น ศูนย์ ที่ แสดง ความเป็นไปได้ ของ
ความพร้อม ของ ข้อมูล

:::

</TabItem>
<TabItem value="library">

หรือ คุณ สามารถ ใช้ console/typescript เพื่อ สร้าง บัญชี avail
ผ่าน [`@polkadot/api`](https://polkadot.js.org/docs/) สร้าง โฟลเดอร์ ใหม่ และ เพิ่ม
ไลบรารี JS โดย ใช้ `yarn add @polkadot/api` หรือ `npm install @polkadot/api`

:::info

ตรวจสอบ ว่า ส่วนเสริม Typescript ถูก เพิ่ม เพื่อ สามารถ เรียกใช้ สคริปต์ ที่นี่
`@polkadot/api` ใช้ เวอร์ชัน `7.9.1`

คุณ สามารถ ใช้ `ts-node` เพื่อ ดำเนินการ ไฟล์ Typescript ใน คอนโซล หรือ ใช้
`yarn add ts-node typescript '@types/node'` หรือ `npm i ts-node typescript '@types/node'`
เพื่อ ติดตั้ง แพกเกจ

เช่น ถ้า คุณ สร้าง สคริปต์ ซึ่งมีชื่อว่า `account.ts` คุณ สามารถ ดำเนินการ สคริปต์
ใน บรรทัดคำสั่ง โดย เรียกใช้:

```bash

ts-node account.ts

```

คุณ ยัง ต้อง ให้ **[เชื่อมต่อ กับ โหนด](../node/avail-node-management.md)** ก่อน เรียกใช้
สคริปต์

:::

เพื่อ สร้าง บัญชี ให้ คุณ เรียกใช้ สคริปต์ ดังต่อไปนี้

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

ผล ตัวอย่าง

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info รูปแบบ ที่อยู่

ตามที่ avail ถูกสร้าง โดย ใช้ [Substrate](https://substrate.io/) ที่อยู่ Substrate ทั่วไป
เริ่ม ด้วย 5 อย่างสม่ำเสมอ และ ติดตาม **[รูปแบบ ที่อยู่ SS58](https://docs.substrate.io/v3/advanced/ss58/)**

:::

:::info แหล่งที่มา ของ คีย์ และ อัลกอริทึม กการลงนาม

สาเหตุ การใช้ `sr25519` ระบุไว้ **[ที่นี่](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**

:::

บันทึก ที่อยู่ ซึ่ง คุณ สร้างมาใหม่ และ วลี mnemonic เพื่อ สามารถ ไปยัง ขั้นตอน ถัดไป

:::caution การจัดการ คีย์

วลี Seed คือ คีย์ ของ บัญชี คุณ ซึ่ง ควบคุม บัญชี ของคุณ
คุณ ไม่ควร เก็บ วลี Seed ของคุณ บน อุปกรณ์ ซึ่ง สามารถ หรือ อาจจะ สามารถ เข้าถึง
การเชื่อมต่อ กับ อินเทอร์เน็ต วลี Seed ควร ถูกบันทึกไว้ และ ถูกเก็บไว้ ใน พื้นที่
ซึ่งไม่ใช่ พื้นที่ ดิจิทัล

:::

## รับ โทเค็น AVL Testnet {#receive-avl-testnet-tokens-1}

ไปยัง [Polygon faucet](https://faucet.polygon.technology)

บนหน้า faucet เลือก `DA (Test Token)` และ `DA Network` เป็น โทเค็น และ เครือข่าย
ตามลำดับ วาง ที่อยู่ บัญชี ของคุณ และ คลิก **ส่ง** การโอน จะ ใช้ เวลา ไม่เกิน หนึ่ง
นาที ให้แล้วเสร็จ

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

เมื่อ การโอน ประสบความสำเร็จ แล้ว บัญชี ของคุณ ควร แสดง ยอดคงเหลือ ซึ่งไม่เท่ากับ ศูนย์ ถ้า คุณ ประสบ ปัญหา ใดๆ ที่ เกี่ยวกับ การ รับ โทเค็น จาก faucet โปรด ติดต่อ [ทีมสนับสนุน](https://support.polygon.technology/support/home)

### การตรวจสอบ ยอดคงเหลือ กับ `@polkadot/api`

ใช้ สคริปต์ ดังต่อไปนี้ เพื่อ ตรวจสอบ ยอดคงเหลือ ของ บัญชี ที่คุณ พึ่ง สร้างมา

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

ผล ตัวอย่าง

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> คุณ ควร ได้ ยอดคงเหลือ เป็น `0` ถ้า บัญชี พึ่งถูกสร้าง และ คุณ ยัง ไม่ได้ใช้ faucet
> นอกจากนั้น คุณ ยัง ต้อง ดู การยืนยัน ของ ธุรกรรม

:::tip การใช้ avail explorer

เพื่อ ความสะดวก คุณ สามารถ เพิ่ม บัญชี ซึ่ง คุณ สร้างมา กับ
`@polkadot/api`ใน avail explorer UI เพื่อ ดำเนินการต่างๆ เกี่ยวกับ บัญชี

:::

## ส่ง ธุรกรรม ใหม่ {#submit-a-new-transaction-1}

คุณ สามารถ ใช้ สคริปต์ ที่ ระบุไว้ ใน ส่วน นี้ เพื่อ ลงนาม และ ส่ง ธุรกรรม

:::note

แทนที่ `value` และ `APP_ID` ด้วย ข้อมูล ที่ คุณ อยาก ส่ง
นอกจากนี้ โปรด แทนที่ สตริง mnemonic ด้วย สตริง ของคุณเอง

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

สคริปต์ ดังต่อไปนี้ สร้าง คีย์ แอปพลิเคชัน

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

สคริปต์ ดังต่อไปนี้ ส่ง ข้อมูล

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

คุณ สามารถ ไปยัง [avail explorer](https://testnet.polygonavail.net/#/explorer) และ
รายการ อีเวนต์ ล่าสุด ต้อง ระบุ ธุรกรรม ของคุณ คุณ สามารถ คลิก แท็บ อีเวนต์ และ ขยาย มัน เพื่อ ตรวจสอบ
รายละเอียด ธุรกรรม

:::info วิธีการ ได้รับ การรับประกัน ว่า ข้อมูล เบื้องหลัง ธุรกรรม พร้อมใช้งาน

คุณ สามารถ ใช้ คำขอ curl ดังต่อไปนี้ เพื่อ ตรวจสอบ ระดับ ความเชื่อถือ เพียงแค่ แทนที่ หมายเลข บล็อก เป็น
หมายเลข ที่ คุณ ต้องการ รับ การรับประกัน ความพร้อม

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
