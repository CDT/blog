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
**(THIS BLOG IS STILL IN PROGRESS)**
## Ref
1. [层次坐标](https://help.fanruan.com/finereport/index.php?doc-view-4001.html)
<!--more-->
## 层次坐标
用来表示扩展后的单元格位置，分为相对层次坐标和绝对层次坐标。

### 公式
> Cell_X[Cell_Y : Z]
|参数|说明|
|:-----:|:-----:|
|Cell_X|需要返回结果的单元格|
|Cell_Y|位移时参考的单元格|
|Z|位移量，例如：+2表示相对坐标且后移2位；-2表示相对坐标且前移2位；2表示绝对坐标从前往后第2位；!-2表示绝对坐标从后往前第2位|

### 相对层次坐标
![相对坐标例子](/images/cczb1.png)
![相对坐标例子](/images/xdzb1.png)
![相对坐标例子](/images/xdzb2.png)
> {% emoji warning %} 第一个向前位移-1时，数据为空；位移-2才是列中的最后一个数据。相当于列最后有一个看不见的空数据。

### 绝对层次坐标
![绝对坐标例子](/images/jdzb1.png)
![绝对坐标例子](/images/jdzb2.png)

### 常用公式
- **CellX[!0]**: 获取单元格CellX扩展出来的所有值，常用于[占比](https://help.fanruan.com/finereport/doc-view-4583.html)

![CellX[!0]](/images/cczb_formula1.png)

- **CellX[!0]{条件表达式}**: 通过条件筛选单元格CellX扩展出来的部分数据，常用于[条件汇总](https://help.fanruan.com/finereport/doc-view-345.html)

![CellX[!0]{条件表达式}](/images/cczb_formula2.png)

- **&CellX**: 获取单元格CellX扩展出来的每个数据的位置，常用于[环比](https://help.fanruan.com/finereport/doc-view-4584.html)

![&CellX](/images/cczb_formula3.png)

- **$CellX**: 获取单元格CellX扩展出来的每个位置对应的值，常用于[条件汇总](https://help.fanruan.com/finereport/doc-view-345.html)

![$CellX](/images/cczb_formula4.png)

## FAQ
### iframe嵌套

### Vue中报表弹窗
代码见FRModal.vue