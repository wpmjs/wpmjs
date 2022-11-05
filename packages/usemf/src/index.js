const getPromise = require('./utils/getPromise');
const { getShare } = require('./utils/getShare');
const { default: loadScript } = require('./utils/loadScript');
const preloadModule = require('./utils/preloadModule');
// mfjs.import(url, name, shared , customLoadScript)[module]
// shared: {
//   shareScope,
//   wpmjs: {
//     version,
//     url,
//   }
// }
module.exports = window.usemf = window.usemf ||  {
  containerCached: {
    // url: promise<container>
  },
  getShareScopes() {
    return __webpack_share_scopes__
  },
  getShare,
  async getContainer({url, name, customGetContainer} = {}) {
    const {containerCached} = this
    if (containerCached[url]) return containerCached[url]
    if (!customGetContainer) {
      customGetContainer = ({url}) => loadScript(url)
    }
    const res = await customGetContainer({url, name, customGetContainer})
    const container = [res, window[name]].filter(container => {
      return typeof container?.init === "function" && typeof container?.get === "function"
    })[0]
    if (!container) {
      throw new Error("not container", name, url)
    }
    return containerCached[url] = container
  },
  import({url, name, shared, customGetContainer} = {}) {
    const getLoadModule = async () => {
      const {
        promise,
        resolve,
        reject
      } = getPromise()
      try {
        const container = await this.getContainer({url, name, shared, customGetContainer})
        resolve(preloadModule(container, shared))
      } catch (e) {
        reject(e)
      }
      return promise
    }
    const continerInitPromise = getLoadModule()
    async function loadModule (...params) {
      return (await continerInitPromise)(...params)
    }
    loadModule.continerInitPromise = continerInitPromise
    return loadModule
  }
}