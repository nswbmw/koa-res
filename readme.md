## koa-res

Format koa's respond json.

**NB**: koa@1 -> koa-res@1, koa@2 -> koa-res@2.

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
  ok: false,
  message: 'hi is not defined',
  stack: 'ReferenceError: hi is not defined\n    at Object.<anonymous> (...)',
  version: '1.0.0',
  now: '2017-10-11T08:47:43.379Z'
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
  ok: true,
  data: { username: 'nswbmw', gender: 'male' },
  version: '1.0.0',
  now: '2017-10-11T08:50:12.264Z'
}
```

### Custom fields

```js
const app = new require('koa')
const genres = require('koa-res')

app.use(genres({
  custom: {
    name: 'my-api'
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
  ok: true,
  data: 'This is my api',
  version: '1.0.0',
  now: '2017-10-11T08:50:12.264Z'
}
```

### Test

```sh
$ npm test
```

### License

MIT
