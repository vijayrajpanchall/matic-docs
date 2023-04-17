---
id: full-node-binaries
title: Run a Full Node using Binaries
sidebar_label: Using Binaries
description: Deploy a Full Polygon Node using binaries
keywords:
  - docs
  - matic
  - polygon
  - node
  - binaries
  - deploy
  - run full node
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

This tutorial guides you through starting and running a full node using binaries. For the system requirements, see the [Minimum Technical Requirements](technical-requirements.md) guide.

:::tip Snapshots

Steps in this guide involve waiting for the Heimdall and Bor services to fully sync. This process takes several days to complete.

Please use snapshots for faster syncing without having to sync over the network. For detailed instructions, see [<ins>Snapshot Instructions for Heimdall and Bor</ins>](/operate/snapshot-instructions-heimdall-bor.md).

For snapshot download links, see the [<ins>Polygon Chains Snapshots</ins>](https://snapshots.polygon.technology/) page.

:::

## Overview

- Prepare the machine
- Install Heimdall and Bor binaries on the full node machine
- Set up Heimdall and Bor services on the full node machine
- Configure the full node machine
- Start the full node machine
- Check node health with the community

:::note

You have to follow the exact outlined sequence of actions, otherwise you will run into issues.

:::

### Install `build-essential`

This is **required** for your full node. In order to install, run the below command:

```bash
sudo apt-get update
sudo apt-get install build-essential
```

## Install Binaries

Polygon node consists of 2 layers: Heimdall and Bor. Heimdall is a tendermint fork that monitors contracts in parallel with the Ethereum network. Bor is basically a Geth fork that generates blocks shuffled by Heimdall nodes.

Both binaries must be installed and run in the correct order to function properly.

### Heimdall

Install the latest version of Heimdall and related services. Make sure you checkout to the correct [release version](https://github.com/maticnetwork/heimdall/releases). Note that the latest version, [Heimdall v.0.3.3](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.3), contains enhancements such as:
1. Restricting data size in state sync txs to:
    * **30Kb** when represented in **bytes**
    * **60Kb** when represented as **string**
2. Increasing the **delay time** between the contract events of different validators to ensure that the mempool doesn't get filled very quickly in case of a burst of events which can hamper the progress of the chain.

The following example shows how the data size is restricted:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

To install **Heimdall**, run the below commands:

```bash
curl -L https://raw.githubusercontent.com/maticnetwork/install/main/heimdall.sh | bash -s -- <heimdall_version> <network_type> <node_type>
```

**heimdall_version**: `valid v0.3+ release tag from https://github.com/maticnetwork/heimdall/releases`
**network_type**: `mainnet` and `mumbai`
**node_type**: `sentry`

That will install the `heimdalld` and `heimdallcli` binaries. Verify the installation by checking the Heimdall version on your machine:

```bash
heimdalld version --long
```

### Configure heimdall seeds (Mainnet)

```bash
sed -i 's|^seeds =.*|seeds = "2a53a15ffc70ad41b6876ecbe05c50a66af01e20@3.211.248.31:26656,6f829065789e5b156cbbf076f9d133b4d7725847@3.212.183.151:26656,7285a532bad665f051c0aadc31054e2e61ca2b3d@3.93.224.197:26656,0b431127d21c8970f1c353ab212be4f1ba86c3bf@184.73.124.158:26656,f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,31b79cf4a628a4619e8e9ae95b72e4354c5a5d90@44.232.55.71:26656,a385dd467d11c4cdb0be8b51d7bfb0990f49abc3@35.199.4.13:26656,daad548c0a163faae1d8d58425f97207acf923fd@35.230.116.151:26656,81c76e82fcc3dc9a0a1554a3edaa09a632795ea8@35.221.13.28:26656"|g' /var/lib/heimdall/config/config.toml
chown heimdall /var/lib/heimdall
```

### Configure heimdall seeds (Mumbai)

```bash
sed -i 's|^seeds =.*|seeds = "e72c0466a02ea43b2198bd3a9454b87a3ef0d77e@54.147.31.250:26656,b302d1ddb21102e794b524d05152a7834da05bd1@34.226.134.117:26656,9dfc12d9f39257cefc3d57a4d7302586e59a994e@18.213.200.99:26656"|g' /var/lib/heimdall/config/config.toml
chown heimdall /var/lib/heimdall
```

### Bor install

Install the latest version of Bor, based on valid v0.3+ [released version](https://github.com/maticnetwork/bor/releases).

```bash
curl -L https://raw.githubusercontent.com/maticnetwork/install/main/bor.sh | bash -s -- <bor_version> <network_type> <node_type>
```

**bor_version**: `valid v0.3+ release tag from https://github.com/maticnetwork/bor/releases`
**network_type**: `mainnet` and `mumbai`
**node_type**: `sentry`

That will install the `bor` binary. Verify the installation by checking the Bor version on your machine:

```bash
bor version
```

### Configure bor seeds (mainnet)

```bash
sed -i 's|.*\[p2p.discovery\]|  \[p2p.discovery\] |g' /var/lib/bor/config.toml
sed -i 's|.*bootnodes =.*|    bootnodes = ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303","enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303","enode://4be7248c3a12c5f95d4ef5fff37f7c44ad1072fdb59701b2e5987c5f3846ef448ce7eabc941c5575b13db0fb016552c1fa5cca0dda1a8008cf6d63874c0f3eb7@3.93.224.197:30303","enode://32dd20eaf75513cf84ffc9940972ab17a62e88ea753b0780ea5eca9f40f9254064dacb99508337043d944c2a41b561a17deaad45c53ea0be02663e55e6a302b2@3.212.183.151:30303"]|g' /var/lib/bor/config.toml
chown bor /var/lib/bor
```

### Configure bor seeds (mumbai)

```bash
sed -i 's|.*\[p2p.discovery\]|  \[p2p.discovery\] |g' /var/lib/bor/config.toml
sed -i 's|.*bootnodes =.*|    bootnodes = ["enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303","enode://f0f48a8781629f95ff02606081e6e43e4aebd503f3d07fc931fad7dd5ca1ba52bd849a6f6c3be0e375cf13c9ae04d859c4a9ae3546dc8ed4f10aa5dbb47d4998@34.226.134.117:30303"]|g' /var/lib/bor/config.toml
chown bor /var/lib/bor
```

### Update service config user permission

```bash
sed -i 's/User=heimdall/User=root/g' /lib/systemd/system/heimdalld.service
sed -i 's/User=bor/User=root/g' /lib/systemd/system/bor.service
```

## Start Services

Run the full Heimdall node with these commands on your Sentry Node:

```bash
sudo service heimdalld start
```

Now, you need to make sure that **Heimdall is synced** completely, and then only start Bor. If you start Bor without Heimdall syncing completely, you will run into issues frequently.

**To check if Heimdall is synced**
  1. On the remote machine/VM, run `curl localhost:26657/status`
  2. In the output, `catching_up` value should be `false`

Once Heimdall is synced, run the below command:

```bash
sudo service bor start
```

## Logs

Logs can be managed by the `journalctl` linux tool. Here is a tutorial for advanced usage: [How To Use Journalctl to View and Manipulate Systemd Logs](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**Check Heimdall node logs**

```bash
journalctl -u heimdalld.service -f
```

**Check Heimdall Rest-server logs**

```bash
journalctl -u heimdalld-rest-server.service -f
```

**Check Bor Rest-server logs**

```bash
journalctl -u bor.service -f
```

## Ports and Firewall Setup

Open ports 22, 26656 and 30303 to world (0.0.0.0/0) on sentry node firewall.

You can use VPN to restrict access for port 22 as per your requirement and security guidelines.