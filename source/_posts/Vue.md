---
title: Vue
date: 2022-06-27 11:52:03
cover: /images/vue2.svg
thumbnail: /images/vue2.svg
toc: true
categories:
- tech
tags:
- tech
- vue
- vue3
- vue2
---
## Vue 3
### Refs
1. [Composition API - An animated explanation](https://juejin.cn/post/6890545920883032071)
2. [Vue2 to Vue3 — What’s changed?](https://medium.com/emblatech/vue2-to-vue3-whats-changed-5572514da20d#:~:text=Vue3%20was%20officially%20release%20in,and%20Vue3%20are%20very%20similar.)
3. [Why vite ?](https://vitejs.dev/guide/why.html)
4. [A definitive guide to Vue 3 components](https://blog.logrocket.com/definitive-guide-vue-3-components/#vue-3-createapp)
5. [ViteJS](https://vitejs.dev/guide/why.html)
6. [What is the difference between "vite" and "vite preview"?](https://stackoverflow.com/questions/71703933/what-is-the-difference-between-vite-and-vite-preview#:~:text=Vite%20is%20a%20build%20tool,in%20a%20production%2Dlike%20environment.)

<!--more-->

### Vue 3 VS Vue 2
#### **Composition API** vs **Options API**
![Composition API vs Options API](/images/composition_vs_options.png)
Options API is **function concerned**.
Composition API is **logic concerned**.
For complex components, code of same logic may be scattered in `props`, `data`, `methods`, `mounted`, which makes it hard to maintain. So in Vue 3, **Composition API** is introduced, code of same logic is put together in `setup`.
See [which to choose](https://vuejs.org/guide/introduction.html#which-to-choose).

#### createApp vs vue instance

In Vue 2, we mount a `App.vue` instance to `#app`:
``` js
new Vue({
  store, router, render: h => h(App)
}).$mount('#app')
```

In Vue 3, we `createApp` from a `App.vue` and mount to `#app`:
``` js
createApp(App).use(store).use(router).mount('#app')
```

#### Why use `createApp` over `new Vue` ?

In Vue 2, any directives created using `Vue` object will be usable by all application instances. This becomes a problem when our web app has multiple Vue application instances but we want to limit certain functionality to specific instances.
``` js
// The only way to create a directive in Vue 2
Vue.directive('directive', {
    // ...
});

// Both of the application instances can access the directive
const appOne = new Vue(App1).mount('#app1');
const appTwo = new Vue(App2).mount('#app2');
```

Vue 3 solves this problem by creating directives on `app` instance instead of `Vue` object:
``` js
// Both of the application instances can access the directive
const appOne = Vue.createApp(App1);
appOne.directive('directive', {
    // only availalble "appOne" instance */
});
appOne.mount('#app1');

const appTwo = Vue.createApp(App2);
appTwo.directive('directive', {
    // only availalble to "appTwo"
});
appTwo.mount('#app2');
```

### Vite
Vue 3's scaffolding tool migrated from `vue-cli` to 'create-vue', which is based on `vite` and has a much faster building speed than `webpack`. See [why vite is much faster](https://vitejs.dev/guide/why.html)

For more information about vite, check out my post named `Vite` on this blog.

### Vue 3 features
#### Composition API
- Difference with `Options API` already explained above.
- Use `<script setup>` or `<script>setup()` to indicate Composition API. Difference between `<script setup>` and `<script>setup()` is that no `return` is required in `<script setup>` to pass objects to template.
- A typical `<script setup>` SFC(Single File Component) goes here:
![script_setup_SFC](/images/script_setup_SFC.PNG)

### FAQ
#### ref() vs reactive()
- reference: 
[ref vs reactive in Vue 3](https://stackoverflow.com/questions/61452458/ref-vs-reactive-in-vue-3)
[Reactivity Core](https://vuejs.org/api/reactivity-core.html)

- Usage
**ref**: Returns a deep reactive mutable object, point to inner value with .value. If an object assigned, reactive() is called. Use `shallowRef()` to avoid deep conversion.
**reactive**: Returns a deep reactive proxy of the object.

- Example

**ref**:
``` js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

**reactive**:
``` js
const obj = reactive({ count: 0 })
obj.count++
```

#### Key Points

* `reactive()` only takes objects, **NOT** JS primitives
* `ref()` is calling `reactive()` behind the scenes, objects work for both
* BUT, `ref()` has a `.value` property for reassigning, `reactive()` does not have this and therefore CANNOT be reassigned

#### Use

`ref()` when..

- it's a primitive
- it's an object you need to later reassign (like an array - [more info here](https://github.com/vuejs/docs-next/issues/801#issuecomment-757587022))

`reactive()` when..

- it's an object you don't need to reassign, and you want to avoid the overhead of `ref()`

#### In Summary

`ref()` seems like the way to go since it supports all object types and allows reassigning with `.value`. `ref()` is a good place to start, but as you get used to the API, know that `reactive()` has less overhead, and you may find it better meets your needs.

#### `ref()` Use-Case

You'll always use `ref()` for primitives, but `ref()` is good for objects that need to be reassigned, like an array.

``` js
setup() {
    const blogPosts = ref([]);
    return { blogPosts };
}
getBlogPosts() {
    this.blogPosts.value = await fetchBlogPosts();
}
```
The above with `reactive()` would require reassigning a property instead of the whole object.
``` js
setup() {
    const blog = reactive({ posts: [] });
    return { blog };
}
getBlogPosts() {
    this.blog.posts = await fetchBlogPosts();
}
```

#### `reactive()` Use-Case

A good use-case for `reactive()` is a group of primitives that belong together:

``` js
const person = reactive({
  name: 'Albert',
  age: 30,
  isNinja: true,
});
```
the code above feels more logical than
``` js
const name = ref('Albert');
const age = ref(30);
const isNinja = ref(true);
```

#### Useful Links

If you're still lost, this simple guide helped me: https://www.danvega.dev/blog/2020/02/12/vue3-ref-vs-reactive/

An argument for only ever using `ref()`: https://dev.to/ycmjason/thought-on-vue-3-composition-api-reactive-considered-harmful-j8c

The decision-making behind why `reactive()` and `ref()` exist as they do and other great information, the Vue Composition API RFC: https://vuejs.org/guide/extras/composition-api-faq.html#why-composition-api


### ref unwrap
reference: 
[Reactivity Core](https://vuejs.org/api/reactivity-core.html)

### Vue Cli Plugins and Presets
reference: [Plugins and Presets](https://cli.vuejs.org/guide/plugins-and-presets.html)

- What are plugins ?
Plugins modify the internal webpack configuration and inject commands to vue-cli-service.

Most of the features listed during the project creation process are implemented as plugins.

If you inspect a newly created project's package.json, you will find dependencies that start with `@vue/cli-plugin-`. These are plugins.

- Add a plugin to an existing project
Use `vue add [plugin name]` to add a plugin to an existing project.
For example, use `vue add eslint` to add `eslint` linter to the project.

- What is a Vue Cli preset ?
A JSON object that contains pre-defined options and plugins for creating a new project.

Example: 
``` js
{
  "useConfigFiles": true,
  "cssPreprocessor": "sass",
  "plugins": {
    "@vue/cli-plugin-babel": {},
    "@vue/cli-plugin-eslint": {
      "config": "airbnb",
      "lintOn": ["save", "commit"]
    },
    "@vue/cli-plugin-router": {},
    "@vue/cli-plugin-vuex": {}
  }
}
```

### How to get query string in vue 3 ?
- In vue 2, we got `this.$route.query` to get query string.
- In vue 3, first `import { useRoute } from 'vue-router'`, then `useRoute().query` to get query string.

### Useful commands
- Use `vue ui` to start a ui interface inside a project created by `vue-cli`.
- Use `vue add typescript` to add typescript plugin to a vue-cli project and transform it to a typescript project.


## Vue Component Communication
[Ref](https://medium.com/js-dojo/component-communication-in-vue-js-ca8b591d7efa)

Component communication has three forms:
1. Parent -> Child
2. Child -> Parent
3. Global

- Parent send messages to child through props. Any change to prop is reflected immediately. Prop is immutable in child so vice versa not viable. This is a one-way communication.
- Child `this.$emit('event-name', p1, p2)`, parent receive the event through `<child @event-name='handler' />`
- Global communication can be done in two ways:
  - A: `this.$root.$emit('event-name', p1, p2)` B: `this.$root.$on('event-name', (p1, p2) => {})`
  - Use [vue-events](https://www.npmjs.com/package/vue-events). A: `this.$events.$emit('event', p1, p2)` B: `this.$events.$on('event', (p1, p2) => {})`

<script src="https://gist.github.com/CDT/deb1f223866b45c5fd64bfb7acc11c4f.js"></script>

### Pitfalls

- Using `this.$root.$emit/$on`, be careful not to call `$on` multiple times with the same handler, this will cause the handler to be bound multiple times on the same event. Use `$off` to unbind at appropriate time.
  - Example: A component binds a handler to an event in the `mount` hook. When the component is destroyed, the handler is still bound to that event. If the component is created repeatedly, this will also cause the handler to be bound repeatedly on the same event.
  - This also applies to `vue-events`

## Vue 2

### Watch

- Trigger a function whenever a reactive property it depends changes:

``` js
new Vue({
  data: {
    message: 'Hello, world!'
  },
  watch: {
    message (newValue, oldValue) {
      console.log('The message changed from', oldValue, 'to', newValue)
    }
  }
})
```

- **immediate** property:
  - [Eager watchers](https://vuejs.org/guide/essentials/watchers.html#eager-watchers)
  - Will be called on data initialization
  ```js
  new Vue({
    data: {
      count: 0
    },
    watch: {
      count: {
        handler(newValue, oldValue) {
          console.log(`count changed from ${oldValue} to ${newValue}`)
        },
        immediate: true
      }
    }
  })
  ```
  - The output will be `count changed from undefined to 0`.

## Vue reactivity

### Object

- Existing object properties are reactive
- New properties added on the fly:
  - `this.obj.newProp = 10` will not add a reactive `newProp` to `obj`
  - `Vue.set(this.obj, 'newProp', 10)` or `this.$set(this.obj, 'newProp', 10)` will add a reactive `newProp` to `this.obj`
  - Once the new property is added using `Vue.set` or `this.$set`，subsequent assignment operations no long need to use `Vue.set` or `this.$set`, just use normal assignment operation like `this.obj.newProp = 11`.

``` html
<template>
  <div>
    <div>{{ obj.m }}</div>
    <div>{{ obj.n }}</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    obj: {
      m: 10,
    },
  }),
  mounted() {
    setTimeout(() => {
      //this.obj.m = 11 
      //this.obj.n = 12
      // Only this.obj.n = 12 will not trigger update on the page
      // Two statements combined will trigger an update on the page bu subsequent changes on n will not trigger updates
      this.$set(this.obj, "n", 12)
    }, 1000);
    setTimeout(() => {
      this.obj.n = 13 // Will trigger update as this.$set(this.obj, "n", 12) has made property n reactive.
    }, 2000);
  },
};
</script>
```

### Array

- [Array change detection](https://v2.vuejs.org/v2/guide/list.html#Array-Change-Detection)

- Array change using methods like `push/pop` will be detected. Changes on array items will not be detected.


## Vue Plugin

- Plugin use case: global methods/properties/assets(directives/filters/transitions)/mixin/Vue instance/library

### Vue 2 

[Reference](https://v2.vuejs.org/v2/guide/plugins.html)

``` js
// main.js
Vue.use(MyPlugin, { someOption: true }) // calls MyPlugin.install

new Vue({
  //... options
})
```

``` js
// MyPlugin.js
export default {
  install: (Vue, options) {
    // 1. add global method or property
    Vue.myGlobalMethod = function () {
      // some logic ...
    }

    // 2. add a global asset
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // some logic ...
      }
      ...
    })

    // 3. inject some component options
    Vue.mixin({
      created: function () {
        // some logic ...
      }
      ...
    })

    // 4. add an instance method
    Vue.prototype.$myMethod = function (methodOptions) {
      // some logic ...
    }
  }
}
```


### Vue 3

[Ref](https://vuejs.org/guide/reusability/plugins.html)

``` html
<h1>{{ $translate('greetings.hello') }}</h1>
```

``` js
// main.js
import { createApp } from 'vue'
import i18nPlugin from './plugins/i18n'

const app = createApp({})

app.use(i18nPlugin, {
  greetings: {
    hello: 'Bonjour!'
  }
})
```

``` js
// plugins/i18n.js
export default {
  install: (app, options) => {
    // inject a globally available $translate() method
    app.config.globalProperties.$translate = (key) => {
      // retrieve a nested property in `options`
      // using `key` as the path
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  }
}
```


## Vuex

- A global state manage with reactive props.
- Note:
  - Do not change props directly. Commit mutations otherwise changes will not be seen.

### Vuex workflow

![Vuex workflow](/images/vuex.png)

### State

- Map `state` in `computed`.

``` js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 100
  }
})
```

``` html
<!-- component.vue -->
<script>
export default {
// 1. map with count
computed: {
  count () {
    return this.$store.state.count
  }
}
// 2. map with mapState
computed: mapState({
  // arrow functions can make the code very succinct!
  count: state => state.count,
  // passing the string value 'count' is same as `state => state.count`
  countAlias: 'count',
  // to access local state with `this`, a normal function must be used
  countPlusLocalState (state) {
    return state.count + this.localCount
  }
})
// 3. mapState and name short
computed: mapState([
  // map this.count to store.state.count
  'count'
])  
  
// 4. mapState and local count methods merged
computed: {
  localCount () {},
  ...mapState([
    // map this.count to store.state.count
    'count'
  ])
}
}
</script>
```

### Getters

- `getters` is a computed property for global state.
- `getters` are called without brackets.
- `getters` are also mapped in `computed`.

``` js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 100,
    todos: [
      { id: 1, text: 'Todo 1', done: true },
      { id: 2, text: 'Todo 2', done: false }
    ]
  },
  getters: {
    doneTodos: (state) => state.todos.filter(todo => todo.done),
    doneTodosLength: (state, getters) => getters.doneTodos.length,
    // method style getter:
    getTodoById: (state) => id => state.todos.find(todo => todo.id == id)
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```

``` html
<!-- component.vue -->
<template>
  <div id="app">
    <p>{{ $store.getters.doneTodos }}</p>
    <p>{{ $store.getters.doneTodosLength }}</p>
    <p>{{ doneTodos1 }}</p>
    <p>{{ $store.getters.getTodoById(2) }}</p>
    <p>{{ doneTodos }}</p>
    <p>{{ doneTodosLength }}</p>
    <p>{{ doneCount }}</p>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      localCount: 1
    }
  },
  computed: {
    doneTodos1 () {
      return this.$store.getters.doneTodos
    },
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'doneTodos',
      'doneTodosLength'
    ]),
    ...mapGetters({
      // map with a different name
      doneCount: 'doneTodosLength'
    })
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### Mutations

- Mutation is the **only** way to change state.
- Mutation must be synchronous.

If we have a mutation like this:

``` js
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

Now imagine we are debugging the app and looking at the devtool's mutation logs. For every mutation logged, the devtool will need to capture a "before" and "after" snapshots of the state. However, the asynchronous callback inside the example mutation above makes that impossible: the callback is not called yet when the mutation is committed, and there's no way for the devtool to know when the callback will actually be called - any state mutation performed in the callback is essentially un-trackable!

- Mutations are mapped in methods.

``` js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // map `this.increment()` to `this.$store.commit('increment')`

      // `mapMutations` also supports payloads:
      'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // map `this.add()` to `this.$store.commit('increment')`
    })
  }
}
```

### Actions

- `actions` do not mutate state directly, they only commit `mutations`.
- `actions` can be asynchronous.
- `actions` are mapped in methods.

``` js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
    increment1 (state, payload) {
      state.count += payload.amount
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    // simpler:
    increment1 ({ commit }) {
      commit('increment')
    },
    // with async
    increment2 ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)  
    },
    // with payload
    increment3 ({ commit }, payload) {
      commit('increment1', payload)
    }
  }
})


// more pratical example:
actions: {
  checkout ({ commit, state }, products) {
    // save the items currently in the cart
    const savedCartItems = [...state.cart.added]
    // send out checkout request, and optimistically
    // clear the cart
    commit(types.CHECKOUT_REQUEST)
    // the shop API accepts a success callback and a failure callback
    shop.buyProducts(
      products,
      // handle success
      () => commit(types.CHECKOUT_SUCCESS),
      // handle failure
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}

actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}

store.dispatch('actionA').then(() => {
  // ...
})

// action calls action
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}

// assuming `getData()` and `getOtherData()` return Promises

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // wait for `actionA` to finish
    commit('gotOtherData', await getOtherData())
  }
}
```

``` html
<!-- component -->

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    increment () {
      this.$store.dispatch('increment')
      // dispatch with a payload
      this.$store.dispatch('increment3', {
        amount: 10
      })

      // dispatch with an object
      this.$store.dispatch({
        type: 'incrementAsync',
        amount: 10
      })
    },
    ...mapActions(['increment']),
    
    ...mapActions({add: 'increment'})
  },
  mounted () {
    this.$store.dispatch('increment3', {
      amount: 10
    })
    this.add()
  }
}
</script>
```

### Modules

``` js
// typical mutli module
const moduleA = {
  state: () => ({ /*...*/ }),
  mutations: { /*...*/ },
  actions: { /*...*/ },
  getters: { /*...*/ }
}

const moduleB = {
  state: () => ({ /*...*/ }),
  mutations: { /*...*/ },
  actions: { /*...*/ }
}

store.state.a // -> `moduleA`'s state
store.state.b // -> `moduleB`'s state

export default new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

- Access root state in module:

``` js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
  state: () => ({ count: 20 }),
  mutations: {
    increment (state) {
      // state is moduleA's local state
      state.count++
      console.log(this.state.rootCount)
      // this refers to global store and this.state.count points to global state count
    }
  },
  actions: {
    incrementByRootCount ({ state, commit, rootState}) {
      if (rootState.count > state.count) {
        commit('sumWithRootCount')
      }
    }
  },
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}

const moduleB = {
  state: () => ({ /*...*/ }),
  mutations: { /*...*/ },
  actions: { /*...*/ }
}

export default new Vuex.Store({
  state: {
    rootCount: 10
  },
  modules: {
    a: moduleA,
    b: moduleB
  }
})
// store.state.a -> `moduleA`'s state
// store.state.b -> `moduleB`'s state
```

- By default, actions, mutations and getters are all registered under global scope. Calling them may call all the same named correspondent in modules. Be careful not to have same name.
- Namespacing is introduced to avoid naming conflicts.

``` js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    countRoot: 200
  },
  modules: {
    modA: {
      namespaced: true,
      state: {
        countA: 100
        // state is already namespaced and not affected.
        // store.state.modA.countA
      },
      getters: {
        isCountAPositive (state, getters, rootState, rootGetters) {
          console.log(rootState.countRoot)
          return state.countA > 0
          // getters refers to modA's local getters
          // rootState and rootGetters refers to root state and getters
          // store.getters['modA/isCountAPositive']
        }
      },
      actions: {
        addAsyncA ({ dispatch, commit, getters, rootGetters }) {
          setTimeout(() => { commit('addA') }, 1000)
          // $store.dispatch('modA/addAsyncA') in vue component
          // dispatch('someAction') dispatches module action by default
          // dispatch('someAction', null, {root: true}) to dispatch a root action
          // commit('mutation') to commit a module mutation
          // commit('mutation', null, {root: true}) to commit a root mutation
        }
      },
      mutations: {
        addA (state) {
          state.countA++
        }
        // ccommit('modA/addA')
      },
      modules: {
        // here goes nested modules
        nestedA: {
          // if not namespaced, nested modules share namespace with parent
          // if namespaced, add nested module namespace name in the same pattern
          // like getters['modA/nestedA/getterName']
          /* ... */
        }
      }
    },
    
  }
})
```

### Two-way binding

``` html
<script>
export default {
  computed: {
    name: {
      get() {
        return this.$store.state.form.name;
      },
      set(value) {
        this.$store.commit('updateName', value);
      },
    },
  }
};
</script>
```



## Others

### Add global property to Vue instance

``` js
// Vue 2
Vue.prototype.$http = axios.create({ /* ... */ })
// Vue 3
app.config.globalProperties.$http = axios.create({ /* ... */ })
```

### Global css

In `main.js` file: `import './assets/css/main.css'`

### Scoped css

[Ref](https://vue-loader.vuejs.org/guide/scoped-css.html)

By default, styles wrapped by `<style>` tags are global.

When a `<style>` tag has the `scoped` attribute, its CSS will apply to elements of the current component only.

It works by adding a unique `data-v` attribute to the component:

``` html
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

``` html
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### `created` vs `mounted`

When `created`, DOM has not yet been `mounted`. No DOM operation can be done.

Created is generally used for fetching data from backend API and setting it to data properties. But in SSR mounted() hook is not present you need to perform tasks like fetching data in created hook only.



