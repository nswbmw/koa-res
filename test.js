'use strict';

var assert = require('assert');
var koa = require('koa');
var request = require('supertest');
var genres = require('./');
var pkg = require('./package');

describe('koa-res', function() {
  it('ReferenceError', function (done) {
    var app = koa();
    app.use(genres());
    app.use(function* () {
      hi();
    });

    request(app.callback())
      .get('/')
      .expect(500)
      .end(function(err, res) {
        assert.equal(err, null);
        
        assert.equal(res.body.ok, false);
        assert.equal(res.body.message, 'hi is not defined');
        assert.equal(res.body.version, pkg.version);
        assert.ok(new Date(res.body.now).toString() !== 'Invalid Date');

        done();
      });
  });

  it('TypeError', function (done) {
    var app = koa();
    app.use(genres({ debug: true }));
    app.use(function* () {
      throw new TypeError('wrong paramters');
    });

    request(app.callback())
      .get('/')
      .expect(400)
      .end(function(err, res) {        
        assert.equal(null, err);
        
        assert.equal(res.body.ok, false);
        assert.equal(res.body.message, 'wrong paramters');
        assert.ok(res.body.stack.match(/wrong paramters/));
        assert.equal(res.body.version, pkg.version);
        assert.ok(new Date(res.body.now).toString() !== 'Invalid Date');

        done();
      });
  });

  it('normal', function (done) {
    var app = koa();
    app.use(genres());
    app.use(function* () {
      this.body = {
        username: 'nswbmw',
        gender: 'male'
      };
    });

    request(app.callback())
      .get('/')
      .expect(200)
      .end(function(err, res) {
        assert.equal(null, err);
        
        assert.equal(res.body.ok, true);
        assert.deepEqual(res.body.data, { username: 'nswbmw', gender: 'male' });
        assert.equal(res.body.version, pkg.version);
        assert.ok(new Date(res.body.now).toString() !== 'Invalid Date');

        done();
      });
  });
});