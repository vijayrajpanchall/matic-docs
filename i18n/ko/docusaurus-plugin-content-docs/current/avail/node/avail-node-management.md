---
id: avail-node-management
title: Avail 노드 실행
sidebar_label: Run an Avail node
description: "Avail 노드를 실행하는 방법에 대해 알아봅니다"
keywords:
  - docs
  - polygon
  - avail
  - node
image: https://wiki.polygon.technology/img/thumbnail/polygon-avail.png
slug: avail-node-management
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip 일반적인 실행

사용자는 대부분 클라우드 서버에서 노드를 실행합니다. VPS 공급자를 사용하여 노드를 실행하는 것도 고려해보세요.

:::

## 기본 요건 {#prerequisites}

다음 하드웨어 목록은 사용자의 환경이 반드시 가지고 있어야 할 하드웨어 스펙의 권장사항
입니다.

하드웨어 스펙은 최소한 다음과 같아야 합니다.

* 4GB RAM
* 2 core CPU
* 20-40 GB SSD

:::caution 유효한 날짜를 실행하려는 경우

Substrate 기반 체인에 유효성 검사자를 실행하기 위한 하드웨어 권장 사항:

* CPU - Intel(R) Core(TM) i7-7700K CPU @ 4.20GHz
* 저장 - 약 256GB NVMe SSD. 블록체인의 성장을 고려한 합리적인
사이즈가 필요합니다.
* 메모리 - 64GB ECC

:::

### 노드 전제 조건: Rust 및 종속 항목 설치 {#node-prerequisites-install-rust-dependencies}

:::info Substrate별 설치 단계

Avail은 Substrate 기반 체인이며 Substrate 체인을 실행하는 것과 동일한 설정이 필요합니다.

설치에 대한 추가적인 설명서는 Substrate
**[시작 설명서](https://docs.substrate.io/v3/getting-started/installation/)**를 참조하세요.

:::

노드를 실행하기 위한 환경을 선택했으면 Rust가 설치되었는지 확인하세요.
Rust가 이미 설치된 경우, 다음 명령을 실행해 최신 버전을 사용 중인지 확인하세요.

```sh
rustup update
```

그렇지 않은 경우, 다음 명령을 실행해 Rust의 최신 버전을 가져옵니다.

```sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

셸을 설정하려면, 다음을 실행하세요.

```sh
source $HOME/.cargo/env
```

다음을 통해 설치를 확인하세요.

```sh
rustc --version
```

## Avail을 로컬에서 실행하기 {#run-avail-locally}

[Avail 소스 코드](https://github.com/maticnetwork/avail)를 복제합니다.

```sh
git clone git@github.com:maticnetwork/avail.git
```

소스 코드를 컴파일합니다.

```sh
cargo build --release
```

:::caution 이 프로세스는 대개 시간이 걸립니다

:::

임시 데이터스토어가 있는 로컬 dev 노드를 실행합니다.

```sh
./target/release/data-avail --dev --tmp
```
