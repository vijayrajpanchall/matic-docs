---
id: avail-consensus
title: Avail Konsensüs
sidebar_label: Consensus
description: Avail'in konsensüs mekanizması hakkında bilgi edinin
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

# Avail Konsensüs {#avail-s-consensus}

## Veri kullanılabilirliği komiteleri {#data-availability-committees}

Şimdiye kadar, DA çözümlerini sağlama yaklaşımı genellikle bir DAC (veri kullanılabilirliği komitesi) üzerinden yapılmıştır. Bir DAC, ana zincire imzalar göndermekten ve zincir dışı verilerin kullanılabilirliğini teyit etmekten sorumludur. DAC, verilerin hazır olmasını sağlamalıdır.

Bir DAC yoluyla, ölçekleme çözümlerinde bir Validium'a ulaşmak için bir DAC'a bel bağlanır. DACs ilgili sorun, veri kullanılabilirliğinin verilerin depolanmasından ve doğru şekilde raporlanmasından sorumlu olan küçük bir komite grubu üzerinde güvenilir bir hizmet haline gelmesidir.

Avail bir DAC değil, fikir birliği mekanizmasına sahip gerçek bir blok zinciri ağıdır ve kendi doğrulayıcı düğümleri ve blok üreticileri kümesine sahiptir.

## Hisse Kanıtı {#proof-of-stake}

:::caution Mevcut doğrulayıcılar

Avail test ağının kullanılmaya başlanmasıyla
doğrulayıcılar Polygon tarafından dahili olarak işletilecek ve sürdürülecektir.

:::

Sık sistemlerinin geleneksel kanıtı, blok üretim yazarlarının blok üretmek için zincir üzerinde token (pay) bulundurmalarını gerektirmektedir, hesaplama kaynaklarına (iş).

Polygon'un ürünleri PoS (söz konusu kanıtı kanıtı) veya PoS'un bir modifikasyonu kullanır. Genellikle, en çok hisseye sahip geleneksel PoS sistemlerinde doğrulayıcılar ağın en çok etkisi ve kontrolü vardır.

Birçok ağ için bakım yapan sistemler, ödül varyansını azaltarak sermaye kazanımlarını en üst düzeye çıkarmak için zincir dışı havuzlar oluşturma eğilimindedir. Bu merkezileşme mücadelesi, token sahiplerinin ağ korumalarını en iyi şekilde temsil ettiklerini ve ağın çıkarlarını temsil ettiklerini bildiren havuzlar üzerinde yer alındığında hafifletir. Bu aynı zamanda doğrulayıcı güç konsantrasyonunu dağıtır; çünkü ağ üzerindeki genel hisse, yalnızca birebir ilişkiye güvenmek yerine birebir veya çok-çok bir ilişki olarak tahsis edilir.

Bu söz konusu kanıtın modifikasyonu genellikle DPoS (söz konusu işin delege kanıtı) veya NPoS (belirlenen risk kanıtı kanıtı) olarak adlandırılan delegasyon veya aday gösterilerek uygulanabilir. Polygon'un ölçeklendirme çözümleri, Polygon Avail'in de dahil olduğu bu gelişmiş mekanizmaları uyarladı.

Avail, blok doğrulamada bir modifikasyon içeren NPoS'i kullanır. Bu durumda aktörler hala doğrulayıcı ve aday göstericilerdir.

Ağırlığı olmayan istemciler de Avail üzerinde veri kullanılabilirliğine katkıda bulunabilmektedir. Mevcut konsensüs olarak doğrulayıcıların üçte ikisinin artı 1'inin geçerlilik için konsensüs sağlamasını gerektirir.

## Tayin Ediciler (Nominators) {#nominators}

Adaylar bir dizi aday Avail'i doğrulayıcısını kendi payına göre geri almayı seçebilirler. Bu doğrulayıcılar veri kullanılabilirliğini etkili bir şekilde sağlayacağını düşündükleri doğrulayıcıları aday göstereceklerdir.

## DPoS ve NPoS arasındaki fark {#difference-between-dpos-and-npos}

Yüz değere gelince, heyet ve adaylık aynı eyleme benzemektedir, özellikle de hevesli bir staker açısından Bununla birlikte, farklılıklar altta yatan konsensüs mekanizmalarına ve doğrulayıcı seçiminin nasıl gerçekleştiğine dayanmaktadır.

In bir seçme merkezli seçim sistemi, ağı güvence altına almak için sabit bir doğrulayıcı sayısını belirler. Delege edenler, oy verme gücü olarak kullanarak aday ağ doğrulayıcılarına karşı hisselerini devredebilirler. delege edebilirler. Delege edenler genellikle en yüksek on en yüksek seviyede doğrulayıcıları destekler, çünkü daha yüksek staked olan doğrulayıcılar daha yüksek bir seçim şansına sahiptir. En fazla oy alan delegeler ağın doğrulayıcısı haline gelir ve işlemleri doğrulayabilirler. Oylama gücü olarak kendi paylarını kullanırken Avail'de seçtikleri doğrulayıcının kötü davranması durumunda kesilerek sonuçlara maruz kalmazlar. Diğer DPoS sistemlerinde delege edenler kesilmeye maruz kalabilir.

In delege edenler adaylığa dönüşür ve bu sayede ağı güvence altına almak için potansiyel aday doğrulayıcıları aday gösterme konusunda benzer bir şekilde hisselerini kullanırlar. Stake zincirin üzerinde kilitlenir ve to aksine, adaylar adaylıklarının olası kötü amaçlı davranışlarına dayanarak kesilmeye maruz kalır. Bu bağlamda, NPoS "set ve unut" durgunluğun aksine daha proaktif bir staking mekanizmasıdır; çünkü adaylar iyi davranan ve sürdürülebilir doğrulayıcılar için dikkat ederler. Bu aynı zamanda doğrulayıcıları, adayları çekmek ve korumak için sağlam doğrulayıcı işlemleri oluşturmaları için teşvik eder.
