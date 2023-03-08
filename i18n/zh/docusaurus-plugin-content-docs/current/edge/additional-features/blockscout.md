---
id: blockscout
title: Blockscout
description: 如何设置用于 Polygon Edge 的 Blockscout 实例。
keywords:
  - docs
  - polygon
  - edge
  - blockscout
  - deploy
  - setup
  - instance
---

## 概述 {#overview}
指南详细介绍了如何编译和部署用于 Polygon-Edge 的 Blocksout 实例。Blocksout 有自己的[存证](https://docs.blockscout.com/for-developers/manual-deployment)，但该指南侧重于提供简单但详细的分步说明，解释如何设置 Blocksout 实例。

## 环境 {#environment}
* 操作系统：Ubuntu Server 20.04 LTS [下载链接](https://releases.ubuntu.com/20.04/)，带有 sudo 权限
* 服务器硬件：  8CPU / 16GB RAM / 50GB HDD (LVM)
* 数据库服务器：带有 2 CPU / 4GB RAM / 100GB SSD / PostgreSQL 13.4 的专用服务器

### DB 服务器 {#db-server}
使用该指南的要求是已经安装数据库服务器、数据库和 db 用户都已配置。该指南不会详细解释如何部署和配置 PostgreSQL 服务器。有很多相关指南介绍这一操作，例如 [DigitalOcean 指南](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart)

:::info 免责声明

本指南仅帮助您在生产设置不理想的情况下在单个实例中安装和运行 Blocksout。   对于生产，您可能想要在架构中引入反向代理、加载平衡器和扩容选项等。
:::

# Blocksout 部署程序 {#blockscout-deployment-procedure}

## 第 1 部分 - 安装依赖项 {#part-1-install-dependencies}
开始前，我们需要确保已经安装 blockscout 所需的所有二进制文件。

### 更新和升级系统 {#update-upgrade-system}
```bash
sudo apt -y update && sudo apt -y upgrade
```

### 添加 erlang repos {#add-erlang-repos}
```bash
# go to your home dir
cd ~
# download deb
wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb
# download key
wget https://packages.erlang-solutions.com/ubuntu/erlang_solutions.asc
# install repo
sudo dpkg -i erlang-solutions_2.0_all.deb
# install key
sudo apt-key add erlang_solutions.asc
# remove deb
rm erlang-solutions_2.0_all.deb
# remove key
rm erlang_solutions.asc
```

### 添加 NodeJS repo {#add-nodejs-repo}
```bash
sudo curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
```

### 安装 Rust {#install-rust}
```bash
sudo curl https://sh.rustup.rs -sSf | sh -s -- -y
```

### 安装 Erlang 所需的版本 {#install-required-version-of-erlang}
```bash
sudo apt -y install esl-erlang=1:24.*
```

### 安装 Elixir 所需的版本 {#install-required-version-of-elixir}
Elixir 的版本必须是`1.13`。如果我们从本地 repo 尝试安装该版本，`erlang`将更新至`Erlang/OTP 25`，但我们不想要这样。     
因此，我们需要从 GitHub 发布页面安装特定的预编译`elixir`版本。

```bash
cd ~
mkdir /usr/local/elixir
wget https://github.com/elixir-lang/elixir/releases/download/v1.13.4/Precompiled.zip
sudo unzip -d /usr/local/elixir/ Precompiled.zip
rm Precompiled.zip
```

现在，我们需要正确设置`exlixir`系统二进制。
```bash
sudo ln -s /usr/local/elixir/bin/elixir /usr/local/bin/elixir
sudo ln -s /usr/local/elixir/bin/mix /usr/local/bin/mix
sudo ln -s /usr/local/elixir/bin/iex /usr/local/bin/iex
sudo ln -s /usr/local/elixir/bin/elixirc /usr/local/bin/elixirc
```

运行`elixir -v`，查看`elixir`和`erlang`是否正确安装。输出应该显示如下：
```bash
Erlang/OTP 24 [erts-12.3.1] [source] [64-bit] [smp:8:8] [ds:8:8:10] [async-threads:1] [jit]

Elixir 1.13.4 (compiled with Erlang/OTP 22)
```

:::warning

`Erlang/OTP`必须是版本`24`，`Elixir`必须是版本`1.13.*`。    
如果不是，则您会在编译 Blockscout 和/或运行时遇到问题。
:::   
:::info

查看官方的 ***[Blockscout 要求页面](https://docs.blockscout.com/for-developers/information-and-settings/requirements)***
:::

### 安装 NodeJS {#install-nodejs}
```bash
sudo apt -y install nodejs
```

### 安装 Cargo {#install-cargo}
```bash
sudo apt -y install cargo
```

### 安装其他依赖项 {#install-other-dependencies}
```bash
sudo apt -y install automake libtool inotify-tools gcc libgmp-dev make g++ git
```

### 选择性地安装 postgresql 客户端查看您的 db 连接 {#optionally-install-postgresql-client-to-check-your-db-connection}
```bash
sudo apt install -y postgresql-client
```

## 第 2 部分 - 设置环境变量 {#part-2-set-environment-variables}
开始 Blocksout 编译前我们需要设置环境变量。本指南中我们仅进行最基础的设置使之运行。可以在[此处](https://docs.blockscout.com/for-developers/information-and-settings/env-variables)查看可设置的完整变量列表

### 设置数据库连接作为环境变量 {#set-database-connection-as-environment-variable}
```bash
# postgresql connection example:  DATABASE_URL=postgresql://blockscout:Passw0Rd@db.instance.local:5432/blockscout
export DATABASE_URL=postgresql://<db_user>:<db_pass>@<db_host>:<db_port>/<db_name> # db_name does not have to be existing database

# we set these env vars to test the db connection with psql
export PGPASSWORD=Passw0Rd
export PGUSER=blockscout
export PGHOST=db.instance.local
export PGDATABASE=postgres # on AWS RDS postgres database is always created
```

现在，在提供的参数中测试您的 DB 连接。由于您提供了 PG 环境变量，您应该可以连接至数据库，只需运行：
```bash
psql
```

如果数据库的配置正确，您应该看到 psql 提示：
```bash
psql (12.9 (Ubuntu 12.9-0ubuntu0.20.04.1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

blockscout=>
```

否则，您可能会看到此类错误：
```bash
psql: error: FATAL:  password authentication failed for user "blockscout"
FATAL:  password authentication failed for user "blockscout"
```
如果是这样，[这些文档](https://ubuntu.com/server/docs/databases-postgresql)可能可以帮助您。

:::info DB 连接

确保您在进入下一步之前解决了所有的 db 连接问题。
您需要向 blocksout 用户提供超级用户的权限。
:::
```bash
postgres@ubuntu:~$ createuser --interactive
Enter name of role to add: blockscout
Shall the new role be a superuser? (y/n) y
```

## 第 3 部分 - 克隆和编译 Blocksout {#part-3-clone-and-compile-blockscout}
现在我们终于可以开始安装 Blocksout。

### 克隆 Blocksout repo {#clone-blockscout-repo}
```bash
cd ~
git clone https://github.com/Trapesys/blockscout
```

### 生成密钥基础以保护生产构件 {#generate-secret-key-base-to-protect-production-build}
```bash
cd blockscout
mix deps.get
mix local.rebar --force
mix phx.gen.secret
```
在最后一行中，您可以看到长串的随机字符。     在进入下一步前，将其设置成为`SECRET_KEY_BASE`环境变量。     例如：
```bash
export SECRET_KEY_BASE="912X3UlQ9p9yFEBD0JU+g27v43HLAYl38nQzJGvnQsir2pMlcGYtSeRY0sSdLkV/"
```

### 设置生产模式 {#set-production-mode}
```bash
export MIX_ENV=prod
```

### 编译 {#compile}
Cd 至克隆目录并开始编译

```bash
cd blockcout
mix local.hex --force
mix do deps.get, local.rebar --force, deps.compile, compile
```

:::info

如果您之前已经完成部署，从之前搭建的***mix phx.digest.clean***中移除静态资产。
:::

### 迁移数据库 {#migrate-databases}
:::info

如果没有正确设置 DB 连接，或者您没有提供或在 DATABASE_URL 环境变量中定义了错误的参数，则这一部分就会出错。数据库用户需要拥有超级用户权限。
:::
```bash
mix do ecto.create, ecto.migrate
```

如果您想要先删除数据库，运行
```bash
mix do ecto.drop, ecto.create, ecto.migrate
```

### 安装 npm 依赖项和编译前端资产 {#install-npm-dependencies-and-compile-frontend-assets}
您需要更改目录至包含前端资产的文件夹。

```bash
cd apps/block_scout_web/assets
sudo npm install
sudo node_modules/webpack/bin/webpack.js --mode production
```

:::info 保持耐心

这些资产的编译需要几分钟，且会呈现为无输出。看起来似乎是卡住了，您只需耐心等待即可。当编译过程完成时，它的输出类似：`webpack 5.69.1 compiled with 3 warnings in 104942 ms`
:::

### 构建静态资产 {#build-static-assets}
对于这一步，您需要返回至 Blockscout 克隆文件夹的根。
```bash
cd ~/blockscout
sudo mix phx.digest
```

### 生成自签名的证书 {#generate-self-signed-certificates}
:::info

如果您不想使用`https`，您可以跳过该步骤。
:::
```bash
cd apps/block_scout_web
mix phx.gen.cert blockscout blockscout.local
```

## 第 4 部分 - 创建和运行 Blocksout 服务 {#part-4-create-and-run-blockscout-service}
在这一部分中，我们需要设置系统服务，我们想要 Blocksout 在后台中运行，且在系统重启后能持续运行。

### 创建服务文件 {#create-service-file}
```bash
sudo touch /etc/systemd/system/explorer.service
```

### 编辑服务文件 {#edit-service-file}
使用您偏好的 linux 文本编辑器编辑该文件和配置服务。
```bash
sudo vi /etc/systemd/system/explorer.service
```
explorer.service 文件内容举例：
```bash
[Unit]
Description=BlockScout Server
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=root
StandardOutput=syslog
StandardError=syslog
WorkingDirectory=/usr/local/blockscout
ExecStart=/usr/local/bin/mix phx.server
EnvironmentFile=/usr/local/blockscout/env_vars.env

[Install]
WantedBy=multi-user.target
```

### 在系统启动上启用开始服务 {#enable-starting-service-on-system-boot}
```bash
sudo systemctl daemon-reload
sudo systemctl enable explorer.service
```

### 移动您的 Blocksout 克隆文件夹至系统位置 {#move-your-blockscout-clone-folder-to-system-wide-location}
Blocksout 服务需要可以访问您从 Blocksout repo 上克隆的文件夹，且可以编译所有资产。
```bash
sudo mv ~/blockscout /usr/local
```

### 创建环境变量文件，该文件将用于 Blocksout 服务 {#create-env-vars-file-which-will-be-used-by-blockscout-service}

```bash
sudo touch /usr/local/blockscout/env_vars.env
# use your favorite text editor
sudo vi /usr/local/blockscout/env_vars.env

# env_vars.env file should hold these values ( adjusted for your environment )
ETHEREUM_JSONRPC_HTTP_URL="localhost:8545"  # json-rpc API of the chain
ETHEREUM_JSONRPC_TRACE_URL="localhost:8545" # same as json-rpc API
DATABASE_URL='postgresql://blockscout:Passw0Rd@db.instance.local:5432/blockscout' # database connection from Step 2
SECRET_KEY_BASE="912X3UlQ9p9yFEBD0JU+g27v43HLAYl38nQzJGvnQsir2pMlcGYtSeRY0sSdLkV/" # secret key base
ETHEREUM_JSONRPC_WS_URL="ws://localhost:8545/ws" # websocket API of the chain
CHAIN_ID=93201 # chain id
HEART_COMMAND="systemctl restart explorer" # command used by blockscout to restart it self in case of failure
SUBNETWORK="Supertestnet PoA" # this will be in html title
LOGO="/images/polygon_edge_logo.svg" # logo location
LOGO_FOOTER="/images/polygon_edge_logo.svg" # footer logo location
COIN="EDGE" # coin
COIN_NAME="EDGE Coin" # name of the coin
INDEXER_DISABLE_BLOCK_REWARD_FETCHER="true" # disable block reward indexer as Polygon Edge doesn't support tracing
INDEXER_DISABLE_PENDING_TRANSACTIONS_FETCHER="true" # disable pending transactions indexer as Polygon Edge doesn't support tracing
INDEXER_DISABLE_INTERNAL_TRANSACTIONS_FETCHER="true" # disable internal transactions indexer as Polygon Edge doesn't support tracing
MIX_ENV="prod" # run in production mode
BLOCKSCOUT_PROTOCOL="http" # protocol to run blockscout web service on
PORT=4000 # port to run blockscout service on
DISABLE_EXCHANGE_RATES="true" # disable fetching of exchange rates
POOL_SIZE=200 # the number of database connections
POOL_SIZE_API=300 # the number of read-only database connections
ECTO_USE_SSL="false" # if protocol is set to http this should be false
HEART_BEAT_TIMEOUT=60 # run HEARTH_COMMAND if heartbeat missing for this amount of seconds
INDEXER_MEMORY_LIMIT="10Gb" # soft memory limit for indexer - depending on the size of the chain and the amount of RAM the server has
FETCH_REWARDS_WAY="manual" # disable trace_block query
INDEXER_EMPTY_BLOCKS_SANITIZER_BATCH_SIZE=1000 # sanitize empty block in this batch size
```
:::info

使用您在第 3 部分生成的 `SECRET_KEY_BASE`。
:::
保存文件并退出。

### 最后，开始 Blocksout 服务 {#finally-start-blockscout-service}
```bash
sudo systemctl start explorer.service
```

## 第 5 部分，测试您的 Blocksout 实例功能 {#part-5-test-out-the-functionality-of-your-blockscout-instance}
现在，最后要做的事情就是查看 Blocksout 服务是否正在运行。查看服务状态：
```bash
sudo systemctl status explorer.service
```

查看服务输出：
```bash
sudo journalctl -u explorer.service -f
```

查看是否有新的侦听端口：
```bash
# if netstat is not installed
sudo apt install net-tools
sudo netstat -tulpn
```

您可以获取侦听端口列表，在列表上应该有如下内容：
```
tcp        0      0 0.0.0.0:5432            0.0.0.0:*               LISTEN      28142/postgres
tcp        0      0 0.0.0.0:4000            0.0.0.0:*               LISTEN      42148/beam.smp
```

Blocksout 网络服务运行环境文件中定义的端口和协议。在这个例子中，它在`4000`(http)   运行。
如果所有都没有问题，您就可以通过`http://<host_ip>:4000`访问 Blocksout 网络门户。

## 考虑 {#considerations}
为了获取最佳性能，最好有专用/本地的`polygon-edge`全存档非验证者节点这些节点可大量应用于 Blocksout 查询。    该节点的`json-rpc` API 不需要公布，因为 Blocksout 从后端运行所有查询。


## 最后的思考 {#final-thoughts}
我们已经部署了单个 Blocksout 实例，运行良好，但是在生产时，您需要考虑将此类实例放在 Nginx 等反向代理之后。我们也应该思考数据库和实例的可扩展性，这些都取决于具体案例。

强烈建议您查看官方 [Blocksout 存证](https://docs.blockscout.com/)，其中包含更多自定义的选项。