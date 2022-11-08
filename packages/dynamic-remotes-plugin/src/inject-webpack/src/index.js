
const { entryResources, injectArray } = require('./entry-inject-loader');
const getEntrysPath = require('./utils/getEntrysPath');
const injectLoader = require('./utils/injectLoader');
const entryInjectLoaderPath = require.resolve("./entry-inject-loader")
const PLUGIN_NAME = 'InjectPlugin';

class InjectPlugin {
  constructor(code, options) {
    // options = {
    //   // before 在所有webpack代码之前执行, 不参与webpack打包流程, 注意浏览器兼容性
    //   // initial 在所有入口执行, 如果使用了module-federation, 此处代表 src/main.js, 此处无法使用remotes、shared的模块
    //   // async 在所有异步chunk之前执行, 如果使用了module-federation, 此处代表bootstrap、exposes
    //   // scope: ["before", "initial", "async"]
    // }
    injectArray.push(code)
  }
    apply(compiler) {
      this.addLoader(compiler)
      compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
        compilation.hooks.addEntry.tap(PLUGIN_NAME, (entry) => {
          getEntrysPath(entry, compilation.options.context, compiler.options.resolve.extensions.concat(['.js', '.json', '.wasm'])).forEach(path => {
            entryResources.add(path)
          })
        })
      })
    }

    /**
    * 注册loader
    * @param {*} compiler 
    */
   addLoader(compiler) {
    const entryInjectMatch = function (moduleData) {
      return /\.([cm]js|[jt]sx?|flow)$/i.test(moduleData.resourceResolveData.path)
    };
    compiler.hooks.compilation.tap(
      PLUGIN_NAME,
      (compilation, { normalModuleFactory }) => {
        normalModuleFactory.hooks.afterResolve.tap(
          this.constructor.name,
          // Add loader to process files that matches specified criteria
          (resolveData) => {
            injectLoader(resolveData.createData, {
              match: entryInjectMatch,
              options: {
                const: compilation.runtimeTemplate.supportsConst(),
                esModule: false,
              },
            }, entryInjectLoaderPath);
          }
        );
      })
  }
}

module.exports = InjectPlugin
