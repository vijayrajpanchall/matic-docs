---
id: avail-system-overview
title: Aperçu du système
sidebar_label: System Overview
description: Apprenez-en plus sur l'architecture de la chaîne Avail
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

# Aperçu du système {#system-overview}

## Modularité {#modularity}

Actuellement, les architectures de blockchain monolithiques comme celles d'Ethereum ne peuvent pas gérer efficacement l'exécution, le règlement et la disponibilité des données.

Modularisation de l'exécution pour mettre à l'échelle des blockchains est ce que les modèles de chaîne centrés sur le rollup tentent. Cela peut fonctionner bien lorsque les couches de règlement et de disponibilité des données sont sur la même couche, ce qui est l'approche que les rollups Ethereum adoptent. Néanmoins, il y a des compromis nécessaires lors de la collaboration avec des rollups, car la construction de rollup peut être plus sûre selon la sécurité de la couche de disponibilité des données, mais serait intrinsèquement plus difficile à scale.

Cependant, un design granulaire crée différentes couches pour être des protocoles légers, comme les microservices. Ensuite, le réseau global devient une collection de protocoles légers couplés à faible couplé. Un exemple est une couche de disponibilité des données qui se spécialise uniquement dans la disponibilité des données. Polygon Avail est une blockchain deux couches basée sur Substrat pour la disponibilité des données.

:::info Durée d'exécution de Substrate

Bien qu'Avail soit basé sur la base de codes Substrats, il inclut des modifications à la structure de bloc qui l'empêchent d'interopérer avec d'autres réseaux Substrats. Avail met en place un réseau indépendant sans lien avec Polkadot ou Kusama.

:::

Avail fournit une garantie élevée de disponibilité des données à n'importe quel client léger, mais ne fait pas de garanties plus élevées aux clients légers sur DA que n'importe quel autre réseau. Avail se concentre sur la possibilité de prouver que les données de bloc sont disponibles sans télécharger l'ensemble du bloc en tirant parti des engagements polynômes Kate, du codage d'effacement et d'autres technologies pour permettre aux clients légers (qui téléchargent uniquement les _en-têtes_ de la chaîne) d'échantillonner efficacement et au hasard de petites quantités des données de bloc pour vérifier sa pleine disponibilité. Cependant, il existe des primitifs fondamentalement différents de ceux des systèmes DA basés sur des preuves de fraude, qui sont expliqués [ici](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/).

### Assurer la disponibilité des données {#providing-data-availability}

La garantie DA est quelque chose que le client détermine pour lui-même; elle n'a pas à faire confiance aux nœuds. À mesure que le nombre de clients légers augmente, ils échantillonnent collectivement l'ensemble du bloc (même si chaque client n'échantillonne qu'un petit pourcentage). Les clients légers forment éventuellement un réseau P2P entre eux; ainsi, après qu'un bloc a été échantillonné, il devient hautement disponible — c'est-à-dire, même si les nœuds descendaient (ou tentaient de censurer un bloc), les clients légers seraient en mesure de reconstruire le bloc en partageant les pièces entre eux.

### Activer le prochain ensemble de solutions {#enabling-the-next-set-of-solutions}

Avail prendra des rollups au niveau suivant, car les chaînes peuvent allouer leur composant de disponibilité des données à Avail. Avail fournit également une alternative pour démarrer n'importe quelle chaîne autonome, car les chaînes peuvent décharger leurs disponibilités de données. Il y a évidemment des compromis qui sont faits avec différentes approches de modularité, mais l'objectif général est de maintenir une sécurité élevée tout en étant capable de s'adapter.

Les coûts de transaction sont également réduits. Avail peut augmenter la taille du bloc avec un impact plus faible sur la charge de travail validateur qu'une chaîne monolithique. Lorsqu'une chaîne monolithique augmente la taille des blocs, les validateurs doivent faire beaucoup plus de travail parce que les blocs doivent s'exécuter et l'état doit être calculé. Étant donné qu'Avail n'a pas d'environnement d'exécution, il est beaucoup moins cher pour augmenter la taille du bloc. Le coût n'est pas nulle en raison de la nécessité de calculer les engagements KZG et de générer des preuves, mais toujours peu coûteux.

Avail rend également possible les rollups souverains. Les utilisateurs peuvent créer des chaînes souveraines qui comptent sur les validateurs Avail's pour parvenir à un consensus sur les données de transaction et les commandes. Les rollups souverains sur Avail permettent des mises à niveau transparentes, car les utilisateurs peuvent pousser des mises à jour vers des nœuds spécifiques à l'application pour mettre à niveau la chaîne et, à son tour, passer à la nouvelle logique de règlement. Alors que dans un environnement traditionnel, le réseau nécessite un fork.

:::info Avail ne dispose pas d'environnement d'exécution

Avail ne fonctionne pas de contrats intelligents, mais permet aux autres chaînes de rendre leurs données de transaction disponibles via Avail. Ces chaînes peuvent implémenter leurs environnements d'exécution de quelque nature que ce soit: EVM, Wasm ou tout autre chose.

:::

La disponibilité des données sur Avail est disponible pour une fenêtre de temps qu'elle est nécessaire. Par exemple, au-delà de la nécessité de données ou de reconstructions, la sécurité n'est pas compromise.

:::info Avail ne se soucie pas de l'utilité des données

Avail garantit que les données de bloc sont disponibles mais ne se soucie pas de ce qu'il s'agit. Les données peuvent être des transactions, mais peuvent prendre sur d'autres formulaires également.

:::

Les systèmes de stockage, d'autre part, sont conçus pour stocker des données pendant de longues périodes et comprennent des mécanismes d'incitation pour encourager les utilisateurs à stocker des données.

## Validation {#validation}

### Validation par les pairs {#peer-validation}

Trois types de pairs composent généralement un écosystème :

* **Nœuds validateurs:** un validateur recueille des transactions à partir du mempool, les exécute et génère un bloc candidat qui est annexé au réseau. Le bloc contient un petit en-tête de bloc avec le digest et les métadonnées des transactions dans le bloc.
* **Nœuds:** le bloc candidat se propage vers des nœuds complets sur tout le réseau pour être vérifié. Les nœuds ré-exécuteront les transactions contenues dans le bloc candidat.
* **Clients légers:** les clients légers récupèrent seulement l'en-tête de bloc pour utiliser pour la vérification et récupéreront les détails de transaction à partir de nœuds complets voisins au besoin.

Bien qu'une approche sécurisée, Avail aborde les limitations de cette architecture pour créer de la robustesse et des garanties accrues. Les clients légers peuvent être trompés dans l'acceptation de blocs dont les données sous-jacentes n'est pas disponibles. Un producteur de blocs peut inclure une transaction malveillante dans un bloc et ne pas révéler tout son contenu au réseau. Comme mentionné dans les docs Avail, cela est connu sous le nom de problème de disponibilité des données.

Les pairs du réseau Avail incluent :

* **Nœuds validateurs:** le protocole incentive les nœuds complets qui participent au consensus. Les nœuds validateurs sur Avail n'exécutent pas de transactions. Ils emballent des transactions arbitraires et construisent des blocs candidats, générant des engagements KZG pour les **données. D'autres validateurs vérifient que les blocs générés sont corrects**.

* **Nœuds complets (DA):** les nœuds qui téléchargent et rendent disponibles toutes les données de bloc pour toutes les applications utilisant Avail. De même, les nœuds complets d'Avail n'exécutent pas de transactions.

* Clients **légers Avail (DA):** les clients qui téléchargent uniquement des en-têtes de bloc échantillonnent aléatoirement de petites parties du bloc pour vérifier la disponibilité. Ils exposent une API locale pour interagir avec le réseau Avail.

:::info L'objectif d'Avail n'est pas de dépendre des nœuds complets pour garder les données disponibles

L'objectif est de donner des garanties DA similaires à un client léger comme un nœud complet. Les utilisateurs sont encouragés à utiliser les clients légers d'Avail.
Cependant, ils peuvent toujours exécuter des nœuds complets Avail, qui sont bien pris en charge.

:::

:::caution L'API locale est un WIP et n'est pas encore stable


:::

Cela permet aux applications qui veulent utiliser Avail pour intégrer le client léger DA. Elles peuvent alors créer :

* **Nœuds complets**
  - Intégrer un client léger d'Avail (DA)
  - Télécharger toutes les données pour un appID spécifique
  - Implémenter un environnement d'exécution pour exécuter des transactions
  - Maintenir l'état de l'application

* **Clients légers d'applications**
  - Intégrer un client léger d'Avail (DA)
  - Implémenter des fonctionnalités destinées à l'utilisateur final

L'écosystème Avail sera également doté de ponts pour activer des cas d'utilisation spécifiques. Un pont de ce type étant conçu pour le moment est un _pont_ d'attestation qui affichera des attestations de données disponibles sur Avail vers Ethereum, permettant ainsi la création de validium.

## Vérification de l'état {#state-verification}

### Vérification de bloc → Vérification DA {#da-verification}

#### Validateurs {#validators}

Au lieu de validateurs Avail vérifiant l'état de l'application, ils se concentrent sur la disponibilité des données de transaction publiées et la fourniture de commandes de transactions. Un bloc est considéré comme valide uniquement si les données derrière ce bloc sont disponibles.

Les validateurs Avail prennent les transactions entrantes, les commandent, construisent un bloc candidat et proposent au réseau. Le bloc contient des fonctionnalités spéciales, en particulier pour le codage DA—erasure et les engagements KZG. Ceci est dans un format particulier, pour que les clients puissent effectuer des échantillonnages aléatoires et télécharger uniquement les transactions d'une seule application.

D'autres validateurs vérifient le bloc en s'assurant que le bloc est bien formé, les engagements KZG
sont vérifiés, les données sont présentes, etc.

#### Clients {#clients}

Exiger que les données soient disponibles empêche les producteurs de blocs de libérer des en-têtes de blocs sans libérer les données derrière eux, car cela empêche les clients de lire les transactions nécessaires pour calculer l'état de leurs applications. Comme pour d'autres chaînes, Avail utilise la vérification de disponibilité des données pour résoudre cela via des vérifications DA qui utilisent des codes d'effacement ; ces vérifications sont fortement utilisées dans la conception de redondance des données.

Les codes d'effacement dupliquent efficacement les données de sorte que si une partie d'un bloc est supprimée, les clients peuvent reconstruire cette partie en utilisant une autre partie du bloc. Cela signifie qu'un nœud essayant de cacher cette partie devrait en cacher beaucoup plus.

> Cette technique est utilisée dans des périphériques tels que les CD-ROM et les baies multidisques (RAID) (par exemple,
> si un disque dur s'abîme, il peut être remplacé et reconstruit à partir des données sur d'autres disques).

Ce qui est unique dans Avail, c'est que la conception de la chaîne permet à **quiconque** de vérifier DA sans avoir à télécharger les données. Les contrôles DA exigent que chaque client léger échantillonne un nombre minimal de morceaux aléatoires à partir de chaque bloc de la chaîne. Un ensemble de clients légers peut échantillonner collectivement toute la blockchain de cette manière. Par conséquent, plus les nœuds non consensus y sont importants, plus la taille du bloc (et le débit) peut exister en toute sécurité. Cela signifie que les nœuds non consensus peuvent contribuer au débit et à la sécurité du réseau.

### Règlement des transactions {#transaction-settlement}

Avail utilisera une couche de règlement construite avec Polygon Edge. La couche de règlement fournit une blockchain compatible EVM pour les rollups pour stocker leurs données et effectuer une résolution de conflits. La couche de règlement utilise Polygon Avail pour son DA. Lorsque les rollups utilisent une couche de règlement, ils héritent également de toutes les propriétés DA de Avail.

:::note Différentes façons d'effectuer un règlement

Il existe différentes façons d'utiliser Disponibles, et les validiums n'utiliseront pas la couche de règlement, mais s'installeront plutôt sur Ethereum.

:::

Avail propose l'hébergement et les commandes de données. La couche d'exécution proviendra probablement de multiples solutions d'échelle hors-chaîne ou de couches d'exécution héritées. La couche de règlement prend sur le volet vérification et résolution des différends.

## Ressources {#resources}

- [Introduction à Avail par Polygon](https://medium.com/the-polygon-blog/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048).
- [Discussions sur Polygon : Polygon Avail](https://www.youtube.com/watch?v=okqMT1v3xi0)
