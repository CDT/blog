---
title: Visual Studio Debugging
date: 2022-09-10 14:27:07
cover: /images/vscode.svg
thumbnail: /images/vscode.svg
categories:
- tech
tags:
- tech
- vscode
- debug
---
## Refs
1. [How to debug typescript with VS Code](https://pkief.medium.com/how-to-debug-typescript-with-vs-code-9cec93b4ae56)
<!--more-->
## Debugging Node.js App
``` json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-node",
      "request": "launch",
      "runtimeExecutable": "nodemon",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "console": "integratedTerminal",
      "program": "${workspaceFolder}\\proxy.js"
    }
  ]
}

// If running parameters are required like this：$ python main.py --verbose --name Test:
// add "args" property:
"args": ["--verbose", "--name=Test"]
```

## Debugging Typescript
### Example project
```
.
├ .vscode
   ├ launch.json # Debugger launch configuration file
├ app.ts
├ package.json
├ tsconfig.json 
  
```

``` json
// launch.json
{
  "version": "0.2.0",
  "configurations": [
      {
          "type": "node",
          "request": "launch",
          "name": "Build Project",
          "program": "${workspaceFolder}\\app.ts", // Entry file of the app
          "preLaunchTask": "npm: build", // Task before launching debug. Calls `build` script of package.json
          "sourceMaps": true, // use sourcemaps from `out` folder
          "smartStep": true, // skip “uninteresting” code in the debugger (e.g. compiled JS-files)
          "internalConsoleOptions": "openOnSessionStart", // open the debug console during a debugging session
          "outFiles": [
              "${workspaceFolder}/out/**/*.js" // place where the debugger looks for the sourceMap files
          ]
      }
  ]
}
```

``` ts
// app.ts
const a:string = 'Hello'
const b:number = 42

console.log(a + b)
```

``` json
// package.json
{
  "name": "mytask",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc"
  }
}
```

``` json
// tsconfig.json
{
  "compilerOptions": {
      "outDir": "./out",
      "rootDir": "./",
      "sourceMap": true, // It is important to set the sourceMap-property to true. Sourcemap files are required to map the TypeScript code to the JavaScript code in the debugger later.
      "moduleResolution": "node",
      "target": "es5"
  }
}
```
