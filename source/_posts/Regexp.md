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
| -----------: | ----------- |
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
| Sub-expression | Expression within brackets `(` and `)` is a sub-expression. |
| Backreference | Use `\1`, `\2` in the back to reference the first, second expression in the front. Example: Use `\b(\w+)\s\1` to match two continuous same words in `Hello what what is the first thing, and I am am Tom.`. |
| Non-capturing group | Use `(?:)` to avoid being captured. Example: Using `(Chendongti)(?:an)` to match `Chendongtian`  will only return one group `Chendongti`, `an` is not captured. |
| Lookahead | Use `(?=)`/`(?!)` to add a must-have/must-not-have suffix. Example: Using `happ(?=ily)` to match `happ happily` will only return `happ` in `happily`, and `happ(?!ily)` will only return `happ` in `happy`. |
| Lookbehind | Use `(?<=)`/`(?<!)` to add must-have/must-not-have prefix. Example: Using `(?<=ap)ple` to match `apple people` will only return `ple` in `apple`, and `(?<!ap)ple` will only return `ple` in `people`. |
| **Logical operators** |
| NOT | `^`. `[^abc]`. |
| OR | `\|`. `(a\|b)`. |




