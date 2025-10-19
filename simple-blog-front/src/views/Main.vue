<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-aside v-if="showAside" width="220px" class="app-aside">
        <ComAside />
      </el-aside>

      <el-container class="inner-container">
        <el-header class="app-header">
          <ComHead @toggle-aside="toggleAside" />
        </el-header>

        <el-main class="app-main">
          <router-view />
        </el-main>

        <el-footer class="app-footer">
          <ComBottom />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ComAside from '../components/ComAside.vue'
import ComHead from '../components/ComHead.vue'
import ComBottom from '../components/ComBottom.vue'

const showAside = ref(true)
function toggleAside() {
  showAside.value = !showAside.value
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
  display: flex;
  background: #f5f7fa;
  min-width: 320px;
}

/* 内部容器为列布局：头部 + 主体 + 底部 */
.inner-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0; /* 支持子元素溢出滚动 */
}

/* 头部 */
.app-header {
  padding: 0;
  height: 64px;
  box-sizing: border-box;
  background: transparent;
  border-bottom: none;
}

/* 主体区域填充并可滚动 */
.app-main {
  padding: 16px;
  background: #f5f7fa;
  overflow: auto;
  flex: 1;
  min-height: 0;
}

/* 底部 */
.app-footer {
  padding: 0;
  background: transparent;
  border-top: none;
}

/* 侧栏样式占位（组件内部自带样式） */
.app-aside {
  background: #ffffff;
  border-right: 1px solid #ebeef5;
  box-sizing: border-box;
  overflow: auto;
}

/* 响应式：小屏隐藏侧栏并使头部固定 */
@media (max-width: 768px) {
  .app-aside {
    display: none;
  }
  .layout-container {
    flex-direction: column;
  }
  .app-header {
    position: sticky;
    top: 0;
    z-index: 20;
    background: #fff;
  }
}
</style>
