# 上传远程npm包
上传方式与普通npm包无异, 正常通过npm publish对npm或私有源进行上传即可

::: tip
1. 需要暴露至少一个模块规范为umd、amd、system、module-federation其中一种的入口文件
2. 如果当前要上传的模块需要使用其他远程模块, 可以通过各构件工具的externals或module-federation的remotes、shared来声明不要将这些远程依赖打包进输出产物中
:::

## 上传umd包
下面是一个简单的umd包webpack配置示例, 设置externals将react、react-dom外置, wpmjs会自动处理remotes和shared以及umd的依赖共享
``` js
// webpack.config.js
const path = require("path")

module.exports = {
  entry: "src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./index.js",
    library: {
      name: "umdName",
      type: "umd"
    }
  },
  externals: ["react", "react-dom"]
}
```

## 上传module-federation包
下面是一个简单的module-federation包webpack配置示例, 可以设置remotes和shared声明外部模块或共享模块, npm-federation插件会自动处理remotes和shared以及umd的依赖共享
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")


module.exports = {
  entry: "src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./index.js",
  },
  plugins: [
    new NpmFederation({
      // 设置域名
      baseUrl: "https://cdn.jsdelivr.net/npm",
      remotes: {
        "react-dom": "react-dom/umd/react-dom.development.js",
      },
      shared: {react: {}},
      // 拥有name和filename属性会自动将本地端口上报到websocket中
      filename: "remoteEntry.js",
      name: "remoteApp",
      exposes: {
        "./App": "./src/App"
      }
    })
  ]
}
```

## 开发&调试
如果这个包需要能够线上和本地服务能够[一键切换](./debug-panel#connect), 则需要将本地服务的端口上报到websocket服务中。可以通过npm-federation或webpack-port-collector插件实现

* 方式1, webpack-port-collector插件
webpack-port-collector插件会收集本地启动的dev-server端口上报到websocket服务中, 给调试面板使用
``` js
// webpack.config.js
const Port = require("webpack-port-collector")


module.exports = {
  entry: "src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./index.js",
  },
  plugins: [
    new Port({
      projectName:'remoteApp',
      filename: "remoteEntry.js"
    })
  ]
}
```
* 方式2, npm-federation插件会自动处理remotes和shared以及umd的依赖共享, 还会自动将设置了name、filename的模块的端口上报供调试面板使用
``` js
// webpack.config.js
const NpmFederation = require("npm-federation")


module.exports = {
  plugins: [
    new NpmFederation({
      // 拥有name和filename属性会自动将本地端口上报到websocket中
      filename: "remoteEntry.js",
      name: "remoteApp",
      exposes: {
        "./App": "./src/App"
      }
    })
  ]
}
```