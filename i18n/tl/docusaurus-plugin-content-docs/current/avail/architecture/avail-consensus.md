---
id: avail-consensus
title: Consensus ng Avail
sidebar_label: Consensus
description: Alamin ang tungkol sa consensus mechanism ng Avail
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

# Consensus ng Avail {#avail-s-consensus}

## Mga data availability committee {#data-availability-committees}

Hanggang sa ngayon, ang diskarte sa pagpapanatili ng mga solusyon ng DA ay karaniwang naging sa pamamagitan ng DAC (data availability committee). May responsable ang isang DAC sa pag-post ng mga lagda pabalik sa main chain at attesting sa pagkakaroon ng off-chain data. Dapat siguraduhin ng DAC na madaling magagamit ang data.

Sa pamamagitan ng DAC, umaasa ang mga solusyon sa pag-scale sa isang DAC para makamit ang Validium. Ang isyu sa mga DAC ay ang pagkakaroon ng data ay nagiging isang pinagkakatiwalaang serbisyo sa isang maliit na grupo ng mga miyembro ng komite na responsable sa pag-iimbak at totoong-totoong pag-uulat ng data.

Hindi isang DAC ang Avail, kundi isang aktwal na network ng blockchain sa consensus mechanism nito, at may sariling set ng mga validator node at block producer.

## Proof of Stake {#proof-of-stake}

:::caution Mga kasalukuyang validator

Sa unang paglulunsad ng Avail testnet, internal na patatakbuhin ang mga validator at pamamahalaan ng Polygon.

:::

Nangangailangan ang mga tradisyunal na patunay ng mga stake system ng pag-block ng mga may-akda ng produksyon na magkaroon ng token holdings (stake) sa chain para makabuo ng mga bloke, kumpara sa mga computational resources (trabaho).

Ginagamit ng mga produkto ng Polygon ang PoS (proof of stake) o ng pagbabago ng PoS. Karaniwan, ang mga validator sa mga tradisyunal na sistema ng PoS na may stake ang may most at kontrol ng network.

Ang mga system na may maraming network maintainer ay may posibilidad na bumuo ng mga off-chain pool para i-maximize ang mga capital gains sa pamamagitan ng pagbabawas ng gantimpala sa pag-iba. This ang hamon ng centralization na ito kapag kasama ang mga pool sa on-chain na nagbibigay-daan sa mga may hawak ng token na mag-back maintainer ng network na sa tingin nila ay pinakamahusay na kumakatawan sa kanila at sa mga interes ng network. distributes rin nito ang concentration ng kapangyarihan ng validator, sa pag-aakala na nasa lugar ang tamang pagboto at mga mekanismo ng halalan, dahil ang pangkalahatang stake sa network ay inilalaan bilang isang one-to-many o many-to-many na relasyon sa halip na umasa lamang sa isang one-to-one relationship, kung saan inilalagay ang tiwala sa mga "pinakamataas na staked" validator.

Ang pagbabagong ito ng patunay ng stake ay maaaring pangasiwaan sa pamamagitan ng delegasyon o nomination, na karaniwang tinutukoy bilang DPoS (na itinakdang patunay ng stake) o NPoS (na nominadong patunay ng stake). Inangkop ng mga solusyon ng pag-scale ng Polygon ang mga pinahusay na mekanismo na ito, kabilang ang Polygon Avail.

Gumagamit ang Avail ng NPoS na may pagbabago sa pag-verify ng block. Ang mga aktor na kasangkot ay mga validator pa rin at nominator.

Puwede ring mag-ambag ang mga light client sa availability ng data sa Avail. Nangangailangan ang pinagkasunduan ng Avail, na dalawang-katlo kasama ang 1 ng mga validator na nag-abot ng consensus para sa validity.

## Mga Nominator {#nominators}

Puwedeng piliin ng mga nominator na magbalik ng isang set ng mga validator ng kandidato na Avail sa kanilang stake. Inominate ang mga validator na sa tingin nila ay epektibong magbibigay ng data availability.

## Pagkakaiba sa pagitan ng DPOS at NPOS {#difference-between-dpos-and-npos}

Sa halaga ng mukha, mukhang ganito ang pag-delegate at nomination ng parehong aksyon, lalo na mula sa point of view ng isang avid staker. Gayunpaman, nilalagay ang mga pagkakaiba sa mga pinagbabatayan na mekanismo ng consensus at kung paano naganap ang pagpili ng validator.

Sa DPoS, tinutukoy ng isang voting-centric election system ang isang nakapirming bilang ng mga validator para i-secure ang network. Maaaring i-delegate ng mga delegator ang kanilang stake laban sa mga validator ng network ng kandidato sa pamamagitan ng paggamit nito bilang kapangyarihang pagboto para mag-back suportahan ang mga delegate. Madalas na sinusuportahan ng mga delegator ang mga validator sa pinakamataas na staked, dahil may mas mataas na pagkakataon ang mga higher staked validator. Ang mga delegado na may pinakamaraming boto ay naging validator ng network at maaaring i-verify ang mga transaksyon. Habang ginagamit ang kanilang stake bilang kapangyarihan ng pagboto, sa Avail, hindi sila napapailalim sa mga kahihinatnan sa pamamagitan ng pag-slash kung nag-behave ang kanilang inihalal na validator. Sa iba pang sistema ng DPOS, maaaring isailalim ang mga delegator sa pag-slash.

Sa NPoS, turn ang mga delegator sa mga nominator at ginagamit ang kanilang stake sa katulad na paraan para mag-nominate ang mga potensyal na validator ng kandidato para i-secure ang network. Naka-lock ang Stake sa -chain, at salungat sa DPoS, napapailalim ang mga nominator sa pag-slash batay sa potensyal na malisyosong pag-uugali ng kanilang mga nominasyon. Kaugnay nito, mas proactive ang mekanismo ng pag-stake ng NPoS kumpara sa pag-stake na "set at forget", dahil nagtititigan ang mga nominator para sa mga well-behaving at sustainable validator. Hinihikayat din nito ang mga validator na lumikha ng mga matatag na operasyon ng validator na manakit at mapanatili ang mga nominasyon.
