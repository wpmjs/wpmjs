# 编写loader

## 编写一个css-loader
registerLoader() 注册新的模块类型与其加载器, 
* resolveUrl() 用于拼接请求的url
* resulveContainer() 用于发起模块请求
* resolveEntry() 用于解析模块的各个入口

例: 创建一个css加载器
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
