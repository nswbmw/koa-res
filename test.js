const assert = require('assert')
const Koa = require('koa')
const request = require('supertest')
const genres = require('./')

describe('koa-res', () => {
  it('ReferenceError', (done) => {
    const app = new Koa()
    app.use(genres())
    app.use(() => {
      hi()
    })

    request(app.callback())
      .get('/')
      .expect(500)
      .end((err, res) => {
        assert.equal(err, null)

        assert.equal(res.body.code, 500)
        assert.equal(res.body.message, 'hi is not defined')

        done()
      })
  })

  it('TypeError', (done) => {
    const app = new Koa()
    app.use(genres({ debug: true }))
    app.use(() => {
      throw new TypeError('wrong paramters')
    })

    request(app.callback())
      .get('/')
      .expect(500)
      .end((err, res) => {
        assert.equal(null, err)
        assert.equal(res.body.code, 500)
        assert.equal(res.body.message, 'wrong paramters')
        assert.ok(res.body.stack.match(/wrong paramters/))

        done()
      })
  })

  it('normal', (done) => {
    const app = new Koa()
    app.use(genres())
    app.use((ctx) => {
      ctx.body = {
        username: 'username',
        gender: 'male'
      }
    })

    request(app.callback())
      .get('/')
      .expect(200)
      .end((err, res) => {
        assert.equal(null, err)
        assert.equal(res.body.code, 200)
        assert.deepEqual(res.body.data, { username: 'username', gender: 'male' })

        done()
      })
  })

  it('normal with `custom` function', (done) => {
    const app = new Koa()
    app.use(genres({
      custom: (ctx) => {
        return {
          name: 'my-api'
        }
      }
    }))
    app.use((ctx) => {
      ctx.body = {
        username: 'username',
        gender: 'male'
      }
    })

    request(app.callback())
      .get('/')
      .expect(200)
      .end((err, res) => {
        assert.equal(null, err)
        assert.equal(res.body.code, 200)
        assert.deepEqual(res.body.data, { username: 'username', gender: 'male' })
        assert.equal(res.body.name, 'my-api')

        done()
      })
  })

  it('ctx._returnRaw', (done) => {
    const app = new Koa()
    app.use(genres())
    app.use((ctx) => {
      ctx._returnRaw = true
      ctx.body = {
        username: 'username',
        gender: 'male'
      }
    })

    request(app.callback())
      .get('/')
      .expect(200)
      .end((err, res) => {
        assert.equal(null, err)
        assert.deepEqual(res.code, null)
        assert.deepEqual(res.body, { username: 'username', gender: 'male' })

        done()
      })
  })

  it('ctx._returnRaw throw', (done) => {
    const app = new Koa()
    app.use(genres())
    app.use((ctx) => {
      ctx._returnRaw = true
      ctx.throw(400, 'test')
    })

    request(app.callback())
      .get('/')
      .expect(400)
      .end((err, res) => {
        assert.equal(null, err)
        assert.equal('test', res.text)

        done()
      })
  })
})
