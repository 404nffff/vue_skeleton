<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'PieChart',
  props: {
    // 传递 pieChartData 对象，其中包含 title 和 seriesData
    pieChartData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const chartRef = ref(null);
    let chartInstance = null;

    const initChart = () => {
      if (chartRef.value) {
        chartInstance = echarts.init(chartRef.value);
        const { title, seriesData } = props.pieChartData;

        // 设置图表选项
        chartInstance.setOption({
          title: {
            text: title,
            left: 'center',
            top: 10, // 确保标题在顶部显示
            textStyle: {
              fontSize: 20, // 可调整字体大小
              fontWeight: 'bold', // 可设置字体粗细
              lineHeight: 20 // 增加行高确保长标题换行显示
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            bottom: 'bottom' // 设置图例的位置
          },
          series: [
            {
              name: title,
              type: 'pie',
              radius: '50%',
              data: seriesData.map(item => ({
                value: item.value,
                name: item.name,
                itemStyle: { color: item.color }
              })),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      }
    };

    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    // 监听 props 变化重新初始化图表
    watch(() => props.pieChartData, initChart, { deep: true });

    onMounted(() => {
      initChart();
      window.addEventListener('resize', resizeChart);
    });

    onBeforeUnmount(() => {
      if (chartInstance) {
        window.removeEventListener('resize', resizeChart);
        chartInstance.dispose();
      }
    });

    return {
      chartRef
    };
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px; /* 增加容器高度以适应长标题 */
}
</style>
