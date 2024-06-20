<template>
    <div class="layout">
      <Header />
      <div class="main-layout">
        <LeftSidebar />
        <div class="content p-4">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Header from './Header.vue';
  import LeftSidebar from './LeftSidebar.vue';
  
  export default {
    components: {
      Header,
      LeftSidebar
    }
  };
  </script>
  
  <style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main-layout {
    display: flex;
    flex: 1;
  }
  
  .content {
    flex: 1;
  }
  </style>
  