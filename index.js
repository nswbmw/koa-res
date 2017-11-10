const assert = require('assert')
const path = require('path')
let version

try {
  version = require(path.join(path.dirname(module.parent.filename), '/package.json')).version
} catch (e) {}

module.exports = function (options = {}) {
  const custom = options.custom || {}
  assert(custom && typeof custom === 'object' && !Array.isArray(custom), '`custom` should be an object.')

  return async function koaRes (ctx, next) {
    try {
      await next()

      const status = ctx.status
      const data = ctx.body
      if (ctx.method.toLowerCase !== 'option') {
        ctx.body = {
          ok: true,
          data: data,
          version: options.version || version || '1.0.0',
          now: new Date()
        }
        Object.assign(ctx.body, custom)
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
      Object.assign(ctx.body, custom)

      if (!options.debug) {
        delete ctx.body.stack
      }
    }
  }
}
