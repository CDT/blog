---
title: Strict mode in Javascript
date: 2022-08-22 16:39:20
cover: /images/strict-mode.jpg
thumbnail: /images/strict-mode.jpg
categories:
- tech
tags:
- tech
- javascript
- strict mode
---
## Refs
1. [JavaScript Use Strict](https://www.w3schools.com/js/js_strict.asp)
<!--more-->
## What and why
- Defines that JavaScript code should be executed in "strict mode".
- Introduced in ECMAScript 5
- Not a statement, but a literal expression, ignored by earlier versions of JavaScript.
- Strict mode  can make your code more secure.

## Not allowed
### Undefined variable
``` js
"use strict";
y = 3.14;
// This will cause: Uncaught ReferenceError: y is not defined
```

### Delete identifier
Reference: [Delete in strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Delete_in_strict_mode)

> Normal variables can't be deleted with `delete` operator. `delete` is only meant for properties on an object.
> `delete` has nothing to do with directly freeing memory. Memory management is done indirectly via breaking references.
> This error only happens in strict mode code. In non-strict code, the operation just returns false.(note that testing this in chrome debug tools return true while in browser or node.js return false)

``` js
"use strict";
// variable
let x = 3.14;
delete x;     // This will cause an error: Delete of an unqualified identifier in strict mode
// function
function x(p1, p2) {}; 
delete x;   // Same as above
```

### Octals
``` js
"use strict";
let x = 010;   // This will cause an error 
```

### Eval to create variables
``` js
"use strict";
eval ("var x = 2");
alert (x);      // This will cause an error: Uncaught ReferenceError: x is not defined
```

### With statement
> {% emoji warning %} Warning: Use of the with statement is not recommended, as it may be the source of confusing bugs and compatibility issues. See the "Ambiguity Contra" paragraph in the "Description" section below for details. 
[See why with statement is bad](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)

``` js
"use strict";
with (Math){x = cos(2)};   // This will cause an error: Strict mode code may not include a with statement
```

### 'arguments/eval' as variable name
``` js
"use strict";
let arguments = 3.14;   // This will cause an error: Unexpected eval or arguments in strict mode
let eval = 3.14; // Same as above
```

### Delete undeletable prop
``` js
"use strict";
delete Object.prototype;   // This will cause an error: Cannot delete property 'prototype' of function Object() { [native code] }
```

### Write to get-only/read-only property
``` js
"use strict";
const obj = {get x() {return 0} };

obj.x = 3.14;   // This will cause an error
```

``` js
"use strict";
const obj = {};
Object.defineProperty(obj, "x", {value:0, writable:false});

obj.x = 3.14;   // This will cause an error: Cannot assign to read only property 'x' of object '#<Object>'
```

## Other Features
### Local scope
``` html
<script>
x = 3.14;    // This will not cause an error.
myFunction();

function myFunction() {
  "use strict";
  y = 3.14;  // This will cause an error (y is not defined).
}
</script>
```

### Unspecified `this` in function
> Inside functions, the "this" keyword is no longer the global object if not specified:
``` js
function myFunction() {
  alert(this);
}
myFunction(); // pops 'undefined'
```