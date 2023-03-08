---
id: avail-node-management
title: Menjalankan Node Avail
sidebar_label: Run an Avail node
description: "Pelajari tentang menjalankan node Avail."
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

:::tip Praktik umum

Pengguna sering menjalankan node di server cloud. Anda dapat mempertimbangkan penggunaan penyedia VPS untuk menjalankan node Anda.

:::

## Prasyarat {#prerequisites}

Daftar perangkat keras standar berikut adalah rekomendasi spesifikasi perangkat kerja yang lingkungan Anda
harus miliki.

Spesifikasi perangkat keras itu harus setidaknya memiliki:

* RAM 4 GB
* CPU 2 core
* SSD 20-40 GB

:::caution Jika Anda berencana menjalankan validator

Rekomendasi perangkat keras untuk menjalankan validator di rantai berbasis Substrat:

* CPU - Intel(R) Core(TM) i7-7700K CPU @ 4,20 GHz
* Penyimpanan - NVMe solid state drive dengan kapasitas sekitar 256 GB. Harus berukuran memadai untuk menangani
pertumbuhan blockchain.
* Memory - 64 GB ECC

:::

### Prasyarat node: Instal Rust & dependensi-nya {#node-prerequisites-install-rust-dependencies}

:::info Langkah-langkah instalasi oleh Substrat

Avail adalah rantai berbasis Substrat dan membutuhkan konfigurasi yang sama untuk menjalankan rantai Substrat.

Dokumentasi instalasi tambahan tersedia di
**[dokumentasi untuk memulai](https://docs.substrate.io/v3/getting-started/installation/)** Substrat.

:::

Setelah Anda memilih lingkungan untuk menjalankan node, pastikan Rust sudah terinstal.
Jika Anda sudah menginstal Rust, jalankan perintah berikut untuk memastikan Anda menggunakan versi terbaru.

```sh
rustup update
```

Jika belum, mulailah dengan menjalankan perintah berikut untuk mengambil Rust versi terbaru:

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

Untuk mengonfigurasi shell Anda, jalankan:

```sh
source $HOME/.cargo/env
```

Verifikasi instalasi Anda dengan:

```sh
rustc --version
```

## Jalankan Avail secara Lokal {#run-avail-locally}

Klonakan [Kode sumber Avail](https://github.com/maticnetwork/avail):

```sh
git clone git@github.com:maticnetwork/avail.git
```

Kumpulkan kode sumber:

```sh
cargo build --release
```

:::caution Proses ini biasanya butuh waktu

:::

Jalankan node dev lokal dengan datastore sementara:

```sh
./target/release/data-avail --dev --tmp
```
