# 资源处理

所有的 Markdown 文件都编译成 HTML 组件。 你可以**也应该**使用相对路径引用资源：

```md
![一张图片](./image.png)
```

正常的图片、媒体和字体文件类型会被自动检测为静态资源。

所有引用的资源，包括使用绝对路径的资源，都将被复制到 dist 文件夹中，并在生产打包后生成哈希文件名。不会复制未引用的资源。小于 4kb 的图片资源将编译成 base64 的内联样式。

所有资源路径引用，包括绝对路径，都应基于你的工作目录结构。

## Public 文件

有时你可能需要提供一些 Markdown 或主题组件中未直接引用的静态资源（例如，网站图标和 PWA 图标）。 项目根目录下的 `public` 目录（如果你正在运行 `vitepress build docs`，则为 `docs` 文件夹）将会保留，用以提供源代码中从未引用的静态资源（例如 `robots.txt` )和需要保留完全相同的文件名（不生成哈希）的资源。

放在 `public` 中的资源将会直接复制到 dist 的根目录。

注意，你应该使用根绝对路径引用放在 `public` 中的文件 - 例如，`public/icon.png` 在源代码中应始终引用为 `/icon.png`。

## Base URL

如果您的站点部署到非根 URL，则需要在 `docs/settings.js` 中设置 `deploy.base` 选项。 例如，如果你要将站点部署到 `http://wpmjs.show.hsmob.com/bar/`，那么 `deploy.base` 应该设置为 `'/bar/'`（以斜线开头和结尾）。

所有静态资源路径都会自动处理以适配不同的 `base` 配置值。例如，在 markdown 中对 `public` 下的资源使用绝对路径引用：

```md
![WPM.JS Logo](/logo.png)
```
使用这种引用方式，当你更改 `base` 配置值时无需再做修改。

## 更改图片大小

有时候引入的图片过大，你可以通过直接使用 `img` 标签结合 `width` 属性修改图片大小
```md
<img src="/logo.png" width="200" alt="WPM.JS Logo">
```

<img src="/logo.png" width="200" alt="WPM.JS Logo">