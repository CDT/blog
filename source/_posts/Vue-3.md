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
### ref vs reactive
reference: [ref vs reactive in Vue 3](https://stackoverflow.com/questions/61452458/ref-vs-reactive-in-vue-3)
[Reactivity Core](https://vuejs.org/api/reactivity-core.html)
|Property|ref|reactive|
|-----|-----|-----|
|Usage|||



