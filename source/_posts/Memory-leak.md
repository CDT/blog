---
title: Memory leak in Javascript
date: 2022-07-23 11:50:41
categories:
- tech
tags:
- tech
- nodejs
- javascript
- memory leak
---
**(BLOG STILL IN PROGRESS)**

![](/images/memory_leak1.jpg)
## Refs
1. [Avoiding Memory Leaks in Node.js: Best Practices for Performance](https://blog.appsignal.com/authors/deepu-k-sasidharan)

## What is a memory leak ?
Memory allocated but not freed.
<!-- more -->

## What causes memory leak and how to resolve
### Accidental global variable
Global variable is referenced by the root node(`window` or global `this`), they never gets garbage collected. This applies to all its relatives - variable/objects referenced by this global variable, and relatives of these variable/objects as well. This may construct a large graph.

Example:
``` js
// This will be hoisted as a global variable
function hello() {
  foo = "Message";
}
 
// This will also become a global variable as global functions have
// global `this` as the contextual `this` in non strict mode
function hello() {
  this.foo = "Message";
}

// This will also become a global variable as arrow functions
// do not have a contextual `this` and instead use a lexical `this`
const hello = () => {
    this.foo = 'Message";
}
```



### Multiple references
One object referenced by multiple objects but one of the references never gets revoked.

### Closures
When a closure holds a reference to a large object in heap, it keeps the object in memory as long as the closure is in use.

### Timers and events
The use of setTimeout, setInterval, Observers and event listeners can cause memory leaks when heavy object references are kept in their callbacks without proper handling.
