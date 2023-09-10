if (!window.wpmjs) {
  const Wpmjs = require("./wpmjs")
  window.wpmjs = new Wpmjs()
}
require("./extras/mf")

require("./debugMode")

module.exports = window.wpmjs