var resolveRequest = require("./utils/resolveRequest")

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
  for (var index = 0; index < listeners.length; index++) {
    var result = listeners[index].apply(this, args);
    if (result) return result
  }
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
      throw new Error("All semverjs.resolve hooks must have at least one return value")
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

module.exports = {}

module.exports.import = importFn

module.exports.resolve = resolve

module.exports.get = function() {
  return cacheMap[id] ? cacheMap[id].resultModule : null
}
module.exports.getSync = function() {
  return cacheMap[id] ? cacheMap[id].resultModuleSync : null
}

module.exports.on = function (eventName, cb) {
  if (!eventMap[eventName]) {
    eventMap[eventName] = []
  }
  eventMap[eventName].push(cb)
}

module.exports.off = function (eventName, cb) {
  if (!eventMap[eventName]) return
  var eventIndex = eventMap[eventName].indexOf(cb)
  if (eventIndex > -1) {
    eventMap[eventName].splice(eventIndex, 1)
  }
}