import localStorage from "./utils/getLocalStorage";
import requestParse from "package-request-parse"

export default function Config() {
  this.baseUrl =  ""
  this.defaultVersion = () => "latest"
  this.defaultImportMap = (name) => {
    throw new Error(`${name} not found importMap`)
  }
  this.defaultGlobal = function() {
  }
  this.importMap = {
    // moduleType,
    // package,
    // url,
    // global,
    // packageName,
    // packageQuery,
    // packageVersion,
    // packageFilename,
  }
  this.dev = localStorage.getItem('wpm-debug-open') == 1
  this._sleepPromiseList = []
  this._sleepPromiseAll = Promise.resolve()
  return this
}
const prototype = Config.prototype

/**
 * 格式化config
 * @param {*} request string | obj
 * @returns 
 */
prototype.requestFormatConfig = function requestFormatConfig(obj = "") {
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
      strictVersion: requestObj.strictVersion || false
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
    global: obj.global,
    packageName: obj.packageName || requestObj.name,
    packageQuery: obj.packageName || requestObj.query,
    packageVersion: obj.packageVersion || requestObj.version,
    packageFilename: obj.packageFilename || requestObj.entry,
    strictVersion: obj.strictVersion || false
  }
}

/**
 * 抢占注册机制
 * url、package、moduleType等不同的选项可以分多次注册, 但无法覆盖, 例:
 * addImportMap({react: {package: "react@0.0.1/index.js", moduleType: "system"}})
 * addImportMap({react: {url: "http://xxxx.com/index.js"}})
 * @param {*} map 
 */
prototype.addImportMap = function addImportMap(map = {}) {
  const config = this
  Object.keys(map).forEach(pkgname => {
    const newConfig = this.requestFormatConfig(map[pkgname])
    const existingConfig = config.importMap[pkgname] || {}
    Object.keys(newConfig).forEach(newKey => {
      if (!existingConfig[newKey]) {
        existingConfig[newKey] = newConfig[newKey]
      }
    })
    config.importMap[pkgname] = existingConfig
  })
}

prototype.sleep = function sleep(...promiseList) {
  const config = this
  config._sleepPromiseList.push(...promiseList)
  config._sleepPromiseAll = Promise.all(config._sleepPromiseList)
}

prototype.setConfig = function setConfig(customConfig = {}) {
  Object.assign(this, customConfig)
}