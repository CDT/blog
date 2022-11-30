---
title: CSS tips
date: 2022-11-30 17:10:38
cover: /images/css3.webp
thumbnail: /images/css3.webp
toc: true
categories:
- tech
tags:
- tech
- css
- css3
---

## Tips

### Background

``` css
body {
  background: #ffffff url("img_tree.png") no-repeat right top;
}
```

is the shorthand for:

``` css
body {
  background-color: #ffffff;
  background-image: url("img_tree.png");
  background-repeat: no-repeat;
  background-position: right top;
}
```

It does not matter if one of the property values is missing, as long as the other ones are in this order. 

<iframe source="https://www.w3schools.com/cssref/playdemo.php?filename=playcss_background-repeat&preval=space" />