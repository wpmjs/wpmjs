
const { RawSource } = require('webpack-sources');
const inject = require("./inject-webpack/src/index")
const PLUGIN_NAME = 'DynamicRemotesPlugin';
const resolveRequest = require("semverhook/src/utils/resolveRequest")
const ExternalRemotesPlugin = require("external-remotes-plugin")
const stringifyHasFn = require("./utils/stringifyHasFn")
class DynamicRemotesPlugin {
  constructor(options = {}) {
    this.options = options
    this.mfOptions = null
  }
    apply(compiler) {
      this.mfOptions = this.getMFOptions()
      new inject(() => {
        return `
          // require("wpmjs")
          // window.wpmjs.setConfig({

          // })
          console.log(1111, window.usemf.getShareScopes(), __webpack_share_scopes__)
          Object.assign(window.usemf.getShareScopes(), __webpack_share_scopes__)
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

          compilation.hooks.afterCodeGeneration.tap(PLUGIN_NAME, () => {
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
                  const urlExpression = `window["$_mfplugin_semverhook_${this.appName}"].resolve(${JSON.stringify(`${request}`)})`
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

    getMFOptions(plugins) {
      const federationOptions = plugins.filter(
        (plugin) => {
          return plugin.constructor.name === 'ModuleFederationPlugin';
        }
      )[0]
      const inheritedPluginOptions = federationOptions._options
      return inheritedPluginOptions
    }
}

module.exports = DynamicRemotesPlugin;