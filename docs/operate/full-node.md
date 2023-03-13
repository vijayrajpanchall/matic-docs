---
id: full-node
title: Run a full node with Packages
description: Learn how to run a full node on the Polygon network using utility scripts.
keywords:
  - docs
  - polygon wiki
  - full node
  - mainnet
  - heimdall
  - bor
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';


This document guides you through the process of starting and running a full node on the Polygon network from a package.

For the system requirements, see [Minimum Technical Requirements](technical-requirements.md).

:::tip

Steps in this guide involve waiting for the Heimdall and Bor services to fully sync. This process takes several days to complete.

Alternatively, you can use a maintained snapshot, which will reduce the sync time to a few hours. For detailed instructions, see [<ins>Snapshot Instructions for Heimdall and Bor</ins>](/docs/operate/snapshot-instructions-heimdall-bor).

For snapshot download links, see the [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/) page.

:::

## Overview

- Prepare the Full Node machine.
- Install Heimdall and Bor packages on the Full Node machine.
- Configure the Full node.
- Start the Full node.
- Check node health with the community.

:::note
You have to follow the exact outlined sequence of actions, otherwise you will run into issues.
:::

## Install packages

#### Prerequisites

- One machine is needed.
- Bash is installed on the machine.

#### Heimdall

- Install the default latest version of sentry for Mainnet:

    ```shell
    curl -L https://raw.githubusercontent.com/maticnetwork/install/main/heimdall.sh | bash
    ```

    or install a specific version, node type (`sentry` or `validator`), and network (`mainnet` or `mumbai`). All release versions can be found on
    [Heimdall GitHub repository](https://github.com/maticnetwork/heimdall/releases).

    ```shell
    curl -L https://raw.githubusercontent.com/maticnetwork/install/main/heimdall.sh | bash -s -- <version> <network> <node_type>
    # Example:
    # curl -L https://raw.githubusercontent.com/maticnetwork/install/main/heimdall.sh | bash -s -- v0.3.0 mainnet sentry
    ```

#### Bor

- Install the default latest version of sentry for Mainnet:

    ```shell
    curl -L https://raw.githubusercontent.com/maticnetwork/install/main/bor.sh | bash
    ```

    or install a specific version, node type (`sentry` or `validator`), and network (`mainnet` or `mumbai`). All release versions could be found on
    [Bor Github repository](https://github.com/maticnetwork/bor/releases).

    ```shell
    curl -L https://raw.githubusercontent.com/maticnetwork/install/main/bor.sh | bash -s -- <version> <network> <node_type>

    # Example:
    # curl -L https://raw.githubusercontent.com/maticnetwork/install/main/bor.sh | bash -s -- v0.3.3 mainnet sentry
    ```


## Configuration

In this section, we will go through steps to initialize and customize configurations nodes.

:::caution

Bor and Heimdall 0.3.0 use standardized paths for configuration files and chain data. If you have existing
config files and chain data on your node, please skip the [Configure Heimdall](#configure-heimdall) section below and jump directly to **[Migration](#upgrade-from-02x-to-03x) section** to learn about migrating configs and data to standardized file locations.

:::

### Configure Heimdall

- Initialize Heimdall configs

    ```shell
    # For mainnet
    sudo -u heimdall heimdalld init --chain=mainnet --home /var/lib/heimdall

    # For testnet
    sudo -u heimdall heimdalld init --chain=mumbai --home /var/lib/heimdall
    ```

- You will need to add a few details in the `config.toml` file. To open the `config.toml` file run the following command `vi /var/lib/heimdall/config/config.toml`

    - Now in the config file you will have to change `Moniker`

    ```shell
    moniker=<enter unique identifier> For example, moniker=my-sentry-node
    ```

    - Change the value of **Prometheus** to `true`
    - Set the `max_open_connections` value to `100`

    Make sure you keep the proper formatting when you make the changes above.

- Configure seeds and bootnodes for Bor

    - Open the `config.toml` using below command:

    ```bash
    sed -i 's|.*\[p2p.discovery\]|  \[p2p.discovery\] |g' /var/lib/bor/config.toml
    ```

    - Edit the seeds for Mainnet or Mumbai Testnet accordingly:
    
    ```bash title="For Mainnet"
    sed -i 's|.*bootnodes =.*|    bootnodes = ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303","enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303","enode://4be7248c3a12c5f95d4ef5fff37f7c44ad1072fdb59701b2e5987c5f3846ef448ce7eabc941c5575b13db0fb016552c1fa5cca0dda1a8008cf6d63874c0f3eb7@3.93.224.197:30303","enode://32dd20eaf75513cf84ffc9940972ab17a62e88ea753b0780ea5eca9f40f9254064dacb99508337043d944c2a41b561a17deaad45c53ea0be02663e55e6a302b2@3.212.183.151:30303"]|g' /var/lib/bor/config.toml
    ```

    ```bash title="For Mumbai Testnet"
    sed -i 's|.*bootnodes =.*|    bootnodes = ["enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303","enode://f0f48a8781629f95ff02606081e6e43e4aebd503f3d07fc931fad7dd5ca1ba52bd849a6f6c3be0e375cf13c9ae04d859c4a9ae3546dc8ed4f10aa5dbb47d4998@34.226.134.117:30303"]|g' /var/lib/bor/config.toml
    ```

    - Finally, run the command: ```chown bor /var/lib/bor```

### Update service config user permission

```bash
# Heimdall
sed -i 's/User=heimdall/User=root/g' /lib/systemd/system/heimdalld.service

# Bor
sed -i 's/User=bor/User=root/g' /lib/systemd/system/bor.service
```

### Configure service files for bor and heimdall

After successfully installing Bor and Heimdall through [packages](#install-with-packages-recommended), their service file could be found under `/lib/systemd/system`, and Bor's config
file could be found under `/var/lib/bor/config.toml`.
You will need to check and modify these files accordingly.

- Make sure the chain is set correctly in `/lib/systemd/system/heimdalld.service` file. Open the file with following command `sudo vi /lib/systemd/system/heimdalld.service`

    - In the service file, set `--chain` to `mainnet` or `mumbai` accordingly

  Save the changes in `/lib/systemd/system/heimdalld.service`.

- Make sure the chain is set correctly in `/var/lib/bor/config.toml` file. Open the file with following command `sudo vi /var/lib/bor/config.toml`

    - In the config file, set `chain` to `mainnet` or `mumbai` accordingly.

    - To enable Archive mode you can optionally enable the following flags:

      ```
      gcmode "archive"

      [jsonrpc]
        [jsonrpc.ws]
          enabled = true
          port = 8546
          corsdomain = ["*"]
      ```

  Save the changes in `/var/lib/bor/config.toml`.


## Start services

Reloading service files to make sure all changes to service files are loaded correctly.

```shell
sudo systemctl daemon-reload
```

Start Heimdall, Heimdall rest server, and Heimdall bridge.

```shell
sudo service heimdalld start
```

You can also check Heimdall logs with command

```shell
journalctl -u heimdalld.service -f
```

Now you need to make sure that **Heimdall is synced** completely and only then Start Bor. If you start Bor without Heimdall syncing completely, you will run into issues frequently.

- To check if Heimdall is synced
    - On the remote machine/VM, run `curl localhost:26657/status`
    - In the output, `catching_up` value should be `false`

Now once Heimdall is synced, run

```shell
sudo service bor start
```

You can check Bor logs via command

```shell
journalctl -u bor.service -f
```
