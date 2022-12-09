---
title: Frontend Questions
date: 2022-12-09 16:51:21
cover: /images/questions.png
thumbnail: /images/questions.png
categories:
- tech
tags:
- tech
- css
- html
- interview
---

1. Why assigning too many ids to html elements is not a good practice?
<!--more-->
[Ref](https://stackoverflow.com/questions/3434278/do-dom-tree-elements-with-ids-become-global-properties)

- Elements with id will be global variables and properties on `window` object. 
  - This leads to more bugs, like if there's a `var` with the same name of an `id` of a DOM node.

- If there's a built-in global property or property of `window` with the same name as the `id` of some DOM node, it will not be overriden by the `id` attribute.

- Example:

``` html
<html>
<body>
  <p id="p1">Hello</p>
</body>
</html>
```

![Global id](/images/global_id.png)


2. 