---
title: Vite
date: 2022-09-07 14:59:58
cover: /images/vite.jpg
thumbnail: /images/vite.jpg
categories:
- tech
tags:
- tech
- vue
- vue 3
- vite
---

## Refs
1. [Vite - Getting Started](https://vitejs.dev/guide/)
2. [Why Vite?](https://vitejs.dev/guide/why.html)
3. [Configuring Vite](https://vitejs.dev/config/#config-intellisense)
4. [Modes](https://vitejs.dev/guide/env-and-mode.html#modes)
5. [Dependency Pre-Bundling](https://vitejs.dev/guide/dep-pre-bundling.html)

## What is vite ?
- Vite is a modern web project build tool, consists of two major parts:
 - A dev server that provides **rich feature enhancements** over **native ES modules**, for example super fast **HMR**.
 - A build command that bundles your code with **Rollup**, pre-configured to output high optimized static assets for production.
- Vite is highly extensible via its [Plugin API](https://vitejs.dev/guide/api-plugin.html) and [Javascript API](https://vitejs.dev/guide/api-javascript.html) with full typing support.

## Why Vite ?


## Vite commands

|Command|Description|
|:-----:|:-----|
|`vite`| Start dev server with HMR, aliases: `vite dev`, `vite serve`. |
|`vite build`| Build for production, files are output to `./dist`. |
|`vite preview` | Locally preview production build, start a local web server serving built app from `./dist`. |

## Modes
Dev server runs `dev`(default) in `development` mode and runs `build` in `production` mode, which means `dev` reads variables from `.env.dev` and `build` reads variables from `.env.production`.

Example:

```
VITE_APP_TITLE=My App
```

In the app, render title with `import.meta.env.VITE_APP_TITLE`.


## Configuring Vite
When running vite from the command line, Vite will automatically try to resolve a config file named `vite.config.js` inside project root.

``` js
// vite.config.js
export default {
  base: '/',  // basic public path when served in dev or production, for example '/foo/'
  plugins: [
    Vue(),
    VueJsx()
    // Array of plugins to use.
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '$injectedColor: orange;'
      } // Speicify options to pass to CSS pre-processors.
    }
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts'], // 导入模块时想要省略的扩展名，例如import './mod'会尝试导入'./mod.mjs', './mod.js', './mod.ts'
    alias: [
      // Resolves path aliases to full path.
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
      },
      {
        find: /\@\//,
        replacement: `${pathResolve('src')}/`
      }
    ]
  },
  build: {
    minify: 'terser', // boolean | 'terser' | 'esbuild'. Defaults to 'esbuild' which is 20~40 times faster than terser and only 1~2% worse compression. Set to false to disable minification.
  },
  server: {
    port: 4000, // Server port, note that if being used, Vite will try the next port.
  },
  optimizeDeps: { // Read: https://vitejs.dev/guide/dep-pre-bundling.html
    include: [ // By default, linked packages not inside node_modules are not pre-bundled. Use this option to force a linked package to be pre-bundled.
      'vue',
      'vue-router'
    ]
  }
}
```

If config needs to conditionally determine options based on the mode, or if it is an SSR build (ssrBuild), export a function instead: 

``` js
export default defineConfig( ({command, mode, ssrBuild}) => {
  if (command === 'serve') {
    return {
      // dev config
    }
  } else if (command === 'build') {
    return {
      // build config
    }
  } else {
    // ...
  }

})
```
