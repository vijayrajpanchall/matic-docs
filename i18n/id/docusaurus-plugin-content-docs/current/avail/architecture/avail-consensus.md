---
id: avail-consensus
title: Konsensus Avail
sidebar_label: Consensus
description: Pelajari tentang mekanisme konsensus Avail
keywords:
  - docs
  - polygon
  - avail
  - consensus
  - proof of stake
  - nominated proof of stake
  - pos
  - npos
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: avail-consensus
---

# Konsensus Avail {#avail-s-consensus}

## Komite ketersediaan data {#data-availability-committees}

Sampai saat ini, pendekatan untuk menjaga solusi DA umumnya telah melalui DAC (komite ketersediaan data). DAC bertanggung jawab untuk memposting tanda tangan ke rantai utama dan membuktikan ketersediaan data off-chain . DAC harus memastikan bahwa data tersedia secara mudah tersedia.

Melalui DAC, solusi penskalaan bergantung padanya untuk mencapai Validium. Masalah dengan DACs adalah ketersediaan data menjadi layanan yang dipercaya pada sekelompok kecil anggota komite yang bertanggung jawab untuk menyimpan dan melaporkan data yang benar.

Avail bukan DAC, tetapi jaringan blockchain yang sebenarnya dengan mekanisme konsensus dan memiliki set node validator dan produser blok.

## Proof of Stake {#proof-of-stake}

:::caution Validator saat ini

Dengan peluncuran awal testnet Avail, validator akan
dioperasikan dan dikelola secara internal oleh Polygon.

:::

Bukti tradisional sistem saham memerlukan pemblokiran penulis untuk memiliki kepemilikan token (staking) on-chain untuk menghasilkan blok, sebagai lawan dari sumber daya komputasi (work).

Produk Polygon, menggunakan PoS (bukti stak) atau modifikasi PoS. Biasanya, validator dalam sistem PoS tradisional yang memiliki paling banyak memiliki pengaruh dan kontrol jaringan.

Sistem dengan banyak pengelola jaringan cenderung membentuk kolam renang off-chain untuk memaksimalkan keuntungan modal dengan mengurangi variabel imbalan. Tantangan sentralisasi ini akan mengurangi ketika kolam renang dimasukkan ke dalam rantai yang memungkinkan pemegang token untuk mendukung pengelola jaringan yang merasa terbaik mewakili mereka dan kepentingan jaringan. Ini juga mendistribusikan konsentrasi daya validator, dengan asumsi bahwa pemungutan suara yang tepat dan mekanisme pemilihan telah dilakukan, karena kepemilikan keseluruhan pada jaringan dialokasikan sebagai hubungan satu ke beberapa atau banyak atau banyak daripada hanya mengandalkan hubungan satu ke satu atau satu ke satu ke satu , di mana kepercayaan diletakkan dalam validator "highest tertinggi".

Modifikasi bukti saham ini dapat diberikan melalui delegasi atau nominasi, yang umumnya disebut sebagai DPoS (bukti yang didegradasi) atau NPoS (bukti taruhan). Solusi-solusi skala Polygon telah mengadaptasi mekanisme yang ditingkatkan, termasuk Polygon Avail.

Avail menggunakan NPoS dengan modifikasi pada verifikasi blok. Aktor yang terlibat masih validator dan nominator.

Klien ringan juga dapat berkontribusi pada ketersediaan data di Avail. Konsensus yang tersedia mengharuskan dua pertiga ditambah 1 validator mencapai konsensus untuk validitas.

## Nominator {#nominators}

Nominator dapat memilih untuk mendukung satu set validator kandidat Awail dengan tiang. Nominator akan menominasikan validator yang merasa akan memberikan ketersediaan data.

## Perbedaan antara DPoS dan NPoS {#difference-between-dpos-and-npos}

Pada nilai wajah, delegasi dan nominasi tampak seperti tindakan yang sama, terutama dari sudut pandang staker yang kosong. Namun, perbedaan diletakkan dalam mekanisme konsensus yang mendasari dan bagaimana seleksi validator.

Dalam DPoS, sistem pemilihan yang bersifat voting-centric menentukan jumlah validator yang ditetapkan untuk mengamankan jaringan. Delegator dapat mendelegasikan kepemilikan mereka terhadap validator jaringan kandidat dengan menggunakan itu sebagai kekuatan pemungutan suara untuk diputar delegasi. Delegator sering mendukung validator pada tiang tertinggi, karena validator yang dipakaikan memiliki kesempatan pemilu yang lebih tinggi. Delegasi dengan suara terbanyak menjadi validator jaringan dan dapat memverifikasi transaksi. Sementara menggunakan kepemilikan mereka sebagai kekuatan voting, di Tersedia, mereka tidak tunduk pada konsekuensi melalui slashing, jika validator yang terpilih bersikap berbahaya. Dalam sistem DPoS lainnya, delegasi mungkin akan mengalami kerusakan.

Di NPoS, delegasi berubah menjadi nominator dan menggunakan kepemilikan mereka dengan cara yang sama untuk mencalonkan validator kandidat potensial untuk mengamankan jaringan. Stake terkunci di rantai, dan bertentangan dengan DPoS, para nominator harus melakukan pemusnahan berdasarkan potensi perilaku berbahaya dari nominasinya. Dalam hal ini, NPoS adalah mekanisme staking yang lebih proaktif daripada staking yang "diatur dan lupa", karena para nominator memandang validator yang baik dan berkelanjutan. Ini juga mendorong validator untuk membuat operasi validator yang kuat untuk menarik dan mempertahankan nominasi.
