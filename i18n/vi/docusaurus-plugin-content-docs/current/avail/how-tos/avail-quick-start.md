---
id: avail-quick-start
title: Cách sử dụng Polygon Avail
sidebar_label: Quick Start
description: Tìm hiểu cách sử dụng Polygon Avail
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

# Cách sử dụng Polygon Avail {#how-to-use-polygon-avail}

:::note

Chúng tôi đang tiến hành cải thiện nhiều tính năng hiện tại. Chúng tôi đánh giá cao bạn sử dụng tesnet của chúng tôi và khuyến khích sự phản hồi có giá trị của bạn thông qua một trong các [<ins>kênh cộng đồng</ins>](https://polygon.technology/community/) của chúng tôi.

:::

## Tạo Tài khoản Avail {#generate-an-avail-account}

Bạn có thể tạo tài khoản bằng một trong hai phương pháp:
- [Trình khám phá Avail](https://testnet.polygonavail.net/)
- Bảng điều khiển/Typescript

<Tabs
defaultValue="explorer"
values={[
{ label: 'Avail Explorer', value: 'explorer', },
{ label: '@polkadot/api', value: 'library', },
]
}>
<TabItem value="explorer">

Đi đến [Trình khám phá Avail](https://testnet.polygonavail.net/).

<img src={useBaseUrl("img/avail/avail-explorer.png")} width="100%" height="100%"/>

:::note

**[Trình khám phá Avail](https://testnet.polygonavail.net/)** là một phân nhánh
của **[các Ứng dụng Polkadot-JS](https://polkadot.js.org/)**. Giao diện và phần điều hướng giống nhau
nếu bạn đã quen thuộc với các Ứng dụng Polkadot-JS.

:::

Di chuyển đến tab **Tài khoản** và nhấp vào tab phụ **Tài khoản**.

<img src={useBaseUrl("img/avail/account.png")} width="100%" height="100%"/>

:::info Định dạng Địa chỉ

Vì Avail được triển khai bằng [Substrate](https://substrate.io/), các địa chỉ Substrate chung
luôn bắt đầu bằng số 5 và tuân theo **[định dạng địa chỉ SS58](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

Trên trang Tài khoản, nhấp vào nút **Thêm tài khoản** và thực hiện theo các bước trong cửa sổ bật lên.

<img src={useBaseUrl("img/avail/add-account.png")} width="100%" height="100%"/>

:::caution Quản lý Khóa

Cụm từ hạt giống là khóa tài khoản của bạn, khóa này kiểm soát tài khoản của bạn.
Bạn không nên lưu trữ cụm từ hạt giống của mình trên một thiết bị có hoặc có thể có quyền truy cập vào
mạng internet. Cụm từ hạt giống nên được viết ra và lưu trữ trên một phương tiện
phi kỹ thuật số.

Việc lưu trữ tệp JSON của tài khoản của bạn không cần phải nghiêm ngặt như lưu trữ cụm từ hạt giống,
miễn là bạn sử dụng mật khẩu mạnh để mã hóa tệp. Bạn có thể nhập tệp JSON để
truy cập tài khoản của mình.

:::

## Nhận Token Mạng thử nghiệm AVL {#receive-avl-testnet-tokens}

Trên Trình khám phá Avail, nhấp vào biểu tượng bên cạnh tên tài khoản để
sao chép địa chỉ của bạn.  Ngoài ra, bạn có thể sao chép địa chỉ theo cách thủ công.

<img src={useBaseUrl("img/avail/account-icon.png")} align= "center" width="100%" height="100%"/>

Đi đến [vòi Polygon](https://faucet.polygon.technology).

Trên trang vòi, chọn `DA Network`  và  `DA (Test Token)` làm mạng và token.
Dán địa chỉ tài khoản của bạn và nhấp vào **Gửi**. Quy trình chuyển token này sẽ mất đến một
phút để hoàn thành.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Sau khi chuyển thành công, tài khoản của bạn bây giờ sẽ có số dư khác 0. Nếu bạn gặp bất kỳ vấn đề nào
khi nhận token từ vòi, vui lòng liên hệ với
[đội ngũ hỗ trợ](https://support.polygon.technology/support/home).

## Gửi một Giao dịch Mới {#submit-a-new-transaction}

Trên Trình khám phá Avail, di chuyển đến tab **Nhà phát triển** và nhấp vào
tab phụ **Ngoại lai**.

<img src={useBaseUrl("img/avail/developer.png")} width="100%" height="100%"/>

Chọn tài khoản bạn mới tạo.

<img src={useBaseUrl("img/avail/developer-account.png")} width="100%" height="100%"/>

Có rất nhiều ngoại lai để lựa chọn; hãy tiếp tục và chọn
ngoại lai `dataAvailability` từ **menu thả xuống ngoại lai**.

:::info Ngoại lai là gì?

Ngoại lai là một dạng thông tin bên ngoài và có thể là các giao dịch vốn có, đã ký
hoặc các Giao dịch chưa ký. Thông tin chi tiết về ngoại lai có sẵn trong
[tài liệu Substrate](https://docs.substrate.io/v3/concepts/extrinsics/).

:::

Sau đó, bạn có thể sử dụng menu thả xuống ở phía bên phải để tạo khóa ứng dụng hoặc
gửi dữ liệu.

<Tabs
defaultValue="key"
values={[
{ label: 'Create an application key', value: 'key', },
{ label: 'Submit data', value: 'data', },
]
}>
<TabItem value="key">

Trong ví dụ này, `createApplicationKey` được dùng để tạo khóa ứng dụng.

<img src={useBaseUrl("img/avail/da-app-key.png")} width="100%" height="100%"/>

Nhập giá trị bạn muốn gửi như một phần của giao dịch này bằng `App_ID` hoặc
không có giá trị khóa mặc định là `0`.

<img src={useBaseUrl("img/avail/da-app-data.png")} width="100%" height="100%"/>

:::note

Trước khi gửi giao dịch bằng `App_ID`, giao dịch đó phải được tạo bằng trường `createApplicationKey`.

:::

Gửi giao dịch. Đi đến [Trình khám phá Avail](https://testnet.polygonavail.net/#/explorer).
Danh sách sự kiện gần đây sẽ liệt kê giao dịch của bạn. Bạn có thể nhấp vào sự kiện và mở rộng sự kiện đó để kiểm tra
chi tiết giao dịch.

</TabItem>

<TabItem value="data">

Trong ví dụ này, `submitBlockLengthProposal` được sử dụng để gửi dữ liệu.

<img src={useBaseUrl("img/avail/extrinsic-da.png")} width="100%" height="100%"/>

Nhập các giá trị bạn muốn gửi như một phần của giao dịch này cho `row` và `col`.

<img src={useBaseUrl("img/avail/da-row-col.png")} width="100%" height="100%"/>

Gửi giao dịch. Đi đến [Trình khám phá Avail](https://testnet.polygonavail.net/#/explorer).
Danh sách sự kiện gần đây sẽ liệt kê giao dịch của bạn. Bạn có thể nhấp vào sự kiện và mở rộng sự kiện đó để kiểm tra
chi tiết giao dịch.

</TabItem>
</Tabs>

:::info Làm thế nào để đảm bảo rằng dữ liệu đằng sau giao dịch là có sẵn?

Chúng tôi đã loại ra những chi tiết cốt lõi của việc xác minh tính khả dụng dữ liệu và cung cấp một máy khách nhẹ
để bạn sử dụng. Tất cả những gì bạn cần làm là nhấp vào số khối tương ứng với giao dịch mong muốn của bạn và
xem tất cả chi tiết về khối.

Bạn cũng sẽ thấy **hệ số tin cậy**. Nếu hiển thị `0%`, hãy chờ một lúc và kiểm tra lại sau.
Nếu không, nó sẽ hiển thị mức độ tin cậy khác 0 cho biết xác suất mà dữ liệu cơ sở
khả dụng.

:::

</TabItem>
<TabItem value="library">

Ngoài ra, bạn có thể sử dụng bảng điều khiển/typescript để tạo tài khoản Avail
qua [`@polkadot/api`](https://polkadot.js.org/docs/). Tạo một thư mục mới và thêm
thư viện JS bằng `yarn add @polkadot/api` hoặc `npm install @polkadot/api`

:::info

Đảm bảo rằng các đối tượng phụ thuộc Typescript được thêm vào để chạy tập lệnh. Ở đây,
`@polkadot/api` phiên bản `7.9.1` được sử dụng.

Bạn có thể sử dụng `ts-node` để thực thi các tệp Typescript trong bảng điều khiển. Sử dụng
`yarn add ts-node typescript '@types/node'` hoặc `npm i ts-node typescript '@types/node'`
để cài đặt các gói.

Ví dụ: nếu bạn tạo một tập lệnh có tên là `account.ts`, bạn có thể thực thi tập lệnh
trong dòng lệnh bằng cách chạy:

```bash

ts-node account.ts

```

Bạn cũng sẽ cần **[kết nối với một nút](../node/avail-node-management.md)** trước khi chạy
các tập lệnh.

:::

Để tạo tài khoản, hãy chạy tập lệnh sau:

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

Kết quả Mẫu:

```

test_pair has address 5Gq1hKAiSKFkdmcFjTt3U8KEaxDHp613hbdSmqJCRswMkwCB and the mnemonic is decrease lunar scatter pattern spoil alpha index trend vacant sorry scatter never

```

:::info Định dạng Địa chỉ

Vì Avail được triển khai bằng [Substrate](https://substrate.io/), các địa chỉ Substrate chung
luôn bắt đầu bằng số 5 và tuân theo **[định dạng địa chỉ SS58](https://docs.substrate.io/v3/advanced/ss58/)**.

:::

:::info Thuật toán ký và dẫn xuất khóa

Lý do sử dụng `sr25519` được nêu **[tại đây](https://wiki.polkadot.network/docs/learn-cryptography#keypairs-and-signing)**.

:::

Lưu địa chỉ mới tạo và cụm từ gợi nhớ cho các bước tiếp theo.

:::caution Quản lý Khóa

Cụm từ hạt giống là khóa tài khoản của bạn, khóa này kiểm soát tài khoản của bạn.
Bạn không nên lưu trữ cụm từ hạt giống của mình trên một thiết bị có hoặc có thể có quyền truy cập vào
mạng internet. Cụm từ hạt giống nên được viết ra và lưu trữ trên một phương tiện
phi kỹ thuật số.

:::

## Nhận Token Mạng thử nghiệm AVL {#receive-avl-testnet-tokens-1}

Đi đến [vòi Polygon](https://faucet.polygon.technology).

Trên trang vòi, chọn `DA (Test Token)` và `DA Network` lần lượt làm token và
mạng. Dán địa chỉ tài khoản của bạn và nhấp vào **Gửi**. Quy trình chuyển token này sẽ mất đến một
phút để hoàn thành.

<img src={useBaseUrl("img/avail/faucet.png")} width="100%" height="100%"/>

Sau khi chuyển thành công, tài khoản của bạn bây giờ sẽ có số dư khác 0. Nếu bạn gặp bất kỳ vấn đề nào khi nhận token từ vòi, vui lòng liên hệ với [đội ngũ hỗ trợ](https://support.polygon.technology/support/home).

### Kiểm tra Số dư với `@polkadot/api`

Sử dụng tập lệnh sau để kiểm tra số dư của tài khoản bạn vừa tạo:

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

Kết quả Mẫu:

```
You are connected to chain Avail-Testnet using Polygon Avail Node v3.0.0-6c8781e-x86_64-linux-gnu
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB
5HBCFfAs5gfqYgSinsr5s1nSZY2uRCh8MhYhXXp6Y9jNRJFB has balance of 0
```

> Bạn sẽ nhận được số dư là `0` nếu tài khoản mới được tạo và bạn chưa sử dụng vòi.
> Bạn cũng sẽ thấy xác nhận của giao dịch.

:::tip Sử dụng Trình khám phá Avail

Để thuận tiện, bạn có thể thêm tài khoản bạn đã tạo với
`@polkadot/api` trên giao diện người dùng của Trình khám phá Avail để thực hiện các tác vụ trên tài khoản.

:::

## Gửi một Giao dịch Mới {#submit-a-new-transaction-1}

Bạn có thể sử dụng các tập lệnh được cung cấp trong phần này để ký và gửi các giao dịch.

:::note

Thay thế `value` và `APP_ID` bằng những gì bạn muốn gửi.
Ngoài ra, hãy thay thế chuỗi gợi nhớ bằng chuỗi của riêng bạn.

:::

<Tabs
defaultValue="key-script"
values={[
{ label: 'Create an application key', value: 'key-script', },
{ label: 'Submit data', value: 'data-script', },
]
}>
<TabItem value="key-script">

Tập lệnh sau tạo khóa ứng dụng:

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

Tập lệnh sau gửi dữ liệu:

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

Bạn có thể đi đến [Trình khám phá Avail](https://testnet.polygonavail.net/#/explorer) và
danh sách sự kiện gần đây sẽ liệt kê giao dịch của bạn. Bạn có thể nhấp vào sự kiện và mở rộng sự kiện đó để kiểm tra
chi tiết giao dịch.

:::info Làm thế nào để đảm bảo rằng dữ liệu đằng sau giao dịch là có sẵn?

Bạn có thể sử dụng yêu cầu curl sau đây để kiểm tra mức độ tin cậy. Chỉ cần thay thế số khối bằng
số mà bạn muốn nhận được đảm bảo tính khả dụng.

```bash

curl -s -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"get_blockConfidence","params": {"number": block_number_here}, "id": 1}' 'https://polygon-da-light.matic.today/v1/json-rpc'

```
:::

</TabItem>
</Tabs>
