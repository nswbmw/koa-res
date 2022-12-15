
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

      const code = ctx.status
      const data = ctx.body
      if (ctx.method.toLowerCase() !== 'option' && code !== 404) {
        ctx.body = {
          code,
          data
        }
        if (custom) {
          Object.assign(ctx.body, custom(ctx))
        }
        ctx.status = code
      }
    } catch (e) {
      if (ctx._returnRaw) {
        throw e
      }
      ctx.app.emit('error', e, ctx)

      ctx.status = e.status || e.statusCode || 500
      ctx.body = {
        code: ctx.status,
        message: e.message || e,
        stack: e.stack || e
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
