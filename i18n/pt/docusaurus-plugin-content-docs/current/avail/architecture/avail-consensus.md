---
id: avail-consensus
title: Consenso da Avail
sidebar_label: Consensus
description: Saiba mais sobre o mecanismo de consenso da Avail
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

# Consenso da Avail {#avail-s-consensus}

## Comités de disponibilidade de dados {#data-availability-committees}

Até agora, a abordagem para manter soluções da DA tem sido geralmente através de um DAC (comitê de disponibilidade de dados). O DAC é responsável por postar assinaturas de volta à chain principal e atestar à disponibilidade de dados fora da chain. O DAC deve garantir que os dados estejam prontamente disponíveis.

Através do DAC, escalar soluções depende de um DAC para alcançar uma Validium. O problema com DACs é que a disponibilidade de dados se torna um serviço confiável em um pequeno grupo de membros do comitê que são responsáveis pelo armazenamento e relatório de dados com veracidade.

O Avail não é um DAC, mas uma rede de blockchain real com seu mecanismo de consenso e tem seu próprio conjunto de nós de validadores e produtores de blocos.

## Proof of Stake {#proof-of-stake}

:::caution Validadores atuais

Com o lançamento inicial da testnet Avail, os validadores serão
operados e mantidos internamente pela Polygon.

:::

Os sistemas de prova tradicional de estaca exigem que os autores de produção de blocos tenham na chain de holdings de token (stake) (stake) para produzir blocos, em oposição aos recursos computacionais (trabalho).

Os produtos da Polygon usam PoS (prova de participação) ou uma modificação de PoS. Normalmente, os validadores em sistemas de PoS tradicionais que mais têm maior participação têm a maior influência e controle da rede.

Os sistemas com muitos mantenedores de rede tendem a formar pools fora da cadeia para maximizar os ganhos de capital reduzindo a variação da recompensa. Este desafio de centralização alivia quando os pools são incluídos na chain, que permite que os detentores de tokens façam backup de mantenedores da rede que os sentem melhor representarem e dos interesses da rede. Isto também distribui a concentração de potência do validador, assumindo que os mecanismos de votação e eleição certos estejam implantados, pois a participação geral na rede é alocada como relação one-to-many ou concentration, em vez de depender apenas de uma relação concentration, onde a confiança é colocada nos validadores "mais altos escaldados".

Esta modificação da prova de participação pode ser administrada por delegação ou nomeação, comumente denominada DPoS (prova de participação delegada) ou NPoS (prova de participação nomeada). As soluções de escalonamento da Polygon adaptaram estes mecanismos aprimorados, incluindo o Polygon Avail.

A Avail utiliza a NPoS com uma alteração na verificação de blocos. Os atores envolvidos ainda são validadores e nominators.

Light clients também podem contribuir para a disponibilidade de dados na Avail. O consenso do Av exige que dois terços mais 1 dos validadores cheguem a consenso para validade.

## Nomeadores {#nominators}

Os Nominators podem optar por fazer backup de um conjunto de validadores do Avail candidatos com a sua participação. Os Nominators irão nomear esses validadores que acharem que irão fornecer disponibilidade de dados efetivamente.

## Diferença entre DPoS e NPoS {#difference-between-dpos-and-npos}

No valor da face, a delegação e a nomeação parecem a mesma ação, especialmente do ponto de vista de um ávido staker. No entanto, as diferenças estão nos mecanismos de consenso subjacentes e na forma como a seleção de validadores ocorre.

No DPoS, um sistema de eleição centrado na votação determina um número fixo de validadores para proteger a rede. Os delegadores podem delegar a sua participação contra validadores da rede de candidatos usando como poder de voto delegados. Os delegadores geralmente suportam validadores no mais alto escalonado, pois os validadores com maior escalonamento têm maior chance de eleição. Os delegados com maior número de votos se tornam validadores da rede e podem verificar transações. Enquanto usam a participação como poder de votação, no Avail, não estão sujeitos a consequências por meio de slashing se o validador eleito se comporta maliciosamente. Em outros sistemas DPoS, os delegadores podem estar sujeitos a cortes.

No NPoS, os delegadores se transformam em nominators e usam a sua participação de forma semelhante para nomear potenciais validadores candidatos para proteger a rede. A Stake está bloqueada na chain e, ao contrário do DPoS, os nominators estão sujeitos a cortes com base no potencial comportamento malicioso de suas indicações. Neste sentido, o NPoS é um mecanismo de staking mais proativo em oposição ao staking que é "definido e esquecido", pois os nominators procuram validadores de well-behaving e sustentáveis. Isso também incentiva os validadores a criar operações de validador robustas para atrair e manter indicações.
