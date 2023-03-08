---
id: what-is-avail
title: Avail von Polygon
sidebar_label: Introduction
description: Erfahren Sie mehr über Polygons Datenverfügbarkeits-Kette
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

Avail ist eine Blockchain, die sich auf die Verfügbarkeit von Daten konzentriert: die Bestellung und die Aufnahme von Blockchain-Transaktionen und die Ermöglichung der Überprüfung ermöglicht, dass Blockdaten verfügbar sind, ohne den gesamten Block herunterzuladen. Dies ermöglicht es ihm, in einer Weise zu skalieren, die monolithische Blockchains nicht können.

:::info Eine robuste skalierbare Mehrzweck-Datenverfügbarkeitsschicht

* Ermöglicht Layer-2-Lösungen, um einen erhöhten Skalierbarkeitsdurchsatz anzubieten, indem Avail dazu genutzt wird, Validiums mit off-chain Datenverfügbarkeit zu erstellen.

* Ermöglicht eigenständige Chains oder Sidechains mit beliebigen Ausführungsumgebungen, die Sicherheit von Validatoren zu booten, ohne ihren eigenen Validator erstellen und verwalten zu müssen, indem die Verfügbarkeit von Transaktionsdaten gewährleistet wird.

:::

## Aktuelle Verfügbarkeit und Skalierungs-Herausforderungen {#current-availability-and-scaling-challenges}

### Was ist das Datenverfügbarkeits-Problem? {#what-is-the-data-availability-problem}

Peers in einem Blockchain-Netzwerk brauchen einen Weg, um sicherzustellen, dass alle Daten eines neu vorgeschlagenen Blocks leicht verfügbar sind. Wenn die Daten nicht verfügbar sind, könnte der Block bösartige Transaktionen enthalten, die vom Block-Produzenten versteckt werden. Selbst wenn der Block keine bösartigen Transaktionen enthält, könnte das Verstecken dieser Transaktionen die Sicherheit des Systems gefährden.

### Avails Ansatz für Daten-Verfügbarkeit {#avail-s-approach-to-data-availability}

#### Hohe Garantie {#high-guarantee}

Avail bietet eine nachweisbare und hohe Garantie dafür, dass Daten verfügbar sind. Light Clients können die Verfügbarkeit in einer konstanten Anzahl von Abfragen unabhängig überprüfen, ohne den gesamten Block herunterzuladen.

#### Minimales Vertrauen {#minimum-trust}

Keine Notwendigkeit, ein Validierer zu sein oder einen vollständigen Knoten zu hosten. Selbst mit einem leichten Client erhalten Sie überprüfbare Verfügbarkeit.

#### Leicht zu verwenden {#easy-to-use}

Die Lösung wurde mit einer veränderten Version von Substrate erstellt und konzentriert sich auf Benutzerfreundlichkeit, unabhängig davon, ob Sie eine Anwendung hosten oder eine Off-chain-Skalierungslösung nutzen.

#### Perfekt für Off-Chain-Skalierung {#perfect-for-off-chain-scaling}

Schöpfen Sie das volle Skalierungspotenzial Ihrer Off-Chain-Skalierungslösung aus, indem Sie die Daten bei uns lassen  und trotzdem das DA-Problem auf L1 vermeiden.

#### Ausführungsagnostik {#execution-agnostic}

Ketten, die Avail verwenden, können jede Art von Ausführungsumgebung implementieren, unabhängig von der Anwendungslogik sein. Transaktionen aus jeder Umgebung werden unterstützt: EVM, Wasm oder sogar neue VMs, die noch nicht erstellt wurden. Avail ist perfekt für das Experimentieren mit neuen execution

#### Bootstrapping-Sicherheit {#bootstrapping-security}

Avail ermöglicht es neue Chains zu erstellen, ohne einen neuen Prüfer-Set zu drehen, und stattdessen die von Avail's nutzen. Avail kümmert sich um transaction Konsens und Verfügbarkeit im Austausch für einfache Transaktionsgebühren (Gas).

#### Schnelle nachweisbare Finalität mithilfe von NPoS {#fast-provable-finality-using-npos}

Schnelle nachweisbare Finalität via angegebenem Proof of Stake. Unterstützt von KZG Verpflichtungen und Erasure Coding.

Starte mit diesem [Blog-Beitrag](https://blog.polygon.technology/polygon-research-ethereum-scaling-with-rollups-8a2c221bf644/) auf der Skalierung von Ethereum mit Rollups an.

## Avail-gestützte Validien {#avail-powered-validiums}

Aufgrund der Architektur von monolithischen Blockchains (wie Ethereum in ihrem aktuellen Zustand) ist der Betrieb der Blockchain teuer, was zu hohen Transaktionsgebühren führt. Rollups versuchen, die Belastung der Ausführung zu extrahieren, indem Transaktionen off-chain ausgeführt werden, und dann die Ausführungsergebnisse und die [in der Regel komprimierten] Transaktionsdaten veröffentlichen.

Validiums sind der nächste Schritt: statt die Transaktionsdaten zu veröffentlichen, wird sie off-chain verfügbar, wo eine Proof/Attestation nur auf der Basisschicht veröffentlicht wird. Dies ist bei weitem die kostengünstigste Lösung, da sowohl die Ausführung als auch die Datenverfügbarkeit off-chain gehalten werden und trotzdem eine endgültige Verifizierung und Abwicklung auf der Layer 1-Chain ermöglicht.

Avail ist eine für die Datenverfügbarkeit optimierte Blockchain. Jedes Rollup, das ein Validium werden möchte, kann auf Transaktionsdaten an Avail anstelle der Ebene 1 umschalten, und einen Verifizierungsvertrag bereitstellen, der neben der Überprüfung der korrekten Ausführung auch die Verfügbarkeit der Daten überprüft.

:::note Bestätigungen

Das Avail-Team wird diese availability auf Ethereum einfach machen, indem du eine attestation aufbaust, um die verification direkt an Ethereum zu veröffentlichen. Dies wird den Job des verification zu einem einfachen machen, da die DA bereits auf der Chain sind. Diese Bridge ist derzeit im Design, bitte kontaktiere das Avail-Team, um weitere Informationen zu erhalten oder dich an unserem Early Access Programm zu beteiligen.

:::

## Siehe auch {#see-also}

* [Einführung von Avail by Polygon – eine robuste, skalierbare Mehrzweck-Datenverfügbarkeits-Layer](https://polygontech.medium.com/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
* [Das Datenverfügbarkeitsproblem](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
