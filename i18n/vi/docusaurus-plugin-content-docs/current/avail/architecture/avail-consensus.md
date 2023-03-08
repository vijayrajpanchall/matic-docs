---
id: avail-consensus
title: Sự đồng thuận của Avail
sidebar_label: Consensus
description: Tìm hiểu về cơ chế đồng thuận của Avail
keywords:
  - docs
  - polygon
  - avail
  - consensus
  - proof of stake
  - nominated proof of stake
  - pos
  - npos
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: avail-consensus
---

# Sự đồng thuận của Avail {#avail-s-consensus}

## Ủy ban tính khả dụng dữ liệu {#data-availability-committees}

Cho đến nay, phương pháp tiếp cận để duy trì các giải pháp DA thường được thông qua một ủy ban điều trị (dữ liệu có sẵn data). Một DAC chịu trách nhiệm cho việc gửi chữ ký trở lại chuỗi chính và attaken cho sự sẵn sàng của dữ liệu off-chain. DAC phải đảm bảo rằng dữ liệu có thể sẵn sàng.

Thông qua DAC, các giải pháp mở rộng dựa vào DAC để đạt được Validium. Vấn đề với DAC là dữ liệu có sẵn sàng trở thành một dịch vụ đáng tin cậy trên một nhóm nhỏ của ủy ban chịu trách nhiệm về việc lưu trữ và báo cáo thật sự.

Aculle không phải là DAC, mà là một mạng blockchain thực tế với cơ chế đồng thuận của nó, và có một bộ phận của nút xác thực và các nhà sản xuất khối riêng.

## Bằng chứng Cổ phần {#proof-of-stake}

:::caution Người xác thực hiện tại

Với lần khởi chạy đầu tiên của mạng thử nghiệm Avail, những người xác thực sẽ
được Polygon vận hành và duy trì nội bộ.

:::

Bằng chứng truyền thống của hệ thống cổ phần yêu cầu chặn các tác giả để có tài sản vật dụng (cọc) trên chuỗi để sản xuất khối u, trái với các tài nguyên máy tính (công việc).

Các sản phẩm của Polygon sử dụng PoS (bằng chứng chứng về sự thay đổi của PoS) Thông thường, trình xác thực trong hệ thống PoS truyền thống có nguồn gốc nhất có ảnh hưởng và kiểm soát mạng lưới.

Hệ thống với nhiều nhà duy trì mạng thường hình thành hồ bơi từ hệ thống để tối đa hóa vốn bằng cách giảm biến số thưởng. Thử thách trung tâm hóa này sẽ thu thập được khi hồ bơi được bao gồm trên chuỗi cung cấp cho phép các chủ số lưu trữ về nhà duy trì mạng người mà họ cảm thấy tốt nhất đại diện cho họ và lợi ích của mạng lưới. Điều này cũng phân phối sự tập trung năng lượng của người xác thực, giả định cơ chế bỏ phiếu đúng và bầu cử đang được đặt vào vị trí, vì cổ phần chung trên mạng được phân bổ như một đối với nhiều hoặc nhiều đối với nhiều người thay vì chỉ dựa vào mối quan hệ một đối với một đối với một đối tượng và sự tin cậy được đặt vào "người xác thực cao nhất".

Sự sửa đổi này của bằng chứng chứng chứng khoán có thể được thực hiện thông qua cử tri hoặc đề cử, thường được gọi là DPoS (bằng chứng xác thực của cọc) hoặc NPoS (bằng chứng được đề cử của cọc). Các giải pháp scaling của Polygon đã thích ứng với các cơ chế cải tiến này, bao gồm Polygon Avais.

Avail sử dụng NPoS cùng một phiên bản sửa đổi trong xác minh khối. Các diễn viên liên quan vẫn là người xác thực và người đề cử.

Các máy khách nhẹ cũng có thể đóng góp vào tính khả dụng dữ liệu trên Avail. Đồng thuận với sự đồng thuận của người đồng thuận cần 2/3 và 1 trong số người xác thực được đồng thuận với sự hợp lệ.

## Người đề cử {#nominators}

Các nhà phát triển có thể chọn trở lại một số người xác thực ứng cử với cọc. Các nhà phát triển sẽ đề cử những người xác thực mà họ cảm thấy sẽ cung cấp dữ liệu một cách hiệu quả.

## Sự khác biệt giữa DPoS và NPoS {#difference-between-dpos-and-npos}

Với giá trị khuôn mặt, sự cử tri và đề cử dường như giống như một hành động tương tự, đặc biệt là từ quan điểm của người xác thực. Tuy nhiên, sự khác biệt nằm trong cơ chế đồng thuận tiềm ẩn và cách lựa chọn xác thực xảy ra.

Trong DPoS, một hệ thống bầu cử trung tâm xác định một số người xác thực cố định để bảo mật mạng lưới. Các người xác thực có thể đại biểu cổ phần của họ chống lại các nhà xác thực ứng cử bằng cách sử dụng nó như quyền bỏ phiếu để quay lại. những người được ủy quyền. Các trình xác thực thường hỗ trợ các trình xác thực trên số lượng người xác thực cao nhất, vì các trình xác thực được xác thực cao hơn có cơ hội bầu cử cao hơn. Các đại biểu với số phiếu nhất sẽ trở thành người xác thực và có thể xác thực các giao dịch. Trong khi sử dụng cổ phần của chúng như quyền bỏ phiếu, trên Avai, chúng sẽ không đối phó với hậu quả bằng cách cắt giảm nếu người xác thực được bầu cử của chúng có cư xử bất ổn. Trong các hệ thống DPoS khác, các đại biểu có thể được đối tượng với việc sập.

Trong NPoS, các đại biểu sẽ trở thành người đề cử và sử dụng cổ phần của họ theo cách tương tự để đề cử các trình xác thực tiềm năng để đảm bảo mạng lưới. Stake được khóa trên chain, và ngược lại với DPoS, các người đề cử sẽ được thực hiện dựa trên hành vi độc hại tiềm năng của sự đề cử của họ. Trong sự quan trọng này, NPoS là một cơ chế giả mạo có tính năng hơn như là giả mạo mà "thiết lập và quên", như những người đề cử trông nom cho các nhà chỉ định cư xử tốt và xác thực được duy trì. Điều này cũng khuyến khích các trình xác thực để tạo các hoạt động xác thực để thu hút và duy trì sự đề cử.
