---
id: what-is-avail
title: Avail by Polygon
sidebar_label: Introduction
description: Conheça a chain de disponibilidade de dados da Polygon
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

O Avail é um blockchain focado no laser na disponibilidade de dados: encomendar e gravar transações de blockchain e permitir provar que os dados do bloco estão disponíveis sem baixar todo o bloco. Isso permite que ele escale de maneiras que as blockchains monolíticas não podem.

:::info Uma camada de disponibilidade de dados escalável, polivalente e robusta

* Permite que as soluções da Camada-2 ofereçam um aumento da transferência de escalabilidade ao aproveitar o Avail para criar Validiums com disponibilidade de dados fora da chain.

* Permite cadeias independentes ou sidechains com ambientes de execução arbitrária para a segurança do validador de bootstrap sem precisar criar e gerenciar o seu próprio conjunto de validadores, garantindo a disponibilidade de dados da transação.

:::

## Desafios atuais de disponibilidade e escalonamento {#current-availability-and-scaling-challenges}

### Qual é o problema da disponibilidade de dados? {#what-is-the-data-availability-problem}

Os pares de uma rede blockchain precisam de uma forma de garantir que todos os dados de um bloco recém-proposto estão
imediatamente disponíveis. Se os dados não estiverem disponíveis, o bloco pode conter transações maliciosas
que estão a ser ocultadas pelo produtor de blocos. Mesmo que o bloco contenha transações não maliciosas,
a ocultação delas pode comprometer a segurança do sistema.

### Abordagem da Avail à disponibilidade de dados {#avail-s-approach-to-data-availability}

#### Elevada garantia {#high-guarantee}

O Avail oferece uma garantia comprovável e de alto nível de que os dados estão disponíveis. Os clientes de luz podem verificar de forma independente a disponibilidade em um número constante de consultas, sem baixar todo o bloco.

#### Confiança mínima {#minimum-trust}

Não é necessário ser um validador ou hospedar um nó completo. Mesmo com um cliente de luz, obtenha disponibilidade verificável.

#### Fácil de usar {#easy-to-use}

Construída através da utilização da Substrate modificada, a solução concentra-se na facilidade de utilização, quer hospede uma aplicação ou
opere uma solução de escalonamento off-chain.

#### Perfeito para escalonamento off-chain {#perfect-for-off-chain-scaling}

Desbloqueie todo o potencial de escalonamento da sua solução de escalonamento off-chain ao manter os dados connosco e
evitar, mesmo assim, o problema da DA na L1.

#### Agnóstico da execução {#execution-agnostic}

As cadeias que usam o Avail podem implementar qualquer tipo de ambiente de execução independentemente da lógica de aplicação. São suportadas transações de qualquer ambiente: EVM, Wasm ou até mesmo novas VMs que ainda não foram construídas. O Avail é perfeito para experimentar novas camadas de execução.

#### Começar por conta própria a segurança {#bootstrapping-security}

O Avail permite que novas cadeias sejam criadas sem precisar implantar um novo conjunto de validadores e aproveitar o Avail. O Avail cuida do sequenciamento, do consenso e da disponibilidade de transações em troca de taxas de transação simples (gás).

#### Finalidade provável rápida utilizando NPoS {#fast-provable-finality-using-npos}

Finalidade provável rápida através de Nominated Proof of Stake. Apoiada por compromissos KZG
e codificação de apagamento.

Comece verificando este [post](https://blog.polygon.technology/polygon-research-ethereum-scaling-with-rollups-8a2c221bf644/) no blog sobre escalar Ethereum com Rollups.

## Validiums com tecnologia da Avail {#avail-powered-validiums}

Devido à arquitetura de blockchains monolíticos (como o Ethereum no estado atual), o funcionamento do blockchain é caro, resultando em altas taxas de transação. Os rollups tentam extrair o ônus da execução executando transações fora da chain e depois publicar os resultados da execução e os dados da transação [geralmente] compactados.

Os Validiums são a próxima etapa: em vez de postar os dados da transação, ele é mantido disponível fora da chain, onde uma prova/certificação é publicada apenas na camada de base. Esta é a solução mais econômica porque tanto a execução como a disponibilidade de dados são mantidos fora da chain, enquanto ainda permitem a verificação final e assentamento na chain da camada 1.

A Avail é uma blockchain otimizada para a disponibilidade de dados. Qualquer roll-up que deseje se tornar um validium pode mudar para postar dados da transação para Avail em vez da camada 1 e implantar um contrato de verificação que, além de verificar a execução correta, também verifica a disponibilidade dos dados.

:::note Certificação

A equipe do Avail tornará esta verificação da disponibilidade de dados simples no Ethereum construindo uma ponte de atestado para publicar atestados de disponibilidade de dados diretamente ao Ethereum. Isto tornará o trabalho do contrato de verificação simples, já que as atestações da CIA já estarão na chain. Esta ponte está atualmente em design; entre em contato com a equipe do Avail para mais informações ou para ingressar no nosso programa de acesso precoce.

:::

## Ver também {#see-also}

* [Apresentamos a Avail by Polygon — uma camada de disponibilidade de dados escalável, polivalente e robusta](https://polygontech.medium.com/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
* [O problema da disponibilidade de dados](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
