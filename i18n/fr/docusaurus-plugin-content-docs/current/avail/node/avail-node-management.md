---
id: avail-node-management
title: Exécuter un nœud Avail
sidebar_label: Run an Avail node
description: "En savoir plus sur l'exécution d'un nœud Avail."
keywords:
  - docs
  - polygon
  - avail
  - node
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: avail-node-management
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip Pratique courante

Les utilisateurs exécutent souvent des nœuds sur un serveur cloud. Vous pouvez envisager d'utiliser un fournisseur VPS pour exécuter votre nœud.

:::

## Prérequis {#prerequisites}

La liste suivante de matériel standard est une recommandation de spécifications matérielles que votre environnement devrait
avoir.

Les spécifications matérielles minimales sont les suivantes:

* 4 Go de RAM
* 2 cœurs CPU
* SSD de 20 à 40 Go

:::caution Si vous envisagez d'exécuter un validateur

Les recommandations matérielles pour l'exécution d'un validateur sur une chaîne basée sur Substrate sont les suivantes :

* CPU - Intel(R) Core(TM) i7-7700K CPU @ 4,20 GHz
* Stockage - Un disque SSD NVMe avec environ 256 Go. Doit être raisonnablement dimensionné pour faire face à
la croissance de la blockchain.
* Mémoire - 64 Go ECC

:::

### Prérequis du nœud : installer Rust et les dépendances {#node-prerequisites-install-rust-dependencies}

:::info Étapes d'installation par Substrate

Avail est une chaîne basée sur Substrate qui nécessite la même configuration pour exécuter une chaîne Substrate.

Une documentation d'installation supplémentaire est disponible dans la
**[documentation de démarrage](https://docs.substrate.io/v3/getting-started/installation/)** de Substrate.

:::

Une fois que vous avez choisi un environnement pour exécuter votre nœud, assurez-vous que Rust est installé.
Si vous avez déjà installé Rust, exécutez la commande suivante pour vous assurer que vous utilisez la dernière version.

```sh
rustup update
```

Sinon, lancez la commande suivante pour récupérer la dernière version de Rust :

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

Pour configurer votre interface système, exécutez :

```sh
source $HOME/.cargo/env
```

Vérifiez votre installation avec :

```sh
rustc --version
```

## Exécutez Avail localement {#run-avail-locally}

Clonez le [code source Avail](https://github.com/maticnetwork/avail) :

```sh
git clone git@github.com:maticnetwork/avail.git
```

Compilez le code source :

```sh
cargo build --release
```

:::caution Ce processus prend généralement du temps

:::

Exécutez un nœud de développement local avec une banque de données temporaire :

```sh
./target/release/data-avail --dev --tmp
```
