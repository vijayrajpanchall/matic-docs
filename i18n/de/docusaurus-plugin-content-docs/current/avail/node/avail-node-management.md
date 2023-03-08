---
id: avail-node-management
title: Ausführen eines Avail-Knotens
sidebar_label: Run an Avail node
description: "Erfahren Sie mehr über die Ausführung eines Avail-Knotens."
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

:::tip Gängige Praxis

Benutzer führen Knoten oft auf einem Cloud-Server aus. Sie könnten auch einen VPS-Provider für die Ausführung Ihres Knotens in Betracht ziehen.

:::

## Voraussetzungen {#prerequisites}

Die folgende Liste der Standardhardware ist eine Empfehlung für die Hardwarespezifikationen, die Ihre Umgebung
haben sollte.

Folgende Hardwarespezifikationen sollten mindestens gegeben sein:

* 4 GB RAM
* Dual-Core-Prozessor
* 20–40 GB SSD

:::caution Wenn du einen Prüfer ausführen möchtest,

Die Hardwareempfehlungen für die Ausführung eines Validators auf einer Substrate-basierten Chain:

* CPU: Intel® Core™ i7-7700K-Prozessor 4,20 GHz
* Speicher: Ein NVMe-Solid-State-Laufwerk mit etwa 256 GB. Die Größe sollte angemessen sein, um mit
dem Wachstum der Blockchain umgehen zu können.
* RAM: 64 GB Arbeitsspeicher ECC

:::

### Knotenvoraussetzungen: Rust und Abhängigkeiten installieren {#node-prerequisites-install-rust-dependencies}

:::info Installationsschritte gemäß Substrate

Avail ist eine Substrate-basierte Chain und benötigt daher die gleiche Konfiguration, um eine Substrate Chain ausführen zu können.

Weitere Informationen zur Installation finden Sie in der Dokumentation
**[Substrate – Erste Schritte](https://docs.substrate.io/v3/getting-started/installation/)**.

:::

Sobald Sie eine Umgebung für Ihren Knoten ausgewählt haben, stellen Sie sicher, dass Rust installiert ist.
Wenn Sie Rust bereits installiert haben, führen Sie den folgenden Befehl aus, um sicherzustellen, dass Sie die neueste Version verwenden.

```sh
rustup update
```

Wenn nicht, führen Sie zunächst den folgenden Befehl aus, um die neueste Version von Rust abzurufen:

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

Führen Sie zum Konfigurieren Ihrer Shell Folgendes aus:

```sh
source $HOME/.cargo/env
```

Überprüfen Sie Ihre Installation mit:

```sh
rustc --version
```

## Avail lokal ausführen {#run-avail-locally}

Klonen Sie den [Avail-Quellcode](https://github.com/maticnetwork/avail):

```sh
git clone git@github.com:maticnetwork/avail.git
```

Kompilieren Sie den Quellcode:

```sh
cargo build --release
```

:::caution Dieser Vorgang braucht normalerweise etwas Zeit

:::

Starten Sie einen lokalen Dev-Knoten mit temporärem Datenspeicher:

```sh
./target/release/data-avail --dev --tmp
```
