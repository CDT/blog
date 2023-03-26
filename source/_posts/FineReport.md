---
title: FineReport
date: 2022-08-21 21:49:42
cover: /images/bi.webp
thumbnail: /images/bi.webp
categories:
- tech
toc: true
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

## 跨域调用iframe嵌套报表

- 思路：使用HTML5的postMessage方法实现。

- 页面调用代码：

``` js
document.getElementById('报表iframeId').contentWindow.postMessage('commit', '*')
```

- 在报表中引用一个外部js，代码如下：

``` js
window.addEventListener("message", (event)=>{
	if (event.data == 'commit') {
		_g().parameterCommit()
	}
});
```

## Excel导入

- [Excel导入(8.0版)](https://help.fanruan.com/finereport8.0/doc-view-1067.html)
- [Excel导入前前空表(8.0版)](https://help.fanruan.com/finereport8.0/doc-view-1893.html)
- [JS實現一鍵清除填報内容](https://help.fanruan.com/finereport/doc-view-3434.html)
- [例子](/assets/docs/bonus_team_dict_import.zip)

- Excel导入的单元格必须设置为可扩展，并且必须设置为**列表**而不是分组！否则会提示找不到不定行单元格
- Excel导入前清空已有表格：
  ``` js
  var arr = ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4"];
  //将需要清空的控件所在单元格的编号塞入数组
  for (i = 0; i < arr.length; i++) {
    var cr = FR.cellStr2ColumnRow(arr[i]);
    //根据单元格编号获取行列号
    _g().setCellValue(0, cr.col, cr.row, "");
    //遍历清空单元格内容
  }
  ```


## FAQ

### Vue中报表弹窗
代码见FRModal.vue

``` html
<template>
<div class="ui large modal" id="fr-modal">
  <i class="close icon"></i>
  <div class="header">
    <i class="fas fa-file-invoice-dollar"></i>  {{ title }}
  </div>
  <div class="image content">
    <iframe id="reportFrame" :src="src + q" width="1200px" height="1000px">
    </iframe>
  </div>
  <div class="actions">
    <!-- <div class="ui black deny button">
      Nope
    </div> -->
    <div class="ui positive right labeled icon button">
      OK
      <i class="checkmark icon"></i>
    </div>
    <!-- <div class="ui primary button" @click="hideModal">
      好的
    </div> -->
  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      src: "",
      q: "",
      title: "明细记录"
    }
  },
  mounted () {
    this.$events.$on('show-fr-modal', (src, q, title) => {
      this.src = src
      this.q = typeof q == 'string' ? q : ('&' + this.$.param(q))
      if (title) this.title = title
    })
  }
}
</script>

<style scoped lang="scss">
</style>
```

``` html
<template>
  <div id="app">
    <router-view/>

    <fr-modal />
  </div>
</template>
```

``` js
showBills (outVisit) {
  this.$events.fire('show-out-bills', '&pid=' + outVisit.PATIENT_ID + '&vid=' + outVisit.VISIT_ID) 
  $('#fr-modal').modal('show')
}
```

### 调用存储过程(remoteEvaluate)
- 帆软内置SQL方法：
```
SQL(connectionName,sql,columnIndex,rowIndex)：
  返回通过sql语句从connectionName中获得数据表的第columnIndex列第rowIndex行所对应的元素。

connectionName：数据库库的名字，字符串形式；
sql:SQL语句，字符串形式；
columnIndex:列序号，整形;
rowIndex:行序号，整形。

备注:行序号可以不写，这样返回值为数据列。
示例：
以我们提供的数据源HSQL为例
SQL("HSQL","SELECT * FROM CUSTOMER",2,2)等于王先生。
```

- 需要注意的是，使用帆软内置SQL方法不支持DML语句如update/delete.
  

- 使用[remoteEvaluate](https://help.fanruan.com/finereport/doc-view-4316.html#25)方法来调用帆软内置的SQL方法，进而调用存储过程。

``` js
FR.Msg.prompt('重置密码', "新密码", '123456', function(password) {

  if (password) {
  	let clause = "SQL('THBI', \"call dtchen.update_password('" + password + "', " + user_id + ")\", 1, 1)"
  	console.log(clause)
  	console.log(FR.remoteEvaluate(clause))
  }
})
```

### 调用外部接口

``` js
var presetMessage = `您好，您${appdate}申请的${pname}患者的${appname}(${appno})项目由于以下原因无法执行：[此处填写原因]，请先完善。`

var smsUrl = 'http://192.168.14.65:3000/misc/sms'

var post = function(url, data) {
  return fetch(url, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
}

FR.Msg.prompt(`发短信给${phone}`, "短信内容", presetMessage, function(msg) {
  if (msg) {
    post(smsUrl, {phone, msg, sender, empid})
    FR.Msg.alert('提示', '短信已发送')
  }
}, 1300) // 此处1300估计多余
```

### 外部页面出发报表接口

``` js
// 报表中引用本js文件
window.onload = function () {
	_g().parameterCommit()
}

window.addEventListener("message", (event)=>{
	if (event.data == 'commit') {
		_g().parameterCommit()
	}
});
```

``` js
// 以vue为例，通过postMessage通讯：

  methods: {
    submit () {
      document.getElementById('接诊').contentWindow.postMessage('commit', '*')
    }
  },
```

### JS常用函数

- `_g().getCellValue`

`getCellValue`的第一个参数是列号，且是0 based。

``` js
参数：
row: row()
col: col()

FR.Msg.alert('提示', row + '行' + col + '列' + _g().getCellValue(col - 1, row - 1))
```