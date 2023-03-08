---
id: faq
title: FAQ
sidebar_label: FAQ
description: Mga madalas itanong tungkol sa Polygon Avail
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

# Mga Madalas Itanong {#frequently-asked-questions}

:::tip

Kung hindi mo nahanap ang iyong tanong sa pahinang ito, please ang iyong tanong sa **[<ins>Polygon Avail Discord server</ins>](https://discord.gg/jXbK2DDeNt)**.

:::

## Ano ang ilaw kliyente? {#what-is-a-light-client}

Pinapayagan ng mga light client ang mga gumagamit na makipag-ugnayan sa isang network ng blockchain nang hindi kailangang i-sync ang buong blockchain habang pinapanatili ang desentralisasyon at seguridad. Sa pangkalahatan, nagda-download sila ng mga headers, ng mga taga-block, ngunit hindi ang mga nilalaman ng bawat block. additionally ng mga light client ng Avail (DA) na ang mga nilalaman ng block ay magagamit sa pamamagitan ng pagsasagawa ng Pag-save ng Data Sampling, isang pamamaraan kung saan na-download ang mga maliliit na random na seksyon ng isang block

## Ano ang isang tanyag na kaso ng paggamit ng isang magaan na kliyente? {#what-is-a-popular-use-case-of-a-light-client}

Maraming mga gumagamit ng mga kaso na umaasa ngayon sa isang tagapamagitan para mapanatili ang isang buong node, na ang mga end user ng isang blockchain ay hindi direktang nakikipag-ugnayan sa blockchain ngunit sa halip sa intermediary. Wala pang angkop na kapalit ang mga light clients para sa arkitektura na ito dahil nagkulang sila ng data pagkakaroon ng mga garantiya. Nilulutas ng Avail ang isyung ito, kaya nagpapagana ang mas maraming application na direktang lumahok sa network ng blockchain nang walang mga intermediaries. Kahit sinusuportahan ng Avail ang buong node, inaasahan naming hindi na kailangan ng karamihan sa mga application na magpatakbo ng isa, o kakailanganin pang magpatakbo ng mas kaunti.

## Ano ang data availability sampling? {#what-is-data-availability-sampling}

I-download lamang ang mga light clients ng Avail, tulad ng iba pang light clients, Gayunpaman, karagdagang nagsasagawa sila ng data availability sampling: isang pamamaraan na sapalarang samples ng mga maliliit na seksyon ng data ng block at nag-verify na tama ang mga ito. Kapag pinagsama sa erasure coding at Kate polinomial commitments, nagkakaroon ng malakas ang mga kliyente ng Avail (halos 100%) na garantiya ng availability nang hindi umaasa sa mga patunay ng pandaraya, at sa maliit na palagiang bilang ng mga query.

## Paano ginagamit ang erasure coding upang madagdagan ang mga garantiya sa pagkakaroon ng data? {#how-is-erasure-coding-used-to-increase-data-availability-guarantees}

Ang pag-coding ng Erasure ay isang pamamaraan na encodes ng data sa isang paraan na spreads out ng impormasyon sa maraming "shards", gayong ang pagkawala ng ilang bilang ng mga shard na iyon ay maaaring magparaya. Ibig sabihin, maaaring itayo muli ang impormasyon mula sa iba pang shards. Inilapat sa blockchain, nangangahulugan ito na epektibong dagdagan namin ang laki ng bawat block, ngunit pinipigilan namin ang isang malisyosong aktor na magawang itago ang anumang bahagi ng isang block hanggang sa kalabisan na laki ng shard.

Dahil kailangang itago ng isang malisyosong aktor ang isang malaking bahagi ng block para magtangka na itago ang kahit na isang solong transaksyon, mas malamang na mahuhuli ang random sampling sa data. Epektibo, ginagawang mas malakas ang of sampling technique ng data.

## Ano ang mga pangako ni Kate? {#what-are-kate-commitments}

Ang mga commitment ni Kate, na ipinakilala nina Aniket Kate, Gregory M. Zaverucha, at Ian Goldberg noong 2010, ay nagbibigay ng
paraan ay upang mag-commit sa mga polynomial sa maikling paraan. Kamakailan, nangunguna ang mga polynomial na commitment,
na pangunahing ginagamit bilang mga commitment sa zero na kaalaman na mga konstruksyong tulad ng PLONK.

Sa aming pagbubuo, ginagamit namin ang mga Kate commitment para sa mga sumusunod na dahilan:

- Nagbibigay-daan ito sa amin upang mag-commit sa mga value sa maikling paraan upang mapanatili sa loob ng block header.
- Posible ang mga maikling pagbubukas na tumutulong sa light client na mag-verify ng availability.
- Tumutulong ang cryptographic binding property sa atin na maiwasan ang mga panloloko kaugnay ng proof sa pamamagitan ng paggawa nitong hindi magagawa sa pagkalkula
para makabuo ng mga maling commitment.

Sa hinaharap, maaari kaming gumamit ng ibang polynomial commitment scheme, kung nagbibigay iyon sa amin ng mas mahusay na mga bound o garantiya.

## Dahil ang Avail ay ginagamit ng maramihan aplikasyon, ang ibig sabihin ba nito ay kailangang mag-download ng mga transaksyon mula sa ibang mga chain? {#since-avail-is-used-by-multiple-applications-does-that-mean-chains-have-to-download-transactions-from-other-chains}

Naglalaman ang mga header ng Avail ng index na nagpapahintulot sa isang ibinigay na application na matukoy at i-download lamang ang mga seksyon ng isang block na may data para sa application na iyon. Sa gayon, hindi sila naaapektuhan ng ibang chains gamit ang Avail nang sabay-sabay o sa mga laki ng block

Ang tanging pagbubukod ay ang data pagkakaroon sampling. Para ma-verify na magagamit ang data (at dahil sa likas na katangian ng erasure coding), sample ang mga kliyente ng maliliit na bahagi ng block sa random, kabilang ang mga posibleng seksyon na naglalaman ng data para sa iba pang application.
