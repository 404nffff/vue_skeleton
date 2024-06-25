<template>
  <div id="app" class="p-4">
    <button @click="showAddForm" class="btn btn-primary mb-4">Add New Entry</button>
    <Table
      title="User Information"
      :data="paginatedData"
      :headers="tableHeaders"
      :pageSize="pageSize"
      :currentPage="currentPage"
      :totalItems="totalItems"
      @update:currentPage="updateCurrentPage"
      @editRow="editRow"
      @deleteRow="deleteRow"
    />
  </div>
</template>

<script>
import Table from '@/components/Table.vue';

export default {
  name: 'App',
  components: {
    Table,
  },
  data() {
    return {
      tableHeaders: ['Name', 'Age', 'Country'],
      tableData: [
        { Name: 'Alice', Age: 25, Country: 'USA' },
        { Name: 'Bob', Age: 30, Country: 'UK' },
        { Name: 'Charlie', Age: 35, Country: 'Canada' },
        { Name: 'Dave', Age: 40, Country: 'Australia' },
        { Name: 'Eve', Age: 45, Country: 'New Zealand' },
        { Name: 'Frank', Age: 50, Country: 'Germany' },
        { Name: 'Grace', Age: 55, Country: 'France' },
        { Name: 'Heidi', Age: 60, Country: 'Italy' },
        { Name: 'Ivan', Age: 65, Country: 'Russia' },
        { Name: 'Judy', Age: 70, Country: 'China' },
        { Name: 'Karl', Age: 75, Country: 'Japan' },
        { Name: 'Laura', Age: 80, Country: 'Brazil' },
      ],
      pageSize: 5,
      currentPage: 1,
      totalItems: 12, // 总条数
    };
  },
  computed: {
    // 计算分页后的数据
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  methods: {
    // 更新当前页
    updateCurrentPage(page) {
      this.currentPage = page;
    },
    // 显示添加表单
    showAddForm() {
      this.$router.push({ name: 'form', query: { edit: false } });
    },
    // 编辑行
    editRow(row) {
      this.$router.push({ name: 'form', query: { edit: true, data: JSON.stringify(row) } });
    },
    // 删除行
    deleteRow(rowIndex) {
      this.tableData.splice(rowIndex, 1);
      this.totalItems -= 1;
    },
  },
};
</script>
