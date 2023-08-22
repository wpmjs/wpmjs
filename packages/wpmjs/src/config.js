import localStorage from "./utils/getLocalStorage";
import requestParse from "package-request-parse"

export const config = {
  baseUrl: "",
  defaultVersion: () => "latest",
  defaultImportMap: (name) => {
    throw new Error(`${name} not found importMap`)
  },
  importMap: {
    // moduleType,
    // package,
    // url,
    // packageName,
    // packageQuery,
    // packageVersion,
    // packageFilename,
  },
  dev: localStorage.getItem('wpm-debug-open') == 1,
  _sleepPromiseList: [],
  _sleepPromiseAll: Promise.resolve(),
};

/**
 * 格式化config
 * @param {*} request string | obj
 * @returns 
 */
export function requestFormatConfig(obj = "") {
  if (typeof obj === "string") {
    const request = obj
    const requestObj = requestParse(request)
    let autoModuleType = ""
    if (requestObj.entry) {
      autoModuleType = requestObj.entry.indexOf("remoteEntry.js") > -1 ? "mf" : "system"
    }
    return {
      moduleType: autoModuleType,
      package: request,
      url: "",
      packageName: requestObj.name,
      packageQuery: requestObj.query,
      packageVersion: requestObj.version,
      packageFilename: requestObj.entry,
    }
  }
  let requestObj = {
    name: "",
    query: "",
    version: "",
    entry: "",
  }
  if (obj.package) {
    requestObj = requestParse(obj.package)
  }
  let autoModuleType = ""
  if (requestObj.entry) {
    autoModuleType = requestObj.entry.indexOf("remoteEntry.js") > -1 ? "mf" : "system"
  }
  return {
    moduleType: obj.moduleType || autoModuleType,
    package: obj.package,
    url: obj.url,
    packageName: obj.packageName || requestObj.name,
    packageQuery: obj.packageName || requestObj.query,
    packageVersion: obj.packageVersion || requestObj.version,
    packageFilename: obj.packageFilename || requestObj.entry,
  }
}

/**
 * 抢占注册机制
 * url、package、moduleType等不同的选项可以分多次注册, 但无法覆盖, 例:
 * addImportMap({react: {package: "react@0.0.1/index.js", moduleType: "system"}})
 * addImportMap({react: {url: "http://xxxx.com/index.js"}})
 * @param {*} map 
 */
export function addImportMap(map = {}) {
  Object.keys(map).forEach(pkgname => {
    const newConfig = requestFormatConfig(map[pkgname])
    const existingConfig = config.importMap[pkgname] || {}
    Object.keys(newConfig).forEach(newKey => {
      if (!existingConfig[newKey]) {
        existingConfig[newKey] = newConfig[newKey]
      }
    })
    config.importMap[pkgname] = existingConfig
  })
}

export function sleep(...promiseList) {
  config._sleepPromiseList.push(...promiseList)
  config._sleepPromiseAll = Promise.all(config._sleepPromiseList)
}

export function setConfig(customConfig = {}) {
  Object.assign(config, customConfig)
}