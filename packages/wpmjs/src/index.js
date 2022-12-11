

if (!window.System && process.env.NEED_SYSTEM) {
  // 重复运行systemjs会导致异常
  require("systemjs/dist/s")
  require("systemjs/dist/extras/amd")
  require("systemjs/dist/extras/module-types")
  require("systemjs/dist/extras/global")
}
if (!window.System?.__wpmjs) {
  wpmjsObj = require("./wpmjsObject").default 
  if (process.env.NEED_SYSTEM) {
    require("./utils/mapResolve")
    require("./utils/hackWebpackLibrary")
    require("./utils/addDeps")
    require("./utils/hackWebpackExportPromise")
  }
}
