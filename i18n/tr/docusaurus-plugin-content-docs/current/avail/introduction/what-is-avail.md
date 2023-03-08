---
id: what-is-avail
title: Polygon'dan Avail
sidebar_label: Introduction
description: Polygon'un veri kullanılabilirlik zinciri hakkında bilgi edinin
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

# Polygon Avail {#polygon-avail}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Avail, lazer odaklı bir blok zinciridir: blok zinciri işlemlerini sipariş etmek ve kaydetmek ve blok verilerinin tüm blok için indirmeden mevcut olduğunu kanıtlamayı mümkün kılıyor. Bu da monolitik blok zincirlerinin yapamayacağı şekilde ölçeklendirilmesine izin verir.

:::info Sağlam, Genel Amaçlı Ölçeklenebilir Veri Kullanılabilirliği Katmanı

* Layer-2 çözümlerinin Avail'i kullanarak zincir dışı veri kullanılabilirliği ile to oluşturmak için kaldırarak daha fazla ölçeklenebilirlik verisi sunmasını sağlar.

* Bu sayede bağımsız zincirler veya yan işlemlerin gerçekleştirilmesi için keyfi bir yürütme ortamına sahip olan bağımsız zincirler ve yan zincirleri işlemin veri kullanılabilirliğini garanti ederek kendi doğrulayıcı ayarlarını oluşturup yönetmeye gerek kalmadan bootstrap doğrulayıcı güvenliğine olanak tanır.

:::

## Mevcut Kullanılabilirlik ve Ölçekleme Zorlukları {#current-availability-and-scaling-challenges}

### Veri kullanılabilirliği sorunu nedir? {#what-is-the-data-availability-problem}

Bir blok zinciri ağındaki eşler, yeni önerilen bir bloğun tüm verilerinin kullanılabilir olmasını sağlamak için
bir yola ihtiyaç duyar. Veri kullanılabilir değilse, blok, blok üreticisi tarafından gizlenen kötü amaçlı işlemler
içerebilir. Blok, kötü amaçlı olmayan işlemler içeriyor olsa bile,
bunları gizlemek sistemin güvenliğini tehlikeye atabilir.

### Avail'in veri kullanılabilirliğine yaklaşımı {#avail-s-approach-to-data-availability}

#### Yüksek Garanti {#high-guarantee}

Avail, verilerin mevcut olduğuna dair kanıtlanabilir ve yüksek düzeyde bir garanti sağlar. Hafif istemciler tüm bloğun indirilmeden sabit bir sayıda sorguda bulunabilirliği bağımsız olarak doğrulayabilirler.

#### Minimum Güven İhtiyacı {#minimum-trust}

Doğrulayıcı olmanıza veya tam bir düğüm barındırmanıza gerek yoktur. Hafif bir istemci ile bile, doğrulanabilir kullanılabilirlik elde edin.

#### Kullanımı Kolay {#easy-to-use}

Değiştirilmiş Substrate kullanılarak oluşturulan çözüm, ister bir uygulama barındırıyor olun
ister zincir dışı bir ölçekleme çözümü çalıştırıyor olun, kullanım kolaylığına odaklanır.

#### Zincir Dışı Ölçekleme için Mükemmel {#perfect-for-off-chain-scaling}

Verileri bizde tutarak ve L1'deki DA sorununu önleyerek zincir dışı ölçekleme çözümünüzün
tam ölçekleme potansiyelini ortaya çıkarın.

#### Yürütme Agnostik {#execution-agnostic}

Avail'i kullanan zincirler, uygulama mantığına bakılmaksızın her türlü yürütme ortamını uygulayabilir. Herhangi bir ortamdan yapılan işlemler desteklenmektedir: EVM, Wasm veya hatta henüz inşa edilmemiş yeni VM'ler. Avail, yeni yürütme katmanlarını denemek için mükemmeldir.

#### Bootstrapping Güvenliği {#bootstrapping-security}

Avail, yeni bir doğrulayıcı kümesini döndürmeye gerek kalmadan yeni zincirlerin oluşturulmasını sağlar ve bunun yerine Avail'in kaldıraç sağlar. Avail, basit işlem ücretleri (gas) karşılığında işlem sıralama, fikir birliği ve kullanılabilirliği ile ilgilenir.

#### NPos kullanarak hızlı kanıtlanabilir kesinlik {#fast-provable-finality-using-npos}

Atamalı Hisse Kanıtı ile hızlı kanıtlanabilir kesinlik. KZG commitment'ları
silme (erasure) kodlamasıyla desteklenmektedir.

Ethereum'u with ölçeklendirmek için [bu blog](https://blog.polygon.technology/polygon-research-ethereum-scaling-with-rollups-8a2c221bf644/) gönderisini kontrol ederek başlayın.

## Avail Destekli Validium'lar {#avail-powered-validiums}

Monolitik blok zincirlerinin (mevcut durumda Ethereum gibi) mimarisi nedeniyle blok zincirinin işletilmesi pahalıdır, bu da yüksek işlem ücretlerine neden olur. Rollups işlemleri, zincir dışı işlemlerin çalıştırılmasıyla yürütme yükünü çıkarmaya ve daha sonra yürütme sonuçlarını ve [genellikle sıkıştırılmış] işlem verilerini göndermeye çalışır.

Bu işlem verilerini göndermek yerine, bir kanıt/doğrulamanın yalnızca taban katmanına gönderildiği zincir dışı kullanılabilir tutulur. Bu durum en uygun maliyetli çözümdür, çünkü hem yürütme hem de veri kullanılabilirliği zincir dışı tutulurken, tabak 1 zincirinde nihai doğrulama ve yerleşime izin verilir.

Avail, veri kullanılabilirliği için optimize edilmiş bir blok zinciridir. Bir validium olmak isteyen herhangi bir rollup, işlem verilerini katman 1 yerine Avail'e gönderebilir ve doğru yürütmeyi doğrulamanın yanı sıra veri kullanılabilirliğini de doğrulayan bir doğrulama sözleşmesi uygulayabilir.

:::note Tasdik

Avail ekibi, bu veri kullanılabilirliği doğrulamasını Ethereum'a doğrudan veri kullanılabilirliği doğrulaması için bir doğrulama köprüsü oluşturarak Ethereum'da basit hale getirecektir. Bu durum doğrulama sözleşmesinin işini basit bir hale getirecektir, çünkü DA onayları zaten zincir üzerinde olacaktır. Bu köprü şu anda tasarımda bulunuyor; daha fazla bilgi için Avail ekibine ulaşın veya erken erişim programımıza katılın.

:::

## Ayrıca bakınız {#see-also}

* [Polygon'dan Avail ile Tanışın — Sağlam, Genel Amaçlı Ölçeklenebilir Veri Kullanılabilirliği Katmanı](https://polygontech.medium.com/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
* [Veri Kullanılabilirliği Sorunu](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
