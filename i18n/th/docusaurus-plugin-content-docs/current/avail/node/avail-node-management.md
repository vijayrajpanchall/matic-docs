---
id: avail-node-management
title: เรียกใช้ โหนด avail
sidebar_label: Run an Avail node
description: "เรียนรู้ เกี่ยวกับ การเรียกใช้ โหนด avail"
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

:::tip วิธีการ ทั่วไป

ผู้ใช้ เรียกใช้ โหนด บน คลาวด์ เซอร์เวอร์ บ่อยๆ คุณ อาจ พิจารณา การใช้ ผู้ให้บริการ VPS เพื่อ เรียกใช้ โหนด ของคุณ

:::

## ข้อกำหนดเบื้องต้น {#prerequisites}

รายการ ฮาร์ดแวร์ มาตรฐาน ดังต่อไปนี้ ระบุ รายละเอียด ฮาร์ดแวร์ ที่แนะนำ ซึ่ง สภาพแวดล้อม ของคุณ ต้อง
มี

รายละเอียด ฮาร์ดแวร์ ต้อง ประกอบ อย่างน้อย ด้วย

* RAM 4GB
* 2 core CPU
* 20-40 GB SSD

:::caution หากคุณวางแผนที่จะเรียกใช้ตัวตรวจสอบความถูกต้อง

คำแนะนำ เกี่ยวกับ ฮาร์ดแวร์ สำหรับ การเรียกใช้ ผู้ตรวจสอบ ใน เชน ซึ่งใช้ Substrate เป็นหลัก

* CPU - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
* หน่วยเก็บข้อมูล ฮาร์ดไดรฟ์ NVMe ขนาด ประมาณ 256GB ต้อง มี ขนาก เพียงพอ เพื่อ สามารถใช้ได้ กับ
การเติบโต ของ บล็อกเชน
* หน่วยความจำ - 64GB ECC

:::

### ข้อกำหนดเบื้องต้น เกี่ยวกับ โหนด ให้ติดตั้ง Rust และ ส่วนเพิ่ม {#node-prerequisites-install-rust-dependencies}

:::info ขั้นตอน การติดตั้ง โดย Substrate

avail เป็น เชน ที่ ใช้ Substrate เป็นหลัก และ ต้อง ใช้ ค่าปรับแต่ง เดียวกัน กับ การ เรียกใช้ เชน Substrate

เอกสาร เกี่ยวกับ การติดตั้ง เพิ่มเติม สามารถดูได้ ใน Substrate
**[เอกสาร เพื่อ เริ่มต้น](https://docs.substrate.io/v3/getting-started/installation/)**

:::

เมื่อ คุณ ได้เลือก สภาพแวดล้อม เพื่อ เรียกใช้ โหนด ของคุณ แล้ว ตรวจสอบว่า Rust ถูกติดตั้ง
หาก คุณ ได้ ติดตั้ง Rust มาก่อน เรียกใช้ คำสั่ง ดังต่อไปนี้ เพื่อ ตรวจสอบ คุณ ใช้ เวอร์ชัน ล่าสุด

```sh
rustup update
```

ถ้า ไม่ใช่ เริ่ม ด้วย การเรียกใช้ คำสั่ง ดังต่อไปนี้ เพื่อ ได้มาซึ่ง Rust เวอร์ชัน ล่าสุด

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

เพื่อ ปรับแต่ง shell ของคุณ เรียกใช้

```sh
source $HOME/.cargo/env
```

ตรวจสอบความถูกต้อง ของ การติดตั้ง ของคุณ ด้วย

```sh
rustc --version
```

## เรียกใช้ avail ในท้องถิ่น {#run-avail-locally}

โคลน [ซอส โค้ด avail](https://github.com/maticnetwork/avail)

```sh
git clone git@github.com:maticnetwork/avail.git
```

รวบรวม ซอส โค้ด

```sh
cargo build --release
```

:::caution โดยทั่วไป กระบวนการนี้ ใช้ เวลา

:::

เรียกใช้ โหนด dev ท้องถิ่น โดย ใช้ พื้นที่เก็บข้อมูล ชั่วคราว

```sh
./target/release/data-avail --dev --tmp
```
