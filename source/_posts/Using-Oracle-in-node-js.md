---
title: Using Oracle in node.js
date: 2022-11-01 16:02:11
cover: /images/Oracle_Logo.jpg
thumbnail: /images/Oracle_Logo.jpg
toc: true
categories:
- tech
tags:
- tech
- oracle
- nodejs
---

## FAQ

### Foat precision

- When retrieving float number, there will be precision problems.
  - Solution: [fetchAsString](https://node-oracledb.readthedocs.io/en/latest/api_manual/oracledb.html#oracledb.fetchAsString)
  - Solution: trim number to certain digits like 10 or 12

### execute() options

- See a list of `execute()` [options](https://node-oracledb.readthedocs.io/en/latest/api_manual/connection.html#executeoptionsparams)




