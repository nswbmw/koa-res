'use strict';

var dirname = require('path').dirname;
var version;

try {
  version = require(dirname(module.parent.filename) + '/package.json').version;
} catch(e) {}

module.exports = function (options) {
  options = options || {};
  return function *koaRes(next) {
    try {
      yield* next;

      var data = this.body;
      if (this.method.toLowerCase !== 'option') {
        this.body = {
          ok: true,
          data: data || null,
          version: options.version || version || '1.0.0',
          now: new Date()
        };
      }
    } catch (e) {
      if (options.debug) console.error(e.stack);

      this.status = e.status || e.statusCode || (e.constructor === TypeError ? 400 : 500);
      this.body = {
        ok: false,
        message: e.message || e,
        stack: e.stack || e,
        version: options.version || version || '1.0.0',
        now: new Date()
      };
    }
  };
};