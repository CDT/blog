---
title: Typescript
date: 2022-07-22 21:18:09
categories:
- tech
tags:
- javascript
- typescript
- nodejs
---
**(BLOG IN PROGRESS)**

![](/images/typescript1.png)
## Refs
1. [Typesript](https://www.typescriptlang.org/)
2. [Why create Typescript](https://www.typescriptlang.org/why-create-typescript)
3. [Typescript Handbook Intro](https://www.typescriptlang.org/docs/handbook/intro.html)
4. [Modules .d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)
5. [Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
6. [.ts vs .d.ts](https://thisthat.dev/d-ts-vs-ts/)

## What is typescript ?
A strongly typed programming language that builds on JavaScript.
<!-- more -->
## Why typescript ?
**Catch type errors beforehand**
TypeScript adds additional syntax to JavaScript to catch type errors - the most common errors for programmers.

**Example**
![Not callable](/images/tscheck1.png)
![Non-existent property](/images/tscheck2.png)
![Non-existent property, smart notice](/images/tscheck3.png)

## Use typescript
### Typescript compiler
1. Install `npm install -g typescript`
2. Create `hello.ts`:
``` js
// Greets the world.
console.log("Hello world!");
```
3. Compile: `tsc hello.ts`

### Declare types
1. Function parameter type

``` js
function greet(person: string, date: Date) {
  // parameter person and date must be of type string and Date
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```

``` js
greet('Maddison', Date())
// This gives error: Argument of type 'string' is not assignable to parameter of type 'Date'.
// Because Date() returns a string instead of Date.

greet('Maddison', new Date())
// In order to get a Date object, use new Date() instead.
```

### Modules
Typescript modules is analogous to Javascript modules.

In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module. Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).

### .d.ts file
- .ts is the standard TypeScript files. The content then will be compiled to JavaScript.

- *.d.ts is the type definition files that allow to use existing JavaScript code in TypeScript.
For example, we have a simple JavaScript function that calculates the sum of two numbers:

``` js
// math.js
const sum = (a, b) => a + b;

export { sum };
```

TypeScript doesn't have any information about the function including the name, the type of parameters. In order to use the function in a TypeScript file, we provide its definition in a d.ts file:

``` ts
// math.d.ts
declare function sum(a: number, b: number): number;
```

From now on, we can use the function in TypeScript without any compile errors.

The d.ts file doesn't contain any implementation, and isn't compiled to JavaScript at all.