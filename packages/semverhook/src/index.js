var resolveRequest = require("./utils/resolveRequest")

module.exports = function () {
  var semverjs = {}
  var cacheMap = {
    // [id]: {
    //   url,
    //   moduleResult,
    //   moduleResultSync
    // }
  }

  var eventMap = {
    // [eventName]: listeners
  }

  function callEvent(eventName, args) {
    var listeners = eventMap[eventName] || []
    var result
    for (var index = 0; index < listeners.length; index++) {
      result = listeners[index].apply(semverjs, args);
    }
    return result
  }

  /**
   * 
   * @param {*} request {name, version, entry, query}
   */
  function resolve(id) {
    var url
    if (/^https?:\/\//.test(id)) {
      url = id
    } else {
      var request = resolveRequest(id)
      request = callEvent("resolveRequest", [request]) || request
      url = callEvent("resolvePath", [request])
      if (!url) {
        throw new Error("All semverjs.resolvePath hooks must have at least one return value")
      }
    }
    if (cacheMap[id]) {
      cacheMap[id].url = url
    }
    return url
  }

  function importFn(id) {
    if (cacheMap[id]) return cacheMap[id].resultModule
    cacheMap[id] = {}
    id = id || ""
    url = resolve(id)
    var resultModule = callEvent("import", [url])
    cacheMap[id].resultModule = resultModule
    Promise.resolve(resultModule).then(function (val) {
      cacheMap[id].resultModuleSync = val
    })
    return resultModule
  }

  semverjs.import = importFn

  semverjs.resolve = resolve

  semverjs.get = function() {
    return cacheMap[id] ? cacheMap[id].resultModule : null
  }
  semverjs.getSync = function() {
    return cacheMap[id] ? cacheMap[id].resultModuleSync : null
  }

  semverjs.on = function (eventName, cb) {
    if (!eventMap[eventName]) {
      eventMap[eventName] = []
    }
    eventMap[eventName].push(cb)
  }

  semverjs.off = function (eventName, cb) {
    if (!eventMap[eventName]) return
    var eventIndex = eventMap[eventName].indexOf(cb)
    if (eventIndex > -1) {
      eventMap[eventName].splice(eventIndex, 1)
    }
  }

  return semverjs
}