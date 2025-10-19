<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">{{ isRegister ? '注册' : '登录' }}</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item v-if="isRegister" label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username" >
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">{{ isRegister ? '注册' : '登录' }}</el-button>
        </el-form-item>
      </el-form>
      <div class="switch-link">
        <span v-if="isRegister">
          已有账号？<el-link type="primary" @click="isRegister = false">去登录</el-link>
        </span>
        <span v-else>
          没有账号？<el-link type="primary" @click="isRegister = true">去注册</el-link>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive ,getCurrentInstance} from 'vue'
import { ElMessage } from 'element-plus'
import api from '../api/api'
const { proxy } = getCurrentInstance() as any

const isRegister = ref(false)
const formRef = ref()
const form = reactive({
  email: '',
  username: '',
  password: ''
})
import { useRouter } from 'vue-router'
const router = useRouter()

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ]
}

const handleSubmit = async() => {
  if(isRegister.value){
     const  data = await proxy.$api.register(form)
        ElMessage.success('注册成功，请登录')
        isRegister.value = false

}else{
    const data = await proxy.$api.login(form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

  
      ElMessage.success('登录成功')
      router.push('/home')
}
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f6fa;
}
.login-card {
  width: 350px;
  padding: 32px 24px 16px 24px;
}
.title {
  text-align: center;
  margin-bottom: 24px;
}
.switch-link {
  text-align: center;
  margin-top: 10px;
}
.el-card{
  .el-button{
    margin-left: 45px;
  }

  
  

}

</style>
