<template>
    <div class="protected">
      <h1 class="text-2xl font-bold mb-6 text-center">Protected Data</h1>
      <button @click="fetchProtectedData" class="btn btn-primary mb-4">Fetch Protected Data</button>
      <div v-if="data">
        <p class="text-green-600">Protected Data: {{ data }}</p>
      </div>
      <div v-else>
        <p class="text-red-600">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { get } from '../api/axios';
  
  export default {
    name: 'Protected',
    data() {
      return {
        data: null,
        errorMessage: '',
      };
    },
    methods: {
      async fetchProtectedData() {
        try {
          const response = await get('/api/protected');
          this.data = response.data;
          this.errorMessage = '';
        } catch (error) {
          console.error('Error fetching protected data:', error);
          this.data = null;
          this.errorMessage = error.response && error.response.data && error.response.data.message 
            ? error.response.data.message 
            : 'Error fetching data';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .protected {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f3f4f6; /* bg-gray-100 */
  }
  </style>
    