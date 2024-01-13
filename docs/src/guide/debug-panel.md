# 使用调试面板

## 开启调试模式
开启调试模式后页面上会出现调试面板, 调试面板有各种便捷的插件来提高工作效率
* 方式1, 使用了npm-federation插件的本地启动的服务, 会自动开启调试模式
* 方式2, 通过wpmjs.debug()开启调试模式
``` js
wpmjs.debug({
    baseUrl: "https://cdn.jsdelivr.net/npm",
    plugins: ["connect", "alias"]
})

```
* 方式3, 通过在url携带query调试参数开启调试模式, 例如 http://xxx.com?wpmDebug
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")

new NpmFederation({
  debug: {
    openQuery: "wpmDebug",
    baseUrl: "https://cdn.jsdelivr.net/npm",
    plugins: ["connect", "alias"]
  },
})
```
* 方式4, 通过localStorage开启调试模式
``` js
localStorage.setItem("wpm-debug-open", 1)
```

## 调试面板插件

## connect
本地启动的服务可以通过插件上报本地端口至websocket来实现一键切换

* 例: 本地只启动mf-app-01这一个模块的代码, 线上环境可以一键切换将这个模块连接到本地服务
![](/debug-connect.png)

## alias
通过调试面板alias插件, 可以自由切换线上应用的react模块的版本、url等, 来快捷调试多个版本
![](/debug-alias.png)


## 更多调试插件
可以通过debug.plugins参数来使用调试面板插件:
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")

new NpmFederation({
  debug: {
    openQuery: "wpmDebug",
    plugins: ["connect", "alas", "xxxx"],
    baseUrl: ""
  },
})
```

通过npm查询更多wpm调试面板插件:

https://www.npmjs.com/search?q=wpm-develop-
