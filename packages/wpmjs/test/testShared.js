const {setShared, getShared} = require("module-shared-pool")
setShared({
  name: "r",
  version: "latest",
  get() {
    return "r latest"
  }
})
setShared({
  name: "r",
  version: "1.0.0",
  get() {
    return "r 1.0.0"
  }
})
setShared({
  name: "r",
  version: "1.1.0",
  get() {
    return "r 1.1.0"
  }
})
setShared({
  name: "r",
  version: "2.1.0",
  get() {
    return "r 2.1.0"
  }
})

const wpmjs = window.wpmjs


;(async function main() {
  console.log(123, await getShared({name: "r",requiredVersion: "1"}))
  console.log(123, await getShared({name: "r"}))
  setShared({
    name: "react-dom",
    version: "latest",
    get() {
      return "rd latest"
    }
  })
  setShared({
    name: "react-dom",
    version: "18.3.0",
    get() {
      return "rd 18.3.0"
    }
  })
  console.log(await getShared({name: "react-dom", requiredVersion: "18"}))
})();