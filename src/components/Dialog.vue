<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg w-1/3">
        <!-- 标题栏 -->
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
          <button @click="close" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <!-- 内容 -->
        <div class="p-4">
          <slot></slot>
        </div>
        <!-- 底部按钮 -->
        <div class="flex justify-end p-4 border-t">
          <slot name="footer">
            <button @click="close" class="btn btn-secondary mr-2">取消</button>
            <button @click="confirm" class="btn btn-primary">确定</button>
          </slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dialog',
    props: {
      title: {
        type: String,
        default: 'Dialog Title',
      },
      visible: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      close() {
        this.$emit('update:visible', false);
      },
      confirm() {
        this.$emit('confirm');
      },
    },
  };
  </script>
  
  <style scoped>
  /* 你可以在这里添加自定义样式 */
  </style>
  