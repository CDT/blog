---
title: CSS Preprocessors
date: 2022-08-30 21:15:17
cover: /images/css-preprocessors.jpg
thumbnail: /images/css-preprocessors.jpg
categories:
- tech
tags:
- tech
- css
- css preprocessor
---
**(THIS BLOG IS STILL IN PROGRESS)**
## Refs
1. [Sass](https://sass-lang.com/)
2. [Less](https://lesscss.org/)
3. [Stylus](https://stylus-lang.com/)
4. [PostCss](https://postcss.org/)
5. [CSS Preprocessors: What? Why?…How?!](https://medium.com/@sedwardscode/css-preprocessors-what-why-how-7bc5a7a564de#:~:text=CSS%20Preprocessors%20allow%20you%20to,css%20rules%20with%20something%20reusable.)
<!--more-->
## What and why
- A CSS preprocessor is a program that lets you generate CSS from the preprocessor's own unique syntax.
- A CSS preprocessor provides you with a lot of features to make writing css easier, like variables, mixins, nesting, control flow and so on.
- Most popular css preprocessors include: Sass, Less, Stylus and PostCss.


## Features
### Variables
``` css
/* sass */
$primary-color: #333;


body {
  color: $primary-color;
}
```

### Nesting
``` css
/* sass */
nav {
  ul {
    margin: 0;
  }
}
```

### Mixins
- A mixin lets you make groups of css declarations you want to reuse, keeping your Sass DRY.

``` css
/* sass, supports variables in mixin */
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, 25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed)
}

```

### Extends
- In Sass, @extend lets you share a set of CSS properties from one selector to another.

``` css
/* sass */
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

/* This CSS won't print because %equal-heights is never extended. */
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}
```

### If/Else

``` css
/* sass */
@mixin avatar($size, $circle: false) {
  width: $size;
  height: $size;

  @if $circle {
    border-radius: $size / 2;
  } @else if $size > 10 {
    border-radius: $size / 5;
  } @else {
    border-radius: $size / 10;
  }
}
```

### Loops

``` css
/* sass */
@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```

### Imports 

``` css
/* sass */
/* foundation/_code.scss */
code {
  padding: .25em;
  line-height: 0;
}
/* style.scss */
@import 'foundation/code'
/* As a convention, Sass files that are only meant to be imported, not compiled on their own, begin with _ (as in _code.scss). These are called partials, and they tell Sass tools not to try to compile those files on their own. You can leave off the _ when importing a partial. */

```

### Math

``` css
/* sass (@debug prints value of the expression) */
@debug math.$e; // 2.7182818285
```

