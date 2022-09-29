---
title: Node XLSX
cover: /images/excel.svg
thumbnail: /images/excel.svg
date: 2022-09-29 15:34:29
categries:
- tech
tags:
- tech
- snippet
- node
- xlsx
- excel
---

## Refs
1. [node-xlsx](https://www.npmjs.com/package/node-xlsx)

## About
- `node-xlsx` is a lightweight excel parser and builder
- Install : `npm install node-xlsx`

## Examples

### Parse xlsx file
``` js
var xlsx = require('node-xlsx')
var fs = require('fs')

// Parse a buffer
const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`))
// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`)
```
