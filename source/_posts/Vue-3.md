---
title: Vue 3
date: 2022-06-27 11:52:03
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
1. **Composition API** vs **Options API**
![Composition API vs Options API](/images/composition_vs_options.png)
Options API is **function concerned**.
Composition API is **logic concerned**.
For complex components, code of same logic may be scattered in `props`, `data`, `methods`, `mounted`, which makes it hard to maintain. So in Vue 3, **Composition API** is introduced, code of same logic is put together in `setup`.

2. Vite
Vue 3's scaffolding tool migrated from `vue-cli` to 'create-vue', which is based on `vite` and has a much faster building speed than `webpack`. [See why vite is much faster](https://vitejs.dev/guide/why.html)

## Kickstart
