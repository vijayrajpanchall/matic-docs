---
id: avail-quick-start
title: पॉलीगॉन अवेल का उपयोग कैसे करें
sidebar_label: Quick Start
description: पॉलीगॉन अवेल का उपयोग करना सीखें
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

# पॉलीगॉन अवेल का उपयोग कैसे करें {#how-to-use-polygon-avail}

:::note

हम वर्तमान में कई फीचर्स को सुधारने पर काम कर रहे हैं. हम अपने टेस्टनेट का इस्तेमाल करके आप की सराहना करते हैं और अपने [<ins>एक सामुदायिक चैनलों</ins>](https://polygon.technology/community/) के माध्यम से अपने मूल्यवान फीडबैक को प्रोत्साहित करते हैं.

:::

## एक अवेल अकाउंट जनरेट करें {#generate-an-avail-account}

आप दोनों में से एक तरीके से एक अकाउंट जनरेट कर सकते हैं:
- [अवेल एक्सप्लोरर](https://testnet.polygonavail.net/)
- कंसोल/टाइपस्क्रिप्ट

<Tabs
defaultValue="explorer"
values={[
{ label: 'Avail Explorer', value: 'explorer', },
{ label: '@polkadot/api', value: 'library', },
]
}>
<TabItem value="explorer">

[अवेल एक्सप्लोरर](https://testnet.polygonavail.net/) की ओर बढ़ें.

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Avail एक्सप्लोरर](https://testnet.polygonavail.net/)** एक k a है **[Polkadot-JS एप्प](https://polkadot.js.org/)** की इंटरफेस और नेविगेशन एक ही अगर आप Polkadot-JS एप्प से परिचित हैं.

:::

**अकाउंट्स** टैब पर जाकर **अकाउंट्स** सब-टैब पर क्लिक करें.

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info पते का फ़ॉर्मेट

चूंकि एवेल [सबस्ट्रेट](https://substrate.io/) का इस्तेमाल करके लागू किया जाता है, जेनेरिक सब्सट्रेट पतों हमेशा एक 5 के साथ शुरू करें और **[SS58 पता प्रारूप](https://docs.substrate.io/v3/advanced/ss58/)** का पालन करें.

:::

अकाउंट पेज पर, **ऐड अकाउंट** बटन पर क्लिक करें और पॉप अप विंडो में दिए गए चरणों का पालन करें.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution मुख्य मैनेजमेंट

सीड फ्रेज़ आपके अकाउंट पर नियंत्रण रखने वाली की या चाबी है.
आपको अपने बीज वाक्यांश को एक डिवाइस पर स्टोर नहीं करना चाहिए जो कि उसके पास हो या हो सकता है एक इंटरनेट कनेक्शन. बीज वाक्यांश को नीचे लिखा जाना चाहिए और एक non-digital पर स्टोर किया जाना चाहिए. मीडियम

अपने अकाउंट की JSON फाइल को स्टोर करने के लिए बीज वाक्यांश को संग्रहित करने के रूप में उतना कठोर नहीं होना पड़ता है, जब तक आप फ़ाइल को इनस्क्रिप्ट करने के लिए एक मजबूत पासवर्ड का इस्तेमाल करते हैं. आप JSON फ़ाइल को इम्पोर्ट कर सकते हैं अपने अकाउंट को एक्सेस करें.

:::

## AVL टेस्टनेट टोकन प्राप्त करें {#receive-avl-testnet-tokens}

Avail Explorer पर, अपने अकाउंट के नाम के बगल में आइकन पर क्लिक करें अपने पता की कॉपी करें. वैकल्पिक रूप से, आप ख़ुद भी पता कॉपी कर सकते है.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

[पॉलीगॉन फ़ॉसेट](https://faucet.polygon.technology) की ओर जाएँ.

the पेज पर, नेटवर्क और टोकन के `DA (Test Token)`रूप में `DA Network`चुनें अपने अकाउंट का पता डालें और **सबमिट**पर क्लिक करें. transfer र एक तक पूरा करने में मिनट .

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

सफ़ल ट्रांसफर होने पर, आपके अकाउंट में नॉन-ज़ीरो बैलेंस होना चाहिए. अगर किसी भी मुद्दे का सामना करें the से टोकन प्राप्त करना, कृपया बाहर से बाहर तक पहुंच जाएँ [टीम का समर्थन करें](https://support.polygon.technology/support/home).

## एक नया ट्रांज़ैक्शन सबमिट करें {#submit-a-new-transaction}

Avail Explorer पर, **डेवलपर** टैब में नेविगेट करें और पर क्लिक करें **Extrinsics** sub-tab.

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

अपना नया बनाया गया अकाउंट चुनें.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

से चुनने के लिए कई extrinsics हैं, आगे बढ़ें और चुनें the की `dataAvailability`extrinsic **बूंद मेनू** से

:::info एक्सट्रिन्सिक क्या हैं?

Extrinsics बाहरी जानकारी का एक रूप है और या तो अंतर्निहित हो सकता है, हस्ताक्षरित Extrinsics , या असाइन Transactions.  में extrinsics के बारे में अधिक विवरण उपलब्ध हैं [दस्तावेज़ को सब्सट्रेट करें](https://docs.substrate.io/v3/concepts/extrinsics/).

:::

तब आप एप्लिकेशन की बनाने के लिए ड्रॉपडाउन मेनू का इस्तेमाल कर सकते हैं या डेटा सबमिट करें.

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

इस उदाहरण में `createApplicationKey` का उपयोग ऐप्लिकेशन की बनाने के लिए किया गया है.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

जिस वैल्यू को आप इस transaction transaction के हिस्से के रूप में जमा करना चाहते हैं उसे भरें `App_ID`, या के रूप में की गई की की वैल्यू के `0`बिना.

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

`App_ID`का उपयोग करते हुए ट्रांज़ैक्शन भेजने से पहले, इसे `createApplicationKey`फील्ड का उपयोग करके बनाया जाना चाहिए.

:::

ट्रांज़ैक्शन सबमिट करें. [अवेल एक्सप्लोरर](https://testnet.polygonavail.net/#/explorer) की ओर जाएँ. नवीनतम इवेंट सूची में आपके ट्रांज़ैक्शन शामिल होने चाहिए. आप इवेंट पर क्लिक कर सकते हैं और बाहर की जांच करने के लिए इसे विस्तार कर सकते हैं transaction the का विवरण.

</TabItem>

<TabItem value="data">

इस उदाहरण में `submitBlockLengthProposal` का उपयोग डेटा को सबमिट करने के लिए किया जाता है.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

आप `col`और `row`के लिए ट्रांज़ैक्शन के हिस्से के रूप में जो वैल्यू सबमिट करना चाहते हैं, उन्हें डालें.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

ट्रांज़ैक्शन सबमिट करें. [अवेल एक्सप्लोरर](https://testnet.polygonavail.net/#/explorer) की ओर जाएँ. नवीनतम इवेंट सूची में आपके ट्रांज़ैक्शन शामिल होने चाहिए. आप इवेंट पर क्लिक कर सकते हैं और बाहर की जांच करने के लिए इसे विस्तार कर सकते हैं transaction the का विवरण.

</TabItem>
</Tabs>

:::info ट्रांज़ैक्शन के पीछे डेटा उपलब्ध है, यह गारंटी कैसे प्राप्त करें?

हमने डेटा की उपलब्धता को सत्यापित करने के nitty-gritty को abstracted किया है और एक लाइट क्लाइंट की मेजबानी की है. अपने इस्तेमाल के लिए. सभी आपको करने की जरूरत है अपने वांछित transaction the के खिलाफ ब्लॉक नंबर पर क्लिक करें और ब्लॉक विवरण के सभी देखें.

आपको **एक कोंफिडेन्स** फैक्टर भी दिखाई देगा. अगर यह आपको `0%`दिखाता है, कुछ समय रुकें और कुछ समय के बाद दोबारा देखें. अन्यथा, इसे एक non-zero आत्मविश्वास लेवल दिखाना चाहिए जिससे अंतर्निहित डेटा की संभावना को इंगित करता है. उपलब्ध है.

:::

</TabItem>
<TabItem value="library">

वैकल्पिक रूप से, आप Avail अकाउंट उत्पन्न करने के लिए कंसोल / टाइपस्क्रिप्ट का इस्तेमाल कर सकते हैं. के माध्यम से [`@polkadot/api`](https://polkadot.js.org/docs/). एक नया फ़ोल्डर बनाएँ और जोड़ दें JS लाइब्रेरी का इस्तेमाल करके `yarn add @polkadot/api`या`npm install @polkadot/api`

:::info

स्क्रिप्ट चलाने के लिए यह सुनिश्चित करें कि टाइपस्क्रिप्ट निर्भरताओं को जोड़ लिया गया है. यहाँ,`@polkadot/api` संस्करण का इस्तेमाल किया जाता `7.9.1`है.

आप कंसोल में टाइप स्क्रिप्ट फाइलों को एग्ज़ीक्यूट करने के लिए `ts-node`का इस्तेमाल कर सकते हैं. या तो इस्तेमाल करें`yarn add ts-node typescript '@types/node'` या`npm i ts-node typescript '@types/node'` पैकेज को इंस्टॉल करने के लिए.

उदाहरण के लिए, अगर आप `account.ts`नामक स्क्रिप्ट बनाते हैं तो आप स्क्रिप्ट को एक्जीक्यूट कर सकते हैं रन देकर कमांड लाइन में:

```bash

ts-node account.ts

```

रन करने से पहले आपको **[एक नोड से कनेक्ट](../node/avail-node-management.md)** करने की भी need a होगी स्क्रिप्ट्स

:::

अकाउंट बनाने के लिए, नीचे दी गई स्क्रिप्ट रन करें:

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

परिणाम का नमूना:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info पते का फ़ॉर्मेट

चूंकि एवेल [सबस्ट्रेट](https://substrate.io/) का इस्तेमाल करके लागू किया जाता है, जेनेरिक सब्सट्रेट पतों हमेशा एक 5 के साथ शुरू करें और **[SS58 पता प्रारूप](https://docs.substrate.io/v3/advanced/ss58/)** का पालन करें.

:::

:::info मुख्य डेरिवेशन और अल्गोरिथम साइन करना

`sr25519`का इस्तेमाल करने के कारणों को **[यहाँ बताया गया है](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**.

:::

 आगे के चरणों के लिए, नए जनरेट किए गए पते और नेमोनिक फ्रेज़ को सेव करें.

:::caution मुख्य मैनेजमेंट

सीड फ्रेज़ आपके अकाउंट पर नियंत्रण रखने वाली की या चाबी है.
आपको अपने बीज वाक्यांश को एक डिवाइस पर स्टोर नहीं करना चाहिए जो कि उसके पास हो या हो सकता है एक इंटरनेट कनेक्शन. बीज वाक्यांश को नीचे लिखा जाना चाहिए और एक non-digital पर स्टोर किया जाना चाहिए. मीडियम

:::

## AVL टेस्टनेट टोकन प्राप्त करें {#receive-avl-testnet-tokens-1}

[पॉलीगॉन फ़ॉसेट](https://faucet.polygon.technology) की ओर जाएँ.

the पेज पर, टोकन और नेटवर्क के `DA Network`रूप में चुनें `DA (Test Token)`और क्रमशः अपने अकाउंट का पता डालें और **सबमिट**पर क्लिक करें. transfer र एक तक ले जाएगा पूरा करने में मिनट .

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

सफ़ल ट्रांसफर होने पर, आपके अकाउंट में नॉन-ज़ीरो बैलेंस होना चाहिए. अगर आपको फ़ॉसेट से टोकन प्राप्त करने में कोई परेशानी आए तो [सहायता टीम](https://support.polygon.technology/support/home) से संपर्क करें.

### `@polkadot/api`से बैलेंस जाँचें

आपने जो अकाउंट अभी अभी बनाया है, उसका बैलेंस देखने के लिए, नीचे दी गई स्क्रिप्ट का इस्तेमाल करें:

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

परिणाम का नमूना:

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> अगर आपका अकाउंट नया बना है और आपने फ़ॉसेट का उपयोग नहीं किया है तो आपको `0` जैसा बैलेंस प्राप्त होना चाहिए.
> आपको ट्रांज़ैक्शन की पुष्टि को हमेशा देखना चाहिए.

:::tip अवेल एक्सप्लोरर का उपयोग करना

सुविधा के लिए, आप जो अकाउंट आपके साथ उत्पन्न होता है जोड़ सकते हैं`@polkadot/api` Avail Explorer UI पर अकाउंट the करने के लिए.

:::

## एक नया ट्रांज़ैक्शन सबमिट करें {#submit-a-new-transaction-1}

आप इस सेक्शन में दी गई स्क्रिप्टों को ट्रांज़ैक्शनों को साइन और सबमिट करने के लिए उपयोग कर सकते हैं.

:::note

`value` और `APP_ID` को आप जिन्हें सबमिट करना चाहते हैं, उनके साथ बदलें. इसके अलावा, नेमोनिक स्ट्रिंग को अपने आप बदलें.

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

नीचे दी गई स्क्रिप्ट से एक ऐप्लिकेशन की बनती है:

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

नीचे दी गई स्क्रिप्ट डेटा को सबमिट करती है:

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

आप [Avail एक्सप्लोरर](https://testnet.polygonavail.net/#/explorer) के लिए सिर कर सकते हैं, और द हाल ही की इवेंट लिस्ट को अपने transaction. को लिस्ट करना चाहिए. आप इवेंट पर क्लिक कर सकते हैं और बाहर की जांच करने के लिए इसे विस्तार कर सकते हैं transaction the का विवरण.

:::info ट्रांज़ैक्शन के पीछे डेटा उपलब्ध है, यह गारंटी कैसे प्राप्त करें?

आप नीचे दिए गए कर्ल अनुरोध का इस्तेमाल विश्वास के स्तर की जानकारी को जाँचने के लिए कर सकते हैं. बस ब्लॉक नंबर को को के साथ बदलें एक आप के लिए उपलब्धता की गारंटी प्राप्त करना चाहते हैं.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
