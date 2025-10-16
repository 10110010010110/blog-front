import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 本地开发时将 /api 转发到后端 8081，保留 /api 前缀以匹配后端路由组
  server: {
    host: true,
    port: 5173,
    proxy: {
      // 请求以 /api 开头的会被转发到 http://localhost:8081
      // 后端路由为 r.Group("/api")，因此不要去掉 /api 前缀
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false
        // 不使用 rewrite，保留原始路径，例如 /api/user/register -> http://localhost:8081/api/user/register
      }
    }
  }
})
