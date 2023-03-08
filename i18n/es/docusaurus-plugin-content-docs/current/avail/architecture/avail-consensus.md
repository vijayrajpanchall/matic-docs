---
id: avail-consensus
title: El consenso de Avail
sidebar_label: Consensus
description: Aprende acerca del mecanismo de consenso de Avail
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

# El consenso de Avail {#avail-s-consensus}

## Comités de disponibilidad de datos {#data-availability-committees}

Hasta ahora, el enfoque de mantener las soluciones de DA generalmente se ha desarrollado a través de un comité de disponibilidad de datos Un DAC es responsable de publicar firmas en la cadena principal y de dar fe de la disponibilidad de datos fuera de la cadena.

A través de un DAC, las soluciones de escalabilidad dependen de un DAC para llegar a un Validium. El problema con los DAC es que la disponibilidad de datos se convierte en un servicio de confianza a un pequeño grupo de miembros del comité que son responsables de almacenar y reportar datos con veracidad.

Avail no es un DAC, sino una red de cadena de bloques real con su mecanismo de consenso, y tiene su propio conjunto de nodos validadores y productores de bloques.

## Prueba de participación {#proof-of-stake}

:::caution Validadores actuales

Con el lanzamiento inicial de la red de pruebas de Avail, Polygon
operará y mantendrá a los validadores desde lo interno.

:::

La prueba tradicional de los sistemas de participación requiere que los autores de la producción en bloque tengan las explotaciones (stake) en la cadena para producir bloques, en lugar de los recursos computacionales (trabajo).

Los productos de Polygon utilizan PoS (prueba de participación) o una modificación de PoS. Por lo general, los validadores en los sistemas tradicionales de PoS que más participen tienen la mayor influencia y control de la red.

Los sistemas con muchos mantenedores de la red tienden a formar grupos fuera de la cadena para maximizar las ganancias de capital al reducir la diferencia de recompensa. Este desafío de centralización alivia cuando las piscinas se incluyen en la cadena que permite a los titulares de token respaldar a los mantenedores de la red a quienes se sienten mejor representarlos y los intereses de la red. Esto también distribuye la concentración de poder del validador, asumiendo que los mecanismos de votación y elecciones adecuados están en su lugar, ya que la participación general en la red se asigna como una relación de uno a muchas o a muchas y muchas en lugar de confiar solo en una relación individual, donde la confianza se pone en los validadores "más altos participantes".

Esta modificación de la prueba de participación se puede administrar a través de la delegación o la nominación, comúnmente denominada DPoS (prueba delegada de participación) o NPoS (prueba de participación nominada). Las soluciones de escalado de Polygon han adaptado estos mecanismos mejorados, incluyendo  .

Avail usa NPoS con una modificación en la verificación de bloques. Los actores involucrados siguen siendo validadores y nominadores.

Los clientes ligeros también pueden contribuir a la disponibilidad de datos en Avail. El consenso de Avail requiere que dos tercios más 1 de los validadores alcancen el consenso para la validez.

## Nominadores {#nominators}

Los nominadores pueden elegir apoyar un conjunto de validadores de Avail candidatos con su participación. Los nominadores designarán a aquellos validadores que sientan que proporcionarán la disponibilidad de datos de manera efectiva.

## Diferencia entre DPoS y NPoS {#difference-between-dpos-and-npos}

En el valor nominal, la delegación y la nominación parecen la misma acción, especialmente desde el punto de vista de un participante. Sin embargo, las diferencias se encuentran en los mecanismos de consenso subyacentes y cómo se produce la selección de los validadores.

En DPoS, un sistema de elecciones centrado en la votación determina un número fijo de validadores para asegurar la red. Los delegadores pueden delegar su participación en comparación con los validadores de la red candidatos, utilizándola como poder de votación delegados. Los delegadores a menudo apoyan a los validadores en el más alto participado, ya que los validadores más staked, tienen una mayor probabilidad de elección. Los delegados con la mayoría de los votos se convierten en los validadores de la red y pueden verificar las transacciones. Mientras utilizan su participación como poder de voto, en Avail, no están sujetos a consecuencias a través de la reducción si su validador elegido se comporta de manera maliciosa. En otros sistemas DPoS, los delegadores pueden estar sujetos a cortes .

En NPoS, los delegadores se convierten en nominadores y utilizan su participación de una manera similar para designar posibles validadores de candidatos para asegurar la red. La participación está encerrada en la cadena y, en contrario de lo que ocurre en DPoS, los nominadores están sujetos a cortes en función del comportamiento malicioso potencial de sus nominaciones. En este sentido, NPoS es un mecanismo de participación más proactivo en lugar de participar que se "establece y olvide", ya que los nominadores buscan a los validadores y validadores sostenibles. Esto también anima a los validadores a crear operaciones sólidas de validadores para atraer y mantener las nominaciones.
