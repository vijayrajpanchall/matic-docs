---
id: avail-consensus
title: Consensus d'Avail
sidebar_label: Consensus
description: En savoir plus sur le mécanisme de consensus d'Avail
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

# Consensus d'Avail {#avail-s-consensus}

## Comités de disponibilité des données {#data-availability-committees}

Jusqu'à présent, l'approche de maintien des solutions DA a généralement été faite par un DAC (comité de disponibilité des données). Un DAC est responsable de publier des signatures à la chaîne principale et de vérifier la disponibilité des données hors-chaîne. Le DAC doit s'assurer que les données sont facilement disponibles.

Grâce à un DAC, les solutions de mise à l'échelle comptent sur un DAC pour atteindre un Validium. Le problème avec les DACs est que la disponibilité des données devient un service fiable pour un petit groupe de membres du comité qui sont responsables de stocker et de déclarer les données honnêtes.

Avail n'est pas un DAC, mais un réseau blockchain réel avec son mécanisme de consensus et a son propre ensemble de nœuds validateurs et de producteurs de blocs.

## Preuve d'Enjeu {#proof-of-stake}

:::caution Validateurs actuels

Avec le lancement initial du testnet Avail, les validateurs seront
exploités et maintenus en interne par Polygon.

:::

Les systèmes de preuve traditionnelle de mise en jeu exigent que les auteurs de la production de blocs aient des participations jetons (stake) sur la chaîne pour produire des blocs, par opposition aux ressources informatiques (travail).

Les produits Polygon utilisent PoS (preuve de mise en jeu) ou une modification de PoS. Habituellement, les validateurs dans les systèmes PoS traditionnels qui ont le plus de enjeux ont le plus d'influence et de contrôle du réseau.

Les systèmes avec de nombreux gestionnaires de réseau ont tendance à former des bassins hors-chaîne pour maximiser les gains en capital en réduisant les variances de récompenses. Ce défi de centralisation atténue lorsque les piscines sont incluses sur la chaîne qui permet aux titulaires de jetons de soutenir les mainteneurs du réseau qu'ils sentent les mieux représentés et les intérêts du réseau. Cela distribue également la concentration de puissance validateur, en supposant que les bons mécanismes de vote et d'élection sont en place, car l'enjeu global sur le réseau est alloué sous forme de relation one-to-many ou beaucoup, au lieu de ne compter qu'sur une relation concentration, où la confiance est placée dans les validateurs « les plus stakés ».

Cette modification de la preuve de mise en jeu peut être administrée par délégation ou nomination, communément appelée DPoS (preuve de mise en jeu déléguée) ou NPoS (preuve de mise en jeu nominée). Les solutions d'échelle Polygon ont adapté ces mécanismes améliorés, y compris Polygon Avail.

Avail utilise NPoS avec une modification dans la vérification de bloc. Les acteurs concernés sont encore validateurs et nominateurs.

Les clients légers peuvent également contribuer à la disponibilité des données sur Avail. Le consensus de disponibilité exige que les deux tiers plus 1 des validateurs atteignent un consensus pour la validité.

## Nominateurs {#nominators}

Les candidats peuvent choisir de soutenir un ensemble de validateurs Avail candidats avec leur participation. Les candidats nommeront les validateurs qu'ils estiment fourniront efficacement la disponibilité des données.

## Différence entre DPoS et NPoS {#difference-between-dpos-and-npos}

À la valeur nominale, la délégation et la nomination semblent être la même action, en particulier du point de vue d'un staker avide. Cependant, les différences se situent dans les mécanismes de consensus sous-jacents et la façon dont la sélection des validateurs se produit.

Dans DPoS, un système d'élection centré sur le vote détermine un nombre fixe de validateurs pour sécuriser le réseau. Les délégués peuvent déléguer leur participation contre les validateurs de réseau candidats en l'utilisant comme pouvoir de vote pour revenir les délégués. Les délégations prennent souvent en charge les validateurs sur les plus hauts stakés, car les validateurs plus hauts stakés ont une chance d'élection plus élevée. Les délégués ayant le plus de votes deviennent les validateurs du réseau et peuvent vérifier les transactions. Lors de l'utilisation de leur participation comme pouvoir de vote, sur power, ils ne sont pas sujets à des conséquences via un slashing si leur validateur élu se comporte malveillant. Dans d'autres systèmes DPoS, les délégués peuvent être sujets à des slashing.

Dans NPoS, les délégués se transforment en nominateurs et utilisent leur participation de la même manière pour nommer des validateurs candidats potentiels pour sécuriser le réseau. La prise est verrouillée sur la chaîne, et contrairement à DPoS, les candidats sont sujets à un slashing basé sur le comportement malveillant potentiel de leurs nominations. À cet égard, NPoS est un mécanisme de staking plus proactif par opposition au staking qui est "réglé et oublié", car les nominateurs attendent des validateurs bien se comportants et durables. Cela encourage également les validateurs à créer des opérations de validateurs robustes pour attirer et maintenir des nominations.
