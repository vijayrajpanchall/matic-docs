---
id: torus
title: Torus
description: Torus 是dApps 非保管密钥管理系统
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Torus 是一种方便用户、安全和非保管密钥管理系统，用于分散应用程序。我们专注于为主流用户提供通往去中心化生态系统的门户。

**类型：**非保管/ HD<br/>**私钥**存储：用户的本地浏览器存储/加密并在托鲁斯服务器上储存<br/>**以太坊账本通信**： Infura <br/>
**私人密钥编码：** Mnemonic / Social-Auth-login<br/>

根据您的应用需要，Torus 可以通过 Torus 钱包进行整合，或者通过 CustrustAuth 直接与 Torus 网络互动。有关详细信息，请访问 [Torus 文档](https://docs.tor.us/)。

## 托鲁斯金钱集成 {#torus-wallet-integration}

如果您的应用已经与 MetaMask 或任何其他 Web3 提供者兼容，整合 Torus 钱包将使您可以让提供者包装相同的 Web3 界面。您可以通过 npm 软件包安装。欲了解更多方式和深入信息，请访问官方的钱[包集成](https://docs.tor.us/wallet/get-started)文件Torus 文档。

### 安装 {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### 示例 {#example}

```js title="torus-example.js"
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});

await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});

await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## 自定义Auth 集成 {#customauth-integration}

如果您希望控制自己的 UX，从登录到每次互动，则您可以使用 CustunAuth。您可以通过其 SDK 进行整合，取决于您所建立的平台。有关详细信息，请访问 [Torus 自定义Auth 集成。](https://docs.tor.us/customauth/get-started)
