<template>
  <div class="layout">
    <Header />
    <div class="main-layout ml-2 mt-2">
      <LeftSidebar />
      <div class="content w-4/5 mb-2">
        <Breadcrumbs class="mb-2"/>
          
        <router-view class="bg-white shadow-lg rounded-lg"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import LeftSidebar from './LeftSidebar.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
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
  background: #f4f5fa;
}

.main-layout {
  display: flex;
}

.content {
  /* width: 80%; */
}
</style>
