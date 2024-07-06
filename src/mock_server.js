import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import router from './mock/router.js';

dotenv.config();

const app = express();
const port = 3000;

// 获取当前模块的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 使用 /api 路由
app.use('/api', router);

// 启动服务器并打印绑定的路由
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  printRoutes(app);
});

// 打印路由的函数
function printRoutes(app) {
  console.log('Registered routes:');
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // 这是一个路由处理程序
      const route = middleware.route;
      const method = Object.keys(route.methods)[0].toUpperCase();
      const params = getRouteParams(route.path);
      console.log(`${method} ${route.path} ${params}`);
    } else if (middleware.name === 'router') {
      // 这是一个路由器中间件
      middleware.handle.stack.forEach((handler) => {
        const route = handler.route;
        if (route) {
          const method = Object.keys(route.methods)[0].toUpperCase();
          const params = getRouteParams(route.path);
          console.log(`${method} ${route.path} ${params}`);
        }
      });
    }
  });
}

// 获取路由参数的函数
function getRouteParams(path) {
  const params = [];
  const parts = path.split('/');
  parts.forEach(part => {
    if (part.startsWith(':')) {
      params.push(part.substring(1));
    }
  });
  return params.length > 0 ? `Params: ${params.join(', ')}` : '';
}
