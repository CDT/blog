---
title: Typescript
date: 2022-07-22 21:18:09
cover: /images/typescript1.png
thumbnail: /images/typescript1.png
categories:
- tech
tags:
- javascript
- typescript
- nodejs
---
**(THIS BLOG IS STILL IN PROGRESS)**

# Refs
1. [Typesript](https://www.typescriptlang.org/)
2. [Why create Typescript](https://www.typescriptlang.org/why-create-typescript)
3. [Typescript Handbook Intro](https://www.typescriptlang.org/docs/handbook/intro.html)
4. [Modules .d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)
5. [Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
6. [.ts vs .d.ts](https://thisthat.dev/d-ts-vs-ts/)
7. [Triple-slash directives](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html)
8. [一文读懂TS的(.d.ts)文件](https://juejin.cn/post/6987735091925483551)

# What is typescript ?
A strongly typed programming language that builds on JavaScript.
<!-- more -->
# Why typescript ?
**Catch type errors beforehand**
- TypeScript adds additional syntax to JavaScript to catch type errors - the most common errors for programmers.

**Example**
![Not callable](/images/tscheck1.png)
![Non-existent property](/images/tscheck2.png)
![Non-existent property, smart notice](/images/tscheck3.png)

# Run and compile typescript
## Run typescript
[ts-node](https://www.npmjs.com/package/ts-node): Typescript execution and REPL for node.js, with source map and native ESM support.

- run a file:

script.ts: 

``` ts
const x = 10
const y = 'foo'
function add(x: number, y: number) {
  return x + y
}
console.log(add(x, y))
```

`ts-node script.ts` gives:

``` console
> index.ts:859
    return new TSError(diagnosticText, diagnosticCodes, diagnostics);
           ^
TSError: ⨯ Unable to compile TypeScript:
test.ts:6:20 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

- REPL example: 

``` console
> ts-node
> const x = 10
undefined
> const y = 'foo'
undefined
> function add(x: number, y: number) { return x + y }
undefined
> add(x, y)
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'
```

## Compile typescript
1. Install `npm install -g typescript`
2. Create `hello.ts`:

``` js
// Greets the world.
console.log("Hello world!");
```
3. Compile: `tsc hello.ts`

# Type a Function parameter

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

# Type an object
- Anonymous object type:

``` ts
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name
}
```

- through `interface` keyword:

``` ts
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return "Hello " + person.name;
}
```

- through `type` keyword:

``` ts
type Person = {
  name: string;
  age: number;
}

function greet(person: Person) {
  return "Hello " + person.name;
}
```

# Triple-slash directives
- Triple-slash directives are single-line comments containing a single XML tag at the top of a file, instructing compiler to do certain preprocessing.
- Example: `<refrence path="..." />` include additional files in the compilation process. 
- **Not recommended** for best practice, [see why here](https://medium.com/swlh/typescript-best-practices-slash-directives-types-and-unbound-methods-993195e1faf)



# Modules
Typescript modules is analogous to Javascript modules.

In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module. Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).

## Ambient modules(.d.ts file)
- We call declarations that don't define an implementation "ambient". Typically, these are defined in `.d.ts` files. If you are familiar with C/C++, you can think of these as `.h` files.
- *.d.ts is the type definition files that allow to use existing JavaScript code in TypeScript.
- *.d.ts is not compiled.

For example, we have a simple JavaScript function that calculates the sum of two numbers:

### Write an ambient module
``` js
// math.js
exports.add = (a, b) => a+b
```

TypeScript doesn't have any information about the function including the name, the type of parameters. If we import `math.js` from an `ts` file, errors are thrown:

``` ts
// index.ts
import { add } from './math.js'
// warning TS7016: Could not find a declaration file for module './math.js'
// 'math.js' implicitly has an 'any' type

console.log(add(1,2))
```

To solve the warning, a `.d.ts` declaration file must be added: 

``` ts
// math.d.ts
declare function add(a: number, b: number): number
```

and change the import part in `index.ts`:

``` diff
// index.ts
- import { add } from './math.js'
+ import { add } from './math'

console.log(add(1,2))
```

Wait, we still got an error in `math.d.ts`:
**File `math.d.ts` is not a module**

Why? Because `math.d.ts` does not contain any import/export statement. A `.ts` file is considered a module only if it contains at least one import/export statement.

``` diff
// math.d.ts
declare function add(a: number, b: number): number
```

From now on, we can use the function in TypeScript without any warnings or errors.

# `tsconfig.json` file
- A `tsconfig.json` file in the root of a directory indicates the directory is the root of a typescript project.
- Specifies root files and compiler options.

``` json
{
  "compilerOptions": {
    // module system for the program, e.g. commonjs for node.js project
    "module": "commonjs",
  },
  // specific files to include, does not support patterns as opposed to "include" property
  "files": [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts"
  ],
  // By default all @types packages are included. Packages in node_modules/@types of any enclosing folder are considered visible. 
  // If types is specified, only packages listed will be included in the global scope.
  "types": ["node", "jest", "express"],
  // If typeRoots is specified, only packages under typeRoots will be included. For example:
  "typeRoots": ["./typings", "./vendor/types"]
  // include/exclude: specifies an array of filenames and patterns to include/exclude in the program
  // ** matches any directory nested to any level
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["dist", "node_modules"]
}
```



# FAQ
## Question mark in typescript
Question mark has several uses in Typescript:
1. Optional properties
``` ts
interface FullName {
  first: string
  last: string
  mid?: string
}

function say({first, last, mid}: FullName): void {
  console.log(first + (mid || '') + last)
}

say({first: '陈', last: '洞天'})
```

2. null check
- It's rather tedious to check if a deep property of an object is null in Javascript.

``` js
function getRowName(data) {
  let name
  if (data && data.row) {
    name = data.row.name
  }
  return name
}
```

- In typescript, use `?.` to test

``` ts
function getRowName(data: any) {
  return data?.row?.name
}
```

## Index signature
- Sometimes name of a type's property is not known, but shape is known.
- In these cases, use **index signature** to describe types of possible values.

``` ts
interface FullName {
  [prop: string]: string
}

let obj: FullName = {
  first: '陈',
  last: '洞天',
  mid: false // this will give error as expected type is string
}
```

## @Types
After Typescript 2.0, Typescript will look into `./node_modules/@types` folder of a package to get module type definitions.