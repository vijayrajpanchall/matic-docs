---
id: avail-node-management
title: Availノードを実行
sidebar_label: Run an Avail node
description: "Availノードを実行する方法を学びます。"
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

:::tip 一般的な方法

ユーザはクラウドサーバーでノードを実行します。ノードを実行するのにVPSプロバイダーを使用することを検討するのもいいでしょう。

:::

## 前提条件 {#prerequisites}

次の標準ハードウェアリストは、環境が持つべきハードウェア仕様の推奨です。

ハードウェア仕様は最低でも次のものが必要です：

* 4GB RAM
* 2コアCPU
* 20～40 GB SSD

:::caution バリデータを実行する予定である場合

Substrateベースのチェーンでバリデータを実行するためのハードウェア推奨：

* CPU - インテル（R）コア（TM）i7-7700K CPU @ 4.20GHz
* ストレージ - 約256GBのNVMeソリッドステートドライブ。ブロックチェーンの成長を処理するために適度にサイズを変更する必要があります。
* メモリ - 64GB ECC

:::

### ノード前提条件：Rustと依存関係をインストール {#node-prerequisites-install-rust-dependencies}

:::info Substrateによるインストールステップ

AvailはSubstrateベースのチェーンであり、Substrateチェーンを実行するのに同じ構成が必要です。

追加インストールドキュメントはSubstrateの**[getting stated（始めましょう）のドキュメント](https://docs.substrate.io/v3/getting-started/installation/)**にあります。

:::

ノードを実行する環境を選択すると、Rustがインストールされていることを確認します。
Rustがすでにインストールされている場合、次のコマンドを実行して最新バージョンを使用していることを確認します。

```sh
rustup update
```

最新バージョンでない場合は、次のコマンドを実行してRustの最新バージョンを取得します：

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

シェルを設定するのに、次を実行します：

```sh
source $HOME/.cargo/env
```

次でインストールを検証します：

```sh
rustc --version
```

## Availをローカルで実行 {#run-avail-locally}

[Availソースコード](https://github.com/maticnetwork/avail)を複製する：

```sh
git clone git@github.com:maticnetwork/avail.git
```

ソースコードをコンパイルする：

```sh
cargo build --release
```

:::caution このプロセスは通常時間がかかります

:::

一時的なデータストアでローカルdevノードを実行する：

```sh
./target/release/data-avail --dev --tmp
```
