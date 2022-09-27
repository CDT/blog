---
title: Web worker
date: 2022-09-22 16:55:55
cover: /images/worker.jpg
thumbnail: /images/worker.jpg
categories:
- tech
tags:
- tech
- web worker
---
## Refs
1. [WSchools Web Workers](https://www.w3schools.com/html/html5_webworkers.asp)
<!--more-->

## What and why
- Web workers enable web content to run scripts in background threads, without interfering with user interface.
- Web workers support: TODO

## Example
### Simple counter
```
simple-counter
- index.html
- demo-worker.js
```

``` html
<!--index.html-->
<!DOCTYPE html>
<html>
<body>

<p>Count numbers: <output id="result"></output></p>
<button onclick="startWorker()">Start Worker</button> 
<button onclick="stopWorker()">Stop Worker</button>

<p><strong>Note:</strong> Internet Explorer 9 and earlier versions do not support Web Workers.</p>

<script>
var w;

function startWorker() {
  if(typeof(w) == "undefined") {
    w = new Worker("demo_workers.js");
  }
  w.onmessage = function(event) {
    document.getElementById("result").innerHTML = event.data;
  };
}

function stopWorker() { 
  w.terminate();
  w = undefined;
}
</script>

</body>
</html>

```

``` js
// demo_workers.js
var i=0;

function timedCount() {
    i=i+1;
    postMessage(i);
    setTimeout("timedCount()", 500);
}

timedCount();
```

Use `serve` to host the page. Web worker does not work by just double click the `index.html` file.

![Web worker example](/images/web_worker1.png)


