# Markdown 扩展

文档系统 带有内置的 Markdown 扩展。

## 链接

内部和外部链接都会特殊处理。

### 内部链接

内部链接转换为 SPA 导航的路由链接。 此外，每个子目录中包含的每个 `index.md` 都会自动转换为 `index.html`，并带有相应的URL `/`。

举个例子，现在有以下目录结构：

```
.
├─ index.md
├─ foo
│  ├─ index.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ index.md
   ├─ three.md
   └─ four.md
```

在 `foo/one.md`中:

```md
[Home](/) <!-- 点击跳转到 根目录的 index.md -->
[foo](/foo/) <!-- 点击跳转到 foo 目录的 index.html -->
[foo heading](./#heading) <!-- 锚点会定位到 foo 的 heading 标题 -->
[bar - three](../bar/three) <!-- 你可以不写后缀名 -->
[bar - three](../bar/three.md) <!-- 也可以加 .md -->
[bar - four](../bar/four.html) <!-- 或者加 .html -->
```

### 页面后缀

默认情况下，页面和内部链接会生成带有 `.html` 的后缀。

### 外部链接

外部的链接会自动识别并生成 `target="_blank" rel="noreferrer"` 的链接，如下：

- [WPM.JS](http://wpmjs.show.hsmob.com)
- [关于WPM.JS](http://wpmjs.show.hsmob.com/about/)

## Frontmatter

[YAML frontmatter](https://jekyllrb.com/docs/front-matter/) 通过外部支持:

```yaml
---
title: Blogging Like a Hacker
lang: en-US
---
```

该数据可用于页面的其他部分，以及所有自定义和主题化组件。

## GitHub样式的表格

**输入**

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

**输出**

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

## Emoji :tada:

**输入**

```
:tada: :100:
```

**输出**

:tada: :100:

可用的emoji可以通过[这里](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)了解

## 表格内容

**输入**

```
[[toc]]
```

**输出**

[[toc]]

可以使用 `markdown.toc` 选项配置 TOC 的渲染。

## 自定义容器

自定义容器可以通过其类型、标题和内容来定义。

### 默认标题

**输入**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**输出**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a dangerous warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

### 自定义标题

你可以通过在容器的“类型”后面添加文本来设置自定义标题。

**输入**

````md
::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code
```js
console.log('Hello, WPM.JS!')
```
:::
````

**输出**

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code
```js
console.log('Hello, WPM.JS!')
```
:::
### `raw`

这是一个特殊的容器，可以用来防止样式和路由与 文档系统 冲突。当作为组件库文档使用时，这尤其有用。

**语法**

```md
::: raw
Wraps in a <div class="vp-raw">
:::
```

`vp-raw` 类也可以直接用于元素，样式隔离目前是可选择的。

::: details 具体细节

- Install required deps with your preferred package manager:

  ```sh
  $ yarn add -D postcss postcss-prefix-selector
  ```

- Create a file named `docs/.postcssrc.cjs` and add this to it:

  ```js
  module.exports = {
    plugins: {
      'postcss-prefix-selector': {
        prefix: ':not(:where(.vp-raw *))',
        includeFiles: [/vp-doc\.css/],
        transform(prefix, _selector) {
          const [selector, pseudo = ''] = _selector.split(/(:\S*)$/)
          return selector + prefix + pseudo
        }
      }
    }
  }
  ```

:::

## 在代码块中高亮语法

文档系统 使用 [Shiki](https://shiki.matsu.io/) 的彩色文本来突出Markdown代码块中的语言语法。Shiki 支持多种编程语言，只需要在代码块的开头 ``` 定义对应的语言。

**输入**

````
```js
export default {
  name: 'MyComponent',
  // ...
}
```
````

````
```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```
````

**输出**

```js
export default {
  name: 'MyComponent'
  // ...
}
```

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

在 Shiki 的仓库里有对应支持的[语言列表](https://github.com/shikijs/shiki/blob/main/docs/languages.md)。

## 代码块中定义 行高亮

**输入**

````
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**输出**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

除了单行之外，还可以指定多个单行、范围或者多个一起定义：

- 行范围: 例如 `{5-8}`, `{3-10}`, `{10-17}`
- 多个单行: 例如 `{4,7,9}`
- 行范围和多个单行: 例如 `{4,7-13,16,23-27,40}`

**输入**

````
```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'WPM.JS is awesome',
      lorem: 'ipsum'
    }
  }
}
```
````

**输出**

```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'WPM.JS is awesome',
      lorem: 'ipsum',
    }
  }
}
```

## 行数

可以通过配置为每个代码块启用行号

```js
export default {
  markdown: {
    lineNumbers: true
  }
}
```

## 导入代码片段

你可以通过以下语法从现有文件中导入代码片段：

```md
<<< @/filepath
```

同时也支持 [行高亮](#line-highlighting-in-code-blocks):

```md
<<< @/filepath{highlightLines}
```

**输入**

```md
<<< @/guide/snippets/snippet.js{2}
```

**代码文件**

<<< @/guide/snippets/snippet.js

**输出**

<<< @/guide/snippets/snippet.js{2}

::: tip
`@` 相当于项目指定的源目录。默认情况下，它是 VitePress 项目根目录，当然也可以通过 `srcDir` 配置项配置。
:::

你也可以使用 [VS 代码区域](https://code.visualstudio.com/docs/editor/codebasics#_folding) 来导入仅包含代码文件的相应部分。也可以在文件路径后的 `#` 后面提供自定义区域名称：

**输入**

```md
<<< @/guide/snippets/snippet-with-region.js#snippet{1}
```

**代码文件**

<<< @/guide/snippets/snippet-with-region.js

**输出**

<<< @/guide/snippets/snippet-with-region.js#snippet{1}

你还可以在大括号 (`{}`) 中指定语言：

```md
<<< @/guide/snippets/snippet.cs{c#}

<!-- 指定 行高亮: -->
<<< @/guide/snippets/snippet.cs{1,2,4-6 c#}
```

这在无法从文件扩展名中推断出源语言会很有用。

## 包含其他 Markdown 文件

你可以通过下面的写法在 markdown 文件中 引入另外的markdown文件

**输入**

```md
# Docs

## Basics

<!--@include: ./parts/basics.md-->
```

**部分文件** (`parts/basics.md`)

```md
Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

**等同于以下代码**

```md
# Docs

## Basics

Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

::: warning 警告
注意，如果文件不存在，将不会引发错误。因此，在使用此特性时，请确保按预期呈现内容。
:::