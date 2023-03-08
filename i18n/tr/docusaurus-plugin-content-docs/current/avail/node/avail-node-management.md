---
id: avail-node-management
title: Bir Avail Düğümü Çalıştırın
sidebar_label: Run an Avail node
description: "Bir Avail düğümü çalıştırma hakkında bilgi edinin."
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

:::tip Yaygın uygulama

Kullanıcılar düğümleri çoğu zaman bir bulut sunucusu üzerinde çalıştırırlar Düğümünüzü çalıştırmak için bir VPS sağlayıcı kullanmayı düşünebilirsiniz.

:::

## Ön Koşullar {#prerequisites}

Aşağıdaki standart donanım listesinde ortamınızda olması gereken donanım özelliklerine dair öneriler
yer almaktadır.

Donanım en az şu özelliklere sahip olmalıdır:

* 4GB RAM
* 2 çekirdekli CPU
* 20-40 GB SSD

:::caution Bir doğrulayıcı çalıştırmayı planlıyorsanız

Substrate tabanlı bir zincir üzerinde doğrulayıcı çalıştırmak için donanım önerileri:

* CPU - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
* Depolama - Yaklaşık 256GB alana sahip bir NVMe katı hal sürücüsü (SSD). Blok zincir büyümesinin altından kalkabilecek,
makul boyutta olmalıdır.
* Bellek - 64GB ECC

:::

### Düğüm için ön koşullar: Rust'ı ve bağımlılıkları kurun {#node-prerequisites-install-rust-dependencies}

:::info Substrate ile kurulum adımları

Avail, Substrate tabanlı bir zincirdir ve Substrate zincirlerini çalıştırmak için gereken yapılandırmanın aynısı gereklidir.

Kurulum için ilave belgeler bulabileceğiniz yer: Substrate
**[kullanmaya başlama belgeleri](https://docs.substrate.io/v3/getting-started/installation/)**.

:::

Düğümünüzü çalıştıracağınız ortamı seçtikten sonra Rust'ın kurulu olduğundan emin olun.
Rust zaten kurulu ise en son sürümü kullandığınızdan emin olmak için aşağıdaki komutu çalıştırın.


```sh
rustup update
```

Son sürüm değilse, aşağıdaki komutu çalıştırarak Rust'ın son sürümünü getirmekle başlayın:

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

Kabuğu (shell) yapılandırmak için şunu çalıştırın:

```sh
source $HOME/.cargo/env
```

Kurulumunuzu şununla doğrulayın:

```sh
rustc --version
```

## Avail'i Yerel Çalıştırma {#run-avail-locally}

[Avail kaynak kodunu](https://github.com/maticnetwork/avail) klonlayın:

```sh
git clone git@github.com:maticnetwork/avail.git
```

Kaynak kodunu derleyin:

```sh
cargo build --release
```

:::caution Bu işlem genellikle biraz zaman alır

:::

Geçici veri deposuna sahip yerel bir geliştirme düğümü (dev node) çalıştırın:

```sh
./target/release/data-avail --dev --tmp
```
