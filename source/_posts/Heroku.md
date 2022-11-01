---
title: Heroku
date: 2022-11-01 15:42:28
cover: /images/heroku.png
thumbnail: /images/heroku.png
categories:
- tech
tags:
- tech
- heroku
---

## Add proxy to heroku login
<!-- more -->

As heroku has been fuxked by GFW, a proxy is required to login in command line.

```
> set HTTP_PROXY=http://proxy.server.com:portnumber
or
> set HTTPS_PROXY=https://proxy.server.com:portnumber
> heroku login
```
