---
id: avail-node-management
title: Запустить узел Avail
sidebar_label: Run an Avail node
description: "Узнайте о запуске узла Avail."
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

:::tip Распространенная практика

Пользователи часто запускают узлы на облачном сервере. Вы можете рассмотреть возможность использования провайдера VPS для запуска вашего узла.

:::

## Предварительные условия {#prerequisites}

Следующий список стандартного оборудования — это рекомендация спецификаций оборудования, которые должна быть вашей среде имели.

Минимальные технические характеристики аппаратного обеспечения:

* 4 ГБ ОЗУ
* 2-ядерный процессор
* 20-40 ГБ SSD

:::caution Если вы планируете запустить валидатор

Рекомендации по аппаратному обеспечению для запуска валидатора в цепочке на основе Substrate:

* Процессор — Intel® Core™ i7-7700k CPU @ 4.20GHz
* Хранилище — твердотельный накопитель NVMe объемом около 256 ГБ. Должен быть достаточного размера, чтобы справиться с
ростом блокчейна.
* Память — 64 ГБ ECC

:::

### Требования к узлу: установка Rust и зависимостей {#node-prerequisites-install-rust-dependencies}

:::info Шаги установки согласно Substrate

Avail — это цепочка на основе Substrate, и для ее запуска требуется такая же конфигурация.

Дополнительная документация по установке доступна в Substrate
**[начальная документация](https://docs.substrate.io/v3/getting-started/installation/)**.

:::

После того, как вы выберете среду для запуска вашего нода, убедитесь, что Rust установлен.
Если вы уже установили Rust, запустите следующую команду, чтобы убедиться, что вы используете последнюю версию.

```sh
rustup update
```

Если нет, начните с запуска следующей команды, чтобы получить последнюю версию Rust:

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

Чтобы настроить вашу оболочку, запустите:

```sh
source $HOME/.cargo/env
```

Проверьте свою установку с помощью:

```sh
rustc --version
```

## Запустите Avail локально {#run-avail-locally}

Клонируйте [исходный код Avail](https://github.com/maticnetwork/avail):

```sh
git clone git@github.com:maticnetwork/avail.git
```

Скомпилируйте исходный код:

```sh
cargo build --release
```

:::caution Этот процесс обычно требует времени

:::

Запустите локальный узел разработки с временным хранилищем данных:

```sh
./target/release/data-avail --dev --tmp
```
