---
id: avail-system-overview
title: Panoramica del sistema
sidebar_label: System Overview
description: Scopri l'architettura della catena Avail
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

# Panoramica del sistema {#system-overview}

## Modularità {#modularity}

Attualmente le architetture monolitiche blockchain come quelle di Ethereum non possono gestire in modo efficiente l'esecuzione, la risoluzione e la disponibilità dei dati.

La modulazione dell'esecuzione per scalare le blockchains è quello che i modelli a catena rollup-centric tentano di fare. Questo può funzionare bene quando gli strati di regolamento e di disponibilità dei dati sono sullo stesso livello, che è l'approccio che le Ethereum rollup prendono. Tuttavia, ci sono necessari compromessi quando si lavora con le rollup, poiché la costruzione di rollup può essere più sicura a seconda della sicurezza dello strato di disponibilità dei dati, ma sarebbe intrinsecamente più difficile da scalare.

Tuttavia, un design granulare crea diversi strati per essere protocolli leggeri, come i microservizi. La rete globale diventa una raccolta di protocolli leggeri allentati. Un esempio è uno strato di disponibilità dei dati che si specializza solo nella disponibilità dei dati. Polygon Avail è uno strato substrato due blockchain per la disponibilità dei dati.

:::info Runtime del substrato

Sebbene Avail si basi sulla codebase del Substrate, include modifiche alla struttura del blocco che impedisce di interagire con altre reti di Substrate. Avail implementa una rete indipendente non correlata a Polkadot o Kusama.

:::

Avail offre un'elevata garanzia di disponibilità dei dati a qualsiasi cliente leggero, ma non garantisce maggiori garanzie per accendere i clienti circa DA rispetto a qualsiasi altra rete. Avail si concentra sul rendere possibile la prova che i dati di blocco sono disponibili senza scaricare l'intero blocco sfruttando gli impegni polinomiali di Kate, la cancellazione della coding, e altre tecnologie per consentire ai client di luce (che scaricano solo le _intestazioni_ della catena) di campionare in modo efficiente e casuale piccole quantità dei dati di blocco per verificarne la piena disponibilità. Tuttavia, esistono fondamentalmente diversi rispetto ai sistemi DA basati su frode, che sono qui [spiegati](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/).

### Fornire la disponibilità dei dati {#providing-data-availability}

La garanzia di DA è una cosa che un client determina per se stesso; non deve fidarsi dei nodi. Man mano che il numero di client di luce cresce, essi campionano collettivamente l'intero blocco (anche se ogni cliente campiona solo una piccola percentuale). I clienti della luce formano una rete P2P tra loro; così, dopo che un blocco è stato campionato, diventa altamente disponibile - vale a dire, anche se i nodi scendessero (o tentassero di censurare un blocco), i client della luce sarebbero in grado di ricostruire il blocco condividendo i pezzi tra loro.

### Abilitare la successiva serie di soluzioni {#enabling-the-next-set-of-solutions}

Avail porterà i rollup al livello successivo, in quanto le catene possono allocare il proprio componente di disponibilità dei dati a Avail. Avail fornisce anche un modo alternativo per bootstrap qualsiasi catena standalone, in quanto le catene possono offload la loro disponibilità di dati. Ci sono ovviamente gli compromessi che sono realizzati con diversi approcci di modularità, ma l'obiettivo generale è quello di mantenere un'elevata sicurezza pur essendo in grado di scalare.

Anche i costi transazione sono ridotti. Avail può crescere la dimensione del blocco con un impatto minore sul carico di lavoro del validatore rispetto a una catena monolitica. Quando una catena monolitica aumenta le dimensioni del blocco, i validatori devono fare molto di più lavoro perché i blocchi devono essere eseguiti, e lo stato deve essere calcolato. Poiché Avail non ha ambiente di esecuzione, è molto più economico aumentare le dimensioni del blocco. Il costo non è zero a causa della necessità di calcolare gli impegni KZG e di generare prove, ma ancora poco costoso.

Avail rende anche possibili i rollup sovrani. Gli utenti possono creare catene sovrane che si basino sui validatori di Avail, per raggiungere il consenso sui dati delle transazioni e sull'ordine. I backup sovranità su Avail consentono di effettuare aggiornamenti senza soluzione di seamless, in quanto gli utenti possono spingere gli aggiornamenti verso nodi specifici per l'applicazione per aggiornare la catena e, a sua volta, aggiornare la nuova logica di regolamento. Mentre in un ambiente tradizionale, la rete richiede un fork.

:::info Avail non ha un ambiente di esecuzione

Avail non esegue smart contract, ma consente ad altre catene di rendere disponibili i dati della transazione tramite Avail. Queste catene possono implementare i loro ambienti di esecuzione di qualsiasi tipo: EVM, Wasm, o qualsiasi altra cosa.

:::

La disponibilità dei dati su Avail è disponibile per una finestra di tempo che è richiesto. Ad esempio, oltre che aver bisogno di dati o ricostruzione, la sicurezza non è compromessa.

:::info Ad Avail non importa a cosa servano i dati

Avail garantisce che i dati di blocco siano disponibili, ma non importa di cosa siano questi dati. I dati possono essere transazioni ma possono assumere anche altri moduli.

:::

I sistemi di archiviazione, d'altra parte, sono progettati per memorizzare i dati per lunghi periodi e includono meccanismi di incentivazione per incoraggiare gli utenti a memorizzare i dati.

## Convalida {#validation}

### Convalida peer {#peer-validation}

Di solito ci sono tre tipi di peer che compongono un ecosistema:

* **Validator nodi:** Un validatore raccoglie le transazioni dalla mempool, le esegue e crea un blocco candidato che è allegato alla rete. Il blocco contiene una piccola intestazione di blocco con il digest e i metadati delle transazioni nel blocco.
* **Nodo completo:** il blocco candidato si propaga a nodi completi in tutta la rete per la verifica. I nodi eseguiranno di nuovo le transazioni contenute nel blocco candidato.
* **Clienti luce:** I clienti di luce prendono solo l'intestazione di blocco da utilizzare per la verifica e riceveranno i dettagli delle transazioni dai nodi completi vicini se necessario.

Mentre un approccio sicuro, Avail affronta le limitazioni di questa architettura per creare robustezza e aumentare le garanzie. I clienti della luce possono essere ingannati nell'accettare blocchi i cui dati sottostanti non sono disponibili. Un produttore di blocchi può includere una transazione dannosa in un blocco e non rivelare il suo intero contenuto alla rete. Come indicato nelle docs di Avail, questo è noto come il problema della disponibilità dei dati.

I peer della rete di Avail includono:

* **Validator nodi:** Protocollo ha incentivato i nodi completi che partecipano al consenso. I nodi di validatore su Avail non eseguono le transazioni. Pacificano transazioni arbitrarie e costruiscono blocchi di candidati, generando impegni KZG per i **dati**.

* **Nodi completi di Avail (DA):** nodi che scaricano e mettono a disposizione tutti i dati di blocco per tutte le applicazioni utilizzando Avail. Allo stesso modo, i nodi completi Avail non eseguono le transazioni.

* **client di luce Avail (DA):** client che scaricano solo le intestazioni di blocco che vengono a campione casuale piccole parti del blocco per verificare la disponibilità. Esporre una API locale per interagire con la rete Avail.

:::info L'obiettivo di Avail non è fare affidamento sui nodi completi per mantenere i dati disponibili

Lo scopo è quello di dare simili garanzie da parte di un cliente luce come nodo completo. Gli utenti sono incoraggiati ad utilizzare i client leggeri. Tuttavia, possono ancora eseguire i nodi integrali di Avail, che sono ben supportati.

:::

:::caution L'API locale è un WIP e non è ancora stabile


:::

Questo consente di utilizzare Avail per integrare il client di luce DA . Possono quindi costruire:

* **Nodi full App**
  - Incorporare un client leggero Avail (DA)
  - Scaricare tutti i dati per un'appID specifica
  - Implementare un ambiente di esecuzione per eseguire le transazioni
  - Mantenere lo stato dell'applicazione

* **client di luce dell'app**
  - Incorporare un client leggero Avail (DA)
  - Implementare la funzionalità rivolta all'utente finale

L'ecosistema Avail sarà dotato di ponti per consentire specifiche valigie d'uso. Uno di questi bridge è stato progettato in questo momento un _ponte_ di attestazione che posterà le attestazioni dei dati disponibili su Avail a Ethereum, consentendo così la creazione di validi.

## Verifica dello stato {#state-verification}

### Verifica di blocco → Verifica DA {#da-verification}

#### Validatori {#validators}

Invece di Avail che verifichino lo stato di applicazione, si concentrano su garantire la disponibilità dei dati delle transazioni postate e fornire l'ordine delle transazioni. Un blocco è considerato valido solo se i dati dietro a quel blocco sono disponibili.

Avail validator assumono le transazioni in arrivo, le ordinare, costruire un blocco candidato e proporre alla rete. Il blocco contiene caratteristiche speciali, in particolare per la codifica di DA—erasure e gli impegni KZG. Questo è in un particolare formato, in modo che i clienti possono fare campionamento casuale e scaricare solo le transazioni di una singola applicazione.

Altri validatori verificano il blocco garantendo che il blocco sia ben formato, il check out degli impegni KZG, che i dati siano lì, ecc.

#### Client {#clients}

La richiesta di dati per essere disponibili impedisce ai produttori di rilasciare le intestazioni di blocco senza rilasciare i dati dietro di loro, in quanto impedisce ai clienti di leggere le transazioni necessarie per calcolare lo stato delle loro applicazioni. Come per altre catene, Avail utilizza la verifica della disponibilità dei dati per affrontare questo problema attraverso i controlli DA che utilizzano i codici di cancellazione; questi controlli sono pesantemente utilizzati per la progettazione della data redundancy

Cancellare i codici efficacemente duplicare i dati in modo che se una parte di un blocco viene soppressa, i client possono ricostruire quella parte utilizzando un'altra parte del blocco. Questo significa che un nodo che cerca di nascondere quella parte dovrebbe nascondere molto di più.

> La tecnica viene utilizzata in dispositivi come CD-ROM e array multi-disco (RAID) (ad esempio, se un disco rigido muore, può essere sostituito e ricostruito dai dati su altri dischi).

Quello che è unico in Avail è che la progettazione della catena permette a **chiunque** di controllare da parte di tutti i dati senza dover scaricare i dati. Una serie di client di luce può campionare collettivamente l'intera blockchain in questo modo. Di conseguenza, più nodi di consenso esistono, maggiore è la dimensione del blocco (e la sua throughput) in modo sicuro. I nodi di non consenso possono contribuire alla produttività e alla sicurezza della rete.

### Regolamento delle transazioni {#transaction-settlement}

Avail utilizzerà un layer di regolamento costruito con Polygon Edge. Lo strato di regolamento fornisce una blockchain compatibile con gli EVM per i rollup per memorizzare i loro dati e per eseguire la risoluzione delle controversie. Lo strato di regolamento utilizza Polygon Avail per la sua DA. Quando i rollup utilizzano uno strato di regolamento, ereditano anche tutte le proprietà DA di Avail.

:::note Diversi modi di risolvere

Ci sono diversi modi per utilizzare Avail, e i validi non utilizzeranno lo strato di regolamento, ma piuttosto si stabiliranno su Ethereum.

:::

Avail offre l'hosting e l'ordinazione dei dati. Lo strato di esecuzione probabilmente deriverà da più soluzioni di scaling off-chain o da diversi strati di esecuzione dell'eredità. Lo strato di regolamento assume il componente di verifica e risoluzione delle controversie.

## Risorse {#resources}

- [Introduzione a Avail by Polygon](https://medium.com/the-polygon-blog/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048).
- [Discussioni Polygon: Polygon Avail](https://www.youtube.com/watch?v=okqMT1v3xi0)
