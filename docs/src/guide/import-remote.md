# 使用远程npm包
npm-federatio是wpmjs配套的webpack插件, 它的参数会透传给wpmjs

::: tip
要通过插件使用远程npm包需要遵循module-federation的方式对源码的入口文件进行一步简单改造（详看: bootstrap）
:::

## 使用远程umd包
``` js
import remoteReact from "react"
import remoteReactDom from "react-dom"
```
* 方式一, 使用jsdelivr作为源
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")

new NpmFederation({
  // 设置域名
  baseUrl: "https://cdn.jsdelivr.net/npm",
  remotes: {
    // 设置npm包path
    "react-dom": "react-dom/umd/react-dom.development.js",
    "react": "react/umd/react.development.js"
  }
})
```
* 方式2, 使用url作为源
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")

new NpmFederation({
  remotes: {
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js",
    "react": "https://cdn.jsdelivr.net/npm/react/umd/react.development.js"
  }
})
```

## 使用远程umd多入口包
大型umd模块需要自己暴露多入口进行懒加载, 下面例如我们自己上传一个umd的react模块, 对其useState、useEffect拆分成多个入口（chunk）进行懒加载

remote-react:
``` js
export const useState = () => import("./useState")
export const useEffect = () => import("./useEffect")
```
host-app:
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")

new NpmFederation({
  remotes: {
    "react": "https://xx.com/react/dist/index.js",
  }
})
```
``` js
import ModuleA from "react/useState" // 加载react.js, react-chunk1.js
import ModuleB from "react/useEffect" // 加载react-chunk2.js
```

## 使用远程system包
``` js
import remoteReact from "react"
import remoteReactDom from "react-dom"
```
* 方式一, 使用jsdelivr作为源
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")

new NpmFederation({
  // 设置域名
  baseUrl: "https://cdn.jsdelivr.net/npm",
  remotes: {
    // 设置npm包path
    "react-dom": "react-dom/umd/react-dom.development.js",
    "react": "react/umd/react.development.js"
  }
})
```
* 方式2, 使用url作为源
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")

new NpmFederation({
  remotes: {
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js",
    "react": "https://cdn.jsdelivr.net/npm/react/umd/react.development.js"
  }
})
```

## 使用远程module-federation包
``` js
import App1 from "mf-app-01/App"
import App2 from "mf-app-02/App"
```
* 方式一, 使用jsdelivr作为源
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")

new NpmFederation({
  // 设置域名
  baseUrl: "https://cdn.jsdelivr.net/npm",
  remotes: {
    // 设置npm包path
    "mf-app-01": "mf-app-01/dist/remoteEntry.js",
    "mf-app-02": "mf-app-02/dist/remoteEntry.js",
  },
})
```
* 方式2, 使用url作为源
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")

new NpmFederation({
  // 设置域名
  remotes: {
    // 设置npm包path
    "mf-app-01": "https://cdn.jsdelivr.net/npm/mf-app-01/dist/remoteEntry.js",
    "mf-app-02": "https://cdn.jsdelivr.net/npm/mf-app-02/dist/remoteEntry.js",
  },
})
```

## 使用远程json数据
``` js
import remoteJson from "remoteJson"
```
* 方式一, 使用统一域名
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")

new NpmFederation({
  // 设置域名
  baseUrl: "https://cdn.jsdelivr.net/npm",
  remotes: {
    // 设置npm包path
    "remoteJson": {
      moduleType: "json",
      packageFilename: "react/package.json"
    },
  },
})
```
* 方式2, 使用url作为源
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")

new NpmFederation({
  remotes: {
    "remoteJson": {
      moduleType: "json",
      url: "https://cdn.jsdelivr.net/npm/react/package.json",
    }
  },
})
```

## 自定义模块源url
如果你并非通过npm而是自行上传资源通过cdn访问, 可以通过重写各模块的加载器, 自定义请求的url的规则
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")

new NpmFederation({
  initial: `
    console.log("Inject code wpmjsInstance", wpmjs)
    wpmjs.registerLoader({
      moduleType: "system",
      resolveUrl({}) {

      }
    })
    wpmjs.registerLoader({
      moduleType: "mf",
      resolveUrl({}) {
        
      }
    })
    `,
  baseUrl: "https://cdn.jsdelivr.net/npm",
  remotes: {
    "@remix-run/router": "@remix-run/router/dist/router.umd.min.js",
    "mf-app-02": {
      package: "mf-app-02/dist/remoteEntry.js",
      global: "mfapp02"
    },
  },
})
```


## 运行时API
除了使用npm-federation插件, 还可以使用运行时api引入远程模块, 与插件的api一致。 

插件的remotes为wpmjs.addImportMap(), 插件的baseUrl为wpmjs.setConfig({baseUrl})。

例, 使用远程umd模块:
* 方式一, 使用jsdelivr作为源
``` js
wpmjs.setConfig({
  // 设置域名
  baseUrl: "https://cdn.jsdelivr.net/npm",
})
wpmjs.addImportMap({
  remotes: {
    // 设置npm包path
    "react-dom": "react-dom/umd/react-dom.development.js",
    "react": "react/umd/react.development.js"
  }
})
await wpmjs.import("react-dom")
await wpmjs.import("react")
```
* 方式2, 使用url作为源
``` js
wpmjs.addImportMap({
  remotes: {
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js",
    "react": "https://cdn.jsdelivr.net/npm/react/umd/react.development.js"
  }
})
await wpmjs.import("react-dom")
await wpmjs.import("react")
```

## 版本配置化
远程模块的版本可以动态配置, 例如可以通过读取一个远程返回的json数据来决定加载模块的版本:
* 方式1, 异步获取远程版本配置, 使用wpmjs.sleep() :
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
* 方式2, 通过ssr或注入等方式在页面响应时返回版本配置
``` js
wpmjs.addImportMap({
  initial: `
  wpmjs.addImportMap({
    react: {packageVersion: window.$json.react},
    react: {packageVersion: window.$json.reactDom},
  })
  `,
  remotes: {
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.development.js",
    "react": "https://cdn.jsdelivr.net/npm/react/umd/react.development.js"
  }
})
```
