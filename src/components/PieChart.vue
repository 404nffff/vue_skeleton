<template>
    <div>
      <pie :data="data" :options="options" />
    </div>
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement);
  
  export default {
    name: 'PieChart',
    components: {
      Pie
    },
    data() {
      return {
        data: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [
            {
              label: 'Users',
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              data: [30, 40, 30]
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
  