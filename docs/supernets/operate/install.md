---
id: supernets-install
title: Installation
sidebar_label: Install binaries
description: "Steps on how to install the Supernet binaries."
keywords:
  - docs
  - polygon
  - edge
  - install
  - installation
---

import DownloadButton from '@site/src/data/DownloadButton';

This document highlights the different methods available to install the Polygon Supernet binaries.

We recommend that you refer to the installation method that is most applicable to you. Our suggestion is to use the pre-built releases and verify the provided checksums.

:::info Latest release: v0.8.1

**The latest stable test release is [v0.8.1](https://github.com/0xPolygon/polygon-edge/releases/tag/v0.8.1). 0.8.x is the first stable test release.**

:::

---

## Pre-built releases

To access the pre-built releases, visit the [GitHub Releases](https://github.com/0xPolygon/polygon-edge/releases) page for a list of releases. Polygon Edge provides cross-compiled AMD64/ARM64 binaries for Darwin and Linux.

<div class="download-container">
  <div class="download-text">
    <p>The appropriate download link will be selected based on your operating system and system architecture. Please note that Supernets currently supports only x86 architecture for Darwin and Linux systems. For optimal performance, we recommend running Supernets on a machine with native x86 architecture; running architecture emulation on non-native systems may result in decreased performance.</p>
  </div>
  <div class="download-button">
    <DownloadButton
      macDownloadUrl="https://github.com/0xPolygon/polygon-edge/releases/download/v0.8.1/polygon-edge_0.8.1_darwin_amd64.tar.gz"
      macArmDownloadUrl="https://github.com/0xPolygon/polygon-edge/releases/download/v0.8.1/polygon-edge_0.8.1_darwin_arm64.tar.gz"
      linuxDownloadUrl="https://github.com/0xPolygon/polygon-edge/releases/download/v0.8.1/polygon-edge_0.8.1_linux_amd64.tar.gz"
      linuxArmDownloadUrl="https://github.com/0xPolygon/polygon-edge/releases/download/v0.8.1/polygon-edge_0.8.1_linux_arm64.tar.gz"
      buttonText="Download Polygon Supernets"
    />
  </div>
</div>

## Docker image

To use Docker, you will need to have it installed on your system. If you haven't already installed Docker, you can follow the instructions on the
[official Docker website](https://www.docker.com/) for your operating system.

If you prefer to use Docker, you can access the official Polygon Edge Docker images hosted under the [0xpolygon registry](https://hub.docker.com/r/0xpolygon/polygon-edge) using the following command:

  ```bash
  docker pull 0xpolygon/polygon-edge:latest
  ```

## Build from source

To build from source, make sure that you have Go >=1.18 installed and properly configured before using go install. The stable branch is the branch of the latest release. Use the following commands to build from source:

  ```bash
  git clone https://github.com/0xPolygon/polygon-edge.git
  cd polygon-edge/
  go build -o polygon-edge .
  ```
