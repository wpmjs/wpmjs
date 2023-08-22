import { config } from "../config"
import { registerLoader } from "../moduleResolve";

require("systemjs-intercept")(function (dep) {
  if (/https?:\/\//.test(dep)) return
  return window.wpmjs.import(dep)
})

require("../utils/hackSystemExportPromise")

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
  return window.System.import(url);
}

export function resolveEntry(container, entry) {
  if (!entry) return container
  if (typeof container[entry] === "function" && container[entry].__wpm__entry) {
    return container[entry]()
  }
  if (entry in container) {
    return container[entry]
  }
  console.log("container:", container)
  throw new Error(`找不到入口模块: ${entry}`)
}
