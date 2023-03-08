---
id: network-agnostics
title: 网络隐式交易
sidebar_label: Network Agnostic Transactions
description: "在您的去中心化应用程序中集成网络隐式交易。"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

## 目标 {#goal}

在 Polygon 链上执行交易，无需更改 Metamask 上的提供者（本教程面向 Metamask 的页面内提供者，可进行修改以执行来自任何其他提供者的交易）

在后台，用户签署交易执行意图，该交易通过简单中继器中继，在部署在 Polygon 链上的合约执行。


## 如何实现交易执行？ {#what-is-enabling-transaction-execution}

用户交互客户端（网络浏览器、移动应用程序等）从不与区块链交互，而是与简单的中继服务器（或中继网络）交互，类似于 GSN 或任何元交易解决方案的工作方式（详见： [Meta 交易：概论](https://www.notion.so/Meta-Transactions-An-Introduction-8f54cf75321e4ec3b6d755e18e406590)）。

对于要求进行区块链交互的任何行动，

- 客户端请求用户使用 EIP712 格式签名
- 签名发送至简单的中继服务器（如果用于生产，应提供简单的身份验证/垃圾邮件保护，或者可以使用 Biconomy 的 Mexa Sdk： [https://github.com/bcnmy/mexa-sdk](https://github.com/bcnmy/mexa-sdk)）
- 中继器与区块链交互，以便于将用户签名提交给合约。合约上的 `executeMetaTransaction` 函数处理签名并执行请求的交易（通过内部调用）。
- 中继器支付燃料费，从而可以免费交易 🤑

## 在您的去中心化应用程序中集成网络隐式交易 {#integrate-network-agnostic-transactions-in-your-dapp}

- 在自定义的简单中继节点/ Biconomy 之间进行选择。

  - 就 Biconomy 而言，从仪表板上设置一个去中心化应用程序并保存 api-id 和 api-key，详见： [教程： Biconomy](https://www.notion.so/Tutorial-Biconomy-7f578bfb4e7d4904b8c79522085ba568) 或 [https://docs.biconomy.io/](https://docs.biconomy.io/)

  **步骤：**

    1. 在 Biconomy 仪表板上注册我们的合约
       1. 访问 [Biconomy 官方文档](https://docs.biconomy.io/biconomy-dashboard)。
       2. 在注册去中心化应用程序时，请选择 `Polygon Mumbai`
    2. 复制 `API key` 在前端中使用
    3. 在 Manage-Api 中添加 `executeMetaTransaction` 函数，并确保启用元交易。（检查“本地元交易”选项）

  - 如果您想使用自定义的 API，发送在区块链上签名交易，您可以在此提及服务器代码：[https://github.com/angelagilhotra/ETHOnline-Wharks/tree/master/2-network-undictic-转账](https://github.com/angelagilhotra/ETHOnline-Workshop/tree/master/2-network-agnostic-transfer)

- 确保您希望交互的合约继承自 `NativeMetaTransactions` — 👀 查看合约中的 `executeMetaTransaction` 函数。
- 链接： [https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338](https://github.com/maticnetwork/pos-portal/blob/34be03cfd227c25b49c5791ffba6a4ffc9b76036/flat/ChildERC20.sol#L1338)



```jsx

let data = await web3.eth.abi.encodeFunctionCall({
    name: 'getNonce',
    type: 'function',
    inputs: [{
        name: "user",
        type: "address"
      }]
  }, [accounts[0]]);

  let _nonce = await web3.eth.call ({
    to: token["80001"],
    data
  });

  const dataToSign = getTypedData({
    name: token["name"],
    version: '1',
    salt: '0x0000000000000000000000000000000000000000000000000000000000013881',
    verifyingContract: token["80001"],
    nonce: parseInt(_nonce),
    from: accounts[0],
    functionSignature: functionSig
  });

  const msgParams = [accounts[0], JSON.stringify(dataToSign)];

  let sig = await eth.request ({
    method: 'eth_signTypedData_v3',
    params: msgParams
  });

  ```


- 在拥有中继器和设置合约后，客户端需要能够获取 EIP712 格式的签名并直接使用所需参数调用 API

参见：[https://github.com/angelagilhotra/ETHOnline-Whurkop/6b615b8a4ef0553c17729c721572529303c8e1b/2-network-instrine-trangetic-tranger/sign.js#L47](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L47)

    ```jsx

    let data = await web3.eth.abi.encodeFunctionCall({
        name: 'getNonce',
        type: 'function',
        inputs: [{
            name: "user",
            type: "address"
          }]
      }, [accounts[0]]);

      let _nonce = await web3.eth.call ({
        to: token["80001"],
        data
      });

      const dataToSign = getTypedData({
        name: token["name"],
        version: '1',
        salt: '0x0000000000000000000000000000000000000000000000000000000000013881',
        verifyingContract: token["80001"],
        nonce: parseInt(_nonce),
        from: accounts[0],
        functionSignature: functionSig
      });
      const msgParams = [accounts[0], JSON.stringify(dataToSign)];

      let sig = await eth.request ({
        method: 'eth_signTypedData_v3',
        params: msgParams
      });
    ```

调用 API，参见：[https://github.com/angelagilhotra/ETHOnline-Whurkine/blob/6b615b8a4ef0553c17729c721572529303c8e1b/2-network-undictic-trangic-trangatic-trangic-sign.js#L110](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/sign.js#L110)

    ```jsx
    const response = await request.post(
        'http://localhost:3000/exec', {
          json: txObj,
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          document.getElementById(el).innerHTML =
          `response:`+ JSON.stringify(body)
        }
      )
    ```

    如果使用 Biconomy，则应调用以下项：

    ```jsx
    const response = await request.post(
        'https://api.biconomy.io/api/v2/meta-tx/native', {
          json: txObj,
        },
        (error, res, body) => {
          if (error) {
            console.error(error)
            return
          }
          document.getElementById(el).innerHTML =
          `response:`+ JSON.stringify(body)
        }
      )
    ```

    其中 `txObj` 的外观是：

    ```json
    {
        "to": "0x2395d740789d8C27C139C62d1aF786c77c9a1Ef1",
        "apiId": <API ID COPIED FROM THE API PAGE>,
        "params": [
            "0x2173fdd5427c99357ba0dd5e34c964b08079a695",
            "0x2e1a7d4d000000000000000000000000000000000000000000000000000000000000000a",
            "0x42da8b5ac3f1c5c35c3eb38d639a780ec973744f11ff75b81bbf916300411602",
            "0x32bf1451a3e999b57822bc1a9b8bfdfeb0da59aa330c247e4befafa997a11de9",
            "27"
        ],
        "from": "0x2173fdd5427c99357ba0dd5e34c964b08079a695"
    }
    ```

- 如果您使用自定义 API，它将执行合约上的 `executeMetaTransaction` 函数：

（参见：[https://github.com/angelagilhotra/ETHOnline-Whoks/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-indic-tranger/server/index.js#L40）](https://github.com/angelagilhotra/ETHOnline-Workshop/blob/6b615b8a4ef00553c17729c721572529303c8e1b/2-network-agnostic-transfer/server/index.js#L40)

    ```jsx
    try {
        let tx = await contract.methods.executeMetaTransaction(
          txDetails.from, txDetails.fnSig, r, s, v
        ).send ({
          from: user,
          gas: 800000
        })
        req.txHash = tx.transactionHash
      } catch (err) {
        console.log (err)
        next(err)
      }
    ```

    使用 Biconomy，客户端的外观是：

    ```jsx
    // client/src/App.js
    import React from "react";
    import Biconomy from "@biconomy/mexa";

    const getWeb3 = new Web3(biconomy);
    biconomy
        .onEvent(biconomy.READY, () => {
          // Initialize your dapp here like getting user accounts etc
          console.log("Mexa is Ready");
        })
        .onEvent(biconomy.ERROR, (error, message) => {
          // Handle error while initializing mexa
    			console.error(error);
        });

    /**
    * use the getWeb3 object to define a contract and calling the function directly
    */

    ```
