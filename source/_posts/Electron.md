---
title: Electron
cover: /images/atom.avif
thumbnail: /images/atom.avif
date: 2022-09-21 19:45:18
categories:
- tech
tags:
- tech
- electron
---

## Refs
1. [Electron JS Docs](https://www.electronjs.org/docs/latest)

## What and why
- Electron is a framework for building desktop applications using JavaScript, HTML, and CSS.
- By embedding **Chromium** and **Node.js** into its binary, Electron allows you to maintain one JavaScript codebase and create cross-platform apps that work on Windows, macOS, and Linux — no native development experience required.
<!--more-->

## Chromium VS Chrome
- Chrome is a web browser whereas Chromium is an open-source software project.
- Chromium serves as a building ground for many other popular browsers.

## A simplest Electron App
```
first-app
- main.js
- index.html
- package.json
```

``` json
// package.json
{
  "name": "myelec",
  "version": "1.0.0",
  "description": "Test",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "electron": "^20.2.0"
  }
}
```

``` js
// main.js
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
```

``` html
<!--index.html-->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello from Electron renderer!</title>
  </head>
  <body>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
  </body>
</html>
```

![First Electron App](/images/first_electron.png)

