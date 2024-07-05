<template>
  <div class="dashboard shadow-none">
    <div class="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 mt-4">
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block h-8 w-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
              </path>
            </svg>
          </div>
          <div class="stat-title">Total Likes</div>
          <div class="stat-value text-primary">25.6K</div>
          <div class="stat-desc">21% more than last month</div>
        </div>
      </div>
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block h-8 w-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z">
              </path>
            </svg>
          </div>
          <div class="stat-title">Page Views</div>
          <div class="stat-value text-secondary">2.6M</div>
          <div class="stat-desc">21% more than last month</div>
        </div>
      </div>

      <div class="stats shadow">
        <div class="stat">
          <div class="stat-figure text-secondary">
            <div class="avatar online">
              <div class="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          <div class="stat-value">86%</div>
          <div class="stat-title">Tasks done</div>
          <div class="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-figure text-secondary">
            <div class="avatar online">
              <div class="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          <div class="stat-value">86%</div>
          <div class="stat-title">Tasks done</div>
          <div class="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 bg-white mb-4">
      <div class="card p-6 shadow-md rounded-lg">
        <LineChat :lineChartData="lineChartData" />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
      <div class="card p-6">
        <BarChart :barChartData="barChartData" />
      </div>
      <div class="card p-6">
        <PieChart :pieChartData="pieChartData" />
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "../components/BarChart.vue";
import PieChart from "../components/PieChart.vue";
import LineChat from "@/components/LineChart.vue";

export default {
  name: "Dashboard",
  components: {
    BarChart,
    PieChart,
    LineChat
  },
  data() {
    return {
      // 整合后的 barChartData 对象
      barChartData: {
        title: '柱状图示例',
        chartData: [
          { item: '巴西', num: 18203, color: '#5470C6' },
          { item: '印尼', num: 23489, color: '#91CC75' },
          { item: '美国', num: 29034, color: '#FAC858' },
          { item: '印度', num: 104970, color: '#EE6666' },
          { item: '中国', num: 131744, color: '#73C0DE' },
          { item: '世界人口(万)', num: 630230, color: '#3BA272' }
        ]
      },
      // 整合后的 lineChartData 对象
      lineChartData: {
        title: '折线图示例',
        xAxisData: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
        seriesData: [
          {
            name: '数据一',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: '数据二',
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          }
        ]
      },
      // 整合后的 pieChartData 对象
      pieChartData: {
        title: '饼图示例',
        seriesData: [
          { name: '搜索引擎', value: 1048, color: '#5470C6' },
          { name: '直接访问', value: 735, color: '#91CC75' },
          { name: '邮件营销', value: 580, color: '#FAC858' },
          { name: '联盟广告', value: 484, color: '#EE6666' },
          { name: '视频广告', value: 300, color: '#73C0DE' }
        ]
      }
    };
  }
};
</script>

<style scoped>
.dashboard {
  background: #f4f5fa;
}

.card {
  background-color: #fff;
  /* 使用 DaisyUI 变量 */
  padding: 1.5rem;
  /* p-6 */
  border-radius: 0.5rem;
  /* rounded-lg */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  /* shadow-md */
}
</style>