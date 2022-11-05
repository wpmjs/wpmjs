# usemf

usemf是一个jssdk（不是react hook）, 用于在非webpack5环境引入module-federation

有了 "usemf" , 就不必担心以后的技术升级导致"module-federation"无法迁移, 无论您切换到什么构建工具, 使用"usemf"都能够继续引用"module-federation"

1. 可以引入webpack 4 和 5 打出的 module federation的模块, 并且可以覆盖shared
2. [@module-federation/webpack-4](https://www.npmjs.com/package/@module-federation/webpack-4) 

## 使用场景
1. 如果需要在非webpack5环境使用自己或第三方提供的module federation库, 则可以使用usemf

## 在线尝试
https://stackblitz.com/github/wpmjs/wpmjs/tree/main/examples/umd-and-module-federation?file=app1%2Fsrc%2FApp.js
## 简单用法:
可不传shared, mf模块会自动使用备用模块
``` js
import usemf from "usemf"

const app2 = usemf.import({
  url: "http://localhost:3002/remoteEntry.js",
  name: "app2",
})("./App")
```

## API:
* import({url, name, shared: {shareScope, pkg}, customGetContainer})
* getShareScopes()
* getContainer({url, name, customGetContainer})
* getShare(name, {requiredVersion,shareScope,singleton,strictVersion}, shareScopes)
## 高级用法:
``` js
import React from "react";
import usemf from "usemf"

const shared = {
  shareScope: "default",    // Default value is not required

  // You can provide shared React to make app2 not use the standby react module to achieve react singleton
  react: {
    version: "17.0.2",
    async get () {
      // const res = await window.System.import("https://unpkg.com/react@17.0.2/umd/react.development.js")
      return function () {
        return React
      }
    }
  },
  "react-dom": {
    version: "17.0.2",
    async get () {
      return function () {
        return {
          test: "react-dom"
        }
      }
    }
  }
}

const app2 = usemf.import({
  url: "http://localhost:3002/remoteEntry.js",
  name: "app2",
  shared:  {
    shareScope: "scope2",
    react: shared.react
  }
})("./App")

const app3 = usemf.import({
  url: "http://localhost:3003/remoteEntry.js",
  name: "app3",
  shared
})("./App")

const App2 = React.lazy(() => app2)
const App2_2 = React.lazy(() => app3)
```