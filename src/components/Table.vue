<template>
  <div class="overflow-auto min-h-96">
    <!-- 表格标题 -->
    <div class="mb-4 text-lg font-bold">
      {{ title }}
    </div>
    <!-- 表格主体 -->
    <table class="table-auto w-full bg-white  rounded-lg border border-gray-300">
      <thead class="bg-gray-100 sticky top-0">
        <tr>
          <!-- 表头 -->
          <th v-for="(header, index) in headers" :key="index" @click="sortBy(header)" class="cursor-pointer px-4 py-2 text-center align-middle">
            <div class="flex items-center justify-center space-x-2">
              <span>{{ header }}</span>
              <!-- 排序图标 -->
              <svg v-if="sortedColumn === header" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="sortDirection === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </th>
          <th class="px-4 py-2 text-center align-middle">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- 表格内容 -->
        <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex" class="hover:bg-gray-100 border-b">
          <td v-for="(header, colIndex) in headers" :key="colIndex" class="px-4 py-2 text-center align-middle">
            {{ row[header] }}
          </td>
          <td class="px-4 py-2 text-center align-middle">
            <button @click="editRow(row)" class="btn btn-sm btn-warning mr-2">Edit</button>
            <button @click="deleteRow(rowIndex)" class="btn btn-sm btn-error">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    <!-- 分页组件 -->
    <div class="flex justify-between items-center mt-4">
    <div class="join">
      <button @click="previousPage" :disabled="currentPage === 1" class="join-item btn">
        «
      </button>
      <button v-if="shouldShowButton(1)" @click="goToPage(1)" :class="['join-item btn', { 'btn-active': currentPage === 1 }]">
        1
      </button>
      <span v-if="shouldShowEllipsis(1)" class="join-item btn btn-disabled">...</span>
      <button v-for="page in pagesToShow" :key="page" @click="goToPage(page)" :class="['join-item btn', { 'btn-active': currentPage === page }]">
        {{ page }}
      </button>
      <span v-if="shouldShowEllipsis(totalPages)" class="join-item btn btn-disabled">...</span>
      <button v-if="shouldShowButton(totalPages)" @click="goToPage(totalPages)" :class="['join-item btn', { 'btn-active': currentPage === totalPages }]">
        {{ totalPages }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="join-item btn">
        »
      </button>
    </div>
    <div class="ml-4 text-sm text-gray-700">
      Total pages: <span class="font-bold">{{ totalPages }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    title: {
      type: String,
      default: 'Table Title',
    },
    data: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    totalItems: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      sortedColumn: null,
      sortDirection: 'asc',
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
    // 计算排序后的数据
    sortedData() {
      if (!this.sortedColumn) {
        return this.data;
      }
      return [...this.data].sort((a, b) => {
        if (a[this.sortedColumn] < b[this.sortedColumn]) return this.sortDirection === 'asc' ? -1 : 1;
        if (a[this.sortedColumn] > b[this.sortedColumn]) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    },
    // 计算分页后的数据
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.sortedData.slice(start, end);
    },
    // 显示的页码
    pagesToShow() {
      const pages = [];
      const startPage = Math.max(2, this.currentPage - 2);
      const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    // 排序方法
    sortBy(header) {
      if (this.sortedColumn === header) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortedColumn = header;
        this.sortDirection = 'asc';
      }
    },
    // 下一页
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update:currentPage', this.currentPage + 1);
      }
    },
    // 上一页
    previousPage() {
      if (this.currentPage > 1) {
        this.$emit('update:currentPage', this.currentPage - 1);
      }
    },
    // 跳转到指定页
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('update:currentPage', page);
      }
    },
    // 是否显示指定页码按钮
    shouldShowButton(page) {
      return page === 1 || page === this.totalPages;
    },
    // 是否显示省略号
    shouldShowEllipsis(page) {
      return (
        (page === 1 && this.currentPage > 4) ||
        (page === this.totalPages && this.currentPage < this.totalPages - 3)
      );
    },
    // 编辑行
    editRow(row) {
      this.$emit('editRow', row);
    },
    // 删除行
    deleteRow(index) {
      this.$emit('deleteRow', index);
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.table {
  max-height: 500px; /* 设定表格的最大高度 */
  overflow-y: auto; /* 超过高度时滚动 */
}
.hover\:bg-gray-100:hover {
  background-color: #f3f4f6; /* hover:bg-gray-100 */
}
.border-b {
  border-bottom: 1px solid #e5e7eb; /* 设置每行底部边框 */
}
.join .btn {
  min-width: 2rem; /* 设置分页按钮的最小宽度以防止跳动 */
  text-align: center;
}
</style>
