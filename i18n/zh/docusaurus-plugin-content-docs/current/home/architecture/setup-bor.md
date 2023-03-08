---
id: setup-bor
title: 设置Bor
description: 设置 Bor 节点
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# 设置Bor {#setup-bor}

使用`master`或`develop`分支，其中包含最新的稳定版本。

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

现在，您在本地系统上安装了 Bor，而在路径上使用了二进制`./build/bin/bor`。

### 连接至控制台（可选） {#connecting-to-console-optional}

该步骤为可选步骤。您不需要连接至控制台。您可以在对其他详情感兴趣时再进行该操作。

就像 Geth 一样，您可以连接到 Bor 控制台来执行各种类型的查询。从您的上面`dataDir`，运行以下命令：

```bash
    $ cd ~/matic/tesnets
    $ git submodule init
    $ git submodule update

    $ cd ~/matic/tesnets/genesis-contracts
    $ npm install

    $ git submodule init
    $ git submodule update
    $ cd ~/matic/tesnets/genesis-contracts/matic-contracts
    $ npm install
    $ node scripts/process-templates.js --bor-chain-id 15001
    $ npm run truffle:compile
```

处理模板后，我们需要在`tesnets/genesis-contracts/validators.js`文件设置验证者。该文件格式为：

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

使用`validators.js`文件生成Bor验证者：

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

该指令将生成`genesis-contracts/contracts/BorValidatorSet.sol`。

 `BorValidatorSet.sol`生成后，生成genesis.json：

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

这将生成 `genesis-contracts/genesis.json`。

## 启动 Bor {#start-bor}

在生成基因文件时`~/matic/tesnets/genesis-contracts/genesis.json`，请准备 Bor 节点：

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

使用以下命令启动 Bor 操作：

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

Bor 将在 8545 端口上开始运行。

如果您想要清除Bor重新开始：

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## 测试 Bor and Heimdall {#test-bor-and-heimdall}

要测试 Bor and Heimdall 时，您需要同时运行 Bor and Heimdall 、 Heimdall 上的剩余服务器和 Bridge 。

### 运行 Heimdall rest-service (可选) {#run-heimdall-rest-server-optional}

遵循此[指南](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/)指示，在本地机器上运行 nginx (Mac OSX) 。

将以下内容添加到`/usr/local/etc/nginx/nginx.conf`并重新启动 nginx：

```conf
    worker_processes  1;

    events {
        worker_connections 1024;
    }

    http {
        server {
            listen 80;
            server_name localhost;

            location / {
              add_header 'Access-Control-Allow-Origin' * always;
              add_header 'Access-Control-Allow-Credentials' 'true';
              add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
              add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';

              if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' * always;
                add_header 'Access-Control-Allow-Credentials' 'true';
                add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
                add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';
                add_header 'Access-Control-Max-Age' 1728000;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Content-Length' 0;
                return 204;
              }

              proxy_redirect off;
              proxy_set_header host $host;
              proxy_set_header X-real-ip $remote_addr;
              proxy_set_header X-forward-for $proxy_add_x_forwarded_for;
              proxy_pass http://127.0.0.1:1317;
            }
        }
    }
```

使用新的配置更改重新加载nginx：

```bash
    sudo nginx -s reload
```
