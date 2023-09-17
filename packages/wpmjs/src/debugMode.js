
import parseURLQuery from './utils/parseURLQuery';
import global from "global"
const queryInfo = parseURLQuery();

export default function (wpmjs) {
  !(function () {
    if("wpmDebug" in queryInfo) {
      localStorage.setItem('wpm-debug-open', 1);
      localStorage.setItem('wpm-debug-url', queryInfo.wpmDebug);
    }
  })();
  if (localStorage.getItem('wpm-debug-open') != 1) return
  // localStorage.setItem("wpm-debug-injectCode", `
  // $wpmjs.addImportMap({
  //   "react17-dev": "react17-dev@17.0.2/umd/react.development.js",
  //   "react-dom17-dev": "react-dom17-dev@17.0.2/umd/react-dom.development.js",
  //   "react18-dev": "react18-dev@18.2.0/umd/react.development.js",
  //   "react-dom18-dev": "react-dom18-dev@18.2.0/umd/react-dom.development.js",
  //   "vue3-dev": "vue3-dev@3.3.4/dist/vue.runtime.global.js",
  //   "vue2-dev": "vue2-dev@2.7.14/dist/vue.runtime.js",
  //   "react-refresh": "react-refresh@0.14.4/dist/index.js",
  // })
  // $wpmjs.addImportMap({
  //   "react17-dev": {
  //     url: "https://unpkg.com/react@17.0.2"
  //   },
  //   "react-dom17-dev": {
  //     url: "https://unpkg.com/react-dom@17.0.2"
  //   },
  //   "react18-dev": {
  //     url: "https://unpkg.com/react@18.2.0"
  //   },
  //   "react-dom18-dev": {
  //     url: "https://unpkg.com/react-dom@18.2.0"
  //   },
  //   "vue3-dev": {
  //     url: "https://unpkg.com/vue@3.3.4"
  //   },
  //   "vue2-dev": {
  //     url: "https://unpkg.com/vue@2.7.14"
  //   },
  //   "react-refresh": {
  //     url: "https://unpkg.com/react-refresh-umd@0.14.4"
  //   }
  // })
  // $wpmjs.setShared({
  //   name: "react",
  //   version: "17.9999.9999",
  //   from: $wpmjs.config.name,
  //   async get() {
  //     return $wpmjs.import("react17-dev")
  //   }
  // })
  // console.log(JSON.stringify(__global_share_scopes__.default.react))
  // $wpmjs.setShared({
  //   name: "react",
  //   version: "18.9999.9999",
  //   from: $wpmjs.config.name,
  //   async get() {
  //     return $wpmjs.import("react18-dev")
  //   }
  // })
  // console.log(JSON.stringify(__global_share_scopes__.default.react))
  // $wpmjs.setShared({
  //   name: "vue",
  //   version: "3.9999.9999",
  //   from: $wpmjs.config.name,
  //   async get() {
  //     return $wpmjs.import("vue3-dev")
  //   }
  // })
  // $wpmjs.setShared({
  //   name: "vue",
  //   version: "2.9999.9999",
  //   from: $wpmjs.config.name,
  //   async get() {
  //     return $wpmjs.import("vue2-dev")
  //   }
  // })
  // $wpmjs.setShared({
  //   name: "react-dom",
  //   version: "17.9999.9999",
  //   from: $wpmjs.config.name,
  //   async get() {
  //     const RF = await $wpmjs.import("react-refresh")
  //     $global.__singleReactRefreshRuntime__ = RF
  //     RF.injectIntoGlobalHook($global)
  //     return $wpmjs.import("react-dom17-dev")
  //   }
  // })
  // $wpmjs.setShared({
  //   name: "react-dom",
  //   version: "18.9999.9999",
  //   from: $wpmjs.config.name,
  //   async get() {
  //     const RF = await $wpmjs.import("react-refresh")
  //     $global.__singleReactRefreshRuntime__ = RF
  //     RF.injectIntoGlobalHook($global)
  //     return $wpmjs.import("react-dom18-dev")
  //   }
  // })
  // `)
  // try {
  //   const injectFn = new Function("$wpmjs", "$global", localStorage.getItem("wpm-debug-injectCode") || "")
  //   injectFn(wpmjs, global)
  // } catch (e) {
  //   console.error(`wpmjs debugMode inject code error:`, e)
  // }
  const wpmAlias = (function () {
    try {
      return JSON.parse(localStorage.getItem("wpm-alias")) || []
    } catch (e) {
      return {}
    }
  })()
  const wpmPkgList = (function () {
    try {
      return JSON.parse(localStorage.getItem("wpm-pkgList")) || []
    } catch (e) {
      return []
    }
  })()
  const wpmActivePkgMap = (function () {
    try {
      return JSON.parse(localStorage.getItem('wpm-activePkgMap')) || {}
    } catch (e) {
      return {}
    }
  })()
  wpmPkgList.forEach(({name: pkg, url}) => {
    if (!wpmActivePkgMap[pkg]) return
    wpmjs.addImportMap({
      [pkg]: {
        url: url
      }
    })
  })
  wpmAlias.forEach(({source, target}) => {
    wpmjs.addImportMap({
      [source]: {
        packageVersion: target
      }
    })
  })
  
}

export async function loadPlugins(config) {
  const wpmjsDebug = global.wpmjsDebug
  wpmjsDebug.setConfig({
    baseUrl: (config || {}).baseUrl
  })
  wpmjsDebug.addImportMap({
    [`wpm-develop-panel`]: {
      packageName: "wpm-develop-panel",
      moduleType: "system",
      packageFilename: "dist/index.js",
      packageFilename: "index.js",
      // url: `http://localhost:8082`
    },
    "react-dom": "react-dom@18.2.0/umd/react-dom.development.js",
    "react": "react@18.2.0/umd/react.development.js",
  })
  const {default: init} = await wpmjsDebug.import("wpm-develop-panel")
  init(config)
}