---
title: Koa - A successor for Express
date: 2022-07-22 11:28:57
tags:
- tech
- nodejs
- backend
- Koa
---
![](/images/koa.jpeg)
## Refs
1. [Koa中文文档](http://koajs.cn/)

## Why Koa ?
Smaller, more expressive, more robust.
- VS Epxress
The key difference between Koa and Express is how they handle middleware. Express includes routing and templates in the application framework. Koa, on the other hand, requires modules for these features, therefore making it more modular or customizable. 

- Koa application
A Koa application is an object containing an array of middleware functions which are composed and executed in a stack-like manner upon request.

## Use Koa
### Hello world 
``` js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
// now, any request from localhost:3000 will return Hello world
```

