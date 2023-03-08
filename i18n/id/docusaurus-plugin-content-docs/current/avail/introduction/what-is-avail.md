---
id: what-is-avail
title: Avail oleh Polygon
sidebar_label: Introduction
description: Pelajari tentang rantai ketersediaan data Polygon
keywords:
  - docs
  - polygon
  - avail
  - availability
  - scale
  - rollup
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: what-is-avail
---

# Polygon Awail {#polygon-avail}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Avail adalah blockchain yang berfokus pada ketersediaan data: memesan dan merekam transaksi blockchain, dan memungkinkan untuk membuktikan bahwa data blok tersedia tanpa mengunduh seluruh blok. Hal ini memungkinkan untuk berskala dalam cara-cara yang tidak dapat dilakukan oleh blokchain.

:::info Lapisan Ketersediaan Data yang Dapat Diskalakan, Serbaguna, dan Tangguh

* Mengaktifkan solusi Layer-2 untuk menawarkan peningkatan scalability melalui cara memanfaatkan Avail untuk membangun Validium dengan ketersediaan data off-chain.

* Memungkinkan rantai atau sidechains yang berdiri sendiri dengan lingkungan eksekusi yang sewenang-wenang untuk membuka keamanan yang validator tanpa perlu membuat dan mengelola validator yang ditetapkan dengan menjamin ketersediaan data transaksi.

:::

## Tantangan Ketersediaan dan Penskalaan Saat Ini {#current-availability-and-scaling-challenges}

### Apa itu masalah ketersediaan data? {#what-is-the-data-availability-problem}

Peer di jaringan blockchain memerlukan cara untuk memastikan bahwa semua data dari blok yang baru diusulkan
siap tersedia. Jika data tidak tersedia, blok tersebut mungkin berisi transaksi jahat
yang sedang disembunyikan oleh produsen blok tersebut. Bahkan jika blok berisi transaksi yang tidak merusak,
menyembunyikannya dapat membahayakan keamanan sistem.

### Pendekatan Avail untuk ketersediaan data {#avail-s-approach-to-data-availability}

#### Jaminan Tinggi {#high-guarantee}

Avail memberikan jaminan yang dapat disediakan, tingkat tinggi yang tersedia bahwa data tersedia. Klien ringan dapat secara independen memverifikasi ketersediaan dalam jumlah pertanyaan yang konstan, tanpa mengunduh seluruh blok.

#### Kepercayaan Minimum {#minimum-trust}

Tidak perlu menjadi validator atau menyediakan node penuh. Bahkan dengan klien ringan, mendapatkan ketersediaan yang dapat diverifikasi.

#### Mudah Digunakan {#easy-to-use}

Solusi ini dibuat menggunakan Substrate yang dimodifikasi dan berfokus pada kemudahan penggunaan, apakah Anda menyediakan aplikasi atau
mengoperasikan solusi penskalaan off chain.

#### Sempurna untuk Penskalaan Off Chain {#perfect-for-off-chain-scaling}

Membuka potensi penskalaan penuh untuk solusi penskalaan off chain Anda dengan menyimpan data kepada kami dan
tetap menghindari masalah DA di L1.

#### Agnostik Eksekusi {#execution-agnostic}

Rantai yang menggunakan Awail dapat mengimplementasikan segala jenis lingkungan eksekusi tanpa memandang logika aplikasi. Transaksi dari segala lingkungan yang didukung: EVM, Wasm, atau bahkan VM baru yang belum dibangun. Avail sempurna untuk melakukan eksperimen dengan lapisan eksekusi baru.

#### Meningkatkan Keamanan {#bootstrapping-security}

Avail memungkinkan rantai baru untuk dibuat tanpa perlu untuk memutar set validator baru, dan tuas Availed Avail. Avail mengurus pengurutan transaksi dan ketersediaan dalam pertukaran untuk biaya transaksi (gas).

#### Finalitas yang terbukti cepat menggunakan NPoS {#fast-provable-finality-using-npos}

Finalitas cepat yang dapat dibuktikan melalui Proof of Stake yang Dinominasikan. Didukung oleh komitmen
KZG dan pengodean penghapusan.

Mulai dengan memeriksa [pos blog](https://blog.polygon.technology/polygon-research-ethereum-scaling-with-rollups-8a2c221bf644/) ini pada skala Ethereum dengan Rollup.

## Validium yang Didukung Avail {#avail-powered-validiums}

Karena arsitektur blok monolitik (seperti Ethereum dalam keadaan saat ini), mengoperasikan blockchain mahal, sehingga biaya transaksi yang tinggi. Rollup mencoba untuk mengekstrak beban eksekusi dengan menjalankan transaksi off-chain dan kemudian memposting hasil eksekusi dan data transaksi [yang biasanya] dikompresi.

Validiums adalah langkah berikutnya: alih-alih memposting data transaksi, ia disimpan di off-chain, di mana sebuah bukti/pengajuan hanya diposting ke lapisan dasar. Ini sejauh ini solusi yang paling efektif biaya, karena ketersediaan eksekusi dan data disimpan di off-chain sementara masih memungkinkan untuk verifikasi dan penyelesaian akhir pada rantai 1.

Avail adalah blockchain yang dioptimalkan untuk ketersediaan data. Semua gulungan yang ingin menjadi validium dapat beralih ke posting data transaksi ke Avail dan menyebarkan kontrak verifikasi yang, selain memverifikasi eksekusi yang benar, juga memverifikasi ketersediaan data.

:::note Pengesahan

Tim Avail akan membuat verifikasi ketersediaan data ini sederhana di Ethereum dengan membangun jembatan pengujian untuk mengirim pengujian data ke Ethereum. Ini akan membuat kontrak verifikasi menjadi pekerjaan yang sederhana, karena pengumuman DA sudah menjadi di rantai. Jembatan ini saat ini sedang dalam desain; tolong hubungi tim Awail untuk informasi lebih lanjut atau untuk bergabung dengan program akses awal kami.

:::

## Lihat juga {#see-also}

* [Memperkenalkan Avail oleh Polygon — Lapisan Ketersediaan Data yang Dapat Diskalakan, Serbaguna, dan Tangguh](https://polygontech.medium.com/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
* [Masalah Ketersediaan Data](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
