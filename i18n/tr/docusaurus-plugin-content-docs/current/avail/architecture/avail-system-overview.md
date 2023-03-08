---
id: avail-system-overview
title: Sisteme Genel Bakış
sidebar_label: System Overview
description: Avail zincirinin mimarisini öğrenin
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

# Sisteme Genel Bakış {#system-overview}

## Modülerlik {#modularity}

Şu anda, Ethereum gibi monolitik blok zinciri mimarileri yürütme, yerleşim ve veri kullanılabilirliğini verimli bir şekilde ele alamaz.

Blok zincirlerini ölçeklendirmek için yürütmeyi modülerleştirmek, rollup merkezli zincir modellerinin yapmaya çalıştığı şeydir. Bu durum çözüm ve veri kullanılabilirliği katmanları aynı katmanda olduğunda iyi çalışabilir; bu da Ethereum rollups aldığı yaklaşımdır. Yine de, rollup'larla çalışırken gerekli ticari işlemler vardır, çünkü haddelenmiş konstrüksiyon veri kullanılabilirliği katmanının güvenliğine bağlı olarak daha güvenli olabilir, ancak doğal olarak ölçeklendirilmesi daha zor olacaktır.

Bununla birlikte, granül bir tasarım, mikro hizmetler gibi hafif protokoller için farklı katmanlar oluşturur. Daha sonra, genel ağ gevşek bir şekilde birleştirilmiş hafif protokollerden oluşan bir koleksiyon haline gelir. Bir örnek, yalnızca veri kullanılabilirliği konusunda uzmanlaşmış bir veri kullanılabilirliği katmanıdır. Polygon Avail, veri kullanılabilirliği için Substrat tabanlı bir katmandır.

:::info Substrate runtime

Avail, Substrat on dayansa da, blok yapısında diğer Substrat ağları ile etkileşimi engelleyen değişiklikler içerir. Avail, Polkadot veya Kusama ile ilişkili olmayan bağımsız bir ağ uygular.

:::

Avail, herhangi bir hafif istemciye veri kullanılabilirliği konusunda yüksek bir garanti sağlar, ancak müşterilere daha fazla garanti vermez. Avail, blok verilerinin Kate polynomial taahhütlerinden yararlanarak, silme kodlaması ve diğer teknolojilerden yararlanarak _blok_ verilerinin tüm bloğu indirilmeden kullanılabileceğini kanıtlamaya odaklanmaktadır. Bununla birlikte, [burada](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/) açıklanmış olan sahtekarlık kanıtı tabanlı DA sistemlerinden temelde farklı primitives vardır.

### Veri kullanılabilirliğinin sağlanması {#providing-data-availability}

DA garantisi, bir müşterinin kendisi için belirlediği bir şeydir; düğümlere güvenmek zorunda değildir. Hafif istemcilerin sayısı arttıkça, tüm bloğun tamamını toplu olarak they (her istemci sadece küçük bir yüzdeyi örneklese bile). Hafif istemciler sonunda kendi aralarında bir P2P ağı oluşturur; bu nedenle, bir blok örneklendikten sonra bu durum oldukça kullanılabilir hale gelir - yani düğümler aşağı inse bile (veya bir bloğu sansürlemeye kalkışsa bile), hafif istemciler parçaları kendi aralarında paylaşarak bloğun yeniden yapılandırılmasına olanak sağlar.

### Bir sonraki çözüm kümesini etkinleştirme {#enabling-the-next-set-of-solutions}

Avail, zincirlerin veri kullanılabilirliği bileşenini Avail'e tahsis edebileceği için bir sonraki seviyeye indirecektir. Avail ayrıca bağımsız bir zinciri önyükleme için alternatif bir yol sağlar, çünkü zincirler veri kullanılabilirliğini boşaltabilir. Elbette farklı modülerlik yaklaşımlarıyla yapılan ticari işlemlerin yapılması söz konusu değildir, ancak genel amaç, ölçeklendirme yapabilme becerisi kazanırken yüksek güvenliği korumaktır.

Ayrıca işlem maliyetleri de azalır. Avail, doğrulayıcı iş yükü üzerinde monolitik bir zincirden daha küçük bir etki ile blok boyutunu büyütebilir. Bir monolitik zincir blok boyutunu arttırdığında, doğrulayıcılar çok daha fazla iş yapmak zorundadır, çünkü bloklar yürütmek zorundadır ve durum hesaplanmalıdır. Avail'in yürütme ortamı olmadığı için, blok boyutunu artırmak çok daha ucuzdur. KZG taahhütlerini hesaplama ve kanıt oluşturma ihtiyacı nedeniyle maliyet, sıfır değildir, ancak yine de ucuzdur.

Avail, sovereign rollup'ları bir olasılık haline getirir. Kullanıcılar, işlem verileri ve sipariş üzerinde fikir birliğine ulaşmak için Avail'in doğrulayıcılarına güvenen egemen zincirler oluşturabilirler. Avail üzerindeki egemen rollups kesintisiz yükseltmelere izin verir, çünkü kullanıcılar zinciri yükseltmek için uygulamaya özgü düğümlere yönelik güncellemeleri itebilir ve sırayla yeni yerleşim mantığına yükseltilebilir. Oysa geleneksel bir ortamda, ağ bir çatala ihtiyaç duyar.

:::info Avail bir yürütme ortamına sahip değildir

Avail, akıllı sözleşmeler yapmaz ancak diğer zincirlerin işlem verilerini Avail'den temin edebilmesini sağlar. Bu zincirler yürütme ortamlarını her türlü şekilde uygulayabilir: EVM, Wasm veya başka bir şey.

:::

Avail'de veri kullanılabilirliği gerekli olan bir zaman penceresi için kullanılabilir. Örneğin, veri veya yeniden yapılandırma gerekmesinin ötesinde, güvenlik tehlikeye girmez.

:::info Avail, verilerin ne için olduğu ile ilgilenmez

Avail blok verilerinin mevcut olduğunu garanti eder, ancak bu verilerin ne olduğu umurumda değildir. Veriler işlem olabilir ancak diğer formları da alabilir.

:::

Öte yandan, depolama sistemleri, verileri uzun süre saklamak için tasarlanmıştır ve kullanıcıları verileri depolamaya teşvik etmek için teşvik mekanizmaları içerir.

## Doğrulama {#validation}

### Eş doğrulama {#peer-validation}

Tipik olarak bir ekosistem oluşturan üç tür eş vardır:

* **Doğrulayıcı düğümleri:** Bir doğrulayıcı mempool'dan işlemleri toplar, bunları çalıştırır ve ağa eklenen bir aday bloğu oluşturur. Bu blok, blok içindeki işlemlerin sindirimi ve meta verilerini içeren küçük bir blok başlığı içerir.
* **Tam düğümler:** Aday bloğu, doğrulama için ağ üzerinden tam düğümlere yayılır. Düğümler, aday blok içinde bulunan işlemleri yeniden yürütür.
* **Hafif istemciler:** Hafif istemciler yalnızca blok başlığını doğrulama için kullanacak şekilde getirebilir ve gerektiğinde komşu tam düğümlerden işlem bilgilerini alacaktır.

Güvenli bir yaklaşım olsa da, Avail, sağlamlık ve artan garantiler oluşturmak için bu mimarinin sınırlamalarını ele alır. Hafif istemciler, temel verileri kullanılamayan blokları kabul etmeleri için kandırılabilir. Bir blok üreticisi bir blok içinde kötü amaçlı bir işlem içerebilir ve tüm içeriğini ağa ifşa etmez. Avail dokümanlarında belirtildiği gibi, bu durum veri kullanılabilirliği sorunu olarak bilinir.

Avail'in ağ eşleri şunları içerir:

* **Doğrulayıcı düğümleri:** Protokol konsensüs içinde yer alan tam düğümleri teşvik etti. Avail'deki doğrulayıcı düğümleri işlemleri gerçekleştirmez. keyfi işlemleri paketleyip aday blokları oluşturarak KZG taahhütlerini **üretiyorlar. Diğer doğrulayıcılar oluşturulan blokların doğru olduğunu kontrol** ederler.

* **Avail'in (DA) tam düğümleri:** Avail'i kullanarak tüm uygulamalar için tüm blok verilerini indiren ve kullanıma sunan düğümler. Benzer şekilde, Avail tam düğümleri, işlemleri yürütmez.

* **Avail (DA) hafif istemcileri:** Sadece blok başlıklarını indiren istemciler, kullanılabilirliği doğrulamak için bloğun küçük parçalarını rastgele sample Avail ağı ile etkileşime geçmek için yerel bir API'yi ortaya çıkarırlar.

:::info Avail'in amacı, verileri kullanılabilir tutmak için tam düğümlere bağlı olmamaktır

Amaç, bir hafif istemciye tam düğüm olarak benzer DA garantisi vermektir. Kullanıcıların Avail hafif istemcilerini kullanmaları teşvik edilir. Bununla birlikte, Avail'in tam düğümlerini çalıştırabilirler, bu da iyi desteklenmektedir.

:::

:::caution Yerel API bir WIP'dir ve henüz kararlı değildir


:::

Bu sayede de hafif istemcisini gömmek için Avail kullanmak isteyen uygulamalara izin verilir. Daha sonra aşağıdakileri oluşturabilirler:

* **Uygulama tam düğümleri**
  - Avail (DA) hafif istemci gömme
  - Belirli bir appID için tüm verileri indirme
  - İşlemleri çalıştırmak için bir yürütme ortamı uygulama
  - Uygulama durumunu koruma

* **Uygulama ışığı istemcileri**
  - Avail (DA) hafif istemci gömme
  - Son kullanıcıya yönelik işlevsellik uygulama

Avail ekosistemi, belirli kullanım durumlarını etkinleştirmek için köprüler de içerecektir. Bu dönemde tasarlanan bu köprü, Avail üzerinde bulunan verilerin Ethereum'a ait doğrulanmasını yayınlayacak ve böylece validiums. oluşturulmasına izin verecek bir _doğrulama_ köprüsüdür.

## Durum doğrulama {#state-verification}

### Blok doğrulama → DA doğrulaması {#da-verification}

#### Doğrulayıcılar {#validators}

Uygulama durumunu doğrulayan Avail'in doğrulayıcısı yerine, gönderilen işlem verilerinin kullanılabilirliğini sağlamaya ve işlem siparişi vermeye odaklanır. Bir blok, ancak o bloğun arkasındaki veri kullanılabilir olduğunda geçerli kabul edilir.

Avail'in doğrulayıcıları gelen işlemleri alır, sipariş eder, bir aday bloğunu oluşturur ve ağa teklif eder. Bu blok, özellikle de DA—erasure kodlaması ve KZG taahhütleri için özel özellikler içerir. Bu belirli bir formattadır, böylece müşteriler rastgele örneklemeyi yapabilir ve yalnızca tek bir uygulamanın işlemlerini indirebilirler.

Diğer doğrulayıcılar, bloğun iyi biçimlendirildiğinden, KZG commitment'larının denetlendiğinden,
verilerin orada olduğundan vb. emin olarak bloğu doğrular.

#### İstemciler {#clients}

Verilerin mevcut olmasını talep eden blok üreticilerinin blok başlıklarını bırakmasını önler, çünkü bu durum müşterilerin uygulamalarının durumunu hesaplamak için gerekli işlemleri okumalarını engeller. Diğer zincirlerde olduğu gibi, Avail, bu durumu silme kodlarını kullanan DA kontrolleri üzerinden ele almak için veri kullanılabilirliği doğrulamasını kullanır; bu kontroller veri fazlalığı tasarımında yoğun olarak kullanılır.

Silme kodları verileri etkin bir şekilde çoğaltır ve bir bloğun bir parçası bastırılırsa istemciler bu parçayı bloğun bir bölümünü kullanarak yeniden yapılandırabilirler. Bu, o bölümü gizlemeye çalışan bir düğümün, daha fazlasını gizlemesi gerektiği anlamına gelir.

> Bu teknik, CD-ROM'lar ve çoklu disk (RAID) dizileri gibi cihazlarda kullanılır (örneğin,
> bir sabit sürücü ölürse, diğer diskteki veriler sayesinde değiştirilebilir ve yeniden oluşturulabilir).

Avail ile ilgili benzersiz olan şey, zincir tasarımının **herkesin** verileri indirmeye gerek kalmadan DA 'yı kontrol etmesine izin vermesidir. DA kontrolleri her bir ışık istemcisinin zincirdeki her bloktan en az sayıda rastgele parçayı örneklemesini gerektirir. Bir dizi hafif istemci bu şekilde tüm blok zincirini toplu olarak örnekleyebilir. Sonuç olarak, konsensüs dışı düğümler ne kadar çok olursa, blok boyutu (ve verim oranı) o kadar büyük bir güvenle bulunabilir. Bu anlamda, konsensüs dışı düğümler ağın verim ve güvenliğine katkıda bulunabilir.

### İşlem mutabakatı {#transaction-settlement}

Avail, Polygon Ede ile oluşturulmuş bir mutabakat katmanı kullanacaktır. Yerleşim katmanı, rollup'ların verilerini depolaması ve uyuşmazlık çözümü için EVM uyumlu bir blok zinciri sağlar. Yerleşim katmanı Polygon Avail için de kullanılır. Rollup'lar bir yerleşim katmanı kullandıklarında, Avail'in tüm DA özelliklerini de miras alırlar.

:::note Mutabakatın farklı yolları

Avail'i kullanmanın farklı yolları vardır ve validiums yerleşim katmanını kullanmaz, aksine Ethereum'a yerleşir.

:::

Avail, veri barındırma ve sıralama sunar. Yürütme katmanı muhtemelen birden fazla zincir dışı ölçeklendirme çözümünden veya eski yürütme katmanlarından gelecektir. Yerleşim katmanı doğrulama ve anlaşmazlık çözümü bileşenini alır.

## Kaynaklar {#resources}

- [Polygon tarafından Avail'e giriş](https://medium.com/the-polygon-blog/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048).
- [Polygon Talks: Polygon Avail](https://www.youtube.com/watch?v=okqMT1v3xi0)
