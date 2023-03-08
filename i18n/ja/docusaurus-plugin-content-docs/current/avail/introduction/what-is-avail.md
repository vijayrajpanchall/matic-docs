---
id: what-is-avail
title: PolygonによるAvail
sidebar_label: Introduction
description: Polygonのデータ可用性チェーンについて学ぶ
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

Availはデータ可用性に焦点を当てたブロックチェーンです。ブロックチェーントランザクションを注文および記録し、ブロックチェーン全体をダウンロードすることなくブロックデータが利用できることを証明できるようにします。これにより、モノリシックブロックチェーンができない方法でスケーリングすることができます。

:::info 堅牢な汎用スケーラブルデータ可用性レイヤー

* レイヤー2ソリューションは、Availを活用してオフチェーンデータ可用性でValidiumを構築することで、スケーラビリティの向上を実現できます。

* 任意の実行環境を持つスタンドアロンチェーンまたはサイドチェーンにより、トランザクションデータの可用性を保証することにより、独自のバリデータを作成および管理することなくバリデータセキュリティをブートストラップさせることができます。

:::

## 現在の可用性とスケーリングの課題 {#current-availability-and-scaling-challenges}

### データの可用性の問題とは何ですか? {#what-is-the-data-availability-problem}

ブロックチェーンネットワーク内のピアは、新たに提案されたブロックのすべてのデータを容易に利用できるようにする方法を必要とします。データが使用できない場合、ブロックにはブロックプロデューサによって隠されている悪意のあるトランザクションが含まれている可能性があります。ブロックに悪意のないトランザクションが含まれていても、
ブロックを非表示にすると、システムのセキュリティが低下する可能性があります。

### データ可用性に対するAvailのアプローチ {#avail-s-approach-to-data-availability}

#### 高保証 {#high-guarantee}

Availはデータが利用できることを証明できる高レベルの保証を提供します。ライトクライアントは、ブロック全体をダウンロードすることなく、一定のクエリで利用可能なことを個別に検証することができます。

#### 最小限の信頼 {#minimum-trust}

バリデータである必要はなく、フルノードをホストする必要もありません。ライトクライアントでも、検証可能な可用性を得ることができます。

#### 使いやすさ {#easy-to-use}

変更されたSubstrateを使用して構築されたこのソリューションは、アプリケーションをホストするか、オフチェーンスケーリングソリューションを運用するかにかかわらず、使いやすさに重点を置いています。

#### オフチェーンスケーリングに最適 {#perfect-for-off-chain-scaling}

データを保持し、L1でのDAの問題を回避することで、オフチェーンスケーリングソリューションのフルスケーリング性を最大限に引き出します。

#### 実行指定なし {#execution-agnostic}

Availを使用するチェーンは、アプリケーションロジックに関係なく、どのような種類の実行環境を実装できます。どの環境でもトランザクションがサポートされています：EVM、Wasm、またはまだ構築されていない新しいVMです。Availは新しい実行レイヤーを実行するのに最適です。

#### ブートストラップセキュリティ {#bootstrapping-security}

Availは、新しいバリデータセットをスピンアップする必要なく、新しいチェーンを作成することができます。代わりにAvailを活用できます。Availは、簡単なトランザクション手数料（ガス）と引き換えにトランザクションシーケンシング、コンセンサス、可用性を管理しています。

#### NPoSを使用した高速で証明可能なファイナリティ {#fast-provable-finality-using-npos}

ノミネーテッド・プルーフ・オブ・ステークを介した迅速で証明可能なファイナリティ。KZGコミットメントと消去コーディングによって支えられています。

まず、Ethereumをロールアップでスケーリングする[ブログ記事](https://blog.polygon.technology/polygon-research-ethereum-scaling-with-rollups-8a2c221bf644/)を参照してください。

## Avail-Powered Validiums {#avail-powered-validiums}

モノリシックブロックチェーン（現在の状態のEthereumなど）のアーキテクチャのため、ブロックチェーンを操作するコストが高く、トランザクション手数料がかかります。ロールアップは、トランザクションをオフチェーンで実行し、実行結果と[通常圧縮さ]れたトランザクションデータを投稿することで、実行の負担を引き出そうとします。

バリディウムは次のステップです：トランザクションデータを公開する代わりに、オフチェーンで利用可能な状態に保つため、証明／証明がベースレイヤーにのみ投稿されます。実行とデータ可用性の両方がオフチェーンで維持されながら、レイヤー1チェーン上の最終的な検証と決済が可能であるため、これははるかにコスト効率の良いソリューションです。

Availは、データ可用性に最適化されたブロックチェーンです。バリディウムになることを希望するロールアップは、レイヤー1ではなくトランザクションデータをAvailに切り替えて、正しい実行を検証するだけでなく、データ可用性を検証する検証コントラクトを展開することができます。

:::note 証明

Availチームは、データ可用性の証明をEthereumに直接投稿するための証明ブリッジを構築することにより、Ethereum上でこのデータ可用性検証を簡単にします。これにより、DA認証はすでにオンチェーン化されるため、検証契約の仕事を簡単にします。このブリッジは現在設計されています。詳細については、Availチームにご連絡いただくか、早期アクセスプログラムに参加してください。

:::

## 関連項目 {#see-also}

* [PolygonによるAvailの紹介 — 堅牢な汎用スケーラブルデータ可用性レイヤー](https://polygontech.medium.com/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
* [データ可用性の問題](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
