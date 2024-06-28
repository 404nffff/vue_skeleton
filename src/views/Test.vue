<template>
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">Test Axios Requests</h1>
      <button @click="fetchSuccess" class="btn btn-success mr-2">Fetch Success</button>
      <button @click="fetchError" class="btn btn-error">Fetch Error</button>
    </div>
  </template>
  
  <script>
  import { get } from '../api/axios';
  
  export default {
    name: 'Test',
    methods: {
      fetchSuccess() {
        get('/api/success')
          .then(response => {
            console.log('Success response:', response);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      },
      fetchError() {
        get('/api/error')
          .then(response => {
            console.log('Error response:', response);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }
  };
  </script>
  