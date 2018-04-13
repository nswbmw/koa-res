const path = require('path')
let version

try {
  version = require(path.join(path.dirname(module.parent.filename), '/package.json')).version
} catch (e) {}

module.exports = function (options = {}) {
  const custom = options.custom
  if (custom && (typeof custom !== 'function')) {
    throw new TypeError('`custom` should be a function that return an object')
  }

  return async function koaRes (ctx, next) {
    try {
      await next()
      if (ctx._returnRaw) {
        return
      }

      const status = ctx.status
      const data = ctx.body
      if (ctx.method.toLowerCase !== 'option' && status !== 404) {
        ctx.body = {
          ok: true,
          data: data,
          version: options.version || version || '1.0.0',
          now: new Date()
        }
        if (custom) {
          Object.assign(ctx.body, custom(ctx))
        }
        ctx.status = status
      }
    } catch (e) {
      ctx.status = e.status || e.statusCode || 500
      ctx.body = {
        ok: false,
        message: e.message || e,
        stack: e.stack || e,
        version: options.version || version || '1.0.0',
        now: new Date()
      }
      if (custom) {
        Object.assign(ctx.body, custom(ctx))
      }

      if (!options.debug) {
        delete ctx.body.stack
      }
    }
  }
}
