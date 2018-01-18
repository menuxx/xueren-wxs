
const slice = Array.prototype.slice

export default (namespace) => {
  return {
    error() {
      var args = slice.call(arguments)
      args.unshift(`[${namespace}]`)
      console.error.apply(console, args)
    },
    log() {
      var args = slice.call(arguments)
      args.unshift(`[${namespace}]`)
      console.log.apply(console, args)
    }
  }
}
