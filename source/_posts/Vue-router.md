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
