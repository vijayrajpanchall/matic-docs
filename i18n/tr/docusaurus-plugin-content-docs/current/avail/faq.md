---
id: faq
title: SSS
sidebar_label: FAQ
description: Polygon Avail hakkında sıkça sorulan sorular
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

# Sıkça Sorulan Sorular {#frequently-asked-questions}

:::tip

Bu sayfada sorunuzu bulamazsanız, lütfen sorunuzu **[<ins>Polygon Avail Discord sunucusunda</ins>](https://discord.gg/jXbK2DDeNt)** gönderin.

:::

## Hafif istemci (light client) nedir? {#what-is-a-light-client}

Hafif istemciler, kullanıcıların merkeziyetçilik ve güvenliği korurken tam blok zincirini senkronize etmek zorunda kalmadan bir blok zinciri ağı ile etkileşime girmelerine izin verir. Genel olarak, blok zinciri başlıklarını indirirler, ancak her bloğun içeriğini indirmezler. Avail (DA) hafif istemcileri, blok içeriğinin bir bloğun küçük rastgele bölümlerinin indirildiği bir teknik olan Veri Kullanılabilirliği Örneklemesi yaparak mevcut olduğunu doğrularlar.

## Hafif istemcinin genelde kullanıldığı durumlar nedir? {#what-is-a-popular-use-case-of-a-light-client}

Bugün bir tam düğüm için bir aracıya güvenen birçok kullanım vakası vardır; böylece bir blok zincirinin son kullanıcıları blok zinciri ile doğrudan iletişim kurmazlar, bunun yerine aracı aracılığıyla iletişim kurarlar. Hafif istemciler bu mimari için uygun bir yedek olmamıştır çünkü verilerden yoksun uygun bir alternatif olmadılar. Avail bu sorunu çözerek daha fazla uygulamanın blok zinciri ağına aracı olmadan doğrudan katılmasını sağlar. Avail tam düğümleri desteklemesine rağmen, çoğu uygulamanın bir tane çalıştırması gerekmeyecek veya daha az çalıştırması gerekecektir.

## Veri kullanılabilirliği örneklemesi nedir? {#what-is-data-availability-sampling}

Diğer hafif istemciler gibi Avail hafif istemciler de sadece blok zincirinin başlıklarını indirir. Bununla birlikte, veri kullanılabilirliği örnekleme işlemini de gerçekleştirirler: blok verisinin küçük bölümlerini rastgele olarak örnekleyen ve doğru olduklarını doğrulayan bir teknik. Silme kodlaması ve Kate polinomu taahhütleri ile birleştirildiğinde, Avail istemcileri sahtekarlık kanıtlarına güvenmeden ve sadece az bir sabit sayıda sorguya sahip olmak için güçlü (yaklaşık %100) garanti edebilirler.

## Silme kodlaması, veri kullanılabilirliği garantilerini artırmak için nasıl kullanılır? {#how-is-erasure-coding-used-to-increase-data-availability-guarantees}

Erasure kodlaması, verileri birden fazla "shar" üzerine bilgi dağıtacak şekilde kodlayan bir tekniktir, böylece bu parçacıkların bir kısmının kaybına tolerans gösterilebilir. Yani bu bilgiler diğer yaralardan yeniden yapılandırılabilir. Bu da blok zincirine uygulandığında her bloğun boyutunu etkili bir şekilde arttırdığımız anlamına gelir, ancak kötü amaçlı bir aktörün bir bloğun herhangi bir bölümünü gereksiz bir hard büyüklüğüne gizlemesini engeller.

Kötü amaçlı bir aktör, tek bir işlemi bile gizlemeye çalışmak için bloğun büyük bir bölümünü gizlemesi gerektiğinden, rastgele örneklemenin verideki büyük boşlukları yakalaması daha olasıdır. Etkili bir şekilde, silme kodlaması veri kullanılabilirliği örnekleme tekniğini çok daha güçlü hale getirir.

## Kate bağıtlılıkları (commitment) nedir? {#what-are-kate-commitments}

Aniket Kate, Gregory M. Zaverucha ve Ian Goldberg tarafından 2010'da ortaya çıkarılan Kate bağıtlılıkları,
polinomlara kısa ve öz bir şekilde bağıtlanma yolu sunmaktadır. Son zamanlarda, öncelikle PLONK benzeri sıfır bilgi yapılarında
bağıtlanmalar olarak kullanılan polinom bağıtlanmaları ön plana çıkmıştır.

Kendi yapımızda, Kate bağıtlanmalarını aşağıdaki nedenlerden dolayı kullanıyoruz:

- Bu bağıtlanmalar, blok başlığı içinde tutulacak değerlere kısa ve anlaşılır bir şekilde bağıtlanmamızı sağlamaktadır.
- Kısa açıklıklar oluşması mümkündür ve bunlar, bir hafif istemcinin kullanılabilirliği doğrulamasına yardım eder.
- Kriptografik bağlama özelliği, yanlış bağıtlanmalar üretmeyi yazılımsal açıdan olanaksız hale getirerek hile kanıtlarından
(fraud proof) kaçınmamıza yardımcı olur.

Gelecekte, bize daha iyi sınırlar veya garantiler sunarlarsa, diğer polinomsal bağıtlılık yöntemlerini de kullanabiliriz.

## Avail birçok uygulama tarafından kullanıldığından, bu, zincirlerin diğer zincirlerden işlemleri bilgisayara indirmeleri gerektiği anlamına mı geliyor? {#since-avail-is-used-by-multiple-applications-does-that-mean-chains-have-to-download-transactions-from-other-chains}

Hayır. Avail başlıkları belirli bir uygulamanın yalnızca bu uygulama için veri bulunan bir bloğun bölümlerini belirlemesine ve indirmesine izin veren bir endeks içerir. Bu nedenle, Avail'i kullanarak diğer zincirlerden büyük ölçüde etkilenmezler.

Bunun tek istisnası, veri kullanılabilirliği örneklemesidir. Verilerin mevcut olduğunu doğrulamak için (ve silme kodlamanın doğası gereği) istemciler bloğun küçük parçalarını rastgele örnekler, diğer uygulamalar için veri içeren bölümler de dahil olmak üzere.
