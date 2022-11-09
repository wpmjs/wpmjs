
const { RawSource } = require('webpack-sources');
const inject = require("./inject-webpack/src/index")
const PLUGIN_NAME = 'DynamicRemotesPlugin';
const resolveRequest = require("semverhook/src/utils/resolveRequest")
const ExternalRemotesPlugin = require("external-remotes-plugin")
const stringifyHasFn = require("./utils/stringifyHasFn")
class DynamicRemotesPlugin {
  constructor(options = {}) {
    this.options = options
  }
    apply(compiler) {
      new inject(() => {
        return `
          if (!window.$_mfplugin_semverhook) {
            const options = ${stringifyHasFn(this.options)}
            const semverhook = require("/Users/zhanghongen/Desktop/open-code/wpmjs/packages/semverhook/dist/index.js")()
            window.$_mfplugin_semverhook = semverhook
            if (options.resolvePath) {
              semverhook.on("resolvePath", (request) => {
                return options.resolvePath(request)
              })
            }
            ${this.options.inject ? this.options.inject() : ""}
          }
        `
      }).apply(compiler)
      new ExternalRemotesPlugin().apply(compiler)
      compiler.hooks.make.tap(PLUGIN_NAME, compilation => {
          const scriptExternalModules = [];

          compilation.hooks.buildModule.tap(PLUGIN_NAME, module => {
              if (module.constructor.name === 'ExternalModule' && module.externalType === 'script') {
                  scriptExternalModules.push(module);
              }
          });

          compilation.hooks.afterCodeGeneration.tap(PLUGIN_NAME, function() {
              scriptExternalModules.map(module => {
                  const request = (module.request || "")
                  const url = request.split("@").slice(1)
                  try {
                    resolveRequest(request)
                  } catch (e) {
                    // "app0@[window.app0Url]"
                    // "app0@http://xx.com/x.js"
                    return
                  }
                  // "app0@latest" || "app0@^1.0.0?a=1"
                  const urlExpression = toExpression(request);
                  const sourceMap = compilation.codeGenerationResults.get(module).sources;
                  const rawSource = sourceMap.get('javascript');
                  sourceMap.set(
                      'javascript',
                      new RawSource(rawSource.source().replace(`__webpack_require__.l("${url}"`, `__webpack_require__.l(${urlExpression}`))
                  );
              });
          });
      });
    }
}

function toExpression(request) {
    return `window.$_mfplugin_semverhook.resolve(${JSON.stringify(`${request}`)})`
}

module.exports = DynamicRemotesPlugin;
