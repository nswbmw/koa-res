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
const genres = require('koa-res')

app.use(genres({ debug: true }))

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
const genres = require('koa-res')

app.use(genres())

app.use((ctx) => {
  ctx.body = {
    username: 'nswbmw',
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
  data: { username: 'nswbmw', gender: 'male' }
}
```

### Custom fields

```js
const app = new require('koa')
const genres = require('koa-res')

app.use(genres({
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

```js
const app = new require('koa')
const genres = require('koa-res')

app.use(genres())
app.use((ctx) => {
  ctx._returnRaw = true
  ctx.body = {
    username: 'nswbmw',
    gender: 'male'
  }
})

app.listen(3000)
```

Output:

```js
GET / -> 200

{
  username: 'nswbmw',
  gender: 'male'
}
```

### Test

```sh
$ npm test
```

### License

MIT
