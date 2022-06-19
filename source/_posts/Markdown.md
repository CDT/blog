---
title: Markdown
date: 2022-06-18 09:04:01
tags: markdown, tech
---
![Markdown](/images/markdown.png)
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
| Table | \| Syntax \| Description \|<br />\| ----------- \| ----------- \|<br />\| Header \| Title \|<br />\| Paragraph \| Text \| |
| Fenced code block | \`\`\`{ firstname: 'dongtian', lastname: 'chen' }\`\`\` |
| Footnote | Here's a sentence with a footnote. [^1]<br />[^1]: This is the footnote. |
| Definition List | term<br />: definition |
| Strikethrough | \~\~The world is flat.\~\~ |
| Task List | - [x] Write the press release<br />- [ ] Update the website<br />- [ ] Contact the media |
| Emoji | That is so funny! :joy:<br /> |
| Highlight | I need to highlight these ==very important words==. |
| Subscript | H\~2\~O |
| Superscript | X^2^ |

**Escaping**: Use backslash to escape most special characters.