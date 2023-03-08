---
id: faq
title: FAQ
sidebar_label: FAQ
description: FAQ tentang Polygon Avail
keywords:
  - docs
  - polygon
  - avail
  - availability
  - client
  - consensus
  - faq
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: faq
---

# Pertanyaan Yang Sering Ditanyakan {#frequently-asked-questions}

:::tip

Jika Anda tidak menemukan pertanyaan di halaman ini, silakan masukkan pertanyaan Anda pada **[<ins>server Perselisihan Ajail Polygon</ins>](https://discord.gg/jXbK2DDeNt)**.

:::

## Apa itu klien ringan? {#what-is-a-light-client}

Klien ringan memungkinkan pengguna untuk berinteraksi dengan jaringan blockchain tanpa harus sync blockchain penuh sambil mempertahankan desentralisasi dan keamanan. Secara umum, mereka mengunduh header blockchain tetapi tidak isi dari setiap blok. Avail (DA) klien ringan juga memverifikasi bahwa isi blok tersedia dengan melakukan Sambungan Ketersediaan Data , sebuah teknik di mana bagian acak kecil dari blok diunduh.

## Apa kasus penggunaan yang populer untuk klien ringan? {#what-is-a-popular-use-case-of-a-light-client}

Ada banyak kasus penggunaan yang saat ini bergantung pada perantara untuk mempertahankan node penuh, sehingga pengguna akhir dari blockchain tidak berkomunikasi secara langsung dengan blockchain tetapi melalui perantara. klien ringan sampai sekarang tidak menjadi pengganti yang cocok untuk arsitektur ini karena mereka tidak memiliki jaminan ketersediaan data. Avail menyelesaikan masalah ini, sehingga memungkinkan lebih banyak aplikasi untuk berpartisipasi secara langsung pada jaringan blockchain tanpa perantara. Meskipun Avail mendukung node penuh, kami mengharapkan sebagian besar aplikasi tidak perlu menjalankan satu atau perlu menjalankan lebih sedikit.

## Apa itu pengambilan sampel ketersediaan data? {#what-is-data-availability-sampling}

Klien Avail light, seperti klien ringan lainnya, hanya mengunduh header dari blockchain. Namun, mereka melakukan tambahan ketersediaan data: teknik yang secara acak sampel bagian kecil dari data blok dan memverifikasi bahwa mereka benar. Ketika dikombinasikan dengan pengkodean dan komitmen polinomial Kate, klien Avail mampu memberikan jaminan yang kuat (hampir 100%) tanpa mengandalkan bukti-bukti penipuan, dan dengan hanya sejumlah kecil pertanyaan

## Bagaimana pengodean penghapusan digunakan untuk meningkatkan jaminan ketersediaan data? {#how-is-erasure-coding-used-to-increase-data-availability-guarantees}

Pengkodean Erasure adalah teknik yang mengkodekan data dengan cara yang menyebarkan informasi atas beberapa "shards", sehingga hilangnya beberapa pecahan dari shards dapat ditolerir. Artinya, informasi dapat direkonstruksi dari shards lainnya. Terapkan ke blockchain, ini berarti bahwa secara efektif meningkatkan ukuran setiap blok, tetapi kita mencegah aktor berbahaya dari mampu menyembunyikan bagian dari blok sampai ukuran shard.

Karena aktor berbahaya perlu menyembunyikan bagian besar blok untuk mencoba menyembunyikan bahkan transaksi tunggal, membuatnya lebih mungkin bahwa pengambilan sampel acak akan menangkap celah besar dalam data. Efektif, sampling membuat coding data membuat teknik sampling lebih kuat.

## Apa itu komitmen Kate? {#what-are-kate-commitments}

Komitmen Kate, yang diperkenalkan oleh Aniket Kate, Gregory M. Zaverucha, dan Ian Goldberg pada 2010, menyediakan
cara untuk melakukan polinomial dengan cara yang ringkas. Baru-baru ini, komitmen polinomial tampil di garis depan,
terutama digunakan sebagai komitmen dalam konstruksi pengetahuan nol seperti PLONK.

Dalam konstruksi kami, kami menggunakan komitmen Kate karena alasan berikut ini:

- Komitmen Kate memungkinkan kami mengomit nilai dengan cara ringkas untuk disimpan di dalam header blok.
- Pembukaan singkat dimungkinkan yang membantu klien ringan memverifikasi ketersediaan.
- Properti pengikatan kriptografi membantu kami menghindari bukti penipuan dengan membuatnya tidak dapat dikerjakan secara komputasional
untuk menghasilkan komitmen yang salah.

Di masa depan, kami mungkin menggunakan skema komitmen polinomial lainnya jika skema itu memberikan kami cakupan dan jaminan yang lebih baik.

## Karena Avail digunakan oleh banyak aplikasi, apakah itu berarti rantai harus mengunduh transaksi dari rantai lain? {#since-avail-is-used-by-multiple-applications-does-that-mean-chains-have-to-download-transactions-from-other-chains}

No Avail headers berisi indeks yang memungkinkan aplikasi yang diberikan untuk menentukan dan mengunduh hanya bagian dari blok yang memiliki data untuk aplikasi tersebut. Dengan demikian, sebagian besar tidak terpengaruh oleh rantai lain menggunakan Ajail pada waktu yang sama atau dengan ukuran blok.

Satu-satunya pengecualian adalah pengambilan sampel ketersediaan data. Untuk memverifikasi bahwa data tersedia (dan karena sifat coding penghapusan), klien sampel bagian kecil dari blok secara acak, termasuk mungkin bagian yang berisi data untuk aplikasi lain.
