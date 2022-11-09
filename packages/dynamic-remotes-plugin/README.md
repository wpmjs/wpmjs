# dynamic-remotes-plugin

**Host webpack.config**
```js
const DynamicRemotesPlugin = require("dynamic-remotes-plugin")
const config = {
   ...otherConfigs
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      remotes: {
        // not support @module-federation/typescript
        app2: "app2@[window.app2Url]/remoteEntry.js",
        // fixed format, support @module-federation/tyreadpescript
        app3: "app3@^1.0.0?a=1"
      }
    }).
    new DynamicRemotesPlugin({
      resolvePath(request) {
        const {name, version, entry, query} = request
        function join(start, str) {
          return (str && `${start}${str}`) || ""
        }
        return `https://unpkg.com/${name}${join("@", version)}${join("/", entry)}/remoteEntry.js${join("?", query)}`
      }
    }),
  ]
}
```

or

```js
plugins: [
    new ModuleFederationPlugin({
        name: 'my-app',
        remotes: {
            'my-remote-1': 'my-remote-1@[window.remote-1-domain]/remoteEntry.js?[getRandomString()]',
            ...
        },
        shared: {...}
    }),
    new DynamicRemotesPlugin(), //no parameter,
]
```

**Host (app1) source somewhere before loading main entry file**
```js
window.app2Url = "//localhost:3002"; // Whatever the url/logic to determine your remote module is

import("./bootstrap");
```

Working example is also available in this PR: https://github.com/module-federation/module-federation-examples/pull/557.

**Update:** the PR was merged a example can be found under [advanced-api/dynamic-remotes-synchronous-imports](https://github.com/module-federation/module-federation-examples/tree/d5cf265c2d4fd040797cbae806badd8267ad5b8f/advanced-api/dynamic-remotes-synchronous-imports)
