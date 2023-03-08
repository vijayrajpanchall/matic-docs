---
id: what-is-avail
title: Avail ng Polygon
sidebar_label: Introduction
description: Matuto tungkol sa chain ng availability ng data ng Polygon
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

# Polygon Avail {#polygon-avail}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Ang Avail ay isang blockchain na mas naka-focus sa data availability: pag-order at pag-record ng mga transaksyon sa blockchain at ginagawang posible na patunayan na magagamit ang data ng block nang hindi nagda-download ng buong block. Pinapayagan nitong i-scale sa mga paraan na hindi maaaring monolithic blockchains.

:::info Isang Matatag na General-Purpose Scalable Data Availability Layer

* Pinapagana ang mga solusyon ng Layer-2 na mag-alok ng mas mataas na scalability sa pamamagitan ng leveraging ng Avail na magtayo ng mga Validium gamit ang off-chain data availability.

* Pinapayagan ang mga standalone chain o sidechains na may mga arbitraryong kapaligiran ng pagpapatupad sa bootstrap na seguridad ng validator nang hindi nangangailangan na lumikha at pamahalaan ang kanilang sariling validator na itinakda ng ginagarantiyahan ang data ng transaksyon.

:::

## Kasalukuyang Availability at Pag-Scale ng mga Hamon {#current-availability-and-scaling-challenges}

### Ano ang problema sa data availability? {#what-is-the-data-availability-problem}

Nangangailangan ang mga peer sa blockchain network ng paraan upang matiyak na ang lahat ng data ng bagong iminungkahing block ay
laging available. Kung hindi available ang data, maaaring naglalaman ang block ng mga malisyosong transaksyon
na tinatago ng block producer. Kahit na ang block ay naglalaman ng mga hindi malisyosong transaksyon,
maaaring makakompromiso sa seguridad ng system ang pagtatago sa kanila.

### Ang estratehiya ng Avail sa data availability {#avail-s-approach-to-data-availability}

#### Mataas na Garantiya {#high-guarantee}

Nagbibigay ang Avail ng isang provable, mataas na antas ng garantiya na magagamit ang data. can ang mga light clients sa pagkakaroon ng palagiang bilang ng mga query, nang hindi nagda-download ng buong block.

#### Minimum Trust {#minimum-trust}

Hindi na kailangang maging validator o mag-host ng buong node. Kahit sa isang light client, makakuha ng verifiable availability.

#### Madaling Magamit {#easy-to-use}

Binuo gamit ang binagong Substrate, nakatuon ang solusyon sa kadalian ng paggamit, kung nagho-host ka ng application o
nagpapatakbo ng off-chain na solusyon sa pag-scale.

#### Perpekto para sa Off-Chain na Pag-scale {#perfect-for-off-chain-scaling}

I-unlock ang buong potensyal sa pag-scale ng iyong off-chain na solusyon sa pag-scale sa pamamagitan ng pagpapanatili ng data sa amin at
pag-iwas pa rin sa problema ng DA sa L1.

#### Execution Agnostic {#execution-agnostic}

Maaaring magpatupad ang mga chain na gumagamit ng Avail ng anumang uri ng kapaligiran ng pagpapatupad nang hindi isinasaalang-alang ang logic ng application. Sinusuportahan ang mga transaksyon mula sa anumang kapaligiran: EVM, Wasm, o kahit na bagong VM na hindi pa binuo perpekto ang Avail para sa pag-eksperimento sa mga bagong execution layer.

#### Bootstrapping Security {#bootstrapping-security}

Pinapayagan ng Avail ang mga bagong chain na malilikha nang hindi kailangang i-spin ang isang bagong validator set, at i-leverage ang Avail. Inaalagaan ng Avail ang pagkakasunud-sunod ng transaksyon, pinagkasunduan, at availability kapalit ng simpleng transaksyon fees (gas).

#### Mabilis na mapapatunayang finality gamit ang NPoS {#fast-provable-finality-using-npos}

Mabilis na mapapatunayang finality sa pamamagitan ng Nominated Proof of Stake. Sinusuportahan ng mga KZG
na mga commitment at pagbubura ng coding.

Simulan sa pamamagitan ng pag-check out ang [blog post](https://blog.polygon.technology/polygon-research-ethereum-scaling-with-rollups-8a2c221bf644/) na ito sa pag-scale ng Ethereum sa mga Rollup.

## Mga Avail-Powered Validium {#avail-powered-validiums}

Dahil sa arkitektura ng mga monolithic blockchain (tulad ng Ethereum sa kasalukuyang estado nito), ang pag-operate ng blockchain ay mahal, na nagreresulta sa mataas na bayad sa transaksyon. Tinangka ng mga Rollup na kunin ang pasanin ng pagpapatupad sa pamamagitan ng pagpapatakbo ng mga transaksyon off-chain at pagkatapos ay mag-post ng mga resulta ng pagpapatupad at ang [karaniwang compressed] data ng transaksyon.

Ang mga validium ang susunod na hakbang: sa halip na mag-post ng data ng transaksyon, pinanatili itong off-chain, kung saan naka-post lamang ang isang proof/attestation sa base layer. Sa malayo ang pinaka-cost-effective na solusyon dahil pinapanatili ang parehong execution at data availability na off-chain habang pinapayagan pa rin ang huling pag-verify at off-chain sa layer 1 chain.

Ang Avail ay isang blockchain na na-optimize para sa availability ng data. Anumang rollup na nagnanais na maging validium ay maaaring lumipat sa mag-post ng data ng transaksyon sa Avail sa halip na ang layer 1 at mag-deploy ng kontrata ng pag-verify na, bilang karagdagan sa pag-verify ng tamang pagpapatupad, ay nagpapatunay din ng data availability.

:::note Attestation

Gagawin ng Avail team ang availability na ito ng data verification simple sa Ethereum sa pamamagitan ng pagbuo ng attestation bridge para mag-post ng mga data availability attestation nang direkta sa Ethereum. Gagawin nitong simple ang trabaho ng kontrata ng verification na ito, dahil magiging on-chain na ang mga attestations ng DA. Kasalukuyang nasa disenyo ang tulay na ito; paki-abot ang labas sa koponan ng Avail para sa karagdagang impormasyon o para sa sumali sa aming maagang access program.

:::

## Tingnan din ang {#see-also}

* [Ipinapakilala ang Avail ng Polygon — isang Matatag na General-Purpose Scalable Data Availability Layer](https://polygontech.medium.com/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
* [Ang Problema sa Availability ng Data](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
