import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import dotenv from 'dotenv'

// 加载 .env 文件中的环境变量
dotenv.config()

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  // const useMock = mode === 'development' && process.env.VITE_USE_MOCK === 'true';

  return {
    plugins: [
      vue(),
    ],
    define: {
      'process.env': process.env
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: process.env.PORT || 3000, // 配置开发服务器的端口为 3000
      proxy: {
        // '/api': {
        //   target: useMock ? 'http://localhost:3001' : 'http://your-api-server.com',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        // },
      },
    },
  };
})
