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
<!--more-->

## About
- `node-xlsx` is a lightweight excel parser and builder
- Install : `npm install node-xlsx`

## Examples

### Parse xlsx file
``` js
var xlsx = require('node-xlsx')
var fs = require('fs')

// Parse a buffer
const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/1.xlsx`))
// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/1.xlsx`)
// Both parse results are exactly the same

// Data structure:
/*
[
  {
    name: "Sheet1",
    data: [
      ['id', 'address'],
      [1, 'wuhan'],
      [2, 'shanghai']
    ]
  },
  {
    name: "Sheet2",
    data: [
      ['name', 'age', 'sex'],
      ['Tom', 20, 'male'],
      ['Mary', 21, 'female']
    ]
  }
]
*/

```

### Build xlsx file

``` js
var xlsx = require('node-xlsx')
var fs = require('fs')

const data = [
  [1, 2, 3],
  [true, false, null, 'sheetjs'],
  ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
  ['baz', null, 'qux'],
];
var buffer = xlsx.build([
  {name: 'Sheet1', data: data},
  {name: 'Sheet2', data: data}
]); // Returns a buffer

fs.writeFileSync('out.xlsx', buffer)
```
