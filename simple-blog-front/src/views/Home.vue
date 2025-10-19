<template>
  <div class="home-page">
    <el-card class="home-hero">
      <h2>欢迎来到我的博客</h2>
      <p>在这里可以查看文章、管理用户与发布新文章。</p>
    </el-card>

    <el-row :gutter="20" class="home-grid">
      <el-col :span="16">
        <el-card>
          <h3>最新文章</h3>
          <p>示例文章列表区域（联调时替换为真实数据展示）</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h3>快捷操作</h3>
          <el-button type="primary" @click="$router.push('/posts')">写文章</el-button>
          <el-button @click="$router.push('/users')">个人中心</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-page {
  padding: 16px;
  min-height: calc(100vh - 64px - 48px); /* 减去头和底部高度近似 */
  box-sizing: border-box;
}
.home-hero {
  margin-bottom: 16px;
  text-align: center;
}
.home-grid .el-card {
  min-height: 160px;
}
</style>