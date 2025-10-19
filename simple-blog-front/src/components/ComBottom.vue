<template>
  <footer class="com-bottom">
    <div class="inner">
      <span>© {{ year }} My Blog. All rights reserved.</span>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
const year = new Date().getFullYear()
</script>

<style scoped>
.com-bottom {
  padding: 12px 16px;
  background: #fff;
  border-top: 1px solid #ebeef5;
  box-sizing: border-box;
}
.inner {
  max-width: 1200px;
  margin: 0 auto;
  color: #909399;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}
.sep {
  opacity: 0.6;
}
</style>