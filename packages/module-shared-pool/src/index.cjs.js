/**
 * 当前文件未打包, 不要写es6代码
 */
var mfRegisterShared = require("module-federation-runtime").registerShared,
  mfFindShared = require("module-federation-runtime").findShared

/**
 * 
 * @param {*} pkg {name: "react", "version": "17.0.0", async get() {return React}}
 * @returns 
 */
exports.setShared = function registerShared(pkg) {
  return mfRegisterShared({
    [pkg.name]: {
      loaded: 1,
      version: pkg.version,
      get() {
        return Promise.resolve(pkg.get())
          .then(function(val) {
            return function factory() {
              return val
            }
          })
      }
    }
  })
}

/**
 * 
 * @param {*} shareConfig {name: "react", "requiredVersion": "*"}
 * @returns 
 */
exports.getShared = function findShared(shareConfig) {
  if (!shareConfig) shareConfig = {}
  Object.assign(shareConfig, {
    name: shareConfig.name,
    singleton: true,
    requiredVersion: shareConfig.requiredVersion
  })
  var pkg = mfFindShared(shareConfig)
  if (pkg) {
    return Promise.resolve(pkg.get())
      .then(function(factory) {
        return factory()
      })
  }
  return null
}
