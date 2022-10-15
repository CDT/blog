---
title: Windows操作相关问题
cover: /images/winlogo.jpg
thumbnail: /images/winlogo.jpg
date: 2022-10-15 08:48:38
tags:
- tech
- windows
categories:
- windows
---

## 1. 远程桌面明明输入了正确的账号密码，却提示登录不对
<!--more-->
登录192.168.40.20，账号和密码都是正确输入的：
![正确的账号密码](/images/mstsc_error1.png)


![无法登录](/images/mstsc_error2.png)


![多余的前缀](/images/mstsc_error3.png)

如何在登录的时候去掉这个多余的前缀？

![多余的前缀](/images/mstsc_error4.png)

这个前缀是Windows的域。
域是必要字段，如果没有填默认当前电脑的名称。登录到远程电脑时，可以用"\"前缀表示是远程电脑的域（或者用远程电脑的名称+"\"）：


![多余的前缀](/images/mstsc_error5.png)

## 2. 