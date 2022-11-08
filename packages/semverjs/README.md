## semverjs

1.5kb minimalist hook sdk

### API

* semverjs = require("semverjs")()
* import("id") : any | Promise<any>
* resolve("id") : string
* on("resolveRequest" || "resolvePath" || "import", function)
* off("resolveRequest" || "resolvePath" || "import", function)
* get("id")
* getSync("id")

#### 例子

``` js
const semverjs = require("semverjs")()

semverjs.on("resolveRequest", function (request) {
    if (Math.random() > .5) {
      return {
        ...request,
        name: "randomName",
        query: "50%"
      }
    }
})

semverjs.on("resolvePath", function ({name, version, entry, query}) {
  console.log(this === semverjs) // true
  console.log(name) // "@scope/name"
  console.log(version) // "^1.0.3"
  console.log(entry) // "entry"
  console.log(query) // "query=1"
  
  function join(start, str) {
    return (str && `${start}${str}`) || ""
  }
  return `https://unpkg.com/${name}${join("@", version)}${join("/", entry)}${join("?", query)}`
})

semverjs.on("import", function (url) {
  console.log(this === semverjs) // true
  return systemjs.import(url)
})

semverjs.resolve("@scope/name@^1.0.3/entry?query=1") // https://unpkg.com/@scope/name@^1.0.3/entry?query=1
```