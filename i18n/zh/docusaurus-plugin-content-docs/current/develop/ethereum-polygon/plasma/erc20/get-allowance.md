---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Maticjs 快速入门'
---

# getAllowance {#getallowance}

`getAllowance` 方法可为用户获取批准的数量。

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
