import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './assets/index.css'; // 引入 Tailwind CSS
import initRouter from './router'; // 确保在导入 router 之前调用 initRouter
import DialogPlugin from './plugins/DialogPlugin'; // 导入 DialogPlugin
//import ToastPlugin from './plugins/ToastPlugin'; // 导入 ToastPlugin
import ToastPlugin from './utils/toast'; // 导入 ToastPlugin
import $ from 'jquery'; // 导入 jQuery

//初始化 Mock Adapter
import { setupMock } from './mock/axiosMock'; // 导入并调用 setupMock

//初始化 Mock Adapter
setupMock();

// 初始化路由器并创建应用
initRouter().then(router => {
  const app = createApp(App);
  app.config.globalProperties.$ = $; // 将 jQuery 注册为全局属性

  app.use(store);
  app.use(router);
  app.use(DialogPlugin);
  app.use(ToastPlugin);
  app.mount('#app');
});