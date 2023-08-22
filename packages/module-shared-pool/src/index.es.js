/**
 * 当前文件未打包, 不要写es6代码
 */
import {
  registerShared as mfRegisterShared,
  findShared as mfFindShared
} from "module-federation-runtime"

/**
 * 
 * @param {*} pkg {name: "react", "version": "17.0.0", async get() {return React}}
 * @returns 
 */
export function setShared(pkg) {
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
export function getShared(shareConfig) {
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
