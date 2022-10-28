---
title: Adding auth to nuxt
cover: /images/nuxtauth.png
thumbnail: /images/nuxtauth.png
date: 2022-10-24 08:03:48
categories:
- tech
tags:
- tech
- nuxt
- auth
---

## Ref
1. [Nuxt auth](https://auth.nuxtjs.org/)
<!--more-->

## Setup
1. Add `nuxt-auth` and `axios`:

``` console
yarn add --exact @nuxtjs/auth-next
yarn add @nuxtjs/axios
```

2. Config `nuxt.config.js`:

``` js
{
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  auth: {
    // Options
  }
}
```

3. If using Typescript, add `@nuxtjs/auth-next` to `tsconfig.json`:

``` json
{
  compilerOptions: {
    "types": [
      "@nuxtjs/auth-next",
    ]
  },
}
```

4. Add auth to route:

- Per route, add to `.vue` file for a page:

``` js
export default {
  middleware: 'auth'
}
```

- Global, add to `nuxt.config.js`:

``` js
router: {
  middleware: ['auth']
}
```

To bypass auth for some route, add to `.vue` file for a page:

``` js
export default {
  auth: false
}
```

To redirect to `/` instead of stay in the url after a successful login, add this to `.vue` for a page:

``` js
export default {
  auth: 'guest'
}
```

3. Scheme

- Schemes define authentication logic. 
- Strategy is a scheme instance.
- Multiple strategies can be applied to a nuxt app.

Here's the config for `local` and `github` strategy in `nuxt.config.js`:

``` js
auth: {
  strategies: {
    local: { /* ... */ },
    github: { /* ... */ },
  }
}
```

Here we only consider local scheme.

- Local scheme is crendentials/token based for flows like 'JWT'.
- Local scheme is enabled, preconfigured and default. Can be turned off by setting `strategies.local: false`.

Config in `nuxt.config.js`:

``` js
auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: { url: '/login', method: 'post'},
          // logout: { url: '/api/auth/logut', method: 'post' },
          logout: false, // set it to false to disable logout and just do it locally.
          user: { url: '/me', method: 'get' }
        }
      }
    }
  }
```

Next, add `index.js` in `store` folder [to activate vuex store](https://nuxtjs.org/docs/directory-structure/store/).

