---
id: avail-node-management
title: Gestire un nodo Avail
sidebar_label: Run an Avail node
description: "Scopri come gestire un nodo di Avail"
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

:::tip Prassi comune

Gli utenti spesso gestiscono i nodi su un cloud server. Per gestire il tuo nodo, puoi prendere in considerazione un provider VPS.

:::

## Prerequisiti {#prerequisites}

Di seguito puoi trovare una lista di specifiche hardware standard di cui dovresti disporre.

Le specifiche hardware minime sono:

* 4GB RAM
* 2 core CPU
* 20-40 GB SSD

:::caution Se pianifica di eseguire un validatore

Raccomandazioni hardware per gestire un validatore su una catena basata su Substrate:

* :CPU - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
* Spazio di archiviazione - Un SSD NVMe con circa 256 GB. Le dimensioni devono tener conto dell'aumento delle dimensioni della blockchain.
* Memoria - 64 gb ECC

:::

### Prerequisiti del nodo: installare Rust e le dipendenze {#node-prerequisites-install-rust-dependencies}

:::info Installazione passo passo di Substrate

Avail è una catena basata su Substrate e richiede la medesima configurazione per gestire una catena Substrate.

Per ulteriori informazioni sull'installazione, consultare la **[documentazione introduttiva](https://docs.substrate.io/v3/getting-started/installation/)** di Substrate.

:::

Una volta scelto l'ambiente su cui eseguire il nodo, assicurati di aver installato Rust. Se Rust è già installato, esegui il seguente comando per assicurarti di disporre della versione aggiornata.

```sh
rustup update
```

In caso contrario, inizia eseguendo il seguente comando per ottenere l'ultima versione di Rust:

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

Per configurare la shell, esegui:

```sh
source $HOME/.cargo/env
```

Verifica l'installazione con:

```sh
rustc --version
```

## Eseguire Avail localmente {#run-avail-locally}

Clona il [codice sorgente di Avail](https://github.com/maticnetwork/avail):

```sh
git clone git@github.com:maticnetwork/avail.git
```

Compila il codice sorgente:

```sh
cargo build --release
```

:::caution Il processo richiede un po' di tempo

:::

Gestire un nodo sviluppatore locale con un datastore temporaneo:

```sh
./target/release/data-avail --dev --tmp
```
