<template>
  <div class="users-container">
    <el-card class="user-card" v-if="user">
      <div class="header">
        <el-avatar :size="80" :src="user.avatar" class="avatar">{{ avatarText }}</el-avatar>
        <div class="info">
          <h2 class="name">{{ user.Username }}</h2>
          <p class="email">{{ user.Email }}</p>
        </div>
      </div>

      <el-divider></el-divider>

      <div class="meta">
        <div><strong>用户ID：</strong>{{ user.ID || '-' }}</div>
        <div><strong>注册时间：</strong>{{ user.CreatedAt || '-' }}</div>
      </div>

      <div class="actions">
        <el-button type="primary" @click="goEdit">查看/编辑</el-button>
        <el-button type="danger" @click="logout">退出登录</el-button>
      </div>
    </el-card>

    <el-empty v-else description="未登录">
      <el-button type="primary" @click="toLogin">去登录</el-button>
    </el-empty>
  </div>
   <el-dialog v-model="dialogFormVisible" title="编辑信息" width="500">
    <el-form :model="form">
      <el-form-item label="用户名"  :label-width="formLabelWidth" >
        <el-input v-model="form.Username" autocomplete="off"   placeholder="请输入用户名"/>
      </el-form-item>
      
       <el-form-item label="用户密码"  :label-width="formLabelWidth" >
        <el-input v-model="form.Password" autocomplete="off"  placeholder="请输入用户密码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary"  @click="() => { dialogFormVisible= false; editUser(); }" >
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() 

const router = useRouter()
const user = ref(null)
const dialogFormVisible = ref(false)
const form = reactive({
  Username: '',
  Password: ''
})

onMounted(() => {
  try {

    const raw = localStorage.getItem('user')
    user.value = raw ? JSON.parse(raw) : null
  } catch (e) {
    user.value = null
  }
})

const avatarText = computed(() => {
  if (!user.value?.Username) return 'U'
  return user.value.Username[0].toUpperCase()
})

function toLogin() {
  router.push('/login')
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  ElMessage.success('已退出登录')
  router.push('/login')
}

function goEdit() {
  dialogFormVisible.value = true
  form.Username = user.value.Username
  form.Password = user.value.Password
}
const editUser= async()=>{
   const data =await proxy.$api.editUser({id: user.value.ID,...form})
   form.Username = data.Username
   form.Password = data.Password
   localStorage.setItem('user', JSON.stringify(data))
   user.value = data
   ElMessage.success('用户信息更新成功，请重新登录')
   router.push('/login')


   



}
</script>

<style scoped>
.users-container {
  padding: 20px;
  display: flex;
  justify-content: center;
}
.user-card {
  width: 480px;
  box-sizing: border-box;
}
.header {
  display: flex;
  gap: 16px;
  align-items: center;
}
.avatar {
  background: #f2f6fc;
  color: #409EFF;
}
.info .name {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
.info .email {
  margin: 4px 0 0;
  color: #909399;
}
.meta {
  display: flex;
  gap: 24px;
  color: #606266;
  margin: 8px 0 12px;
}
.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>