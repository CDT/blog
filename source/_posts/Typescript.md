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
4. [Typescript入门教程](https://ts.xcatliu.com/)
5. [Javascript class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
6. [Type Declarations](https://microsoft.github.io/TypeScript-New-Handbook/chapters/type-declarations/)

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

# Array

``` ts
let fibonacci: number[] = [1, 1, 2, 3, 5]

let fibonacci: number[] = [1, '1', 2, 3, 5];
// Type 'string' is not assignable to type 'number'.

fibonacci.push('8')
// Argument of type 'string' is not assignable
// to parameter of type 'number'.ts(2345)

// Generic type array:
let fibonacci: Array<number> = [1, 1, 2, 3, 5];

// Interface can also be used to represent an array:
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
// but it's so complex, rarely used except in Array-like object

function sum(a: number, b: number) {
  let args: number = arguments
}
// error: Type 'IArguments' is not assignable to type 'number'.ts(2322)
// arguments is an object array

function sum() {
  let args: {
      [index: number]: number;
      length: number;
      callee: Function;
  } = arguments;
} // args is Array-like object
```

# Function
``` ts
// Declare a function
let mySum = function(x: number, y: number): number {
  return x + y
}

// Declare a function with type predefined
// In Typescript, => is used to define the shape of a function
// left of => are argument types
// right of => is return value type
let mySum: (x: number, y: number) => number 
= function (x: number, y: number): number {
  return x + y;
};


// Shape a function with interface:
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}


// Use ? to mark an optional parameter
// Note optional parameters must be after required parameters
// No required parameter is allowed after optional parameter
const fullName = (first: string, last: string, middle?: string): string {
  if (middle) {
    return first + ' ' + middle + ' ' + last
  } else {
    return first + ' ' + last
  }
}
fullName('陈', '洞天')
fullName('陈', '洞', '天')


// Parameter default value
function buildName(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');


// Rest parameters
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
      array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);


// To reverse a number or string:
function reverseNS(x: number | string): number | string | void {
  if (typeof x === 'number') {
      return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
      return x.split('').reverse().join('');
  }
}
// However it's not obvious that 
// reverseNS returns a number when input is number
// and returns a string when input is string.
// Rewrite it with function overload:
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
console.log(reverse(123))
// It works and editor gives 'right' hint.
// It calls reverse(x: number | string): number | string | void
// but editor hints reverse(x: number): number
```

# Javascript class
- Javascript class is built on top of prototype.
- Javascript class is in fact 'special class'.

``` js
// Declare a class through class declaration:
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

// Declare a class through class expression:
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

console.log(Rectangle.name); // output: Rectangle



class Rectangle {
  // constructor is a special method for creating and initializing an object created with a class
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter. Getter method is used like a normal property.
  get area() {
    return this.calcArea();
  }

  // static members area called without instantiating their class and **cannot** be called through a class instance.
  // static methods are often used to create utility functions for an application
  // static properties are useful for caches, fixed-configuration, or other replicated data
  static shortName = 'Rect'
  static areaDiff(rect1, rect2) {
    return rect1.area - rect2.area
  }

  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square1 = new Rectangle(10, 10)

console.log(square1.area) // 100

console.log(square1.shortName) // undefined

console.log(Rectangle.shortName) // Rect

const square2 = new Rectangle(20, 20)

console.log(Rectangle.areaDiff(square2, square1)) // 300


// extends a class:
class DateNew extends Date {

  getAbbrMonth() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[this.getMonth()]
  }

}

console.log((new DateNew()).getAbbrMonth());
// expected output: "Aug" (current time 2022.8)
```

# Type assertion
``` ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof animal.swim === 'function') {
      return true;
  }
  return false;
}
// error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.
//   Property 'swim' does not exist on type 'Cat'.
// For union types, only property they have in common can be accessed


// To solve this, use type assertion:
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
      return true;
  }
  return false;
}
// type assertion Syntax: VALUE as TYPE


function swim(animal: Cat | Fish) {
  (animal as Fish).swim();
}
const tom: Cat = {
  name: 'Tom',
  run() { console.log('run') }
};
swim(tom);
// Above code is ok at compiling, but throws error at running:
// Uncaught TypeError: animal.swim is not a function`
// Type assertion may 'hide' errors, so use it with caution
// Only use type assertion when you are fully sure that the type is correct after assertion


interface ApiError extends Error {
  code: number;
}
interface HttpError extends Error {
  statusCode: number;
}

function isApiError(error: Error) {
  if (error instanceof ApiError) {
      return true;
  }
  return false;
}
// Editor check error: 'ApiError' only refers to a type, but is being used as a value here.ts(2693)
// cannot use instanceof on an Typescript interface, instanceof cannot be used on Javascript class

// To solve above problem, use type assertion:
interface ApiError extends Error {
    code: number;
}
interface HttpError extends Error {
    statusCode: number;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}


// COMPATIBLE interfaces: 
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

let tom: Cat = {
  name: 'Tom',
  run: () => { console.log('run') }
};
let animal: Animal = tom;

// Above code works well, no error is thrown.
// Although Cat and Animal are two distinct interfaces and no extends between them
// under the hood Typescript thinks Cat is descendant of Animal.
// Typescript only compares their shapes, so it is identical to Cat extends Animal.
// When two interfaces are COMPATIBLE, they can be asserted to each other.
// Father can be asserted to son and vice versa.

// A conclusion to type assertion

// 1. Union types can be asserted to one of them
// 2. Father/Son classes can be asserted to each other
// All types can be asserted to any and vice verse
// Compatible types can be asserted toeach other


// Type assertion only affects compilation
function toBoolean(something: any): boolean {
  return something as boolean;
}

toBoolean(1);
// Above code will be compiled to 
function toBoolean(something) {
  return something;
}

toBoolean(1);
// nothing is done on the return value.
// To transform a type, use type transformation:
function toBoolean(something: any): boolean {
  return Boolean(something); // Transforms to boolean
}

toBoolean(1);
```

# Type alias
- Type alias gives a type an alias.

``` ts
type str = string
let b:str = 'abc'
```

- `type` keyword can also type an enum.

``` ts
type Num123 = 1 | 2 | 3
type CharABC = 'a' | 'b' | 'c'
let c:Num123 = 4 // Error Type '4' is not assignable to type 'Num123'.ts(2322)
```

# Tuple
- Tuple combines different types.

```

```

# Triple-slash directives
- Triple-slash directives are single-line comments containing a single XML tag at the top of a file, instructing compiler to do certain preprocessing.
- Example: `<refrence path="..." />` include additional files in the compilation process. 
- **Not recommended** for best practice, [see why here](https://medium.com/swlh/typescript-best-practices-slash-directives-types-and-unbound-methods-993195e1faf)

# Declaration file
## An example
``` ts
const k = Math.max(5, 6); // k = 6
const j = Math.mix(7, 8); // Error: Property 'mix' does not exist on type 'Math'.

// Hover mouse over max and you'll get its shape and description: 
// (method) Math.max(...values: number[]): number
//    Returns the larger of a set of supplied numeric expressions.

@param values — Numeric expressions to be evaluated.
```

- How did Typescript know that `max` was present but `mix` wasn't?
- How did Typescript know the shape of `max`?

The answer is there are delcaration files describing these built-in functions. 

Ctrl click `Math.max` in VSCode and its jumps into a file:
``` ts
// path: [User directory]\AppData\Local\Programs\Microsoft VS Code\resources\app\extensions\node_modules\typescript\lib
// file: lib.es5.d.ts
/**
 * Returns the larger of a set of supplied numeric expressions.
 * @param values Numeric expressions to be evaluated.
 */
max(...values: number[]): number;
```

This is the declaration file for es5 in Typescript.

## Concepts
- A declaration file provides a way to declare the existence of some types or values without actually providing implementations for those values.
- Usually, a declaration file describe the shape of existing Javascript code, make them able to work in Typescript environment, enables typechecking and code completion and so on.
- Typescript mainly has two kinds of files:
  - `.ts` *implementation* files. Produce `.js` code and is where you normally write your code.
  - `.d.ts` *delcaration* files. Only contain type information. Don't produce `js` code, only used for typechecking.
- Built-in declaration files is named with pattern `lib.[name].d.ts`


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

### Writing Node.js with Typescript
- Node.js is not part of the built-in objects in Typescript. In order to write Node.js code with Typescript, import DefinitelyTyped Node.js @types files: ``` npm install @types/node --save-dev ```