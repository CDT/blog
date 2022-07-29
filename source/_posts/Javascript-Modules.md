---
title: Javascript Modules
date: 2022-07-29 10:48:49
categories:
- tech
cover: /images/js_module.png
thumbnail: /images/js_module.png
tags:
- tech
- javascript
- nodejs
- javascript modules
---
## Refs
1. [关于前端模块化 CommonJS、AMD、CMD、ES6中模块加载](https://juejin.cn/post/6844903581393354765)
2. [MDN - Javascript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)


## What is a Javascript Module ?
Just a javascript file which can import functionality from other and export its own functionality.

## Why do we need Javascript Module ?
Javascript starts small, but now it grows very large and complex.
Split large javascript into separate modules and re-use it.

## Module Types

### CommonJS
#### Intro
- The module specification invented by node.js.
- Only used in server environment.


#### Syntax
For module: 
``` js
// export:
exports.add = function (a, b) => {return a+b}
exports.pi = 3.14
// import:
var math = require('math');
math.add(2,3)
```

#### Problem
CommonJS is synchronous.
Not a problem for server environment, as it loads modules at startup.
For browser environment, browser has to wait for a long time, that will make browser 'dead', it stops responding.

### AMD
#### Intro
- Asynchronous Module Definition.
- Introduced by `requireJS`.
- All code is wrapped up in a callback, the callback runs after module loading is complete.

#### Syntax
``` js
// config: 
requirejs.config({
  paths: {
    jquery: 'jquery.min',
    math: 'math'
  }
})
// define
// define(name, dependencies, factory)
define ('math', ['jquery'], function($) {
  return {
    add: function(x, y) {
      return $.add(x, y)
    }
  }
})
// import:
// require([module], callback);
requirejs(['math'], function (math) {
  math.add(2, 3); // main code goes here
});
```

### CMD
#### Intro
- Common Module Definition.
- Introduced by 'sea.js'
- Asynchronous.

#### Syntax
``` js
// define
define(function(require, exports, module)) {
  var $ = require('jquery.js')
  exports.add = function (x, y) {
    return $.add(x, y)
  }
}

// import
seajs.use(['math.js'], function(math) {
  math.add(1,2)
})
```

### ES6 Module
#### Intro
- Official.
- Automatically uses strict mode. (i.e. `use strict`)
- Supported natively in modern browsers.(i.e. IE excluded)


#### Syntax
``` js
// import and export
import jquery from 'jquery'
export function add(x, y) {
  return x + y
}
```

Browser native support: 
``` html
<script type="module" src='main.js'></script>
<!-- or -->
<script type="module">
  /* Module code goes here */
</script>
```
Same as normal script import, only difference is `type="module"`.

### Features
- [Deferred](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer) by default, which makes ES6 modules asynchronous.
- Executed only once, even referenced in multiple tags.
- Supports dynamic loading, loads module on demand:
``` js
import('./modules/myModule.js')
  .then((module) => {
    // Do something with the module.
  });
```

## FAQ