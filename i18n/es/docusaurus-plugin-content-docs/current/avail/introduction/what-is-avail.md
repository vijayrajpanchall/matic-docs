---
id: what-is-avail
title: Avail de Polygon
sidebar_label: Introduction
description: Conoce la cadena de disponibilidad de datos de Polygon
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

Avail es una cadena de bloques que se centra en la disponibilidad de datos de los láser: hacer pedidos y registrar transacciones de la cadena de bloques y hacer posible probar que los datos de los bloques están disponibles sin descargar todo el bloque. Esto le permite ampliar de manera que las cadenas de bloques monolíticas no pueden.

:::info Una robusta capa de disponibilidad de datos escalable de propósito general

* Permite que las soluciones de Layer-2 ofrezcan un mayor rendimiento de escalabilidad mediante el aprovechamiento de Avail para construir Validiums con disponibilidad de datos fuera de la cadena.

* Permite a las cadenas autónomas o cadenas de distribución con entornos de ejecución arbitrarios para iniciar la seguridad del validador sin tener que crear y administrar su propio conjunto de validadores garantizando la disponibilidad de datos de transacción.

:::

## Retos actuales de disponibilidad y escalado {#current-availability-and-scaling-challenges}

### ¿Cuál es el problema de la disponibilidad de los datos? {#what-is-the-data-availability-problem}

Los pares de una red de cadena de bloques necesitan una forma de garantizar que todos los datos de un bloque recién propuesto
estén disponibles. Si los datos no están disponibles, el bloque podría contener transacciones maliciosas
que están ocultas por parte del productor de bloques. Incluso si el bloque contiene transacciones no maliciosas,
ocultarlas podría comprometer la seguridad del sistema.

### Enfoque de Avail sobre la disponibilidad de los datos {#avail-s-approach-to-data-availability}

#### Alta garantía {#high-guarantee}

Avail proporciona una garantía de alto nivel y probable de que los datos están disponibles. Los clientes de la luz pueden verificar de forma independiente la disponibilidad en un número constante de consultas sin descargar todo el bloque.

#### Confianza mínima {#minimum-trust}

No es necesario ser un validador ni alojar un nodo completo. Incluso con un cliente ligero, obtén disponibilidad verificable.

#### Fácil de usar {#easy-to-use}

Desarrollada con Substrate modificado, la solución se centra en la facilidad de uso, tanto si aloja una aplicación como
si opera una solución de escalado fuera de la cadena.

#### Perfecto para el escalado fuera de la cadena {#perfect-for-off-chain-scaling}

Desbloquea todo el potencial de escalado de tu solución de escalado fuera de la cadena al mantener los datos con nosotros y
seguir evitando el problema de la DA (disponiblidad de datos) en L1.

#### Ejecución agnóstica {#execution-agnostic}

Las cadenas que utilizan Avail pueden implementar cualquier tipo de entorno de ejecución independientemente de la lógica de la aplicación. Las transacciones desde cualquier entorno son compatibles: EVM, Wasm o incluso nuevas máquinas virtuales que aún no se han construido. Avail es perfecto para experimentar con nuevas capas de ejecución.

#### Seguridad de Bootstrapping {#bootstrapping-security}

Avail permite crear nuevas cadenas sin tener que girar un nuevo conjunto de validadores y aprovechar la de  en su lugar. Avail se encarga de la secuencia de transacciones, el consenso y la disponibilidad a cambio de tarifas simples de transacción (gas).

#### Finalidad rápidamente demostrable mediante NPoS {#fast-provable-finality-using-npos}

Finalidad rápidamente demostrable mediante prueba de participación nominada. Respaldado por compromisos KZG
y codificación de borrado.

Comienza por esta [entrada](https://blog.polygon.technology/polygon-research-ethereum-scaling-with-rollups-8a2c221bf644/) del blog en la escala de Ethereum con Rollups.

## Validiums con tecnología Avail {#avail-powered-validiums}

Debido a la arquitectura de las cadenas de bloques monolíticas (como Ethereum en su estado actual), operar la cadena de bloques es costoso, lo que resulta en altas tarifas de transacción. Las sesiones de ejecución intentan extraer la carga de la ejecución ejecutando transacciones fuera de la cadena y luego publicar los resultados de la ejecución y los datos [de] la transacción generalmente comprimidos.

Los Validiums son el siguiente paso: en lugar de publicar los datos de la transacción, se mantiene disponible fuera de la cadena, donde una prueba o certificación solo se publica en la capa base. Esta es la solución más rentable porque tanto la ejecución como la disponibilidad de datos se mantienen fuera de la cadena mientras que permite la verificación y el asentamiento finales en la cadena de la capa 1.

Avail es una cadena de bloques optimizada para la disponibilidad de datos. Cualquier rollup que desee convertirse en un validium puede cambiar a datos de la transacción a Avail en lugar de la capa 1 e implementar un contrato de verificación que, además de verificar la correcta ejecución, también verifica la disponibilidad de datos.

:::note Certificación

El equipo de Avail hará que esta verificación de disponibilidad de datos sea simple en Ethereum mediante la construcción de un puente de certificación para publicar las certificaciones de disponibilidad de datos directamente en Ethereum. Esto hará que el trabajo del contrato de verificación sea simple, ya que las certificaciones de la DA ya estarán en cadena. Este puente está actualmente en diseño; comunícate con el equipo de Avail para obtener más información o unirse a nuestro programa de acceso anticipado.

:::

## Ver también {#see-also}

* [Presentación de Avail de Polygon: una robusta capa de disponibilidad de datos escalable de propósito general](https://polygontech.medium.com/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
* [El problema de la disponibilidad de datos](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
