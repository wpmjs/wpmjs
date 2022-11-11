# dynamic-remotes-plugin

[![npm](https://img.shields.io/npm/v/dynamic-remotes-plugin.svg)](https://www.npmjs.com/package/dynamic-remotes-plugin)

Compatible with [external-remotes-plugin](https://github.com/module-federation/external-remotes-plugin) plugin API

Provide hook, dynamic remote url

* options.resolvePath is required
* options.inject is not required

**Host webpack.config**
```js
const DynamicRemotesPlugin = require("dynamic-remotes-plugin")
const config = {
   ...otherConfigs
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      remotes: {
        app2: "app2@^1.0.0?a=1"
      }
    }).
    new DynamicRemotesPlugin({
      // This hook will take effect on both the node side and the browser side
      resolvePath(request) {
        const {name, version, entry, query} = request
        function join(start, str) {
          return (str && `${start}${str}`) || ""
        }
        return `https://unpkg.com/${name}${join("@", version)}${join("/", entry)}/remoteEntry.js${join("?", query)}`
      },
      // This hook only takes effect in the browser
      // The following demonstrates how to use semverhook to proxy a package to the local
      // https://github.com/wpmjs/wpmjs/tree/main/packages/semverhook
      inject(semverhook) {
        return `
        // mock dev
        window.isDev = true
        ${semverhook}.on("resolvePath", request => {
          if (window.isDev && request.name === "app2") {
            return "https://localhost:3000/remoteEntry.js"
          }
        })
        `
      }
    }),
  ]
}
```