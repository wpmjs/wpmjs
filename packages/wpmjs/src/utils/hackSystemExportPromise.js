// webpack4使用 export(module) 方式向systemjs抛出模块, 不支持异步模块（promise）
// 重写System.register, 让e(res<object>)支持res<promise>
;(function () {
  const System = window.System
  if (System.register.__wpm__hackPromise) return
  // 重写System.register, 让webpack4支持systemjs的top-level await
  const existingHook = System.constructor.prototype.getRegister;
  System.constructor.prototype.getRegister = function (url) {
    return Promise.resolve(existingHook.call(this, url))
    .then(function ([deps, oriDecFun] = []) {
      // custom hook here
      return [deps, function decFun(_oriExport, _context) {
        let _exportRes = []
        function _export (...res) {
          _exportRes = res
          _oriExport(...res)
        }
        const decRes = oriDecFun(_export, _context)
        const {setters, execute: oriExec, ...otherDec} = decRes
        function execute (...execArgs) {
          oriExec?.call?.(this, execArgs)
          const [promiseRes] = _exportRes.filter(item => item instanceof Promise)
          if (promiseRes) {
            return Promise.all(_exportRes).then(res => {
              if (res[1]?.__esModule === true) {
                _oriExport(res[1])
              } else {
                _oriExport(...res)
              }
              return res
            })
          }
        }
        return {
          setters: setters,
          execute,
          ...otherDec
        }
      }]
    });
  };
  System.register.__wpm__hackPromise = true
})();