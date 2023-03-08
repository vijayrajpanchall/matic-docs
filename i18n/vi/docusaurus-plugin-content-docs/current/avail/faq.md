---
id: faq
title: Câu hỏi Thường Gặp
sidebar_label: FAQ
description: Những câu hỏi thường gặp về Polygon Avail
keywords:
  - docs
  - polygon
  - avail
  - availability
  - client
  - consensus
  - faq
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: faq
---

# Thường xuyên được hỏi {#frequently-asked-questions}

:::tip

Nếu bạn không tìm thấy câu hỏi của bạn trên trang này, vui lòng gửi câu hỏi của bạn về **[<ins>máy chủ Discord Polygon</ins>](https://discord.gg/jXbK2DDeNt)**

:::

## Máy khách nhẹ là gì? {#what-is-a-light-client}

Khách hàng Ánh sáng cho phép người dùng tương tác với mạng blockchain mà không cần đồng bộ với blockchain toàn bộ trong khi duy trì sự kiểm soát và bảo vệ. Nói chung, họ tải về đầu blockchain nhưng không phải nội dung của mỗi khối. Sự sáng (DA) thông tin với khách hàng thông tin về chất lượng khối có sẵn trong số đó bằng cách thực hiện Sampling, một kỹ thuật nơi các phần ngẫu nhiên nhỏ của một khối được tải về.

## Trường hợp sử dụng phổ biến của máy khách nhẹ là gì? {#what-is-a-popular-use-case-of-a-light-client}

Có nhiều trường hợp sử dụng ngày nay dựa vào sự tương tác để duy trì một nút hoàn toàn, như vậy người dùng cuối của một blockchain không liên hệ trực tiếp với blockchain mà thay vào đó thông qua sự tương tác. Các khách hàng Ánh sáng có cho đến nay không phải là sự thay thế phù hợp cho kiến trúc này bởi chúng thiếu dữ liệu tính khả dụng dữ liệu. Sự cố giải quyết vấn đề này, vì vậy sẽ kích hoạt thêm nhiều ứng dụng để tham gia trực tiếp trên mạng blockchain mà không có sự tương tự. Mặc dù Alell hỗ trợ các nút đầy đủ, chúng tôi mong đợi hầu hết các ứng dụng sẽ không cần chạy một hoặc sẽ cần chạy ít hơn.

## Lấy mẫu tính khả dụng dữ liệu là gì? {#what-is-data-availability-sampling}

Khách hàng ánh sáng như khách hàng ánh sáng khác, chỉ tải về đầu tiên của blockchain. Tuy nhiên, chúng bổ sung thực hiện dữ liệu về việc thử nghiệm sẵn sàng: một kỹ thuật mà các phần nhỏ ngẫu nhiên của dữ liệu khối và xác nhận chúng là đúng. Khi kết hợp với mã hóa erasure và cam kết của Kate sẽ có thể cung cấp sự cố mạnh mẽ (gần 100%) đảm bảo về sự sẵn sàng mà không dựa vào các chứng cứ gian lận, và chỉ với một số lượng nhỏ của các queres.

## Mã hóa erasure được sử dụng như thế nào để tăng cường đảm bảo tính khả dụng dữ liệu? {#how-is-erasure-coding-used-to-increase-data-availability-guarantees}

Mã Erasure là một kỹ thuật mã số theo cách phát tán thông tin trên nhiều "mảnh vỡ", như vậy sự mất mát của một số mảnh vỡ đó có thể được chấp nhận. Điều đó, thông tin có thể được tái tạo từ những mảnh vỡ khác. Áp dụng cho blockchain, điều này có nghĩa là chúng ta sẽ tăng kích thước của mỗi khối, nhưng chúng ta ngăn chặn một diễn viên độc hại không thể giấu bất kỳ phần nào của khối lên kích thước mảnh vỡ màu đỏ.

Vì một diễn viên độc hại cần giấu một phần lớn của khối để cố gắng giấu thậm chí một giao dịch duy nhất, nó sẽ khiến việc thử nghiệm ngẫu nhiên sẽ bắt được các mảng lớn trong dữ liệu. Có hiệu quả, mã hóa dữ liệu sẽ làm cho việc làm cho việc thử nghiệm tương ứng mạnh mẽ hơn nhiều.

## Các cam kết Kate là gì? {#what-are-kate-commitments}

Cam kết Kate, được Aniket Kate, Gregory M. Zaverucha và Ian Goldberg giới thiệu vào năm 2010, mang đến
một cách cam kết với các đa thức theo cách cô đọng. Gần đây, cam kết đa thức đã trở thành nhân tố đi đầu,
chủ yếu được sử dụng làm các cam kết trong các cấu trúc không kiến thức (zero-knowledge) giống như PLONK.

Trong cấu trúc của mình, chúng tôi sử dụng cam kết Kate vì những lý do sau:

- Cam kết này cho phép chúng tôi cam kết các giá trị một cách ngắn gọn để lưu giữ bên trong tiêu đề khối.
- Có thể thực hiện các khoảng mở ngắn, giúp máy khách nhẹ xác minh tính khả dụng.
- Thuộc tính ràng buộc mật mã giúp chúng tôi tránh các bằng chứng gian lận bằng cách làm cho việc tính toán trở nên bất khả thi,
từ đó không thể tạo ra các cam kết sai.

Trong tương lai, chúng tôi có thể sử dụng các lược đồ cam kết đa thức khác, nếu các lược đồ đó mang lại cho chúng tôi giới hạn hoặc sự đảm bảo tốt hơn.

## Vì Avail được sử dụng bởi nhiều ứng dụng, điều đó có nghĩa là các chuỗi phải tải xuống các giao dịch từ các chuỗi khác? {#since-avail-is-used-by-multiple-applications-does-that-mean-chains-have-to-download-transactions-from-other-chains}

Không. Đầu phát Alell chứa một chỉ số cho phép một ứng dụng được đưa để xác định và tải về phần của một khối có dữ liệu cho ứng dụng đó. Vì vậy, chúng phần lớn không bị ảnh hưởng bởi các chuỗi khác bằng cách sử dụng Auclos cùng một lúc hoặc bởi kích thước khối

Ngoại lệ duy nhất là việc lấy mẫu tính khả dụng dữ liệu. Để xác thực dữ liệu có sẵn (và do bản chất của bộ mã erasur), máy tính khách lấy mẫu nhỏ của khối ở ngẫu nhiên, bao gồm có thể các phần chứa dữ liệu cho các ứng dụng khác.
