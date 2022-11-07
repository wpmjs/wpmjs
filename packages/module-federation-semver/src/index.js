/*!
 * ExternalTemplateRemotesPlugin
 * License: MIT (https://mit-license.org/)
 */

const { JavascriptModulesPlugin } = require('webpack');
const { RawSource } = require('webpack-sources');
const inject = require("./inject-webpack/src/index")
const PLUGIN_NAME = 'ExternalTemplateRemotesPlugin';
const VirtualPlugin = require("webpack-virtual-modules")
function resolveRequest(id = "") {
  var {1: name, 5: version = '', 7: entry = "", 9: query = ""} = id.match(/^((@[_\-A-Za-z\d]+\/)?([_\-A-Za-z\d]+))(@(.+?))?(\/([_\-A-Za-z\d/]+))?(\?(.+?))?$/) || []
  if (!id || !name) throw new Error("id error:" + id)
  return {
    entry,
    name,
    version,
    query
  }
}

class ExternalTemplateRemotesPlugin {
    apply(compiler) {
      // compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      // // JavascriptModulesPlugin.getCompilationHooks(compilation).renderModuleContainer.tap(PLUGIN_NAME, (source, module, context) => {
      // //   // if (module.constructor.name.indexOf("ContainerEntry") > -1) {
      // //   //   console.log(22333, source.source(), module, context)
      // //   // }
      // // })  
        
      //   // compilation.hooks.renderModuleContent.tap(PLUGIN_NAME, (source,) => {

      //   // })
      //   // setTimeout(() => {
          
      //   //   // console.log(66666, compilation.entries.get("main").dependencies)
      //   // }, 3000);
      //   console.log(1111222, compilation.options.output.uniqueName)
      // })
      // console.log(585858, compiler)
      // TODO: windows
      new VirtualPlugin({
        [`${process.cwd()}/$_mfplugin_virtualInitSemverjs.js`]: `
          if (!window.$_mfplugin_semverjs) {
            const semverjs = require("/Users/zhanghongen/Desktop/open-code/wpmjs/packages/semverjs/dist/index.js")
            window.$_mfplugin_semverjs = semverjs
            semverjs.on("resolvePath", () => {
              return "http://a.com"
            })
          }
        `
      }).apply(compiler)
      new inject(function() {
        return `
          require("${`${process.cwd()}/$_mfplugin_virtualInitSemverjs.js`}")
        `
      }).apply(compiler)
        // inject("wpmjs")
        // const ExternalRemotesPlugin = require("external-remotes-plugin")
        // new ExternalRemotesPlugin().apply(compiler)
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
                    const params = request.split("@")
                    const url = params.join("@")
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
                        new RawSource(rawSource.source().replace(`"${url}"`, urlExpression))
                    );
                });
            });
        });
    }
}

function toExpression(request) {
    return `window.$_mfplugin_semverjs.resolve(${JSON.stringify(`${request}`)})`
}

module.exports = ExternalTemplateRemotesPlugin;
