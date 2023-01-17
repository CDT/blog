---
title: Wordpress
date: 2022-12-22 14:24:45
cover: /images/wordpress2.png
thumbnail: /images/wordpress2.png
categories:
- tech
tags:
- tech
- wordpress
---

## Ref
1. [为什么Wordpress深入教程很少](https://www.zhihu.com/question/285712936/answer/2439540712)
2. [Brain1981](https://www.zhihu.com/people/brain1981)
3. [Becoming Jenny](https://www.becomingjenny.net/)

<!--more-->

## Wordpress迁移

使用Duplicator插件迁移：
  1. Create New创建一个package，包含一个archive zip和installer.php
  2. 将文件复制到网站根目录下
    - SiteGroup操作：
      - Websites->Site Tools->Site->FTP Accounts，创建账号密码
      - FileZilla连接，设置host为域名，用户名密码为上一步中设置的账号密码
  3. 运行installer.php
    - 查看数据库名称、账号、密码：查看网站的wp-config.php文件。注意Site Tools->Site->MySQL中不会展示数据库用户密码。
    - Host保持localhost即可

使用UpdraftPlus迁移：将几个备份文件(Database, Plugins, Themes, Uploads, Others)从源网站复制到新网站，然后restore即可。
  - 经测试貌似会有问题，比如restore之后，访问新网站仍然会尝试访问就网站的域名，应该是数据库保存的是旧网站域名导致。


## 调试

- Woocommerce下单时PayPal提示"To comply with international regulations, this transaction has been declined."
  - 中国区无法使用PayPal服务。