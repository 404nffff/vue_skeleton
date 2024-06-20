<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 打印当前配置的所有路由
    console.log(this.$router.getRoutes());
  }
};
</script>

<style>
/* 可选的全局样式 */
</style>
