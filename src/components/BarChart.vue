<template>
    <div>
      <bar :data="data" :options="options" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default {
    name: 'BarChart',
    components: {
      Bar
    },
    data() {
      return {
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Sales',
              backgroundColor: '#42A5F5',
              data: [40, 20, 12, 39, 10, 40, 39]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      };
    }
  };
  </script>
  