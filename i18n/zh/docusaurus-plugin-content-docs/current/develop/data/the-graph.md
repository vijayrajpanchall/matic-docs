---
id: the-graph
title: 使用 The Graph 和 Polygon PoS 设置项目
sidebar_label: The Graph
description: 了解如何使用 The Graph 和 Polygon 建立托管项目。
keywords:
  - polygon
  - matic
  - graph
  - the graph
  - index
  - query
  - subgraph
image: https://matic.network/banners/matic-network-16x9.png
slug: graph
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Graph 是一个可用于链上数据索引和查询的去中心化协议，支持 Matic 链。数据通过子图定义，易于查询和探索。 子图可以在本地创建，或者使用免费的托管浏览器进行索引和数据显示。

> 注意：如需了解本地安装等更多详情，请参阅 https://thegraph.com/docs/quick-start。文档中包含子图运作原理的示例，本视频提供了精彩介绍。

## 步骤 {#steps}

1. 访问 Graph Explorer (https://thegraph.com/explorer/) 并设置一个账户。您将需要一个 GitHub 账户，以便进行身份验证。

2. 访问您的仪表板，然后单击 Add Subgraph。定义子图名称、账户和副标题，并根据需要更新图片和其他信息（可稍后更新）。

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. 在您的设备上安装 Graph CLI（使用 NPM 或 yarn）

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. 使用以下命令创建一个子图，索引现存合约的所有事件。它将尝试从 BlockScout 获取合约 ABI，并回退以请求本地文件路径。如果缺失任何可选参数，则将显示交互式表单。

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Matic” for Matic mainnet and “Mumbai” for Matic Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on the Matic network: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> 注意：详情请参见：https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. 使用托管服务进行身份验证

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
您可访问 Graph 网站上的仪表板，查看访问令牌。

6. 通过 cd 指令进入您创建的目录，并开始定义子图。有关创建子图的信息，请访问 Graph 文档：https://thegraph.com/docs/define-a-subgraph

7. 准备就绪后，即可部署您的子图。您可随时根据需要进行测试和重新部署。

> 如果您之前部署的子图仍处于 Syncing 状态，则会立即被替换为新部署的版本。如果先前部署的子图已经完全同步，Graph Node 会将新部署的版本标记为 Pending Version，并在后端同步，新版本同步完成后，才会将当前已部署的版本替换为新版本。这可确保在新版本同步时，您有可供使用的子图。

```bash
yarn deploy
```

您的子图将被部署，并可从您的仪表板访问。

您可访问以下链接，了解如何查询子图：https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

如果您想公开子图，则可从仪表板访问您的子图，然后单击编辑按钮。您将在编辑页面底部看到滑块。
