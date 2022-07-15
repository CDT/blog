---
title: Record of an NJS-016 exception for node oracledb
date: 2022-07-12 09:34:13
tags:
---
![Node oracledb](/images/devo-node-js.svg)
## How it happened
  Using node `oracledb` to develop a backend api and encountered `NJS-016: buffer is too small for OUT binds` exception for a simple select query: `select a, b, c from tab@dblink`
  ![njs-016](/images/njs-016.png)
## Debugging
1. Googled `NJS-016: buffer is too small for OUT binds` and found little help. None of them suits my case.
2. Maybe it has something to do with database link ? Charset for local database is `AMERICAN_AMERICA.AL32UTF8` and for remote database is `AMERICAN_AMERICA.ZHS16GBK`. Changed charset environment variable to the same as remote database, still no luck.
3. Found that column `b` has some weired behavior: for chinese character value `神经阻滞` it only shows first two characters `神经` when environment variable is set to `AMERICAN_AMERICA.AL32UTF8`, different from database charset `AMERICAN_AMERICA.ZHS16GBK`. Column `b` definition is `varchar2(8)`. Maybe has something to do with this ?
## Reasoning
For charset `AMERICAN_AMERICA.ZHS16GBK`, each chinese character is 2 bytes wide.
For charset `AMERICAN_AMERICA.AL32UTF8`, each chinese character is 3 bytes wide.
With `varchar2(8)`, it can hold 4 characters on `AMERICAN_AMERICA.ZHS16GBK`, 2 characters on `AMERICAN_AMERICA.AL32UTF8`. That's why it only shows 2 characters when environment variable is `AMERICAN_AMERICA.AL32UTF8`.
`NJS-016` indicates out binds with `varhcar2(8)` cannot hold `神经阻滞` as it is 4×3=12 bytes wide.
## Solution
1. Expand column width from `varchar2(8)` to a at least `varchar2(12)`(Intrusive, not recommended).
2. Avoid using database links when charset is different on remote database. Create a distinct connection pool for remote database and execute query on a connection fetched from the pool.
