if (!window.wpmjs) {
  const Wpmjs = require("./wpmjs")
  window.wpmjs = new Wpmjs()
}
require("./extras/json")
require("./extras/system")
require("./extras/mf")

require("./debugMode")

module.exports = window.wpmjs