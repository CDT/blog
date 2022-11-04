---
title: Log4js
date: 2022-11-01 16:16:06
cover: /images/log.jpg
thumbnail: /images/log.jpg
categories:
- tech
tags:
- tech
- log4js
---

## Tips

- By default, `log4js` level for `default` category is set to `OFF`, thus not outputting any logs. To turn on logging, `level` must be set other than `OFF`.
- Levels: TRACE -> DEBUG -> INFO -> WARN -> ERROR -> FATAL
<!-- more -->

## Glossary

### Appenders

- Appenders serialise logs to some form of output.
- Like files, emails, data over the network.
- Frequently used appenders: `stdout`, `stderr`, `file` (`stdout` and `stderr` seems to be identical).
- Appenders do not specify level.

### Categoris

- Categories groups appenders.
- Categories can be inherited by `x.y` syntax(which will inherit from `x` category).
- Categories specifies level.

### Layout

- Defines structure of each line of code.
- See synaxt [https://log4js-node.github.io/log4js-node/layouts.html].

## Example

### Simplest

``` js
var log4js = require("log4js")

var logger = log4js.getLogger() // returns default category with no param specified
// default category is stdout with level TRACE
logger.level = "debug" // default level is OFF - which means no logs at all.
logger.debug("Some debug messages")
```

### File and stdout combined

``` js
const log4js = require("log4js")

log4js.configure({
  appenders: {
    out: { type: "stdout" },
    app: { type: "file", filename: "app.log", maxLogSize: 100 * 1024 * 1024, backups: 3 },
    // maxLogSize is in byte
    // Reaching max size will create a new file and rename old files to xx.log.1, xx.log.2, xx.log.3... The bigger number the older.
    // backups: number of old log iles to keep during rolling(excluding hot/current file)
  },
  categories: {
    default: { appenders: ["out"], level: "trace" }, // getLogger() gets default category
    special: { appenders: ["out", "app"], level: "debug" }
  }
})

const logger = log4js.getLogger('special')
// note that if file appender is defined, log4js will always create the file no matter if file appender is utilized.

logger.debug('Some debug information.')
```

