module.exports = function lod (source, map, meta) {
  if (module.exports.entryResources.has(this.resourcePath + this.resourceQuery)) {
    return `
    
    \r\n;
    ${source}
    `
  }
  this.callback(null, source, map, meta)
  return
}
module.exports.entryResources = new Set()