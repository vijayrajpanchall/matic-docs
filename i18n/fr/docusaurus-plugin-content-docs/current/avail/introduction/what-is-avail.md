---
id: what-is-avail
title: Avail de Polygon
sidebar_label: Introduction
description: En savoir plus sur la chaîne de disponibilité des données de Polygon
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

Avail est une blockchain axée sur la disponibilité des données au laser : commander et enregistrer des transactions blockchain, et permettant de prouver que les données de bloc sont disponibles sans télécharger l'ensemble du bloc. Cela lui permet de s'adapter de manière que les blockchains monolithiques ne peuvent pas.

:::info Une couche de disponibilité des données robuste et évolutive à usage général

* Permet aux solutions Layer-2 d'offrir un débit d'évolutivité accru en exploitant Avail pour construire des Validiums avec la disponibilité des données hors-chaîne.

* Permet aux chaînes autonomes ou aux chaînes latérales avec des environnements d'exécution arbitraires de démarrer la sécurité du validateur sans avoir à créer et à gérer leur propre validateur défini en garantissant la disponibilité des données de transaction.

:::

## Disponibilité actuelle et défis de mise à l'échelle {#current-availability-and-scaling-challenges}

### Quel est le problème de disponibilité des données ? {#what-is-the-data-availability-problem}

Les pairs d'un réseau blockchain ont besoin d'un moyen de s'assurer que toutes les données d'un bloc nouvellement proposé sont facilement disponibles. Si les données ne sont pas disponibles, le bloc peut contenir des transactions malveillantes
qui sont cachées par le producteur de blocs. Même si le bloc contient des transactions non malveillantes,
les cacher pourrait compromettre la sécurité du système.

### L'approche d'Avail en matière de disponibilité des données {#avail-s-approach-to-data-availability}

#### Garantie élevée {#high-guarantee}

Avail fournit une garantie prouvable et de haut niveau que les données sont disponibles. Les clients légers peuvent vérifier de manière indépendante la disponibilité dans un nombre constant de requêtes, sans télécharger l'ensemble du bloc.

#### Confiance minimale {#minimum-trust}

Pas besoin d'être un validateur ou d'héberger un nœud complet. Même avec un client léger, obtenez une disponibilité vérifiable.

#### Facile à utiliser {#easy-to-use}

Construite à l'aide d'un Substrate modifié, la solution se concentre sur la facilité d'utilisation, que vous hébergiez une application ou
exploitiez une solution de mise à l'échelle hors chaîne.

#### Parfaite pour la mise à l'échelle hors chaîne {#perfect-for-off-chain-scaling}

Libérez tout le potentiel de mise à l'échelle de votre solution de mise à l'échelle hors chaîne en conservant les données chez nous et
en évitant toujours le problème de DA sur L1.

#### Indépendante de l'exécution {#execution-agnostic}

Les chaînes utilisant Avail peuvent implémenter n'importe quel type d'environnement d'exécution indépendamment de la logique d'application. Les transactions depuis n'importe quel environnement sont prises en charge: EVM, Wasm ou même de nouvelles machines virtuelles qui n'ont pas encore été construites. Avail est parfait pour expérimenter avec de nouvelles couches d'exécution.

#### Démarrage de la sécurité {#bootstrapping-security}

Avail permet de créer de nouvelles chaînes sans avoir à faire tourner un nouvel ensemble de validateurs, et à la place de celles Avail's Avail prend soin du séquencement de transactions, du consensus et de la disponibilité en échange de frais de transaction simples (gas).

#### Finalité rapidement démontrable à l'aide de NPoS {#fast-provable-finality-using-npos}

Finalité rapidement démontrable via une preuve d'enjeu nominée. Soutenu par les engagements KZG
et le codage d'effacement.

Commencez par consulter ce [billet](https://blog.polygon.technology/polygon-research-ethereum-scaling-with-rollups-8a2c221bf644/) de blog sur l'échelle Ethereum avec Rollups.

## Validiums alimentés par Avail {#avail-powered-validiums}

En raison de l'architecture des blockchains monolithiques (tels que Ethereum dans son état actuel), le fonctionnement de la blockchain est coûteux, entraînant des frais de transaction élevés. Les Rollups tentent d'extraire le fardeau de l'exécution en exécutant des transactions hors chaîne puis en affichant les résultats d'exécution et les données de transaction [généralement] compressées.

Les validiums sont la prochaine étape: au lieu de publier les données de transaction, elles sont maintenues disponibles hors chaîne, où une preuve/attestation n'est affichée que sur la couche de base. Il s'agit de loin de la solution la plus rentable parce que l'exécution et la disponibilité des données sont maintenues hors chaîne tout en permettant la vérification finale et le règlement sur la chaîne de couche 1.

Avail est une blockchain optimisée pour la disponibilité des données. Tout déploiement qui souhaite devenir validium peut passer pour publier des données de transaction vers Avail au lieu de la couche 1 et déployer un contrat de vérification qui, en plus de vérifier l'exécution correcte, vérifie également la disponibilité des données.

:::note Attestation

L'équipe Avail rendra cette vérification de disponibilité des données simple sur Ethereum en construisant un pont d'attestation pour poster les attestations de disponibilité des données directement vers Ethereum. Cela rendra le travail du contrat de vérification simple, puisque les attestations DA seront déjà en chaîne. Ce pont est actuellement en conception ; veuillez contacter l'équipe Avail pour plus d'informations ou pour rejoindre notre programme d'accès anticipé.

:::

## Voir aussi {#see-also}

* [Présentation d'Avail de Polygon – une couche de disponibilité de données évolutive robuste à usage général](https://polygontech.medium.com/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
* [Le problème de la disponibilité des données](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
