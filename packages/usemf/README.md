# usemf

Usemf is a jssdk (not a react hook) used to introduce module-federation in a non-webpack5 environment

With "usemf", you don't have to worry about the inability of "module federation" to migrate due to future technology upgrades. No matter what build tool you switch to, using "usemf" can continue to reference "module federation"



[中文文档](doc/chinese)

1. Modules of module federation can be introduced, and shared can be overwritten
2. [@module-federation/webpack-4](https://www.npmjs.com/package/@module-federation/webpack-4) 



## Usage scenario
1. If you need to use the module Federation library provided by yourself or a third party in a non webpack5 environment, you can use usemf

## Try online
https://stackblitz.com/github/wpmjs/wpmjs/tree/main/examples/umd-and-module-federation?file=app1%2Fsrc%2FApp.js

## Simplest usage:
"Shared" is not required, and the "MF" module will automatically use the standby module
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

## Advanced Usage:
``` js
import React from "react";
import usemf from "usemf"

const shared = {
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