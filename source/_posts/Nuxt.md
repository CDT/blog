---
title: Nuxt
date: 2022-09-21 11:32:56
cover: /images/nuxtlogo.png
thumbnail: /images/nuxtlogo.png
categories:
- tech
tags:
- tech
- vue
- nuxt
---

## Refs
1. [Nuxt JS](https://nuxtjs.org/)
2. [10 reasons to use Nuxt.js for your next web application](https://medium.com/vue-mastery/10-reasons-to-use-nuxt-js-for-your-next-web-application-522397c9366b#:~:text=It%20simplifies%20the%20development%20of,as%20a%20main%20project%20base.)
<!--more-->

## What and why
- Nuxt.js is a higher-level framework built on top of Vue.
- Nuxt.js simplifies the development of universal or single page Vue apps.

### Universal app sv SPA
- Universal app, aka SSR, server side rendering.
- SPA: A website or web appliaction that dynamically rewrites a current page with new data from server, instead of loading entire new paegs.
- Popular SPAs: Gmail, Google maps, Airbnb, Netflix, Pinterest, Paypal.
- A universal app is about having an SPA, but instead of having a blank `index.html` page, the application is preloaded on a web server and sending rendered HTML as the response.
- SPA does poorly on initial loading and SEO, as a lot of content has to be loaded at intial visit and `index.html` is blank which is hard to extract key information. Universal takes priority over SPA on initial loading speed and SEO.

### Ten reasons to use Nuxt
1. Create universal apps without the hassle
2. Statically render your Vue apps and get all of benefits of a universal app without a server
3. Get automatic code splitting (pre-rendered pages)
4. Setup via the command line with the starter template
5. Get great project structure by default
6. Easily set up transitions between your routes
7. Easily write Single File Components
8. Get ES6/ES7 compilation without any extra work
9. Get setup with an auto-updating server for easy development
10. Access to everything in the Nuxt.js community

## Create nuxt app

Use `create-nuxt-app` to quickly create nuxt app:

``` console
yarn create nuxt-app <project-name>
```

It will guide your intialization with a free questions.
Now cd into project directory, and run the project in dev mode: 

``` console
cd <project-name>
yarn add nuxt (Not mentioned in doc but seemingly necessary)
yarn dev
```

The project now runs in `localhost:3000`.

![Nuxt Vuetify Demo](/images/nuxtdemo.PNG)

By default nuxt only runs in `localhost`. To run nuxt in LAN, add this to `nuxt.config.js`: 

``` console
export default {

    // ... All your other settings are already here

    // You will need to add this:
    server: {
        host: '0.0.0.0',
        port: '3000' // optional
    }
}
```

## Routing

### Automatic routing

Nuxt supports automatic routing which is free from writing `vue-router` config file.
Create a `.vue` file in the `pages` directory of the project root folder and you can navigate to this file with the file name in the path.

For example:

``` js
// <project-folder>/pages/test.vue
<template>
    <h1>Test</h1>
  </template>
  
  <script>
  export default {
  }
  </script>
```

And at `localhost:3000/test` we get:

![Nuxt test path](/images/nuxt_test_path.png)


### Navigation

In nuxt, `<NuxtLink>` can be considered as equivalent to `<RouterLink>` in `vue-router`.
For example, `<NuxtLink to="/">Home</NuxtLink>`.

## Directory structure

- `pages` folder: Pages. Page can be directly accessed by file name in path, as mentioned in the routing section above. [Read more](https://nuxtjs.org/docs/directory-structure/pages/)
- `components` folder: Components which are imported into pages. Components can be used without explicit importing. [Read more](https://nuxtjs.org/docs/directory-structure/components/)
- `assets` folder: Assets such as your styles, images, or fonts. [Read more](https://nuxtjs.org/docs/directory-structure/assets/)
- `static` folder: Static files directly mapped to the server root and contains files that have to keep their names (e.g. robots.txt) or likely won't change (e.g. the favicon). Supports folder. [Read more](https://nuxtjs.org/docs/directory-structure/static)
- `nuxt.config.js`: The single point of configuration for Nuxt. [Read more](https://nuxtjs.org/docs/directory-structure/nuxt-config)


## Run and deploy
### Mode
Two modes for server target: 
- Universal: Default mode. Isomorphic application(SSR + client side navigation)
- SPA

Configure mode in `nuxt.config.js`:

``` js
export default {
    ...
    mode: 'universal', // default
    mode: 'spa' 
}
```

But now `mode` property is deprecated, use `ssr` property instead: 

``` js
export default {
    ...
    ssr: true, // equivalent to mode: "universal"
    ssr: false // equivalent to mode: "spa"
}
```

### Deployment targets

There are two deployment targets: `static` and `server`.

Set the deployement target in `nuxt.config.js`: 
``` js
export default {
    ...
    target: 'static', // static target
    target: 'server'  // server target, default
}
```

`server` deployment target means server hosting while `static` means static hosting.

Static hosting means the whole app are just immutable static files.

Running `nuxt dev` with the static target will apply the following(TODO what exactly do these mean ?):
1. Remove `req` & `res` from `context`
2. Fallback to client-side rendering on 404, errors and redirects [see SPA fallback](https://nuxtjs.org/docs/concepts/static-site-generation/#spa-fallback)
3. `$route.query` will always be equal to `{}` on server-side rendering
4. `process.static` is true


Server hosting:
- Run nuxt on a node.js server.
- SSR mode
- Required if using [serverMiddleWare](https://www.nuxtjs.cn/guides/configuration-glossary/configuration-servermiddleware).

If the project is a pure frontend project, then `static` is preferred.

### Modes and targets combined
[Read this](https://stackoverflow.com/questions/63336570/whats-the-real-difference-between-target-static-and-target-server-in-nuxt)

![Mode and target combinations](/images/modeandtarget.png)

[Further reading on modes and targets in nuxt](https://kontent.ai/blog/demystify-nuxt-target-mode-and-ssr-properties/)

### Commands

#### target: server
- `yarn dev` or `nuxt dev` or `nuxt`: Launch development server.
- `yarn build` or `nuxt build`: Build application. Server files are generated in `.nuxt` folder and client files in `dist` folder.
- `yarn start`: Start production server, given that app is built with `yarn build`.

#### target: static
- `yarn dev` or `nuxt dev` or `nuxt`: Launch development server.
- `yarn generate` or `nuxt generate`: Generate static files for hosting. File will be generated in `dist` folder.
- `yarn start`: Serve static files in `dist` folder.