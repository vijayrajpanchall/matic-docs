---
id: avail-system-overview
title: Gambaran Umum Sistem
sidebar_label: System Overview
description: Belajar tentang arsitektur dari rantai Ajail
keywords:
  - docs
  - polygon
  - avail
  - data
  - availability
  - architecture
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: avail-system-overview
---

# Gambaran Umum Sistem {#system-overview}

## Modularitas {#modularity}

Saat ini, arsitektur blockchain monolitik seperti Ethereum tidak dapat menangani secara efisien eksekusi, penyelesaian, dan ketersediaan data.

Modularisasi eksekusi ke blok skala adalah apa yang dilakukan model rantai terpusat. Hal ini dapat bekerja dengan baik ketika lapisan ketersediaan permukiman dan data berada di lapisan yang sama, yang dilakukan oleh pengambilan gulungan Ethereum. Namun, ada pertimbangan ketika bekerja dengan rollup, karena konstruksi rollup dapat lebih aman tergantung pada keamanan lapisan ketersediaan data, tetapi akan lebih menantang untuk skala.

Namun, desain granular menciptakan lapisan yang berbeda untuk menjadi protokol ringan seperti microservices. Kemudian, jaringan keseluruhan menjadi kumpulan protokol ringan yang longgar coupled Contohnya adalah lapisan ketersediaan data yang hanya mengkhususkan dalam ketersediaan data. Polygon Avail adalah lapisan dua blockchain berbasis substrat untuk ketersediaan data.

:::info Runtime Substrat

Meskipun Avail didasarkan pada basis kode Substrat, itu termasuk modifikasi ke struktur blok yang mencegahnya berinteroperasi dengan jaringan Substrat lainnya. Avail menerapkan jaringan independen yang tidak terkait dengan Polkadot atau Kusama.

:::

Avail memberikan jaminan yang tinggi untuk ketersediaan data untuk setiap klien ringan, tetapi tidak membuat jaminan yang lebih tinggi untuk klien ringan tentang DA daripada jaringan lainnya. Avail berfokus untuk membuat memungkinkan untuk membuktikan bahwa data blok tersedia tanpa mengunduh seluruh blok dengan memanfaatkan komitmen Kate polinomial, pengkodean dan teknologi lainnya untuk memungkinkan klien cahaya (yang hanya mengunduh _header_ dari rantai tersebut) untuk secara efisien dan secara acak, sampel kecil dari data blok untuk memverifikasi ketersediaan penuh. Namun, ada primitif yang berbeda dari sistem DA yang berbasis penipuan, yang dijelaskan [di sini](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/).

### Menyajikan ketersediaan data {#providing-data-availability}

Jaminan DA adalah sesuatu yang ditentukan oleh klien untuk dirinya sendiri; tidak perlu memercayai node. Karena jumlah klien ringan tumbuh, mereka secara kolektif sampel seluruh blok (meskipun setiap klien hanya mengambil persentase kecil). klien ringan akhirnya membentuk jaringan P2P antara mereka sendiri; sehingga, setelah blok telah ditampilkan, akan sangat tersedia - yaitu, bahkan jika node akan turun (atau mencoba untuk censor blok), klien ringan akan dapat membangun kembali blok dengan berbagi potongan-potongan di antara mereka sendiri.

### Memungkinkan rangkaian solusi berikutnya {#enabling-the-next-set-of-solutions}

Avail akan mengambil rollup ke tingkat berikutnya karena rantai dapat mengalokasikan komponen ketersediaan data mereka untuk Tersedia. Avail juga menyediakan cara alternatif untuk bootstrap rantai standalone karena rantai dapat mengunggah ketersediaan data. Tentu saja, trade-offs yang dibuat dengan pendekatan modularitas yang berbeda, tetapi tujuan keseluruhan adalah untuk menjaga keamanan yang tinggi sementara mampu berskala besar.

Biaya transaksi juga berkurang. Avail dapat tumbuh ukuran blok dengan dampak yang lebih kecil pada workload validator daripada rantai monolitik. Ketika rantai monolitik meningkatkan ukuran blok, validator harus melakukan lebih banyak pekerjaan karena blok harus mengeksekusi, dan keadaan harus dihitung. Karena Avail tidak memiliki lingkungan eksekusi, lebih murah untuk meningkatkan ukuran blok. Biaya tidak nol karena perlu menghitung komitmen KZG dan menghasilkan bukti, tetapi masih mahal.

Avail juga memungkinkan rollup berdaulat. Pengguna dapat membuat rantai berdaulat yang bergantung pada validator Tersedia untuk mencapai konsensus tentang data transaksi dan urutan Sovereign rollup di Avail memungkinkan untuk upgrade tanpa pamrih, karena pengguna dapat mendorong update ke node aplikasi tertentu untuk meningkatkan rantai dan, pada gilirannya, peningkatan ke logika penyelesaian baru. Sedangkan di lingkungan tradisional, jaringan memerlukan percabangan (fork).

:::info Avail tidak memiliki lingkungan eksekusi

Avail tidak menjalankan kontrak yang cerdas tetapi memungkinkan rantai lain untuk membuat data transaksi mereka yang tersedia melalui Avail. Rantai ini dapat mengimplementasikan lingkungan eksekusi mereka dari segala jenis: EVM, Wasm, atau apa pun.

:::

Ketersediaan data pada Avail tersedia untuk jendela waktu yang diperlukan. Misalnya, di luar kebutuhan data atau rekonstruksi, keamanan tidak terganggu.

:::info Avail tidak peduli untuk apa datanya

Avail menjamin bahwa data blok tersedia tetapi tidak peduli tentang apa data itu. Data dapat berupa transaksi tetapi dapat mengambil bentuk lain juga.

:::

Sistem penyimpanan, di sisi lain, dirancang untuk menyimpan data untuk periode yang panjang, dan memasukkan mekanisme incentivization untuk mendorong pengguna untuk menyimpan data.

## Validasi {#validation}

### Validasi peer {#peer-validation}

Tiga jenis peer yang biasanya membentuk ekosistem:

* **Validator nodes:** Validator mengumpulkan transaksi dari mempool, mengeksekusi mereka, dan menghasilkan blok kandidat yang ditambahkan ke jaringan. Blok berisi header blok kecil dengan digest dan metadata dari transaksi dalam blok.
* node **lengkap:** blok kandidat menyebar ke node yang penuh di seluruh jaringan untuk verifikasi. Node-node ini akan mengeksekusi ulang semua transaksi yang berada di dalam calon blok tersebut.
* **Klien** ringan: klien ringan hanya mengambil header blok untuk digunakan untuk verifikasi dan akan mengambil rincian transaksi dari node penuh tetangga seperti yang diperlukan.

Sementara pendekatan yang aman, Awail memberikan alamat keterbatasan arsitektur ini untuk membuat kepuasan dan meningkatkan jaminan Klien ringan dapat ditipu untuk menerima blok yang data yang mendasari tidak tersedia. Produser blok dapat memasukkan transaksi berbahaya dalam blok dan tidak mengungkapkan seluruh isi ke dalam jaringan. Seperti yang disebutkan dalam docs Ajail, ini dikenal sebagai masalah ketersediaan data.

Peer jaringan Avail meliputi:

* **Validator nodes:** Protokol insentif node penuh yang berpartisipasi dalam konsensus. node Validator pada Ajail tidak melakukan transaksi. Mereka mengemas transaksi **arbitrase** dan membangun blok kandidat, menghasilkan komitmen KZG untuk data.

* Node **lengkap:** Node yang mengunduh dan membuat semua data blok untuk semua aplikasi menggunakan Tersedia. Dengan cara yang sama, node penuh Avail tidak mengeksekusi transaksi.

* **Avail (DA) klien ringan:** Client yang hanya mengunduh header blok secara acak sampel bagian kecil dari blok untuk memverifikasi ketersediaan Mereka mengekspos API lokal untuk berinteraksi dengan jaringan Avail.

:::info Tujuan Avail bukan untuk bergantung pada node penuh agar data tetap tersedia

Tujuannya adalah memberikan jaminan DA yang sama kepada klien ringan sebagai node penuh. Pengguna dianjurkan untuk menggunakan klien ringan Avail. Namun, mereka masih dapat menjalankan node Ajail yang didukung dengan baik.

:::

:::caution API lokal adalah WIP dan belum stabil


:::

Hal ini memungkinkan aplikasi yang ingin menggunakan Ajail untuk menanamkan klien ringan DA. Lalu mereka dapat membangun:

* **node penuh app**
  - Menyisipkan klien ringan Avail (DA)
  - Mengunduh semua data untuk appID yang spesifik
  - Menerapkan lingkungan eksekusi untuk menjalankan transaksi
  - Mempertahankan kondisi aplikasi

* **Menampilkan klien**
  - Menyisipkan klien ringan Avail (DA)
  - Menerapkan fungsionalitas yang berinteraksi dengan pengguna

Ekosistem Avail juga akan menampilkan jembatan untuk memungkinkan kasus-kasus penggunaan tertentu. Salah satu jembatan yang dirancang pada saat ini adalah _jembatan pengantar_ yang akan memposting pengumuman data yang tersedia di Awail ke Ethereum, sehingga memungkinkan pembuatan valium.

## Verifikasi kondisi {#state-verification}

### verifikasi blok → verifikasi DA {#da-verification}

#### Validator {#validators}

Alih-alih validator Awail memverifikasi keadaan aplikasi, mereka berkonsentrasi untuk memastikan ketersediaan data transaksi dan memberikan urutan transaksi. Blok dianggap valid hanya jika data di balik blok tersebut tersedia.

Validator Avail mengambil transaksi yang masuk, memesan mereka, membangun blok kandidat, dan mengusulkan ke jaringan. Blok ini berisi fitur khusus, terutama untuk pengkodean DA—erasure dan komitmen KZG. Ini dalam format tertentu, sehingga klien dapat melakukan pengambilan sampel acak dan mengunduh hanya transaksi aplikasi.

Validator yang lain memverifikasi blok dengan memastikan blok tersebut terbentuk dengan baik, komitmen KZG
diperiksa, ada data ditemukan, dll.

#### Klien {#clients}

Memerlukan data untuk tersedia mencegah produser dari melepaskan header blok tanpa melepaskan data di belakangnya, karena ini mencegah klien dari membaca transaksi yang diperlukan untuk menghitung keadaan aplikasi mereka. Seperti rantai lainnya, Avail menggunakan verifikasi ketersediaan data untuk mengatasi ini melalui pemeriksaan DA yang menggunakan kode penghapus dan pemeriksaan ini sangat digunakan dalam desain redundancy data.

Kode penghapus secara efektif menduplikat data sehingga jika bagian dari blok ditekan, klien dapat merekonstruksi bagian itu dengan menggunakan bagian lain dari blok. Ini berarti bahwa node yang mencoba menyembunyikan bagian itu akan perlu menyembunyikan lebih banyak.

> Teknik ini digunakan dalam perangkat seperti CD-ROM dan multidisk atau RAID (misalnya,
> jika hard drive mati, maka dapat diganti dan direkonstruksi dari data di disk lain).

Yang unik tentang Avail adalah bahwa desain rantai memungkinkan **orang** untuk memeriksa DA tanpa perlu untuk mengunduh data. pemeriksaan DA memerlukan setiap klien cahaya untuk sampel jumlah minimal chunks dari setiap blok dalam rantai. Sekelompok klien ringan dapat secara kolektif mengambil seluruh blockchain dengan cara ini. Akibatnya, node yang lebih non-consensus ada ada, ukuran blok yang lebih besar (dan throughput) dapat secara aman. Artinya, node non-consensus dapat berkontribusi pada throughput dan keamanan jaringan.

### Penyelesaian transaksi {#transaction-settlement}

Avail akan menggunakan lapisan penyelesaian yang dibangun dengan Polygon Edge. Lapisan penyelesaian menyediakan blockchain yang kompatibel EVM untuk rollup untuk menyimpan data dan melakukan resolusi sengketa. Lapisan pemukiman menggunakan Polygon Avail untuk DA. Ketika rollup menggunakan lapisan penyelesaian, mereka juga mewarisi semua properti DA dari Ase.

:::note Cara penyelesaian yang berbeda

Ada berbagai cara untuk menggunakan Tersedia, dan validium tidak akan menggunakan lapisan penyelesaian, tetapi akan menetap di Ethereum.

:::

Avail menawarkan hosting dan pemesanan data. Lapisan eksekusi akan datang dari beberapa solusi skala off-chain atau lapisan eksekusi warisan. Lapisan penyelesaian mengambil pada verifikasi dan komponen resolusi sengketa.

## Sumber daya {#resources}

- [Pengantar ke Ajail oleh Polygon](https://medium.com/the-polygon-blog/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048).
- [Polygon Talks: Polygon Avail](https://www.youtube.com/watch?v=okqMT1v3xi0)
