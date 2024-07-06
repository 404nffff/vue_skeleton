# vue 骨架封装

## 部署
```shell
# 安装依赖
npm install

# 复制配置文件
cp .env.example .env

# 启动服务
npm run dev
```

## 使用组件
1. vue3.0
2. axios
3. mock
4. store
5. vue-router
6. jquery
7. daisyui + tailwindcss
8. echarts
9. js-cookie
10. VeeValidate
11. ckeditor5


## 部署插件
1. 打包体积分析插件
```
npm i rollup-plugin-visualizer -D

# vite.config.js


import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
})

```
2. 去除debugger
```
npm i terser -D

terserOptions: {
  compress: {
    drop_console: true,
    drop_debugger: true
  }
}

```

## mock

### axiosMock
```javascript

# .evn
USE_AXIOS_MOCK=true
MOCK_SERVER=false

```

#### 相关配置文件
1. src/axiosMock.js


### 服务
```
# .evn
USE_AXIOS_MOCK=false
MOCK_SERVER=true
```

#### 相关配置文件
1. src/mock_server.js
2. src/mock/router.js 路由配置

