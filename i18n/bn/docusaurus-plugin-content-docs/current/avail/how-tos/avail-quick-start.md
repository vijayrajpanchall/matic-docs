---
id: avail-quick-start
title: কীভাবে Polygon Avail ব্যবহার করবেন
sidebar_label: Quick Start
description: Polygon Avail কীভাবে ব্যবহার করবেন জানুন
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

# কীভাবে Polygon Avail ব্যবহার করবেন {#how-to-use-polygon-avail}

:::note

আমরা বর্তমান ফিচার অনেক উন্নতি করতে কাজ করছি। আমরা আমাদের testnet ব্যবহার করে আপনাকে কৃতজ্ঞ [<ins>We ে</ins>](https://polygon.technology/community/) এবং আমাদের একটি কমিউনিটি চ্যানেলের মাধ্যমে আপনার মূল্যবান প্রতিক্রিয়া উৎসাহিত করি।

:::

## একটি Avail অ্যাকাউন্ট তৈরি করুন {#generate-an-avail-account}

আপনি দুটি পদ্ধতি ব্যবহার করে একটি অ্যাকাউন্ট তৈরি করতে পারেন:
- [Avail এক্সপ্লোরার](https://testnet.polygonavail.net/)
- কনসোল/টাইপস্ক্রিপ্ট

<Tabs
defaultValue="explorer"
values={[
{ label: 'Avail Explorer', value: 'explorer', },
{ label: '@polkadot/api', value: 'library', },
]
}>
<TabItem value="explorer">

[Avail এক্সপ্লোরারে](https://testnet.polygonavail.net/) যান।

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Avail](https://testnet.polygonavail.net/)** এক্সপ্লোরার হলো **[Polkadot-JS Apps](https://polkadot.js.org/)**-এর একটি ফর্ক। ইন্টারফেস এবং নেভিগেশান একই যদি আপনি Polkadot-JS Apps-এর সাথে পরিচিত হন।

:::

**অ্যাকাউন্ট ট্যাবে** যান এবং **অ্যাকাউন্ট** সাব-ট্যাবে ক্লিক করুন।

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info ঠিকানার ফরম্যাট

যেহেতু Avail [সাবস্ট্রেট](https://substrate.io/) ব্যবহার করে বাস্তবায়িত করা হয়েছে, তাই জেনেরিক সাবস্ট্রেট ঠিকানা সব সময়
5 দিয়ে শুরু হয় এবং **[SS58 ঠিকানা ফরম্যাট অনুসরণ](https://docs.substrate.io/v3/advanced/ss58/)** করে।

:::

অ্যাকাউন্ট পেজে গিয়ে **অ্যাকাউন্ট যোগ করুন** বোতামে ক্লিক করুন এবং পপ-আপ উইন্ডোতে পদক্ষেপগুলো অনুসরণ করুন।

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution কী-এর ব্যবস্থাপনা

সিড ফ্রেজ হল আপনার অ্যাকাউন্ট কী, যা আপনার অ্যাকাউন্ট নিয়ন্ত্রণ করে।
এমন ডিভাইসে আপনার সিড ফ্রেজ স্টোর করবেন না
যেটিতে ইন্টারনেট সংযোগ আছে বা থাকতে পারে। সিড ফ্রেজ লিখে রাখা উচিত এবং একটি নন-ডিজিটাল মিডিয়ামে সংরক্ষণ করা উচিত।

আপনার সিড ফ্রেজ স্টোর করার মতো আপনার অ্যাকাউন্টের JSON ফাইল স্টোর করা অতটাও কড়াকড়ি হতে হবে না, যদি আপনি ফাইল এনক্রিপ্ট করতে একটি শক্তিশালী পাসওয়ার্ড ব্যবহার করতে পারেন। আপনার অ্যাকাউন্ট অ্যাক্সেস করার জন্য আপনি JSON ফাইল ইম্পোর্ট করতে পারেন।

:::

## AVL টেস্টনেট টোকেন পান {#receive-avl-testnet-tokens}

আপনার অ্যাড্রেস কপি করার জন্য Avail এক্সপ্লোরারে আপনার অ্যাকাউন্টের নামের পাশে ক্লিক করুন।  এছাড়া, আপনি নিজে থেকেই অ্যাড্রেস কপি করতে পারেন।

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

[Polygon](https://faucet.polygon.technology) ফউসেটে যান।

ফউসেট পেজে, নেটওয়ার্ক এবং টোকেন হিসাবে `DA Network` এবং `DA (Test Token)` বেছে নিন।
আপনার অ্যাকাউন্টের অ্যাড্রেস পেস্ট করুন এবং **জমা দিন**-এ ক্লিক করুন। ট্রান্সফার সম্পূর্ণ হতে এক মিনিট পর্যন্ত
সময় লাগবে।

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

সফলভাবে ট্রান্সফার সম্পন্ন হওয়ার পর, এবার আপনার অ্যাকাউন্টে নন-জিরো ব্যালেন্স থাকবে। ফউসেট থেকে টোকেন সংগ্রহ করতে গিয়ে আপনি যদি কোনো সমস্যায় পড়েন তাহলে অনুগ্রহ করে
[সাপোর্ট টিমের](https://support.polygon.technology/support/home) সাথে যোগাযোগ করুন।

## একটি নতুন লেনদেন জমা দিন {#submit-a-new-transaction}

Avail এক্সপ্লোরারে গিয়ে, **ডেভেলপার** ট্যাবে যান এবং
**Extrinsics** সাব-ট্যাবে ক্লিক করুন।

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

আপনার তৈরি নতুন অ্যাকাউন্ট বেছে নিন।

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

অনেক এক্সট্রিনসিক্স থেকে বেছে নিতে পারবেন; এগিয়ে যান এবং
**এক্সট্রিনসিক ড্রপডাউন মেনু** থেকে `dataAvailability` এক্সট্রিনসিকটি বেছে নিন।

:::info এক্সট্রিনসিক্স কী

এক্সট্রিনসিক্স হলো এক ধরনের বাহ্যিক তথ্য এবং এটি সহজাত, স্বাক্ষরিত লেনদেন
অথবা অস্বাক্ষরিত লেনদেন হতে পারে। এক্সট্রিনসিক্স সম্পর্কে আরও বিশদ তথ্য
[সাবস্ট্রেট ডকুমেন্টেশন](https://docs.substrate.io/v3/concepts/extrinsics/)-এ আছে।

:::

তারপর আপনি একটি অ্যাপ্লিকেশন কী তৈরি করতে অথবা ডেটা জমা দেওয়ার জন্য ডানদিকে থাকা ড্রপডাউন মেনু
ব্যবহার করতে পারেন।

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

এই উদাহরণে একটি অ্যাপ্লিকেশন কী তৈরি করতে, `createApplicationKey` ব্যবহার করা হয়েছে।

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

`App_ID` ব্যবহার করে, লেনদেনের অংশ হিসাবে আপনি যে পরিমাণ জমা করতে চান তা লিখুন অথবা `0` হিসাবে ডিফল্ট কী ভ্যালু ছাড়াই লিখুন।

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

`App_ID` ব্যবহার করে কোনো লেনদেন পাঠানোর আগে, অবশ্যই `createApplicationKey` ক্ষেত্রটি ব্যবহার করে তা তৈরি করে নিতে হবে।

:::

লেনদেন জমা দিন। [Avail এক্সপ্লোরারে](https://testnet.polygonavail.net/#/explorer) যান।
সাম্প্রতিক ইভেন্টের তালিকায় আপনার লেনদেন তালিকাভুক্ত হয়ে যাওয়া উচিত। লেনদেনের বিশদ দেখার জন্য ইভেন্টে ক্লিক করুন এবং এটি বর্ধিত করুন।

</TabItem>

<TabItem value="data">

এই উদাহরণে, ডেটা জমা দেওয়ার জন্য `submitBlockLengthProposal`ব্যবহার করা হয়েছে।

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

`row` এবং `col`-এর জন্য, এই লেনদেনের অংশ হিসাবে আপনি যে ভ্যালু জমা করতে চান, তা লিখুন।

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

লেনদেন জমা দিন। [Avail এক্সপ্লোরারে](https://testnet.polygonavail.net/#/explorer) যান।
সাম্প্রতিক ইভেন্টের তালিকায় আপনার লেনদেন তালিকাভুক্ত হয়ে যাওয়া উচিত। লেনদেনের বিশদ দেখার জন্য ইভেন্টে ক্লিক করুন এবং এটি বর্ধিত করুন।

</TabItem>
</Tabs>

:::info কীভাবে নিশ্চয়তা পাওয়া যায় যে লেনদেনের পিছনে থাকা ডেটা উপলভ্য আছে?

আমরা ডেটা উপলভ্যতা যাচাই করার খুঁটিনাটি সংক্ষিপ্তাকারে পেশ করেছি এবং আপনার ব্যবহারের জন্য একটি হালকা ক্লায়েন্ট হোস্ট করেছি। আপনাকে শুধুমাত্র আপনার কাঙ্খিত লেনদেন অনুযায়ী, সংশ্লিষ্ট ব্লক নম্বরে ক্লিক করতে হবে এবং
তারপর সব ব্লকের বিশদ বিবরণ দেখতে পাবেন।

এছাড়া আপনি একটি **আত্মবিশ্বাস ফ্যাক্টর** দেখতে পাবেন। যদি এটি `0%` দেখায়, তবে কিছু সময় অপেক্ষা করে আবার চেক করুন।
নাহলে এটা নন-জিরো আত্মবিশ্বাস স্তর দেখাবে, যার মানে যে ডেটার ভিত্তিতে
সম্ভাবনা আছে।

:::

</TabItem>
<TabItem value="library">

এছাড়া, আপনি কনসোল/টাইপস্ক্রিপ্ট ব্যবহার করে একটি Avail অ্যাকাউন্ট তৈরি করতে পারেন
[`@polkadot/api`](https://polkadot.js.org/docs/)-এর মাধ্যমে। একটি নতুন ফোল্ডার তৈরি করুন এবং `yarn add @polkadot/api` অথবা `npm install @polkadot/api` ব্যবহার করে JS লাইব্রেরি যোগ করুন।

:::info

নিশ্চিত করুন যে স্ক্রিপ্ট চালানোর জন্য টাইপস্ক্রিপ্ট নির্ভরতা যোগ করা হয়েছে। এখানে,
`@polkadot/api``7.9.1` সংস্করণ ব্যবহার করা হয়েছে।

আপনি কনসোলে টাইপস্ক্রিপ্ট ফাইল চালানোর জন্য `ts-node` ব্যবহার করতে পারেন। `yarn add ts-node typescript '@types/node'`
অথবা `npm i ts-node typescript '@types/node'` ব্যবহার করে
প্যাকেজটি ইনস্টল করুন।

মনে করুন, আপনি `account.ts` নামের একটা স্ক্রিপ্ট তৈরি করেছেন, তাহলে আপনি নিম্নলিখিতগুলি চালিয়ে কমান্ড লাইনে স্ক্রিপ্ট সম্পাদন করতে পারবেন:

```bash

ts-node account.ts

```

এছাড়া, স্ক্রিপ্ট চালানোর আগে আপনাকে **[একটি নোডের সাথে সংযোগ](../node/avail-node-management.md)**
করতে হবে।

:::

একটি অ্যাকাউন্ট তৈরি করতে, নিম্নলিখিত স্ক্রিপ্ট চালান:

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

নমুনা ফলাফল:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info ঠিকানার ফরম্যাট

যেহেতু Avail [সাবস্ট্রেট](https://substrate.io/) ব্যবহার করে বাস্তবায়িত করা হয়েছে, তাই জেনেরিক সাবস্ট্রেট ঠিকানা সব সময়
5 দিয়ে শুরু হয় এবং **[SS58 ঠিকানা ফরম্যাট অনুসরণ](https://docs.substrate.io/v3/advanced/ss58/)** করে।

:::

:::info মূল ডেরিভেশন এবং সাইনিং অ্যালগরিদম

`sr25519` ব্যবহার করার কারণগুলো **[এখানে](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)** উল্লেখ করা হয়েছে।

:::

পরবর্তী পদক্ষেপগুলির জন্য নতুন তৈরি করা অ্যাড্রেস এবং mnemonic ফ্রেজ সেভ করুন।

:::caution কী-এর ব্যবস্থাপনা

সিড ফ্রেজ হল আপনার অ্যাকাউন্ট কী, যা আপনার অ্যাকাউন্ট নিয়ন্ত্রণ করে।
এমন ডিভাইসে আপনার সিড ফ্রেজ স্টোর করবেন না
যেটিতে ইন্টারনেট সংযোগ আছে বা থাকতে পারে। সিড ফ্রেজ লিখে রাখা উচিত এবং একটি নন-ডিজিটাল মিডিয়ামে সংরক্ষণ করা উচিত।

:::

## AVL টেস্টনেট টোকেন পান {#receive-avl-testnet-tokens-1}

[Polygon](https://faucet.polygon.technology) ফউসেটে যান।

ফউসেট পেজে, নেটওয়ার্ক এবং টোকেন হিসাবে যথাক্রমে `DA (Test Token)` এবং `DA Network`
বেছে নিন। আপনার অ্যাকাউন্টের অ্যাড্রেস পেস্ট করুন এবং **জমা দিন**-এ ক্লিক করুন। ট্রান্সফার করতে এক মিনিট পর্যন্ত সময় লাগবে।

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

সফলভাবে ট্রান্সফার সম্পন্ন হওয়ার পর, এবার আপনার অ্যাকাউন্টে নন-জিরো ব্যালেন্স থাকবে। যদি আপনি ফসেট থেকে টোকেন পেতে কোন সমস্যার সম্মুখীন হন, তাহলে অনুগ্রহ করে [সাপোর্ট টিমের](https://support.polygon.technology/support/home) সাথে যোগাযোগ করুন।

### `@polkadot/api` দিয়ে ব্যালেন্স চেক করুন

আপনি যে অ্যাকাউন্ট তৈরি করেছেন তা চেক করতে নিম্নলিখিত স্ক্রিপ্ট ব্যবহার করুন:

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

নমুনা ফলাফল:

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> অ্যাকাউন্টটি যদি নতুন তৈরি করা হয় এবং আপনি যদি ফসেট ব্যবহার না করে থাকেন, তাহলে আপনি `0` হিসাবে ব্যালেন্স পাবেন। এছাড়াও আপনি লেনদেনের কনফার্মেশন দেখতে পাবেন।

:::tip Avail এক্সপ্লোরার ব্যবহার করা

সুবিধার জন্য, আপনি অ্যাকাউন্টের ক্রিয়াকলাপ সম্পাদন করতে Avail এক্সপ্লোরার UI-তে `@polkadot/api` দিয়ে
তৈরি করা অ্যাকাউন্টটি যোগ করতে পারেন।

:::

## একটি নতুন লেনদেন জমা দিন {#submit-a-new-transaction-1}

লেনদেন স্বাক্ষর করতে এবং জমা দিতে এই বিভাগে প্রদত্ত স্ক্রিপ্ট ব্যবহার করতে পারেন।

:::note

আপনি যেগুলো জমা দিতে চান, সেগুলো `APP_ID` এবং `value` দিয়ে প্রতিস্থাপন করুন।
এছাড়া আপনার নিজেরটি দিয়ে mnemonic স্ট্রিং প্রতিস্থাপন করুন।

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

নিম্নলিখিত স্ক্রিপ্টটি একটি অ্যাপ্লিকেশন কী তৈরি করে:

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

নিম্নলিখিত স্ক্রিপ্টটি ডেটা জমা দেয়:

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

আপনি Avail [এক্সপ্লোরারে](https://testnet.polygonavail.net/#/explorer) যান এবং সাম্প্রতিক ইভেন্টের তালিকায় আপনার লেনদেনের তালিকা দেখতে পাবেন। লেনদেনের বিশদ দেখার জন্য ইভেন্টে ক্লিক করুন এবং এটি বর্ধিত করুন।

:::info কীভাবে নিশ্চয়তা পাওয়া যায় যে লেনদেনের পিছনে থাকা ডেটা উপলভ্য আছে?

আপনি আত্মবিশ্বাস স্তর চেক আউট করতে নিম্নলিখিত curl অনুরোধ ব্যবহার করতে পারেন। উপলভ্যতার নিশ্চয়তা পেতে আপনার কাঙ্খিত নম্বর দিয়ে
ব্লক নম্বর পরিবর্তন করুন।

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
