
import parseURLQuery from './utils/parseURLQuery';

const queryInfo = parseURLQuery();

!(function () {
  if("wpmDebug" in queryInfo) {
    localStorage.setItem('wpm-debug-open', 1);
    localStorage.setItem('wpm-debug-url', queryInfo.wpmDebug);
  }
})();

if (localStorage.getItem('wpm-debug-open') == 1) {
  import("wpm-develop-panel")

  // const wpmDebugMap = (function () {
  //   try {
  //     return JSON.parse(localStorage.getItem("wpm-debug-map")) || {}
  //   } catch (e) {
  //     return {}
  //   }
  // })()
  const wpmPkgList = (function () {
    try {
      return JSON.parse(localStorage.getItem("wpm-pkgList")) || []
    } catch (e) {
      return []
    }
  })()
  const wpmActivePkgMap = (function () {
    try {
      return JSON.parse(localStorage.getItem('wpm-activePkgMap')) || {}
    } catch (e) {
      return {}
    }
  })()
  wpmPkgList.forEach(({name: pkg, url}) => {
    if (!wpmActivePkgMap[pkg]) return
    window.wpmjs.addImportMap({
      [pkg]: {
        url: url
      }
    })
  })

}
