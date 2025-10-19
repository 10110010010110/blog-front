# Vue3+Vite 实现简易博客系统

## 一、配置环境

### (1) 安装 Node.js
确保已安装 Node.js（推荐 v14.18+ 或更高版本，自带 npm 或 yarn）：

检查版本：
```bash
node -v
npm -v  # 或 yarn -v
```

若未安装，前往 [https://nodejs.org/zh-cn](https://nodejs.org/zh-cn) 下载安装

### (2) 创建 Vite 项目

1. 打开终端，运行创建命令：
```bash
npm create vite@latest
```

2. 按照终端提示配置项目：
   - 输入项目名称（如 simple-blog-front）
   - 选择框架：Vue
   - 选择变体：JavaScript 或 TypeScript（根据需求选择，这里以 JavaScript 为例）

### (3) 安装依赖并启动项目

1. 进入项目目录：
```bash
cd simple-blog-front
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 浏览器访问终端输出的地址（通常是 http://127.0.0.1:5173/），看到 Vite + Vue 的默认页面即表示成功。

## 二、引入 element-plus 和 @element-plus/icons-vue

文档：
- element-plus：[https://element-plus.org/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5](https://element-plus.org/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5)
- @element-plus/icons-vue：[https://element-plus.org/zh-CN/component/icon.html#%E6%B3%A8%E5%86%8C%E6%89%80%E6%9C%89%E5%9B%BE%E6%A0%87](https://element-plus.org/zh-CN/component/icon.html#%E6%B3%A8%E5%86%8C%E6%89%80%E6%9C%89%E5%9B%BE%E6%A0%87)

这里 ElementPlus 我们使用完整引入：

```javascript
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

// 注册 @element-plus/icons-vue 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```

## 三、封装 axios

axios 官网：[https://www.axios-http.cn/docs/intro](https://www.axios-http.cn/docs/intro)

下载 axios：
```bash
npm install axios
```

### 1. 配置环境地址

在 src 下创建 config 文件夹，在其中创建 index.js：

```javascript
/**
 * 环境配置文件
 * 一般在企业级项目里面有三个环境
 * 开发环境
 * 测试环境
 * 线上环境
 */

// 当前的环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: 'https://mock.apifox.cn/m1/4068509-0-default/api',
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://mock.apifox.cn/m1/4068509-0-default/api',
  },
  pro: {
    baseApi: '//future.com/api',
    mockApi: 'https://mock.apifox.cn/m1/4068509-0-default/api',
  },
}

export default {
  env,
  mock: false,
  ...EnvConfig[env]
}
```

### 2. 在 src 下创建 api 文件夹，在其中创建 request.js

### 3. 定义请求方法

在 api 文件夹下创建 api.js 文件：

```javascript
/**
 * 整个项目api的管理
 */
import request from "./request"

export default {
  // home组件 左侧表格数据获取
  getTableData() {
    return request({
      url: '/home/getTableData',
      method: 'get',
    })
  }
  
}
```

### 4. 设置全局可用的请求对象

在 main.js 中：

```javascript
import api from '@/api/api'

app.config.globalProperties.$api = api
```

## 四、使用 pinia

pinia 官网：[https://pinia.vuejs.org/zh/core-concepts/](https://pinia.vuejs.org/zh/core-concepts/)

### (1) 下载
```bash
npm install pinia
```

### (2) 在 main.js 中使用

```javascript
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
```

### (3) 在 src 下创建 stores 文件夹，在其中创建 index.js

```javascript
import { defineStore } from 'pinia'
import { ref } from 'vue'

//初始化state数据，这里我们使用一个函数来返回
function initState(){
  return {
    
  }
}

//第一个参数要求是一个独一无二的名字
//第二个参数可接受两类值：Setup 函数或 Option 对象。
export const useAllDataStore = defineStore('allData', () => {
  //在 Setup Store 中：
  //ref() 就是 state 属性
  //computed() 就是 getters
  //function() 就是 actions
  const state = ref(initState())

  //需要把所有定义的state，getters，actions返回出去
  return {
    state
  }
})
```
        