export default {
  title: 'WPM.JS - 官方文档',
  description: '微前端包管理工具',

  // logo: '/logo.png',
  // siteTitle: false,

  nav: [
    { 
      text: '指南', 
      link: '/guide/', 
      activeMatch: '/guide/', 
    },
    { 
      text: 'API', 
      link: '/api/'
    },
    { 
      text: '参考', 
      link: '/refs/', 
    },
    {
      text: '相关链接',
      items: [
        {
          text: 'GitHub',
          link: 'http://wpmjs.show.hsmob.com/'
        },
        {
          text: '问题反馈',
          link: 'http://wpmjs.show.hsmob.com/issue/'
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
          {
            text: '配置',
            link: '/guide/settings'
          },
          {
            text: '部署',
            link: '/guide/deploying'
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
      }
    ]
  },

  footer: {
    message: '',
    copyright: 'Copyright © 2013-2023 www.weimob.com All Rights Reserved  上海微盟企业发展有限公司版权所有'
  },

  deploy: {
    outDir: '../dist',
    base: ''
  }
}