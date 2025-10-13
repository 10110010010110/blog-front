import {createRouter,createWebHashHistory} from 'vue-router'
const routes=[
    {
        path:'/',
        name:'Main',
        component :()=>import('../views/Main.vue')
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
