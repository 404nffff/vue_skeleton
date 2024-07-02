<template>
  <div class="overflow-auto min-h-96">
    <!-- 表格标题和操作 -->
    <div class="mb-4 font-bold flex justify-between items-center">
      <div>{{ title }}</div>
      <div>
        <slot name="add-button"></slot>
      </div>
    </div>
    <!-- 查询筛选 -->
    <div class="mb-10" v-if="$slots.filter">
      <div class="mb-4 font-bold flex justify-between items-center">
        <div>查询</div>
      </div>
      <slot name="filter"></slot>
    </div>
    <!-- 表格主体 -->
    <table class="table table-auto w-full bg-white rounded-lg">
      <thead>
        <tr>
          <!-- 表头 -->
          <th v-for="(header, index) in headers" :key="index" @click="sortBy(header)" class="px-4 py-2 text-center align-middle text-sm">
            <slot v-if="$slots[`header-${header}`]" :name="`header-${header}`" :header="header">
              <div class="flex items-center justify-center space-x-2">
                <span>{{ header }}</span>
              </div>
            </slot>
            <div v-else class="flex items-center justify-center space-x-2">
              <span>{{ header }}</span>
            </div>
          </th>
          <th v-if="$slots.actions" class="px-4 py-2 text-center align-middle text-sm">操作</th>
        </tr>
      </thead>
      <tbody>
        <!-- 表格内容 -->
        <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex" class="hover">
          <td v-for="(header, colIndex) in headers" :key="colIndex" class="px-4 py-2 text-center align-middle">
            <slot :name="`column-${header}`" :row="row" :header="header">
              {{ row[header] }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="px-4 py-2 text-center align-middle">
            <slot name="actions" :row="row" :rowIndex="rowIndex"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 分页组件 -->
  <div class="flex justify-end items-center mt-10">
    <div class="join">
      <button @click="previousPage" :disabled="currentPage === 1" class="join-item btn btn-sm">
        «
      </button>
      <button v-if="shouldShowButton(1)" @click="goToPage(1)" :class="['join-item btn btn-sm', { 'btn-active': currentPage === 1 }]">
        1
      </button>
      <span v-if="shouldShowEllipsis(1)" class="join-item btn btn-disabled">...</span>
      <button v-for="page in pagesToShow" :key="page" @click="goToPage(page)" :class="['join-item btn btn-sm', { 'btn-active': currentPage === page }]">
        {{ page }}
      </button>
      <span v-if="shouldShowEllipsis(totalPages)" class="join-item btn btn-disabled">...</span>
      <button v-if="shouldShowButton(totalPages)" @click="goToPage(totalPages)" :class="['join-item btn btn-sm', { 'btn-active': currentPage === totalPages }]">
        {{ totalPages }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="join-item btn btn-sm">
        »
      </button>
    </div>
    <div class="ml-4 text-sm text-gray-700 ml-5">
      总数: <span class="font-bold">{{ totalPages }}</span>
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
  emits: ["update:currentPage"],
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
    }
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
