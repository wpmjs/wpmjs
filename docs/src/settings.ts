export default {
  logo: "/logo.png",
  title: '官方文档',
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
      text: 'GitHub',
      link: 'https://github.com/weimob-tech/wpmjs'
    },
  ],

  sidebar: {
    '/': [
      {
        text: '指南',
        items: [
          {
            text: '为什么选wpmjs',
            link: '/guide/why'
          },
          {
            text: '使用远程npm包',
            link: '/guide/import-remote'
          },
          {
            text: '开发远程npm包',
            link: '/guide/upload-remote'
          },
          {
            text: '使用调试面板',
            link: '/guide/debug-panel'
          },
        ]
      },
      {
        text: '扩展或贡献',
        items: [
          {
            text: '编写loader',
            link: '/contribute/loader'
          },
          {
            text: '编写调试面板插件',
            link: '/contribute/develop-plugins'
          },
        ]
      },
      {
        text: 'API',
        items: [
          {
            text: '插件API',
            link: '/api/plugin'
          },
          {
            text: 'wpmjs API',
            link: '/api/wpmjs'
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
    outDir: '../build',
    base: '/wpmjs/build'
  }
}