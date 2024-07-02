<template>
  <div id="app" class="p-4">
    <Table
      title="列表"
      :data="paginatedData"
      :headers="tableHeaders"
      :pageSize="pageSize"
      :currentPage="currentPage"
      :totalItems="totalItems"
      @update:currentPage="updateCurrentPage"
    >
      <!-- 添加按钮 -->
      <template v-slot:add-button>
        <button @click="showAddForm" class="btn btn-primary btn-sm"><i class="fa-solid fa-add"></i>添加</button>
      </template>
      <!-- 查询筛选 -->
      <template v-slot:filter>
        <div class="ml-2 grid grid-cols-4 gap-2">
          <div>
            <label class="input input-bordered flex items-center gap-2 input-sm">
              姓名
            <input type="text" v-model="filters.Name" class="grow" placeholder="Daisy" />
          </label>
          </div>
          <div>
            <label class="input input-bordered flex items-center gap-2 input-sm">
              年龄
            <input type="text" v-model="filters.Age" class="grow" placeholder="Daisy" />
          </label>
          </div>
          <div>
            <label class="input input-bordered flex items-center gap-2 input-sm">
              国家
            <input type="text" v-model="filters.Country" class="grow" placeholder="Daisy" />
          </label>
          </div>
          <div>
            <button @click="filterData" class="btn btn-sm"><i class="fa fa-search"></i></button>
          </div>
        </div>
      </template>
      <!-- 自定义表头 -->
      <template v-slot:header-Name="{ header }">
        <span>姓名 ▼</span>
      </template>
      <template v-slot:header-Age="{ header }">
        <span>年龄 ▲</span>
      </template>
      <template v-slot:header-Country="{ header }">
        <span>国家 ★</span>
      </template>
      <!-- 自定义列 -->
      <template v-slot:column-Name="{ row, header }">
        <span class="font-bold">{{ row[header] }}</span>
      </template>
      <template v-slot:column-Age="{ row, header }">
        <span class="text-gray-500">{{ row[header] }} 岁</span>
      </template>
      <template v-slot:column-Country="{ row, header }">
        <span class="text-blue-500">{{ row[header] }}</span>
      </template>
      <!-- 自定义操作按钮 -->
      <template v-slot:actions="{ row, rowIndex }">
        <button @click="editRow(row)" class="btn btn-sm btn-primary mr-2"><i class="fa-solid fa-pen-to-square"></i>编辑</button>
        <button @click="confirmDeleteRow(rowIndex)" class="btn btn-sm btn-error"><i class="fa fa-trash"></i>删除</button>
      </template>
    </Table>

    <!-- 删除确认弹窗 -->
    <Dialog :visible.sync="isConfirmDialogVisible" title="确认删除" @confirm="deleteRow">
      <div>
        您确定要删除这条记录吗？
      </div>
    </Dialog>
  </div>
</template>

<script>
import Table from '@/components/Table.vue';
import Dialog from '@/components/Dialog.vue';

export default {
  name: 'App',
  components: {
    Table,
    Dialog,
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
      searchQuery: '',
      isConfirmDialogVisible: false,
      deleteIndex: null,
      filters: {
        Name: '',
        Age: '',
        Country: ''
      }
    };
  },
  computed: {
    // 计算过滤后的数据
    filteredData() {
      return this.tableData.filter(row => {
        return Object.keys(this.filters).every(key => {
          return String(row[key]).toLowerCase().includes(this.filters[key].toLowerCase());
        });
      });
    },
    // 计算分页后的数据
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredData.slice(start, end);
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
    // 确认删除操作
    confirmDeleteRow(rowIndex) {
      this.deleteIndex = (this.currentPage - 1) * this.pageSize + rowIndex;
      this.isConfirmDialogVisible = true;
    },
    // 删除行
    deleteRow() {
      if (this.deleteIndex !== null) {
        this.tableData.splice(this.deleteIndex, 1);
        this.totalItems -= 1;
        // If the current page is now empty after deletion, move to the previous page if possible
        if (this.paginatedData.length === 0 && this.currentPage > 1) {
          this.currentPage -= 1;
        }
        this.isConfirmDialogVisible = false;
        this.deleteIndex = null;
      }
    },
    // 过滤数据
    filterData() {
      this.currentPage = 1;
    }
  },
};
</script>

<style scoped>
/* 添加必要的样式 */
</style>
