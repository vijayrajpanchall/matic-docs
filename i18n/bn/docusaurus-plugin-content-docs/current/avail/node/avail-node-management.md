---
id: avail-node-management
title: Avail Node চালান
sidebar_label: Run an Avail node
description: "Avail নোড চালানো সম্পর্কে জানুন।"
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

:::tip সাধারণ কাজ

ব্যবহারকারীরা প্রায়ই ক্লাউড সার্ভারে নোড চালান। আপনি চাইলে একটি VPS সেবা প্রদানকারীর মাধ্যমে আপনার নোড চালাতে পারেন।

:::

## পূর্বশর্ত {#prerequisites}

স্ট্যান্ডার্ড হার্ডওয়্যারের নিম্নলিখিত তালিকাটি হচ্ছে হার্ডওয়্যার স্পেকের একটি সুপারিশ যা এনভায়রনমেন্টের থাকা
উচিত

হার্ডওয়্যার স্পেকে যেগুলো অবশ্যই থাকা উচিত:

* 4GB RAM
* 2 core CPU
* 20-40 GB SSD

:::caution আপনি যদি একটি যাচাইকারী চালানোর জন্য পরিকল্পনা করেন

সাবস্ট্রেট-ভিত্তিক চেইনে একটি যাচাইকারী চালানোর হার্ডওয়্যার সুপারিশ:

* CPU - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
* স্টোরেজ - 256GB সহ একটি NVMe সলিড স্টেট ড্রাইভ। ব্লকচেইনের বৃদ্ধির সাথে তাল মিলিয়ে চলার মতো
যুক্তিসঙ্গত আকারের হতে হবে।
* মেমরি - 64GB ECC

:::

### নোডের পূর্বশর্ত: Rust এবং অন্যান্য সাহায্যকারী জিনিসগুলি ইনস্টল করুন {#node-prerequisites-install-rust-dependencies}

:::info সাবস্ট্রেট দিয়ে ইনস্টল করার ধাপসমূহ

Avail হল একটি সাবস্ট্রেট-ভিত্তিক চেইন এবং একটি সাবস্ট্রেট চেইন চালানোর মতো একই কনফিগারেশন প্রয়োজন।

ইনস্টল করার অতিরিক্ত ডকুমেন্টেশন সাবস্ট্রেট দিয়ে
**[শুরু করার ডকুমেন্টেশন](https://docs.substrate.io/v3/getting-started/installation/)**-এ পাওয়া যাবে।

:::

আপনার নোড চালানোর একটি এনভায়রনমেন্ট বেছে নেওয়ার পর, Rust ইনস্টল করার বিষয়টি নিশ্চিত করুন।
আপনি যদি আগে থেকেই Rust ইনস্টল করে থাকেন, তবে আপনি সর্বশেষ ভার্সন ব্যবহার করছেন তা নিশ্চিত করতে নিম্নলিখিত কমান্ডটি চালান।

```sh
rustup update
```

যদি ইনস্টল করা না থাকে, তাহলে Rust-এর সর্বশেষ ভার্সন ফেচ করতে নিম্নলিখিত কমান্ড চালানোর মাধ্যমে শুরু করুন:

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

আপনার শেল কনফিগার করতে, রান করুন:

```sh
source $HOME/.cargo/env
```

আপনার ইনস্টলেশন যাচাই করুন:

```sh
rustc --version
```

## Avail স্থানীয়ভাবে চালান {#run-avail-locally}

[Avail সোর্স কোডটি](https://github.com/maticnetwork/avail) ক্লোন করুন:

```sh
git clone git@github.com:maticnetwork/avail.git
```

সোর্স কোডটি কম্পাইল করুন:

```sh
cargo build --release
```

:::caution এই প্রক্রিয়াটিতে সাধারণত সময় লাগে

:::

অস্থায়ী ডেটাস্টোর সহ একটি স্থানীয় ডেভ নোড চালান:

```sh
./target/release/data-avail --dev --tmp
```
