---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "获取用户批准的数量。"
---

`getAllowance` 方法可用于获取用户批准的数量。

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

获得批准的地址被称为 `spenderAddress`。它是第三方用户或智能合约，可代表您进行代币转账。

默认情况下，spenderAddress 值为 ERC20 谓词地址。

您可以手动指定 spenderAddress 值。

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
