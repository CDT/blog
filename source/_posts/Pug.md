---
title: Pug
date: 2022-10-29 09:21:34
cover: /images/pug.png
thumbnail: /images/pug.png
toc: true
categories:
- tech
tags:
- tech
- html
- pug
---

## Ref
1. [Pug - getting started](https://pugjs.org/api/getting-started.html)


## What and why
- `Pug` is an html template engine which simplies html coding.
- `Pug`'s predecessor is the well-known `jade`.
<!-- more -->

## Example
### Compile a template with parameter

``` pug
// template.pug
p #{name}'s Pug source code!
```

``` js
const pug = require('pug')

// Compile the source code
const compiledFunction = pug.compileFile('template.pug')

// Render a set of data
console.log(compiledFunction({
  name: 'Timothy'
}))
// "<p>Timothy's Pug source code!</p>"

// Render another set of data
console.log(compiledFunction({
  name: 'Forbes'
}));
// "<p>Forbes's Pug source code!</p>"


// render: compile + render combined
// Use option cache to cache compiled function to avoid repeated compiling which 
// might impair performance
console.log(pug.renderFile('template.pug', {
  name: 'Timothy'
}));
// "<p>Timothy's Pug source code!</p>"
```

### Attributes

``` pug
a(href='//google.com') Google
a(class='button' href='//google.com') Google
a(class='button', href='//google.com') Google
```

``` html
<a href="//google.com">Google</a>
<a class="button" href="//google.com">Google</a>
<a class="button" href="//google.com">Google</a>
```

### Case
``` pug
- var friends = 10
case friends
  when 0
    p you have no friends
  when 1
    p you have a friend
  default
    p you have #{friends} friends
```

``` html
<p>you have 10 friends</p>
```

### Code

``` pug
- for (var x = 0; x < 3; x++)
  li item
```

``` html
<li>item</li>
<li>item</li>
<li>item</li>
```

### Comments

``` pug
// just some paragraphs
p foo
p bar
```

``` html
<!-- just some paragraphs-->
<p>foo</p>
<p>bar</p>
```

### Conditionals

``` pug
- var user = {description: 'foo bar baz'}
- var authorised = false
#user
  if user.description
    h2.green Description
    p.description= user.description
  else if authorised
    h2.blue Description
    p.description.
      User has no description,
      why not add one...
  else
    h2.red Description
    p.description User has no description
```

``` html
<div id="user">
  <h2 class="green">Description</h2>
  <p class="description">foo bar baz</p>
</div>
```

### Includes

Includes allow you to insert the contents of one Pug file into another.
[See here](https://pugjs.org/language/includes.html)

### Template Inheritance

[See here](https://pugjs.org/language/inheritance.html)

### Interpolation

``` pug
- var title = "On Dogs: Man's Best Friend";
- var author = "enlore";
- var theGreat = "<span>escape!</span>";

h1= title
p Written with love by #{author}
p This will be safe: #{theGreat}
```

``` html
<h1>On Dogs: Man's Best Friend</h1>
<p>Written with love by enlore</p>
<p>This will be safe: &lt;span&gt;escape!&lt;/span&gt;</p>
```

### Iteration

``` pug
ul
  each val in [1, 2, 3, 4, 5]
    li= val
```

``` html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```

### Mixins

``` pug
//- Declaration
mixin list
  ul
    li foo
    li bar
    li baz
//- Use
+list
+list
```

``` html
<ul>
  <li>foo</li>
  <li>bar</li>
  <li>baz</li>
</ul>
<ul>
  <li>foo</li>
  <li>bar</li>
  <li>baz</li>
</ul>
```

### Plain text

``` pug
p This is plain old <em>text</em> content.
```

``` html
<p>This is plain old <em>text</em> content.</p>
```

## Vue with Pug

In a vue project, install:

```
yarn add --dev stylus-loader pug-plain-loader
```

Sample component:

``` html
<!-- UserCard -->
<template lang="pug">
.user-card-component
  .user-card-component__avatar
    img(:src='`${avatar}`' class='user-card-component__avatar-image')

  .user-card-component__name {{ username }}

  .user-card-component__email {{ email }}

  .user-card-component__action
    button(@click="$emit('contactUser')") Contact {{ lastName }}
</template>

<script>
export default {
  name: 'user-card-component',
  props: {
    avatar: {
      type: String,
      required: true,
      default: '',
    },
    username: {
      type: String,
      required: true,
      default: 'Martins Onuoha',
    },
    email: {
      type: String,
      required: true,
      default: 'martinsvictor.nd@gmail.com',
    },
  },
  computed: {
    lastName() {
      return this.username.split(' ')[1];
    },
  },
};
</script>

<style lang="stylus">
  shdw = 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.2)
  .user-card-component
    box-shadow shdw;
    background-color #ffffff
    border-radius 10px
    padding 10px
    width 70%
    margin 0 auto
    &__avatar
      &-image
        border-radius 50%
        width 6rem
    &__email
      font-size 15px
      padding 10px
      color #CCC
    &__name
      font-size: 20px
      font-weight 500
    button
      padding 8px
      background #4DB6AC
      color #FFF
      width 80%
      border-radius 5px
      box-shadow shdw
      border 0
    .spacer
      border-color #CCC
</style>
```

``` html
<!-- App.vue -->
<template lang="pug">
#app
  div.col(v-for="user in users")
    UserCard(
      :avatar='user.avatar'
      :username='user.username'
      :email='user.email'
    )
</template>

<script>
import UserCard from './components/UserCard.vue';
export default {
  name: 'App',
  components: {
    UserCard,
  },
  data() {
    return {
      users: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/29035007?s=460&u=d43c9fdb7ae872c84a38aa6a0c04db49cb7e59f4&v=4',
          username: 'Martins Onuoha',
          email: 'martinsvictor.nd@gmail.com',
        },
        {
          avatar: 'https://avatars2.githubusercontent.com/u/2798204?s=460&u=d5b35f5a43986232e2d226539071ec1008db5166&v=4',
          username: 'Guillaume Chau',
          email: 'guillaume.b.chau@gmail.com',
        },
        {
          avatar: 'https://avatars3.githubusercontent.com/u/499550?s=460&u=de41ec9325e8a92e281b96a1514a0fd1cd81ad4a&v=4',
          username: 'Evan You',
          email: 'evan@you.com',
        },
        {
          avatar: 'https://avatars2.githubusercontent.com/u/3277634?s=460&v=4',
          username: 'Haoqun Jiang',
          email: '@haoqunjiang',
        },
      ],
    };
  },
};
</script>

<style lang="stylus">
body
  background-color: #FFF4EC
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  display flex
  justify-content: center;
  text-align: center
  margin-top: 60px
  .col
    width 100%
</style>
```