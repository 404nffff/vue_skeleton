import { createRouter, createWebHistory } from 'vue-router';
import componentMap from './componentMap'; // 导入组件映射
import { fetchRoutes } from '../api/routes'; // 导入 fetchRoutes 函数
import { isLoggedIn } from '../api/login'; // 导入登录状态检查函数

const createRoutes = async () => {
  const routeData = await fetchRoutes();
  if (!Array.isArray(routeData)) {
    console.error('Route data is not an array:', routeData);
    return [];
  }
  const routes = routeData.map(route => ({
    ...route,
    component: componentMap[route.component],
    children: route.children
      ? route.children.map(child => ({
          ...child,
          component: componentMap[child.component]
        }))
      : []
  }));
  return routes;
};

// 初始化路由器
const initRouter = async () => {
  const routes = await createRoutes();
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  });

  // 导航守卫，验证登录状态
  router.beforeEach((to, from, next) => {
    if (!to.meta.public && !isLoggedIn()) {
      // 如果目标路由不是公共的，且用户未登录，则重定向到登录页面
      next({ name: 'login' });
    } else {
      next();
    }
  });

  return router;
};

export default initRouter;
