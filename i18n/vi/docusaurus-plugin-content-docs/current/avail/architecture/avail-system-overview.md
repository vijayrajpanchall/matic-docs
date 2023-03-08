---
id: avail-system-overview
title: Tổng quan Hệ thống
sidebar_label: System Overview
description: Tìm hiểu về kiến trúc của chuỗi Auclo.
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

# Tổng quan Hệ thống {#system-overview}

## Tính mô-đun {#modularity}

Hiện tại, các kiến trúc blockchain như Ethereum không thể xử lý hiệu quả được thực hiện, định cư và dữ liệu có ích.

Thực thi modularing để blockchains là điều mà mô hình chuỗi sự cố gắng thực hiện. Điều này có thể hoạt động tốt khi các lớp định cư và dữ liệu sẵn sàng nằm trên cùng một lớp, đó là phương pháp tiếp cận Ethereum nhận lấy. Tuy nhiên, vẫn có những sự trao đổi cần thiết khi làm việc với các cuộn băng, vì công trình xây dựng có thể đảm bảo hơn phụ thuộc vào sự bảo mật của lớp khả dụng của dữ liệu nhưng sẽ có nhiều thách thức hơn với quy mô

Tuy nhiên, một thiết kế granular tạo ra các lớp khác nhau để trở thành giao thức nhẹ như các vi dịch. Sau đó, mạng lưới tổng thể trở thành một bộ sưu tập các giao thức nhẹ đã kết hợp với nhau. Một ví dụ là một lớp có khả năng của dữ liệu mà chỉ đặc biệt trong sự sẵn sàng của dữ liệu. Polygon Alell là một lớp blockchain dựa trên nền tảng 2 blockchain cho dữ liệu có khả năng.

:::info Thời gian chạy Substrate

Mặc dù Aculle được dựa trên codebase, nó bao gồm sự thay đổi đối với cấu trúc khối ngăn chặn nó sẽ không liên hệ với các mạng Substrate khác. Avail triển khai một mạng độc lập không liên quan đến Polkadot hoặc Kusama.

:::

Aculp cung cấp sự đảm bảo dữ liệu cao về khả năng sử dụng cho bất kỳ máy khách nào Ánh sáng, nhưng không đảm bảo cao hơn cho khách hàng về DA hơn bất kỳ mạng lưới nào khác. Sự cố tập trung vào việc làm nó có thể chứng minh rằng dữ liệu khối có sẵn mà không tải về toàn bộ khối bằng sự cam kết của Kate polynom, mã hóa erasur, và các công nghệ khác để cho phép khách hàng ánh sáng (điều đó chỉ tải dữ liệu về sự cố về hiệu quả và ngẫu nhiên một lượng nhỏ của _khối_ để xác thực sự sẵn sàng của nó. Tuy nhiên, về cơ bản có những nguyên thủy khác nhau so với hệ thống DA bằng chứng gian lận, điều này được giải thích [ở đây](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/).

### Cung cấp tính khả dụng dữ liệu {#providing-data-availability}

Bảo đảm DA là một thứ mà máy khách tự quyết định; nó không cần phải tin vào các nút Khi số lượng khách hàng ánh sáng phát triển, chúng lấy mẫu chung trong khối (mặc dù mỗi khách hàng chỉ lấy mẫu phần trăm nhỏ). Khách hàng Ánh sáng cuối cùng cũng hình thành một mạng P2P giữa nhau; vì vậy, sau khi khối đã được xác thực, nó sẽ trở thành sự khả năng có mặt - dù các nút được giảm (hoặc cố gắng kiểm duyệt một block), các khách hàng ánh sáng sẽ có thể tái tạo lại khối bằng cách chia sẻ các mảnh ghép giữa nhau.

### Mở ra bộ giải pháp tiếp theo {#enabling-the-next-set-of-solutions}

Aculle sẽ lấy sự lăn lên mức tiếp theo như sự xích có thể phân bổ thành phần có khả năng sử dụng dữ liệu của họ cho Avai. Aculle cũng cung cấp một cách thay thế để khởi động bất kỳ chuỗi đứng nào trong tay, vì sự xích có thể kích hoạt dữ liệu của họ. Tất nhiên, có sự trao đổi được thực hiện với sự ủng hộ của mô-đun khác nhau, nhưng mục tiêu chung là duy trì sự bảo mật cao trong khi có thể cân nhắc.

Chi phí giao dịch cũng được giảm xuống. Aculle có thể phát triển kích thước khối với một tác động nhỏ hơn trên công việc xác thực hơn một chuỗi monolith. Khi chuỗi monolithic tăng kích thước khối , người xác thực phải làm nhiều việc hơn vì khối khối phải thực hiện, và trạng thái phải được tính toán. Vì Alell không có môi trường thực hiện, việc tăng kích thước khối thì sẽ rẻ hơn nhiều. Chi phí không phải là 0 vì sự cần thiết để tính toán các cam kết KZG và tạo ra các chứng cứ, nhưng vẫn không mắc tiền.

Avail còn khả thi hóa các rollup có chủ quyền. Người dùng có thể tạo chuỗi có chủ quyền dựa vào các trình xác thực của Available để đạt được sự đồng thuận trên dữ liệu giao dịch và trật tự. Sovereign rollups on Aculp cho phép nâng cấp sự cố định, vì người dùng có thể đẩy cập nhật đến các nút cụ thể ứng dụng để nâng cấp chuỗi và, thay đổi, nâng cấp cho logic định cư mới. Trong khi trong môi trường truyền thống, mạng yêu cầu một đợt phân nhánh.

:::info Avail không có môi trường thực thi

Aculp không chạy hợp đồng thông minh mà cho phép các chuỗi khác thực hiện dữ liệu giao dịch của họ có sẵn thông qua Available. Những chuỗi này có thể thực hiện môi trường thực thi của chúng bất kỳ loại nào: EVM, Wasm, hoặc bất kỳ thứ gì khác.

:::

Dữ liệu có sẵn trên Alell có sẵn trong một cửa sổ thời gian cần thiết. Ví dụ, ngoài việc cần dữ liệu hoặc tái thiết lại, bảo mật không bị lộ.

:::info Avail không quan tâm dữ liệu dùng để làm gì

Sự cố đảm bảo rằng dữ liệu khối có sẵn nhưng không quan tâm dữ liệu đó là gì. Dữ liệu có thể là giao dịch nhưng cũng có thể nhận được trên các dạng khác.

:::

Hệ thống lưu trữ, mặt khác, được thiết kế để lưu trữ dữ liệu trong thời gian dài, và bao gồm cơ chế khuyến khích người dùng lưu trữ dữ liệu.

## Xác thực {#validation}

### Xác thực ngang hàng {#peer-validation}

Ba loại ngang hàng thường tạo nên một hệ sinh thái:

* **Các nút xác thực:** Một trình xác thực thu thập các giao dịch từ mempool, thực thi chúng, và tạo ra một khối ứng cử viên được ứng cử ứng cử sẽ được ứng dụng cho mạng lưới. Khối chứa một đầu khối nhỏ với số lượng lớn nhất và metata của các giao dịch trong khối.
* **Các nút đầy đủ:** Khối ứng cử viên tuyên truyền cho các nút đầy đủ trên mạng để xác thực. Các nút sẽ thực thi lại các giao dịch có trong khối ứng viên.
* **Khách hàng Ánh sáng:** Khách hàng Ánh sáng chỉ đưa người đầu mối khối để sử dụng để xác thực và sẽ đưa thông tin giao dịch từ các nút đầy đủ khi cần.

Trong khi một phương pháp tiếp cận an toàn, Aculp sẽ địa chỉ các giới hạn của kiến trúc này để tạo sự hủy hoại và sự đảm bảo tăng Khách hàng Ánh sáng có thể bị lừa vào việc chấp nhận các khối số liệu cơ bản mà không có khả năng. Một nhà sản xuất khối có thể bao gồm một giao dịch độc hại trong một khối và không tiết lộ toàn bộ nội dung của nó cho mạng lưới. Như đã đề cập trong các tài liệu Acul, điều này được gọi là vấn đề về dữ liệu.

Các yếu tố ngang hàng mạng của Avail bao gồm:

* **Các nút kiểm tra:** Giao thức được ưu đãi đầy đủ các nút tham gia vào sự đồng thuận. Các nút kiểm tra trên Aculp không thực hiện được giao dịch. Chúng gói các giao dịch tùy tiện và khối ứng cử viên xây dựng, tạo ra sự cam kết KZG cho dữ liệu. **Các trình xác thực khác kiểm tra các khối đã tạo ra là chính xác**.

* **Alell (DA) đầy đủ các nút :** Nút tải về và tạo ra tất cả dữ liệu có sẵn sàng cho tất cả các ứng dụng bằng Sẵn. Tương tự, các nút đầy đủ của Avail không thực thi giao dịch.

* **Khách hàng ánh sáng (DA) Ánh sáng:** Khách hàng chỉ tải về số lượng đầu khối ngẫu nhiên mẫu nhỏ của khối để xác thực sự có. Họ vạch trần một API cục bộ để tương tác với mạng Alell.

:::info Mục tiêu của Avail là không phụ thuộc vào các nút đầy đủ để duy trì tính khả dụng dữ liệu

Mục đích là cung cấp sự đảm bảo tương tự cho một máy khách nhẹ như một nút hoàn toàn. Người dùng được khuyến khích sử dụng các máy khách nhẹ Avail. Tuy nhiên, họ vẫn có thể chạy Aculp đầy đủ các nút được hỗ trợ rất tốt.

:::

:::caution API cục bộ là một WIP và chưa ổn định


:::

Điều này cho phép các ứng dụng muốn sử dụng Aculi để phát hiện sự kiện cho khách hàng ánh sáng DA Sau đó, các ứng dụng này có thể xây dựng:

* **Ứng dụng nút đầy đủ**
  - Nhúng máy khách nhẹ Avail (DA)
  - Tải xuống tất cả dữ liệu cho một ID ứng dụng cụ thể
  - Triển khai một môi trường thực thi để chạy các giao dịch
  - Duy trì trạng thái ứng dụng

* **Ứng dụng khách hàng ánh sáng**
  - Nhúng máy khách nhẹ Avail (DA)
  - Triển khai chức năng giao diện người dùng cuối

Hệ sinh thái Aculp cũng sẽ có những cây cầu để kích hoạt các trường hợp sử dụng cụ thể. Một cây cầu như vậy được thiết kế vào thời điểm này là một _cây cầu attestation_ sẽ đăng bài phát triển của dữ liệu có sẵn trên Acup đến Ethereum, do đó cho phép sự tạo ra của các valium.

## Xác minh trạng thái {#state-verification}

### Xác thực khối → xác thực DA {#da-verification}

#### Người xác thực {#validators}

Thay vì trình xác thực Alell xác thực trạng thái ứng dụng, họ tập trung vào việc đảm bảo sự sẵn sàng của dữ liệu giao dịch được đăng và cung cấp thứ tự giao dịch. Một khối chỉ được coi là hợp lệ nếu dữ liệu đằng sau khối đó khả dụng.

Xác thực sự sẽ thực hiện trên các giao dịch đang đến, trật tự, xây dựng một khối ứng dụng, và đề xuất mạng lưới. Khối chứa các tính năng đặc biệt, đặc biệt là cho mã hóa DA- erasure và sự cam kết KZG. Đây là một định dạng đặc biệt, vì vậy khách hàng có thể thực hiện các thử nghiệm ngẫu nhiên và tải về chỉ có một giao dịch của ứng dụng.

Những người xác thực khác xác minh khối bằng cách đảm bảo khối được hình thành tốt, các cam kết KZG
được kiểm tra, dữ liệu có sẵn, v.v.

#### Máy khách {#clients}

Dữ liệu cần thiết để có thể có được sự ngăn chặn người sản xuất không phát hành các header mà không phát hành dữ liệu đằng sau chúng, vì điều này ngăn chặn khách hàng đọc các giao dịch cần thiết để tính toán tình trạng ứng dụng của họ. Như với các chuỗi khác, Aculp sử dụng dữ liệu có khả năng xác thực để xác thực thông qua kiểm tra DA mà sử dụng mã erasur; các kiểm tra này được sử dụng rất nhiều trong thiết kế báo cáo dữ liệu.

Mã Erasure sao chép một cách hiệu quả để nếu một phần của khối bị nén lại, máy khách có thể tái tạo lại phần đó bằng cách sử dụng một phần khác của khối Điều này có nghĩa là một nút cố gắng ẩn phần đó sẽ cần phải ẩn nhiều hơn nữa.

> Kỹ thuật này được sử dụng trong các thiết bị như CD-ROM và mảng đa đĩa (RAID) (ví dụ:
> nếu một ổ cứng bị chết, ổ đó có thể được thay thế và xây dựng lại từ dữ liệu trên các đĩa khác).

Điều đặc biệt về Aculle là thiết kế chuỗi cho phép **bất kỳ ai** kiểm tra DA mà không cần tải dữ liệu. Kiểm tra DA yêu cầu mỗi máy khách ánh sáng để lấy mẫu một số lượng nhỏ nhất từ mỗi khối trong máy. Một bộ phận khách hàng ánh sáng có thể xác thực mẫu mẫu toàn bộ blockchain theo cách này. Sau đó, các nút không đồng thuận càng nhiều, kích thước khối càng lớn (và thông qua) có thể tồn tại. Nghĩa là, các nút không đồng thuận có thể góp phần vào sự thông qua và bảo mật của mạng lưới.

### Dàn xếp giao dịch {#transaction-settlement}

Avail sẽ sử dụng lớp dàn xếp được xây dựng bằng Polygon Edge. Lớp định cư cung cấp một block-tương thích với EVM để lưu trữ dữ liệu của họ và thực hiện độ phân giải tranh chấp. Lớp định cư sử dụng Polygon Aulch cho DA. Khi cuộn đang sử dụng một tầng định cư, chúng cũng thừa hưởng tất cả tài sản DA của Avai.

:::note Dàn xếp theo những cách khác nhau

Có nhiều cách khác nhau để sử dụng Avai, và các validium sẽ không sử dụng lớp định cư, mà thay vì định cư trên Ethereum.

:::

Avail cung cấp dịch vụ lưu trữ và xếp thứ tự dữ liệu. Lớp thực thi có thể đến từ nhiều giải pháp cắt lớp hoặc lớp thực thi di sản. Lớp định cư sẽ nhận trên thành phần giải quyết và tranh chấp.

## Tài nguyên {#resources}

- [Giới thiệu với Alell by Polygon](https://medium.com/the-polygon-blog/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048).
- [Polygon Talks: Polygon Avail](https://www.youtube.com/watch?v=okqMT1v3xi0)
