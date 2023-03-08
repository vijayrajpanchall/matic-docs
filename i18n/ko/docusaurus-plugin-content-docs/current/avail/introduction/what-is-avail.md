---
id: what-is-avail
title: Polygon의 Avail
sidebar_label: Introduction
description: Polygon의 데이터 가용성 체인에 대해 자세히 알아봅니다
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

# Polygon Availe {#polygon-avail}

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Avail은 데이터 가용성에 초점을 맞춘 블록체인으로서 주문하고 기록하는 것을 주문하고 전체 블록을 다운로드하고 기록하는 등 블록 데이터를 다운로드하지 않고 블록 데이터가 있음을 증명할 수 있습니다. 이를 통해 모노리딕 블록체인이 사용할 수 없는 방식으로 크기를 조정할 수 있습니다.

:::info 강력한 범용의 확장 가능한 데이터 저장소

* Avail을 활용하여 확장 가능 처리량 을 제공할 수 있습니다.

* 임의 실행 환경을 가진 독립형 체인과 sidechains를 사용하여 트랜잭션 데이터 가용성을 보장함으로써 자신의 유효성 검사를 생성하고 관리할 필요가 없는 부팅 가능한 보안 기능을 사용할 수 있습니다.

:::

## 현재의 가용성 및 스케일링 과제 {#current-availability-and-scaling-challenges}

### 데이터 가용성 문제란 무엇입니까? {#what-is-the-data-availability-problem}

블록체인 네트워크 상의 피어는 새로 제안된 블록의 모든 데이터를 즉시 이용할 수 있어야
합니다. 데이터를 이용할 수 없는 경우, 블록 프로듀서가 숨긴 악의적인 트랜잭션이 블록에 포함되어 있을 수도 있습니다. 설사 블록의 트랜잭션이 악의적인 것이 아니라고 하더라도,
이를 숨기는 것은 시스템 보안에 손상을 입힐 수 있습니다.

### 데이터 가용성에 대한 Avail의 접근 방식 {#avail-s-approach-to-data-availability}

#### 높은 보증 {#high-guarantee}

Avail은 데이터를 사용할 수 있다는 증명적이고 높은 수준의 보증을 제공합니다. 라이트 고객은 전체 블록을 다운로드하고 싶지 않고 일정한 수의 질의에서 가용성을 지속적으로 확인할 수 있습니다.

#### 최소 신뢰 {#minimum-trust}

유효성 검사자가 되거나 전체 노드를 호스팅할 필요가 없습니다. 가벼운 클라이언트에도 불구하고 검증 가능 가용성을 얻을 수 있습니다.

#### 쉬운 사용 {#easy-to-use}

이 솔루션은 수정된 Substrate를 사용해 구축되어, 애플리케이션을 호스트하거나 또는 오프체인 스케일링 솔루션을 운영할 때도 쉽게 사용할 수 있습니다.

#### 오프체인 스케일링에 적합 {#perfect-for-off-chain-scaling}

레이어-1의 데이터 가용성 문제를 방지하면서 데이터를 보관하여 오프체인 스케일링 솔루션의 장점을
최대한 활용하세요.

#### 모든 환경에서 실행 가능 {#execution-agnostic}

Avail을 사용하는 체인스는 응용 프로그램 논리와 관계없이 모든 유형의 실행 환경을 구현할 수 있습니다. EVM, Wasm, 또는 아직 구축되지 않은 새로운 VM을 지원합니다. Avail은 새로운 실행 레이어를 실험할 수 있도록 완벽합니다.

#### 자체 보안 {#bootstrapping-security}

Avail은 새로운 유효성 검사자 세트를 회전시킬 필요가 없이 새로운 체인을 생성할 수 있으며, 대신 효소의 레버리지를 활용할 수 있습니다. Avail은 간단한 트랜잭션 수수료(가스)를 대가로 트랜잭션 시퀀싱, 컨센서스 및 가용성을 관리합니다.

#### NPoS을 이용하여 신속하게 입증 가능한 완결성 {#fast-provable-finality-using-npos}

지명된 스테이크 증명을 통해 신속하게 완결성을 입증할 수 있습니다. KZG 커밋(KZG commitments)과
삭제 코딩(erasure coding)으로 지원됩니다.

Rollup과 함께 이더리움에 대한 스케일링에서 이 [블로그 게시물을](https://blog.polygon.technology/polygon-research-ethereum-scaling-with-rollups-8a2c221bf644/) 확인하여 시작하십시오.

## Avail로 지원되는 Validium {#avail-powered-validiums}

모노리딕 블록체인의 아키텍처로 인해 블록체인을 운영하는 것은 비용이 많이 듭니다. 롤업은 트랜잭션 오프 체인을 실행하여 실행 부담을 추출하고 실행 결과 및 [일반적으로 압축] 트랜잭션 데이터를 게시합니다.

Valiium은 다음 단계입니다. 트랜잭션 데이터를 게시하는 대신 Pro / atestation이 기본 레이어에 게시되는 offchain을 사용할 수 있습니다. 현재 실행과 데이터 가용성이 모두 오프체인에 유지되어 레이어 1 체인에서 최종 검증 및 합의를 허용하는 경우 이는 지금까지 가장 비용 효율적인 솔루션입니다.

Avail은 데이터 가용성에 최적화된 블록체인입니다. validium이 되고 싶은 모든 롤업은 계층 1을 대신하여 트랜잭션 데이터를 Avail에 게시하고 올바른 실행을 확인하는 것 외에도 검증 계약을 배포할 수 있습니다.

:::note 증명

Availe 팀은 증명 브리지를 구축하여 이더리움에 직접 데이터 가용성 테스트를 게시하여 Eythereum에 데이터 가용성 테스트를 게시함으로써 Ethyum에서 데이터 가용성 검증 단순하게 만들 것입니다. DA 검사가 이미 온체인에 있을 것이기 때문에 검증 계약의 작업을 간단한 작업으로 만들 것입니다. 이 다리는 현재 디자인입니다. 더 많은 정보를 보려면 Availe 팀에 연락하거나 초기 액세스 프로그램에 가입하십시오.

:::

## 기타 자료 {#see-also}

* [Polygon의 Avail 소개 - 강력한 범용의 확장 가능한 데이터 저장소](https://polygontech.medium.com/introducing-avail-by-polygon-a-robust-general-purpose-scalable-data-availability-layer-98bc9814c048)
* [데이터 가용성 문제](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
