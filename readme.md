## koa-res

Format koa's respond json.

### Install

```sh
$ npm i koa-res --save
```

### Examples

**Error Response**

```js
const app = new require('koa')
const koaRes = require('koa-res')

app.use(koaRes({ debug: true }))

app.use(() => {
  hi()
})

app.listen(3000)
```

Output:

```js
GET / -> 500

{
  code: 500,
  message: 'hi is not defined',
  stack: 'ReferenceError: hi is not defined\n    at Object.<anonymous> (...)'
}
```

**Normal Response**

```js
const app = new require('koa')
const koaRes = require('koa-res')

app.use(koaRes())

app.use((ctx) => {
  ctx.body = {
    username: 'username',
    gender: 'male'
  }
})

app.listen(3000)
```

Output:

```js
GET / -> 200

{
  code: 200,
  data: { username: 'username', gender: 'male' }
}
```

### Custom fields

```js
const app = new require('koa')
const koaRes = require('koa-res')

app.use(koaRes({
  custom: (ctx) => {
    return {
      name: 'my-api'
    }
  }
}))

app.use((ctx) => {
  ctx.body = 'This is my api'
})

app.listen(3000)
```

Output:

```js
GET / -> 200

{
  name: 'my-api',
  code: 200,
  data: 'This is my api'
}
```

### ctx.\_returnRaw

You must put ctx.\_returnRaw on top of route controller.

```js
const app = new require('koa')
const koaRes = require('koa-res')

app.use(koaRes())
app.use((ctx) => {
  ctx._returnRaw = true
  ctx.body = {
    username: 'username',
    gender: 'male'
  }
})

app.listen(3000)
```

Output:

```js
GET / -> 200

{
  username: 'username',
  gender: 'male'
}
```

### Test

```sh
$ npm test
```

### License

MIT
