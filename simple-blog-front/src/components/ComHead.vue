<template>
  <header class="com-head">
    <div class="left">
       <el-button size="small" @click="toggleCollapse">
                <component class="icons" :is="Menu"></component>
                <el-icon><Menu /></el-icon>
            </el-button>

    </div>

    <div class="right">
      <template v-if="loggedIn">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="dropdown-trigger">
            <el-avatar :size="36" :src="avatarUrl" style="cursor: pointer">{{ avatarText }}</el-avatar>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">查看个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>

      <template v-else>
        <el-button type="primary" size="small" @click="goLogin">登录</el-button>
      </template>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAllDataStore } from '../store/index.js'
const store = useAllDataStore()
function toggleCollapse(){
  store.state.collapsed = !store.state.collapsed
}

const router = useRouter()
const token = ref(localStorage.getItem('token'))
// 简单 avatar 显示，实际可从后端用户信息获取
const userInfo = ref(null)

onMounted(() => {
  try {
    // 若有保存的用户信息，可解析展示；此处尝试从 localStorage.user 中读取
    const u = localStorage.getItem('user')
    if (u) userInfo.value = JSON.parse(u)
  } catch (e) {
    userInfo.value = null
  }
  window.addEventListener('storage', (e) => {
    if (e.key === 'token') token.value = e.newValue
  })
})

const loggedIn = computed(() => !!token.value)
const avatarUrl = computed(() => userInfo.value?.avatar || '')
const avatarText = computed(() => (userInfo.value?.username ? userInfo.value.username[0].toUpperCase() : 'U'))

function goLogin() {
  router.push('/login')
}

function handleCommand(cmd) {
  if (cmd === 'logout') {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    token.value = null
    router.push('/login')
  } else if (cmd === 'profile') {
    // 跳转到用户模块
    router.push('/users')
  }
}
</script>

<style scoped>
.com-head {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
.left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.title {
  font-size: 16px;
  font-weight: 600;
}
.right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.dropdown-trigger {
  display: inline-flex;
  align-items: center;
}
</style>