---
id: supernets-install
title: Installation
sidebar_label: Install binaries
description: "How to install Polygon Supernets."
keywords:
  - docs
  - polygon
  - edge
  - install
  - installation
---

This document highlights the different methods available to install the Polygon Supernets source.

We recommend that you refer to the installation method that is most applicable to you. Our suggestion is to use the pre-built releases and verify the provided checksums.

:::info Latest release: v0.7.3-beta3

**The latest release is the [v0.7.3-beta3](https://github.com/0xPolygon/polygon-edge/releases/tag/v0.7.3-beta3) pre-release.**

**The first stable release, v0.8.0, is scheduled for March 20th, 2023.**

:::

---

## Pre-built releases

To access the pre-built releases, visit the [GitHub Releases](https://github.com/0xPolygon/polygon-edge/releases) page for a list of releases. Polygon Edge provides cross-compiled AMD64/ARM64 binaries for Darwin and Linux.

## Docker image

If you prefer to use Docker, you can access the official Docker images hosted under the [hub.docker.com registry](https://hub.docker.com/r/0xpolygon/polygon-edge) using the following command:

```bash
docker pull 0xpolygon/polygon-edge:latest
```

## Build from source

To build from source, make sure that you have Go >=1.18 installed and properly configured before using go install. The stable branch is the branch of the latest release. Use the following commands to build from source:

```bash
git clone https://github.com/0xPolygon/polygon-edge.git
cd polygon-edge/
make build polygon-edge main.go
# mv the compiled binary to your execution path
sudo mv polygon-edge <execution-path>
```
