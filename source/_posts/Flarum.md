---
title: Flarum
date: 2023-02-13 10:31:04
cover: /images/flarum-logo.jpg
thumbnail: /images/flarum-logo.jpg
toc: true
categories:
- tech
tags:
- tech
- flarum
- php
- e-forum
---

## Install

### Apache

- Server: Apache2.4 + PHP 7.4.33. Make sure they are installed and connected.

- Database: Install Mysql5. Create a database for flarum, e.g. `flarum`.

- Configure PHP:
  - Enable `fileinfo`, `gd2` and `pdo_mysql`.

- Install [Composer](https://getcomposer.org/), which a php package management tool like `npm`.

- Install Flarum:
  -  Create a folder named `flarum`, cd into it and run `composer create-project flarum/flarum .`.
  - If `vendor` packages failed to install due to network issues, install behind a proxy:
    - Turn on your proxy and run `set HTTP_PROXY=http://127.0.0.1:7078`
    - run `composer install`

- Configure Apache:

``` ,httpd.conf
DocumentRoot "D:\tmp\flarum\public"
<Directory "D:\tmp\flarum\public">
    Options Indexes FollowSymLinks
    AllowOverride All // It must be set to ALL otherwise error: the requested resource was not found
    Require all granted
</Directory>

LoadModule rewrite_module modules/mod_rewrite.so
```

- Configure Flarum:
  - in flarum installation folder, edit `config.php`:
    - `'url' => 'http://localhost'` change to `'url' => 'http://[domain or ip]'`
  - install [chinese langauge pack](https://discuss.flarum.org.cn/d/1211): 
    - `composer require flarum-lang/chinese-simplified`
    - `php flarum cache:clear`
