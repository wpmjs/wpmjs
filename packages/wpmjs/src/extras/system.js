import { config } from "../config"
import { registerLoader } from "../moduleResolve";

const intercept = require("systemjs-intercept")
var System = new window.System.constructor()
var sysProto = {}
Object.setPrototypeOf(System, Object.assign(sysProto, window.System.constructor.prototype))
intercept(function (dep) {
  if (/https?:\/\//.test(dep)) return
  return window.wpmjs.import(dep)
}, System)

export const fileName = "index.js"
registerLoader({
  moduleType: "system",
  resolveUrl,
  resolveContainer,
  resolveEntry
})

export function resolveUrl({name, version, query, entry, filename, baseUrl}) {
  if (/https?:\/\/(localhost|(\d+\.){2})/.test(baseUrl)) {
    return `${baseUrl}/${filename}`
  }
  query = query ? "?" + query : ""
  filename = filename ? "/" + filename : ""
  version = version ? "@" + version : ""
  return `${baseUrl}/${name}${version}${filename}${query}`
}

export function resolveContainer(url) {
  return System.import(url);
}

export function resolveEntry(container, entry) {
  if (!entry) return container
  if (typeof container[entry] === "function") {
    return container[entry]()
  }
  if (entry in container) {
    return container[entry]
  }
  console.log("container:", container)
  throw new Error(`找不到入口模块: ${entry}`)
}
