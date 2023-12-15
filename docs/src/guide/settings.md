# 配置

首先在 docs 目录里有一个 `.vitepress` 目录。 这是放置所有 文档系统 特定文件的地方。 这时候你的项目结构大概是这样的：
```
.
├─ dist
├─ docs
│  ├─ .vitepress
│  │  ├─ theme
│  │  └─ config.mts
│  ├─ settings.ts
│  └─ index.md
└─ package.json
```

配置 文档系统 的基本文件是 `docs/settings.ts`，它导出一个 JavaScript 对象：

```ts
export default {
  title: 'WPM.JS - 官方文档',
  description: '微前端包管理工具',
  navbar: []
}
```

在上面的示例中，该站点的标题为“WPM.JS - 官方文档”，“微前端包管理工具” 作为文档网站的描述。

## 完整示例
更多配置请参考 `docs/settings.ts` 以及 `docs/.vitepress/config.mts` 的内容，它可以配置文档的导航、标题、侧边栏等等：

```ts
// docs/settings.ts
export default {
  title: 'WPM.JS - 官方文档',
  description: '微前端包管理工具',

  nav: [
    { 
      text: '指引', 
      link: '/guide/', 
      activeMatch: '/guide/', 
    },
    { 
      text: '产品', 
      link: 'http://wpmjs.show.hsmob.com/index/product.html'
    },
    {
      text: '相关链接',
      items: [
        {
          text: '官网',
          link: 'http://wpmjs.show.hsmob.com/'
        },
      ]
    },
  ],

  sidebar: {
    '/guide/': [
      {
        text: '指南',
        items: [
          {
            text: '关于WPM.JS',
            link: '/about/'
          },
          {
            text: '快速上手',
            link: '/guide/'
          },
        ]
      },
      {
        text: '编写',
        items: [
          {
            text: 'Markdown',
            link: '/guide/markdown'
          },
          {
            text: '静态资源',
            link: '/guide/asset-handling'
          },
        ]
      },
    ]
  },

  footer: {
    message: '',
    copyright: 'Copyright © 2013-2023 www.weimob.com All Rights Reserved  上海微盟企业发展有限公司版权所有'
  },

  deploy: {
    outDir: '../dist',
    // base: ''
  }
}
```

## 网站标题
- 类型：`string | false`

您可以自定义项目以替换导航中的默认站点标题（`title`在应用程序配置中）。当设置为`false`时，导航中的标题将被禁用。当您`logo`已经包含网站标题文本时很有用。
```ts
export default {
  logo: '/logo.png',
  siteTitle: false,
}
```

## 导航
- 类型：`NavItem`

导航菜单项的配置
```ts
export default {
  nav: [
    { text: '指南', link: '/guide' },
    {
      text: '下拉菜单',
      items: [
        { text: '项目 A', link: '/item-1' },
        { text: '项目 B', link: '/item-2' },
        { text: '项目 C', link: '/item-3' }
      ]
    }
  ]
}
```

## 侧边栏
- 类型：`Sidebar`

侧边栏菜单项的配置
```ts
export default {
  sidebar: [
    {
      text: '指南',
      items: [
        { text: '介绍', link: '/introduction' },
        { text: '快速开始', link: '/getting-started' },
        ...
      ]
    }
  ]
}
```

## 页脚
- 类型：`Footer`

页脚配置。您可以在页脚上添加消息或版权文本，但是只有当页面不包含侧边栏时才会显示它。
```ts
export default {
  footer: {
    message: '沪ICP备14044897号-9',
    copyright: 'Copyright © 2013-2023 www.weimob.com All Rights Reserved  上海微盟企业发展有限公司版权所有'
  }
}
```


