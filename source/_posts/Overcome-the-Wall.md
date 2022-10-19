---
title: Overcome the Wall
date: 2022-10-19 11:59:20
cover: /images/China-firewall-banner.jpg
thumbnail: /images/China-firewall-banner.jpg
categories:
- tech
tags:
- tech
- Wall
- GFW
- WFH
---

Living in China you just have to make a lot of effort to overcome the GFW(aka, Great Firewall).

Personally I strongly recommend [Monocloud](https://monocloud.me/) to accelerate network access in China. Running the client will start a proxy running on 7078 port based on TCP and UDP protocol. Meanwhile it also turns on proxy in internet settings:

![Internet settings proxy](/images/internet_settings_proxy.png)

The following walkthrough presumes that you have started monocloud.
<!--more-->

## Github
Sometimes cloning a repo from github will return a connection timeout or connection reset error. You know why.

To use git behind a proxy:

``` console
git config --global http.proxy http://127.0.0.1:7078
```

Although `http.proxy` indicates it is a http proxy, it seems to work for both http and https as cloning github repos are on 443 port.

Once the proxy is no longer needed:

```
git config --global unset http.proxy
```

## npm
Thanks to Taobao, all salute Tabao! Here's the command to switch original npm repository to Taobao's mirror repository:

``` console
npm config set registry https://registry.npm.taobao.org
```

Test if successful:
``` console
npm info express
```
![NPM INFO EXPRESS](/images/npm_mirror.png)
Note that `registry.npmmirror.com` is the new domain for `registry.npm.taobao.org`.

Restore original repository:
``` console
npm config set registry https://registry.npmjs.org
```

A Beijing coder contributed an npm registry management tool `nrm`:

``` console
npm install -g nrm
nrm ls
  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
nrm use taobao
   Registry has been set to: https://registry.npmmirror.com/
```

Easy and up-to-date.

## 