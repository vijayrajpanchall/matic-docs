---
id: avail-node-management
title: Chạy một Nút Avail
sidebar_label: Run an Avail node
description: "Tìm hiểu cách chạy một nút Avail."
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

:::tip Phương thức phổ biến

Người dùng thường chạy các nút trên một máy chủ đám mây. Bạn có thể cân nhắc sử dụng một nhà cung cấp VPS để chạy nút của mình.

:::

## Điều kiện tiên quyết {#prerequisites}

Danh sách phần cứng tiêu chuẩn sau đây là đề xuất về các thông số kỹ thuật phần cứng mà môi trường của bạn nên
có.

Các thông số kỹ thuật phần cứng tối thiểu là:

* 4GB RAM
* CPU 2 lõi
* SSD 20-40 GB

:::caution Nếu bạn tính chạy một trình xác thực

Các đề xuất phần cứng để chạy người xác thực trên chuỗi dựa trên Substrate:

* CPU - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
* Lưu trữ - Một ổ đĩa cứng NVMe với dung lượng 256GB. Nên có kích thước hợp lý để đáp ứng
sự phát triển của blockchain.
* Bộ nhớ - 64GB ECC

:::

### Điều kiện tiên quyết của nút: Cài đặt Rust & các đối tượng phụ thuộc {#node-prerequisites-install-rust-dependencies}

:::info Các bước cài đặt theo Substrate

Avail là một chuỗi dựa trên Substrate và yêu cầu cùng một cấu hình để chạy chuỗi Substrate.


Tài liệu cài đặt bổ sung có sẵn trong Sự kiện Hỗ trợ **[tài liệu bắt đầu](https://docs.substrate.io/v3/getting-started/installation/)**.

:::

Khi bạn chọn một môi trường để chạy nút của mình, hãy đảm bảo rằng Rust được cài đặt.
 Nếu bạn đã cài đặt Rust, hãy chạy lệnh sau đây để đảm bảo bạn đang sử dụng phiên bản mới nhất.

```sh
rustup update
```

Nếu không, hãy bắt đầu bằng cách chạy lệnh sau để tìm nạp phiên bản Rust mới nhất:

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

Để định cấu hình shell của bạn, hãy chạy:

```sh
source $HOME/.cargo/env
```

Xác minh cài đặt của bạn với:

```sh
rustc --version
```

## Chạy Avail Cục bộ {#run-avail-locally}

Sao chép [mã nguồn Avail](https://github.com/maticnetwork/avail):

```sh
git clone git@github.com:maticnetwork/avail.git
```

Biên dịch mã nguồn:

```sh
cargo build --release
```

:::caution Quá trình này thường mất thời gian

:::

Chạy một nút nhà phát triển cục bộ với kho dữ liệu tạm thời:

```sh
./target/release/data-avail --dev --tmp
```
