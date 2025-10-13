vue3+vite 实现简易博客系统
一.配置环境
(1)安装Node.js确保已安装 Node.js（推荐 v14.18+ 或更高版本，自带 npm 或 yarn）：
   检查版本：node -v 和 npm -v（或 yarn -v）
   若未安装，前往 https://nodejs.org/zh-cn  下载安装
(2)创建 Vite 项目
   1.打开终端，运行创建命令：
   npm create vite@latest
   2.按照终端提示配置项目：
   输入项目名称（如 simple-blog-front）
   选择框架：Vue
   选择变体：JavaScript 或 TypeScript（根据需求选择，这里以 JavaScript 为例）
(3)安装依赖并启动项目
   1.进入项目目录：
   cd simple-blog-front
   2.安装依赖：
   npm install
   3.启动开发服务器：
   npm run dev
   4.浏览器访问终端输出的地址（通常是 http://127.0.0.1:5173/），看到 Vite + Vue 的默认页面即表示成功。
二.引入element-plus和@element-plus/icons-vue
  文档：
element-plus：https://element-plus.org/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5

@element-plus/icons-vue：https://element-plus.org/zh-CN/component/icon.html#%E6%B3%A8%E5%86%8C%E6%89%80%E6%9C%89%E5%9B%BE%E6%A0%87

这里ElementPlus我们使用完整引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

//注册@element-plus/icons-vue图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

 
