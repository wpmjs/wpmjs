# 部署

以下指南基于下面的前置环境：

- 文档放在项目的 `docs` 目录中。
- 构建输出位置在 `dist` 目录中。
- 文档依赖（`vitepress`）已配置在项目中，并且在 `package.json` 中设置了以下脚本：

  ```json
  {
    "scripts": {
      "docs:build": "vitepress build docs",
      "docs:preview": "vitepress serve docs"
    }
  }
  ```

::: tip 小提示

如果要用子目录（`https://example.com/subdir/`）作为站点，则必须在 `settings.ts` 中将 `'/subdir/'` 设置为 `deploy.base`

**示例：** 如果您部署到 `https://wpmjs.show.hsmob.com/v2/docs/`，则将 `deploy.base` 设置为 `/v2/docs/`。

:::

## 本地打包和测试

- 运行此命令来打包文档：

  ```sh
  $ yarn docs:build
  ```

- 打包文档后，您可以通过运行命令在本地进行调试：

  ```sh
  $ yarn docs:preview
  ```

`preview` 命令将启动一个本地静态 Web 服务，该服务将在 `http://localhost:8080` 输出来自 `dist` 的内容。  
这是检查生产版本在您的本地环境中是否正常的简易方法。

## 部署到远程服务器

创建一个新项目并改成以下这些设置：

打包命令：`yarn docs:build` 执行后会输出一份 dist 目录
将 dist 压缩zip包后上传到 show.hsmob.com 网站中，并设置子域名 wpmjs `

