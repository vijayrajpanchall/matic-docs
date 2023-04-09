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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DownloadButton from '@site/src/data/DownloadButton';

This document outlines the different methods available for installing the Polygon Supernet binaries.

To install and run Supernets, you have several options. The tabs below provide guides for each installation method. You can choose to use pre-built releases, a Docker image, or build from source.

:::tip

We recommend using the pre-built releases and verifying the provided checksums for security. The Docker image is also a convenient option for containerized deployment. Building from source provides greater flexibility, but requires a suitable development environment.

:::

If you encounter any issues during the installation process, refer to the troubleshooting guide which will be available soon.

:::info Latest release: v0.8.1

**The latest stable test release is [v0.8.1](https://github.com/0xPolygon/polygon-edge/releases/tag/v0.8.1). 0.8.x is the first stable test release.**

Please note that Supernets currently supports only x86 architecture for Darwin and Linux systems. For optimal performance, we recommend running Supernets on a machine with native x86 architecture; running architecture emulation on non-native systems may result in decreased performance.

:::

<!-- ===================================================================================================================== -->
<!-- ===================================================================================================================== -->
<!-- ===================================================== GUIDE TABS ==================================================== -->
<!-- ===================================================================================================================== -->
<!-- ===================================================================================================================== -->

<Tabs
defaultValue="pre-built"
values={[
{ label: 'Pre-built releases', value: 'pre-built', },
{ label: 'Docker image', value: 'docker', },
{ label: 'Build from source', value: 'source', },
{ label: 'Troubleshoot', value: 'troubleshoot', },
]
}>

<!-- ===================================================================================================================== -->
<!-- ================================================ PRE-BUILT RELEASE ================================================== -->
<!-- ===================================================================================================================== -->

<TabItem value="pre-built">

<div class="download-container">
  <div class="download-text">
    <p>To access the pre-built releases, visit the <a href="https://github.com/0xPolygon/polygon-edge/releases" target="_blank">GitHub Releases</a> page for a list of releases. Polygon Edge provides cross-compiled AMD64/ARM64 binaries for Darwin and Linux. The appropriate download link will be selected based on your operating system.</p>
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

</TabItem>

<!-- ===================================================================================================================== -->
<!-- ================================================ PRE-BUILT RELEASE ================================================== -->
<!-- ===================================================================================================================== -->

<TabItem value="docker">

To use Docker, you will need to have it installed on your system. If you haven't already installed Docker, you can follow the instructions on the
[official Docker website](https://www.docker.com/) for your operating system.

You can access the official Polygon Edge Docker images hosted under the [0xpolygon registry](https://hub.docker.com/r/0xpolygon/polygon-edge) using the following command:

  ```bash
  docker pull 0xpolygon/polygon-edge:latest
  ```

</TabItem>

<!-- ===================================================================================================================== -->
<!-- ====================================================== SOURCE ======================================================= -->
<!-- ===================================================================================================================== -->

<TabItem value="source">

To build from source, make sure you have Go version 1.18 or earlier installed and properly configured. Please note that versions above 1.18 are not currently supported. Compatibility is being worked on and will be available in the near future. 

Use the following commands to clone the Polygon Edge repository and build from source:

  ```bash
  git clone https://github.com/0xPolygon/polygon-edge.git
  cd polygon-edge/
  go build -o polygon-edge .
  ```
</TabItem>

<!-- ===================================================================================================================== -->
<!-- ================================================== TROUBLESHOOT ===================================================== -->
<!-- ===================================================================================================================== -->

<TabItem value="troubleshoot">

Coming soon!

</TabItem>
</Tabs>
