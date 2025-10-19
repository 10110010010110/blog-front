<template>
  <aside class="com-aside" :style="{ width: width }">
    <div class="brand">
       <h3 v-show="!collapsed">简易博客系统</h3>
       <h3 v-show="collapsed">博客</h3>
      
    </div>
    
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      @select="onSelect"
      router
      :collapse="collapsed"
      :collapse-transition="false"

      unique-opened
    >
      <el-menu-item index="home">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="posts">
        <template #title>
          <i class="el-icon-document"></i>
          <span>文章模块</span>
        </template>
      </el-menu-item>

      <el-menu-item index="users">
        <i class="el-icon-user"></i>
        <span slot="title">用户模块</span>
      </el-menu-item>
    </el-menu>

  
  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAllDataStore } from '../store/index.js'
const store = useAllDataStore()
const collapsed = computed(() => store.state.collapsed)
const width = computed(()=> store.state.collapsed ? '64px' : '200px')


const router = useRouter()
const route = useRoute()

const active = computed(() => {
  // 根据路由决定激活项
  const p = route.path
  if (p.startsWith('/posts')) return 'posts'
  if ( p.startsWith('/users')) return 'users'
  return 'home'
})

function onSelect(key) {
  switch (key) {
    case 'home':
      router.push('/home')
      break
    case 'posts':
      router.push('/posts')
      break
    case 'users':
      router.push('/users')
      break
  }
}


</script>

<style scoped>
.com-aside {
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #ebeef5;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 8px;

}
.brand {
  font-size: 18px;
  color: #409eff;
  font-weight: 600;
  padding: 8px 12px;
}
.aside-footer {
  margin-top: auto;
  padding: 8px 12px;
  text-align: center;
}
</style>