const MF = require("mf-webpack4")

module.exports = {
  configureWebpack: {
    entry: "./src/main.js",
    // output: {
    //   publicPath: ""
    // },
    devServer: {
      port: "9004"
    },
    plugins: [
      new MF({
        name: "vueCli",
        remotes: {
          "umi": "umi@http://localhost:9005/remoteEntry.js"
        },
        shared: {
          "react-dom": {
          },
          "react": {
          },
          vue: {
            "import": "vue"
          },
        }
      })
    ]
  }
}