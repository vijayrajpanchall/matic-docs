---
id: custom-tokens
title: 配置自定义代币
description: 在 Metamask 上配置自定义代币。
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

本页显示了将自定义代币组建/添加到 Metamask 的过程。

您可以使用相同的处理来将任何自定义代币添加到 Metamask 上的任何网络中。您可以参考[该表](#tokens-and-contract-adresses)，以视觉化一些测试代币的实例，使用其各自的合约地址。

## 在 MetaMask 账户中添加自定义代币 {#adding-a-custom-token-to-your-metamask-account}

首先，在 Metakask 主屏幕上选择适当的代币网络。然后单击“导入时机”。

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

然后，它将导航您进入新的屏幕。在“导入时机”屏幕上，复制打印在“时机地址”字段中的一处地址。

:::info
为了说明此过程，我们正在**使用 Goerli 网络**上使用 E**RC20-TESTV4 **代币。[<ins>在</ins>](#tokens-and-contract-adresses)此处从其他网络中查找其他测试代币。
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

其他字段将自动填充。单击“添加自定义代码”，然后单击“导入代码”。您在 Metamask 上的账户现在可显示 `TEST` 代币。

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**添加 ERC1155 测试代币到您的 Metamask 账户**

虽然 Polygon 网络支持 ERC1155，但 [Metamask 目前还不支持该标准](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-)。此更新预计将在 2021 年第四季度发布。

### 时机和合约加载 {#tokens-and-contract-adresses}

| 代币 | 网络 | 合约地址 |
|---------------|---------|----------------------------------------------|
| ERC20-TESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TESTV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TESTV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |