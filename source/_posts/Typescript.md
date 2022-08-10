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
9. [Typescript入门教程](https://ts.xcatliu.com/)

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

# Types

``` ts
// Primitive types:
let isDone: boolean = false
let decimal: number = 6
let myName: string = 'Tom'
// void can only be assigned undefined or null
let useless1: void = undefined
let useless2: void = null
// null and undefined can also be used to define types
// they can be assigned interchangeably
let useless3: undefined = null
let useless4: null = undefined
// difference between null/undefined and void is that any type can assign its value to null/undefined but not void
// the following is ok:
let num1: number = undefined
let u1: undefined
let num2: number = u1
// but this is not ok: ts2322 - Type void is not assignable to type number
let u2: void = undefined
let num3: number = u2 



// Any type:
// normal types cannot change its type:
let myFavoriteNumber1: string = 'seven';
myFavoriteNumber1 = 7; // ts2322 - Type number is not assignable to type string
// any type can be assgined to another type
let myFavoriteNumber2: any = 'seven'
myFavoriteNumber2 = 7;
// if a variable is not assigned to a type, it will implicitly be assigned to any type
let something // ts-7043: Variable 'something' implicitly has an 'any' type, but a better type may be inferred from usage.
something = 'seven'
something = 7
something.setName('Tom')
```

# Type inference
``` ts
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// Type 'number' is not assignable to type 'string'.ts(2322)

// Above code is equivalent to:
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;
// Typescript tries to infer a type when no type is specified

// If not initialized, variable will be inferred as any type
let myFavoriteNumber
myFavoriteNumber = 'seven'
myFavoriteNumber = 7
```

# Union Types
``` ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// above is ok


myFavoriteNumber = true;
// error TS2322: Type 'boolean' is not assignable to type 'string | number'.


function getLength(something: string | number): number {
  return something.length;
}
// error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
// Only property owned by all types in a union type can be accessed.


let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
console.log(myFavoriteNumber.length) // This works well
myFavoriteNumber = 7
console.log(myFavoriteNumber.length) // This will throw an error:
// error TS2339: Property 'length' does not exist on type 'number'.
// Type of a union type will be inferred after assigning a value.
```

# Interface
``` ts
interface Person {
  name: string,
  age: number
}

let tom: Person = {
  name: 'Tom',
  age: 25
}

let jack: Person = {
  name: 'Jack'
}
// Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.ts(2741)
// test.ts(3, 3): 'age' is declared here.
// variable declared must have all properties assigned

let john: Person = {
  name: 'John',
  age: 31,
  sex: 'male'
}
// Type '{ name: string; age: number; sex: string; }' is not assignable to type 'Person'.
// Object literal may only specify known properties, and 'sex' does not exist in type 'Person'.ts(2322)
// variable also cannot have additional properties

interface Human {
  name: string,
  age?: number
}
// Question mark in a interface property means it's optional
let jane: Human = {
  name: 'Jane'
}
// jane is ok
let joe: Human = {
  name: 'Joe',
  sex: 'female'
}
// Type '{ name: string; sex: string; }' is not assignable to type 'Human'.
// Object literal may only specify known properties, and 'sex' does not exist in type 'Human'.ts(2322)
// still no additional property allowed
```

``` ts
interface Person {
  name: string,
  age?: number,
  [propName: string]: string
}
// [propName: string]: any means any whatever property name is allowed with string value
let tom: Person = {
  name: 'Tom',
  sex: 'male', // this property is ok
  birthdate: new Date() // this won't work: 
  // Type 'Date' is not assignable to type 'string'.ts(2322)
  // test.ts(4, 3): The expected type comes from this index signature.
}


// Union types can also be used
interface Human {
  name: string;
  age?: number;
  [propName: string]: string | number;
}

let tom: Human = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};


// Make property readonly:
interface Man {
  readonly id: number,
  name: string
}

let tom1: Man = {
  id: 89757,
  name: 'Tom'
};

tom1.id = 9527;
// error: Cannot assign to 'id' because it is a read-only property.ts(2540)
```


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

``` ts
// math.d.ts
export declare function add(a: number, b: number): number
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

# Declaration Merging
- Declaration merging merges two or more separate declarations with same name into a single definition.

## Merging interfaces

- Merging properties:

``` ts
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
}
let box: Box = { height: 5, width: 6, scale: 10 };
```

- Merging functions: each function member of the same name is treated as describing an overload of the same function.

``` ts
interface Cloner {
  clone(animal: Animal): Animal;
}
interface Cloner {
  clone(animal: Sheep): Sheep;
}
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}
// the above will give:
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
```

## 


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

## @Types
After Typescript 2.0, Typescript will look into `./node_modules/@types` folder of a package to get module type definitions.