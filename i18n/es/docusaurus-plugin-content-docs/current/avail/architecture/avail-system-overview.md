---
id: avail-system-overview
title: Descripción general del sistema
sidebar_label: System Overview
description: Conoce la arquitectura de la cadena Avail
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

# Descripción general del sistema {#system-overview}

## Modularidad {#modularity}

Actualmente, las arquitecturas monolíticas de la cadena de bloques como la de Ethereum no pueden manejar eficientemente la ejecución, el asentamiento y la disponibilidad de datos.

Modularizar la ejecución para escalar las cadenas de bloques es lo que los modelos de cadena centrados en la plataforma intentan hacer. Esto puede funcionar bien cuando las capas de disponibilidad de datos y asentamiento se encuentran en la misma capa, que es el enfoque de la adopción de los rollups . Aún así, hay las compensaciones necesarias cuando se trabaja con rollups, ya que la construcción de rodillos puede ser más segura dependiendo de la seguridad de la capa de disponibilidad de datos, pero sería inherentemente más difícil escalar.

Sin embargo, un diseño granular crea diferentes capas para ser protocolos ligeros, como los microservicios. Luego, la red general se convierte en una colección de protocolos ligeros que se acoplan libremente. Un ejemplo es una capa de disponibilidad de datos que solo se especializa en la disponibilidad de datos. Polygon Avail es una capa dos de la cadena de bloques basada en sustratos para la disponibilidad de datos.

:::info Tiempo de ejecución de Substrate

Aunque Avail se basa en la base de códigos de Sustrato, incluye modificaciones a la estructura de bloques que impiden que se interponga con otras redes de Sustrato. Avail implementa una red independiente sin relación con Polkadot o Kusama.

:::

Avail ofrece una alta garantía de disponibilidad de datos a cualquier cliente ligero, pero no hace mayores garantías para iluminar a los clientes sobre DA que cualquier otra red. Avail se centra en hacer posible que los datos de los bloques estén disponibles sin descargar todo el bloque mediante el aprovechamiento de los compromisos polinomiales de Kate, la codificación de borrado y otras tecnologías para permitir que los clientes de la luz (que descargan solo las _cabezas_ de la cadena) prueben de manera eficiente y aleatoria pequeñas cantidades de los datos de los bloques para verificar su disponibilidad completa. Sin embargo, hay fundamentalmente diferentes primitivas que los sistemas de DA a prueba de fraude que se explican [aquí](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/).

### Proporcionar disponibilidad de datos {#providing-data-availability}

La garantía DA es algo que un cliente determina por sí mismo; no tiene que confiar en los nodos. A medida que el número de clientes ligeros crece, colectivamente muestran todo el bloque (a pesar de que cada cliente solo muestra un pequeño porcentaje). Los clientes ligeros eventualmente forman una red P2P entre ellos ; de esta manera, después de que un bloque se haya muestreado, se vuelve altamente disponible; es decir, incluso si los nodos se bajaran (o trataran de censurar un bloque), los clientes ligeros serían capaces de reconstruir el bloque compartiendo las piezas entre ellos.

### Habilitación del siguiente conjunto de soluciones {#enabling-the-next-set-of-solutions}

Avail llevará los rodillos al siguiente nivel, ya que las cadenas pueden asignar su componente de disponibilidad de datos a Disponi. Avail también ofrece una forma alternativa de iniciar cualquier cadena independiente, ya que las cadenas pueden descargar su disponibilidad de datos. Hay, por supuesto, las compensaciones que se hacen con diferentes enfoques de modularidad, pero el objetivo general es mantener una alta seguridad mientras es capaz de escalar.

También se reducen los costes de las transacciones. Avail puede hacer crecer el tamaño de los bloques con un impacto menor en la carga de trabajo del validador que una cadena monolítica. Cuando una cadena monolítica aumenta el tamaño de los bloques, los validadores deben hacer mucho más trabajo porque los bloques tienen que ejecutarse y el estado debe ser calculado. Dado que Avail no tiene ningún entorno de ejecución, es mucho más barato aumentar el tamaño del bloque. El costo no es cero debido a la necesidad de calcular los compromisos KZG y generar pruebas, pero todavía económica.

Avail también hace posible los rollups soberanos. Los usuarios pueden crear cadenas soberanas que se basan en los validadores de Avail, para llegar a un consenso sobre los datos de las transacciones y el pedido. Los rollups soberanos en Avail permiten realizar actualizaciones sin problemas, ya que los usuarios pueden impulsar actualizaciones a nodos específicos de la aplicación para actualizar la cadena y, a su vez, actualizar a la nueva lógica de asentamiento. Mientras que, en un entorno tradicional, la red requiere una bifurcación.

:::info Avail no tiene un entorno de ejecución

Avail no ejecuta contratos inteligentes, sino que permite que otras cadenas hagan que sus datos de transacción estén disponibles a través de . Estas cadenas pueden implementar sus entornos de ejecución de cualquier tipo: EVM, Wasm o cualquier otra cosa.

:::

La disponibilidad de datos en Avail está disponible durante una ventana de tiempo que se requiere. Por ejemplo, más allá de necesitar datos o reconstrucción, la seguridad no se ve comprometida.

:::info Avail no se preocupa por el fin de los datos

Avail garantiza que los datos de bloque están disponibles pero no se preocupa por lo que esos datos son. Los datos pueden ser transacciones pero también pueden tomar otras formas.

:::

Los sistemas de almacenamiento, por otro lado, están diseñados para almacenar datos durante largos periodos e incluyen mecanismos de incentivación para animar a los usuarios a almacenar datos.

## Validación {#validation}

### Validación de pares {#peer-validation}

Tres tipos de pares suelen componer un ecosistema:

* **nodos de validador:** un validador recopila las transacciones del mempool, las ejecuta y genera un bloque de candidatos que se adjunta a la red. El bloque contiene un encabezado de bloque pequeño con el digest y los metadatos de las transacciones en el bloque.
* **Nodos completos:** el bloque de candidatos se propaga a nodos completos en toda la red para su verificación. Los nodos reejecutarán las transacciones contenidas en el bloque candidato.
* **Clientes ligeros:** los clientes ligeros solo obtienen el encabezado de bloques para utilizar para la verificación y recogerán los detalles de la transacción de los nodos completos vecinos según sea necesario.

Mientras que un enfoque seguro, Avail aborda las limitaciones de esta arquitectura para crear robustez y mayores garantías. Los clientes ligeros pueden ser engañados para que acepte bloques cuyos datos subyacentes no están disponibles. Un productor de bloques puede incluir una transacción maliciosa en un bloque y no revelar todo su contenido a la red. Como se mencionó en los documentos de Avail, esto se conoce como el problema de disponibilidad de datos.

Los pares de la red de Avail incluyen:

* **nodos de validador:** Protocolo incentivó a los nodos completos que participan en el consenso. Los nodos de validador en Avail no ejecutan transacciones. Empaquetan las transacciones arbitrarias y construyen bloques de candidatos, generando compromisos KZG para los **datos. Otros validadores comprueban que los bloques generados son correctos**.

* Nodos **completos (DA):** nodos que descargar y poner a disposición todos los datos de bloque para todas las aplicaciones utilizando . Asimismo, los nodos completos de Avail no ejecutan transacciones.

* **Clientes de luz Avail (DA):** clientes que solo descargan encabezados de bloque sample aleatoriamente partes pequeñas del bloque para verificar la disponibilidad. Exponen una API local para interactuar con la red .

:::info El objetivo de Avail es no depender de los nodos completos para mantener los datos disponibles.

El objetivo es dar garantías similares a un cliente ligero como nodo completo. Se anima a los usuarios a utilizar los clientes ligeros de Avail. Sin embargo, todavía pueden ejecutar los nodos completos de Avail, que son bien soportados.

:::

:::caution La API local es un trabajo en proceso y todavía no es estable.


:::

Esto permite a las aplicaciones que quieren utilizar Avail para integrar el cliente de luz DA. Pueden entonces construir:

* **Nodos completos de la aplicación**
  - Incorporar un cliente ligero de Avail (DA)
  - Descargar todos los datos de una ID de aplicación específica
  - Implementar un entorno de ejecución para realizar transacciones
  - Mantener el estado de la aplicación

* **Clientes de la luz de la aplicación**
  - Incorporar un cliente ligero de Avail (DA)
  - Implementar la funcionalidad orientada al usuario final

El ecosistema Avail también contará con puentes para habilitar casos de uso específicos. Uno de esos puente que se está diseñando en este momento es un _puente_ de certificación que publicará las certificaciones de datos disponibles en Avail to Ethereum, permitiendo así la creación de validiums.

## Verificación de estado {#state-verification}

### Verificación de bloques → {#da-verification}

#### Validadores {#validators}

En lugar de validadores de Avail que verifiquen el estado de la aplicación, se concentran en garantizar la disponibilidad de los datos de la transacción publicados y proporcionar el pedido de la transacción. Un bloque se considera válido solo si los datos que hay detrás de ese bloque están disponibles.

Aprovecha a los validadores las transacciones entrantes, ordena, construye un bloque de candidatos y proponemos a la red. El bloque contiene características especiales, especialmente para la codificación de la borrado y los compromisos KZG. Este es en un formato particular, para que los clientes puedan hacer muestras aleatorias y descargar solo las transacciones de una sola aplicación.

Otros validadores verifican el bloque asegurándose de que está bien formado, de que los compromisos KZG
se cumplen, de que los datos están ahí, etc.

#### Clientes {#clients}

La exigencia de datos para estar disponibles evita que los productores de bloques liberen encabezados de bloque sin liberar los datos detrás de ellos, ya que esto impide que los clientes lean las transacciones necesarias para calcular el estado de sus aplicaciones. Al igual que con otras cadenas, Avail utiliza la verificación de la disponibilidad de datos para abordar esto a través de controles de DA que utilizan códigos de borrado y estas verificaciones se utilizan en gran medida en el diseño de la redundancia de datos.

Los códigos de borrado duplican eficazmente los datos de modo que si parte de un bloque se suprime, los clientes pueden reconstruir esa parte utilizando otra parte del bloque. Esto significa que un nodo que intente ocultar esa parte tendría que ocultar mucho más.

> Esta técnica se utiliza en dispositivos como los CD-ROM y las matrices multidisco (RAID) (por ejemplo,
> si un disco duro se daña, puede ser sustituido y reconstruido a partir de los datos de otros discos).

Lo que es único en Avail es que el diseño de la cadena permite **a cualquiera** verificar la DA sin necesidad de descargar los datos. Las verificaciones de la DA requieren que cada cliente de luz muestre un número mínimo de trozos aleatorios de cada bloque de la cadena. Un conjunto de clientes de la luz pueden probar colectivamente toda la cadena de bloques de esta manera. En consecuencia, cuanto más nodos no consenso hay, mayor será el tamaño de bloque (y rendimiento) puede existir de forma segura. Es decir, los nodos no consensuados pueden contribuir a la producción y seguridad de la red.

### Liquidación de transacciones {#transaction-settlement}

Avail utilizará una capa de liquidación desarrollada con Polygon Edge. La capa de asentamiento proporciona una cadena de bloques compatible con EVM para que los rollups almacenen sus datos y realicen la resolución de conflictos. La capa de asentamiento utiliza  para su DA. Cuando los rodillos están utilizando una capa de asentamiento, también heredan todas las propiedades de DA de .

:::note Diferentes maneras de liquidar

Existen diferentes formas de utilizar  y los validiums no utilizarán la capa de asentamiento, sino que se conformarán en Ethereum.

:::

Avail ofrece el alojamiento de datos y la ordenación. La capa de ejecución probablemente procederá de múltiples soluciones de escalado fuera de la cadena o capas de ejecución heredadas. La capa de liquidación se ocupa del componente de verificación y resolución de conflictos.

## Recursos {#resources}

- [Introducción a Avail por Polygon](https://medium.com/the-polygon-blog/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048).
- [Charlas de Polygon: Polygon Avail](https://www.youtube.com/watch?v=okqMT1v3xi0)
