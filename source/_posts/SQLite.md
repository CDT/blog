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