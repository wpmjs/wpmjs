## wpmjs（web package manager）

* * Remote module versioning manager based on npm and module-federation
* You can use private or public npm as a remote module storage source, and you can also customize url rules
* Integrate module specifications such as system, umd, and module-federation



wpmjs.registerLoader({
  moduleType: "json",
  resolveUrl(){},
})

wpmjs.setConfig({
  baseUrl: "http://cdn.com/npm/",
  map: {
    react: {
      moduleType: "",
      url: "",
      npm: "",
    }
  }
})

wpmjs.sleep()
wpmjs.import()
wpmjs.get()
wpmjs.on()

wpmjs.registerLoader({
  moduleType: "mf",
  resolveUrl(){},
  resolveContainer(){},
  resolveEntry(){}
})

wpmjs.registerLoader({
  moduleType: "system",
  resolveUrl(){},
  resolveContainer(){},
  resolveEntry(){}
})

wpmjs.import("react@1.1")

definePlugin({
  env: "online"
})
wpmPlugin({
  rootApp: true,
  async initial() {
    window.wpmjs.sleep(() => fetch(json?env)
    .then(json => {
      window.wpmjs.mergeConfig({
        map: json
      })
    }))
  },
  baseUrl: "http://cdn.com/npm/",
  remotes: {
    react: "react@19.0.0/mf/remoteEntry.js",
    react: "react@19.0.0/mf/index.js",
    react1: {
      package: "react@19.0.0/mf/index.js",
      moduleType: "mf",
      url: ""
    }
  },
})