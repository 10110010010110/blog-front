import { checkTagEmits } from 'element-plus'
import { resolveDirective } from 'vue'
import {createRouter,createWebHashHistory} from 'vue-router'
const routes=[
    {
        path:'/',
        name:'Main',
        component :()=>import('../views/Main.vue'),
        redirect:'/login',
        children:[
            {
                path:'posts',
                name:'Posts',
                component :()=>import('../views/Posts.vue')
            },
            {
                path:'home',
                name:'Home',
                component :()=>import('../views/Home.vue')
            },
            {
                path:'users',
                name:'Users',
                component :()=>import('../views/Users.vue')
            }
        ]
    },
    {
        path:'/login',
        name:'Login',
        component :()=>import('../views/Login.vue')
    }
]
const rounter=createRouter({
    history:createWebHashHistory(),
    routes
})
export default rounter
