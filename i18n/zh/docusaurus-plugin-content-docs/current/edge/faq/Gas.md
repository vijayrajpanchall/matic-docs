---
id: gas
title: 燃料常见问题解答
description: "Polygon Edge 的燃料常见问题解答"
keywords:
  - docs
  - polygon
  - edge
  - FAQ
  - validators

---

## 如何执行最低燃料价格？ {#how-to-enforce-a-minimum-gas-price}
您可以使用服务器指令提供的`--price-limit`标志。您的节点只能接受燃料价格高于或等于您设定的价格限制的交易。为确保它应用于整个网络，您需要确保所有的节点都有相同的价格限制。


## 是否可以有包含 0 燃料费的交易？ {#can-you-have-transactions-with-0-gas-fees}
可以。节点的默认值限制是`0`，意味着节点接受燃料值设置为`0`的燃料价格。

## 如何设置燃料（原生）代币总供应？ {#how-to-set-the-gas-native-token-total-supply}

您可以使用`--premine flag`设置账号（地址）的预开采余额。请注意这是来自 genesis 文件的配置，之后无法更改。

如何使用`--premine flag`的例子：

`--premine=0x3956E90e632AEbBF34DEB49b71c28A83Bc029862:1000000000000000000000`

这设定了 1000 以太币的预开采余额至 0x3956E90e632AEbBF34DEB49b71c28A83Bc029862（参数的值为wei）。

燃料代币的预开采数量是总供应。之后无法铸造其他数量的原生货币（燃料代币）。

## Edge 是否支持 ERC-20 作为燃料代币？ {#does-edge-support-erc-20-as-a-gas-token}

Edge 不支持 ERC-2 代币作为燃料代币。只有原生 Edge 货币才支持燃料。

## 如何提高气体限制？ {#how-to-increase-the-gas-limit}

在 Polygon 边缘中，有两个增加 气体限制的选项：
1. 在基因系统文件中，销毁链并增加`block-gas-limit`到最大 uint64 值
2. 使用具有高值的`--block-gas-target`标志来增加所有节点的气体限制。这需要节点重启。[此处](/docs/edge/architecture/modules/txpool/#block-gas-target)详细解释。