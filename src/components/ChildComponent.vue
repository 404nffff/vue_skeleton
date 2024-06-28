<template>
    <div>
      <h2>我是子组件</h2>
      <button @click="childMethod">点击调用子组件方法</button>
    </div>
  </template>
  
  <script>
  import { defineComponent, defineExpose } from 'vue';
  
  export default defineComponent({
    name: 'ChildComponent',
    setup() {
      const childMethod = () => {
        alert('子组件方法被调用');
      };
  
      // 通过defineExpose暴露方法
      defineExpose({
        childMethod
      });
  
      return {
        childMethod
      };
    }
  });
  </script>
  