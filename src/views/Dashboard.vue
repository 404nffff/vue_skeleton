<template>
    <div class="dashboard p-4 shadow-none">
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div class="card bg-base shadow-md">
          <div class="card-body">
            <h2 class="card-title">Capacity</h2>
            <p class="text-2xl font-bold">105GB</p>
            <p class="text-gray-500">Updated now</p>
          </div>
        </div>
        <div class="card bg-base shadow-md">
          <div class="card-body">
            <h2 class="card-title">Revenue</h2>
            <p class="text-2xl font-bold">$1,345</p>
            <p class="text-gray-500">Last day</p>
          </div>
        </div>
        <div class="card bg-base shadow-md">
          <div class="card-body">
            <h2 class="card-title">Errors</h2>
            <p class="text-2xl font-bold">23</p>
            <p class="text-gray-500">In the last hour</p>
          </div>
        </div>
        <div class="card bg-base shadow-md">
          <div class="card-body">
            <h2 class="card-title">Followers</h2>
            <p class="text-2xl font-bold">+45</p>
            <p class="text-gray-500">Updated now</p>
          </div>
        </div>
      </div>
    </div>
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
    background: #f4f5fa;
  }
  .card {
    background-color: var(--b2); /* 使用 DaisyUI 变量 */
    padding: 1.5rem; /* p-6 */
    border-radius: 0.5rem; /* rounded-lg */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* shadow-md */
  }
  </style>
  