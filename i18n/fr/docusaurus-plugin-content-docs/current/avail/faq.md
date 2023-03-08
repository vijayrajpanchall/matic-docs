---
id: faq
title: FAQ
sidebar_label: FAQ
description: Foire aux questions à propos de Polygon Avail
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

# Questions fréquemment posées {#frequently-asked-questions}

:::tip

Si vous ne trouvez pas votre question sur cette page, veuillez soumettre votre question sur le **[<ins>serveur Polygon Avail Discord</ins>](https://discord.gg/jXbK2DDeNt)**.

:::

## Qu'est-ce qu'un client léger ? {#what-is-a-light-client}

Les clients légers permettent aux utilisateurs d'interagir avec un réseau blockchain sans avoir à synchroniser la blockchain complète tout en maintenant la décentralisation et la sécurité. Généralement, ils téléchargent les en-têtes blockchain, mais pas le contenu de chaque bloc. Les clients légers Avail (DA) vérifient en outre que les contenus de blocs sont disponibles en effectuant un échantillonnage de disponibilité des données, une technique où de petites sections aléatoires d'un bloc sont téléchargées.

## Qu'est-ce qu'un cas d'utilisation populaire d'un client léger ? {#what-is-a-popular-use-case-of-a-light-client}

Il existe de nombreux cas d'utilisation qui dépendent aujourd'hui d'un intermédiaire pour maintenir un nœud complet, de sorte que les utilisateurs finaux d'une blockchain ne communiquent pas directement avec la blockchain mais au lieu de place via l'intermédiaire. Jusqu'à présent, les clients légers n'ont pas été un remplacement approprié pour cette architecture parce qu'ils manquaient de données garanties de disponibilité des données. Avail résout ce problème, permettant ainsi à plus d'applications de participer directement sur le réseau blockchain sans intermédiaires. Bien qu'Avail prend en charge les nœuds complets, nous prévoyons que la plupart des applications n'auront pas besoin d'exécuter un, ou qu'il faudra exécuter moins cher.

## Qu'est-ce que l'échantillonnage de la disponibilité des données ? {#what-is-data-availability-sampling}

Faites appel à des clients légers, comme d'autres clients légers, téléchargez seulement les en-têtes de la blockchain. Cependant, ils effectuent des tests de disponibilité des données: une technique qui échantillonne aléatoirement de petites sections des données du bloc et vérifie qu'elles sont correctes. Lorsqu'ils sont combinés avec le codage d'effacement et les engagements polynômes Kate, les clients Avail sont en mesure de fournir des garanties de disponibilité solides (près de 100 % ) sans compter sur des preuves de fraude, et avec seulement un petit nombre constant de requêtes.

## Comment le codage d'effacement est-il utilisé pour augmenter les garanties de disponibilité des données ? {#how-is-erasure-coding-used-to-increase-data-availability-guarantees}

Le codage d'effacement est une technique qui code les données d'une manière qui diffuse les informations sur plusieurs « shards », de sorte que la perte d'un nombre de ces shards peut être tolérée. Autrement dit, les informations peuvent être reconstruites à partir des autres éclats. Appliqué à la blockchain, cela signifie que nous augmentons efficacement la taille de chaque bloc, mais nous empêchons un acteur malveillant de pouvoir cacher n'importe quelle partie d'un bloc jusqu'à la taille de l'éclat redondant.

Étant donné qu'un acteur malveillant doit cacher une grande partie du bloc pour tenter de cacher même une seule transaction, il est beaucoup plus probable que l'échantillonnage aléatoire attrape les grandes lacunes dans les données. Efficacement, le codage d'effacement rend la technique d'échantillonnage de disponibilité des données beaucoup plus puissante.

## Qu'est-ce que les engagements Kate ? {#what-are-kate-commitments}

Les engagements Kate, introduits par Aniket Kate, Gregory M. Zaverucha et Ian Goldberg en 2010, fournissent un
moyen de s'engager dans les polynômes d'une manière succincte. Récemment, les engagements polynomiaux ont été au premier plan,
étant principalement utilisés comme engagements dans des constructions sans connaissances préalables de type PLONK.

Dans notre construction, nous utilisons les engagements Kate pour les raisons suivantes :

- Nous pouvons ainsi nous engager sur des valeurs, de manière succincte, devant être conservées à l'intérieur de l'en-tête du bloc.
- De courtes ouvertures sont possibles afin d'aider un client léger à vérifier la disponibilité.
- La propriété de liaison cryptographique nous aide à éviter les preuves de fraude en la rendant infaisable sur le plan informatique
pour produire des engagements erronés.

À l'avenir, nous pourrions utiliser d'autres schémas d'engagement polynomiaux, si cela nous donne de meilleures limites ou garanties.

## Étant donné qu'Avail est utilisée par plusieurs applications, cela signifie-t-il que les chaînes doivent télécharger des transactions à partir d'autres chaînes ? {#since-avail-is-used-by-multiple-applications-does-that-mean-chains-have-to-download-transactions-from-other-chains}

Non. Les en-têtes Avail contiennent un index qui permet à une application donnée de déterminer et de télécharger uniquement les sections d'un bloc qui ont des données pour cette application. Ainsi, ils ne sont pas affectés par d'autres chaînes utilisant Avail en même temps ou par des tailles de bloc.

La seule exception est l'échantillonnage de la disponibilité des données. Afin de vérifier que les données sont disponibles (et en raison de la nature du codage d'effacement), les clients échantillonnent de petites parties du bloc au hasard, y compris des sections qui contiennent des données pour d'autres applications.
