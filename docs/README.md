# 快速上手

本节将帮助你从头开始构建一个基本的文档站点。 如果您已经有一个现有项目并希望将文档保留在项目中，请从 Setp. 2 开始。

::: tip 注意
文档系统目前处于`RC`状态。它已经适合使用开箱即用的文档，但是配置和主题化API仍然可能在小版本之间发生变化。
:::

## Step. 1: 初始化项目

安装最新 NodeJS，版本 >= 18

[安装下载NodeJS](https://nodejs.org/zh-cn/download)

进入项目并安装依赖

```sh
$ cd wpmjs/docs
```

用包管理工具初始化项目

```sh
$ npm install
```

:::

创建你的第一篇文章

```sh
$ mkdir docs && echo '# Hello WPM.JS' > docs/hello/index.md
```

## Step. 2: 启动本地开发环境

`package.json`包含以下脚本

```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs --port 3003",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs --port 8080"
  },
  ...
}
```

启动文档网站的本地服务器

```sh
$ yarn docs:dev
```

文档系统 将在 `http://localhost:3003` 启动一个本地开发服务器。

## Step. 3: 增加更多文档

再添加一个页面，创建一个名为 `getting-started.md` 的文件，与前面创建的 `index.md`同级。

现在你的目录结构应该是这样的。

```
.
├─ docs
│  ├─ getting-started.md
│  └─ index.md
└─ package.json
```

接下来，访问 `http://localhost:3003/getting-started.html`，可以看到 `getting-started.md` 的内容。

这就是 文档系统 的基本工作方式。 目录结构与 URL 路径相对应。 你可以添加文件，然后尝试访问它。

## 接下来?

到目前为止，您应该拥有一个基本的文档站点。 但现在用户还无法浏览该网站，因为它缺少例如我们在该网站上的侧边栏菜单。

要启用这些导航，我们必须向站点添加一些配置。 前往 [配置指南](./src/guide/settings.md) 了解如何配置 文档。

如果你想了解更多关于您可以在页面中执行的操作，例如编写 Markdown，请查看文档的“编写”部分。 [Markdown 指南](./src/guide/markdown.md) 将是一个很好的入口点。

当您的文档站点已经成形时，请务必阅读 [部署指南](./src/guide/deploying.md)。
