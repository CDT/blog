---
title: Javascript this && Javascript Class VS Function
date: 2022-10-29 12:05:40
cover: /images/jsthis.jpg
thumbnail: /images/jsthis.jpg
toc: true
categories:
- tech
tags:
- tech
- javascript
- this
---
## Ref
1. [Javascript this](https://www.w3schools.com/js/js_this.asp)

## What is this
- `this` in Javascript refers to the context of the statement in which it is being executed.
<!-- more -->

## this in different context

### Global

``` js
console.log(this)
// In browser like chrome prints:
Window {
  0: global,
  Mozilla: ...,
  alert: f alert(),
  atob: f alert(),
  ...
}

// In node.js, this points to an empty object, 
// global points to the global object
console.log(global)
// It prints:
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  ...
}

// To access global object in all environments, use globalThis
console.log(globalThis)
// it prints Window in browser and globa in node.js
```



### Function

``` js
const test = {
  prop: 42,
  func: function() {
    return this.prop;
  },
};

console.log(test.func());
// expected output: 42

function f () {
  console.log(this)
}
// Prints the globalThis object.
// In browser it prints Window, in nodejs it prints Global
```

In strict mode function called in a global context will return `undefined`.

``` js
'use strict'

function f() {
  console.log(this)
}

f()
```

### Class

``` js
class Example {
  constructor() {
    console.log(this)
  }
  first () {
    console.log(this)
  }
}

const e = new Example()
e.first()
// Both prints:
// Example {}
```

### DOM Element Event

``` html
<!DOCTYPE html>
<html>
<body>

<h1>The JavaScript <i>this</i> Keyword</h1>

<button onclick="this.style.display='none'">Click to Remove Me!</button>

</body>
</html>
```

## Explicit binding

### Call

- Calling a function with `call` changes its context.

``` js
const person1 = {
  name: 'jack',
  printName: function () {
    console.log(this.name)
  }
}

const person2 = {
  name: 'tom'
}

person1.printName.call(person2)
// tom
```

``` js
global.name = 'tom'
// in node.js global can be replaced with globalThis
// in browser, global can be left out

function printName (age) {
  console.log(this.name + ' ' + age)
}

const p = {
  name: 'jack'
}

printName(18)
// tom 18
printName.call(p, 28)
// jack 28
```

### Bind

``` js
let p = {
  name: 'jack'
}

function f() {
  console.log(this.name)
}

let f1 = f.bind(p)

f1()
// jack
```

### Apply

``` js
let p = {
  name: 'jack'
}

function f() {
  console.log(this.name)
}

f.call(p)
// jack

f.apply(p)
// jack
```

- The difference is that apply lets you invoke the function with arguments as an array; call requires the parameters be listed explicitly. A useful mnemonic is "A for array and C for comma."

```
theFunction.apply(valueForThis, arrayOfArgs)
theFunction.call(valueForThis, arg1, arg2, ...)
```

``` js
let p = {
  name: 'jack'
}

function f(a, b) {
  console.log(this.name, a, b)
}

f.call(p, 'a', 'b')
// jack a b

f.apply(p, ['a', 'b'])
// jack a b
```

## this in arrow function

- With arrow functions there are no binding of this.
- With arrow functions the this keyword always represents the object that defined the arrow function.

``` js
(() => console.log(this))()
// prints Window in browser, which defined the global arrow function
// prints {} in node.js, which is the same as a global this
```

## this in Vue

``` html
<template />

<script>
export default {
  data: () => ({
    d: this // this gives undefined
  }),
  methods: {
    f1 () { console.log(this) }, // prints current Vue component
    f2: () => this // this gives undefined
  }
};
</script>
```

## Class VS Function

### Class

- Use `class` to create a class.
- Always add a constructor.

``` js
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
}

const myCar = new Car("Ford", 2014)

console.log(myCar)
// Car { name: 'Ford', year: 2014 }
```

### Class rewritten in Function

- Classes are essentially functions. Functions can be invoked with `new` too.

``` js
function Car(name, year) {
  this.name = name
  this.year = year
}

Car.prototype.age = function (x) {
  return `it is ${x - this.year} years old`
}

Car.prototype.age1 = x =>`it is ${x - this.year} years old`

const myCar = new Car("Ford", 2014)

console.log(myCar)
// Car { name: 'Ford', year: 2014 }

console.log(myCar.age(2022))
// it is 8 years old

console.log(myCar.age1(2022))
// It is NaN years old
// this in arrow function returns global this which is {} in node.js
```