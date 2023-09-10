import { config } from "../config"
import { registerLoader } from "../moduleResolve";
import {initSharing} from "module-federation-runtime"
const inheritPrototype = require("../utils/inheritPrototype")

const intercept = require("systemjs-intercept")
function SystemClone(...params) {
  window.System.constructor.apply(this, params)
}
inheritPrototype(SystemClone, window.System.constructor)
var System = window.wpmjs.System || new SystemClone()
window.wpmjs.System = System
intercept(function (dep) {
  if (/https?:\/\//.test(dep)) return
  return initSharing("default").then(() => window.wpmjs.import(dep))
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
