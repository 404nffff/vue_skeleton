import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './assets/index.css'; // 引入 Tailwind CSS
import initRouter from './router'; // 确保在导入 router 之前调用 initRouter

import 'daisyui/dist/full.css'; // 引入 DaisyUI 样式

import $ from 'jquery'; // 导入 jQuery

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faChartBar, faUser, faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHome, faChartBar, faUser, faCogs);

// 初始化 Mock Adapter
import { setupMock } from './mock/mock'; // 导入并调用 setupMock
setupMock(); // 初始化 Mock Adapter


// 初始化路由器并创建应用
initRouter().then(router => {
  const app = createApp(App);
  app.config.globalProperties.$ = $; // 将 jQuery 注册为全局属性

  app.component('font-awesome-icon', FontAwesomeIcon);
  app.use(store);
  app.use(router);
  app.mount('#app');
});