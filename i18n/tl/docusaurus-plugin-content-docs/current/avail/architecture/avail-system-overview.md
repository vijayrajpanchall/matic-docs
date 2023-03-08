---
id: avail-system-overview
title: Pangkalahatang-ideya ng System
sidebar_label: System Overview
description: Alamin ang tungkol sa arkitektura ng Avail chain
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

# Pangkalahatang-ideya ng System {#system-overview}

## Modularity {#modularity}

Sa kasalukuyan, hindi mahusay na mahawakan ng mga monolithic blockchain blockchain ang mga monolithic na tulad ng Ethereum sa pagpapatupad, pag-areglo, at availability ng data.

Modularizing ng pagpapatupad sa scale block chain ay kung ano ang tinatangkang gawin ng mga modelong rollup-centric chain Makapagtrabaho ito nang maayos kapag ang mga layer ng availability ng settlement at data ay nasa parehong layer, na siyang diskarte sa mga rollup na the Gayunpaman, may mga kinakailangang trade-off kapag nagtatrabaho sa mga rollup, dahil ang konstruksiyon ng rollup ay maaaring maging mas secure depende sa seguridad ng data availability layer ngunit magiging likas na mas mapaghamong mag-scale.

Gayunpaman, lumilikha ang isang granular na disenyo ng iba't ibang layer na maging magaan na mga protocol, tulad ng mga microservices. Pagkatapos, nagiging koleksyon ng maluwag na kaisa ang pangkalahatang network ng mga protocol na magaan. Isang halimbawa ay isang data availability layer na dalubhasa lamang sa data availability. Ang Polygon Avail ay isang layer na nakabatay sa Substrate na dalawang blockchain para sa data availability.

:::info Runtime ng substrate

Bagama't batay ang Avail sa Substrate codebase, kabilang dito ang mga pagbabago sa istraktura ng block na pumipigil sa interoperating nito sa iba pang network ng Substrate. Ang Avail ay nagpapatupad ng isang independiyenteng network na walang kaugnayan sa Polkadot o Kusama.

:::

Nagbibigay ang Avail ng mataas na garantiya ng pagkakaroon ng data sa sinumang light client, ngunit hindi gumawa ng mas mataas na garantiya sa mga light client tungkol sa DA kaysa sa anumang ibang network. Nakatuon ang Avail sa paggawa ng posible na patunayan na ang data ng block ay magagamit nang hindi nagda-download ng buong block sa pamamagitan ng leveraging ng mga polinomial commitment ng Kate, erasure coding, at iba pang teknolohiya para payagan ang mga light clients (na nag-download lamang ng mga _header_ ng chain) para mabisa at randomly na sample ang maliliit na halaga ng data ng block para ma-verify ang ganap na availability nito. Gayunpaman, may mga panimula na iba't ibang primitibo kaysa sa mga sistema ng fraud-proof-based DA na ipinapaliwanag [dito](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/).

### Pagbibigay ng availability ng data {#providing-data-availability}

Ang garantiya ng DA ay isang bagay na tinutukoy ng client para sa sarili; hindi na kailangang magtiwala sa mga node. Habang lumalaki ang bilang ng mga light clients, sama-sama nilang nililimitahan ang buong block (kahit na only lang ang bawat client ng isang maliit na porsyento). Sa huli ay bumuo ang mga light client ng P2P network sa kanilang sarili; kaya, pagkatapos na sample ang isang block na ito, nagiging mataas ang magagamit nito — ibig sabihin, kahit na ang mga node ay dapat bumaba (o magtangka na to ng isang block), magagawa pang i-set ang mga light client sa pamamagitan ng pagbabahagi ng mga piraso sa kanilang sarili.

### Paganahin ang susunod na hanay ng mga solusyon {#enabling-the-next-set-of-solutions}

Dadalhin ng Avail ang mga rollup sa susunod na antas dahil maaaring maglaan ang mga chains ng kanilang data availability component para Avail. Nagbibigay din ang Avail ng alternatibong paraan sa pag-bootstrap ng anumang standalone chain, dahil maaaring i-offload ng mga tanikala ang kanilang data availability. May mga ganito, siyempre, ang mga trade-offs na ginawa sa iba't ibang diskarte ng modularity, ngunit ang pangkalahatang layunin ay upang mapanatili ang mataas na seguridad habang nagagawa nilang to

Nababawasan din ang mga gastos sa transaksyon. Maaaring palaguin ng Avail ang laki ng block na may mas maliit na epekto sa workload ng validator kaysa sa isang monolithic chain. Kapag nagdaragdag ang isang monolithic chain ng laki ng block ang laki, kailangang gumawa ang mga validator ng maraming trabaho dahil kailangang magpagawa ang mga block, at kailangang kalkulahin ang estado. Dahil walang execution environment ang Avail, mas mura ang dagdagan ng laki ng block Hindi zero ang gastos dahil sa kailangang kalkulahin ang mga commitment ng KZG at bumuo ng mga proof, ngunit mura pa rin.

Ginagawa rin ng Avail na isang posibilidad ang mga sovereign rollup. Maaaring lumikha ang mga gumagamit ng soberanyang chain na umaasa sa mga validator ng Available para maabot ang pinagkasunduan sa data ng transaksyon at order. Pinapayagan ng mga sovereign rollup sa Avail ang mga walang tahong na upgrade, dahil maaaring magtulak ang mga user ng mga update sa mga specific node ng application na i-upgrade ang chain at, sa pag-upgrade ng bagong settlement logic. Samantalang sa isang tradisyunal na environment, ang network ay nangangailangan ng isang fork.

:::info Walang execution environment ang Avail

Hindi nagpatakbo ang Avail ng mga smart contract ngunit pinapayagan ang iba pang chain na gawin ang data ng transaksyon nila sa pamamagitan ng Avail. Maaaring magpatupad ang mga tanikalang ito ng kanilang mga kapaligiran ng pagpapatupad ng anumang uri: EVM, Wasm, o anumang bagay.

:::

Avail ay magagamit para sa isang window ng oras na kinakailangan ito. Halimbawa, sa kabila ng nangangailangan ng data o reconstruction, hindi nakompromiso ang seguridad.

:::info Walang pakialam ang Avail kung para saan ang data

Tinitiyak ng Avail na magagamit ang data ng block ngunit walang pakialam sa kung ano ang data na iyon. Maaaring be ang data ngunit maaaring tumagal din sa iba pang form.

:::

Ang mga storage system, sa kabilang banda, ay idinisenyo upang mag-imbak ng data sa matagal na panahon, at isama ang mga mekanismo ng incentivization para hikayatin ang mga gumagamit na mag-imbak ng data.

## Pag-validate {#validation}

### Pag-validate ng peer {#peer-validation}

Tatlong uri ng mga peer ang karaniwang bumubuo ng isang ecosystem:

* **validator node:** Kinokolekta ng isang validator ang mga transaksyon mula sa mempool, executes ang mga ito, at bumubuo ng isang block ng kandidato na is sa network. Naglalaman ang block ng isang maliit na block header na may digest at metadata ng mga transaksyon sa block.
* **Buong node:** Ipinapalaganap ng block ng kandidato ang mga node sa buong network para sa pag-verify. Ipapatupad muli ng mga node ang mga transaksyong nakapaloob sa candidate block.
* **Mga light clients:** I-fetch lamang ng mga light client ang block header na gagamitin para sa pag-verify at kukuha ng mga detalye ng transaksyon mula sa mga kalapit na full node kung kinakailangan.

Habang may secure na diskarte, tinutugunan ng Avail ang mga limitasyon ng arkitekturang ito na lumikha ng katibayan at nadagdagan ang mga garantiya. Maaaring be ang mga light client sa pagtanggap ng mga block na hindi magagamit ang mga kalakip na data. Maaaring isama ng isang block producer ang isang malisyosong transaksyon sa isang block at hindi ihayag ang buong nilalaman nito sa network. Tulad ng nabanggit sa mga Avail doc, kilala ito bilang problema sa availability ng data.

Kasama sa mga network peer ng Avail ang:

* **validator node:** incentivized ng Protocol ang mga full node na lumahok sa pinagkasunduan. Hindi mag-execute ang validator node sa Avail ng mga transaksyon. I-package nila ang mga arbitraryong transaksyon at mag-construct ng mga bloke ng kandidato, na bumubuo ng mga commitment ng KZG para sa data. **Tama ang mga binuong** validator.

* **Buong node ng Avail (DA) :** Mga node na nag-download at gumawa ng magagamit ang lahat ng data ng block para sa lahat ng application gamit ang Avail. Katulad nito, ang full node ng Avail ay hindi nagsasagawa ng mga transaksyon.

* **Mga light client ng Avail (DA) :** Ang mga kliyente na nag-download lamang ng mga block header ay sirang download ng mga maliliit na bahagi ng block para i-verify ang availability. Ipinaalis nila ang isang lokal na API para makipag-ugnayan sa Avail network.

:::info Ang layunin ng Avail ay hindi umasa sa mga buong node para mapanatiling available ang data

Ang layunin ay magbigay ng katulad na garantiya ng DA sa isang light client bilang isang buong node. Hinihikayat ang mga user na gumamit ng mga Avail light client. Gayunpaman, maaari pa rin nilang patakbuhin ang mga full node ng Avail na sinusuportahan ng mabuti.

:::

:::caution Ang lokal na API ay isang WIP at hindi pa stable


:::

Pinapayagan nito ang mga application na gustong gamitin ang Avail para i-embed ang light client ng DA. Pagkatapos ay maaari silang bumuo ng:

* **App full node**
  - Mag-embed ng Avail (DA) light client
  - I-download ang lahat ng data para sa partikular na appID
  - Magpatupad ng environment sa pagsasagawa para patakbuhin ang mga transaksyon
  - Panatilihin ang kalagayan ng application

* **Mga kliyente ng liwanag ng app**
  - Mag-embed ng Avail (DA) light client
  - Ipatupad ang end-user-facing functionality

Itatampok din ang ecosystem ng Avail ng mga tulay para paganahin ang mga tiyak na use-cases. Ang isang naturang bridge na idinisenyo sa oras na ito ay isang _attestation bridge_ na mag-post ng mga attestation ng data na magagamit sa Avail sa Ethereum, kaya pinapayagan ang paglikha ng mga validium.

## Pag-verify ng kalagayan {#state-verification}

### I-block ang pag-verify → DA verification {#da-verification}

#### Mga validator {#validators}

Sa halip na mag-verify ang mga validator ng Avail sa application state, tumutok sila sa pagtiyak sa pagkakaroon ng nai-post na data ng transaksyon at pagbibigay ng transaksyon ordering. Ang isang block ay itinuturing na wasto lamang kung ang data sa likod ng block na iyon ay magagamit.

Kumuha ang mga validator ng Avail sa mga papasok na transaksyon, i-order ang mga ito, mag-construct ng isang kandidato na block, at mag-propose sa network. Naglalaman ang block ng mga espesyal na tampok, lalo na para sa DA—erasure coding at mga commitment ng KZG. Nasa isang partikular na format, kaya magagawa ng mga kliyente ang random sampling at mag-download lamang ng mga transaksyon ng iisang application.

Ibe-verify ng iba pang validator ang block sa pamamagitan ng pagtiyak na maayos ang pagkakabuo ng block, ang mga KZG commitment na tingnan na naroroon ang data, atbp.

#### Mga kliyente {#clients}

Nangangailangan ng data na makukuha na pinipigilan ang mga block producer na maglabas ng mga block header nang hindi nilalabas ang data sa likod ng mga ito, dahil pinipigilan nito ang mga kliyente na magbabasa ng mga transaksyon na kinakailangan upang i-compute ang estado ng kanilang mga application. Tulad ng iba pang chain, gumagamit ang Avail ng data availability verification para tugunan ito sa pamamagitan ng mga tseke ng DA na gumagamit ng mga erasure code; mabigat ang mga tsekeng ito na ginagamit sa disenyo ng data redundancy.

Mabisang dobleng doblehin ang mga code ng Erasure sa data upang kung ang bahagi ng isang block ay pinipigilan, puwedeng mag-construct muli ang mga kliyente ng bahaging iyon sa pamamagitan ng paggamit ng ibang bahagi ng block. Nangangahulugan ito na ang isang node na sumusubok na itago ang bahaging iyon ay kailangang magtago ng higit pa.

> Ginagamit ang pamamaraan sa mga device tulad ng mga CD-ROM at mga multi-disk (RAID) array (halimbawa,
> kung ang isang hard drive ay nasira, maaari itong palitan at muling itayo mula sa data sa iba pang mga disk).

Ano ang natatangi tungkol sa Avail ay pinapayagan ng disenyo ng chain ang **sinumang** mag-check ng DA nang hindi nangangailangan ng pag-download ng data. Kinakailangan ng mga tseke ng DA ang bawat light client na mag-sample ng kaunting bilang ng mga random na chunk mula sa bawat block sa chain. Maaaring sama-samang of ng isang set ng mga light client ang buong blockchain sa ganitong paraan. Dahil dito, ang mas non-consensus node doon ay, mas malaki ang laki ng block (at throughput) ay maaaring securely umiiral. Ibig sabihin, maaaring mag-ambag ang mga non-consensus node sa throughput at seguridad ng network.

### Settlement ng transaksyon {#transaction-settlement}

Gagamit ang Avail ng settlement layer na binuo gamit ang Polygon Edge. Nagbibigay ang settlement layer ng EVM-compatible na blockchain para sa mga rollup para mag-imbak ang kanilang data at magsagawa ng dispute resolution. Gumagamit ang settlement layer ng Polygon Avail para sa DA. Kapag gumagamit ang mga rollup ng settlement layer, nagmana din sila ng lahat ng DA properties ng Avail.

:::note Iba't ibang paraan ng pag-settle

May iba't ibang paraan para gamitin ang Avail, at hindi gagamitin ng mga validium ang settlement layer, pero sa halip ay tumira sa Ethereum.

:::

Nag-aalok ang Avail ng data hosting at pag-order. Malamang na magmumula ang execution layer ng maraming off-chain scaling solutions o legacy execution layer. Kinukuha ang settlement layer sa component ng pag-verify at dispute resolution.

## Mga Resources {#resources}

- [Panimula sa Avail ni Polygon](https://medium.com/the-polygon-blog/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048).
- [Mga Usaping Polygon: Polygon Avail](https://www.youtube.com/watch?v=okqMT1v3xi0)
