
// import localStorage from './utils/getLocalStorage';
// import parseURLQuery from './utils/parseURLQuery';

// window.wpmjs.version = "3.1.0"
// window.wpmjs.addImportMap({
//   "wpm-develop-panel": {
//     package: "wpm-develop-panel/index.js",
//     moduleType: "system",
//     url: "https://wpm.hsmob.com/wpmv2/wpm-develop-panel/0.17.5"
//   }
// })

// const queryInfo = parseURLQuery();

// !(function () {
//   if("wpmDebug" in queryInfo) {
//     localStorage.setItem('wpm-debug-open', 1);
//     localStorage.setItem('wpm-debug-url', queryInfo.wpmDebug);
//   }
// })();

// if (localStorage.getItem('wpm-debug-open') == 1) {
//   window.wpmjs.import('wpm-develop-panel');

//   // const wpmDebugMap = (function () {
//   //   try {
//   //     return JSON.parse(localStorage.getItem("wpm-debug-map")) || {}
//   //   } catch (e) {
//   //     return {}
//   //   }
//   // })()
//   const wpmPkgList = (function () {
//     try {
//       return JSON.parse(localStorage.getItem("wpm_pkgList")) || []
//     } catch (e) {
//       return []
//     }
//   })()
//   const wpmActivePkgMap = (function () {
//     try {
//       return JSON.parse(localStorage.getItem('wpm_activePkgMap')) || {}
//     } catch (e) {
//       return {}
//     }
//   })()
//   wpmPkgList.forEach(({name: pkg, url}) => {
//     if (!wpmActivePkgMap[pkg]) return
//     window.wpmjs.addImportMap({
//       [pkg]: {
//         url: url
//       }
//     })
//   })

// }
