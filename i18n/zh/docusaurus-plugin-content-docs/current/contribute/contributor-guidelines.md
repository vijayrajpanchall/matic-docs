---
id: contributor-guidelines
title: 如何撰写文档
sidebar_label: Contributor guidelines
description: 为即将上传的文档做好准备
keywords:
  - docs
  - matic
  - polygon
  - contribute
  - contributor
  - contributing
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: orientation
---

:::tip
在 [Polygon Wiki 存储处上提出问题，](https://github.com/maticnetwork/matic-docs/issues)随时可以提出。
:::

## 确定一个领域，为其撰写文档 {#identify-an-area-to-contribute-to}

有几种方法能确定您可以在什么领域为 Polygon Wiki 撰写文档：

- 最容易的，是向[其中](/docs/contribute/community-maintainers)一个维基维护者进行接触。对他说：“我想为 Polygon Wiki 撰写文档。” 他们将与您合作，以找到用于您提供帮助的地区。
- 如果您在心中有特定贡献，但对此不确定，请确认是否通过[直接](/docs/contribute/community-maintainers)联系 Wiki 维护者之一，该贡献是适当的。
- 如果您没有特定贡献，您还可以浏览问题。在 [Polygon gitHub](https://github.com/maticnetwork) 存储`help wanted`中标记为。
- 另外还有`good first issue`标签的问题被认为是理想的。第一点计时器。

## 添加至 Polygon 文档 {#add-to-the-polygon-documentation}

  - 如果需要在 Polygon Wiki 中添加或更改任何东西，请提出 PR 文件。对照`master`分支（请检查样本 PR）。
  - 文档团队会审查 PR 或对其进行相应的联系。
  - 存储库： https://github.com/maticnetwork/matic-docs
  - 示例 PR：https://github.com/maticnetwork/matic-docs/pull/360

:::tip
如果您想在您的机器上本地运行 Wiki ，请检查在[当地运行 Wiki 部分。](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally)如果您添加了新的文档，建议只需有一个基本的摘要/介绍和链接到您的 Github 或文档，以获取更多详细信息。
:::

## Git 的规则 {#git-rules}

我们将 `gitchangelog` 所有的存储库都用于更新日志。 为此，我们需要遵守以下用于实施消息的公约。如果您为，将不会合并。不遵守此公约。

### 提交信息的相关规定 {#commit-message-convention}

以下是对您可能考虑在您中添加什么有用的建议。执行消息。您可能希望将提交的内容大致分成几个大章：

- 按意图（例如：新的、固定的、改变的......）进行划分
- 按对象（例如：文档、打包文件、代码......）进行划分
- 按受众（例如：开发人员、测试人员、用户......）进行划分

此外，您可能想标记一些提交的内容：

- 作为“小”承诺，不应该将输出转入您的换代（化妆品更改，在评论中进行小打字机...
- 如果没有任何真正的有意义的重要变化，将作为“重置”。因此，这是例如，不应成为向最终用户显示的更换程序的一部分，但如果您拥有开发者更换代尔格，可能有一些兴趣。
- 您也可以用 “api” 来标记 API 的变化，或者对新的 API 以及类似内容进行标记。

尽可能多地尝试以用户功能为目标来编写您的提交信息。

:::note 示例

这里有一份标准的 git 日志 `--oneline`，展示了这些信息的存储方式：

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

有关更多信息，请参见[使用 Git 管理 Changelog 的一些良好方式是什么？](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890)

要了解详情，请访问 [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/)。
