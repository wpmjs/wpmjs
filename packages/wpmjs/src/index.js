if (!window.wpmjs) {
  const Wpmjs = require("./wpmjs")
  window.wpmjs = new Wpmjs()
}

if (process.env.NODE_ENV === "development") {
  window.wpmjs.loadPlugins({
    baseUrl: "https://cdn.jsdelivr.net/npm"
  })
}

module.exports = window.wpmjs