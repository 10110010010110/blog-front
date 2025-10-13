<template>
  <el-input v-model="input" style="width: 240px" placeholder="请输入账号" />
  <el-input v-model="password" type="password"   style="width: 240px" placeholder="请输入密码" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'


const input = ref('')
const password = ref('')

</script>
