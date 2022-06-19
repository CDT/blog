---
title: Single threaded and asynchronous Javascript
date: 2022-06-19 20:57:20
tags: javascript, single-threaded, asynchronous, tech
---
## Reference: 
1. [A conclusion of Javascript running mechanism.](https://juejin.cn/post/6844903553795014663)
2. [Detailed explanation of Javascript asynchronism](https://juejin.cn/post/6844903556084924423)

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
Asynchronous functions runs and ...