---
id: faq
title: DOMANDE FREQUENTI
sidebar_label: FAQ
description: Domande frequenti su Polygon Avail
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

# Domande frequenti {#frequently-asked-questions}

:::tip

Se non trovi la tua domanda in questa pagina, invia la tua domanda sul **[<ins>server Polygon Avail Discord</ins>](https://discord.gg/jXbK2DDeNt)**.

:::

## Che cos'è un cliente light? {#what-is-a-light-client}

I clienti leggeri permettono agli utenti di interagire con una rete di blockchain senza dover sincronizzare la blockchain completa, mantenendo la decentralizzazione e la sicurezza. Generalmente, scaricano le intestazioni di blockchain, ma non il contenuto di ogni blocco. I client luce di Avail (DA) verificano inoltre che i contenuti del blocco siano disponibili eseguendo il Sampling di Data Availability una tecnica in cui vengono scaricate piccole sezioni casuali di un blocco.

## Qual è un comune caso d'uso di un cliente light? {#what-is-a-popular-use-case-of-a-light-client}

Ci sono molti casi d'uso che oggi si basano su un intermediario per mantenere un nodo completo, in modo che gli utenti finali di una blockchain non comunicano direttamente con la blockchain ma invece attraverso l'intermediario. I clienti della luce non sono stati finora una sostituzione adatta per questa architettura perché mancavano dati riguardo alla disponibilità dei dati. Avail risolve questo problema, consentendo così più applicazioni di partecipare direttamente alla rete blockchain senza intermediari. Sebbene Avail sostenga i nodi pieni, ci aspettiamo che la maggior parte delle applicazioni non debba eseguire una o che dovrà eseguire una volta in funzione.

## Che cos'è il campionamento della disponibilità dei dati? {#what-is-data-availability-sampling}

Avail light client, come altri client di luce, scarica solo le intestazioni della blockchain. Tuttavia, eseguono un campionamento di disponibilità dei dati: una tecnica che campiona casualmente piccole sezioni dei dati del blocco e verifica che siano corrette. Quando combinata con la cancellazione della codifica e con gli impegni polinomiali di Kate, i clienti Avail sono in grado di fornire una solida (quasi il 100%) garanzia di disponibilità senza affidarsi alle prove di frode, e con un piccolo numero di domande costante.

## Come viene usata la cancellazione del codice per aumentare le garanzie riguardo alla disponibilità dei dati? {#how-is-erasure-coding-used-to-increase-data-availability-guarantees}

La cancellazione è una tecnica che codifica i dati in modo che distribuisca le informazioni su più "shard", in modo che la perdita di un certo numero di tali shards possa essere tollerata. Cioè, le informazioni possono essere ricostruite dagli altri shard. Applicato alla blockchain, questo significa che aumentiamo efficacemente le dimensioni di ogni blocco, ma impediamo a un attore dannoso di poter nascondere qualsiasi parte di un blocco fino alle dimensioni ridondanti dello shard.

Poiché un attore maligno deve nascondere una gran parte del blocco per cercare di nascondere anche una singola transazione, rende molto più probabile che il campionamento casuale colga le grandi lacune dei dati.

## Cosa sono gli impegni di Kate? {#what-are-kate-commitments}

Gli impegni di Kate, introdotti da Aniket Kate, Gregory M. Zaverucha, e Ian Goldberg nel 2010, forniscono un modo per impegnarsi nei polinomi in modo succinto. Gli impegni nei polinomi sono recentemente venuti in primo piano in quanto vengono principalmente utilizzati come impegni in costruzioni a conoscenza zero simil PLONK.

Nella nostra costruzione, utilizziamo gli impegni di Kate per i seguenti motivi:

- Ci da la possibilità di impegnarci nei valori in un modo succinto che permette di mantenerli all'interno dell'intestazione del blocco.
- Permettono brevi aperture che aiutano i clienti light a verificare la disponibilità.
- La proprietà di collegamento crittografico ci aiuta a evirare truffe proof rendendo computazionalmente impossibile produrre impegni errati.

In futuro, potremmo ricorrere a diversi schemi di impegno polinomiale, nel caso in cui ci forniscano garanzie o collegamenti migliori.

## Poiché Avail è utilizzato in numerose applicazioni, ciò vuol dire che le catene devono scaricare le transazioni da altre catene? {#since-avail-is-used-by-multiple-applications-does-that-mean-chains-have-to-download-transactions-from-other-chains}

No. Le intestazioni di Avail contengono un indice che permette a una data applicazione di determinare e scaricare solo le sezioni di un blocco che hanno dati per quella applicazione. Pertanto, sono in gran parte non influenzate da altre catene che utilizzano Avail allo stesso tempo o da dimensioni di blocco.

L'unica eccezione è il campionamento della disponibilità dei dati. Per verificare che i dati siano disponibili (e per la natura della cancellazione della codica), i client sample piccole parti del blocco in modo casuale, comprese le eventuali sezioni che contengono dati per altre applicazioni.
