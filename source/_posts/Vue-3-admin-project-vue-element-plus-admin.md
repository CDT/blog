---
title: 'Vue 3 admin project: vue-element-plus-admin'
date: 2022-08-27 15:20:42
cover: /images/vue-plus-admin.png
thumbnail: /images/vue-plus-admin.png
categories:
- tech
tags:
- tech
- admin
- vue
- vue 3
- element
- element-plus
---
**(THIS BLOG IS STILL IN PROGRESS)**
## Basic information

- Github: [vue-element-plus-admin](https://github.com/kailong321200875/vue-element-plus-admin)

- Doc: [Doc](https://element-plus-admin-doc.cn/)

## Preview
![Dashboard](/images/vue-element-plus-admin-dashboard.png)

See live preview [here](https://element-plus-admin.cn/)

## Features
- Out-of-the-box admin template.
- Based on vue 3, Element-plus and Typescript.

## Project structure
```
.
├── .github # github workflows 相关
├── .husky # husky 配置
├── .vscode # vscode 配置
├── mock # 自定义 mock 数据及配置
├── public # 静态资源
├── src # 项目代码
│   ├── api # api接口管理
│   ├── assets # 静态资源
│   ├── components # 公用组件
│   ├── hooks # 常用hooks
│   ├── layout # 布局组件
│   ├── locales # 语言文件
│   ├── plugins # 外部插件
│   ├── router # 路由配置
│   ├── store # 状态管理
│   ├── styles # 全局样式
│   ├── utils # 全局工具类
│   ├── views # 路由页面
│   ├── App.vue # 入口vue文件
│   ├── main.ts # 主入口文件
│   └── permission.ts # 路由拦截
├── types # 全局类型
├── .env.base # 本地开发环境 环境变量配置
├── .env.dev # 打包到开发环境 环境变量配置
├── .env.gitee # 针对 gitee 的环境变量 可忽略
├── .env.pro # 打包到生产环境 环境变量配置
├── .env.test # 打包到测试环境 环境变量配置
├── .eslintignore # eslint 跳过检测配置
├── .eslintrc.js # eslint 配置
├── .gitignore # git 跳过配置
├── .prettierignore # prettier 跳过检测配置
├── .stylelintignore # stylelint 跳过检测配置
├── .versionrc 自动生成版本号及更新记录配置
├── CHANGELOG.md # 更新记录
├── commitlint.config.js # git commit 提交规范配置
├── index.html # 入口页面
├── package.json
├── .postcssrc.js # postcss 配置
├── prettier.config.js # prettier 配置
├── README.md # 英文 README
├── README.zh-CN.md # 中文 README
├── stylelint.config.js # stylelint 配置
├── tsconfig.json # typescript 配置
├── vite.config.ts # vite 配置
└── windi.config.ts # windicss 配置
```

## npm script
``` js
"scripts": {
    // installs dependencies
    "i": "pnpm install",
    // start local dev environment
    "dev": "vite --mode base",
    // typescript check
    "ts:check": "vue-tsc --noEmit",
    // build production environment files
    "build:pro": "vite build --mode pro",
    "build:gitee": "vite build --mode gitee",
    // build dev environment files
    "build:dev": "npm run ts:check && vite build --mode dev",
    // build test environment files
    "build:test": "npm run ts:check && vite build --mode test",
    // preview production environment
    "serve:pro": "vite preview --mode pro",
    // preview development environment
    "serve:dev": "vite preview --mode dev",
    // preview test environment
    "serve:test": "vite preview --mode test",
    // check updates
    "npm:check": "npx npm-check-updates",
    // removes node_modules
    "clean": "npx rimraf node_modules",
    // removes node_modules cache
    "clean:cache": "npx rimraf node_modules/.cache",
    // eslint check
    "lint:eslint": "eslint --fix --ext .js,.ts,.vue ./src",
    // eslint formatting
    "lint:format": "prettier --write --loglevel warn \"src/**/*.{js,ts,json,tsx,css,less,vue,html,md}\"",
    // stylelint formatting
    "lint:style": "stylelint --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",,
    "lint:lint-staged": "lint-staged -c ./.husky/lintstagedrc.js",
    "prepare": "husky install",
    // generate standard modules
    "p": "plop"
  }
```

## routing
Router file location: `src/router/index.ts`
Menu is generated from router file.

