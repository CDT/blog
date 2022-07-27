---
title: Vue 3
date: 2022-06-27 11:52:03
categories:
- tech
tags:
- tech
- vue
- vue3
---
## Refs
[Composition API - An animated explanation](https://juejin.cn/post/6890545920883032071)
[Vue2 to Vue3 — What’s changed?](https://medium.com/emblatech/vue2-to-vue3-whats-changed-5572514da20d#:~:text=Vue3%20was%20officially%20release%20in,and%20Vue3%20are%20very%20similar.)
[Why vite ?](https://vitejs.dev/guide/why.html)

## Vue 3 VS Vue 2
### **Composition API** vs **Options API**
![Composition API vs Options API](/images/composition_vs_options.png)
Options API is **function concerned**.
Composition API is **logic concerned**.
For complex components, code of same logic may be scattered in `props`, `data`, `methods`, `mounted`, which makes it hard to maintain. So in Vue 3, **Composition API** is introduced, code of same logic is put together in `setup`.
See [which to choose](https://vuejs.org/guide/introduction.html#which-to-choose).

### Vite
Vue 3's scaffolding tool migrated from `vue-cli` to 'create-vue', which is based on `vite` and has a much faster building speed than `webpack`. See [why vite is much faster](https://vitejs.dev/guide/why.html)

## Vue 3 features
### Composition API
- Difference with `Options API` already explained above.
- Use `<script setup>` or `<script>setup()` to indicate Composition API. Difference between `<script setup>` and `<script>setup()` is that no `return` is required in `<script setup>` to pass objects to template.
- A typical `<script setup>` SFC(Single File Component) goes here:
![script_setup_SFC](/images/script_setup_SFC.PNG)


## FAQ
### ref() vs reactive()
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

### Useful commands
- Use `vue ui` to start a ui interface inside a project created by `vue-cli`.






