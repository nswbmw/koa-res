const assert = require('assert')
const Koa = require('koa')
const request = require('supertest')
const genres = require('./')
const pkg = require('./package')

describe('koa-res', () => {
  it('ReferenceError', (done) => {
    var app = new Koa()
    app.use(genres())
    app.use(() => {
      hi()
    })

    request(app.callback())
      .get('/')
      .expect(500)
      .end((err, res) => {
        assert.equal(err, null)

        assert.equal(res.body.ok, false)
        assert.equal(res.body.message, 'hi is not defined')
        assert.equal(res.body.version, pkg.version)
        assert.ok(new Date(res.body.now).toString() !== 'Invalid Date')

        done()
      })
  })

  it('TypeError', (done) => {
    var app = new Koa()
    app.use(genres({ debug: true }))
    app.use(() => {
      throw new TypeError('wrong paramters')
    })

    request(app.callback())
      .get('/')
      .expect(500)
      .end((err, res) => {
        assert.equal(null, err)
        assert.equal(res.body.ok, false)
        assert.equal(res.body.message, 'wrong paramters')
        assert.ok(res.body.stack.match(/wrong paramters/))
        assert.equal(res.body.version, pkg.version)
        assert.ok(new Date(res.body.now).toString() !== 'Invalid Date')

        done()
      })
  })

  it('normal', (done) => {
    var app = new Koa()
    app.use(genres())
    app.use((ctx) => {
      ctx.body = {
        username: 'nswbmw',
        gender: 'male'
      }
    })

    request(app.callback())
      .get('/')
      .expect(200)
      .end((err, res) => {
        assert.equal(null, err)
        assert.equal(res.body.ok, true)
        assert.deepEqual(res.body.data, { username: 'nswbmw', gender: 'male' })
        assert.equal(res.body.version, pkg.version)
        assert.ok(new Date(res.body.now).toString() !== 'Invalid Date')

        done()
      })
  })

  it('normal with `custom` fields', (done) => {
    var app = new Koa()
    app.use(genres({
      custom: {
        name: 'my-api'
      }
    }))
    app.use((ctx) => {
      ctx.body = {
        username: 'nswbmw',
        gender: 'male'
      }
    })

    request(app.callback())
      .get('/')
      .expect(200)
      .end((err, res) => {
        assert.equal(null, err)
        assert.equal(res.body.ok, true)
        assert.deepEqual(res.body.data, { username: 'nswbmw', gender: 'male' })
        assert.equal(res.body.version, pkg.version)
        assert.equal(res.body.name, 'my-api')
        assert.ok(new Date(res.body.now).toString() !== 'Invalid Date')

        done()
      })
  })
})
