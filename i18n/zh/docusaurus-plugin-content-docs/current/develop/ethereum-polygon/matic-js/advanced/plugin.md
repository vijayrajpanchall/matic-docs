---
id: plugin
title: 插件
keywords:
- 'plugin, api type, read, write, polygon'
description: '使用插件将代码注入 Matic.js。'
---

您可以使用插件将代码注入 `matic.js`。 它可用来编写通用代码集，后者可提供给使用程序包的任何人。

:::info
插件可帮助 `matic.js` 瘦身，因为它仅需实现重要的逻辑部分。

:::

事实上，Web3 库由插件提供支持，我们可通过插件使用常用库。

### 插件开发 {#plugin-development}

插件是一个可实现 `IPlugin` 的类。

```
import { IPlugin } from "@maticnetwork/maticjs";

export class MyPlugin implements IPlugin {

    // variable matic is - default export of matic.js
    setup(matic) {

        // get web3client
        const web3Client = matic.Web3Client ;
    }
}
```

如您所见 - 您只需要实现 `setup` 方法，该方法将通过 `matic.js` 的默认导出进行调用。

### 使用插件 {#use-plugin}

`matic.js` 公开`use`使用插件的方法。

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

您可以使用多个插件，它们将按照声明的顺序被调用。

**插件库包括 -**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
