// 对REQUEST做缓存
// 1. import("react") // 创建缓存: react
// 2. import("react") // 取缓存: react
// 3. import("react?a=1") // 创建缓存: react?a=1 

// 请求一个包（CONTAINER）不同的入口, 需要分别对包名、对入口名进行缓存
// 1. import("@core-klein/basic/SaasEnv") // 创建缓存: @core-klein/basic、@core-klein/basic/SaasEnv
// 2. import("@core-klein/basic/WmUpload") // 取缓存: @core-klein/basic; 创建缓存: @core-klein/basic/WmUpload;

module.exports.SCOPE_ENUM = {
  REQUEST: 2,
}

const cacheUtilMap = {}
const cacheUtilMapSync = {}

module.exports.cacheUtilMap = cacheUtilMap
module.exports.cacheUtilMapSync = cacheUtilMapSync


/**
 * 将相同的key缓存起来
 * cacheUtil(SCOPE_ENUM.REQUEST, "@wemo-ui/klein?a=1", () => Math.random())
 * @param {*} scope 
 * @param {*} key 
 * @param {*} getCacheObject 
 * @returns 
 */
module.exports.setCache = function(scope, key, getCacheObject) {
  cacheUtilMap[scope] = cacheUtilMap[scope] || {}
  const res = cacheUtilMap[scope][key] = cacheUtilMap[scope][key] || getCacheObject()
  Promise.resolve(res).then(val => {
    cacheUtilMapSync[scope] = cacheUtilMapSync[scope] || {}
    cacheUtilMapSync[scope][key] = val
  })
  return res
}

module.exports.getCache = function(scope, key) {
  cacheUtilMap[scope] = cacheUtilMap[scope] || {}
  return cacheUtilMap[scope][key]
}

module.exports.getCacheSync = function(scope, key) {
  return cacheUtilMapSync[scope][key]
}