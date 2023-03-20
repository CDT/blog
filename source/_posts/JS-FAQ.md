---
title: Javascript FAQ
date: 2023-03-20 21:40:55
cover: /images/JavaScript-logo.png
thumbnail: /images/JavaScript-logo.png
toc: true
tags:
- tech
- javascript
categories:
- tech
---

## Float precision

``` js
console.log(0.1 + 0.2) // 0.30000000000000004
```

### Solution: Strip

``` js
function strip(number) {
  return parseFloat(number.toFixed(12));
}

console.log(strip(0.1 + 0.2)) // 0.3
```

### Solution: Decimal.js

- The `decimal.js` package is 283kb at the time of writing. So `decimal.js` is not appropriate for frontend.

``` js
const Decimal = require('decimal.js')

let m = new Decimal(0.1)

console.log(m.add(0.2).toNumber()) // 0.3
```
