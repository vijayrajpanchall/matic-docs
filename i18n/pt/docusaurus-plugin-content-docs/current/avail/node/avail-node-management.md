---
id: avail-node-management
title: Execute um nó da Avail
sidebar_label: Run an Avail node
description: "Aprenda sobre executar um nó da Avail."
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

:::tip Prática comum

Os utilizadores frequentemente executam nós em um servidor na nuvem. Pode considerar usar um provedor de VPS para executar o seu nó.

:::

## Pré-requisitos {#prerequisites}

A seguinte lista de hardware padrão é uma recomendação de especificações de hardware que o seu ambiente deve
ter.

As especificações de hardware devem, pelo menos, ter:

* RAM de 4 GB
* CPU de dois núcleos
* SSD de 20-40 GB

:::caution Se planeja executar um validador

As recomendações de hardware para executar um validador em uma chain baseada em Substrato:

* CPU - Intel(R) Core(TM) i7-7700K CPU @ 4,20 GHz
* Armazenamento - A NVMe, um drive de estado sólido com cerca de 256 GB. Deve ser razoavelmente dimensionado para lidar com
o crescimento da blockchain.
* Memória - 64 GB ECC

:::

### Pré-requisitos de nó: instalar Rust e dependências {#node-prerequisites-install-rust-dependencies}

:::info Etapas de instalação por Substrato

A Avail é uma chain baseada em Substrato e requer a mesma configuração para executar uma chain de Substrato.

Documentação de instalação adicional está disponível no Substrato
**[documentação de introdução](https://docs.substrate.io/v3/getting-started/installation/)**.

:::

Uma vez que escolha um ambiente para executar seu nó, certifique-se que o Rust está instalado.
Caso já tenha o Rust instalado, execute o seguinte comando para certificar-se de que está usando a versão mais recente.

```sh
rustup update
```

Caso contrário, comece executando o seguinte comando para obter a última versão do Rust:

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

Para configurar o seu shell, execute:

```sh
source $HOME/.cargo/env
```

Verifique a sua instalação com:

```sh
rustc --version
```

## Execute a Avail localmente {#run-avail-locally}

Clone o [código-fonte da Avail](https://github.com/maticnetwork/avail):

```sh
git clone git@github.com:maticnetwork/avail.git
```

Compile o código-fonte:

```sh
cargo build --release
```

:::caution Este processo geralmente leva tempo

:::

Execute um nó dev local com datastore temporário:

```sh
./target/release/data-avail --dev --tmp
```
