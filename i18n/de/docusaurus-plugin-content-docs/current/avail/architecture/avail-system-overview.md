---
id: avail-system-overview
title: Systemübersicht
sidebar_label: System Overview
description: Erfahren Sie mehr über die Architektur der Avail Chain
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

# Systemübersicht {#system-overview}

## Modularität {#modularity}

Monolithische Blockchain-Architekturen wie die von Ethereum können derzeit nicht effizient mit der Ausführung, der Abwicklung und der Datenverfügbarkeit umgehen.

Die Modularisierung der Ausführung zur Skalierung von Blockchains ist, was rollup-centric Kettenmodelle versuchen. Dies kann gut funktionieren, wenn die Settlement und die data auf der gleichen Ebene liegen, d.h. der Ansatz Ethereum rollups nehmen werden. Trotzdem gibt es bei der Arbeit mit Rollups notwendige Trade-offs, da die Rollup-Konstruktion je nach Sicherheit der data sicherer sein kann, aber von Natur aus anspruchsvoller zu skalieren.

Ein granulares Design schafft jedoch verschiedene Ebenen, um leichte Protokolle zu sein, wie Microservices. Dann wird das gesamte Netzwerk zu einer Sammlung von Then, lightweight Ein Beispiel ist eine data die sich nur auf die Datenverfügbarkeit spezialisiert. Polygon Avail ist eine auf Substraten basierende Layer 2 für die Datenverfügbarkeit.

:::info Substrate-Laufzeit

Obwohl Avail auf der Substrate Codebase basiert, enthält es Änderungen an der Blockstruktur, die verhindern, dass sie mit anderen Substrate interagiert. Avail implementiert ein unabhängiges Netzwerk, das mit Polkadot oder Kusama nicht in Zusammenhang steht.

:::

Avail bietet eine hohe Garantie für die Datenverfügbarkeit für jeden light aber keine höheren Garantien für light über DA als jedes andere Netzwerk. Avail konzentriert sich darauf, zu beweisen, dass Blockdaten verfügbar sind, ohne den ganzen Block herunterzuladen, indem sie Kate polynomial erasure und andere Technologien nutzen, um es Light Clients zu erlauben, die nur die _Header_ der Chain herunterladen) kleine Mengen der Blockdaten effizient und zufällig zu proben, um ihre volle Verfügbarkeit zu überprüfen. Es gibt jedoch grundsätzlich andere Primitive als fraud-proof-based fraud-proof-based die [hier](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/) erläutert werden.

### Bereitstellung der Datenverfügbarkeit {#providing-data-availability}

Die DA-Garantie ist etwas, was ein Kunde für sich selbst festlegt; sie muss keinen Knoten vertrauen. Wenn die Anzahl der Light Clients wächst, werden sie gemeinsam den gesamten Block abgetastet (obwohl jeder Client nur einen geringen Prozentsatz abtastet). Light Clients bilden schließlich ein P2P-Netzwerk untereinander; daher wird es nach dem sampled, eines Blocks sehr verfügbar - d.h. wenn die Knoten nach unten gehen würden (oder einen Block zensieren), die Light Clients wären in der Lage, den Block durch die gemeinsame Nutzung der Stücke unter sich zu rekonstruieren.

### Ermöglichung der nächsten Reihe von Lösungsansätzen {#enabling-the-next-set-of-solutions}

Avail wird Rollups auf die nächste Stufe bringen, da Chains ihre Datenverfügbarkeitskomponente für verfügbar zuweisen können. Avail bietet auch eine alternative Möglichkeit, jede eigenständige Chain zu bootstrap da Ketten ihre Datenverfügbarkeit ausschalten können. Es gibt natürlich Trade-offs, die mit unterschiedlichen Modularitätsansätzen gemacht werden, aber das allgemeine Ziel ist es, eine hohe Sicherheit zu erhalten und gleichzeitig skalieren zu können.

Auch die Transaktionskosten werden gesenkt. Avail kann die Blockgröße vergrößern, mit einem geringeren Einfluss auf die validator als eine monolithische Chette. Wenn eine monolithische Kette die Blockgröße erhöht, müssen Prüfer viel mehr Arbeit tun, weil Blöcke ausführen müssen und der Zustand berechnet werden muss. Da Avail keine Ausführungsumgebung hat, ist es viel günstiger, die Blockgröße zu erhöhen. Die Kosten sind nicht null, weil es notwendig ist, KZG-Verpflichtungen zu berechnen und Proofs zu generieren, aber immer noch kostengünstig zu sein.

Avail ermöglicht auch souveräne Rollups. Benutzer können souveräne Chains erstellen, die auf die Validatoren von Avail, um einen Konsens über Transaktionsdaten und -ordnung zu erreichen. Sovereign Rollups auf Avail erlauben nahtlose Upgrades, da Benutzer Updates auf anwendungsspezifische Knoten drücken können, um die Chain zu aktualisieren und wiederum auf neue application-specific zu aktualisieren. Während in einer traditionellen Umgebung das Netzwerk eine Gabel benötigt.

:::info Avail hat keine Ausführungsumgebung

Avail führt keine Smart Contracts aus, ermöglicht aber anderen Ketten ihre Transaktionsdaten über Avail, zur Verfügung zu stellen. Diese Chains können ihre Ausführungsumgebungen jeglicher Art implementieren: EVM, Wasm oder sonst.

:::

Die Datenverfügbarkeit auf Avail ist für ein Zeitfenster verfügbar, das sie benötigt wird. Wenn beispielsweise keine Daten oder Rekonstruktion erforderlich sind, wird die Sicherheit nicht beeinträchtigt.

:::info Avail ist nicht wichtig, wofür die Daten verwendet werden sollen

Avail garantiert, dass Blockdaten verfügbar sind, aber es ist nicht wichtig, was diese Daten sind. Die Daten können Transaktionen sein, können aber auch andere Formen annehmen.

:::

Storage Systeme sind dagegen dazu konzipiert, Daten für lange Zeiträume zu speichern und incentivization einzuschließen, um Benutzer zu ermutigen, Daten zu speichern.

## Validierung {#validation}

### Peer-Validierung {#peer-validation}

Drei Arten von Peers bilden typischerweise ein Ökosystem:


* **Validator-Knoten:** Ein Prüfer sammelt Transaktionen aus dem mempool, führt diese aus und generiert einen Kandidatenblock, der dem Netzwerk angehängt ist. Der Block enthält einen kleinen Block-Header mit der Digest und Metadaten der Transaktionen im Block.
* **Volle Knoten:** Der Kandidatenblock breitet sich für die Verifizierung an volle Knoten im gesamten Netzwerk weiter. Die Knoten werden die im Kandidatenblock enthaltenen Transaktionen erneut ausführen.
* **Light Clients:** Light Clients holen nur den Block-Header ab, um die Verifizierung zu verwenden, und werden Transaktionsdetails von benachbarten vollen Knoten abrufen, wenn es nötig ist.

Während Avail als sicherer Ansatz adressiert die Einschränkungen dieser Architektur, um Robustheit und erhöhte Garantien zu schaffen. Light Clients können dazu aufgerufen werden, Blöcke zu akzeptieren, deren zugrunde liegende Daten nicht verfügbar sind. Ein Blockproduzent kann eine bösartige Transaktion in einem Block enthalten sein und seinen gesamten Inhalt nicht dem Netzwerk offenbaren. Wie in den Avail Dokumenten erwähnt, wird dies als das Problem der Datenverfügbarkeit bekannt.

Zu den Vorteilen von Avails Netzwerk zählen:

* **Validator-Knoten:** Protokoll hat volle Knoten angereizt, die am Konsens teilnehmen. Validator auf Avail führen keine Transaktionen aus. Sie verpacken willkürliche Transaktionen und erstellen Kandidatenblöcke, generieren KZG-Verpflichtungen für die **Daten. Andere Prüfer überprüfen, ob generierte Blöcke korrekt sind**.

* **Avail (DA) volle Knoten:** Knoten, die alle Blockdaten für alle Anwendungen mit Avail. Auf ähnliche Art und Weise führen volle Knoten von Avail keine Transaktionen aus.

* **Avail (DA) light** Clients: Clients, die nur Block-Header herunterladen, probieren kleine Teile des Blocks zufällig ab, um die Verfügbarkeit zu überprüfen. Sie stellen eine lokale API zur Interaktion mit dem Avail-Netzwerk bereit.

:::info Das Ziel von Avail besteht darin, nicht auf volle Knoten angewiesen zu sein, um die Datenverfügbarkeit sicherzustellen

Das Ziel ist es, ähnliche DA-Garantien an einen Light Client als full zu geben. Benutzer werden ermutigt, Avails Light Clients zu verwenden. Sie können jedoch weiterhin Avail volle Knoten ausführen, die gut unterstützt werden.

:::

:::caution Die lokale API ist ein WIP und ist noch nicht stabil


:::

Dies ermöglicht Anwendungen, die Avail verwenden möchten, um den DA light Client einzubetten. Sie können dann Folgendes bauen:

* **App volle Knoten**
  - Einbetten eines Avail (DA) Light Clients
  - Alle Daten für eine bestimmte AppID herunterladen
  - Implementierung einer Ausführungsumgebung, um Transaktionen auszuführen
  - Aufrechterhaltung des Anwendungsstatus

* **App Light Clients**
  - Einbetten eines Avail (DA) Light Clients
  - Implementierung der Endbenutzer-Funktionalität

Das Avail Ökosystem wird auch Brücken enthalten, um bestimmte Use Cases zu ermöglichen. Eine solche Bridge ist zu diesem Zeitpunkt eine _attestation_ die Attestationen der Daten auf Avail an Ethereum veröffentlicht und so die Erstellung von Validien ermöglicht.

## Status-Verifizierung {#state-verification}

### Blockverifizierung → DA Verifikation {#da-verification}

#### Validatoren {#validators}

Anstatt Avail Prüfer den Anwendungszustand zu überprüfen, konzentrieren sie sich auf die Verfügbarkeit der veröffentlichten Transaktionsdaten und die Bereitstellung von transaction Ein Block wird nur dann als gültig angesehen, wenn die Daten, die zu diesem Block gehören, verfügbar sind.

Avail Prüfer nehmen eingehende Transaktionen auf, bestelle sie, konstruiere einen Kandidatenblock und schlug dem Netzwerk vor. Der Block enthält spezielle Features, insbesondere für die DAs – das DA—erasure und KZG-Verpflichtungen. Dies ist in einem bestimmten Format, so dass Clients zufällige Sampling durchführen und nur die Transaktionen einer einzelnen Anwendung herunterladen können.

Andere Validatoren überprüfen den Block, indem sie prüfen, ob der Block wohlgeformt ist, die KZG-Verpflichtungen ausgecheckt sind, die Daten verfügbar sind etc.

#### Clients {#clients}

Die Voraussetzung für die Bereitstellung von Daten ist, dass Blockproduzenten Block-Header freigeben, ohne die Daten zu veröffentlichen, da dies verhindert, dass Clients die Transaktionen lesen, die für die Berechnung des Status ihrer Anwendungen erforderlich sind. Wie bei anderen Chains verwendet Avail die Überprüfung der Datenverfügbarkeit, um dies durch DA Checks zu adressieren, die Löschcodes verwenden; diese Prüfungen werden stark im data verwendet.

Codes effektiv duplizieren Daten so, dass, wenn ein Teil eines Blocks unterdrückt wird, Clients diesen Teil durch Verwendung eines anderen Teils des Blocks rekonstruieren können. Das bedeutet, dass ein Knoten, der diesen Teil verbergen möchte, viel mehr verbergen müsste.

> Diese Technik wird in Geräten wie CD-ROMs und Mehrplatten-Arrays (RAID) verwendet (wenn z. B. eine Festplatte das Ende ihrer Lebensdauer erreicht hat, kann sie ausgetauscht werden und ihr Inhalt kann basierend auf den Daten auf anderen Festplatten rekonstruiert werden).

Was an Avail einzigartig ist, ist, dass das chain **es jedem** ermöglicht, DA zu überprüfen, ohne die Daten herunterzuladen. DA Prüfungen erfordern von jedem Light-Client, eine minimale Anzahl von zufälligen Chunks von jedem Block in der Chain zu probieren. Ein Satz von Light Clients kann die gesamte Blockchain auf diese Weise gemeinsam abtasten. Je mehr Nicht-Konsens-Knoten es also gibt, desto größer kann die Blockgröße (und den Durchsatz) sicher existieren. Das bedeutet, dass non-consensus Knoten zum Durchsatz und zur Sicherheit des Netzwerks beitragen können.

### Abwicklung von Transaktionen {#transaction-settlement}

Avail verwendet einen mit Polygon Edge erstellten Abwicklungs-Layer Die Settlement Layer stellt eine EVM-kompatible Blockchain für Rollups bereit, um ihre Daten zu speichern und Streitbeilegung durchzuführen. Die Settlement Layer verwendet Polygon Avail für seine DA. Wenn Rollups eine Settlement Layer verwenden, erben sie auch alle DA Eigenschaften von Verfüg.

:::note Verschiedene Möglichkeiten der Abwicklung

Es gibt verschiedene Möglichkeiten, verfügbar zu verwenden, und die Validiums werden nicht die Settlement Layer verwenden, sondern sich auf Ethereum absetzen.

:::

Avail bietet Datenhosting und -bestellung. Die execution wird wahrscheinlich aus mehreren off-Chain off-chain oder Legacy off-chain kommen. Die Settlement Layer übernimmt die Prüf- und dispute

## Ressourcen {#resources}

- [Einführung in Avail von Polygon](https://medium.com/the-polygon-blog/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048).
- [Polygon Talks: Polygon Avail](https://www.youtube.com/watch?v=okqMT1v3xi0)
