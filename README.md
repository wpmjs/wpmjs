## wpmjs（web package manager）

[![npm](https://img.shields.io/npm/v/wpmjs.svg)](https://www.npmjs.com/package/wpmjs)
[中文文档](https://wpmjs.github.io/wpmjs/build/contribute/loader.html)

wpmjs is a loader that can load umd, system, module-federation and share dependencies, Supports custom or extended module loaders, supports multi-version coexistence, and is also equipped with debugging plug-ins and packaging tool plug-ins.

> By default, [systemjs](https://npmjs.com/package/systemjs) and [module-federation-runtime](https://npmjs.com/package/module-federation-runtime) are used to load various modules, and you can also re-implement the default behavior yourself

## online demo
[to experience](https://zhanghongen.github.io/universal-module-federation-plugin/), The following demo demonstrates the use of remote mf module + remote umd module + local react module
> ``` js
> import wpmjs from "wpmjs"
> import React from "react"
> 
> wpmjs.setConfig({ baseUrl: "https://cdn.jsdelivr.net/npm" })
> wpmjs.addImportMap({
>     // Unified domain name
>     "antd": "antd@5.9.0/dist/antd.min.js",
>     "dayjs": "dayjs@1.11.1",
>     // custom url
>     "mf-app-01": "mfapp01@https://cdn.jsdelivr.net/npm/mf-app-01@1.0.5/dist/remoteEntry.js",
>     "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"
> })
> // Umd, system, and mf will give priority to looking for dependencies written here.
> wpmjs.setShared({ name: "react", version: "18.2.0", get: () => React })
> 
> await wpmjs.import("mf-app-01")
> await wpmjs.import("antd")
> wpmjs.get("react")

### develop-plugins
develop-plugins is an extensible debugging panel（[Contribute new develop-plugin](./doc/develop-plugin.md)）, The system plug-ins connect and alias can provide the ability to switch local dev-server and debug specified versions with one click.
![](assets/17000385880541.jpg)

### Build tools
Load remote modules using synchronous syntax, [npm-federation](https://github.com/zhangHongEn/universal-module-federation-plugin/tree/main/packages/npm-federation-webpack)
``` js
// bootstrap.js
import React from "react" // react is remote module
```
``` js
// webpack.config.js
new NpmFederation({
  remotes: {
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"
  },
  shared: {react: {}}
})
```

### extension loader
To modify the default loader or develop a new loader, please see the API: registerLoader() section


## API
### setConfig()
``` ts
wpmjs.setConfig({
  baseUrl: string; // unified url
  defaultModuleType(name): string; // The module type used when loading a module where moduleType is not set
  defaultVersion(name: string): string; // The version used when loading modules without packageVersion set
  defaultImportMap(name: string): Map; // See addImportMap for details
  defaultGlobal({name, version}): string; // The key used when loading modules without global set
})
```
Global configuration
1. Note that this demo is not the default value of wpmjs
    ``` js
    wpmjs.setConfig({
      baseUrl: "https://cdn.jsdelivr.net/npm/",
      defaultModuleType() { return "system" },
      defaultVersion() { return "latest" },
      defaultImportMap(name) { return {packageName: name, packageQuery: "v=" + +new Date} },
      defaultGlobal({name}) {return name}
    })
    ```

### addImportMap()
``` ts
wpmjs.addImportMap({
  [key: string]: string | {
    url?: string; // custom url
    global?: string; // global variable name
    moduleType?: string; // module type
    packageName?: string; // The package name will be used to splice unified URL rules.
    packageQuery?: string; // Query parameters will be used to splice unified url rules
    packageVersion?: string; // Package version, will be used for splicing of unified url rules
    packageFilename?: string; // Package entry file, will be used for splicing to agree with url rules
    strictVersion?: boolean; // If the obtained shared module does not match the specified version, a request will be initiated to load the specified version.
    shareScope?: string; // Looking for dependency space
  }
})
```
Configuration module mapping, multiple attributes can be configured multiple times, Each attribute is subject to the first registration. Multiple registrations will not cause overwriting. If there are irregular remote module links, you can set the url attribute, Otherwise, it is recommended to uniformly manage the links of remote modules through attributes such as packageName and packageVersion.。
1. String shorthand syntax: mapping umd and mf modules through url
    1. global@https?://The starting setting is mf
        ``` js
        wpmjs.addImportMap({
            // Equivalent to configuration: {moduleType: "mf", global, url}
            "mf-app-01": "mfapp01@https://cdn.jsdelivr.net/npm/mf-app-01@1.0.5/dist/remoteEntry.js",
        })
        ```
    2. https?://The setting at the beginning is system
        ``` js
        wpmjs.addImportMap({
            // 等同于配置: {moduleType: "system", url}
            "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"
        })
        ```
2. Shorthand syntax: mapping configuration through npm package name syntax
    1. Contains remoteEntry.js set to mf
        ``` js
        wpmjs.addImportMap({
            // Equivalent to configuration: {moduleType: "mf", packageName: "mf-app-01", packageVersion: "1.0.5", packageFilename: "dist/remoteEntry.js"}
            "mf-app-01": "mf-app-01@1.0.5/dist/remoteEntry.js"
        })
        ```
    2. No remoteEntry.js is set to system
        ``` js
        wpmjs.addImportMap({
            // Equivalent to configuration: {moduleType: "system", packageName: "react-dom", packageFilename: "dist/umd/react-dom.development.js"}
            "react-dom": "react-dom/umd/react-dom.development.js",
        })
        ```
    3. No filename does not set moduleType
        ``` js
        wpmjs.addImportMap({
             // Equivalent to configuration: {packageName: "react", packageVersion: "18.2.0"}
            "react": "react@18.2.0"
        })
        ```
3. Object syntax: {moduleType, global, packageName, packageQuery, packageVersion, packageFilename, strictVersion, shareScope} can be set multiple times.
    1. Set package version individually
        ``` js
        wpmjs.addImportMap({ "react": {packageVersion: "18.2.0", moduleType: "system"}, "react-dom": { packageVersion: "18.2.0" } })
        // react-dom will use version 18.2.0 instead of 17.0.2
        wpmjs.addImportMap({ "react": "react", "react-dom": "react-dom@17.0.2/umd/react-dom.development.js" })
        ```
### import()
``` ts
import(request: string): Promise<Module | any>
```
Load and obtain the remote module, it will be automatically cached and will not make multiple requests. The request can be a module name, or a module + entry path name.
1. Directly load an entry, the result is equal to 2
``` js
const entry = await wpmjs.import("mf-app-01/App")
```
2. Only load a certain module, not the specific entry
``` js
const module = wpmjs.import("mf-app-01")
// Load the entrance when needed./App
const entry = await container.$getEntry("./App")
```
> Corresponding to writing method 2, when the input parameter is a module name that does not include the entry path, $getEntry will be mounted for the return value to smooth the way for various types of modules to obtain entries. wpmjs provides default entry parsing behavior for each module, but you can also customize it.
> * umd or system: [wpmjs/src/extras/umdAndSystem.js](./src/extras/umdAndSystem.js) resolveEntry()
> ``` js
> umdModule.$getEntry("App") ====The internal logic is equal to==== await umdModule["App"]()
> ```
> * module-federation: [wpmjs/src/extras/mf.js](./src/extras/mf.js)  resolveEntry()
> ``` js
> mfModule.$getEntry("App") ====The internal logic is equal to==== (await mfModule.get("App"))()
> ```
> * json: [wpmjs/src/extras/json.js](./src/extras/json.js)  resolveEntry()
> ``` js
> jsonModule.$getEntry("App") ====The internal logic is equal to==== jsonModule["App"]
> ```

### get()
``` ts
wpmjs.get(request: string): any
```
Obtain the synchronization value of a module from the cache. Undefined will be obtained before the module is loaded.
``` js
wpmjs.import("react")
wpmjs.get("react") // undefined
await wpmjs.import("react")
wpmjs.get("react") // React
```
### setShared()
``` ts
wpmjs.setShared({
    // module name
    name: string,
    // module version
    version: string,
    // module loading function
    get: function(): Promise<any>;
    
    loaded?: boolean | number;
    shareScope?: string;
    fromType?: string;
    from?: string;
})
```
Register a shared module. The shared module supports the coexistence of multiple versions. ***Automatically share and interoperate among various modules such as umd, system, module-federation and its shared***
``` js
wpmjs.setShared({
  name: "react",
  version: "18.2.0",
  async get() {
    // You can request remote resources
    return System.import("https://react.js")
    // Local objects can also be returned
    return {test: 1111}
  }
})
```
### getShared()
``` ts
wpmjs.getShared({
  name: string;
  strictVersion?: boolean;
  singleton?: boolean;
  shareScope?: string;
  requiredVersion?: string;
}): Promise<any>
```
Load shared modules
``` js
await wpmjs.getShared({name: "react"})
await wpmjs.getShared({name: "react", requiredVersion: "18.2.0", singleton: true})
```
### sleep()
Wait for a while before making a load request
1. Dynamic importMap
``` js
wpmjs.sleep(window.fetch("https://importMap.json").then(res => res.json())
  .then(importMap => {
    wpmjs.addImportMap({
      react: {packageVersion: "17.0.2"},
      ...importMap
    })
  })
await wpmjs.import("react") // 17.0.2
```

### constructor()
Create new wpmjs instance
1. Coexistence of multiple versions
``` js
const wpmjs = window.wpmjs
const wpmjs1 = new wpmjs.constructor({
  // Name will be appended when printing error message
  name: "wpmjs1"
})
    
wpmjs.addImportMap({ packageName: "react", packageVersion: "18.2.0", strictVersion: true })
wpmjs1.addImportMap({ packageName: "react", packageVersion: "17.0.2", strictVersion: true })
    
wpmjs.import("react") // 18.2.0
wpmjs1.import("react") // 17.0.2
```

### System
Use [systemjs-intercept](https://npmjs.com/package/systemjs-intercept) to intercept the systemjs instance of the loading process. The modules and dependencies loaded by this instance will be found using wpmjs
``` js
wpmjs.System.import("react-dom")
```

### registerLoader()
Register a new module type and its loader, for example:
1. Create a css loader
    ``` js
    wpmjs.registerLoader({
        moduleType: "css",
        resolveUrl({name, version, query, entry, filename, baseUrl}) {
            if (/https?:\/\/(localhost|(\d+\.){2})/.test(baseUrl)) {
              return `${baseUrl}/${filename}`
            }
            query = query ? "?" + query : ""
            filename = filename ? "/" + filename : ""
            version = version ? "@" + version : ""
            return `${baseUrl}/${name}${version}${filename}${query}`
        },
        resolveContainer(url, {requestObj, pkgConfig}) {
            var link = document.createElement("link")
            link.href = url
            document.head.appendChild(link)
            return link
        },
        resolveEntry(container, entry) {
            return null
        }
    })
    
    wpmjs.addImportMap({ testCss: { packageName: "antd@0.0.1/dist/index.css", moduleType: "css" } })
    wpmjs.import("testCss")
    ```
2. Customize the loading behavior of the system module (such as url rules, how to execute js, etc.)
    ``` js
    wpmjs.registerLoader({
        resolveUrl() {
            return url
        },
        async resolveContainer(url, {requestObj}) {
            eval(await (await fetch(url)).text())
            return window[requestObj.name]
        },
        resolveEntry(container, entry) {
            return container[entry]
        }
    })
    ```

### debug()
``` ts
wpmjs.debug({
    baseUrl: string; // develop-panel will need some remote npm packages, set the source for it here
    plugins: Array<string> // wpm-develop-panel is a debugging panel that can embed some debugging tools. You can configure the tool name here, and the npm package corresponding to wpm-develop-${plugins[index]} will be automatically loaded.
})
```
Open the debugging panel, you can use system plug-ins and custom plug-ins
``` js
window.wpmjsDebug.debug({
    baseUrl: "https://cdn.jsdelivr.net/npm",
    plugins: ["connect", "alias"]
})
```

## Contribution Guidelines
1. Supplementary single test (wpmjs sdk)
4. Vite plug-in, rspack plug-in (implemented using @module-federation/vite; continue to pay attention to the latest mf news of rspack)
5. demo (construction of various demo warehouses)
6. Documentation (concepts, tutorials, related specifications, performance optimization principles and advantages)
7. You can contribute performance optimization code to the official webpack (see the chunkMap section for details. https://github.com/module-federation/universe/discussions/1170)
8. Browser plug-in (debug panel plug-in version, only need to read ws and set localstorage)
9. Notes on qiankun: qiankun needs to set global plus publicPath
10. Hot update specification method
11. Plug-in development method, plug-in automatically introduces API implementation, debug parameter implementation
12. wpm-develop-preview plug-in development, similar to a story book
13. wpm-develop-panel can be dragged and the folded and expanded state is cached

