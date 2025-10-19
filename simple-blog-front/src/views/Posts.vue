<template>
  <div class="posts-page">
    <div class="toolbar">
      <el-input v-model="q" placeholder="搜索标题" clearable  style="width:360px" />
      <el-button type="primary" icon="el-icon-search" @click="loadList">搜索</el-button>
      <div style="flex:1"></div>
      <el-button type="success" @click="openCreate">新建博文</el-button>
    </div>

    <el-table :data="list" stripe v-loading="loading" style="width:100%; margin-top:12px;">
      <el-table-column prop="ID" label="ID" width="80" />
      <el-table-column prop="Title" label="标题" />
      <el-table-column prop="CreatedAt" label="创建时间" width="180" />
      <el-table-column label="操作" width="220">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="viewDetail(row)">查看详情</el-button>
          <el-button type="primary" size="small" @click="openEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" @click="removePost(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pager" v-if="total > pageSize">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
         v-model:current-page="page"
        @current-change="loadList"
      />
    </div>

    <!-- 新建/编辑弹窗 -->
    <el-dialog :title="formTitle"  v-model="showForm" width="720px">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="标题" prop="Title">
          <el-input v-model="form.Title" placeholder="输入标题" />
        </el-form-item>
        <el-form-item label="内容" prop="Content">
          <el-input type="textarea" :rows="10" v-model="form.Content" placeholder="文章内容" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showForm = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>

    <!-- 查看详情 Drawer -->
    <el-drawer v-model="showDetail" size="100%" title="博文详情">
      <div v-if="detail">
        <h2 style="margin-top:0">{{ detail.Title }}</h2>
        <div style="color:#909399; margin-bottom:12px">
          创建时间：{{ detail.CreatedAt }}
        </div>
        <el-divider></el-divider>
        <div class="post-content" v-html="detail.Content"></div>
      </div>
      <div v-else>
        <el-empty description="无内容"></el-empty>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {getCurrentInstance} from 'vue'
const { proxy } = getCurrentInstance()

const list = ref([])
const loading = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const q = ref('')
const user = ref(null)


const showForm = ref(false)
const showDetail = ref(false)
const formRef = ref(null)
const form = reactive({
  UserID:'',
  Title: '',
  Content: '',
})

const detail = ref(null)
const isEdit = ref(false)

const rules = {
  Title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  Content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
}

// 替换原来的 formTitle 定义
const formTitle = computed(() => {
  return isEdit.value ? '编辑博文' : '新建博文'
})


onMounted(() => {
   const raw = localStorage.getItem('user')
   user.value = raw ? JSON.parse(raw) : null
   loadList()
})


function openCreate() {
  isEdit.value = false
  form.Title = ''
  form.Content = ''
  showForm.value = true
}

function openEdit(row) {
  isEdit.value = true
  form.ID = row.ID
  form.Title = row.Title 
  form.Content = row.Content 
  showForm.value = true
}
function removePost (row) {{
  ElMessageBox.confirm('确定删除该博文吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const data = await proxy.$api.deletePost({id: row.ID})
    ElMessage.success('博文删除成功')
    loadList()
  }).catch(() => {
    // 取消删除
})
}}
function viewDetail(row) {
  detail.value = row
  showDetail.value = true

}

const createpost = async()=>{
  form.UserID = user.value.ID
  const data =await proxy.$api.createPost({...form})
  loadList()
}
const editpost = async()=>{
  form.UserID = user.value.ID
  const data =await proxy.$api.editPost({id:form.ID,...form})
  loadList()
}
const handleSave = () => {
  showForm.value = false
  // 根据编辑状态调用正确的函数
  if (isEdit.value) {
    editpost()
  } else {
    createpost()
  }
}

const loadList = async()=>{
  
  const data= await proxy.$api.getPosts({Title: q.value})
  list.value = data
  total.value = data.length
}




</script>

<style scoped>
.posts-page {
  padding: 16px;
  box-sizing: border-box;
}
.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
}
.pager {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}
.post-content {
  white-space: pre-wrap;
  line-height: 1.8;
}
</style>