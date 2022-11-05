/*!
 * ExternalTemplateRemotesPlugin
 * License: MIT (https://mit-license.org/)
 */

const extractUrlAndGlobal = require('webpack/lib/util/extractUrlAndGlobal');
const { RawSource } = require('webpack-sources');

const PLUGIN_NAME = 'ExternalTemplateRemotesPlugin';

class ExternalTemplateRemotesPlugin {
    apply(compiler) {
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
                    const params = (module.request || "").split("@")
                    const name = params.splice(0, 1)
                    const url = params.join("@")
                    if (/\[.*\]/.test(url)) {
                        return 
                    }
                    // TODO: 需要验证是否符合semver格式
                    const urlExpression = toExpression(url, name);
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

function toExpression(url, name) {
    return `window.wpmjs.resolve(${JSON.stringify(`${name}@${url}`)})`
}

module.exports = ExternalTemplateRemotesPlugin;
