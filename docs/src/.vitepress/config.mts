import { defineConfig } from 'vitepress'
import settings from '../settings'

export default defineConfig({
  outDir: settings.deploy.outDir,
  base: settings.deploy.base,
  // ignoreDeadLinks: true,

  title: settings.title,
  description: settings.description,
  lang: 'zh-CN',

  lastUpdated: true,
  
  head: [
    ['link', { rel: 'shortcut icon', href: '/logo.ico' }],
  ],

  vue: {
    reactivityTransform: true
  },

  themeConfig: {
    logo: settings.logo,
    siteTitle: settings.siteTitle,

    nav: settings.nav,
    sidebar: settings.sidebar, 
    footer: settings.footer,

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    lastUpdatedText: '更新时间',
    outlineTitle: '目录',

    docFooter: {
      next: '下一篇',
      prev: '上一篇',
    },

    notFound: {
      title: '抱歉，您访问的页面不存在',
      quote: '请检查您输入的网址是否正确，或者返回主页继续浏览。谢谢！',
      linkText: '返回主页',
      linkLabel: '回到主页',
    },
  },

  markdown: {
    anchor: {},
    config: (md) => {}
  }
})
