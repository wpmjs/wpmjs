import { defineConfig } from 'umi';
const MF = require("mf-webpack4")
const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")

export default defineConfig({
  devServer: {
    port: 9005,
  },
  dynamicImportSyntax: {},
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  chainWebpack(config) {
    config.entry("umi").clear().end()
    config.entry("umi").add(path.resolve("src/main.ts")).end()
    config.output
      .publicPath('http://localhost:9005/')
    config
      .plugin("MF")
      .use(MF)
      .tap((options) => {
        return [
          {
            name: "umi",
            exposes: {
              "./App": "./src/App"
            },
            shared: {
              react:{},
              "react-dom":{},
              "react/jsx-dev-runtime": {},
              "react/jsx-runtime": {},
            }
          },
        ]
      })
    config.plugin("Copy")
      .use(CopyPlugin)
      .tap(options => {
        return [
          [{ from: "README.md", to: "" }]
        ]
      })
    return config
  }
});
