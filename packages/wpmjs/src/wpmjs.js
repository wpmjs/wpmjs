/**
 * 几点代码中的概念:
 * request 是一个字符串 `@[scope]/[name]@[version]/[entry]?[query]`
 * container 是一个包, 可以通过 await container.$getEntry("entry") 来获取包暴露的入口模块
 */

// todo: 需要每个项目隔离版本, wpmjs = new Wpmjs()
// todo: local面板
// todo: setcache
const _global = require("global")
const localStorage = require('./utils/getLocalStorage').default
const { SCOPE_ENUM, setCache, getCacheSync } = require('./utils/cacheUtil');
const { config, sleep, addImportMap, setConfig } = require('./config');
const { resolveUrl, resolveEntry, formatContainer, resolveContainer, registerLoader } = require('./moduleResolve');
const {setShared, getShared} = require("module-shared-pool");
const { default: parseRequest } = require('package-request-parse');

function resolveRequest(request, type) {
  if (/^https?:\/\//.test(request)) {
    return request
  }
  var {
    name,
    version,
    entry = '',
    query
  } = parseRequest(request)
  if (!name) {
    throw new Error(`【'${request}】请求格式不正确（https://wpm.hsmob.com/assets/wpm-docs/API-SDK.html#wpmjs-import）`)
  }
  const pkgConfig = getPkgConfig(name)
  let requestObj = {
    name: pkgConfig.packageName || name,
    version: pkgConfig.packageVersion || version || config.defaultVersion(name),
    filename: pkgConfig.packageFilename || entry,
    entry,
    query: pkgConfig.packageQuery || query,
    baseUrl: config.baseUrl,
  }
  return requestObj
}

function wimportSync(request) {
  return getCacheSync("requestCache", request)
}

function getPkgConfig(name) {
  if (!config.importMap[name]?.packageName || !config.importMap[name]?.moduleType) {
    addImportMap({
      [name]: config.defaultImportMap(name)
    })
  }
  const pkgConfig = config.importMap[name]
  if (!pkgConfig) {
    throw new Error(`${name} not found in importMap`)
  }
  return pkgConfig
}

function wimport(request) {
  return setCache("requestCache", request, () => {
    if (typeof request !== 'string') {
      throw new Error('包名不是字符串!');
    }
    if (/^https?:\/\//.test(request)) {
      return _global.System.import(request)
    }
    // 每次返回一个新的promise, 避免使用处未处理promise链式返回值导致的bug
    return Promise.resolve().then(async _ => {
      await config._sleepPromiseAll
      const pkgConfig = getPkgConfig(parseRequest(request).name)
      let requestObj = resolveRequest(request)
      const {
        entry,
        name,
        version,
        query,
      } = requestObj
      const moduleType = pkgConfig.moduleType
      let url = pkgConfig.url
      if (url) {
        url += "/" + pkgConfig.packageFilename
      } else {
        url = resolveUrl(moduleType, requestObj);
      }
      let container = getShared({
        name,
        requiredVersion: version || "*"
      })
      if (!container) {
        container = (pkgConfig.global && _global[pkgConfig.global]) || 
          resolveContainer(moduleType, url, {
            request,
            requestObj,
            pkgConfig
          })
        setShared({
          name,
          version,
          loaded: 1,
          get() {
            return container
          }
        })
      }
      formatContainer(container, moduleType)
      if (!entry) {
        // 无需解析入口
        return container
      }
      const entryRes = resolveEntry(moduleType, await container, entry)
      return entryRes
    })
  })
}

const wpmjs = {
  sleep,
  setConfig,
  addImportMap,
  registerLoader,
  getConfig: () => config,
  import: wimport,
  get: wimportSync,
}

wpmjs.v = "4.0.0"
module.exports = wpmjs;
