---
title: CSS & HTML tips
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

## CSS

### Background

``` css
body {
  background: #ffffff url("img_tree.png") no-repeat right top;
}
```

<!--more-->

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

### Link LVHA rule

`a:link` - a normal, unvisited link
`a:visited` - a link the user has visited
`a:hover` - a link when the user mouses over it
`a:active` - a link the moment it is clicked

When setting the style for several link states, there are some order rules:

- `a:hover` MUST come after `a:link` and `a:visited`
- `a:active` MUST come after `a:hover`

### inline-block

### Center text in div

Using flexbox:

``` html
<div class="box">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh 
</div>

<style>
.box
{
  height: 150px;
  width: 400px;
  background: #000;
  font-size: 24px;
  font-style: oblique;
  color: #FFF;
  text-align: center;
  padding: 0 20px;
  margin: 20px;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
}
</style>
```

![](/images/text_center.png)

### window.onload vs document.onload

- `window.onload`：By default, it is fired when the entire page loads, including its content (images, CSS, scripts, etc.).
In some browsers it now takes over the role of document.onload and fires when the DOM is ready as well.

- `document.onload`: It is called when the DOM is ready which can be prior to images and other external content is loaded.

In chrome, `console.log(document.onload)` returns null. So just use `window.onload`.


## HTML

### XHTML

- A term that was historically used to desribe HTML documents written to conform with XML syntax rules.

HTML document:

``` html
<!-- Content-Type: text/html -->

<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>HTML</title>
  </head>
  <body>
    <p>I am a HTML document</p>
  </body>
</html>
```

``` xhtml
<!-- Content-Type: application/xhtml+xml -->

<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US">
  <head>
    <title>XHTML</title>
  </head>
  <body>
    <p>I am a XHTML document</p>
  </body>
</html>
```

- XHTML is stricter, must be 'well-formed'
- Was developed to make HTML more extensible and flexible with other.
- XHTML is friendly to machine, so it is easier to parse and analyze, good for SEO and screen readers.
- In comparison with XHTML, HTML is more 'presentation based'.
- Read [this](https://stackoverflow.com/questions/867498/at-the-end-of-the-day-why-choose-xhtml-over-html) for further details.







