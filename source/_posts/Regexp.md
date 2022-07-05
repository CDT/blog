---
title: Regexp
date: 2022-07-04 14:37:33
tags:
- tech
- regexp
---
## Tools
[Regexper: Visulization tool for Regexp](https://regexper.com/)
[Regex101: Write, test and debug Regexp](https://regex101.com/)

## Syntax
| Syntax | Description |
| ----------- | ----------- |
| **Special Characters** |
| \n | New line. |
| \f | Form feed. |
| \r | Return. |
| \s | Space. |
| \t | Tab. |
| \v | Vertical tab. |
| [\b] | Backspace. As `\b` refers to `boundary`(see below), `[]` is used to differentiate backspace and boundary. |
| **Repeats** |
| ? | Zero or one occurrence. |
| * | Zero or more occurrences. |
| {x} | X times. |
| {min, max} | min to max times. If max not given, then it means at least min times. |
| **Margins** |
| \b | Boundary. Matches a pseudo position between word character `\w` and non-word character `\W`. Often used to extract single word. Match `/\bcat\b/` in `The cat scattered his food` will not match `cat` in `scattered` as `cat` in `scattered` is surrounded by word character `s` and `t`. |
| \B | Non-boundary. |
| ^ | Start of string. |
| $ | End of string. |
| **Modifiers** |
| /m | Multiple line. |
| /i | Ignore case. |
| /g | Global. |
| **Sub-expression** |
| Backreference | Back position references 


