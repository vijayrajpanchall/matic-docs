---
id: technical-faqs
title: 技术性常见问题
description: 在 Polygon 上构建您的下一个区块链应用程序。
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip 掌握最新信息

通过订阅 [<ins>Polygon 通知</ins>](https://polygon.technology/notifications/)，跟上 Polygon 团队和社区的最新节点和验证者更新。

:::

### 1. Heimdall 和 Bor 钥库的私钥是否相同？ {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}
是的，用于生成验证者密钥的私钥和 Bor 钥库的私钥是相同的。本例中使用的私钥是钱包的以太坊地址，用于存储 Polygon 测试网的代币。

### 2. 常用命令列表 {#2-list-of-common-commands}

目前，我们为您提供了一个易于深入研究的 Linux 软件包列表。为了更方便，我们会定期更新此列表。

**用于 Linux 软件包**

#### A. 在哪可以找到 Heimdall Genesis 文件 {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. 在哪可以找到 heimdall-config.toml {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. 在哪可以找到 config.toml {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. 在哪可以找到 heimdall-seeds.txt {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. 启动 Heimdall {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. 启动 Heimdall REST 服务器 {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. 启动 Heimdall 桥接服务器 {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. Heimdall 日志 {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. 在哪可以找到 Bor genesis 文件 {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. 启动 Bor {#j-start-bor}

`sudo service bor start`

#### K 查看 Heimdall 日志 {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. 查看 Heimdall REST 服务器 {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. 查看 Heimdall 桥接日志 {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. 查看 bor 日志 {#n-check-bor-logs}

`tail -f bor.log`

#### O. 结束 Bor 进程 {#o-kill-bor-process}

**用于 linux**：

1. `ps -aux | grep bor`。获取 Bor 的 PID，然后运行以下命令。
2. `sudo kill -9 PID`

**对于二进制文件**：

前往 `CS-2003/bor` 然后运行，`bash stop.sh`

### 3. 错误：解锁账户失败 (0x...) 无给定地址或文件的密钥 {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

出现此错误是因为 password.txt 文件的路径不正确。您可以按照以下步骤来纠正这一问题：

出现此错误是因为 password.txt 和钥库文件的路径不正确。您可以按照以下步骤来纠正这一问题：

1. 将 Bor 钥库文件复制到

    /etc/bor/dataDir/keystore

2. 然后将 password.txt 复制到

    /etc/bor/dataDir/

3. 确保您已正确的地址添加到`/etc/bor/metadata`

对于二进制文件：

1. 将 Bor 钥库文件复制到：

`/var/lib/bor/keystore/`

2. 然后将 password.txt 复制到

`/var/lib/bor/password.txt`


### 4. 错误：Wrong Block.Header.AppHash。预期的 xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

这个错误通常发生在 Heimdall 服务被卡在一个区块上，并且 Heimdall 上没有可用的回退选项时。

要解决这一问题，您需要彻底重置 Heimdall：

```bash
    sudo service heimdalld stop

    heimdalld unsafe-reset-all
```

之后，您需要再次从快照同步：

```bash
    wget -c <Snapshot URL>

    tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

```

然后，重新启动 Heimdall 服务。


### 5. 我该从何处创建 API 密钥？ {#5-from-where-do-i-create-the-api-key}

您可以访问此链接：[https://infura.io/register](https://infura.io/register) 。请确保设置好账户和项目后，您复制的是 Ropsten 的 API 密钥，而不是主网的。

默认情况下，选择的是主网的 API 密钥。

### 6. Heimdall 无法正常工作。我遇到 Panic 错误 {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**实际错误**：我的 Heimdall 无法正常工作。日志第一行是：
panic：未知的 db_backend leveldb，预料的 goleveldb 或 memdb 或 fsdb

将配置更改为 `goleveldb`config.toml


### 7. 如何删除 Heimdall 和 Bor 的残留物？ {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

如果想删除 Heimdall 和 Bor 的残留物，可以运行以下命令：
Bor：

对于 Linux 软件包：

```$ sudo dpkg -i matic-bor```

并删除 Bor 目录：

```$ sudo rm -rf /etc/bor```

对于二进制文件：

```$ sudo rm -rf /etc/bor```

和

```$ sudo rm /etc/heimdall```


### 8. 可以同时激活多少个验证者？ {#8-how-many-validators-can-be-active-concurrently}

每次最多可以激活 100 个验证者。如果活动中途达到限额，我们也会引入更多参与者。请注意，活跃的验证者主要是那些正常运行时间较长的验证者。停机时间较长的参与者将被迫退出。

### 9. 我应该质押多少代币？ {#9-how-much-should-i-stake}

“质押额”以及“heimdall 收费额”应该为多少？

质押额不少于 10 个 Matic 代币，而 heimdall 费用不少于 10。例如，如果您的质押额为 400，heimdall 费用应为 20。我们建议将 Heimdall 费用保持在 20。

但是，请注意，在质押额和 heimdal 收费额中输入的数值应为 18 位数

例如，

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. 我被选中成为验证者，但我的 ETH 地址不正确。我该怎么办？ {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

如果您有权访问您之前提交的 ETH 地址，那么您可以将测试代币从该账户转移到当前账户。然后就可以开始设置节点的过程了。

如果您无权访问该 ETH 地址，我们将不会单独向您转移代币。您可以用正确的 ETH 地址再次在表格中重新注册。

### 11. 启动桥接时出现错误 {#11-i-m-getting-an-error-starting-the-bridge}

**错误**：对象“启动”未知，请尝试“桥接帮助”。可以无视这个问题吗？

检查哪个网桥出现了问题——如果原因在于 `/usr/sbin/bridge` 您没有运行正确的“桥接”程序。

请换一种方法，试试 `~/go/bin/bridge` `(or $GOBIN/bridge)`


### 12. 我遇到了 dpkg 错误 {#12-i-m-getting-dpkg-error}

**错误**：“dpkg：错误处理归档 matic-heimdall_1.0.0_amd64.deb （--安装）：试图覆盖‘/heimdalld-rest-server.service’，该文件也在软件包 matic-node 1.0.0 中”

出现这种情况主要是因为您的机器此前已安装 Matic。要解决问题，您可以运行：

`sudo dpkg -r matic-node`


### 13. 我不清楚在生成验证者密钥时应该添加哪个私钥 {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

要使用的私钥是钱包的 ETH 地址，Polygon 的测试网代币存放在该地址。您可以使用与表格中提交的地址绑定的一对公私密钥来完成设置。


### 14. 有没有办法知道 Heimdall 是否已同步？ {#14-is-there-a-way-to-know-if-heimdall-is-synced}

您可以运行以下命令进行检查：

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

检查 catching_up 的数值。如果为假，那么该节点就已完全同步。


### 15. 如果有人成为了前 10 名的质押人，最终他将如何获得 MATIC 奖励？ {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

第 1 阶段的奖励不是基于质押的。有关奖励详情，请参阅 https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/。在本阶段，持有较高质押额的参与者不会自动获得奖励。


### 16. 我的 heimdall 版本应该是什么？ {#16-what-should-be-my-heimdall-version}

要查看您的 Heimdall 版本，只需运行：

```heimdalld version```

第一阶段正确的 Heimdall 版本应为 `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`


### 17. 我应该在质押额和收费额中添加什么数值？ {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

质押额至少得有 10 个 Matic 代币，而 heimdall 费用应大于 10。例如，如果您的质押额为 400，heimdall 费用应为 20。我们建议将 Heimdall 费用保持在 20。

但是，请注意，在质押额和 heimdal 收费额中输入的数值应为 18 位数

例如，

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. `/var/lib/heimdall` 与 `/etc/heimdall?` 之间的差异

`/var/lib/heimdall` 是使用二进制安装方法时的 heimdall 目录。`/etc/heimdall` 是 Linux 软件包安装方式的目录。


### 19. 当我进行质押交易时，出现了“Gas Exceeded”的错误 {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

发生这种错误可能是因为质押额或收费额的格式。在质押命令中输入的数值必须是 18 位数。

但是，请注意，在质押额和 heimdal 收费额中输入的数值应为 18 位数

例如，

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. 何时我才有机会成为一名验证者？ {#20-when-will-i-get-a-chance-to-become-a-validator}

在整个第 1 阶段的活动过程中，我们会逐步添加验证者。我们会逐步发布新的外部验证者列表。此列表将在 Discord 频道上公布。


### 21. 哪里可以找到 Heimdall 账户信息的位置？ {#21-where-can-i-find-heimdall-account-info-location}

对于二进制文件：

    /var/lib/heimdalld/config folder

对于 Linux 软件包：

    /etc/heimdall/config


### 22. 我应该在哪个文件中添加 API 密钥？ {#22-which-file-do-i-add-the-api-key-in}

创建 API 密钥后，您需要在 `heimdall-config.toml` 文件中添加 API 密钥。


### 23. 我应该在哪个文件中添加 persistent_peers？ {#23-which-file-do-i-add-the-persistent_peers}

您可以在以下文件中添加 persistent_peers：

    /var/lib/heimdalld/config/config.toml


### 24. “您是否在未重置应用程序数据的情况下重置了 Tendermint？” {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

在这种情况下，您可以重置 heimdall 的配置数据并尝试再次运行安装程序。

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. 错误：无法取消 marshall 配置错误 1 错误 解码 {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

错误：`* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

出现这种情况的原因主要在于错别字、一些缺失的部分或仍然是残留物的旧配置文件。您需要先清除所有残留物，然后尝试再次设置。

### 26. 停止 Heimdall 和 Bor 服务 {#26-to-stop-heimdall-and-bor-services}

**对于 Linux 软件包**：

停止 Heimdall：`sudo service heimdalld stop`

停止 Bor：`sudo service bor stop` 或

1. `ps -aux | grep bor`。获取 Bor 的 PID，然后运行以下命令。
2. `sudo kill -9 PID`

**对于二进制文件**：

停止 Heimdall：`pkill heimdalld`

停止桥接：`pkill heimdalld-bridge`

停止 Bor：前往 CS-2001/bor，然后运行，`bash stop.sh`

### 27. 删除 Heimdall 和 Bor 目录 {#27-to-remove-heimdall-and-bor-directories}

**对于 Linux 软件包**：
删除 Heimdall：`sudo rm -rf /etc/heimdall/*`

删除 Bor：`sudo rm -rf /etc/bor/*`

**对于二进制文件**：

删除 Heimdall：`sudo rm -rf /var/lib/heimdalld/`

删除 Bor：`sudo rm -rf /var/lib/bor`

### 28. 当您遇见 “Wrong Block.Header.AppHash” 这种错误时，您会怎么办 {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

此错误通常是由于 Infura 请求耗尽而发生的。在 Polygon 上设置节点时，将 Infura 密钥添加到配置文件中 (Heimdall)。默认情况下，每天最多可产生 10 万个请求，如果超过该限额，就会面临这样的问题。为了解决这个问题，您可以创建一个新的 API 密钥并将其添加到 `config.toml` 文件中。