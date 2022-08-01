---
title: FineReport
date: 2022-08-21 21:49:42
cover: /images/bi.webp
thumbnail: /images/bi.webp
categories:
- tech
tags:
- tech
- FineReport
- report
- database
- sql
---
**(THIS BLOG IS STILL UNDERWORK)**
## Ref
4. [层次坐标](https://help.fanruan.com/finereport/index.php?doc-view-4001.html)

## 层次坐标
用来表示扩展后的单元格位置，分为相对层次坐标和绝对层次坐标。

### 相对层次坐标
> Cell_X[Cell_Y : Z]
|参数|说明|
|:-----:|:-----:|
|Cell_X|需要返回结果的单元格|
|Cell_Y|位移时参考的单元格|
|Z|位移量，后移为正数，前移为负数|

例子：
![层次坐标例子](/images/cczb1.png)
> {% emoji warning %} 第一个向前位移-1时，数据为空；位移-2才是列中的最后一个数据。相当于列最后有一个看不见的空数据。

### 绝对层次坐标
