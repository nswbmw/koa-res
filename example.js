// const Koa = require('koa')
// const genres = require('./')
// const app = new Koa()

// app.use(genres({ debug: true }))

// app.use(() => {
//   hi()
// })

// app.listen(3000)

const Koa = require('koa')
const genres = require('./')
const app = new Koa()

app.use(genres({
  custom: (ctx) => {
    return {
      name: 'my-api'
    }
  }
}))

app.use((ctx) => {
  ctx._returnRaw = ctx.query._returnRaw

  ctx.body = {
    username: 'nswbmw',
    gender: 'male'
  }
})

app.listen(3000)
