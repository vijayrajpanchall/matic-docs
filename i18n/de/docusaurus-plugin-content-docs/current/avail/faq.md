---
id: faq
title: FAQs
sidebar_label: FAQ
description: Häufig gestellte Fragen über Polygon Avail
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

# Häufig gestellte Fragen {#frequently-asked-questions}

:::tip

Wenn du deine Frage auf dieser Seite nicht findest, sende deine Frage auf dem **[<ins>Polygon Avail Discord-Server</ins>](https://discord.gg/jXbK2DDeNt)** ein.

:::

## Was ist ein Light-Client? {#what-is-a-light-client}

Light Clients erlauben es Benutzern, mit einem Blockchain-Netzwerk zu interagieren, ohne die volle Blockchain synchronisieren zu müssen, während die Dezentralisierung und Sicherheit aufrechterhalten werden. Im Allgemeinen laden sie die blockchain herunter, aber nicht den Inhalt jedes Blocks. Avail (DA) light überprüfen zusätzlich zu, dass Blockinhalte verfügbar sind, indem sie Data Availability Sampling durchführen, eine Technik, bei der kleine zufällige Abschnitte eines Blocks heruntergeladen werden.

## Was ist ein häufiger Anwendungsfall eines Light-Clients? {#what-is-a-popular-use-case-of-a-light-client}

Es gibt viele Anwendungsfälle, die sich heute auf einen Intermediär verlassen, um einen vollen Knoten zu pflegen, so dass die Endbenutzer einer Blockchain nicht direkt mit der Blockchain kommunizieren, sondern durch den Intermediär. Light Clients waren bisher kein geeigneter Ersatz für diese Architektur, weil ihnen Daten fehlte Datenverfügbarkeitsgarantien fehlten. Avail löst dieses Problem und ermöglicht so mehr Applikationen, direkt am Blockchain-Netzwerk teilzuhaben, ohne Zwischenhändler. Obwohl Avail volle Knoten unterstützt, erwarten wir, dass die meisten Anwendungen keine ausführen müssen, oder dass sie weniger ausgeführt werden müssen.

## Was ist Data Availability Sampling? {#what-is-data-availability-sampling}

Avail Light Clients, wie andere Light Clients, laden nur die Header der Blockchain herunter. Sie führen aber zusätzlich Datenverfügbarkeits-Sampling durch: eine Technik, die nach dem Zufallsprinzip kleine Abschnitte der Blockdaten abfragt und verifiziert, dass sie korrekt sind. In Kombination mit der erasure und der polynomial von Kate sind Avail Clients in der Lage, starke (fast 100%) Kate zu bieten, ohne sich auf Betrugsnachweise zu verlassen, und mit nur einer geringen konstanten Anzahl von Abfragen.

## Wie wird Erasure Coding eingesetzt, um die Datenverfügbarkeitsgarantien zu erhöhen? {#how-is-erasure-coding-used-to-increase-data-availability-guarantees}

Erasure Coding ist eine Technik, die Daten in einer Weise codiert, die die Informationen über mehrere "Shards" verteilt, so dass der Verlust einer bestimmten Anzahl dieser Shards toleriert werden kann. Das heißt, die Informationen können aus den anderen Shards rekonstruiert werden. Auf die Blockchain angewendet, bedeutet dies, dass wir die Größe jedes Blocks effektiv erhöhen, aber wir verhindern, dass ein bösartiger Schauspieler in der Lage ist, jeden Teil eines Blocks bis zur redundanten Shard-Größe zu verstecken.

Da ein bösartiger Schauspieler einen großen Teil des Blocks verbergen muss, um zu versuchen, sogar eine einzelne Transaktion zu verstecken, macht es viel wahrscheinlicher, dass zufällige Abtastung die großen Lücken in den Daten fangen. Effektiv macht das erasure die data Sampling-Technik viel leistungsfähiger.

## Was sind Kate-Commitments? {#what-are-kate-commitments}

Kate-Commitments wurden 2010 von Aniket Kate, Gregory M. Zaverucha und Ian Goldberg eingeführt und bieten eine
Möglichkeit, Polynomen auf treffende Art und Weise zu begegnen. Erst vor kurzem traten Polynomial Commitments in den Vordergrund.
Sie werden in erster Linie als Commitments in PLONK-ähnlichen Zero-Knowledge-Konstruktionen eingesetzt.

Wir setzen Kate-Commitments bei unserem Aufbau aus folgenden Gründen ein:

- Sie ermöglichen uns, Werte kurz und bündig einem Block Header zuzuordnen.
- Es ist möglich, kurze Öffnungen durchzuführen, was einem Light-Client dabei hilft, Verfügbarkeit zu überprüfen.
- Die kryptografische Bindungseigenschaft hilft uns dabei, auf Betrugsprüfungen verzichten zu können und es rechnerisch unmöglich zu machen,
 falsche Commitments zu produzieren.

Vielleicht werden wir zukünftig andere Polynomial Commitment-Systeme verwenden, wenn diese uns bessere Grenzen oder Garantien bieten.

## Avail wird von mehreren Anwendungen genutzt; bedeutet das, dass Chains Transaktionen aus anderen Chains herunterladen müssen? {#since-avail-is-used-by-multiple-applications-does-that-mean-chains-have-to-download-transactions-from-other-chains}

Nein. Avail Headers enthalten einen Index, der es einer bestimmten Anwendung ermöglicht, nur die Abschnitte eines Blocks zu ermitteln und herunterzuladen, die Daten für diese Anwendung haben. Sie sind also weitgehend unberührt von anderen Ketten mit Avail gleichzeitig oder von Blockgrößen betroffen.

Die einzige Ausnahme ist das Data Availability Sampling. Um zu überprüfen, dass Daten verfügbar sind (und aufgrund der Art der erasure werden kleine Teile des Blocks nach dem Zufallsprinzip angeboten, einschließlich möglicherweise Abschnitte, die Daten für andere Anwendungen enthalten.
