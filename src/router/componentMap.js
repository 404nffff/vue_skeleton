import MainLayout from '../views/layouts/MainLayout.vue';
import Dashboard from '../views/Dashboard.vue';
import Page1 from '../views/Page1.vue';
import Page2 from '../views/Page2.vue';
import SubPage1 from '../views/SubPage1.vue';
import SubPage2 from '../views/SubPage2.vue';
import SubPage3 from '../views/SubPage3.vue';
import Login from '../views/Login.vue';
import Test from '../views/Test.vue'; // 导入测试页面
import Protected from '../views/Protected.vue'; // 导入测试页面
import Table from '../views/Table.vue'; // 导入测试页面
import FormPage from '../views/FormPage.vue'; // 导入测试页面
import ParentComponent from '../views/ParentComponent.vue'; // 导入测试页面

const componentMap = {
  MainLayout,
  Dashboard,
  Page1,
  Page2,
  SubPage1,
  SubPage2,
  Login,
  Test,
  Protected,
  SubPage3,
  Table,
  FormPage,
  ParentComponent
};

export default componentMap;
