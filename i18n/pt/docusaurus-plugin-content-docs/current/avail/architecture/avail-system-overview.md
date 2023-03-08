---
id: avail-system-overview
title: Descrição geral do sistema
sidebar_label: System Overview
description: Saiba mais sobre a arquitetura da chain Avail
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

# Descrição geral do sistema {#system-overview}

## Modularidade {#modularity}

Atualmente, arquiteturas de blockchain monolíticas como a do Ethereum não podem lidar com eficientemente com a execução, resolução e disponibilidade de dados.

Modularizar a execução para escalar blockchains é o que os modelos de chain centrados no rollup tentam fazer. Isso pode funcionar bem quando as camadas de assentamento e disponibilidade de dados estiverem na mesma camada, que é a abordagem que os rollups do Ethereum assumem. Ainda assim, há trade-offs necessários ao trabalhar com rollups, pois a construção de roll-up pode ser mais segura dependendo da segurança da camada de disponibilidade de dados, mas seria inerentemente mais difícil de escalar.

No entanto, um design granular cria diferentes camadas para serem protocolos leves, como microsserviços. Em seguida, a rede geral se torna uma coleção de protocolos leves com acoplamento frouxo. Um exemplo é uma camada de disponibilidade de dados que é especializada apenas na disponibilidade de dados. O Polygon Avail é uma camada dois blockchain baseada em substratos para disponibilidade de dados.

:::info Tempo de execução da Substrate

Embora o Avail seja baseado na base de códigos do Substrato e inclui modificações na estrutura do bloco que impedem que ele interoperating com outras redes do Substrato A Avail implementa uma rede independente não relacionada com a Polkadot ou a Kusama.

:::

O Avail oferece uma alta garantia da disponibilidade de dados a qualquer cliente de luz, mas não oferece garantias mais altas para iluminar os clientes da DA do que qualquer outra rede. O Avail se concentra em possibilitar provar que os dados do bloco estão disponíveis sem baixar todo o bloco aproveitando compromissos polynomial do Kate, codificação de apagamento e outras tecnologias para permitir que clientes de luz (que baixam apenas os _cabeçalhos_ da chain) to de forma eficiente e aleatória pequenas quantidades dos dados do bloco para verificar sua disponibilidade total. No entanto, há primitivos fundamentalmente diferentes do que sistemas de DA baseados em fraudes que são aqui [explicados](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/).

### Proporcionar a disponibilidade de dados {#providing-data-availability}

A garantia da DA é algo que um cliente determina para si mesmo; não tem de confiar nos nós. À medida que o número de clientes de luz cresce, eles amostram coletivamente todo o bloco (mesmo que cada cliente apenas tenha uma pequena percentagem). Os clientes de luz eventualmente formam uma rede P2P entre si; assim, depois de um bloco ser amostrado, ela fica altamente disponível - isto é, mesmo que os nós fossem desligados (ou tentassem censurar um bloco), os clientes de luz poderão reconstruir o bloco compartilhando as peças entre si.

### Ativar o conjunto de soluções seguinte {#enabling-the-next-set-of-solutions}

O Avail levará os rollups para o próximo nível, pois as cadeias podem atribuir o componente da disponibilidade de dados ao Avail. O Avail também fornece uma maneira alternativa de bootstrap qualquer chain autônomo, pois as chains podem descarregar a disponibilidade de dados. Existem, naturalmente, trade-offs que são feitos com diferentes abordagens de modularidade, mas o objetivo geral é manter alta segurança e poder escalar.

Os custos de transação também são reduzidos. O Avail pode cultivar o tamanho do bloco com um impacto menor na carga de trabalho do validador do que na cadeia monolítica. Quando uma chain monolítica aumenta o tamanho do bloco, os validadores têm de fazer muito mais trabalho porque os blocos têm de ser executados e o estado tem de ser calculado. Como o Avail não tem ambiente de execução, é muito mais barato aumentar o tamanho do bloco. O custo não é zero devido à necessidade de calcular compromissos do KZG e gerar provas, mas ainda barato.

A Avail também torna os rollups soberanos uma possibilidade. Os usuários podem criar cadeias soberanas que confiem nos validadores do Avail para alcançar consenso sobre dados e pedidos de transações. Os rollups soberanos no Avail permitem atualizações sem problemas, pois os usuários podem enviar atualizações para nós específicos do aplicativo para atualizar a chain e, por sua vez, atualizar para nova lógica de assentamento. Enquanto num ambiente tradicional a rede requer um fork.

:::info A Avail não possui um ambiente de execução

O Avail não executa contratos inteligentes, mas permite que outras cadeias disponibilizem os seus dados de transações através do Avail. Estas cadeias podem implementar os ambientes de execução de qualquer tipo: EVM, Wasm ou qualquer outra coisa.

:::

A disponibilidade de dados no Avail está disponível para uma janela de tempo que é necessária. Por exemplo, para além de precisar de dados ou reconstrução, a segurança não é comprometida.

:::info A Avail não se importa com o propósito dos dados

O Avail garante que os dados do bloco estão disponíveis, mas não se importa com o que esses dados são. Os dados podem ser transações, mas também podem assumir outros formulários.

:::

Os sistemas de armazenamento, por outro lado, são projetados para armazenar dados por longos períodos e incluir mecanismos de incentivo para incentivar os utilizadores a armazenar dados.

## Validação {#validation}

### Validação pelos pares {#peer-validation}

Um ecossistema é constituído tipicamente por três tipos de pares:

* **Nós do validador:** um validador coleta transações do mempool, as executa e gera um bloco de candidatos que é anexado à rede. O bloco contém um cabeçalho de blocos pequeno com o dígito e os metadados das transações no bloco.
* Nós **completos:** o bloco de candidatos se propaga para nós completos em toda a rede para verificação. Os nós irão reexecutar as transações contidas no bloco candidato.
* **Clientes de luz:** Clientes de luz só buscam o cabeçalho do bloco para usar para verificação e irão buscar detalhes da transação de nós completos vizinhos conforme necessário.

Embora uma abordagem segura, o Avail resolve as limitações desta arquitetura para criar robustez e maiores garantias. Os clientes de luz podem ser induzidos a aceitar blocos cujos dados subjacentes não estão disponíveis. Um produtor de blocos pode incluir uma transação maliciosa num bloco e não revelar todo o seu conteúdo à rede. Como mencionado nos documentos do Avail, isso é conhecido como problema da disponibilidade de dados.

Os pares da rede Avail incluem:

* Nós **de** validador: protocolo incentivado todos os nós que participam do consenso. Os nós de validação no Avail não executam transações. Eles empacotam transações arbitrárias e constroem blocos de candidatos, gerando compromissos KZG para os **dados. Outros validadores verificam que os blocos gerados estão corretos**.

* **Avail (DA):** nós que baixam e disponibilizam todos os dados de blocos para todos os aplicativos que usam Avail. Da mesma forma, os nós completos da Avail não executam transações.

* **Clientes leves do Avail (DA):** Clientes que baixam apenas cabeçalhos do bloco amostram aleatoriamente pequenas partes do bloco para verificar a disponibilidade. Eles expõem uma API local para interagir com a rede Avail.

:::info O objetivo da Avail não é depender de nós completos para manter os dados disponíveis

O objetivo é dar garantias da DA semelhantes a um cliente de luz como nó completo. Os utilizadores são encorajados a utilizar os light clients da Avail. No entanto, eles ainda podem executar nós completos do Avail, que são bem suportados.

:::

:::caution A API local é um WIP e ainda não é estável


:::

Isso permite que aplicativos que desejam usar o Avail para incorporar o cliente de luz da DA. Elas podem então construir:

* **Nós completos do aplicativo**
  - Incorporar um light client (DA) da Avail
  - Descarregar todos os dados para um appID específico
  - Implementar um ambiente de execução para efetuar transações
  - Manter o estado da aplicação

* **Clientes de luz de aplicativos**
  - Incorporar um light client (DA) da Avail
  - Implementar a funcionalidade destinada ao utilizador final

O ecossistema do Avail também irá apresentar pontes para permitir casos de uso específicos. Uma dessas _pontes_ que está sendo projetada neste momento é uma ponte de atestado que irá publicar atestados de dados disponíveis no Avail to Ethereum, permitindo assim a criação de validium.

## Verificação do estado {#state-verification}

### Verificação de blocos → Verificação da DA {#da-verification}

#### Validadores {#validators}

Em vez de validadores de privilégio verificar o estado do aplicativo, eles se concentram em garantir a disponibilidade de dados de transação postados e fornecer pedidos de transação. Um bloco só é considerado válido se os dados que servem de base ao bloco estiverem disponíveis.

Avail os validadores assumem transações de entrada, transactions, constrói um bloco de candidatos e propõem à rede. O bloco contém recursos especiais, especialmente para codificação de exclusão de DA, e compromissos de KZG. Isto está num formato particular, para que os clientes possam fazer amostragem aleatória e descarregar apenas as transações de um único aplicativo.

Outros validadores verificam o bloco ao garantir que este está bem formado, que os compromissos KZG
conferem, que os dados estão presentes, etc.

#### Clientes {#clients}

A necessidade de dados disponíveis impede que os produtores de blocos liberem cabeçalhos de blocos sem liberar os dados por trás deles, pois isso impede que os clientes lêem as transações necessárias para calcular o estado dos seus aplicativos. Tal como acontece com outras chains, o Avail usa a verificação da disponibilidade de dados para resolver esta questão através de verificações da DA, que utilizam códigos de apagamento; estas verificações são fortemente usadas no design da redundância de dados.

Os códigos de exclusão efetivamente duplicam os dados para que, se parte de um bloco for suprimida, os clientes possam reconstruir essa parte usando outra parte do bloco. Isto significa que um nó que esteja a tentar ocultar essa parte teria de ocultar muito mais.

> A técnica é usada em dispositivos como CD-ROMs e matrizes multi-disco (RAID) (por exemplo,
> se um disco rígido parar de funcionar, pode ser substituído e reconstruído a partir dos dados de outros discos).

O que é exclusivo no Avail é que o design da chain permite que **qualquer pessoa** verifique a DA sem precisar baixar os dados. As verificações da DA exigem que cada cliente leve amostre um número mínimo de chunks aleatórios de cada bloco da chain. Um conjunto de clientes de luz pode provar coletivamente todo o blockchain desta maneira. Consequentemente, quanto mais nós não consensuais houver, maior o tamanho do bloco (e a taxa de transferência) pode existir com segurança. Significado, nós não consensuais podem contribuir para a transferência e segurança da rede.

### Liquidação da transação {#transaction-settlement}

A Avail irá utilizar uma camada de liquidação construída com a Polygon Edge. A camada de assentamento fornece um blockchain compatível com EVM para rollups para armazenar seus dados e executar a resolução de disputas. A camada de assentamento utiliza o Polygon Avail para seu DA. Quando os rollups estão usando uma camada de assentamento, eles também herdam todas as propriedades da DA do Avail.

:::note Diferentes maneiras de liquidar

Existem diferentes maneiras de usar Avail, e os validium não usarão a camada de assentamento, mas sim se instalam no Ethereum.

:::

A Avail oferece a hospedagem e ordenação dos dados. A camada de execução provavelmente virá de várias soluções de escalonamento fora da cadeia ou de camadas de execução de legados. A camada de resolução assume o componente de verificação e resolução de litígios.

## Recursos {#resources}

- [Introdução ao Avail pelo Polygon](https://medium.com/the-polygon-blog/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048).
- [Polygon Talks: Polygon Avail](https://www.youtube.com/watch?v=okqMT1v3xi0)
