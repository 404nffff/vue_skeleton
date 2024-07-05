<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'BarChart',
  props: {
    // 传递 barChartData 对象，其中包含 chartData 和 title
    barChartData: {
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
        const { chartData, title } = props.barChartData;

        // 提取 xAxisData 和 seriesData
        const xAxisData = chartData.map(item => item.item);
        const seriesData = chartData.map(item => ({
          value: item.num,
          itemStyle: { color: item.color }
        }));

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
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: xAxisData, // 确保图例与 xAxisData 一致
            bottom: 'bottom' // 设置图例的位置
          },
          grid: {
            top: '50px', // 增加 grid 的顶部间距以适应长标题
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
              interval: 0, // 强制显示所有 x 轴标签
              rotate: 30, // 旋转 x 轴标签以防重叠
              formatter: function(value) {
                return value.length > 5 ? value.substring(0, 5) + '...' : value;
              }
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '数据',
            type: 'bar',
            data: seriesData
          }]
        });
      }
    };

    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    // 监听 props 变化重新初始化图表
    watch(() => props.barChartData, initChart, { deep: true });

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
