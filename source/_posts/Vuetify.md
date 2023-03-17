---
title: Vuetify
date: 2022-07-21 20:25:02
categories:
- tech
tags:
- vue
- vuetify
- material design
---
![](/images/vuetify1.PNG)
## Refs
1. [Vuetify](https://vuetifyjs.com/en/)

## What is Vuetify ?
A [material-design](https://material.io/) UI framework for UI.

## Install
- For `vue-cli` created project, type `vue add vuetify` in project root folder.

## Use vuetify icons offline

- [Vuetify offline icons](https://stackoverflow.com/questions/53712700/vuetify-offline-icons)
- By default vuetify requires material icons and requesting the icon lib in China may be blocked.

```
yarn add @mdi/font -D
```

``` js, vuetify.js
// src/plugnis/vuetify.js
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  }
})
```
