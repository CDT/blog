---
title: Vue router
date: 2022-09-01 16:51:29
cover: /images/vue-router.png
thumbnail: /images/vue-router.png
categories:
- tech
tags:
- tech
- vue
- vue 3
- vue router
---
**(THIS BLOG IS STILL IN PROGRESS)**
## Refs
1. [Vue Router](https://router.vuejs.org/)
<!--more-->
## Basic example

``` js
// 1. Define route components.
// These can be imported from other files
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = Vue.createApp({})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')

// Now the app has started!
```

## Router Options

``` js
createRouter({
  // History implementation. Most cases should use 'createWebHistory' but requires the server to be property configured.
  // Use a hash based history with 'createWebHashHistory' requires no configuration but will be ignored by search engine and does poorly on SEO.
  history: createWebHistory(),
  // Whether to disallow a trailing slash.
  strict: true,
  // readonly routes
  routes,
  // Function to control scrolling when navigating between pages. Can return a Promise to delay scrolling.
  // When using client-side routing, we may want to scroll to top when navigating to a new route, or preserve scrolling position of history entries just like real page reload does.
  scrollBehavior: () => ({ left: 0, top: 0 })
})
```

## Router map
- Router map maps paths to route objects.
- Usually divided into constant router map and async router map. Constant router map requires authorization and async router map doesn't.

## FAQ
### Access router object
- Options API(Vue 2):

``` js
// Home.vue
export default {
  methods: {
    goToDashboard () {
      if (isAuthenticated) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
```

- Composition API(Vue 3):

``` js
<script setup>
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    function pushWithQuery(query) {
      router.push({
        name: 'search',
        query: {
          ...route.query,
        },
      })
    }
  },
}
</script>
```
