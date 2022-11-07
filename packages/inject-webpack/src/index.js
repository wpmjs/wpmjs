
const { entryResources } = require('./entry-inject-loader');
const getEntrysPath = require('./utils/getEntrysPath');
const entryInjectLoaderPath = require.resolve("./entry-inject-loader")
const PLUGIN_NAME = 'InjectPlugin';

class InjectPlugin {
    apply(compiler) {
      this.addLoader(compiler)
      compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
        compilation.hooks.addEntry.tap(PLUGIN_NAME, (entry) => {
          // console.log(1111, entry.exposes)
          getEntrysPath(entry, compiler.options.context, compiler.options.resolve.extensions).forEach(path => {
            entryResources.add(path)
          })
          console.log(111222, entryResources)
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
      pluginName,
      (compilation, { normalModuleFactory }) => {
        normalModuleFactory.hooks.afterResolve.tap(
          this.constructor.name,
          // Add react-refresh loader to process files that matches specified criteria
          (data) => {
            data = injectRefreshLoader(data, {match: entryInjectMatch}, entryInjectLoaderPath)
            return data;
          }
        );
      })
  }
}

module.exports = InjectPlugin
