---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Maticjs 快速入门'
---

# getAllTokens {#getalltokens}

`getAllTokens` 方法可返回指定用户拥有的所有代币。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

您还可以通过在第二个参数中指定限值的方式来限制代币。
