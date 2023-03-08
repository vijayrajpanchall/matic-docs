---
id: what-is-avail
title: Avail của Polygon
sidebar_label: Introduction
description: Tìm hiểu về chuỗi tính khả dụng dữ liệu của Polygon
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

# Polygon Acle {#polygon-avail}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Aculle là một blockchain có thể tập trung vào số liệu có khả năng: ra lệnh và thu thập các giao dịch blockchain và làm cho nó có thể chứng minh rằng dữ liệu khối có sẵn sàng mà không tải về toàn bộ. Điều này cho phép nó quy mô theo cách mà chuỗi khối khối khối không thể.

:::info Lớp Tính khả dụng Dữ liệu Có thể mở rộng Đa năng Mạnh mẽ

* Khả năng sử dụng các giải pháp Layer-2 để cung cấp khả năng vận hành tăng khả năng được đưa qua bằng cách sử dụng Aculide để xây dựng Validium với dữ liệu về sự sẵn sàng từ chuỗi

* Kích hoạt các chuỗi hoặc các sidechains với môi trường thực thi tùy tiện để khởi động an ninh xác thực mà không cần thiết tạo và quản lý tài liệu xác thực của họ bằng cách đảm bảo số liệu có khả năng.

:::

## Những Thách thức về Tính khả dụng và Việc mở rộng Hiện nay {#current-availability-and-scaling-challenges}

### Vấn đề về tính khả dụng dữ liệu là gì? {#what-is-the-data-availability-problem}

Các máy ngang hàng trong mạng blockchain cần một cách để đảm bảo rằng tất cả dữ liệu của khối mới được đề xuất
đều có sẵn. Nếu dữ liệu không có sẵn, khối có thể chứa các giao dịch độc hại
đang bị nhà sản xuất khối ẩn đi. Ngay cả khi khối chứa các giao dịch không độc hại,
việc ẩn chúng đi có thể ảnh hưởng đến tính bảo mật của hệ thống.

### Cách tiếp cận của Avail đối với tính khả dụng dữ liệu {#avail-s-approach-to-data-availability}

#### Bảo đảm Cao {#high-guarantee}

Aculp cung cấp một sự cung cấp, mức độ cao của sự đảm bảo rằng dữ liệu có sẵn. Khách hàng Ánh sáng có thể xác thực sự độc lập trong số lượng truy cập liên tục, mà không tải về toàn bộ khối.

#### Niềm tin Tối thiểu {#minimum-trust}

Không cần phải là người xác thực hoặc lưu trữ một nút đầy đủ. Ngay cả với một máy khách nhẹ, cũng sẽ nhận được sự sẵn sàng có thể xác thực.

#### Dễ Sử dụng {#easy-to-use}

Được xây dựng bằng cách sử dụng Chất Nền đã sửa đổi, giải pháp tập trung vào tính dễ sử dụng, cho dù bạn lưu trữ một ứng dụng hay
vận hành một giải pháp mở rộng ngoài chuỗi.

#### Hoàn hảo cho Việc mở rộng Ngoài chuỗi {#perfect-for-off-chain-scaling}

Khám phá tiềm năng mở rộng đầy đủ của giải pháp mở rộng ngoài chuỗi bằng cách lưu giữ dữ liệu của bạn với chúng tôi mà
vẫn tránh được vấn đề DA trên L1.

#### Bất khả tri về Thực thi {#execution-agnostic}

Các xích mích sử dụng Alell có thể thực hiện bất kỳ loại môi trường thực thi nào không tương ứng với logic ứng dụng. Các giao dịch từ bất kỳ môi trường nào được hỗ trợ: EVM, Wasm, hoặc thậm chí là VM mới vẫn chưa được xây dựng. Sự cố là hoàn hảo cho việc thí nghiệm với các lớp thực thi mới.

#### Bảo mật Tự khởi động {#bootstrapping-security}

Aculle cho phép các chuỗi mới được tạo mà không cần quay một bộ xác thực mới, và đòn bẩy của Available thay thế. Sự cố sẽ lo liệu chuỗi giao dịch, đồng thuận, và sự sẵn sàng đổi lấy số lượng giao dịch đơn giản (gas).

#### Tính cuối cùng có thể chứng minh nhanh chóng bằng cách sử dụng NPoS {#fast-provable-finality-using-npos}

Tính cuối cùng có thể chứng minh nhanh chóng thông qua Bằng chứng cổ phần được Đề cử. Được hỗ trợ bởi
các cam kết của KZG và mã hóa erasure.

Bắt đầu bằng cách kiểm tra [bài viết blog](https://blog.polygon.technology/polygon-research-ethereum-scaling-with-rollups-8a2c221bf644/) này trên scaling Ethereum với Rollun.

## Các Validium do Avail cung cấp {#avail-powered-validiums}

Do kiến trúc của khối monolithic (chẳng hạn như Ethereum trong trạng thái hiện tại), vận hành khối khối này rất đắt tiền, dẫn đến mức chi phí giao dịch cao. Việc Rollops cố gắng trích xuất gánh nặng của thực thi bằng cách chạy chuỗi giao dịch và sau đó đăng tải kết quả thực thi và dữ liệu giao dịch [được nén thường xuyên].

Validium là bước tiếp theo: thay vì gửi dữ liệu giao dịch, nó được lưu trữ sẵn sàng, nơi mà sự cố chứng thực/attation chỉ được đăng lên tầng base. Đây là cách giải pháp hiệu quả nhất bởi vì cả sự sẵn sàng thực thi và dữ liệu đều được giữ chặt chặt chẽ trong khi vẫn cho phép xác thực và định cư trên chuỗi số 1.

Avail là một blockchain được tối ưu hóa nhằm đạt được tính khả dụng dữ liệu. Bất kỳ cuộn nào mong muốn trở thành một vanidium có thể chuyển sang dữ liệu chuyển đổi gửi sang Acup thay vì lớp 1 và triển khai một hợp đồng xác thực rằng, ngoài việc xác thực thực thực thi đúng cách, cũng xác nhận được số liệu có sẵn sàng.

:::note Chứng thực

Nhóm Aculp sẽ làm dữ liệu này được xác thực đơn giản trên Ethereum bằng cách xây dựng một cây cầu attestation để đăng tải dữ liệu có khả năng thực thi trực tiếp đến Ethereum. Điều này sẽ khiến hợp đồng xác thực công việc của một công việc đơn giản, vì sự phát triển của DA sẽ được thực hiện. Cầu này hiện đang được thiết kế; vui lòng liên hệ với đội Athletics để biết thêm thông tin hoặc tham gia chương trình truy cập sớm của chúng tôi.

:::

## Xem thêm {#see-also}

* [Giới thiệu Avail của Polygon — Lớp Tính khả dụng Dữ liệu Có thể mở rộng Đa năng Mạnh mẽ](https://polygontech.medium.com/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
* [Vấn đề về Tính khả dụng Dữ liệu](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
