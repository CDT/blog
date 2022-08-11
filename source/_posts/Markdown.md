---
title: Markdown
date: 2022-06-18 09:04:01
cover: /images/markdown.png
thumbnail: /images/markdown.png
categories:
- tech
tags:
- markdown
- tech
---
## What is markdown ?
A lightweight markup language which formats content by its simple syntax.

## Why markdown ?
1. Eveywhere, for everything. 
  Websites like Reddit, Github, etc. support markdown. Documents, notes, books, emails and so on support markdown. WYSIWYG files are mostly only supported by its own editor.

2. Human readable. Markdown files are in plain text which is human readable. WYSIWYG files are not.

3. Portable. As markdown files are written in plain text, it can be created on any device, any operating system. And almost all platforms supports rendering of markdown.

## Kicking the tires
Online editor:  [Dillinger](https://dillinger.io/)
Client editor: [Marktext](https://github.com/marktext/marktext), a realtime rendering editor

## Syntax
### Basic
| Element | Syntax |
| ---------- | ---------- |
| Heading | # Heading 1<br />## Heading 2<br />### Heading 3 |
| Bold | \*\*bold text\*\* |
| Italic | \*Italic\* |
| Blockquote | > blockquote |
| List | 1. First Item<br />2. Second Item<br />3. Third Item<br />- First Item<br />- Second Item<br />- Third Item |
| Code | \`code\` |
| Horizontal rule | \-\-\- |
| Link | \[title\](https://www.example.com) |
| Image | \!\[alt text\]\(image.jpg\) |
### Extended
| Element | Syntax |
| ---------- | ---------- |
| Table | \| Syntax \| Description \|<br />\| ----------- \| ----------- \|<br />\| Header \| Title \|<br />\| Paragraph \| Text \| <br>Note that there must be a blank line after the table.|
| Fenced code block | \`\`\`{ firstname: 'dongtian', lastname: 'chen' }\`\`\`<br><br>Use \`\`\` [language] to specify code block language, for example \`\`\` js to specify javascript. [See supported language here](https://rdmd.readme.io/docs/code-blocks#language-support) |
| Footnote | Here's a sentence with a footnote. [^1]<br />[^1]: This is the footnote. |
| Definition List | term<br />: definition |
| Strikethrough | \~\~The world is flat.\~\~ |
| Task List | - [x] Write the press release<br />- [ ] Update the website<br />- [ ] Contact the media |
| Emoji | That is so funny! :joy:<br /> |
| Highlight | I need to highlight these ==very important words==. |
| Subscript | H\~2\~O |
| Superscript | X^2^ |

## FAQ

- **Escaping**
Use backslash to escape most special characters.

***

- **Leading spaces**
Markdown does not support leading spaces before each paragraph. Use &nbsp;(may have some problem with specific renderer like Hexo) or full-width space(a prettier solution) at the beginning.

***

- **Custom style**
Use html tags directly in markdown and style them with css.
``` html
> <div class="poetry">满堂花醉三千客，一剑霜寒十四州。</div>

<style>
  .poetry {
    text-align: center;
  }
</style>
```

***

- **Warning box**
The easiest way is to use emojis:

``` markdown
> :warning: **If you are using mobile browser**: Be very careful here!
```

![Use emoji to call user attention](/images/markdown_emoji.png)

***

- **Change line in blockquote**

``` markdown
> Case 1
> 
> 00:23
> 
> 00:54
> 
> &nbsp;
> 
> Case 2
> 
> 00:21
> 
> 00:51
```
will produce:

> Case 1
> 
> 00:23
> 
> 00:54
> 
> &nbsp;
> 
> Case 2
> 
> 00:21
> 
> 00:51

or an easier one(leave one space at the beginning of the second line and so on):
``` markdown
> line 1
 line 2
 line 3
```

will produce: 
> line 1
 line 2
 line 3

***

- **Highlight delete/add line in code**

Use `diff` directive:

```
``` diff
- I like markup
+ I like markdown
```

gives:

``` diff
- I like markup
+ I like markdown
```

***

- **List in list/nested list**

Use 2 or 4 spaces: 

``` markdown
# Unordered list

* Item 1
* Item 2
* Item 3
    * Item 3a
    * Item 3b
    * Item 3c

# Ordered list

1. Step 1
2. Step 2
3. Step 3
    1. Step 3.1
    2. Step 3.2
    3. Step 3.3
```