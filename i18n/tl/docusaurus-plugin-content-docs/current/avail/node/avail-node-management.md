---
id: avail-node-management
title: Patakbuhin ang Avail Node
sidebar_label: Run an Avail node
description: "Matuto tungkol sa pagpapatakbo ng Avail node."
keywords:
  - docs
  - polygon
  - avail
  - node
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: avail-node-management
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip Karaniwang pagsasanay

Madalas na pinapatakbo ng mga user ang mga node sa cloud server. Maaari mong isaalang-alang ang paggamit ng VPS na tagapagbigay upang patakbuhin ang iyong node.

:::

## Mga Paunang Kinakailangan {#prerequisites}

Isang rekomendasyon ng mga detalye ng hardware ang sumusunod na listahan ng karaniwang hardware na ang iyong environment ay dapat na
mayroon.

Ang mga detalye ng hardware ay dapat na may:

* 4 GB RAM
* 2 core na CPU
* 20-40 GB SSD

:::caution Kung plano mong magpatakbo ng validator

Ang mga rekomendasyon sa hardware para sa pagpapatakbo ng validator sa a chain na nakabatay sa substrate:

* CPU - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
* Imbakan - Isang NVMe solid ang kalagayan na drive na may 256 GB. Dapat na makatwirang sukat upang tugunan ang
paglago ng blockchain.
* Memory - 64 GB ECC

:::

### Mga kinakailangan sa node: I-install ang Rust at ang mga dependency {#node-prerequisites-install-rust-dependencies}

:::info Mga hakbang sa pag-install sa pamamagitan ng Substrate

Ang Avail ay nakabatay sa substrate na chain at nangangailangan ng parehong pagsasaayos upang patakbuhin sa chain ng Substrate.

Ang karagdagang dokumentasyon sa pag-install ay makukuha sa Substrate
**[pagsisimula ng dokumentasyon](https://docs.substrate.io/v3/getting-started/installation/)**.

:::

Sa sandaling pumili ka ng environment upang patakbuhin ang iyong node, tiyaking naka-install ang rust. Kung mayroon ka nang naka-install na Rust, patakbuhin ang sumusunod na command upang matiyak na ginagamit mo ang pinakabagong bersyon.

```sh
rustup update
```

Kung hindi, simulan sa pamamagitan ng pagpapatakbo ng sumusunod na command para kunin ang pinakabagong bersyon ng Rust:

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

Upang i-configure ang iyong shell, patakbuhin ang:

```sh
source $HOME/.cargo/env
```

I-verify ang iyong pag-install gamit ang:

```sh
rustc --version
```

## Patakbuhin ang Avail nang lokal {#run-avail-locally}

I-clone ang [source code ng Avail](https://github.com/maticnetwork/avail):

```sh
git clone git@github.com:maticnetwork/avail.git
```

I-compile ang pinagmulang code:

```sh
cargo build --release
```

:::caution Ang prosesong ito ay karaniwang tumatagal ng ilang oras

:::

Magpatakbo ng lokal na dev node na may pansamantalang datastore

```sh
./target/release/data-avail --dev --tmp
```
