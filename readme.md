## koa-res

Format koa's respond json.

### Install

    npm i koa-res --save

### Examples

**ReferenceError**

```
var app = require('koa')();
var genres = require('koa-res');

app.use(genres());

app.use(function* () {
  hi();
});

app.listen(3000);


// GET / -> 500

// {
//     ok: false,
//     message: 'hi is not defined',
//     stack: 'ReferenceError: hi is not defined\n    at Object.<anonymous> (...)',
//     version: '1.0.0',
//     now: '2016-04-18T04:23:33.970Z'
// }
```

**TypeError**

```
var app = require('koa')();
var genres = require('koa-res');

app.use(genres());

app.use(function* () {
  throw new TypeError('wrong paramters');
});

app.listen(3000);


// GET / -> 400

// {
//     ok: false,
//     message: 'wrong paramters',
//     stack: 'TypeError: wrong paramters\n    at Object.<anonymous> (...)',
//     version: '1.0.0',
//     now: '2016-04-18T04:26:14.437Z'
// }
```

**normal**

```
var app = require('koa')();
var genres = require('koa-res');

app.use(genres());

app.use(function* () {
  this.body = {
    username: 'nswbmw',
    gender: 'male'
  };
});

app.listen(3000);


// GET / -> 200

// {
//     ok: true,
//     data: { username: 'nswbmw', gender: 'male' },
//     version: '1.0.0',
//     now: '2016-04-18T04:28:26.728Z'
// }
```

### Test

    npm test

### License

MIT