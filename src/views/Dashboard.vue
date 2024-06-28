<template>
    <div class="dashboard p-4">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card bg-base-100 p-6 shadow-md rounded-lg">
          <h2 class="text-xl font-semibold mb-4">Sales Overview</h2>
          <BarChart />
        </div>
        <div class="card bg-base-100 p-6 shadow-md rounded-lg">
          <h2 class="text-xl font-semibold mb-4">User Statistics</h2>
          <PieChart />
        </div>
      </div>
    </div>
    <router-view></router-view>
  </template>
  
  <script>
  import BarChart from '../components/BarChart.vue';
  import PieChart from '../components/PieChart.vue';
  
  export default {
    name: 'Dashboard',
    components: {
      BarChart,
      PieChart
    }
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 1rem; /* p-4 */
  }
  .card {
    background-color: var(--b2); /* 使用 DaisyUI 变量 */
    padding: 1.5rem; /* p-6 */
    border-radius: 0.5rem; /* rounded-lg */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* shadow-md */
  }
  </style>
  