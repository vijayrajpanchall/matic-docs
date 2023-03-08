---
id: installation
title: 安装
description: "安装 Polygon Edge 的方法。"
keywords:
  - docs
  - polygon
  - edge
  - install
  - installation
---

请参阅更适用于您的安裝方法。

我们的建议是使用预建的版本，验证所提供的检查和。

## 预建版本 {#pre-built-releases}

关于版本列表，请参阅 [GitHub](https://github.com/0xPolygon/polygon-edge/releases) 版本页。

Polygon Edge 边缘配有 Darwin 和 Linux 的交叉编译 AMD64/ARM64 二进制文件。

---

## Docker 图像 {#docker-image}

官方 Docker 图像托管在 [hub.docker.com 注册表](https://hub.docker.com/r/0xpolygon/polygon-edge)下。

`docker pull 0xpolygon/polygon-edge:latest`

---

## 从源建立 {#building-from-source}

在使用`go install`之前，确保您已`>=1.18`安装和配置适当。

稳定分支是最新版本的分支。

```shell
git clone https://github.com/0xPolygon/polygon-edge.git
cd polygon-edge/
go build -o polygon-edge main.go
sudo mv polygon-edge /usr/local/bin
```

---

## 使用`go install`

在使用`go install`之前，确保您已`>=1.17`安装和配置适当。

`go install github.com/0xPolygon/polygon-edge@release/<latest release>`

该二进制将在您`GOBIN`的环境变量中使用，并将包含最新版本的更改。您可以检查 [GitHub](https://github.com/0xPolygon/polygon-edge/releases) 发布版，以查找最新的版本。
