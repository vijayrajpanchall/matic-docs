---
id: avail-consensus
title: Avails Konsens
sidebar_label: Consensus
description: Erfahren Sie mehr über Avails Konsensmechanismus
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

# Avails Konsens {#avail-s-consensus}

## Kommitees für Datenverfügbarkeit {#data-availability-committees}

Der Ansatz zur Aufrechterhaltung von DA Lösungen wurde bisher in der Regel über einen DAC (Data Availability Committee) geschehen. Ein DAC ist dafür verantwortlich, Signaturen in die Hauptkette zu veröffentlichen, und die Verfügbarkeit von off-chain-Daten zu bestätigen. Der DAC muss sicherstellen, dass Daten verfügbar sind.

Wenn ein DAC existiert, sind Skalierungslösungen auf den DAC angewiesen, um ein Validium zu erreichen. Das Problem mit DACs ist, dass die Datenverfügbarkeit ein vertrauenswürdiger Service für eine kleine Gruppe von Gremiumsmitgliedern wird, die für die Speicherung und die Wahrhaftigkeit der Daten verantwortlich sind.

Avail ist kein DAC, sondern ein eigentliches Blockchain-Netzwerk mit seinem Konsensmechanismus und hat einen eigenen Satz von validator und Block-Produzenten.

## Proof of Stake {#proof-of-stake}

:::caution Aktuelle Prüfer

Mit dem Start des Avail-Testnet werden Prüfer  von Polygon intern betrieben und gewartet.

:::

Der traditionelle Nachweis von stake verlangt von den Autoren der Blockproduktion, dass sie token (Stake) auf der Chain haben, um Blöcke zu produzieren, im Gegensatz zu den Computational Resources (Arbeit).

Polygon Produkte verwenden PoS (Proof of Stake) oder eine Modifikation von PoS. In der Regel haben Prüfer in traditionellen PoS-Systemen, die den meisten Einsatz haben, den größten Einfluss und die Kontrolle über das Netzwerk.

Systeme mit vielen network bilden in der Regel off-Chain Pools, um den Kapitalgewinn zu maximieren, indem sie die reward reduzieren. Diese Herausforderung der Zentralisierung wird gereinigt, wenn Pools auf der Chain enthalten sind, die es on-chain ermöglicht, Netzwerk-Maintainern zu sichern, von denen sie sich am besten für sie und die Interessen des Netzwerks halten. Dies verteilt auch die Leistungskonzentration des Prüfers und setzt voraus, dass die richtigen Abstimmungs- und Wahlmechanismen vorhanden sind, da der Gesamteinsatz im Netzwerk als eine one-to-many oder one-to-many Beziehung zugewiesen wird, anstatt sich nur auf eine one-to-many Beziehung zu verlassen, wo Vertrauen in die "höchsten staked" Prüfer gesetzt wird.

Diese Änderung des proof kann durch Delegation oder Nominierung verwaltet werden, die allgemein als DPoS (delegierter proof oder NPoS (nominierter proof bezeichnet wird. Polygon Skalierungslösungen haben diese erweiterten Mechanismen angepasst, einschließlich Polygon Avail.

Avail nutzt NPos mit einer Modifizierung der Blockverifizierung. Die beteiligten Akteure sind immer noch Prüfer und Nominatoren.

Auch Light Clients können zur Datenverfügbarkeit auf Avail beitragen. Der Konsens von Available verlangt, dass zwei Drittel plus 1 der Prüfer einen Konsens für die Gültigkeit erreichen.

## Nominatoren {#nominators}

Nominatoren können wählen, eine Reihe von Kandidaten Avail Validatoren mit ihrem Einsatz zu sichern. Nominatoren werden diejenigen Prüfer nominieren, die sie glauben, dass sie die Verfügbarkeit der Daten effektiv bereitstellen.

## Unterschied zwischen DPoS und NPoS {#difference-between-dpos-and-npos}

Bei dem Gesichtspunkt wirken Delegation und Nominierung wie dieselbe Aktion, besonders aus der Sicht eines begeisterten Stakers. Die Unterschiede liegen jedoch in den zugrunde liegenden Konsensmechanismen und wie die Validator-Auswahl stattfindet.

In DPoS ermittelt ein voting-centric Wahlsystem eine feste Anzahl von Prüfern, um das Netzwerk zu sichern. Delegatoren können ihren Einsatz an candidate delegieren, indem sie sie als Stimmmacht zur Zurückzusetzen Unterstützung der Delegatoren einsetzen. Delegatoren unterstützen häufig Validatoren auf dem höchsten Staked, da höher higher-staked Validatoren eine höhere Chance auf Wahl haben. Die Delegierten mit den meisten Stimmen werden die Validatoren des Netzwerks und können Transaktionen überprüfen. Wenn sie ihren Einsatz als Stimmmacht nutzen, unterliegen sie nicht den Folgen durch Slashing, wenn ihr gewählter Prüfer bösartig verhält. In anderen DPoS können Delegatoren dem slashing. werden.

In NPoS verwandeln sich die Delegatoren in Nominatoren und verwenden ihren Einsatz in ähnlicher Weise, um potenzielle nominators zu nominieren, um das Netzwerk zu sichern. Stake ist auf der Chain gesperrt und im Gegensatz zu DPoS unterliegen Nominatoren dem Slashing basierend auf dem potenziellen schädlichen Verhalten ihrer Nominierungen. In dieser Hinsicht ist NPoS ein proaktiverer Staking Mechanismus, im Gegensatz zu Staking der "gesetzt und vergessen" ist, da Nominatoren auf gut verhaltende und nachhaltige Prüfer achten. Dies ermutigt auch die Prüfer dazu, robuste validator zu erstellen, um Nominierungen anzuziehen und zu erhalten.
