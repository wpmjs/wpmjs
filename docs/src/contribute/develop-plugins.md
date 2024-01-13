# 编写调试面板插件

## 开发插件
1. yarn create-wpm-develop custom
2. cd wpm-develop-custom && yarn && yarn start
3. 调试面板插件需要导出一个react组件, 插件可以通过wpmjs和localStorage来做一些便捷的工具
``` js
// src/main.js
export default function Custom(props){
  return <div>custom plugin</div>
}
```

## API
* props.localStorage 请使用props.localStorage获取和设置缓存
  * debug-import-map 调试面板主要操作的缓存, 与[addImportMap](../api//wpmjs.md#addimportmap)的格式一致, 设置后这个map在调试模式会最以最高优先级生效, connect、alias插件使用的都是这个数据
  ``` js
  // src/main.js
  export default function Custom(props){
    console.log("调试中的模块", props.localStorage.getItem("debug-import-map"))
    // props.localStorage.setItem("debug-import-map", JSON.stringify({...}))
    return <div>custo pluginm</div>
  }
  ```
* props.connectorList: [{name, url}, ...] 本地启动的dev-server数组
  ``` js
  // src/main.js
  export default function Custom(props){
    return <div>{JSON.stringify(props.connectorList)}</div>
  }
  ```