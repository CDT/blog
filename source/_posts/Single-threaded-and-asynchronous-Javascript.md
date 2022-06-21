---
title: Single threaded and asynchronous Javascript
date: 2022-06-19 20:57:20
tags:
- javascript
- single-threaded
- asynchronous
- tech
---
## Reference: 
1. [A conclusion of Javascript running mechanism](https://juejin.cn/post/6844903553795014663)
2. [Detailed explanation of Javascript asynchronism](https://juejin.cn/post/6844903556084924423)
3. [JavaScript Event Loop And Call Stack Explained](https://felixgerschau.com/javascript-event-loop-call-stack/)

## Sinle-threaded Javascript
A running chrome consists of multiple process. Each tab is an isolated process.
![chrom task manager](/images/chrome_task_manager.png)
A tab process consisits of multiple threads. Among them the important ones includes: 
1. Rendering thread. Renders DOM.
2. Javascript engine thread. Runs Javascript. Note that when Javascript engine thread **runs**, rendering thread **hangs**. Because Javascript engine thread can manipulate DOM and rendering requires a consistent DOM.
3. Event thread. Handles event loop.
4. Timer thread. Handles timer methods like `setTimeout`, `setInterval`. Timer thread should be stand-alone as running of other function may affect timing accuracy.

## Asynchronism
Javascript, well-known for its asynchronism.
Synchronous functions runs and gets result. When function is slow (e.g. has file I/O or web request operations), it **waits**.
Asynchronous functions runs and expects result. The function does not wait for result, instead it leaves a **callback** function there to handle future result, and it moves on.
Asynchronism makes Javascript run without idle time. That's why javascript is fast.

## Event loop and call stack
![Event loop and call stack](/images/js-event-loop-explained.png)
Browsers gives us Web APIs to handle callbacks. Functions like `AJAX`, `setTimeout` call these APIs. 
Web APIs push callbacks into *callback queue*. Callbacks wait to be executed in the future.
Event loop watches call stack and callback queue. If call stack is empty, event loop takes one callback from callback queue and javascript engines executes the callback.

## Queues
Callback queue is not only one but two queue: macrotask queue and microtask queue.
Everytime event loop is triggered, it takes all microtasks and one macrotask. Microtasks are executed first.
Macrotasks: `setTimeout`, `setInterval`, `setImmediate`, I/O operations, UI rendering
Microtasks: `Promise`, `process.nextTick`, `MutationObserver`