# 为什么选wpmjs
wpm(web package manager) 可以简单的理解为远程的npm包, 无需将依赖安装到本地打包进项目中, 更新依赖也无需重新部署整个项目。

## 构建&部署
通过wpmjs引入的npm包, 这些包可以独立构建并发布新版本。发布新版本或本地开发时, 只需要启动需要改动的服务而无需额外打包整个项目, 构建速度能够按比例的提升。

## 调试效率
可以单独在本地启动项目或模块, 并在任意用到它的页面一键连接到本地进行调试, 由于只需要启动单个模块, 本地服务的启动速度和HMR更新速度都会非常快。
* 本地只启动mf-app-01这一个模块的代码, 线上环境可以一键切换将这个模块连接到本地服务
![](/debug-connect.png)
* 通过调试面板alias插件, 可以自由切换线上应用的react模块的版本、url等, 来快捷调试多个版本
![](/debug-alias.png)

## 运行性能
自动化编译工具能够做到比手动编写运行时代码性能更高的预加载代码来做到移除加载瀑布

加载瀑布img

## 项目侵入小
无论你是全新项目或是老项目升级, wpmjs提供了运行时api和构建插件, 可以加载复用现在市面上已经存在的umd、amd、system、module-federation等主流模块规范的包（也可以自定义规范）, 使多种模块规范能够自动共享依赖。并且支持jsdelivr或其他私有化源作为cdn进行版本化管理。
* 支持运行时使用异步(promise)引入远程模块的方式
``` js 
wpmjs.addImportMap({
  "react": "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.development.js",
})
await wpmjs.import("react")
```
* 支持打包构建使用同步语法(es import)引入远程模块的方式
``` js 
// webpack.config.js
const NpmFederation = require("wpmjs/npm-federation")
new NpmFederation({
  remotes: {
    "react": "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.development.js",
  },
})

// src/bootstrap.js
import remoteReact from "react"
```
* 支持jsdelivr等npm源
``` js 
wpmjs.setConfig({
  baseUrl: "https://cdn.jsdelivr.net/npm"
})
wpmjs.addImportMap({
  "react": "react@17.0.2/umd/react.development.js",
})
await wpmjs.import("react")
```
* 支持自定义url规则
``` js 
wpmjs.setConfig({
  baseUrl: "https://cdn.custom.com"
})
wpmjs.registerLoader({
  moduleType: "system",
  resolveUrl({name, version, query, entry, filename, baseUrl}) {
    query = query ? "?" + query : ""
    filename = filename ? "/" + filename : ""
    version = version ? "/" + version : ""
    return `${baseUrl}/${name}${version}${filename}${query}`
  },
})
wpmjs.addImportMap({
  "react": "react@17.0.2/umd/react.development.js",
})
await wpmjs.import("react")
```

## 动态管理版本
如果你想动态管理项目中的依赖版本, 这是wpmjs比较擅长的事情, 例如可以通过 wpmjs.addImportMap() 为每个依赖动态注册要引用的版本, 这对于**公共模块的发布或实现灰度测试等场景**非常方便。

例如通过一个json配置来设置项目中各模块的版本：
``` js
// webpack.config.js
new NpmFederation({
  // 注入代码
  initial: `
    wpmjs.sleep(new Promise(resolve => {
      fetch("http://xxx.json").then(json => {
        // 注册
        wpmjs.addImportMap({
          react: {packageVersion: json.react},
          antd: {packageVersion: json.antd}
        })
        resolve()
      })
    }))
  `,
  remotes: {
    "react-dom": "react-dom/umd/react-dom.development.js",
    "react": "react/umd/react.development.js",
  }
})
```