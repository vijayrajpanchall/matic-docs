---
id: what-is-avail
title: Avail di Polygon
sidebar_label: Introduction
description: Scopri la catena di disponibilità dei dati di Polygon
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

Avail è una blockchain incentrata sulla disponibilità dei dati: l'ordine e la registrazione delle transazioni blockchain, e il che permette di dimostrare che i dati di blocco sono disponibili senza scaricare l'intero blocco. Questo permette di scalare in modo che le blockchains monolitiche non possano.

:::info Un robusto livello di disponibilità dei dati scalabili per uso generico

* Consente alle soluzioni Layer-2 di offrire una maggiore scalabilità in grado di sfruttare Avail per costruire Validiums con una disponibilità di dati off-chain.

* Consente alle catene standalone o alle sidechains con ambienti di esecuzione arbitrari per la sicurezza del validatore di bootstrap senza dover creare e gestire il proprio validatore impostato garantendo la disponibilità dei dati delle transazioni.

:::

## Le attuali sfide di disponibilità e scalabilità {#current-availability-and-scaling-challenges}

### Qual è il problema della disponibilità dei dati? {#what-is-the-data-availability-problem}

I peer in una rete blockchain hanno bisogno di un modo per garantire che tutti i dati di un blocco appena proposto siano prontamente disponibili. Se i dati non sono disponibili, il blocco potrebbe contenere delle transazioni dannose nascoste dal produttore del blocco. Anche se il blocco contiene delle transazioni non dannose, nasconderle potrebbe compromettere la sicurezza del sistema.

### L'approccio di Avail alla disponibilità dei dati {#avail-s-approach-to-data-availability}

#### Alta garanzia {#high-guarantee}

Avail offre una garanzia provabile e di alto livello che i dati sono disponibili. I clienti Light possono verificare la disponibilità in un numero costante di query senza scaricare l'intero blocco.

#### Fiducia minima {#minimum-trust}

Non c'è bisogno di essere un validatore o di ospitare un nodo completo. Anche con un cliente leggero, ottieni una disponibilità verificabile.

#### Facile da utilizzare {#easy-to-use}

Costruito utilizzando Substrate modificato, la soluzione si concentra sulla facilità di utilizzo, sia che tu ospiti un'applicazione oppure che operi una soluzione di scalabilità off-chain.

#### Perfetto per la scalabilità off-chail {#perfect-for-off-chain-scaling}

Sblocca il pieno potenziale della tua soluzione di scalabilità off-chain mantenendo i dati con noi ed evitando comunque il problema della DA su L1.

#### Esecuzione agnostica {#execution-agnostic}

Le catene che utilizzano Avail possono implementare qualsiasi tipo di ambiente di esecuzione indipendentemente dalla logica dell'applicazione. Le transazioni da qualsiasi ambiente sono supportate: EVM, Wasm, o anche nuove VM che non sono state ancora costruite. Avail è perfetta per sperimentare nuovi strati di esecuzione.

#### Sicurezza di bootstrapping {#bootstrapping-security}

Avail consente di creare nuove catene senza dover creare un nuovo set di validatori e di sfruttare le Avail. Avail si occupa di sequenziare le transazioni, il consenso e la disponibilità in cambio di semplici commissioni di transazione (gas).

#### Finalità rapida dimostrabile utilizzando npos {#fast-provable-finality-using-npos}

Finalità rapida dimostrabile tramite Proof of Stake nominata. Sostenuto da impegni KZG e codifica di cancellazione.

Iniziare a verificare questo [post del blog](https://blog.polygon.technology/polygon-research-ethereum-scaling-with-rollups-8a2c221bf644/) sulla scalata di Ethereum con Rollup.

## Validium alimentati da Avail {#avail-powered-validiums}

Grazie all'architettura delle blockchains monolitiche (come Ethereum nello stato attuale), la blockchain è costosa, con un risultato di alte commissioni di transazione. Rollup tenta di estrarre l'onere dell'esecuzione eseguendo le transazioni off-chain e quindi di pubblicare i risultati dell'esecuzione e i dati [solitamente compressi] delle transazioni.

I Validiums sono la prossima passata: invece di pubblicare i dati della transazione, è mantenuto disponibile off-chain, dove una prova/attestazione viene posta solo sullo strato di base. Questa è la soluzione di gran lunga più conveniente perché sia l'esecuzione che la disponibilità dei dati vengono mantenute fuori catena pur permettendo la verifica e il regolamento finale sulla catena di livello 1.

Avail è una blockchain ottimizzata per la disponibilità dei dati. Qualsiasi rollup che voglia diventare un validium può passare a postare i dati delle transazioni su Avail invece dello strato 1 e distribuire un contratto di verifica che, oltre a verificare la corretta esecuzione, verifica anche la disponibilità dei dati.

:::note Attestazione

Il team Avail renderà questa verifica della disponibilità dei dati semplice su Ethereum costruendo un ponte di attestazione per inviare le attestazioni di disponibilità dei dati direttamente ad Ethereum. Questo renderà il lavoro del contratto di verifica un semplice lavoro, poiché le attestazioni DA saranno già on-chain. Questo ponte è attualmente in fase di progettazione; per favore puoi contattare il team Avail per avere maggiori informazioni o per unirti al nostro programma di accesso anticipato.

:::

## Vedi anche {#see-also}

* [Presentazione di Avail di Polygon — un robusto layer di disponibilità dei dati scalabile per uso generico](https://polygontech.medium.com/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
* [Il problema della disponibilità dei dati](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
