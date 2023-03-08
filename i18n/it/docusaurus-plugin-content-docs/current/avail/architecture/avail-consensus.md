---
id: avail-consensus
title: Consenso di Avail
sidebar_label: Consensus
description: Scopri il meccanismo di consenso di Avail
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

# Consenso di Avail {#avail-s-consensus}

## Comitati per la disponibilità dei dati {#data-availability-committees}

Fino ad oggi, l'approccio al mantenimento delle soluzioni DA è generalmente stato attraverso un DAC (comitato di disponibilità dei dati). Il DAC è responsabile del invio delle firme alla catena principale e della sua testimonianza della disponibilità di dati off-chain.

Tramite un DAC, le soluzioni di scalabilità fanno affidamento a un DAC per raggiungere un Validium. Il problema con i DAC è che la disponibilità dei dati diventa un servizio di fiducia per un piccolo gruppo di membri del comitato che sono responsabili della memorizzazione e della comunicazione truthfully

Avail non è una DAC, ma una vera e propria rete di blockchain con il suo meccanismo di consenso e ha una propria serie di nodi di validatore e produttori di blocco.

## Proof-of-Stake {#proof-of-stake}

:::caution Validatori attuali

Con il lancio iniziale della testnet di Avail, i validatori saranno operati e mantenuti internamente da Polygon.

:::

La prova tradizionale dei sistemi di gioco richiede agli autori di bloccare la produzione di avere token holding (stake) on-chain per produrre blocchi, in contrasto con le risorse computazionali (lavoro).

I prodotti di Polygons utilizzano PoS (prova di stake) o una modifica di PoS. Solitamente, i validatori dei tradizionali sistemi PoS che hanno la maggior parte delle puntate hanno la maggior influenza e il controllo della rete.

I sistemi con molti manutentori di rete tendono a formare pool off-chain per massimizzare i guadagni di capitale riducendo la varianza di ricompensa. Questa sfida di centralizzazione si riduce quando le piscine sono incluse on-chain che permette ai token di supportare i manutentori di rete che ritengono migliore rappresentano loro e gli interessi della rete. Questo distribuisce anche la concentrazione di potenza del validatore, presupponendo che siano in atto i giusti meccanismi di voto e di elezione, in quanto la quota complessiva della rete viene allocata come una relazione one-to-many o many-to-many invece di basarsi solo su una relazione one-to-one, in cui la fiducia viene messa nei validatori "più elevati".

Questa modifica della prova della posta può essere somministrata tramite delega o nominale, comunemente indicata come DPoS (prova delegata della stake) o NPoS (prova nominata della stake). Le soluzioni di scaling di Polygon's hanno adattato questi meccanismi migliorati, tra cui Polygon Avail.

Avail utilizza la NPoS con una modifica nella verifica del blocco. Gli attori coinvolti sono ancora validatori e nominatori.

Anche i clienti light possono contribuire a loro volta alla disponibilità dei dati su Avail. Il consenso di Avail richiede che due terzi più 1 dei validatori raggiungano il consenso per la validità.

## Nominatori {#nominators}

I Nominatori possono scegliere di supportare una serie di validatori Avail candidato con la loro stake. I Nominatori nomineranno quei validatori che ritengono forniranno effettivamente la disponibilità dei dati.

## Differenza tra DPoS e NPoS {#difference-between-dpos-and-npos}

A livello di valore, la delegazione e la nomina sembrano la stessa azione, soprattutto dal punto di vista di un staker. Tuttavia, le differenze sono i meccanismi di consenso sottostanti e come avviene la selezione dei validatori.

In DPoS, un sistema elettorale centrico determina un numero fisso di validatori per garantire la rete. I delegatori possono delegare la propria partecipazione ai validatori di rete candidata, utilizzando la stessa potenza di voto per tornare i delegati. I delegatori spesso supportano i validatori sui più alti livelli di scalo, poiché i validatori più alti hanno una maggiore possibilità di elezione. I delegati con il massimo dei voti diventano i validatori della rete e possono verificare le transazioni. Durante l'utilizzo della loro partecipazione come potenza di voto, su Avail, non sono soggetti a conseguenze tramite lo slashing se il validatore eletto si comporta malmente. In altri sistemi DPoS, i delegatori possono essere soggetti a slittamento.

In NPoS, i delegatori si trasformano in nominatori e utilizzano la loro partecipazione in modo analogo per nominare potenziali validatori candidati per garantire la rete. La puntata è bloccata on-chain, e contrariamente a DPoS, i nominatori sono soggetti a slashing in base al potenziale comportamento dannoso delle loro nomine. A questo proposito, NPoS è un meccanismo di puntamento più proattivo invece di "impostare e dimenticare", in quanto i nominatori si affacciano per i validatori well-behaving e sostenibili. Questo incoraggia anche i validatori a creare delle solide operazioni di validatore per attirare e mantenere le nominazioni.
