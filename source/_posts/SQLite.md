---
title: SQLite
cover: /images/sqlite.png
thumbnail: /images/sqlite.png
date: 2022-10-19 21:30:55
categories:
- tech
tags:
- tech
- sql
- sqlite
---
## What and Why
- SQLite is not comparable with big client/server databases like Oracle, MySQL, PostgreSQL.
- SQLite is a file-based, simple, economical, reliable RDBMS.
<!--more-->

## When to use

1. Embedded devices and IoT
  - Like cellphones, set-top boxes, watches, drones.
2. Application file format
  - On-disk file format for desktop apps like VCS, record keeping programs.
3. Websites
  - Any low traffic site that gets fewer than 100K hits/day should work fine with SQLite (A rather conservative estimate). 

See full list [here](https://www.sqlite.org/whentouse.html)

## Use sqlite

1. [Download](https://www.sqlite.org/download.html). There are three releases for windows: x32 dll package, x64 dll package and exe package. Here let's use exe package to demonstrate.

2. Run `sqlite3 test.db` in command line. This will create a database file `test.db` and start the REPL client for sqlite.

3. Now just play with sql. Data will be persisted to `test.db` when the REPL client quits.

## Node.js sqlite

Install: `npm install sqlite3`

You may encounter the following error: 

```
npm ERR! gyp ERR! find VS **************************************************************
npm ERR! gyp ERR! find VS You need to install the latest version of Visual Studio
npm ERR! gyp ERR! find VS including the "Desktop development with C++" workload.
npm ERR! gyp ERR! find VS For more information consult the documentation at:
npm ERR! gyp ERR! find VS https://github.com/nodejs/node-gyp#on-windows
npm ERR! gyp ERR! find VS **************************************************************
```

Visual studio build tools are missing. The easiest way to install it is through `choco`:

`choco install visualstudio2017buildtools`

If still not able to install `sqlite3` after it, reboot the computer.
If still not able to install, repeatedly run the command until it is installed.
Sometimes `sqlite3` cannot be installed with `yarn add -dev`, try to install it with `yarn add` and then modify `package.json` and then install with `yarn add -dev`.

Use:

<script src="https://gist.github.com/CDT/e68210ea6b585b27e87c3f7ef3ab2962.js"></script>

As `sqlite3` does not support Promise, there's another wrapper library `sqlite` which provides Promise:

<script src="https://gist.github.com/CDT/bcd4c0b883b2cbb61ed6ce3d6cc4d05c.js"></script>


## MISC
- Create table if not exists:

``` sql
CREATE TABLE if not exists users(username TEXT primary key, email TEXT unqiue, password TEXT not null)
```