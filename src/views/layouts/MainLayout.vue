<template>
  <div class="layout">
    <Header />
    <div class="main-layout">
      <LeftSidebar />
      <div class="content p-4">
        <Breadcrumbs />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import LeftSidebar from './LeftSidebar.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { fetchRoutes } from '@/api/routes'; // 导入路由获取函数
import { getUserPermissions } from '@/api/permissions'; // 导入权限获取函数

export default {
  components: {
    Header,
    LeftSidebar,
    Breadcrumbs
  },
  async created() {
    try {
      const permissions = await getUserPermissions();
      sessionStorage.setItem('user_permissions', JSON.stringify(permissions)); // 缓存权限
    } catch (error) {
      console.error('Failed to load routes or permissions:', error);
    }
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
}

.main-layout {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
}
</style>
