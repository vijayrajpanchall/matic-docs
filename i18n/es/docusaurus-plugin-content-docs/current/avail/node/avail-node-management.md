---
id: avail-node-management
title: Ejecutar un nodo de Avail
sidebar_label: Run an Avail node
description: "Aprende a ejecutar un nodo de Avail."
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

:::tip Práctica común

A menudo, los usuarios ejecutan nodos en un servidor de nube. Tal vez quieras usar un proveedor de VPS para ejecutar tu nodo.

:::

## Prerrequisitos {#prerequisites}

La siguiente lista de hardware estándar es una recomendación de especificaciones de hardware que tu entorno debería
tener.

Las especificaciones de hardware al menos deberían tener:

* 4 GB de RAM
* CPU de 2 núcleos
* SSD de 20 a 40 GB

:::caution Si planeas ejecutar un validador

Las recomendaciones de hardware para ejecutar un validador en una cadena basada en Substrate:

* CPU: CPU Intel(R) Core(TM) i7-7700K a 4,20 GHz
* Almacenamiento: una unidad de estado sólido de NVMe con alrededor de 256 GB Debería ser razonablemente dimensionado para lidiar
con el crecimiento de las cadenas de bloques.
* Memoria: ECC de 64 GB

:::

### Prerrequisitos del nodo: instalar Rust y dependencias {#node-prerequisites-install-rust-dependencies}

:::info Pasos de instalación por Substrate

Avail es una cadena basada en Substrate que requiere la misma configuración para ejecutar una cadena de Substrate.

Hay documentación de instalación adicional disponible en la
**[documentación para comenzar](https://docs.substrate.io/v3/getting-started/installation/)** de Substrate.

:::

Una vez que elijas un entorno para ejecutar tu nodo, asegúrate de que Rust esté instalado.
Si ya tienes Rust instalado, ejecuta el siguiente comando para asegurarte de tener la versión más reciente.

```sh
rustup update
```

Si no la tienes, ejecuta el siguiente comando para obtener la versión más reciente de Rust:

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

Para configurar tu coraza, ejecuta:

```sh
source $HOME/.cargo/env
```

Verifica tu instalación con:

```sh
rustc --version
```

## Ejecuta Avail localmente {#run-avail-locally}

Clona el [código fuente de Avail](https://github.com/maticnetwork/avail):

```sh
git clone git@github.com:maticnetwork/avail.git
```

Compila el código fuente:

```sh
cargo build --release
```

:::caution Este proceso suele llevar tiempo.

:::

Ejecuta un nodo de desarrollo local con un historial de datos temporal:

```sh
./target/release/data-avail --dev --tmp
```
