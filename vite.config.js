import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


import cdn  from 'vite-plugin-cdn-import';
import viteCompression from 'vite-plugin-compression';

import dotenv from 'dotenv';
import { visualizer } from 'rollup-plugin-visualizer';

// 加载 .env 文件中的环境变量
dotenv.config()

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const useMock = mode === 'development' && process.env.MOCK_SERVER === 'true';

  return {
    base: '/', // 确保正确设置公共路径
    plugins: [
      visualizer({open: false}),
      vue(),
      cdn({
        // 使用环境变量配置 CDN
        modules: [
          {
            name: 'vue',
            var: 'Vue',
            path: process.env.VITE_CDN_VUE,
          },
          {
            name: 'vue-router',
            var: 'VueRouter',
            path: process.env.VITE_CDN_VUE_ROUTER,
          },
          {
            name: 'axios',
            var: 'axios',
            path: process.env.VITE_CDN_AXIOS,
          },
          {
            name: '@vee-validate/i18n',
            var: 'VeeValidateI18n',
            path: process.env.VITE_CDN_VEE_VALIDATE_I18N,
          },
          {
            name: '@vee-validate/rules',
            var: 'VeeValidateRules',
            path: process.env.VITE_CDN_VEE_VALIDATE_RULES,
          },
          {
            name: 'vee-validate',
            var: 'VeeValidate',
            path: process.env.VITE_CDN_VEE_VALIDATE,
          },
          {
            name: 'echarts',
            var: 'echarts',
            path: process.env.VITE_CDN_CHARTJS,
          },
          {
            name: 'vue-echarts',
            var: 'vue-echarts',
            path: process.env.VITE_CDN_VUE_CHARTJS,
          },
          {
            name: 'jquery',
            var: '$',
            path: process.env.VITE_CDN_JQUERY,
          },
          {
            name: 'js-cookie',
            var: 'Cookies',
            path: process.env.VITE_CDN_JS_COOKIE,
          },
          {
            name: 'vuex',
            var: 'Vuex',
            path: process.env.VITE_CDN_VUEX,
          },
        ],
      }),
      viteCompression({
        verbose: true,
        disable: false,
        deleteOriginFile: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      })
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
      host:'0.0.0.0',
      proxy: {
        '/api': {
          target: process.env.API_HOST,
          changeOrigin: true
        },
      },
    },
    css: {
      postcss: 'postcss.config.js', // 指定 PostCSS 配置文件
    },
    build: {
      minify:'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },  
      outDir: 'dist', // 构建输出目录
      assetsDir: 'assets', // 静态资源目录
      rollupOptions: {
        external: [
          'vue',
          'vue-router',
          'axios',
          '@vee-validate/i18n',
          '@vee-validate/rules',
          'echarts',
          'vue-echarts',
          'jquery',
          'js-cookie',
          'vuex',
        ],
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
          globals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            axios: 'axios',
            '@vee-validate/i18n': 'VeeValidateI18n',
            '@vee-validate/rules': 'VeeValidateRules',
            'echarts': 'echarts',
            'vue-echarts': 'vue-echarts',
            jquery: '$',
            'js-cookie': 'Cookies',
            vuex: 'Vuex',
          },
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
        },
      }
    },
    
  };
})
