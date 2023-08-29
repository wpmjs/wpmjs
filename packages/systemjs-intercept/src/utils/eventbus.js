var eventMap = {
  // [eventName]: listeners
}

function emit(eventName, args) {
  var listeners = eventMap[eventName] || []
  var result
  for (var index = 0; index < listeners.length; index++) {
    result = listeners[index].apply(undefined, args) || result;
  }
  return result
}
function on (eventName, cb) {
  if (!eventMap[eventName]) {
    eventMap[eventName] = []
  }
  eventMap[eventName].push(cb)
}

function off (eventName, cb) {
  if (!eventMap[eventName]) return
  var eventIndex = eventMap[eventName].indexOf(cb)
  if (eventIndex > -1) {
    eventMap[eventName].splice(eventIndex, 1)
  }
}

module.exports = {
  on,
  off,
  emit
}