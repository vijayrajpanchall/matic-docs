---
id: faq
title: Preguntas frecuentes
sidebar_label: FAQ
description: Preguntas frecuentes acerca de Polygon Avail
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

# Preguntas frecuentes {#frequently-asked-questions}

:::tip

Si no encuentra su pregunta en esta página, por favor, envíe su pregunta en el **[<ins>servidor de Discord de  </ins>](https://discord.gg/jXbK2DDeNt)**.

:::

## ¿Qué es un cliente ligero? {#what-is-a-light-client}

Los clientes de la luz permiten a los usuarios interactuar con una red de la cadena de bloques sin tener que sincronizar la cadena de bloques completa mientras se mantiene la descentralización y la seguridad. En general, descargan los encabezados de la cadena de bloques, pero no el contenido de cada bloque. Los clientes de la luz de Avail (DA) también verifican que el contenido de los bloques está disponible realizando el muestreo de disponibilidad de datos, una técnica donde se descargan pequeñas secciones aleatorias de un bloque.

## ¿Cuál es un caso de uso popular de un cliente ligero? {#what-is-a-popular-use-case-of-a-light-client}

Hay muchos casos de uso que hoy en día se basan en un intermediario para mantener un nodo completo, de modo que los usuarios finales de una cadena de bloques no se comuniquen directamente con la cadena de bloques sino a través del intermediario. Los clientes ligeros no han sido hasta ahora un reemplazo adecuado para esta arquitectura porque no tenían datos garantías de disponibilidad de datos. Avail resuelve este problema, permitiendo así que más aplicaciones participen directamente en la red de la cadena de bloques sin intermediarios. Aunque Avail sí es compatible con nodos completos, esperamos que la mayoría de las aplicaciones no tendrán que ejecutar una o tendremos que ejecutar menos.

## ¿Qué es el muestreo de la disponibilidad de datos? {#what-is-data-availability-sampling}

Aprovecha a clientes ligeros, como otros clientes ligeros, solo descarga los encabezados de la cadena de bloques. Sin embargo, realizan el muestreo de disponibilidad de datos: una técnica que muestra aleatoriamente pequeñas secciones de los datos de bloque y verifica que son correctas. Cuando se combina con la codificación de borrado y los compromisos polinomios de Kate, los clientes de Avail son capaces de proporcionar garantías fuertes (casi el 100%) de disponibilidad sin depender de pruebas de fraude y con solo un pequeño número constante de consultas.

## ¿Cómo se utiliza la codificación de borrado para incrementar las garantías de disponibilidad de datos? {#how-is-erasure-coding-used-to-increase-data-availability-guarantees}

La codificación de la borra es una técnica que codifica los datos de una manera que extiende la información a través de múltiples "shards", de manera que la pérdida de algún número de esos shards se pueda tolerar. Es decir, la información puede ser reconstruida desde los otros fragmentos. Aplicado a la cadena de bloques, esto significa que efectivamente aumentamos el tamaño de cada bloque, pero evitamos que un actor malicioso pueda ocultar cualquier parte de un bloque hasta el tamaño redundante de la fragmenta.

Dado que un actor malicioso necesita ocultar una gran parte del bloque para intentar ocultar incluso una sola transacción, hace que sea mucho más probable que el muestreo aleatorio atraiga las grandes brechas en los datos. Efectivamente, la codificación de borrado hace que la técnica de muestreo de disponibilidad de datos sea mucho más poderosa.

## ¿Qué son los compromisos de Kate? {#what-are-kate-commitments}

Los compromisos de Kate, introducidos por Aniket Kate, Gregory M. Zaverucha e Ian Goldberg en 2010, proporcionan una
manera de comprometerse con los polinomios de forma sucinta. Recientemente, los compromisos con los polinomios llegaron a la vanguardia;
se utilizaban, principalmente, como compromisos en construcciones de conocimiento cero, como PLONK.

En nuestra construcción, utilizamos los compromisos de Kate por las siguientes razones:

- Nos permiten comprometernos, de manera sucinta, con que los valores se mantengan dentro del encabezado del bloque.
- Las aberturas cortas son posibles, lo que ayuda a un cliente ligero a verificar la disponibilidad.
- La propiedad vinculante de la criptografía nos ayuda a evitar pruebas de fraude al hacer computacionalmente infactible
que produzcan compromisos erróneos.

En el futuro, podríamos usar otros esquemas de compromiso con los polinomios, si eso nos da mejores vínculos o garantías.

## Ya que múltiples aplicaciones utilizan Avail, ¿eso significa que las cadenas tienen que descargar transacciones de otras cadenas? {#since-avail-is-used-by-multiple-applications-does-that-mean-chains-have-to-download-transactions-from-other-chains}

No. Los encabezados de Avail contienen un índice que permite que una aplicación determinada determine y descargar solo las secciones de un bloque que tienen datos para esa aplicación. Por lo tanto, en gran parte no se ven afectados por otras cadenas que utilizan Avail al mismo tiempo o por tamaños de bloques.

La única excepción es el muestreo de disponibilidad de datos. Para verificar que los datos están disponibles (y debido a la naturaleza de la codificación de borrar), los clientes muestran pequeñas partes del bloque al azar, incluidas posiblemente secciones que contienen datos para otras aplicaciones.
