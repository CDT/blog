---
title: IndexedDB
cover: /images/indexeddb.webp
thumbnail: /images/indexeddb.webp
date: 2023-05-23 12:03:47
categories:
- tech
tags:
- tech
- indexeddb
---

## Refs
1. [IndexedDB指南](https://juejin.cn/post/6844903540213678093)

## 概念
- IndexedDB是一个事务型数据库系统，类似于基于 SQL 的 RDBMS。 
- 不同的是RDBMS使用固定列表，IndexedDB是一个基于JavaScript的面向对象的数据库。
- IndexedDB 是一种低级API，用于客户端存储大量结构化数据(包括, 文件/ blobs)。该API使用索引来实现对该数据的高性能搜索。
- 虽然 Web Storage 对于存储较少量的数据很有用，但对于存储更大量的结构化数据来说，这种方法不太有用。IndexedDB 提供了一个解决方案。



## 示例代码

<script src="https://gist.github.com/CDT/27e034743a8b2dee7bc18c574ca52d02.js"></script>

## 解释

1. `indexedDB`: reserved keyword. 直接指向indexedDB对象

2. `indexedDB.open('myDatabase', 1)`: 第二个参数是版本号。一般修改表结构，加索引的时候，提升版本号。

3. `request.onupgradeneeded`: 不知道为什么叫这个名字。一般是数据库打开/创建后，在这个回调函数创建object store(类似rdbms的table)，以及索引。

4. `request.onsuccess`：数据库成功open并upgrade之后，执行此函数。

5. `var transaction = db.transaction(['myObjectStore'], 'readwrite');`: 打开一系列表，准备进行事务操作

6. `var objectStore = transaction.objectStore('myObjectStore');`: 打开事务内的一个objectStore

7. 读取objectStore:

``` js
objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
        var listItem = document.createElement('div');
        listItem.textContent = cursor.value.name + ', Age: ' + cursor.value.age;
        dataContainer.appendChild(listItem);
        cursor.continue();
    }
};
```

8. 按属性查询：

``` js
var transaction = db.transaction(['myObjectStore'], 'readonly');
var objectStore = transaction.objectStore('myObjectStore');
var index = objectStore.index('name');

var name = 'John Doe';
var age = 25;
var keyRange = IDBKeyRange.only(name);

var request = index.openCursor(keyRange);

request.onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
        if (cursor.value.age === age) {
            // Found the object with the specified name and age
            console.log('Found:', cursor.value);
        }

        cursor.continue();
    }
};
```