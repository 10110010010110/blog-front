import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import api from './api/api.js'
import App from './App.vue'
import router from './router/router.js'
const app=createApp(App)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$api = api
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')


