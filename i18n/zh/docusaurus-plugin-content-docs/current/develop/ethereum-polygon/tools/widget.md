---
id: widget
title: 钱包小组件
sidebar_label: Wallet Widget
description: "UI 工具用于执行桥接交易。"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

钱包小组件是一个 UI 工具，可嵌入用于执行桥接交易的任何网络应用程序 — 存入和提取。

每个小组件都会采用独特的名称来标识，详情见[小组件仪表板](https://wallet.polygon.technology/widget-dashboard)。

### 小组件仪表板 {#widget-dashboard}

小组件可以从钱包应用程序的小组件仪表板页面创建。它允许用户使用一些可自定义的选项创建新的小组件。

小组件创建后，您可以复制代码片段并添加到应用程序中，或者使用您自行选择的小组件名称和配置。

以下是小组件仪表板链接 —

* 主网 — https://wallet.polygon.technology/widget-dashboard
* 测试网 — https://wallet-dev.polygon.technology/widget-dashboard

## 安装 {#install}

小组件作为 Javascript 库导出，可作为 NPM 软件包使用。

```bash
npm i @maticnetwork/wallet-widget
```

## 示例 {#examples}

我们已经对不同框架和工具创建示例，以帮助您进行开发。所有的示例都可以在该网址找到 — [https://github.com/maticnetwork/wallet-widget-example](https://github.com/maticnetwork/wallet-widget-example)

## 如何使用 {#how-to-use}
### 具有目标 {#with-target}

假设您的应用程序中有一个按钮，您希望在点击该按钮显示小组件 —

```html
<button id="btnMaticWidget"></btn>
```

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'mainnet' // network to be used - testnet or mainnet
});
```

您可以在准备完毕后创建小组件。最好在加载文档后调用创建函数。

```javascript
await widget.create();
```
小组件创建后，点击按钮显示小组件。

### 没有目标 {#without-target}

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    network: 'mainnet' // network to be used - testnet or mainnet
});

await widget.create();
```

小组件已创建完成。但为了显示小组件，您必须调用`show`应用程序接口 (API)。

```
widget.show();
```

同样，您还可以通过调用`hide`应用程序接口 (API) 来隐藏小组件。

```
widget.hide();
```

### 注意事项 👉 {#important-note}

1. 您需要在相应的仪表板上创建您的应用程序，具体取决于网络是“测试网”还是“主网”。我们建议在测试网和主网上创建具有相同名称的应用程序，确保在网络切换时不会发生任何问题。

2. 钱包小组件是 UI 库，它在不同的网站上外观会有差异，并且可能存在一些问题，例如颜色、响应性等。请务必花上一些时间进行测试和定制。如需要任何帮助，请联系[支持团队](https://support.polygon.technology/)。

3. 钱包小组件在移动设备中全屏显示，但您可以通过`style`配置来自定义。

## 配置 {#configuration}

配置可以在小组件构造函数中提供。

## 可用的配置是 {#available-configuration-are}

- **target** ： 字符串 — 用于在点击元素时显示小组件的 CSS 选择器。例如， #btnMaticWidget" 将成为以下代码中的目标。

```javascript
<button id="btnMaticWidget">Matic widget</button>
```

- **network** ： 字符串 — 要使用的网络。两个选项可供选择 — “测试网”或“主网”。
- **width** ： 数字 — 小组件的宽度
- **height** ： 数字 — 小组件的高度
- **autoShowTime** ： 数字 — 到达指定时间自动显示小组件（以毫秒为单位）
- **appName** ： 字符串 — 您的应用程序名称，可在小组件仪表板上检索。
- **position** ： 字符串 — 小组件的位置。可供选择的选项包括 —
    - 中心
    - 右下角
    - 左下角
- **amount** ： 字符串 — 在文本框中预填充数量
- **page** ： 字符串 — 选择页面。可供选择的选项包括 — `withdraw`、 `deposit`。
- **overlay** ： 布尔值 — 在小组件打开时显示覆盖内容。默认情况下为假。
- **style** ： 对象 — 将一些 CSS 样式应用于小组件。

```
var widget = new MaticWidget({
    appName: "<your app id>", //appName from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'testnet' // network to be used - testnet or mainnet,
    style:{
      color:'red'
    }
});
```

## 事件 {#events}

小组件会发送一些事件，用于了解应用程序内部发生的情况。

### 事件订阅 {#subscribe-to-events}

```javascript
widget.on('load',()=>{
  console.log('widget is loaded');
})
```

### 取消事件订阅 {#unsubscribe-to-events}

```javascript
widget.off('load',<callback>)
```

> 回调应与事件订阅使用的相同。因此最好将回调存储到变量中。`

## 事件列表： {#list-of-events}

- **load** — 加载小组件
- **close** — 关闭小组件
- **approveInit** — 初始化批准交易
- **approveComplete** — 完成批准交易
- **approveError** — 由于出错导致批准交易失败，或者用户在 Metamask 上拒绝交易
- **depositInit** — 初始化存入交易
- **depositComplete** — 完成存入交易
- **depositError** — 由于出错导致存入交易失败，或者用户在 Metamask 上拒绝完成存入交易
- **burnInit** — 初始化提现燃烧交易
- **burnComplete** — 完成提现燃烧交易
- **confirmWithdrawInit** — 提现到达检查点，确认交易已初始化
- **confirmWithdrawComplete** — 提现确认交易已完成
- **confirmWithdrawError** — 由于出错导致提现确认交易失败，或者用户拒绝在 Metamask 上提现确认交易
- **exitInit** — 初始化提现出口交易
- **exitComplete** — 已完成提现出口交易
- **exitError** — 由于出错导致提现退出交易失败，或者用户拒绝在 Metamask 上提现退出交易

## APIS {#apis}

- **显示** —显示小组件

```javascript
widget.show()
```

- **隐藏** —隐藏小组件

```javascript
widget.hide()
```

- **开启** —事件订阅

```javascript
widget.on('<event name>', callback)
```

- **关闭** —取消事件订阅

```javascript
widget.off('<event name>', callback)
```
