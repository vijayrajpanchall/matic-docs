---
id: archive-node
title: Setup an Archive Node Using Binaries/Ansible
sidebar_label: Using Binaries/Ansible
description: Using binaries or ansible to set up an archive node.
keywords:
  - erigon
  - archive
  - node
  - binary
  - polygon
  - docs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## System Requirements

- 16-core CPU
- 64 GB RAM
- Basically io1 or above with at least 20k+ iops and RAID-0 based disk structure

## Configuration

To setup the Archive Node, you need to follow the same process for deploying a full node [using binaries](/operate/full-node-binaries.md) or [using Ansible](/operate/full-node-deployment.md).

However, it requires a minor configuration change. You should include the following parameter in the `start.sh` file:

```makefile
--gcmode 'archive'
```