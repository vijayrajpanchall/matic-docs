---
id: faq
title: Perguntas frequentes
sidebar_label: FAQ
description: Perguntas frequentes sobre a Polygon Avail
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

# Perguntas frequentes {#frequently-asked-questions}

:::tip

Se não encontrar a sua pergunta nesta página, envie a sua pergunta no **[<ins>servidor do Polygon Avail Discord</ins>](https://discord.gg/jXbK2DDeNt)**.

:::

## O que é um light client? {#what-is-a-light-client}

Os clientes de luz permitem que os usuários interajam com uma rede de blockchain sem ter de sincronizar toda a blockchain enquanto mantém a descentralização e a segurança. Geralmente, eles baixam os cabeçalhos do blockchain, mas não o conteúdo de cada bloco. Os clientes de luz do Avail (DA) verificam adicionalmente se o conteúdo do bloco está disponível executando a amostragem de disponibilidade de dados, uma técnica onde pequenas seções aleatórias de um bloco são baixadas.

## Qual é um caso de uso popular de um light client? {#what-is-a-popular-use-case-of-a-light-client}

Existem muitos casos de uso que hoje dependem de um intermediário para manter um nó completo, de modo que os usuários finais de um blockchain não se comunicam diretamente com o blockchain, mas sim através do intermediário. Os clientes de luz não foram até agora um substituto adequado para esta arquitetura porque não têm dados de disponibilidade de dados. O Avail resolve este problema, permitindo assim que mais aplicativos participem diretamente na rede de blockchain sem intermediários. Embora o Avail ofereça suporte a nós completos, esperamos que a maioria dos aplicativos não precise executar um ou precise executar menos.

## O que é amostragem de disponibilidade de dados? {#what-is-data-availability-sampling}

Beneficiar de clientes de luz, como outros clientes de luz, apenas baixam os cabeçalhos do blockchain. No entanto, eles realizam amostragem de disponibilidade de dados: uma técnica que mostra aleatoriamente pequenas seções dos dados do bloco e verifica que eles estão corretos. Quando combinados com codificação de apagamento e compromissos polynomial do Kate, os clientes do Avail conseguem fornecer garantias fortes (quase 100%) de disponibilidade sem depender de provas de fraude e com apenas um pequeno número de consultas constantes.

## Como a codificação de apagamento é utilizada para aumentar as garantias de disponibilidade de dados? {#how-is-erasure-coding-used-to-increase-data-availability-guarantees}

A codificação de exclusão é uma técnica que codifica dados de forma que espalha as informações sobre múltiplos "fragmentos", de modo que a perda de algum número desses fragmentos pode ser tolerada. Ou seja, a informação pode ser reconstruída a partir dos outros fragmentos. Aplicado à blockchain, isso significa que aumentamos efetivamente o tamanho de cada bloco, mas impedimos que um ator malicioso possa ocultar qualquer parte de um bloco até o tamanho do fragmento redundante.

Como um ator malicioso precisa esconder uma grande parte do bloco para tentar esconder mesmo uma única transação, torna muito mais provável que a amostragem aleatória atinja as grandes lacunas dos dados. Efetivamente, a codificação do apagamento torna a técnica de amostragem da disponibilidade de dados muito mais poderosa.

## O que são Kate commitments? {#what-are-kate-commitments}

Os Kate commitments, introduzidos por Aniket Kate, Gregory M. Zaverucha, e Ian Goldberg, em 2010, fornecem um
modo de se comprometer com polinomiais de uma forma sucinta. Recentemente, polynomial commitments (compromissos polinomiais) vieram ao primeiro plano,
sendo principalmente utilizados como compromissos em construções de conhecimento zero do tipo PLONK.

Em nossa construção, nós utilizamos Kate commitments pelos seguintes motivos:

- Nos permite comprometer com valores de um modo sucinto, a ser mantido dentro do cabeçalho do bloco.
- Aberturas curtas são possíveis, o que ajuda a um light client a verificar a disponibilidade.
- A propriedade de vinculação da criptografia nos ajudar a evitar provas de fraude, fazendo com que seja computacionalmente inviável.
produzir compromissos errados.

No futuro, podemos usar outros esquemas de compromisso polinomial, caso isso nos dê melhores vínculos ou garantias.

## Já que a Avail é utilizada por múltiplos aplicativos, isso significa que as chains terão que transferir transações de outras chains? {#since-avail-is-used-by-multiple-applications-does-that-mean-chains-have-to-download-transactions-from-other-chains}

Os cabeçalhos do Avail contêm um índice que permite que um determinado aplicativo determine e baixe apenas as seções de um bloco que tem dados para esse aplicativo. Assim, eles são amplamente não afetados por outras cadeias usando o Avail ao mesmo tempo ou por tamanhos de blocos.

A única exceção é a amostragem de disponibilidade de dados. Para verificar se os dados estão disponíveis (e devido à natureza da codificação do apagamento), os clientes amostram pequenas partes do bloco aleatoriamente, incluindo possivelmente seções que contêm dados para outras aplicações.
