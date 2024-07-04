<template>
  <div v-if="state.visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-1/3">
      <!-- 标题栏 -->
      <div class="flex justify-between items-center p-4 border-b">
        <h3 class="text-lg font-semibold">{{ state.title }}</h3>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <!-- 内容 -->
      <div class="p-4">
        <slot>{{ state.content }}</slot>
      </div>
      <!-- 底部按钮 -->
      <div class="flex justify-end p-4 border-t">
        <slot name="footer">
          
          <button @click="confirm" class="btn btn-primary  mr-2 btn-sm">确定</button>
          <button @click="close" class="btn btn-sm">取消</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
    },
  },
};
</script>

<style scoped>
/* 添加必要的样式 */
</style>
